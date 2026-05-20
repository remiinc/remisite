<script setup>
import { ref } from 'vue'
import AnnouncementBar from './components/global/announcement-bar.vue'
import BookDemoForm from './components/global/book-demo-form.vue'
import GlobalFooter from './components/global/global-footer.vue'
import GlobalHeader from './components/header/global-header.vue'
import GlobalModal from './components/global/global-modal.vue'
import HomeHero from './components/home/home-hero.vue'
import HomeSliderUiChat from './components/home/slider-ui/home-slider-ui-chat.vue'
import HomeSliderUiFiles from './components/home/slider-ui/home-slider-ui-files.vue'
import HomeSliderUiIntegrations from './components/home/slider-ui/home-slider-ui-integrations.vue'
import HomeSliderUiIntelligence from './components/home/slider-ui/home-slider-ui-intelligence.vue'
import SectionCanvasSlider from './components/sections/section-canvas-slider.vue'
import SectionFaq from './components/sections/section-faq.vue'
import SectionFeatureBento from './components/sections/section-feature-bento.vue'
import SectionIntegrationsMarquee from './components/sections/section-integrations-marquee.vue'
import SectionProductOverview from './components/sections/section-product-overview.vue'
import SectionSlider from './components/sections/section-slider.vue'

const isDemoModalOpen = ref(false)
</script>

<template>
  <AnnouncementBar />
  <div>
    <GlobalHeader @book-demo="isDemoModalOpen = true" />
    <main class="min-h-svh bg-background text-foreground">
      <HomeHero @book-demo="isDemoModalOpen = true" />
      <SectionFeatureBento @book-demo="isDemoModalOpen = true" />
      <SectionSlider>
        <template #tasks>
          <HomeSliderUiChat />
        </template>
        <template #integrations>
          <HomeSliderUiIntegrations />
        </template>
        <template #files>
          <HomeSliderUiFiles />
        </template>
        <template #intelligence>
          <HomeSliderUiIntelligence />
        </template>
      </SectionSlider>
      <SectionProductOverview />
      <SectionCanvasSlider>
        <template #imessage>
          <video
            src="/videos/remi-imessage-animation-1.mp4"
            class="w-full h-full object-cover absolute inset-0"
            autoplay
            loop
            muted
            playsinline
            preload="metadata"
            aria-label="Remi in iMessage animation"
            data-canvas-slider-video="imessage"
          />
        </template>
        <template #web>
          <img
            src="/images/home-webapp@2x.jpg"
            alt="Remi web app interface"
            class="absolute inset-0 h-full w-full object-cover"
            data-canvas-slider-image="web"
          >
        </template>
      </SectionCanvasSlider>
      <SectionIntegrationsMarquee />
      <SectionFaq />
    </main>
    <GlobalFooter />
  </div>
  <GlobalModal v-model="isDemoModalOpen" label="Book a Demo">
    <BookDemoForm />
  </GlobalModal>
</template>
