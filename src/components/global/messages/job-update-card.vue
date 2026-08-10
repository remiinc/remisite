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
    class="job-update-card w-full max-w-[18.53em] rounded-[0.94em] border border-[#efedea] bg-white p-[1em] text-[#100f0c] shadow-[0_0.18em_0.47em_rgba(0,0,0,0.05)]"
    :aria-label="`${title}. ${status}. ${dayContext}. ${phase}.`">
    <header class="flex items-center gap-[0.47em]">
      <PhHammer class="size-[0.824em] text-[#0fa3b1]" weight="fill" aria-hidden="true" />
      <span class="text-[0.765em] font-semibold text-[#0fa3b1]">Job update</span>
      <span class="ml-auto text-[0.647em] text-black/58">Live</span>
    </header>

    <p class="mt-[0.824em] text-[1.176em] font-semibold leading-[1.18]">{{ title }}</p>
    <p class="mt-[0.235em] text-[0.882em] text-black/58">{{ phase }}</p>

    <div class="mt-[0.824em] h-[0.235em] overflow-hidden rounded-full bg-black/8" aria-hidden="true">
      <div class="h-full rounded-full bg-[#0fa3b1]" :style="{ width: `${Math.max(0, Math.min(100, progress))}%` }" />
    </div>

    <div class="mt-[0.412em] flex items-center text-[0.765em] font-semibold">
      <span>{{ progress }}% complete</span>
      <span class="ml-auto text-[#134611]">{{ status }}</span>
    </div>

    <footer class="mt-[0.824em] flex items-center border-t border-[#efedea] pt-[0.824em] text-[0.882em] font-semibold">
      <span>{{ dayContext }}</span>
      <span class="ml-auto text-[#0fa3b1]">View job</span>
      <PhCaretRight class="ml-[0.35em] size-[0.706em] text-[#0fa3b1]" weight="bold" aria-hidden="true" />
    </footer>
  </article>
</template>

<style scoped>
.job-update-card {
  font-family: -apple-system, BlinkMacSystemFont, "SF Pro Text", system-ui, sans-serif;
}
</style>
