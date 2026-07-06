<script setup>
import { cn } from '../../lib/cn'
import SurfaceVisualImessageThread from './components/surface-visual-imessage-thread.vue'
import SurfaceVisualSlack from './components/surface-visual-slack.vue'
import SurfaceVisualWeb from './components/surface-visual-web.vue'
</script>

<template>
  <section id="surfaces" :class="cn('relative w-full scroll-mt-24 px-6 py-12 md:py-16')" data-section-surfaces>
    <div class="w-full mx-auto max-w-(--content-width)">
      <div class="mb-12 max-w-3xl">
        <h2 class="text-4xl font-normal leading-none tracking-tight text-balance text-foreground">
          Wherever the day starts to pile up,<br />
          <span class="text-foreground/50">Remi keeps it moving</span>
        </h2>
      </div>

      <div
        class="grid grid-cols-1 lg:grid-cols-3 gap-x-4 gap-y-16 *:grid *:grid-cols-1 *:place-content-start *:gap-4 *:col-span-1 *:md:grid-cols-2 *:lg:grid-cols-1">
        <!-- iMessage -->
        <div class="relative">
          <SurfaceVisualImessageThread />
          <div class="flex flex-col gap-1 justify-start md:justify-between lg:justify-start">
            <h3 class="text-base md:text-2xl lg:text-base font-normal leading-tight tracking-tight text-balance">
              Texts & iMessage
            </h3>
            <p class="text-base text-muted-foreground/80 leading-tight">
              Text Remi when something pops up. She can remember the detail, turn it into a next step, and bring it back
              when it matters.
            </p>
          </div>
        </div>
        <!-- Slack -->
        <div class="relative">
          <SurfaceVisualSlack />
          <div class="flex flex-col gap-1 justify-start md:justify-between lg:justify-start">
            <h3 class="text-base md:text-2xl lg:text-base font-normal leading-tight tracking-tight text-balance">
              Slack
            </h3>
            <p class="text-base text-muted-foreground/80 leading-tight">
              Tag Remi in a thread and she pulls out what needs doing, who is waiting, and what should happen next.
            </p>
          </div>
        </div>
        <!-- Web -->
        <div class="relative">
          <SurfaceVisualWeb />
          <div class="flex flex-col gap-1 justify-start md:justify-between lg:justify-start">
            <h3 class="text-base md:text-2xl lg:text-base font-normal leading-tight tracking-tight text-balance">
              Web
            </h3>
            <p class="text-base text-muted-foreground/80 leading-tight">
              Open the full view when you need customers, jobs, files, follow-ups, and loose ends in one place.
            </p>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>
