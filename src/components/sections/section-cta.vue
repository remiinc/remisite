<script setup>
import Button from '../global/button.vue'
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
          <form action="/qualify/contact" method="GET"
            class="cta-email-form relative z-1 w-full max-w-sm rounded-full p-1 items-center before:content-[''] before:absolute before:inset-0 before:rounded-full before:shadow-[0_0_0_1px_rgba(0,0,0,0.02),0_3px_4px_-4px_rgba(0,0,0,0.1),0_4px_12px_-6px_rgba(0,0,0,0.02)] after:content-[''] after:absolute after:inset-0 after:bg-background/70 after:rounded-full after:shadow-[0_0_4px_0_rgba(255,255,255,0.5)_inset,0_0_10px_-10px_rgba(255,255,255,1)_inset]">
            <div class="relative z-1 flex w-full items-center gap-1">
              <label for="cta-email" class="sr-only">Your email</label>
              <input id="cta-email" name="email" type="email" autocomplete="email" required placeholder="Your email"
                class="h-10 min-w-0 flex-1 bg-transparent px-3 text-base text-foreground placeholder:text-foreground/45 outline-none">
              <Button type="submit">Get Started</Button>
            </div>
          </form>
        </div>

        <RemiMetricsMarquee />
      </div>
    </div>
  </section>
</template>

<style scoped>
.cta-email-form:focus-within {
  box-shadow:
    inset 0 0 0 1px color-mix(in oklch, var(--color-foreground) 18%, transparent),
    0 0 0 4px color-mix(in oklch, var(--color-foreground) 8%, transparent);
}
</style>
