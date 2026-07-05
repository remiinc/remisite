<script setup>
import { cn } from '../../lib/cn.js'
import SectionVisualLearn from '../home/visuals/visual-learn.vue'
import SectionVisualWorks from '../home/visuals/visual-works.vue'
import SectionVisualMemory from '../home/visuals/visual-memory.vue'

const segments = [
  {
    visual: SectionVisualMemory,
    title: 'Remi makes sure you get paid on-time',
    body: 'Remi does not keep one big pile of information. She organizes what happens across Slack, email, docs, and project tools into connected memory layers that stay useful over time.',
  },
  {
    visual: SectionVisualWorks,
    title: 'Handles the busy work for you',
    body: 'Ask questions, draft documents, route follow-ups, and automate the busywork—Remi shows up where your team already works, handles the operational chasing, and keeps everyone moving forward.',
  },
  {
    visual: SectionVisualLearn,
    title: 'Learns how to be more helpful each day',
    body: 'Remi learns from all of your connected apps and documents to build a living knowledge base that captures how your business actually runs.',
  },
]
</script>

<template>
  <section id="how" :class="cn('relative w-full z-1 px-6 py-12 md:py-16')" data-section-how>
    <div class="w-full mx-auto max-w-(--content-width)">
      <div class="flex flex-col gap-16 md:gap-0">
        <div
          v-for="segment in segments"
          :key="segment.title"
          class="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-x-24 py-16"
        >
          <div class="flex items-center">
            <div class="relative w-full">
              <component :is="segment.visual" />
            </div>
          </div>
          <div class="flex flex-col justify-center gap-6 max-w-md">
            <h2
              class="text-2xl md:text-4xl lg:text-5xl font-normal leading-none tracking-tight text-balance text-foreground"
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
