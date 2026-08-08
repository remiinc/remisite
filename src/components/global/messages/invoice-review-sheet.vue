<script setup>
import { PhArrowUp, PhCheck, PhPencilSimple } from '@phosphor-icons/vue'

const props = defineProps({
  customerName: { type: String, required: true },
  daysOverdue: { type: Number, required: true },
  dueDate: { type: String, required: true },
  invoiceNumber: { type: String, required: true },
  originalTotal: { type: String, required: true },
  outstandingBalance: { type: String, required: true },
  projectName: { type: String, required: true },
  status: {
    type: String,
    default: 'idle',
    validator: value => ['idle', 'approving', 'approved'].includes(value),
  },
})

defineEmits(['approve'])

const customerRows = [
  ['Name', props.customerName],
  ['Project', props.projectName],
  ['Invoice', props.invoiceNumber],
  ['Due date', props.dueDate],
  ['Original total', props.originalTotal],
]
</script>

<template>
  <section class="invoice-review-sheet absolute inset-x-0 bottom-0 top-[2.8em] z-20 flex flex-col overflow-hidden rounded-t-[2.25em] bg-white text-black"
    aria-label="Invoice review">
    <div class="shrink-0 bg-[#386641] text-white">
      <div class="mx-auto mt-[0.7em] h-[0.3em] w-[3.2em] rounded-full bg-white/40" aria-hidden="true" />

      <header class="mt-[0.55em] flex items-center gap-[0.55em] border-b border-white/10 px-[1.2em] pb-[0.9em]">
        <svg class="size-[1.15em] shrink-0" viewBox="0 0 16 16" aria-hidden="true">
          <path fill="currentColor" d="M4.25 1.5h4.9L13 5.35v8.15a1 1 0 0 1-1 1H4.25a1 1 0 0 1-1-1v-11a1 1 0 0 1 1-1Z" />
          <path fill="#386641" d="M9 1.5v3.25a.75.75 0 0 0 .75.75H13L9 1.5Z" />
          <path stroke="#386641" stroke-linecap="round" stroke-width="1" d="M5.6 8.1h5M5.6 10.35h5M5.6 12.6h3.4" />
        </svg>
        <span class="text-[0.75em] font-bold uppercase tracking-[0.075em]">Invoice review</span>
        <span class="ml-auto text-[0.7em] font-medium text-white/60">Just now</span>
      </header>

      <div class="px-[1.2em] pb-[1.65em] pt-[1.25em]">
        <div class="flex items-baseline gap-[0.75em] text-[0.7em] font-bold uppercase tracking-[0.067em]">
          <span class="truncate">{{ projectName }}</span>
          <span class="ml-auto shrink-0 font-medium text-white/60">{{ invoiceNumber }}</span>
        </div>
        <p class="mt-[0.75em] text-[1.45em] font-bold leading-none tracking-[-0.025em]">{{ customerName }}</p>
        <p class="mt-[1.3em] text-[3.25em] font-bold leading-none tracking-[-0.025em] tabular-nums">{{ outstandingBalance }}</p>
        <p class="mt-[0.55em] text-[0.75em] font-bold uppercase tracking-[0.07em] text-white/60">{{ daysOverdue }} days overdue</p>
      </div>
    </div>

    <div class="min-h-0 flex-1 overflow-hidden bg-white pb-[5.25em]">
      <h3 class="border-b border-black/8 px-[1.2em] py-[0.85em] text-[0.72em] font-bold uppercase tracking-[0.08em]">Customer info</h3>
      <dl class="px-[1.2em]">
        <div v-for="([label, value], index) in customerRows" :key="label"
          class="flex items-center gap-[1em] py-[0.8em] text-[0.78em]" :class="index ? 'border-t border-black/8' : ''">
          <dt class="text-black/55">{{ label }}</dt>
          <dd class="ml-auto max-w-[65%] truncate text-right font-semibold">{{ value }}</dd>
        </div>
      </dl>
    </div>

    <div class="absolute inset-x-0 bottom-0 flex items-center gap-[0.65em] border-t border-black/8 bg-white/94 px-[0.9em] pb-[1.15em] pt-[0.8em] shadow-[0_-1em_2em_rgba(0,0,0,0.06)] backdrop-blur-md">
      <button class="flex h-[3.2em] items-center justify-center gap-[0.45em] rounded-full bg-black/4 px-[1em] text-[0.75em] font-bold" type="button">
        <PhPencilSimple class="size-[1em]" weight="bold" aria-hidden="true" />
        <span>Revise</span>
      </button>
      <button
        class="invoice-review-sheet__approve flex h-[3.2em] flex-1 items-center justify-center gap-[0.45em] rounded-full bg-[#386641] px-[1em] text-[0.75em] font-bold text-white disabled:pointer-events-none"
        :class="{ 'invoice-review-sheet__approve--pressing': status === 'approving' }"
        :disabled="status !== 'idle'" type="button" @click="$emit('approve')">
        <span v-if="status === 'approving'" class="size-[1em] animate-spin rounded-full border-[0.14em] border-white/35 border-t-white" aria-hidden="true" />
        <PhCheck v-else-if="status === 'approved'" class="size-[1.05em]" weight="bold" aria-hidden="true" />
        <PhArrowUp v-else class="size-[1.05em]" weight="bold" aria-hidden="true" />
        <span>{{ status === 'approved' ? 'Sent' : status === 'approving' ? 'Sending...' : 'Approve & Send' }}</span>
      </button>
    </div>
  </section>
</template>

<style scoped>
.invoice-review-sheet {
  font-family: -apple-system, BlinkMacSystemFont, "SF Pro Text", system-ui, sans-serif;
}

.invoice-review-sheet__approve {
  transition: transform 160ms cubic-bezier(0.23, 1, 0.32, 1), background-color 180ms ease;
}

.invoice-review-sheet__approve:active,
.invoice-review-sheet__approve--pressing {
  transform: scale(0.97);
}
</style>
