<script setup>
import PricingPlans from '../pricing/pricing-plans.vue'
</script>

<template>
  <section id="pricing" class="w-full scroll-mt-24 px-6 py-24" data-section-pricing>
    <div class="mx-auto flex w-full max-w-(--content-width) flex-col gap-16">
      <div class="mx-auto flex max-w-3xl flex-col items-center gap-6 text-center">
        <h2 class="text-5xl font-normal leading-none tracking-tight text-balance text-foreground">
          Back-office help without adding payroll.
        </h2>
        <p class="max-w-[48ch] text-base leading-normal text-pretty text-muted-foreground">
          Start with a 7-day trial. Plans start at $99 a month, billed annually.
        </p>
      </div>

      <PricingPlans />
    </div>
  </section>
</template>
