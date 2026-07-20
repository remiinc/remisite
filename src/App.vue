<script setup>
import { computed, defineAsyncComponent, onBeforeUnmount, onMounted, ref } from 'vue'
import AnnouncementBar from './components/global/announcement-bar.vue'
import GlobalFooter from './components/global/global-footer.vue'
import GlobalHeader from './components/header/global-header.vue'
import HomeHeroVideo from './components/home/home-hero-video.vue'
import { getLegacySolutionRedirect } from './lib/solution-redirects'
import SectionCta from './components/sections/section-cta.vue'
import SectionPinnedHeadline from './components/sections/section-pinned-headline.vue'
import SectionFeatures from './components/sections/section-features.vue'
import SectionFaq from './components/sections/section-faq.vue'
import SectionPricing from './components/sections/section-pricing.vue'
import SectionSolutions from './components/sections/section-solutions.vue'
import { capturePageview, installMarketingCtaTracking } from './lib/analytics.js'
import { initializeMotionEffects } from './lib/motion.js'
import { pageLoaders } from './lib/page-loaders.js'

const BlogIndexPage = defineAsyncComponent(pageLoaders.blogIndex)
const BlogPostPage = defineAsyncComponent(pageLoaders.blogPost)
const LegacyRedirect = defineAsyncComponent(pageLoaders.legacyRedirect)
const PricingPage = defineAsyncComponent(pageLoaders.pricing)
const SecurityPage = defineAsyncComponent(pageLoaders.security)
const SolutionPage = defineAsyncComponent(pageLoaders.solution)
const SolutionsIndexPage = defineAsyncComponent(pageLoaders.solutionsIndex)
const StartPage = defineAsyncComponent(pageLoaders.start)
const SectionIphone = defineAsyncComponent(() => import('./components/sections/section-iphone.vue'))

const pathname = typeof window !== 'undefined' ? window.location.pathname : '/'

const normalizedPath = computed(() => pathname.replace(/\/+$/, '') || '/')
const legacyRedirectTarget = computed(() => getLegacySolutionRedirect(normalizedPath.value))
const isSolutionsIndexPage = computed(() => normalizedPath.value === '/solutions')
const isSolutionPage = computed(() => normalizedPath.value.startsWith('/solutions/'))
const isBlogIndexPage = computed(() => normalizedPath.value === '/resources')
const isBlogPostPage = computed(() => normalizedPath.value.startsWith('/resources/'))
const isPricingPage = computed(() => normalizedPath.value === '/pricing')
const isSecurityPage = computed(() => normalizedPath.value === '/security')
const isStartPage = computed(() => normalizedPath.value === '/start')
const iphoneSectionTrigger = ref(null)
const shouldLoadIphoneSection = ref(false)
let iphoneSectionObserver = null

let stopMarketingCtaTracking = null
let stopMotionEffects = null

onMounted(() => {
  capturePageview()
  stopMarketingCtaTracking = installMarketingCtaTracking()
  stopMotionEffects = initializeMotionEffects()

  if (!('IntersectionObserver' in window) || !iphoneSectionTrigger.value) {
    shouldLoadIphoneSection.value = true
    return
  }

  iphoneSectionObserver = new IntersectionObserver(([entry]) => {
    if (!entry?.isIntersecting) return
    shouldLoadIphoneSection.value = true
    iphoneSectionObserver.disconnect()
    iphoneSectionObserver = null
  }, { rootMargin: '1200px 0px' })

  iphoneSectionObserver.observe(iphoneSectionTrigger.value)
})

onBeforeUnmount(() => {
  stopMarketingCtaTracking?.()
  stopMotionEffects?.()
  iphoneSectionObserver?.disconnect()
})
</script>

<template>
  <LegacyRedirect v-if="legacyRedirectTarget" :to="legacyRedirectTarget" />
  <SolutionsIndexPage v-else-if="isSolutionsIndexPage" />
  <SolutionPage v-else-if="isSolutionPage" />
  <PricingPage v-else-if="isPricingPage" />
  <SecurityPage v-else-if="isSecurityPage" />
  <StartPage v-else-if="isStartPage" />
  <BlogIndexPage v-else-if="isBlogIndexPage" />
  <BlogPostPage v-else-if="isBlogPostPage" />
  <div v-else>
    <main class="min-h-svh bg-background text-foreground overscroll-none">
      <AnnouncementBar />
      <GlobalHeader />
      <HomeHeroVideo />
      <SectionPinnedHeadline />
      <div ref="iphoneSectionTrigger">
        <SectionIphone v-if="shouldLoadIphoneSection" />
      </div>
      <SectionFeatures />
      <SectionSolutions />
      <SectionPricing />
      <SectionFaq type="home" />
      <SectionCta />
    </main>
    <GlobalFooter />
  </div>
</template>
