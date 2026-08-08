<script setup>
import Button from '../global/button.vue'
import ProductAssurances from '../global/product-assurances.vue'
import StaticIphone from '../global/static-iphone.vue'

defineProps({
  embedded: {
    type: Boolean,
    default: false,
  },
})
</script>

<template>
  <section id="get-started" class="scroll-mt-24 px-6" :class="embedded ? 'pt-16 md:pt-24' : 'py-24'" data-section-cta>
    <div class="mx-auto grid w-full max-w-(--content-width) gap-y-12 md:grid-cols-2 md:gap-x-4 lg:grid-cols-[3fr_2fr]">
      <div
        class="bg-background/5 rounded-[2em] flex px-8 py-12 lg:px-12 flex-col items-start justify-between gap-8 text-left">
        <h2 class="inline-block headline-h3 text-balance max-w-[20ch]">
          Grow your business.
          <br />Let Remi handle the admin.
        </h2>
        <div class="mt-auto flex flex-col items-start gap-6">
          <div class="relative z-1 flex flex-wrap justify-start gap-3">
            <Button href="/start" variant="white" size="lg" data-marketing-cta="closing_text_remi"
              data-marketing-destination="guided">
              <span class="flex items-center gap-2.5">
                <img src="/images/app-logos/ios-messages-icon.svg" alt="" class="size-5 shrink-0" aria-hidden="true">
                <span>Text Remi</span>
              </span>
            </Button>
            <Button href="/pricing" variant="translucent" size="lg" data-marketing-cta="closing_pricing"
              data-marketing-destination="guided">
              <span>View Pricing</span>
            </Button>
          </div>
          <ProductAssurances align="start" :limit="embedded ? 3 : undefined" />
        </div>
      </div>

      <div
        class="relative flex aspect-square w-full flex-col items-center justify-start overflow-hidden rounded-[2em] bg-foreground px-8 pt-12">
        <img src="/images/backgrounds/cta-background.jpg" alt="" width="1600" height="1067" loading="lazy"
          decoding="async" fetchpriority="low" class="absolute inset-0 size-full object-cover" aria-hidden="true">
        <StaticIphone class="max-w-[24em]" />
      </div>
    </div>
  </section>
</template>
