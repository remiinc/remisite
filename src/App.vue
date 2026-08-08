<script setup>
import { computed, defineAsyncComponent, onBeforeUnmount, onMounted, ref } from 'vue'
import AnnouncementBar from './components/global/announcement-bar.vue'
import GlobalFooter from './components/global/global-footer.vue'
import GlobalHeader from './components/header/global-header.vue'
import HeroB from './components/hero/hero-b.vue'
import { getLegacySolutionRedirect } from './lib/solution-redirects'
import SectionPinnedHeadline from './components/sections/section-pinned-headline.vue'
import SectionFeatures from './components/sections/section-features.vue'
import SectionFeaturesGrid from './components/sections/section-features-grid.vue'
import SectionFaq from './components/sections/section-faq.vue'
import SectionPricing from './components/sections/section-pricing.vue'
import SectionSolutions from './components/sections/section-solutions.vue'
import { installMarketingCtaTracking } from './lib/analytics.js'
import { pageLoaders } from './lib/page-loaders.js'

const BlogIndexPage = defineAsyncComponent(pageLoaders.blogIndex)
const BlogPostPage = defineAsyncComponent(pageLoaders.blogPost)
const AboutPage = defineAsyncComponent(pageLoaders.about)
const LegalPage = defineAsyncComponent(pageLoaders.legal)
const LegacyRedirect = defineAsyncComponent(pageLoaders.legacyRedirect)
const PricingPage = defineAsyncComponent(pageLoaders.pricing)
const SecurityPage = defineAsyncComponent(pageLoaders.security)
const SolutionPage = defineAsyncComponent(pageLoaders.solution)
const SolutionsIndexPage = defineAsyncComponent(pageLoaders.solutionsIndex)
const SignupRedirect = defineAsyncComponent(pageLoaders.signupRedirect)
const SectionIphone = defineAsyncComponent(() => import('./components/sections/section-iphone.vue'))

const pathname = typeof window !== 'undefined' ? window.location.pathname : '/'

const normalizedPath = computed(() => pathname.replace(/\/+$/, '') || '/')
const legacyRedirectTarget = computed(() => getLegacySolutionRedirect(normalizedPath.value))
const isAboutPage = computed(() => normalizedPath.value === '/about')
const isSolutionsIndexPage = computed(() => normalizedPath.value === '/solutions')
const isSolutionPage = computed(() => normalizedPath.value.startsWith('/solutions/'))
const isBlogIndexPage = computed(() => normalizedPath.value === '/resources')
const isBlogPostPage = computed(() => normalizedPath.value.startsWith('/resources/'))
const isPricingPage = computed(() => normalizedPath.value === '/pricing')
const isSecurityPage = computed(() => normalizedPath.value === '/security')
const isLegalPage = computed(() => ['/terms', '/privacy'].includes(normalizedPath.value))
const isStartPage = computed(() => normalizedPath.value === '/start')
const iphoneSectionTrigger = ref(null)
const shouldLoadIphoneSection = ref(false)
let iphoneSectionObserver = null

let stopMarketingCtaTracking = null
let stopMotionEffects = null
let motionLoadCancelled = false

onMounted(() => {
  stopMarketingCtaTracking = installMarketingCtaTracking()
  const isMobileViewport = window.matchMedia('(max-width: 767px)').matches

  if (!isMobileViewport) {
    import('./lib/motion.js').then(({ initializeMotionEffects }) => {
      if (!motionLoadCancelled) stopMotionEffects = initializeMotionEffects()
    })
  }

  if (isMobileViewport) {
    shouldLoadIphoneSection.value = true
    return
  }

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
  motionLoadCancelled = true
  stopMarketingCtaTracking?.()
  stopMotionEffects?.()
  iphoneSectionObserver?.disconnect()
})
</script>

<template>
  <LegacyRedirect v-if="legacyRedirectTarget" :to="legacyRedirectTarget" />
  <AboutPage v-else-if="isAboutPage" />
  <SolutionsIndexPage v-else-if="isSolutionsIndexPage" />
  <SolutionPage v-else-if="isSolutionPage" />
  <PricingPage v-else-if="isPricingPage" />
  <SecurityPage v-else-if="isSecurityPage" />
  <LegalPage v-else-if="isLegalPage" />
  <SignupRedirect v-else-if="isStartPage" />
  <BlogIndexPage v-else-if="isBlogIndexPage" />
  <BlogPostPage v-else-if="isBlogPostPage" />
  <div v-else>
    <main class="min-h-svh bg-background text-foreground overscroll-none">
      <AnnouncementBar />
      <GlobalHeader />
      <HeroB />
      <SectionPinnedHeadline />
      <div ref="iphoneSectionTrigger">
        <SectionIphone v-if="shouldLoadIphoneSection" />
      </div>
      <SectionFeaturesGrid />
      <SectionSolutions />
      <SectionFeatures />
      <SectionPricing />
      <SectionFaq type="home" />
    </main>
    <GlobalFooter />
  </div>
</template>
