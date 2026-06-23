<script setup>
import GlobalFooter from '../global/global-footer.vue'
import GlobalHeader from '../header/global-header.vue'
import SectionCta from '../sections/section-cta.vue'
import SectionFaq from '../sections/section-faq.vue'
</script>

<template>
  <main class="min-h-svh bg-background text-foreground overscroll-none">
    <GlobalHeader theme="light" />
    <div class="min-h-[100dvh]" />
    <SectionFaq />
    <SectionCta />
  </main>
  <GlobalFooter />
</template>
