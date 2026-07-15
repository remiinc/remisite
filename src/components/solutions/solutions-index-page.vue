<script setup>
import { onBeforeUnmount, onMounted } from 'vue'
import { solutions } from '../../lib/solutions'
import { cn } from '../../lib/cn'
import GlobalFooter from '../global/global-footer.vue'
import GlobalHeader from '../header/global-header.vue'
import SectionCta from '../sections/section-cta.vue'

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
        <div class="mx-auto flex w-full max-w-(--content-width) flex-col gap-16">
          <div class="flex max-w-4xl flex-col items-start gap-6">
            <p class="text-sm font-medium leading-none text-muted-foreground">Solutions</p>
            <h1 class="text-5xl font-normal leading-none tracking-tight text-balance md:text-7xl">
              Built for businesses with work already in motion.
            </h1>
            <p class="max-w-2xl text-base leading-relaxed text-pretty text-muted-foreground md:text-lg">
              See how Remi keeps customer replies, estimates, agreements, invoices, and the next decision moving in your line of work.
            </p>
          </div>

          <div class="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            <a
              v-for="(solution, index) in solutions"
              :key="solution.path"
              :href="solution.path"
              :class="cn(
                'group relative flex aspect-3/4 flex-col justify-between overflow-hidden rounded-3xl bg-muted p-6 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-ring md:p-8',
                solution.thumbnailImageUrl ? 'text-white' : 'text-foreground transition-colors hover:bg-muted-hover',
              )"
            >
              <img
                v-if="solution.thumbnailImageUrl"
                :src="solution.thumbnailImageUrl"
                alt=""
                aria-hidden="true"
                class="absolute inset-0 size-full object-cover transition-transform duration-500 ease-out group-hover:scale-[1.02] motion-reduce:transition-none"
                :loading="index < 3 ? 'eager' : 'lazy'"
                decoding="async"
              >
              <span
                v-if="solution.thumbnailImageUrl"
                class="absolute inset-0 bg-black/30 transition-colors group-hover:bg-black/20"
                aria-hidden="true"
              />
              <div
                :class="cn(
                  'relative z-10 flex items-center justify-between gap-4 text-sm',
                  solution.thumbnailImageUrl ? 'text-white/75' : 'text-muted-foreground',
                )"
              >
                <span>Solutions</span>
                <span class="tabular-nums">{{ String(index + 1).padStart(2, '0') }}</span>
              </div>
              <div class="relative z-10 flex flex-col gap-5">
                <h2 class="text-3xl font-normal leading-none tracking-tight text-balance md:text-4xl">
                  {{ solution.industryLabel }}
                </h2>
                <p
                  :class="cn(
                    'line-clamp-3 text-sm leading-relaxed text-pretty',
                    solution.thumbnailImageUrl ? 'text-white/75' : 'text-muted-foreground',
                  )"
                >
                  {{ solution.title }}
                </p>
              </div>
            </a>
          </div>
        </div>
      </section>

      <SectionCta />
    </main>

    <GlobalFooter />
  </div>
</template>
