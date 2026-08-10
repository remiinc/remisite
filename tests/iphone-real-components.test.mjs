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
  assert.match(section, /playbackObserver\.observe\(phoneMockup\.value\)/)
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
  assert.match(card, /max-w-\[18\.53em\]/, 'Swift transcript cards cap at 315 points')
  assert.match(card, /text-\[1\.118em\]/, 'compact email subject mirrors the 19 point Swift style')
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
