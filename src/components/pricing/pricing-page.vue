<script setup>
import Button from '../global/button.vue'
import GlobalFooter from '../global/global-footer.vue'
import GlobalHeader from '../header/global-header.vue'
import SectionCta from '../sections/section-cta.vue'
import SectionFaq from '../sections/section-faq.vue'
import SectionWhyRemi from '../sections/section-why-remi.vue'
import PricingPlans from './pricing-plans.vue'

if (typeof document !== 'undefined') {
  document.title = 'Pricing | Remi'
}
</script>

<template>
  <div class="min-h-svh bg-background text-foreground">
    <GlobalHeader theme="light" />

    <main>
      <section class="px-6 pb-16 pt-[calc(var(--header-height)+5rem)] md:pb-12 md:pt-[calc(var(--header-height)+7rem)]"
        data-pricing-hero>
        <div class="mx-auto flex w-full max-w-(--content-width) flex-col items-center justify-center gap-8 text-center">
          <h1 class="max-w-[25ch] text-6xl lg:text-7xl font-normal leading-none tracking-tight text-balance">
            One missed follow-up can cost more than a month of Remi.
          </h1>
          <div class="relative z-1 flex w-full max-w-sm flex-col items-center justify-center gap-3 sm:max-w-none sm:flex-row">
            <Button href="/start" size="lg" class="w-full sm:w-auto"
              data-marketing-cta="pricing_text_remi" data-marketing-destination="linq">
              <span class="flex items-center gap-2.5">
                <img src="/images/app-logos/ios-messages-icon.svg" alt="" class="size-5 shrink-0" aria-hidden="true">
                <span>Text Remi</span>
              </span>
            </Button>
          </div>
        </div>
      </section>

      <section class="px-6 py-20" aria-label="Pricing plans">
        <PricingPlans />
      </section>

      <SectionWhyRemi />

      <SectionFaq type="pricing" />

      <SectionCta />
    </main>

    <GlobalFooter />
  </div>
</template>
