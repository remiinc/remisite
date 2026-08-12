import assert from 'node:assert/strict'
import { access, readFile } from 'node:fs/promises'
import { dirname, join } from 'node:path'
import test from 'node:test'
import { fileURLToPath } from 'node:url'

const root = join(dirname(fileURLToPath(import.meta.url)), '..')
const readSource = (path) => readFile(join(root, path), 'utf8')

test('section examples use the real Messages component renderer', async () => {
  const source = await readSource('src/components/sections/section-iphone.vue')

  assert.match(source, /import StaticIphone from '\.\.\/global\/static-iphone\.vue'/)
  assert.match(source, /:loop-delay="0"/, 'interactive examples should not restart while someone is reviewing a card')
  assert.match(source, /component: 'email-review'/)
  assert.match(source, /component: 'invoice-review'/)
  assert.match(source, /component: 'quote-review'/)
  assert.match(source, /deposit \+ progress are paid, walkthrough signed/)
  assert.match(source, /first nudge \+ payment link are ready/)
  assert.match(source, /sam replied\. says he'll pay it this afternoon/)
  assert.doesNotMatch(source, /draftWidget|review\(\{|ComponentIphone/)
  assert.doesNotMatch(source, /—/, 'Remi copy should not use em dashes')
})

test('section playback starts in view and advances after each complete story', async () => {
  const [section, phone] = await Promise.all([
    readSource('src/components/sections/section-iphone.vue'),
    readSource('src/components/global/static-iphone.vue'),
  ])

  assert.match(section, /new IntersectionObserver/)
  assert.match(section, /playbackObserver\.observe\(sectionRoot\.value\)/)
  assert.match(section, /:autoplay="hasStartedPlayback"/)
  assert.match(section, /@playback-complete="handlePlaybackComplete"/)
  assert.match(section, /setScenarioByOffset\(1\)/)
  assert.match(phone, /defineEmits\(\['playback-complete'\]\)/)
  assert.match(phone, /if \(activeReview\.value\) \{[\s\S]*completionPending\.value = true/)
  assert.match(phone, /releasePendingCompletion\(\)/)
  assert.match(phone, /if \(manual\) \{[\s\S]*clearAllTimers\(\)[\s\S]*playbackPausedForReview\.value = true/)
  assert.match(phone, /function finishInterruptedStory\(\)/)
  assert.match(phone, /if \(props\.loopDelay > 0\) \{[\s\S]*schedule\(\(\) => playMessages\(\), props\.loopDelay\)/)
  assert.match(phone, /if \(wasManuallyOpened\) \{[\s\S]*finishInterruptedStory\(\)/)
  assert.match(phone, /emit\('playback-complete'\)/)
})

test('mobile presents every scenario as an Embla phone slide while playing only the selected story', async () => {
  const [section, carousel] = await Promise.all([
    readSource('src/components/sections/section-iphone.vue'),
    readSource('src/components/sections/components/mobile-iphone-carousel.vue'),
  ])

  assert.match(section, /import MobileIphoneCarousel from '\.\/components\/mobile-iphone-carousel\.vue'/)
  assert.match(section, /v-if="isMobileViewport"/)
  assert.match(section, /:initial-scenario-id="activeScenarioId"/)
  assert.match(section, /@scenario-change="selectScenario"/)
  assert.match(section, /mobileViewportMedia\.addEventListener\('change', syncMobileViewport\)/)
  assert.match(section, /mobileViewportMedia\?\.removeEventListener\('change', syncMobileViewport\)/)
  assert.doesNotMatch(section, /useEmblaCarousel/)

  assert.match(carousel, /import AutoHeight from 'embla-carousel-auto-height'/)
  assert.match(carousel, /import useEmblaCarousel from 'embla-carousel-vue'/)
  assert.match(carousel, /const carouselPlugins = \[AutoHeight\(\)\]/)
  assert.match(carousel, /const \[emblaRef, emblaApi\] = useEmblaCarousel\(carouselOptions, carouselPlugins\)/)
  assert.match(carousel, /align: 'center'/)
  assert.match(carousel, /containScroll: 'trimSnaps'/)
  assert.match(carousel, /loop: true/)
  assert.match(carousel, /slidesToScroll: 1/)
  assert.match(carousel, /startIndex: initialIndex/)
  assert.match(carousel, /watchResize: watchCarouselResize/)
  assert.match(carousel, /\[reducedMotionQuery\]: \{\s*duration: 0,/)
  assert.match(carousel, /v-for="\(scenario, index\) in scenarios"/)
  assert.match(carousel, /:autoplay="hasStartedPlayback && selectedIndex === index"/)
  assert.match(carousel, /:completion-delay="2000"/)
  assert.match(carousel, /@playback-complete="handlePlaybackComplete\(index\)"/)
  assert.match(carousel, /emblaApi\.value\?\.scrollNext\(\)/)
  assert.match(carousel, /aria-roledescription="carousel"/)
  assert.match(carousel, /:inert="selectedIndex !== index"/)
  assert.match(carousel, /data-mobile-scenario-copy/)
  assert.match(carousel, /mobile-iphone-embla__slide-content[\s\S]*<StaticIphone[\s\S]*data-mobile-scenario-copy/)
  assert.match(carousel, /transition-\[grid-template-rows,opacity\]/)
  assert.match(carousel, /grid-rows-\[1fr\]/)
  assert.match(carousel, /grid-rows-\[0fr\]/)
  assert.match(carousel, /selectedIndex === index \? 'opacity-100' : 'opacity-0'/)
  assert.match(carousel, /mobile-iphone-copy-reveal--measuring/)
  assert.match(carousel, /class="min-h-0 overflow-hidden"/)
  assert.doesNotMatch(carousel, /min-h-40/)
  assert.match(carousel, /align-items: flex-start/)
  assert.match(carousel, /transition: height 300ms ease-out/)
  assert.match(carousel, /touch-action: pan-y pinch-zoom/)
  assert.doesNotMatch(carousel, /mobile-dot-/)
})

test('invoice example catches the first meaningful payment slip', async () => {
  const source = await readSource('src/components/sections/section-iphone.vue')

  for (const fact of [
    "customerName: 'Sam Henderson'",
    "projectName: 'Kitchen remodel'",
    "invoiceNumber: '#INV-2084'",
    "originalTotal: '$28,200'",
    "outstandingBalance: '$9,400'",
    'daysOverdue: 7',
    "dueDate: 'August 2'",
  ]) {
    assert.match(source, new RegExp(fact.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')))
  }
})

test('invoice card opens the existing typed review sheet', async () => {
  const source = await readSource('src/components/global/static-iphone.vue')

  assert.match(source, /import InvoiceReviewCard from '\.\/messages\/invoice-review-card\.vue'/)
  assert.match(source, /activeReviewSheet = computed\([\s\S]*InvoiceReviewSheet/)
  assert.match(source, /<InvoiceReviewCard v-else-if="message\.component === 'invoice-review'" v-bind="message\.card"/)
  assert.match(source, /@approve="approveMessageReview" @dismiss="dismissMessageReview"/)
  await assert.rejects(
    access(join(root, 'src/components/global/messages/review-action-card.vue')),
    'the invented universal review card must stay deleted',
  )
})

test('customer-response story uses the production-shaped email review contract', async () => {
  const [section, phone, card, sheet] = await Promise.all([
    readSource('src/components/sections/section-iphone.vue'),
    readSource('src/components/global/static-iphone.vue'),
    readSource('src/components/global/messages/email-review-card.vue'),
    readSource('src/components/global/messages/email-review-sheet.vue'),
  ])

  for (const fact of [
    "customerName: 'Lauren Bennett'",
    "ccName: 'Mark Bennett'",
    "ccEmail: 'mark@bennettbuild.com'",
    "recipientEmail: 'lauren@bennettbuild.com'",
    "subject: 'Re: Franklin office buildout'",
    "jobName: 'Bennett office'",
    "attachments: ['Bennett-office-plans.pdf']",
    "evidence: ['Incoming email', 'Calendar', 'Service area']",
  ]) {
    assert.match(section, new RegExp(fact.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')))
  }

  assert.match(phone, /import EmailReviewCard from '\.\/messages\/email-review-card\.vue'/)
  assert.match(phone, /import EmailReviewSheet from '\.\/messages\/email-review-sheet\.vue'/)
  assert.match(phone, /<EmailReviewCard v-if="message\.component === 'email-review'"/)
  assert.match(card, /Email reply/)
  assert.match(card, /w-\[88%\]/, 'email review cards use the shared compact transcript width')
  assert.match(card, /text-\[1em\] font-semibold/, 'email subjects use the shared quote-card title scale')
  assert.match(card, /bg-\[#0a84ff\]\/12/, 'approval status uses the shared Swift editorial status treatment')
  assert.match(sheet, /Email draft/)
  assert.match(sheet, /rounded-t-\[1\.765em\]/, 'Swift review sheets use a 30 point top radius')
  assert.match(sheet, /text-\[1\.412em\]/, 'expanded subject mirrors the 24 point Swift title')
  assert.match(sheet, /h-\[3\.294em\]/, 'editorial decision buttons mirror the 56 point Swift minimum height')
  assert.match(sheet, /Tools used/)
  assert.match(sheet, /Approve & Send/)
})

test('invoice example carries the complete Swift review document', async () => {
  const [section, card, sheet] = await Promise.all([
    readSource('src/components/sections/section-iphone.vue'),
    readSource('src/components/global/messages/invoice-review-card.vue'),
    readSource('src/components/global/messages/invoice-review-sheet.vue'),
  ])

  for (const detail of ['paymentHistory', 'reminderDraft', 'verifiedDetails']) {
    assert.match(section, new RegExp(detail))
    assert.match(sheet, new RegExp(detail))
  }

  assert.match(card, /w-\[88%\]/, 'invoice cards keep the current compact transcript width')
  assert.match(sheet, /Payment history/)
  assert.match(sheet, /Reminder draft/)
  assert.match(sheet, /Verified details/)
  assert.match(sheet, /rounded-t-\[2em\]/)
})

test('approval story opens the native-shaped quote review document', async () => {
  const [section, phone, card, sheet] = await Promise.all([
    readSource('src/components/sections/section-iphone.vue'),
    readSource('src/components/global/static-iphone.vue'),
    readSource('src/components/global/messages/quote-review-card.vue'),
    readSource('src/components/global/messages/quote-review-sheet.vue'),
  ])

  for (const detail of ['scopeItems', 'allowances', 'exclusions', 'paymentSchedule', 'schedulingBasis', 'validityDays']) {
    assert.match(section, new RegExp(detail))
    assert.match(sheet, new RegExp(detail))
  }

  assert.match(phone, /import QuoteReviewSheet from '\.\/messages\/quote-review-sheet\.vue'/)
  assert.match(phone, /'quote-review': QuoteReviewSheet/)
  assert.match(phone, /\['email-review', 'invoice-review', 'job-update', 'quote-review'\]/)
  assert.match(phone, /<QuoteReviewCard v-else v-bind="message\.card" :approved="approvedCardId === message\.id"/)
  assert.match(card, /approved \? 'Approved & sent' : 'Needs approval'/)
  assert.match(sheet, /Scope &amp; pricing/)
  assert.match(sheet, /Payment schedule/)
  assert.match(sheet, /Approve & Send/)
})

test('remember-everything story links proof into the native job and email surfaces', async () => {
  const [section, phone, jobCard, jobSheet] = await Promise.all([
    readSource('src/components/sections/section-iphone.vue'),
    readSource('src/components/global/static-iphone.vue'),
    readSource('src/components/global/messages/job-update-card.vue'),
    readSource('src/components/global/messages/job-update-sheet.vue'),
  ])

  for (const fact of [
    "she's holding the $6,200 draw",
    'june 18 at 7:41pm',
    "$1,842 lowe's receipt",
    "component: 'job-update'",
    "status: 'Evidence ready'",
    "title: 'Davis kitchen remodel'",
    "subject: 'Re: Fixture upgrade approval'",
    "attachments: ['Dana-approval.png', 'Lowes-fixtures-receipt.pdf', 'CO-07-fixture-upgrade.pdf']",
    "evidence: ['Customer text', 'Receipt', 'Job record']",
    "sent. i'll watch the thread + the draw",
  ]) {
    assert.match(section, new RegExp(fact.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')))
  }

  assert.match(phone, /import JobUpdateCard from '\.\/messages\/job-update-card\.vue'/)
  assert.match(phone, /import JobUpdateSheet from '\.\/messages\/job-update-sheet\.vue'/)
  assert.match(phone, /activeReviewProps/)
  assert.match(phone, /playbackPausedForReview/)
  assert.match(phone, /clearTimers\(reviewTimers\)/)
  assert.match(phone, /<JobUpdateCard v-else-if="message\.component === 'job-update'" v-bind="message\.card"/)
  assert.match(jobCard, /ComponentJobTranscriptCardView\.swift/)
  assert.match(jobCard, /Job update/)
  assert.match(jobCard, /View job/)
  assert.match(jobSheet, /ComponentJobDetailView\.swift/)
  assert.match(jobSheet, /Recent activity/)
  assert.match(jobSheet, /Contract/)
  assert.match(jobSheet, /Collected/)
  assert.doesNotMatch(jobSheet, /Back to Messages/, 'the web translation must not invent native sheet chrome')
})

test('review cards share the compact typography rhythm and two-layer shadow', async () => {
  const cards = await Promise.all([
    readSource('src/components/global/messages/email-review-card.vue'),
    readSource('src/components/global/messages/invoice-review-card.vue'),
    readSource('src/components/global/messages/job-update-card.vue'),
    readSource('src/components/global/messages/quote-review-card.vue'),
  ])
  const sharedShadow = 'shadow-[0_0.5em_1.5em_-0.25em_rgba(0,0,0,0.08),0_0_0_1px_rgba(0,0,0,0.06)]'

  for (const card of cards) {
    assert.match(card, /w-\[88%\]/)
    assert.match(card, /rounded-\[0\.88em\]/)
    assert.ok(card.includes(sharedShadow), 'every review card uses the same subtle drop and 1px edge shadows')
    assert.match(card, /text-\[0\.675em\]/)
    assert.match(card, /px-\[0\.85em\]/)
  }
})
