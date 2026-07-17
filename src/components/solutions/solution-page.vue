<script setup>
import { computed, onBeforeUnmount, watchEffect } from 'vue'
import { getSolutionBySlug, solutions } from '../../lib/solutions'
import Button from '../global/button.vue'
import GlobalFooter from '../global/global-footer.vue'
import GlobalHeader from '../header/global-header.vue'
import SectionCta from '../sections/section-cta.vue'
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
  const pageDescription = solution.value.description

  document.title = `${pageTitle} | Remi`
  setMetaTag('name', 'description', pageDescription)
  setMetaTag('property', 'og:title', pageTitle)
  setMetaTag('property', 'og:description', solution.value.metadata.ogDescription || pageDescription)
  setMetaTag('property', 'og:type', 'website')
  setMetaTag('property', 'og:url', window.location.href)
  setMetaTag('property', 'og:image', solution.value.metadata.ogImage)
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
          <div class="flex max-w-4xl self-end flex-col items-start gap-6">
            <p class="text-xs font-medium leading-none text-muted-foreground flex items-center gap-4">
              <span class="uppercase text-foreground">{{ sectionLabel }}</span>
              <span class="text-sm tracking-tight font-normal">{{ solution.industryLabel }}</span>
            </p>
            <h1 class="text-4xl font-normal leading-none tracking-tight text-balance md:text-5xl">
              {{ solution.title }}
            </h1>
            <div class="flex flex-wrap gap-3 mt-4">
              <Button href="/start" variant="primary" size="sm"
                data-marketing-cta="solution_hero_text_remi" data-marketing-destination="linq">
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

            <div v-if="solution.heroMessage"
              class="absolute inset-x-5 bottom-5 z-10 flex justify-end md:inset-x-10 md:bottom-10">
              <div
                class="relative ml-[25%] inline-block max-w-[78%] rounded-l-[1.25em] rounded-tr-[1.25em] rounded-br-[0.25em] bg-blue-400 bg-fixed px-[0.875em] py-[0.5em] text-[0.9em] leading-tight tracking-tight text-white">
                {{ solution.heroMessage }}
              </div>
            </div>
          </figure>
        </div>
      </section>

      <section class="w-full px-6 py-16" data-solution-stats>
        <div class="mx-auto w-full max-w-(--content-width) grid grid-cols-[25%_1fr] gap-x-12 gap-y-4">
          <h2 class="text-xs uppercase font-medium leading-[1.25em] text-muted-foreground/50 max-w-[20ch]">
            Remi for {{ solution.industryLabel }}
          </h2>

          <dl class="grid gap-3 md:max-w-4xl md:justify-self-end md:grid-cols-3 gap-x-4 divide-y divide-border md:divide-none">
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
          <h2 class="max-w-4xl text-4xl font-normal leading-none tracking-tight text-balance md:text-5xl"
            data-solution-use-cases-title>
            {{ solution.useCasesTitle }}
          </h2>

          <article v-for="(useCase, index) in solution.useCases" :key="useCase.title"
            class="grid items-start gap-10 lg:gap-20"
            :class="index % 2 ? 'md:grid-cols-[1fr_25%]' : 'md:grid-cols-[25%_1fr]'">
            <div class="flex max-w-xl flex-col items-start gap-0 md:sticky md:top-[calc(var(--header-height)+2em)]"
              :class="index % 2 ? 'md:order-2' : 'md:order-1'">
              <h2 class="text-lg font-medium leading-tight tracking-tight text-balance">
                {{ useCase.title }}
              </h2>
              <p class="text-lg leading-tight text-pretty text-muted-foreground/75">
                {{ useCase.description }}
              </p>

              <div class="mt-10 w-full border-t border-border/60 pt-5" aria-label="How Remi handles it"
                data-solution-workflow>
                <p class="text-xs font-medium uppercase leading-tight text-muted-foreground/50">
                  How Remi handles it
                </p>
                <ol class="mt-5 flex flex-col">
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
          <h2 class="inline text-4xl font-normal leading-[1em] tracking-tight text-balance text-foreground">
            <span>How we think about security</span>
            <span class="h-[1em] inline-flex items-center">
              <Button href="/security" variant="secondary" size="sm" class="relative left-[0.75em] top-[-0.333em]">
                Learn more
              </Button>
            </span>
          </h2>
        </span>
      </section>
      <SectionSecurityPrinciples id="solution-security" />

      <SolutionTestimonial
        v-if="solution.testimonial && !solution.testimonial.placeholder"
        :testimonial="solution.testimonial"
      />

      <SectionFaq type="solutions" />

      <SectionCta />
    </main>

    <main v-else class="min-h-svh px-6 pt-[calc(var(--header-height)+5rem)]">
      <section class="mx-auto flex max-w-2xl flex-col items-start gap-6 py-24">
        <p class="text-sm font-medium text-muted-foreground">Solutions</p>
        <h1 class="text-5xl font-normal leading-none tracking-tight text-balance">
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
