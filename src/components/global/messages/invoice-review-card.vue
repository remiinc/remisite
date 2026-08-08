<script setup>
import { PhCaretRight } from '@phosphor-icons/vue'

defineProps({
  customerName: {
    type: String,
    required: true,
  },
  daysOverdue: {
    type: Number,
    required: true,
  },
  dueDate: {
    type: String,
    required: true,
  },
  invoiceNumber: {
    type: String,
    required: true,
  },
  outstandingBalance: {
    type: String,
    required: true,
  },
  projectName: {
    type: String,
    required: true,
  },
  approved: {
    type: Boolean,
    default: false,
  },
})
</script>

<template>
  <article
    class="invoice-review-card w-[88%] overflow-hidden rounded-[0.88em] bg-white text-neutral-950 shadow-[0_0_0_1px_rgba(0,0,0,0.08)]"
    :aria-label="`Invoice reminder for ${customerName}. ${outstandingBalance}, ${daysOverdue} days overdue.`">
    <div class="bg-[#386641] text-white">
      <header class="flex items-center gap-[0.45em] border-b border-white/10 px-[0.85em] py-[0.7em]">
        <svg class="size-[1em] shrink-0" viewBox="0 0 16 16" aria-hidden="true">
          <path fill="currentColor" d="M4.25 1.5h4.9L13 5.35v8.15a1 1 0 0 1-1 1H4.25a1 1 0 0 1-1-1v-11a1 1 0 0 1 1-1Z" />
          <path fill="#386641" d="M9 1.5v3.25a.75.75 0 0 0 .75.75H13L9 1.5Z" />
          <path stroke="#386641" stroke-linecap="round" stroke-width="1" d="M5.6 8.1h5M5.6 10.35h5M5.6 12.6h3.4" />
        </svg>
        <span class="text-[0.68em] font-bold uppercase tracking-[0.08em]">Invoice review</span>
        <span class="ml-auto text-[0.62em] font-medium text-white/60">Just now</span>
      </header>

      <div class="px-[0.85em] pb-[1.5em] pt-[0.9em]">
        <div class="flex items-baseline gap-[0.75em] text-[0.65em] font-bold leading-none uppercase tracking-[0.067em]">
          <span class="truncate">{{ projectName }}</span>
          <span class="ml-auto shrink-0 font-medium text-white/60">{{ invoiceNumber }}</span>
        </div>
        <p class="mt-[0.6em] text-[1.28em] font-bold leading-[1.08] tracking-[-0.025em]">{{ customerName }}</p>
        <p class="mt-[0.65em] text-[1.9em] font-bold leading-none tracking-[-0.025em] tabular-nums">
          {{ outstandingBalance }}
        </p>
        <p class="mt-[0.45em] text-[0.65em] font-semibold leading-[1.1] text-white/60">{{ daysOverdue }} days overdue</p>
      </div>
    </div>

    <div class="flex items-center border-b border-black/8 px-[0.85em] py-[0.8em] text-[0.92em] leading-[1.2]">
      <span class="text-black/55">Due</span>
      <span class="ml-auto font-semibold">{{ dueDate }}</span>
    </div>

    <footer class="flex items-center gap-[0.4em] px-[0.85em] py-[1.25em] text-[0.68em] font-semibold leading-[1.2]">
      <span>{{ approved ? 'Approved & sent' : 'Reminder ready' }}</span>
      <span class="ml-auto text-[1.35em] font-bold leading-none">{{ approved ? 'View receipt' : 'Review' }}</span>
      <PhCaretRight class="size-[0.8em]" weight="bold" aria-hidden="true" />
    </footer>
  </article>
</template>

<style scoped>
.invoice-review-card {
  font-family: -apple-system, BlinkMacSystemFont, "SF Pro Text", system-ui, sans-serif;
}
</style>
