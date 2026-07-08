<script setup>
import { cn } from '../../lib/cn.js'
import SectionVisualLearn from '../home/visuals/visual-learn.vue'
import SectionVisualWorks from '../home/visuals/visual-works.vue'
import SectionVisualMemory from '../home/visuals/visual-memory.vue'

const segments = [
  {
    visual: SectionVisualMemory,
    title: 'Remi connects the context',
    body: 'She links people, projects, files, tasks, decisions, and risks so every request starts with the business context attached.',
  },
  {
    visual: SectionVisualWorks,
    title: 'Ask once. Get a draft.',
    body: 'Ask for a brief, update, document, or reminder. Remi pulls the context and turns it into a draft to review.',
  },
  {
    visual: SectionVisualLearn,
    title: 'She learns how you work',
    body: 'She reads connected tools, documents, messages, meetings, and recurring decisions, then learns when to speak up next.',
  },
]
</script>

<template>
  <section id="how" :class="cn('relative w-full z-1 px-6 py-12 md:py-16')" data-section-how>
    <div class="w-full mx-auto max-w-(--content-width)">
      <div class="grid lg:grid-cols-3 gap-8 gap-y-12">
        <div class="col-span-full flex max-w-3xl flex-col items-start gap-4 mb-8">
        <h2 class="text-5xl font-normal leading-none tracking-tight text-balance text-foreground">
          How it works
        </h2>
      </div>
        <div
          v-for="segment in segments"
          :key="segment.title"
          class="flex flex-col items-stretch justify-start gap-8"
        >
          <div class="w-full flex items-center">
            <div class="relative w-full">
              <component :is="segment.visual" />
            </div>
          </div>
          <div class="w-full flex flex-col items-start justify-start gap-6">
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
