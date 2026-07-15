<script setup>
import { computed } from 'vue'
import AnnouncementBar from './components/global/announcement-bar.vue'
import BlogIndexPage from './components/blog/blog-index-page.vue'
import BlogPostPage from './components/blog/blog-post-page.vue'
import GlobalFooter from './components/global/global-footer.vue'
import GlobalHeader from './components/header/global-header.vue'
import LegacyRedirect from './components/global/legacy-redirect.vue'
import HomeHeroVideo from './components/home/home-hero-video.vue'
import PricingPage from './components/pricing/pricing-page.vue'
import QualifyContact from './components/qualify/qualify-contact.vue'
import SecurityPage from './components/security/security-page.vue'
import { getLegacySolutionRedirect } from './lib/solution-redirects'
import SectionCta from './components/sections/section-cta.vue'
import SectionIphone from './components/sections/section-iphone.vue'
import SectionPinnedHeadline from './components/sections/section-pinned-headline.vue'
import SectionFeatures from './components/sections/section-features.vue'
import SectionSolutions from './components/sections/section-solutions.vue'
import SolutionPage from './components/solutions/solution-page.vue'
import SolutionsIndexPage from './components/solutions/solutions-index-page.vue'

const pathname = typeof window !== 'undefined' ? window.location.pathname : '/'
const searchString = typeof window !== 'undefined' ? window.location.search : ''

const normalizedPath = computed(() => pathname.replace(/\/+$/, '') || '/')
const isQualifyPage = computed(() =>
  normalizedPath.value === '/qualify' || normalizedPath.value === '/qualify/contact',
)

const legacyRedirectTarget = computed(() => getLegacySolutionRedirect(normalizedPath.value))
const isSolutionsIndexPage = computed(() => normalizedPath.value === '/solutions')
const isSolutionPage = computed(() => normalizedPath.value.startsWith('/solutions/'))
const isBlogIndexPage = computed(() => normalizedPath.value === '/blog')
const isBlogPostPage = computed(() => normalizedPath.value.startsWith('/blog/'))
const isPricingPage = computed(() => normalizedPath.value === '/pricing')
const isSecurityPage = computed(() => normalizedPath.value === '/security')

const qualifyContactEmail = computed(() => {
  const params = new URLSearchParams(searchString)
  return params.get('email') || ''
})
</script>

<template>
  <QualifyContact v-if="isQualifyPage" :email="qualifyContactEmail" />
  <LegacyRedirect v-else-if="legacyRedirectTarget" :to="legacyRedirectTarget" />
  <SolutionsIndexPage v-else-if="isSolutionsIndexPage" />
  <SolutionPage v-else-if="isSolutionPage" />
  <PricingPage v-else-if="isPricingPage" />
  <SecurityPage v-else-if="isSecurityPage" />
  <BlogIndexPage v-else-if="isBlogIndexPage" />
  <BlogPostPage v-else-if="isBlogPostPage" />
  <div v-else>
    <main class="min-h-svh bg-background text-foreground overscroll-none">
      <AnnouncementBar />
      <GlobalHeader />
      <HomeHeroVideo />
      <SectionPinnedHeadline />
      <SectionIphone />
      <SectionFeatures />
      <SectionSolutions />
      <SectionCta />
    </main>
    <GlobalFooter />
  </div>
</template>
