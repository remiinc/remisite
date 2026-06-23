<script setup>
import { PhEnvelopeSimple, PhFacebookLogo, PhLinkedinLogo, PhXLogo } from '@phosphor-icons/vue'
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
  caseStudy.value?.metadata.heroImage || caseStudy.value?.metadata.ogImage || ''
)
const tableOfContents = computed(() => caseStudy.value?.toc || [])
const shareUrl = computed(() => {
  if (!caseStudy.value) {
    return ''
  }

  if (typeof window === 'undefined') {
    return caseStudy.value.path
  }

  return new URL(caseStudy.value.path, window.location.origin).href
})
const socialShareLinks = computed(() => {
  if (!caseStudy.value || !shareUrl.value) {
    return []
  }

  const encodedTitle = encodeURIComponent(caseStudy.value.title)
  const encodedUrl = encodeURIComponent(shareUrl.value)

  return [
    {
      label: 'Share on X',
      href: `https://twitter.com/intent/tweet?text=${encodedTitle}&url=${encodedUrl}`,
      icon: PhXLogo,
      external: true,
    },
    {
      label: 'Share on LinkedIn',
      href: `https://www.linkedin.com/sharing/share-offsite/?url=${encodedUrl}`,
      icon: PhLinkedinLogo,
      external: true,
    },
    {
      label: 'Share on Facebook',
      href: `https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}`,
      icon: PhFacebookLogo,
      external: true,
    },
    {
      label: 'Share by email',
      href: `mailto:?subject=${encodedTitle}&body=${encodedUrl}`,
      icon: PhEnvelopeSimple,
      external: false,
    },
  ]
})
const originalTitle = typeof document !== 'undefined' ? document.title : ''
const changedMeta = new Map()

const scrollToHeading = (event, headingId) => {
  if (typeof document === 'undefined') {
    return
  }

  const target = document.getElementById(headingId)

  if (!target) {
    return
  }

  event.preventDefault()
  target.scrollIntoView({
    behavior: window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 'auto' : 'smooth',
    block: 'start',
  })
  window.history.pushState(null, '', `#${headingId}`)
}

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
  setMetaTag('property', 'og:image', caseStudy.value.metadata.ogImage)
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
      <section class="s-full bg-muted px-6 pb-20 pt-[calc(var(--header-height)+2em)]" data-case-study-hero>
        <div class="mx-auto grid w-full max-w-(--content-width) items-stretch gap-10 lg:grid-cols-2">
          <div class="flex max-w-xl flex-col items-stretch justify-between gap-6">
            <div class="flex flex-wrap items-center gap-x-1 gap-y-2 text-sm font-medium text-muted-foreground">
              <span>{{ caseStudy.metadata.category || 'Case Study' }}</span>
              <span v-if="caseStudy.formattedDate" aria-hidden="true">&#183;</span>
              <time v-if="caseStudy.formattedDate" :datetime="caseStudy.date">
                {{ caseStudy.formattedDate }}
              </time>
            </div>

            <h1 class="text-balance text-4xl font-normal leading-none tracking-tight text-foreground md:text-5xl">
              {{ caseStudy.title }}
            </h1>

            <p v-if="caseStudy.description" class="max-w-xl text-pretty text-base leading-normal text-muted-foreground">
              {{ caseStudy.description }}
            </p>
          </div>

          <figure v-if="heroImage" class="overflow-hidden rounded-lg bg-muted">
            <img
              :src="heroImage"
              :alt="caseStudy.metadata.heroImageAlt || caseStudy.title"
              class="aspect-2/1 w-full object-cover"
            >
          </figure>
        </div>
      </section>

      <section class="w-full px-6 py-20" data-case-study-contents>
        <div class="mx-auto grid w-full max-w-(--content-width) gap-x-24 gap-y-12 lg:grid-cols-[1fr_3fr_1fr]">
          <aside
            class="flex w-full flex-col gap-12 lg:sticky lg:top-[calc(var(--header-height)+2em)] lg:max-w-sm lg:self-start"
            aria-label="Case study sidebar"
          >
            <nav class="flex w-full items-center gap-5" aria-label="Share this case study">
              <a
                v-for="link in socialShareLinks"
                :key="link.label"
                :href="link.href"
                :target="link.external ? '_blank' : undefined"
                :rel="link.external ? 'noopener noreferrer' : undefined"
                :aria-label="link.label"
                class="inline-flex size-7 items-center justify-center text-muted-foreground transition-colors hover:text-foreground focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring"
              >
                <component :is="link.icon" class="size-5" weight="fill" aria-hidden="true" />
              </a>
            </nav>

            <nav v-if="tableOfContents.length" class="flex flex-col" aria-label="Table of contents">
              <h2 class="w-full text-sm font-semibold leading-tight tracking-tight text-foreground">
                In this case study
              </h2>
              <div class="mt-2 border-t border-border pt-6">
                <ol class="flex flex-col gap-2">
                  <li v-for="heading in tableOfContents" :key="heading.id">
                    <a
                      :href="`#${heading.id}`"
                      @click="scrollToHeading($event, heading.id)"
                      :class="cn(
                        'block text-sm leading-snug text-muted-foreground transition-colors hover:text-foreground focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring',
                        heading.level === 3 && 'pl-4'
                      )"
                    >
                      {{ heading.title }}
                    </a>
                  </li>
                </ol>
              </div>
            </nav>
          </aside>

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
