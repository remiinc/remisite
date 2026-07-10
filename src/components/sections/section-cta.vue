<script setup>
import RemiMetricsMarquee from './section-remi-metrics-marquee.vue'
</script>

<template>
  <section id="demo" class="scroll-mt-24 px-6 py-24" data-section-cta>
    <div class="relative w-full mx-auto max-w-(--content-width) grid min-h-120 grid-cols-1 grid-rows-1 overflow-hidden rounded-[2em] bg-muted p-8 md:p-12">

      <div class="relative z-1 flex h-full w-full flex-col items-start justify-between gap-16">

        <div class="flex w-full max-w-3xl flex-col items-start gap-8">
          <h2 class="text-4xl font-normal tracking-tight text-balance">
            <span class="block text-foreground/50">Ready to hand off the busywork?</span>
            Let Remi keep the day moving.
          </h2>
          <div class="relative z-1 flex w-full max-w-sm flex-col items-start justify-center gap-3 sm:max-w-none sm:flex-row sm:justify-start">
            <a href="#"
              class="inline-flex h-12 w-full items-center justify-center gap-2.5 rounded-full bg-background px-5 text-sm font-medium leading-none text-foreground transition-opacity duration-200 hover:opacity-90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-foreground/20 focus-visible:ring-offset-2 focus-visible:ring-offset-muted sm:w-auto">
              <img src="/images/app-logos/ios-messages-icon.svg" alt="" class="size-5 shrink-0" aria-hidden="true">
              <span>Text Remi</span>
            </a>
            <a href="#"
              class="inline-flex h-12 w-full items-center justify-center gap-2.5 rounded-full bg-background/60 px-5 text-sm font-medium leading-none text-foreground shadow-[0_0_0_1px_rgba(0,0,0,0.06)_inset] backdrop-blur-sm transition-opacity duration-200 hover:opacity-90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-foreground/20 focus-visible:ring-offset-2 focus-visible:ring-offset-muted sm:w-auto">
              <img src="/images/app-logos/gmail.svg" alt="" class="size-5 shrink-0" aria-hidden="true">
              <span>Sign up with Gmail</span>
            </a>
          </div>
        </div>

        <RemiMetricsMarquee />
      </div>
    </div>
  </section>
</template>
