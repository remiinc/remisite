<script setup>
import missionSource from '../../content/mission.md?raw'
import { parseFrontmatter, renderMarkdown } from '../../lib/markdown-content.js'
import Button from '../global/button.vue'
import GlobalFooter from '../global/global-footer.vue'
import GlobalHeader from '../header/global-header.vue'

const { metadata, markdown } = parseFrontmatter(missionSource)

const slugify = (value) => value
  .toLowerCase()
  .replace(/[^a-z0-9]+/g, '-')
  .replace(/^-+|-+$/g, '')

const sections = markdown
  .split(/^##\s+/m)
  .filter(Boolean)
  .map((section) => {
    const [title, ...bodyLines] = section.split('\n')

    return {
      id: slugify(title),
      title,
      html: renderMarkdown(bodyLines.join('\n').trim()).html,
    }
  })

if (typeof document !== 'undefined') {
  const pageTitle = metadata.ogTitle || 'Our Mission | Remi'
  const pageDescription = metadata.ogDescription || metadata.description
  const canonicalUrl = 'https://hireremi.ai/about'

  document.title = pageTitle
  document.querySelector('meta[name="description"]')?.setAttribute('content', pageDescription)
  document.querySelector('link[rel="canonical"]')?.setAttribute('href', canonicalUrl)
  document.querySelector('meta[property="og:title"]')?.setAttribute('content', pageTitle)
  document.querySelector('meta[property="og:description"]')?.setAttribute('content', pageDescription)
  document.querySelector('meta[property="og:url"]')?.setAttribute('content', canonicalUrl)
  document.querySelector('meta[name="twitter:title"]')?.setAttribute('content', pageTitle)
  document.querySelector('meta[name="twitter:description"]')?.setAttribute('content', pageDescription)
  document.querySelector('meta[name="twitter:url"]')?.setAttribute('content', canonicalUrl)
}
</script>

<template>
  <div class="min-h-svh bg-foreground text-background">
    <GlobalHeader />

    <main>
      <section class="flex min-h-168 bg-foreground px-6 pt-[calc(var(--header-height)+4rem)]"
        aria-labelledby="mission-title" data-about-hero>
        <div class="mx-auto flex w-full max-w-(--content-width) flex-col gap-24">
          <div class="flex flex-col max-w-3xl mx-auto items-start text-left gap-6 w-full text-4xl">
            <p class="text-xs font-medium leading-none uppercase text-current">
              {{ metadata.heroTitle }}
            </p>
            <h1 id="mission-title" class="headline-h2 mx-auto text-pretty mb-4">
              <span class="text-current font-medium">{{ metadata.heroLead }}&nbsp;</span>
            </h1>
            <Button href="/start" variant="translucent" size="lg" data-marketing-cta="about_text_remi"
              data-marketing-destination="guided">
              <span class="flex items-center gap-2.5">
                <img src="/images/app-logos/ios-messages-icon.svg" alt="" class="size-4 shrink-0" aria-hidden="true">
                <span>Text Remi</span>
              </span>
            </Button>
          </div>
          <figure class="mx-auto w-full max-w-(--content-width) overflow-hidden rounded-2xl bg-current/10">
            <img src="/images/about-hero@2x.webp" alt="Construction professional working at a timber-framed jobsite"
              width="1600" height="1000" fetchpriority="high" class="aspect-16/7 size-full object-cover">
          </figure>
        </div>
      </section>

      <section class="px-6 py-24" aria-label="What we believe">
        <div class="mx-auto w-full max-w-3xl">
          <p class="mb-10 text-xs font-medium leading-none uppercase text-current">
            What we believe
          </p>
          <h2 class="headline-h2 mx-auto mb-20 text-pretty">{{
            metadata.heroDescription }}</h2>
          <div class="divide-y divide-current/5">
            <article v-for="(section, index) in sections" :id="section.id" :key="section.id"
              class="about-section w-full grid gap-6 py-12 md:grid-cols-[0.75fr_1.25fr]">
              <div class="flex items-start gap-6">
                <h2 class="headline-h5 max-w-[18ch] text-balance">
                  {{ section.title }}
                </h2>
              </div>
              <div class="text-base text-current/60 max-w-2xl tracking-tight" v-html="section.html" />
            </article>
          </div>
        </div>
      </section>

      <section class="px-6 pb-24" aria-labelledby="founders-title">
        <div class="mx-auto w-full max-w-5xl">
          <figure class="overflow-hidden rounded-2xl bg-current/10">
            <img src="/images/about-founders@2x.webp" alt="Remi co-founders Hunter Hammonds and Petr Knoll" width="2454"
              height="1636" loading="lazy" decoding="async" class="block h-auto w-full">
          </figure>
          <div class="about-section w-full grid gap-6 py-12 md:grid-cols-[0.75fr_1.25fr] text-background">
            <h2 id="founders-title" class="headline-h3 w-full mb-10 text-balance leading-none">
              Our story
            </h2>
            <div class="text-base tracking-tight">
              <p class="text-current/60 mb-4">
                We’ve spent the past nine years building companies together across the US and Czechia. We know the
                rhythm of a service business: today’s work becomes tonight’s admin, and the things that matter most
                are often the easiest to let slip.
              </p>
              <p class="text-current/60 mb-4">
                We built Remi because we needed a better answer ourselves. Not another system to configure and
                maintain, but a reliable teammate who notices what needs attention, takes the work, and keeps the
                owner in control.
              </p>
              <p class="text-current/60 mb-4">
                That experience still shapes every decision we make. Remi should give owners more time for the work,
                people, and businesses they care about—not more software to manage.
              </p>
              <p class="text-sm text-balance tracking-tight text-current mt-8">
                Hunter &amp; Petr
              </p>
            </div>
          </div>
        </div>
      </section>

    </main>

    <GlobalFooter />
  </div>
</template>
