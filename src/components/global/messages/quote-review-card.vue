<script setup>
import { PhCheck, PhCaretRight, PhX } from '@phosphor-icons/vue'

defineProps({
  customerName: { type: String, required: true },
  projectName: { type: String, required: true },
  quoteNumber: { type: String, required: true },
  title: { type: String, required: true },
  total: { type: String, required: true },
})
</script>

<template>
  <article class="quote-review-card w-[88%] overflow-hidden rounded-[0.88em] text-neutral-950"
    :aria-label="`Quote review for ${customerName}. ${projectName}, ${title}, ${total}. Needs your approval.`">
    <div class="bg-[#14108a] text-white">
      <header class="flex items-center gap-[0.45em] border-b border-white/5 px-[0.85em] py-[0.7em]">

        <span class="text-[0.675em] font-bold uppercase tracking-[0.08em]">Quote review</span>
        <span class="ml-auto text-[0.675em] font-medium text-white/55">Just now</span>
      </header>

      <div class="px-[0.85em] pb-[1.2em] pt-[1.2em]">
        <p class="text-[1em] font-semibold leading-none tracking-tight">{{ title }}</p>
        <p class="mt-[0.9em] text-[1.9em] font-bold leading-none tracking-tighter tabular-nums">{{ total }}</p>
      </div>
    </div>

    <div class="bg-white text-[0.85em] leading-none">
      <div class="flex items-center gap-[0.4em] px-[1em] py-[1em] border-b border-black/5">
        <span class="opacity-60">Customer</span>
        <span class="ml-auto font-medium">{{ customerName }}</span>
      </div>

      <div class="flex items-center gap-[0.4em] px-[1em] pt-[1em] pb-[1.2em]">
        <span class="opacity-60">Status</span>
        <span class="ml-auto font-medium">Needs approval</span>
      </div>

      <footer class="pb-[0.5em] px-[0.5em]">
        <div
          class="w-full flex items-center justify-center py-[0.9em] gap-[0.4em] rounded-lg bg-foreground/10 text-foreground font-medium">
          <span>Review</span>
        </div>
      </footer>
    </div>
  </article>
</template>

<style scoped>
.quote-review-card {
  font-family: -apple-system, BlinkMacSystemFont, "SF Pro Text", system-ui, sans-serif;
}
</style>
