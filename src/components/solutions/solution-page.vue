<script setup>
import { computed, onBeforeUnmount, watchEffect } from 'vue'
import { getSolutionBySlug, solutions } from '../../lib/solutions'
import Button from '../global/button.vue'
import GlobalFooter from '../global/global-footer.vue'
import GlobalHeader from '../header/global-header.vue'
import SectionCta from '../sections/section-cta.vue'
import SolutionIphone from './solution-iphone.vue'

const requestedSlug = computed(() => {
  if (typeof window === 'undefined') return ''

  const normalizedPath = window.location.pathname.replace(/\/+$/, '')
  return normalizedPath.split('/').filter(Boolean)[1] || ''
})

const solution = computed(() => getSolutionBySlug(requestedSlug.value))
const fallbackSolution = computed(() => solutions[0] || null)
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
              <span class="uppercase text-foreground">Solutions</span>
              <span class="text-sm tracking-tight">{{ solution.industryLabel }}</span>
            </p>
            <h1 class="text-4xl font-normal leading-none tracking-tight text-balance md:text-5xl">
              {{ solution.title }}
            </h1>
            <Button href="/qualify" size="sm" variant="secondary" class="mt-4">Book a demo</Button>
          </div>

          <figure
            class="relative aspect-4/3 w-full overflow-hidden rounded-3xl bg-muted text-[clamp(0.875rem,1.5vw,1.25rem)] md:aspect-2/1"
            :aria-label="solution.heroImageUrl ? solution.heroImageAlt || solution.title : undefined">
            <img v-if="solution.heroImageUrl" :src="solution.heroImageUrl"
              :alt="solution.heroImageAlt || solution.title" class="absolute inset-0 size-full object-cover">

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

          <dl class="grid gap-3 md:grid-cols-3 gap-x-4 divide-y divide-border md:divide-none">
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
            </div>

            <figure class="relative h-auto w-full overflow-hidden rounded-3xl bg-muted"
              :class="index % 2 ? 'md:order-1' : 'md:order-2'"
              :aria-label="!useCase.thread && useCase.imageUrl ? useCase.imageAlt || useCase.title : undefined"
              :aria-hidden="!useCase.thread && !useCase.imageUrl ? 'true' : undefined">
              <div v-if="useCase.thread" class="flex items-start justify-center overflow-hidden pt-12">
                <SolutionIphone
                  class="w-[min(74%,24rem)] md:w-[min(58%,26rem)] xl:w-[min(50%,28rem)]"
                  :messages="useCase.thread.messages"
                  :time="useCase.thread.time"
                />
              </div>
              <img v-else-if="useCase.imageUrl" :src="useCase.imageUrl" :alt="useCase.imageAlt || useCase.title"
                class="absolute inset-0 size-full object-cover" loading="lazy" decoding="async">
            </figure>
          </article>
        </div>
      </section>

      <section v-if="solution.testimonial" class="w-full px-6 py-16 md:py-24" aria-label="Customer testimonial"
        data-solution-testimonial>
        <figure
          class="mx-auto flex min-h-96 w-full max-w-(--content-width) flex-col items-center justify-center gap-12 rounded-3xl bg-muted p-8 text-center md:p-16">
          <blockquote class="max-w-4xl text-3xl font-normal leading-tight tracking-tight text-balance md:text-5xl">
            &ldquo;{{ solution.testimonial.quote }}&rdquo;
          </blockquote>
          <figcaption class="text-sm text-muted-foreground">
            {{ solution.testimonial.author }}<span v-if="solution.testimonial.role">, {{ solution.testimonial.role
              }}</span>
          </figcaption>
        </figure>
      </section>

      <SectionCta />
    </main>

    <main v-else class="min-h-svh px-6 pt-[calc(var(--header-height)+5rem)]">
      <section class="mx-auto flex max-w-2xl flex-col items-start gap-6 py-24">
        <p class="text-sm font-medium text-muted-foreground">Solutions</p>
        <h1 class="text-5xl font-normal leading-none tracking-tight text-balance">
          Solution guide not found
        </h1>
        <p class="text-lg leading-relaxed text-pretty text-muted-foreground">
          This industry guide is not available.
        </p>
        <Button v-if="fallbackSolution" :href="fallbackSolution.path">
          Browse solution guides
        </Button>
      </section>
    </main>

    <GlobalFooter />
  </div>
</template>
