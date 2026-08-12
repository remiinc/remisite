<script setup>
import { PhCaretRight, PhHammer } from '@phosphor-icons/vue'

// Mirrors ComponentJobTranscriptCardView.swift and the standard review-card primitive.
defineProps({
  dayContext: { type: String, required: true },
  phase: { type: String, required: true },
  progress: { type: Number, required: true },
  status: { type: String, required: true },
  title: { type: String, required: true },
})
</script>

<template>
  <article
    class="job-update-card w-[88%] overflow-hidden rounded-[0.88em] bg-white text-neutral-950 shadow-[0_0.5em_1.5em_-0.25em_rgba(0,0,0,0.08),0_0_0_1px_rgba(0,0,0,0.06)]"
    :aria-label="`${title}. ${status}. ${dayContext}. ${phase}.`">
    <header class="flex items-center gap-[0.45em] border-b border-black/5 px-[0.85em] py-[0.7em]">
      <PhHammer class="size-[0.85em] text-[#0fa3b1]" weight="fill" aria-hidden="true" />
      <span class="text-[0.675em] font-bold uppercase tracking-[0.08em] text-[#0fa3b1]">Job update</span>
      <span class="ml-auto text-[0.675em] font-medium text-black/55">Live</span>
    </header>

    <div class="px-[0.85em] pb-[1.2em] pt-[1.2em]">
      <p class="text-[1em] font-semibold leading-[1.15] tracking-tight">{{ title }}</p>
      <p class="mt-[0.45em] text-[0.675em] leading-[1.35] text-black/55">{{ phase }}</p>

      <div class="mt-[0.9em] h-[0.2em] overflow-hidden rounded-full bg-black/8" aria-hidden="true">
        <div class="h-full rounded-full bg-[#0fa3b1]" :style="{ width: `${Math.max(0, Math.min(100, progress))}%` }" />
      </div>

      <div class="mt-[0.45em] flex items-center text-[0.675em] font-semibold tabular-nums">
        <span>{{ progress }}% complete</span>
        <span class="ml-auto text-[#134611]">{{ status }}</span>
      </div>
    </div>

    <footer class="px-[0.5em] pb-[0.5em]">
      <div class="flex w-full items-center gap-[0.4em] rounded-lg bg-foreground/10 px-[0.5em] py-[0.9em] text-[0.85em] font-medium leading-none">
        <span>{{ dayContext }}</span>
        <span class="ml-auto text-[#0fa3b1]">View job</span>
        <PhCaretRight class="size-[0.55em] text-[#0fa3b1]" weight="bold" aria-hidden="true" />
      </div>
    </footer>
  </article>
</template>

<style scoped>
.job-update-card {
  font-family: -apple-system, BlinkMacSystemFont, "SF Pro Text", system-ui, sans-serif;
}
</style>
