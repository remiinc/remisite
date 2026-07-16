<script setup>
import { onBeforeUnmount, onMounted } from 'vue'
import { solutions } from '../../lib/solutions'
import { cn } from '../../lib/cn'
import GlobalFooter from '../global/global-footer.vue'
import GlobalHeader from '../header/global-header.vue'
import SectionCta from '../sections/section-cta.vue'
import SectionFaq from '../sections/section-faq.vue'

const originalTitle = typeof document !== 'undefined' ? document.title : ''

onMounted(() => {
  document.title = 'Solutions for Owner-Run Service Businesses | Remi'
})

onBeforeUnmount(() => {
  if (typeof document !== 'undefined') document.title = originalTitle
})
</script>

<template>
  <div class="min-h-svh bg-background text-foreground">
    <GlobalHeader theme="light" />

    <main>
      <section class="w-full px-6 pb-16 pt-[calc(var(--header-height)+5rem)] md:pb-24" data-solutions-index>
        <div class="mx-auto flex w-full max-w-(--content-width) flex-col gap-24">
          <div class="flex max-w-4xl mx-auto flex-col items-center gap-6 text-center">
            <p class="text-xs font-medium leading-none text-muted-foreground flex items-center gap-4"><span
                class="uppercase text-foreground">Solutions</span><span class="text-sm tracking-tight">Every firm, every
                workflow.</span></p>
            <h1 class="text-5xl font-normal leading-none tracking-tight text-balance md:text-6xl">
              Built for businesses with work already in motion.
            </h1>
            <p class="max-w-2xl text-base leading-relaxed text-pretty text-muted-foreground md:text-lg">
              See how Remi keeps customer replies, estimates, agreements, invoices, and the next decision moving in your
              line of work.
            </p>
          </div>

          <div class="grid gap-3 sm:grid-cols-1 md:grid-cols-[2fr_1fr_2fr]">
            <article v-for="(solution, index) in solutions" :key="solution.path" role="group"
              :aria-label="`${index + 1} of ${solutions.length}`"
              :aria-current="selectedIndex === index ? 'true' : undefined"
              class="w-full min-w-0 shrink-0 md:nth-[4n+1]:col-span-2 md:nth-[4n+4]:col-span-2">
              <a :href="solution.path" :aria-label="`Explore Remi for ${solution.industryLabel}`" :class="cn(
                'group relative flex min-h-140 w-full flex-col justify-between overflow-hidden rounded-3xl bg-muted px-8 py-8 focus-visible:outline-4 focus-visible:outline-offset-0 focus-visible:outline-foreground/10',
                solution.thumbnailImageUrl ? 'text-white' : 'text-foreground transition-colors hover:bg-muted-hover',
              )">
                <img v-if="solution.thumbnailImageUrl" :src="solution.thumbnailImageUrl" alt="" aria-hidden="true"
                  class="absolute inset-0 size-full object-cover transition-transform duration-500 ease-out group-hover:scale-[1.02] motion-reduce:transition-none"
                  :loading="index < 3 ? 'eager' : 'lazy'" decoding="async">
                <span v-if="solution.thumbnailImageUrl"
                  class="absolute inset-0 bg-linear-to-b from-black/20 from-50% to-black/40 to-100% transition-colors group-hover:from-black/10 group-hover:to-black/30 group-focus-visible:from-black/10 group-focus-visible:to-black/30 duration-300"
                  aria-hidden="true" />
                <h3
                  class="relative z-10 text-2xl font-normal leading-none tracking-tight text-balance text-left">
                  {{ solution.industryLabel }}
                </h3>
                <div class="relative z-10 flex flex-col items-start justify-start">
                  <span class="w-full text-left max-w-sm">{{ solution.title }}</span>
                  <div
                    class="text-left grid grid-rows-[0fr] group-hover:grid-rows-[1fr] group-focus-visible:grid-rows-[1fr] opacity-0 group-hover:opacity-100 group-focus-visible:opacity-100 transition-all duration-300">
                    <span
                      class="overflow-hidden flex flex-col items-start justify-start text-xs uppercase font-medium leading-none tracking-tight text-balance"><span
                        class="pt-4">Learn More</span></span>
                  </div>
                </div>
              </a>
            </article>
          </div>
        </div>
      </section>

      <SectionFaq type="solutions" />

      <SectionCta />
    </main>

    <GlobalFooter />
  </div>
</template>
