<script setup>
import { computed, onBeforeUnmount, watchEffect } from 'vue'
import { getSolutionBySlug, solutions } from '../../lib/solutions'
import {
  DEFAULT_OG_IMAGE,
  DEFAULT_OG_IMAGE_ALT,
  getOgImageType,
  OG_IMAGE_HEIGHT,
  OG_IMAGE_WIDTH,
  toAbsoluteSiteUrl,
} from '../../lib/site-metadata'
import Button from '../global/button.vue'
import GlobalFooter from '../global/global-footer.vue'
import GlobalHeader from '../header/global-header.vue'
import SectionFaq from '../sections/section-faq.vue'
import SectionSecurityPrinciples from '../sections/section-security-principles.vue'
import SolutionFeature from './solution-feature.vue'
import SolutionIntegrations from './solution-integrations.vue'
import SolutionIphone from './solution-iphone.vue'
import SolutionTestimonial from './solution-testimonial.vue'
import SolutionUseCaseCatalog from './solution-use-case-catalog.vue'

const requestedSlug = computed(() => {
  if (typeof window === 'undefined') return ''

  const normalizedPath = window.location.pathname.replace(/\/+$/, '')
  return normalizedPath.split('/').filter(Boolean)[1] || ''
})

const solution = computed(() => getSolutionBySlug(requestedSlug.value))
const fallbackSolution = computed(() => solutions[0] || null)
const sectionLabel = computed(() => solution.value?.pageType === 'capability' ? 'Capabilities' : 'Industries')
const originalTitle = typeof document !== 'undefined' ? document.title : ''
const changedMeta = new Map()

const setMetaTag = (attribute, key, content) => {
  if (typeof document === 'undefined' || !content) return

  const selector = `meta[${attribute}="${key}"]`
  let tag = document.head.querySelector(selector)

  if (!changedMeta.has(selector)) {
    changedMeta.set(selector, {
      existed: Boolean(tag),
      content: tag?.getAttribute('content') || '',
    })
  }

  if (!tag) {
    tag = document.createElement('meta')
    tag.setAttribute(attribute, key)
    document.head.appendChild(tag)
  }

  tag.setAttribute('content', content)
}

watchEffect(() => {
  if (typeof document === 'undefined' || !solution.value) return

  const pageTitle = solution.value.metadata.ogTitle || `Remi for ${solution.value.industryLabel}`
  const fullPageTitle = `${pageTitle} | Remi`
  const pageDescription = solution.value.description
  const ogImage = toAbsoluteSiteUrl(solution.value.metadata.ogImage || DEFAULT_OG_IMAGE)
  const ogImageAlt = solution.value.metadata.ogImageAlt || DEFAULT_OG_IMAGE_ALT
  const ogDescription = solution.value.metadata.ogDescription || pageDescription
  const canonicalUrl = toAbsoluteSiteUrl(solution.value.path)

  document.title = fullPageTitle
  setMetaTag('name', 'description', pageDescription)
  setMetaTag('property', 'og:title', fullPageTitle)
  setMetaTag('property', 'og:description', ogDescription)
  setMetaTag('property', 'og:type', 'website')
  setMetaTag('property', 'og:url', canonicalUrl)
  setMetaTag('property', 'og:image', ogImage)
  setMetaTag('property', 'og:image:secure_url', ogImage)
  setMetaTag('property', 'og:image:type', getOgImageType(ogImage))
  setMetaTag('property', 'og:image:width', String(OG_IMAGE_WIDTH))
  setMetaTag('property', 'og:image:height', String(OG_IMAGE_HEIGHT))
  setMetaTag('property', 'og:image:alt', ogImageAlt)
  setMetaTag('name', 'twitter:card', 'summary_large_image')
  setMetaTag('name', 'twitter:url', canonicalUrl)
  setMetaTag('name', 'twitter:title', fullPageTitle)
  setMetaTag('name', 'twitter:description', ogDescription)
  setMetaTag('name', 'twitter:image', ogImage)
  setMetaTag('name', 'twitter:image:alt', ogImageAlt)
})

onBeforeUnmount(() => {
  if (typeof document === 'undefined') return

  document.title = originalTitle
  changedMeta.forEach((snapshot, selector) => {
    const tag = document.head.querySelector(selector)
    if (!tag) return

    if (!snapshot.existed) {
      tag.remove()
      return
    }

    tag.setAttribute('content', snapshot.content)
  })
})
</script>

<template>
  <div class="min-h-svh bg-background text-foreground">
    <GlobalHeader theme="light" />

    <main v-if="solution">
      <section class="w-full px-6 pb-16 pt-[calc(var(--header-height)+5rem)]" data-solution-hero>
        <div class="mx-auto flex w-full max-w-(--content-width) flex-col items-center gap-24">
          <div class="flex w-full max-w-4xl self-end flex-col items-start gap-6">
            <p class="text-xs font-medium leading-none text-muted-foreground flex items-center gap-4">
              <span class="uppercase text-foreground">{{ sectionLabel }}</span>
              <span class="text-sm tracking-tight font-normal">{{ solution.industryLabel }}</span>
            </p>
            <h1 class="headline-h1 text-balance">
              <template v-if="solution.heroTitleLines.length">
                <span v-for="line in solution.heroTitleLines" :key="line" class="block">{{ line }}</span>
              </template>
              <template v-else>{{ solution.title }}</template>
            </h1>
            <p v-if="solution.heroDescription" class="max-w-2xl text-lg leading-snug text-pretty text-muted-foreground">
              {{ solution.heroDescription }}
            </p>
            <div class="flex flex-wrap gap-3 mt-4">
              <Button href="/start" variant="primary" size="sm" data-marketing-cta="solution_hero_text_remi"
                data-marketing-destination="guided">
                <div class="flex items-center gap-2"><img src="/images/app-logos/ios-messages-icon.svg" alt="Google"
                    class="size-3" /><span>Try for Free</span></div>
              </Button>
            </div>
          </div>

          <figure
            class="relative aspect-4/3 w-full overflow-hidden rounded-3xl bg-muted text-[clamp(0.875rem,1.5vw,1.25rem)] md:aspect-2/1"
            :aria-label="solution.heroImageUrl ? solution.heroImageAlt || solution.title : undefined">
            <img v-if="solution.heroImageUrl" :src="solution.heroImageUrl"
              :alt="solution.heroImageAlt || solution.title" width="1600" height="1000"
              class="absolute inset-0 size-full object-cover" loading="eager" decoding="async" fetchpriority="high">

            <div v-if="solution.heroMessage" class="absolute inset-x-5 bottom-5 z-10 flex md:inset-x-10 md:bottom-10"
              :class="solution.heroMessageVariant === 'incoming' ? 'justify-start' : 'justify-end'">
              <div
                class="relative inline-block max-w-[78%] px-[0.875em] py-[0.5em] text-[0.9em] leading-tight tracking-tight"
                :class="solution.heroMessageVariant === 'incoming'
                  ? 'mr-[25%] rounded-r-[1.25em] rounded-tl-[1.25em] rounded-bl-[0.25em] bg-white/90 text-foreground backdrop-blur-sm'
                  : 'ml-[25%] rounded-l-[1.25em] rounded-tr-[1.25em] rounded-br-[0.25em] bg-blue-400 bg-fixed text-white'">
                {{ solution.heroMessage }}
              </div>
            </div>
          </figure>
        </div>
      </section>

      <section class="w-full px-6 py-16" data-solution-stats>
        <div class="mx-auto w-full max-w-(--content-width) grid grid-cols-[25%_1fr] gap-x-12 gap-y-4">
          <p class="max-w-[20ch] text-xs font-medium uppercase leading-[1.25em] text-muted-foreground/50">
            Remi for {{ solution.industryLabel }}
          </p>

          <dl
            class="grid gap-3 md:max-w-4xl md:justify-self-end md:grid-cols-3 gap-x-4 divide-y divide-border md:divide-none">
            <div v-for="stat in solution.stats" :key="`${stat.metric}-${stat.label}`"
              class="flex flex-col justify-between gap-6 py-8 md:py-0 first:pt-0 last:pb-0">
              <dd
                class="text-[clamp(1.5rem,0.8158rem+3.5088vw,3rem)] font-normal leading-[0.825em] tracking-tight tabular-nums">
                {{ stat.metric }}
              </dd>
              <div class="flex flex-col gap-4">
                <dt class="w-full text-sm leading-snug text-pretty text-foreground/70">
                  {{ stat.label }}
                </dt>
                <a :href="stat.sourceUrl" target="_blank" rel="noreferrer"
                  class="w-fit text-xs leading-tight text-muted-foreground underline decoration-foreground/20 underline-offset-4 transition-colors hover:text-foreground focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-ring">
                  {{ stat.sourceLabel }}
                </a>
              </div>
            </div>
          </dl>
        </div>
      </section>

      <section class="w-full px-6 py-16 md:py-24" data-solution-use-cases>
        <div class="mx-auto flex w-full max-w-(--content-width) flex-col gap-24 md:gap-32">
          <h2 class="headline-h2 max-w-4xl text-balance" data-solution-use-cases-title>
            {{ solution.useCasesTitle }}
          </h2>

          <article v-for="(useCase, index) in solution.useCases" :key="useCase.title"
            class="grid items-start gap-10 lg:gap-20"
            :class="index % 2 ? 'md:grid-cols-[1fr_25%]' : 'md:grid-cols-[25%_1fr]'">
            <div class="flex max-w-xl flex-col items-start gap-0 md:sticky md:top-[calc(var(--header-height)+2em)]"
              :class="index % 2 ? 'md:order-2' : 'md:order-1'">
              <h2 class="headline-h5 text-balance">
                {{ useCase.title }}
              </h2>
              <p class="text-base mt-4 leading-tight text-pretty text-muted-foreground/75">
                {{ useCase.description }}
              </p>

              <div class="mt-10 w-full border-t border-border/60 pt-5" :aria-label="solution.workflowLabel"
                data-solution-workflow>
                <p class="text-xs font-medium uppercase leading-tight text-muted-foreground/50">
                  {{ solution.workflowLabel }}
                </p>
                <p v-if="solution.workflowDescription" class="mt-2 text-sm leading-snug text-muted-foreground/65">
                  {{ solution.workflowDescription }}
                </p>
                <ol class="flex flex-col" :class="solution.workflowDescription ? 'mt-4' : 'mt-5'">
                  <li v-for="(step, stepIndex) in useCase.workflow" :key="`${step.key}-${stepIndex}`"
                    class="grid min-w-0 grid-cols-[1.5rem_1fr] gap-3 pb-5 last:pb-0"
                    :data-solution-workflow-step="step.key">
                    <div class="relative flex justify-center">
                      <img :src="step.iconUrl" alt="" class="relative z-1 size-5 shrink-0 object-contain"
                        aria-hidden="true" loading="lazy" decoding="async">
                      <span v-if="stepIndex < useCase.workflow.length - 1"
                        class="absolute top-6 -bottom-5 left-1/2 w-px -translate-x-1/2 bg-border/70" aria-hidden="true"
                        data-solution-workflow-line />
                    </div>
                    <p class="min-w-0 text-sm leading-snug text-foreground/70">
                      {{ step.action }}
                    </p>
                  </li>
                </ol>
              </div>
            </div>

            <figure class="relative h-auto w-full overflow-hidden rounded-3xl bg-muted"
              :class="index % 2 ? 'md:order-1' : 'md:order-2'"
              :aria-label="!useCase.thread && useCase.imageUrl ? useCase.imageAlt || useCase.title : undefined"
              :aria-hidden="!useCase.thread && !useCase.imageUrl ? 'true' : undefined">
              <div v-if="useCase.thread" class="flex items-start justify-center overflow-hidden pt-12">
                <SolutionIphone class="w-[min(74%,24rem)] md:w-[min(58%,26rem)] xl:w-[min(50%,28rem)]"
                  :messages="useCase.thread.messages" :time="useCase.thread.time" />
              </div>
              <img v-else-if="useCase.imageUrl" :src="useCase.imageUrl" :alt="useCase.imageAlt || useCase.title"
                class="absolute inset-0 size-full object-cover" loading="lazy" decoding="async">
            </figure>
          </article>
        </div>
      </section>

      <SolutionIntegrations :integrations="solution.integrations" />

      <SolutionFeature v-if="solution.feature" :feature="solution.feature" />

      <SolutionUseCaseCatalog :catalog="solution.useCaseCatalog" />

      <section class="w-full px-6 pt-20 pb-0" data-section-security-intro>
        <span class="mx-auto flex w-full max-w-(--content-width) items-center gap-6">
          <h2 class="inline headline-h2 sm:headline-h3 text-balance text-foreground">
            <span>How we think about security</span>
            <span class="sm:h-[1em] block sm:inline-flex items-center"><Button href="/security" variant="secondary"
                size="sm" class="font-sans relative sm:left-[0.75em] mt-4 sm:mt-0 sm:top-[-0.333em]">Learn
                more</Button></span>
          </h2>
        </span>
      </section>
      <SectionSecurityPrinciples id="solution-security" />

      <SolutionTestimonial v-if="solution.testimonial && !solution.testimonial.placeholder"
        :testimonial="solution.testimonial" />

      <SectionFaq type="solutions" />

    </main>

    <main v-else class="min-h-svh px-6 pt-[calc(var(--header-height)+5rem)]">
      <section class="mx-auto flex max-w-2xl flex-col items-start gap-6 py-24">
        <p class="text-sm font-medium text-muted-foreground">Solutions</p>
        <h1 class="headline-h1 text-balance">
          Solution guide not found
        </h1>
        <p class="text-lg leading-relaxed text-pretty text-muted-foreground">
          This solution guide is not available.
        </p>
        <Button v-if="fallbackSolution" :href="fallbackSolution.path">
          Browse solution guides
        </Button>
      </section>
    </main>

    <GlobalFooter />
  </div>
</template>
