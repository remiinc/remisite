<script setup>
import { cn } from '../../lib/cn.js'
import SectionVisualLearn from '../home/visuals/visual-learn.vue'
import SectionVisualWorks from '../home/visuals/visual-works.vue'
import SectionVisualMemory from '../home/visuals/visual-memory.vue'
</script>

<template>
  <section id="how" :class="cn('relative z-1 mx-auto max-w-(--content-width) px-6 py-12 md:py-16')" data-section-how>
    <!-- Segment #1 - Learn -->
    <div class="flex flex-col gap-16 md:gap-0">
      <div class="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-x-24 py-16">
        <div class="flex items-center">
          <div class="relative w-full">
            <SectionVisualLearn />
          </div>
        </div>
        <div class="flex flex-col justify-center gap-6 max-w-md">
          <h2
            class="text-2xl md:text-4xl lg:text-5xl font-normal leading-none tracking-tight text-balance text-foreground">
            Remi learns everything about your business.
          </h2>
          <p class="text-base leading-normal tracking-tight text-foreground/50">
            She scans every tool, thread, and document you connect, building a living knowledge base that captures how
            your business actually runs—so every answer reflects the way your team already works.
          </p>
        </div>
      </div>
      <!-- Segment #2 - Builds -->
      <div class="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-x-24 py-16">
        <div class="flex items-center">
          <div class="relative w-full">
            <SectionVisualMemory />
          </div>
        </div>
        <div class="flex flex-col justify-center gap-6 max-w-md">
          <h2
            class="text-2xl md:text-4xl lg:text-5xl font-normal leading-none tracking-tight text-balance text-foreground">
            Creates a living knowledge base of your business.
          </h2>
          <p class="text-base leading-normal tracking-tight text-foreground/50">
            Remi does not keep one big pile of information. She organizes what happens across Slack, email, docs, and
            project tools into connected memory layers that stay useful over time.
          </p>
        </div>
      </div>
      <!-- Segment #3 - Works -->
      <div class="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-x-24 py-16">
        <div class="flex items-center">
          <div class="relative w-full">
            <SectionVisualWorks />
          </div>
        </div>
        <div class="flex flex-col justify-center gap-6 max-w-md">
          <h2
            class="text-2xl md:text-4xl lg:text-5xl font-normal leading-none tracking-tight text-balance text-foreground">
            Remi works alongside your team.
          </h2>
          <p class="text-base leading-normal tracking-tight text-foreground/50">
            Ask questions, draft documents, route follow-ups, and automate the busywork—Remi shows up where your team
            already works, handles the operational chasing, and keeps everyone moving forward.
          </p>
        </div>
      </div>
    </div>
  </section>
</template>
