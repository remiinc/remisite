<script setup>
import { computed, onMounted } from 'vue'
import AnnouncementBar from './components/global/announcement-bar.vue'
import BlogIndexPage from './components/blog/blog-index-page.vue'
import BlogPostPage from './components/blog/blog-post-page.vue'
import CaseStudyPage from './components/case-studies/case-study-page.vue'
import GlobalFooter from './components/global/global-footer.vue'
import GlobalHeader from './components/header/global-header.vue'
import HomeHeroVideo from './components/home/home-hero-video.vue'
import PricingPage from './components/pricing/pricing-page.vue'
import QualifyContact from './components/qualify/qualify-contact.vue'
import SectionCta from './components/sections/section-cta.vue'
import SectionCaseStudies from './components/sections/section-case-studies.vue'
import SectionIphone from './components/sections/section-iphone.vue'
import SectionPinnedHeadline from './components/sections/section-pinned-headline.vue'
import SectionFeatures from './components/sections/section-features.vue'
import SolutionPage from './components/solutions/solution-page.vue'
import { capturePageview } from './lib/analytics.js'

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
const isBlogIndexPage = computed(() => normalizedPath.value === '/blog')
const isBlogPostPage = computed(() => normalizedPath.value.startsWith('/blog/'))
const isPricingPage = computed(() => normalizedPath.value === '/pricing')
const isCaseStudyPage = computed(() =>
  normalizedPath.value === '/case-studies' || normalizedPath.value.startsWith('/case-studies/'),
)

const qualifyContactEmail = computed(() => {
  const params = new URLSearchParams(searchString)
  return params.get('email') || ''
})

onMounted(() => capturePageview())
</script>

<template>
  <QualifyContact v-if="isQualifyPage" :email="qualifyContactEmail" />
  <SolutionPage v-else-if="isSolutionPage" />
  <PricingPage v-else-if="isPricingPage" />
  <BlogIndexPage v-else-if="isBlogIndexPage" />
  <BlogPostPage v-else-if="isBlogPostPage" />
  <CaseStudyPage v-else-if="isCaseStudyPage" />
  <div v-else>
    <main class="min-h-svh bg-background text-foreground overscroll-none">
      <AnnouncementBar />
      <GlobalHeader />
      <HomeHeroVideo />
      <SectionPinnedHeadline />
      <SectionIphone />
      <SectionFeatures />
      <SectionCaseStudies />
      <SectionCta />
    </main>
    <GlobalFooter />
  </div>
</template>
