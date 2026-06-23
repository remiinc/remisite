<script setup>
import { computed } from 'vue'
import AnnouncementBar from './components/global/announcement-bar.vue'
import BlogPostPage from './components/blog/blog-post-page.vue'
import CaseStudyPage from './components/case-studies/case-study-page.vue'
import GlobalFooter from './components/global/global-footer.vue'
import GlobalHeader from './components/header/global-header.vue'
import HomeHeroVideo from './components/home/home-hero-video.vue'
import QualifyContact from './components/qualify/qualify-contact.vue'
import SectionCta from './components/sections/section-cta.vue'
import SectionFaq from './components/sections/section-faq.vue'
import SectionPinnedHeadline from './components/sections/section-pinned-headline.vue'
import SectionHow from './components/sections/section-how.vue'
import SectionNews from './components/sections/section-news.vue'
import SectionSurfaces from './components/sections/section-surfaces.vue'
import SectionSolutions from './components/sections/section-solutions.vue'
import SectionWhyRemi from './components/sections/section-why-remi.vue'
import SolutionPage from './components/solutions/solution-page.vue'

const pathname = typeof window !== 'undefined' ? window.location.pathname : '/'
const searchString = typeof window !== 'undefined' ? window.location.search : ''

const normalizedPath = computed(() => pathname.replace(/\/+$/, '') || '/')
const isQualifyPage = computed(() =>
  normalizedPath.value === '/qualify' || normalizedPath.value === '/qualify/contact',
)

const solutionPagePaths = [
  '/solutions/startups',
  '/solutions/small-businesses',
  '/solutions/mid-market',
]

const isSolutionPage = computed(() => solutionPagePaths.includes(normalizedPath.value))
const isBlogPage = computed(() =>
  normalizedPath.value === '/blog' || normalizedPath.value.startsWith('/blog/'),
)
const isCaseStudyPage = computed(() =>
  normalizedPath.value === '/case-studies' || normalizedPath.value.startsWith('/case-studies/'),
)

const qualifyContactEmail = computed(() => {
  const params = new URLSearchParams(searchString)
  return params.get('email') || ''
})
</script>

<template>
  <QualifyContact v-if="isQualifyPage" :email="qualifyContactEmail" />
  <SolutionPage v-else-if="isSolutionPage" />
  <BlogPostPage v-else-if="isBlogPage" />
  <CaseStudyPage v-else-if="isCaseStudyPage" />
  <div v-else>
    <main class="min-h-svh bg-background text-foreground overscroll-none">
      <AnnouncementBar />
      <GlobalHeader />
      <HomeHeroVideo />
      <SectionPinnedHeadline />
      <SectionHow />
      <SectionSurfaces />
      <SectionWhyRemi />
      <SectionSolutions />
      <SectionNews />
      <SectionFaq />
      <SectionCta />
    </main>
    <GlobalFooter />
  </div>
</template>
