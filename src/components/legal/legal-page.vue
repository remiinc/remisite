<script setup>
import { computed, onBeforeUnmount, watchEffect } from 'vue'
import GlobalFooter from '../global/global-footer.vue'
import GlobalHeader from '../header/global-header.vue'
import { legalPages } from '../../lib/legal-pages'
import { formatDate } from '../../lib/markdown-content'
import {
  DEFAULT_OG_IMAGE,
  DEFAULT_OG_IMAGE_ALT,
  getOgImageType,
  OG_IMAGE_HEIGHT,
  OG_IMAGE_WIDTH,
  toAbsoluteSiteUrl,
} from '../../lib/site-metadata'

const normalizedPath = computed(() => {
  if (typeof window === 'undefined') return '/terms'
  return window.location.pathname.replace(/\/+$/, '') || '/'
})

const page = computed(() => legalPages.find((entry) => entry.path === normalizedPath.value) || null)
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
  if (typeof document === 'undefined' || !page.value) return

  const pageTitle = page.value.metadata.ogTitle || page.value.title
  const fullPageTitle = `${pageTitle} | Remi`
  const pageDescription = page.value.metadata.ogDescription || page.value.description
  const canonicalUrl = toAbsoluteSiteUrl(page.value.path)
  const ogImage = toAbsoluteSiteUrl(DEFAULT_OG_IMAGE)

  document.title = fullPageTitle
  setMetaTag('name', 'description', pageDescription)
  setMetaTag('property', 'og:title', fullPageTitle)
  setMetaTag('property', 'og:description', pageDescription)
  setMetaTag('property', 'og:type', 'website')
  setMetaTag('property', 'og:url', canonicalUrl)
  setMetaTag('property', 'og:image', ogImage)
  setMetaTag('property', 'og:image:secure_url', ogImage)
  setMetaTag('property', 'og:image:type', getOgImageType(ogImage))
  setMetaTag('property', 'og:image:width', String(OG_IMAGE_WIDTH))
  setMetaTag('property', 'og:image:height', String(OG_IMAGE_HEIGHT))
  setMetaTag('property', 'og:image:alt', DEFAULT_OG_IMAGE_ALT)
  setMetaTag('name', 'twitter:card', 'summary_large_image')
  setMetaTag('name', 'twitter:url', canonicalUrl)
  setMetaTag('name', 'twitter:title', fullPageTitle)
  setMetaTag('name', 'twitter:description', pageDescription)
  setMetaTag('name', 'twitter:image', ogImage)
  setMetaTag('name', 'twitter:image:alt', DEFAULT_OG_IMAGE_ALT)
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

    <main
      v-if="page"
      class="px-6 pb-24 pt-[calc(var(--header-height)+6rem)] md:pb-32 md:pt-[calc(var(--header-height)+8rem)]"
    >
      <div class="mx-auto w-full max-w-3xl">
        <header>
          <h1 class="headline-h1 text-center text-balance">
            {{ page.title }}
          </h1>
        </header>

        <article class="legal-content mt-20 md:mt-28" data-legal-content v-html="page.html" />

        <p class="mt-16 text-sm text-muted-foreground md:mt-20">
          Updated {{ formatDate(page.metadata.dateUpdated) }}
          <span aria-hidden="true"> · </span>
          Effective {{ formatDate(page.metadata.effectiveDate) }}
        </p>
      </div>
    </main>

    <main v-else class="min-h-svh px-6 pt-32">
      <section class="mx-auto flex max-w-2xl flex-col items-start gap-6 py-24">
        <h1 class="headline-h1 text-balance">Page not found</h1>
      </section>
    </main>

    <GlobalFooter />
  </div>
</template>

<style scoped>
.legal-content {
  color: color-mix(in oklch, var(--color-foreground) 78%, transparent);
  font-size: 1rem;
  line-height: 1.75;
}

.legal-content :deep(*) {
  text-wrap: pretty;
}

.legal-content :deep(h2) {
  margin: 3.25rem 0 1rem;
  color: var(--color-foreground);
  scroll-margin-top: calc(var(--header-height) + 2rem);
  text-wrap: balance;
}

.legal-content :deep(h2:first-child) {
  margin-top: 0;
}

.legal-content :deep(p) {
  margin: 1rem 0;
}

.legal-content :deep(.legal-clause-number) {
  margin-right: 0.35rem;
  color: var(--color-foreground);
  font-weight: 500;
  font-variant-numeric: tabular-nums;
}

.legal-content :deep(a) {
  color: var(--color-foreground);
  text-decoration: underline;
  text-decoration-thickness: 0.08em;
  text-underline-offset: 0.18em;
}

.legal-content :deep(ul),
.legal-content :deep(ol) {
  display: grid;
  gap: 0.6rem;
  margin: 1.25rem 0;
  padding-left: 1.35rem;
}

.legal-content :deep(ul) {
  list-style: disc;
}

.legal-content :deep(ol) {
  list-style: decimal;
}
</style>
