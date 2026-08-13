import assert from 'node:assert/strict'
import { readFile } from 'node:fs/promises'
import { dirname, join } from 'node:path'
import test from 'node:test'
import { fileURLToPath } from 'node:url'

const root = join(dirname(fileURLToPath(import.meta.url)), '..')

test('pricing media uses a four-image Embla carousel with autoplay progress and dots', async () => {
  const source = await readFile(join(root, 'src/components/sections/section-pricing.vue'), 'utf8')
  const slidesBlock = source.match(/const carouselSlides = \[([\s\S]*?)\n\]/)?.[1] || ''

  assert.equal(slidesBlock.match(/\bsrc:/g)?.length, 4)
  assert.match(slidesBlock, /src: '\/images\/solutions\/plumbing-feature@2x\.webp'/)
  assert.match(source, /import Autoplay from 'embla-carousel-autoplay'/)
  assert.match(source, /import useEmblaCarousel from 'embla-carousel-vue'/)
  assert.match(source, /import MessageNotification from '\.\/components\/message-notification\.vue'/)
  assert.match(source, /const carouselPlugins = \[Autoplay\(\{/)
  assert.match(source, /playOnInit: false/)
  assert.match(source, /stopOnFocusIn: false/)
  assert.match(source, /stopOnInteraction: true/)
  assert.match(source, /stopOnMouseEnter: false/)
  assert.match(source, /useEmblaCarousel\(carouselOptions, carouselPlugins\)/)
  assert.match(source, /api\.on\('select', handleSelect\)/)
  assert.match(source, /api\.on\('pointerDown', handlePointerDown\)/)
  assert.match(source, /api\.on\('pointerUp', handlePointerUp\)/)
  assert.match(source, /api\.on\('autoplay:timerset', handleTimerSet\)/)
  assert.match(source, /api\.on\('autoplay:timerstopped', handleTimerStopped\)/)
  assert.match(source, /v-for="\(slide, index\) in carouselSlides"/)
  assert.match(source, /ref="carouselRef" class="h-\[28rem\] overflow-hidden rounded-3xl sm:h-\[38rem\] lg:h-\[42rem\]"/)
  assert.doesNotMatch(source, /ref="carouselRef"[^>]*\bbg-/)
  assert.match(source, /pricing-carousel__container flex h-full/)
  assert.match(source, /mr-3 h-full w-full min-w-0 flex-\[0_0_100%\] overflow-hidden rounded-3xl/)
  assert.match(source, /class="absolute inset-0 size-full rounded-3xl object-cover"/)
  assert.doesNotMatch(source, /placeholder/i)
  assert.equal(slidesBlock.match(/\bmessages:/g)?.length, 4)
  assert.match(slidesBlock, /henderson paid the final invoice last night/)
  assert.match(slidesBlock, /new lead from the parkers/)
  assert.match(slidesBlock, /caudill quote is ready for review/)
  assert.match(slidesBlock, /tomorrow is set\. crew confirmed/)
  assert.match(source, /class="absolute inset-0 z-10 grid place-items-center p-6"/)
  assert.match(source, /<MessageNotification[\s\S]*:messages="slide\.messages"[\s\S]*:autoplay="false"[\s\S]*:loop="false"[\s\S]*:max-visible="1"/)
  assert.doesNotMatch(source, /slide\.caption/)
  assert.doesNotMatch(source, /<figcaption/)
  assert.match(source, /data-pricing-carousel-dot/)
  assert.match(source, /@click="scrollToSlide\(index\)"/)
  assert.match(source, /remainingAutoplayDelay = Math\.max\(0, carouselDelay - \(now - autoplayTimerStartedAt\)\)/)
  assert.match(source, /window\.setTimeout\(\(\) => finishRemainingAutoplay\(api\), remainingAutoplayDelay\)/)
  assert.match(source, /'--pricing-carousel-elapsed': `-\$\{progressElapsed\}ms`/)
  assert.match(source, /animation-delay: var\(--pricing-carousel-elapsed\)/)
  assert.doesNotMatch(source, /autoplay\?\.reset\(\)/)
  assert.match(source, /selectedSlideIndex === index \? 'grow-\[4\]' : 'grow'/)
  assert.doesNotMatch(source, /\{\{ selectedSlideIndex \+ 1 \}\} \/ \{\{ carouselSlides\.length \}\}/)
  assert.match(source, /pricing-carousel__progress/)
  assert.match(source, /animation: pricing-carousel-progress var\(--pricing-carousel-delay\) linear forwards/)
  assert.match(source, /@media \(prefers-reduced-motion: reduce\)/)
  assert.doesNotMatch(source, /requestAnimationFrame/)
})

test('pricing page renders the shared pricing section', async () => {
  const source = await readFile(join(root, 'src/components/pricing/pricing-page.vue'), 'utf8')

  assert.match(source, /import SectionPricing from '\.\.\/sections\/section-pricing\.vue'/)
  assert.match(source, /<SectionPricing \/>/)
  assert.doesNotMatch(source, /PricingPlans/)
})

test('pricing includes unlimited fair usage without adding plan complexity', async () => {
  const source = await readFile(join(root, 'src/components/sections/section-pricing.vue'), 'utf8')
  const prerender = await readFile(join(root, 'scripts/prerender.mjs'), 'utf8')
  const faqs = await readFile(join(root, 'src/lib/faqs.js'), 'utf8')
  const llms = await readFile(join(root, 'public/llms.txt'), 'utf8')
  const pricingResources = await Promise.all([
    'ai-employee-vs-virtual-assistant.md',
    'remi-vs-lindy-vs-viktor.md',
    'remi-vs-part-time-office-manager.md',
    'what-is-an-ai-back-office.md',
  ].map((file) => readFile(join(root, 'src/content/resources', file), 'utf8')))

  assert.match(source, /'Unlimited fair usage with default AI model'/)
  assert.doesNotMatch(source, /One simple plan/)
  assert.doesNotMatch(source, /per-message fees|usage packs/)
  assert.match(prerender, /A teammate that helps you win more work and keep jobs on track\./)
  assert.match(prerender, /Remi brings your customers, jobs, and payments together/)
  assert.match(prerender, /<h1 class="headline-h1">One missed follow-up can cost more than a month of Remi\.<\/h1>/)
  assert.match(prerender, /Unlimited fair usage with default AI model/)
  assert.match(prerender, /\$49 per month\./)
  assert.doesNotMatch(prerender, /Plans start at \$99|<h2 class="headline-h6">Pro<\/h2>|<h2 class="headline-h6">Scale<\/h2>/)
  assert.match(faqs, /Remi is \$49 per month during Early Access/)
  assert.match(faqs, /unlimited fair usage with the default AI model/)
  assert.doesNotMatch(faqs, /Pro is \$119|Scale is \$239|Annual billing saves|Capacity add-ons/)
  assert.match(llms, /Remi is \$49 per month during Early Access/)
  assert.match(llms, /unlimited fair usage with\s+the default AI model/)
  assert.doesNotMatch(llms, /Pro is \$99|Scale is \$199|more work capacity/)
  pricingResources.forEach((resource) => {
    assert.match(resource, /Remi is \$49 a month during Early Access/)
    assert.match(resource, /unlimited fair usage with the default AI model/)
    assert.doesNotMatch(resource, /Remi is \$99|Pro is \$99|Scale is \$199|\$199 for Scale/)
  })
})
