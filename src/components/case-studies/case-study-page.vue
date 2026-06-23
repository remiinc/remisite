<script setup>
import { computed, onBeforeUnmount, watchEffect } from 'vue'
import { caseStudies } from '../../lib/case-studies'
import cn from '../../lib/cn'
import Button from '../global/button.vue'
import GlobalFooter from '../global/global-footer.vue'
import GlobalHeader from '../header/global-header.vue'
import SectionCta from '../sections/section-cta.vue'

const requestedSlug = computed(() => {
  if (typeof window === 'undefined') {
    return caseStudies[0]?.slug || ''
  }

  const normalizedPath = window.location.pathname.replace(/\/+$/, '')
  const slug = normalizedPath.split('/').filter(Boolean)[1]

  return slug || caseStudies[0]?.slug || ''
})

const caseStudy = computed(() =>
  caseStudies.find((entry) => entry.slug === requestedSlug.value) || null
)
const fallbackCaseStudy = computed(() => caseStudies[0] || null)

const heroImage = computed(() =>
  caseStudy.value?.coverImageUrl || caseStudy.value?.metadata.ogImage || ''
)
const caseStudyStats = computed(() => caseStudy.value?.stats || [])
const hasPexelsCredit = computed(() =>
  Boolean(
    caseStudy.value?.metadata.pexelsPhotographer &&
    caseStudy.value?.metadata.pexelsPhotographerUrl &&
    caseStudy.value?.metadata.pexelsPhotoUrl
  )
)
const originalTitle = typeof document !== 'undefined' ? document.title : ''
const changedMeta = new Map()

const setMetaTag = (attribute, key, content) => {
  if (typeof document === 'undefined' || !content) {
    return
  }

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
  if (typeof document === 'undefined' || !caseStudy.value) {
    return
  }

  const pageTitle = caseStudy.value.metadata.ogTitle || caseStudy.value.title
  const pageDescription = caseStudy.value.description
  const ogDescription = caseStudy.value.metadata.ogDescription || pageDescription

  document.title = `${pageTitle} | Remi`
  setMetaTag('name', 'description', pageDescription)
  setMetaTag('name', 'author', caseStudy.value.metadata.author)
  setMetaTag('property', 'og:title', pageTitle)
  setMetaTag('property', 'og:description', ogDescription)
  setMetaTag('property', 'og:type', 'article')
  setMetaTag('property', 'og:url', window.location.href)
  setMetaTag('property', 'og:image', caseStudy.value.metadata.ogImage || caseStudy.value.coverImageUrl)
  setMetaTag('property', 'article:published_time', caseStudy.value.date)
})

onBeforeUnmount(() => {
  if (typeof document === 'undefined') {
    return
  }

  document.title = originalTitle

  changedMeta.forEach((snapshot, selector) => {
    const tag = document.head.querySelector(selector)

    if (!tag) {
      return
    }

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

    <main v-if="caseStudy">
      <section class="relative w-full px-6 pb-6 pt-[calc(var(--header-height)+4em)] text-foreground"
        data-case-study-hero>
        <div class="relative mx-auto max-w-3xl">
          <div class="flex w-full flex-col items-stretch justify-between gap-12">
            <div class="flex w-full flex-col items-stretch justify-between gap-4">
              <div class="text-sm opacity-75">
                <span>{{ caseStudy.metadata.category || 'Case Study' }}</span>
              </div>

              <h1 class="text-balance text-4xl font-normal leading-none tracking-tight md:text-5xl">
                {{ caseStudy.title }}
              </h1>
            </div>
            <figure v-if="heroImage" class="relative w-full aspect-3/2 overflow-hidden rounded-2xl bg-muted flex flex-col justify-end p-2">
              <img :src="heroImage" :alt="caseStudy.metadata.coverImageAlt || caseStudy.title"
                class="absolute inset-0 size-full object-cover">
              <dl v-if="caseStudyStats.length" class="flex gap-2 relative z-2" data-case-study-stats>
                <div v-for="stat in caseStudyStats" :key="`${stat.metric}-${stat.label}`"
                  class="min-w-0 flex-1 bg-foreground backdrop-blur-sm rounded-2xl p-4 flex flex-col justify-between gap-8 text-background">
                  <dt class="text-sm leading-snug text-pretty opacity-75">
                    {{ stat.label }}
                  </dt>
                  <dd class="mt-2 text-2xl font-normal leading-none tracking-tight tabular-nums">
                    {{ stat.metric }}
                  </dd>
                </div>
              </dl>
            </figure>
          </div>
        </div>
      </section>

      <section class="w-full px-6 pt-12 pb-20" data-case-study-contents>
        <div class="mx-auto w-full max-w-3xl">
          <article class="case-study-content" v-html="caseStudy.html" :class="cn('*:first:mt-0!')" />
        </div>
      </section>

      <SectionCta />
    </main>

    <main v-else class="min-h-svh px-6 pt-32">
      <section class="mx-auto flex max-w-2xl flex-col items-start gap-6 py-24">
        <p class="text-sm font-medium text-muted-foreground">Case Study</p>
        <h1 class="text-balance text-5xl font-normal leading-none tracking-tight">
          Case study not found
        </h1>
        <p class="text-pretty text-lg leading-8 text-muted-foreground">
          This Markdown file is not available yet.
        </p>
        <Button v-if="fallbackCaseStudy" :href="fallbackCaseStudy.path">
          Open the example case study
        </Button>
      </section>
    </main>

    <GlobalFooter />
  </div>
</template>

<style scoped>
.case-study-content {
  color: color-mix(in oklch, var(--color-foreground) 82%, transparent);
  font-size: 1.0625rem;
  line-height: 1.8;
}

.case-study-content :deep(*) {
  text-wrap: pretty;
}

.case-study-content :deep(h1),
.case-study-content :deep(h2),
.case-study-content :deep(h3) {
  color: var(--color-foreground);
  font-weight: 400;
  letter-spacing: var(--tracking-tight);
  line-height: 1.12;
  scroll-margin-top: calc(var(--header-height) + 2rem);
  text-wrap: balance;
}

.case-study-content :deep(h1) {
  margin: 2.75rem 0 1rem;
  font-size: 2rem;
}

.case-study-content :deep(h2) {
  margin: 2.25rem 0 0.75rem;
  font-size: 1.5rem;
}

.case-study-content :deep(h3) {
  margin: 1.75rem 0 0.6rem;
  font-size: 1.2rem;
}

@media (min-width: 768px) {
  .case-study-content :deep(h1) {
    font-size: 2.5rem;
  }

  .case-study-content :deep(h2) {
    font-size: 1.85rem;
  }

  .case-study-content :deep(h3) {
    font-size: 1.35rem;
  }
}

.case-study-content :deep(p) {
  margin: 1rem 0;
}

.case-study-content :deep(a) {
  color: var(--color-foreground);
  text-decoration: underline;
  text-decoration-thickness: 0.08em;
  text-underline-offset: 0.18em;
}

.case-study-content :deep(strong) {
  color: var(--color-foreground);
  font-weight: 600;
}

.case-study-content :deep(ul),
.case-study-content :deep(ol) {
  display: grid;
  gap: 0.65rem;
  margin: 1.25rem 0;
  padding-left: 1.35rem;
}

.case-study-content :deep(ul) {
  list-style: disc;
}

.case-study-content :deep(ol) {
  list-style: decimal;
}

.case-study-content :deep(blockquote) {
  margin: 2rem 0;
  border-left: 2px solid var(--color-foreground);
  padding-left: 1.25rem;
  color: var(--color-foreground);
  font-size: 1.25rem;
  line-height: 1.6;
}

.case-study-content :deep(figure) {
  margin: 2rem 0;
}

.case-study-content :deep(img) {
  width: 100%;
  border-radius: 0.5rem;
  background: var(--color-muted);
}

.case-study-content :deep(code) {
  border-radius: 0.25rem;
  background: var(--color-muted);
  padding: 0.125rem 0.35rem;
  color: var(--color-foreground);
  font-size: 0.92em;
}
</style>
