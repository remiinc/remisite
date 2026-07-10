<script setup>
import { cn } from '../../lib/cn.js'
import SectionVisualIntegrationsMarquee from '../home/visuals/visual-integrations-marquee.vue'
import SectionVisualLearn from '../home/visuals/visual-learn.vue'
import SectionVisualWorks from '../home/visuals/visual-works.vue'

const segments = [
  {
    visual: SectionVisualIntegrationsMarquee,
    title: 'Connects to all your tools',
    body: 'Connect email, calendar, texts, invoices, and job notes. Remi reads the trail so you do not have to paste it into chat.',
  },
  {
    visual: SectionVisualLearn,
    title: 'Keeps things moving 24/7',
    body: 'Remi looks for unpaid invoices, quotes that went quiet, missed requests, and promises clients made.',
  },
  {
    visual: SectionVisualWorks,
    title: 'You approve the next move',
    body: 'Remi texts you the draft and proof. You approve, edit, or say no. Once approved, Remi sends the follow-up.',
  },
]
</script>

<template>
  <section id="how" :class="cn('relative w-full z-1 px-6 py-12 md:py-16')" data-section-how>
    <div class="mx-auto flex w-full max-w-(--content-width) flex-col items-center gap-12">
      <h3 class="max-w-[20ch] text-center text-3xl font-normal leading-none tracking-tight text-balance text-foreground">
        How Remi works
      </h3>
      <div class="grid w-full min-w-0 lg:grid-cols-3 gap-8 gap-y-12">
        <div
          v-for="segment in segments"
          :key="segment.title"
          class="flex min-w-0 flex-col items-stretch md:flex-row md:items-center lg:items-stretch lg:flex-col justify-start gap-8"
        >
          <div class="w-full min-w-0 flex items-center">
            <div class="relative w-full min-w-0 overflow-hidden">
              <component :is="segment.visual" />
            </div>
          </div>
          <div class="w-full min-w-0 flex flex-col items-start justify-start gap-6">
            <h2
              class="text-2xl font-normal leading-tight tracking-tight text-balance text-foreground"
            >
              {{ segment.title }}
            </h2>
            <p class="text-base leading-normal tracking-tight text-foreground/50">
              {{ segment.body }}
            </p>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>
