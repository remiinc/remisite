<script setup>
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
    class="invoice-review-card w-[88%] overflow-hidden rounded-[0.88em] text-neutral-950 shadow-[0_0.5em_1.5em_-0.25em_rgba(0,0,0,0.08),0_0_0_1px_rgba(0,0,0,0.06)]"
    :aria-label="`Invoice reminder for ${customerName}. ${outstandingBalance}, ${daysOverdue} days overdue.`">
    <div class="bg-[#386641] text-white">
      <header class="flex items-center gap-[0.45em] border-b border-white/5 px-[0.85em] py-[0.7em]">
        <span class="text-[0.675em] font-bold uppercase tracking-[0.08em]">Invoice review</span>
        <span class="ml-auto text-[0.675em] font-medium text-white/55">Just now</span>
      </header>

      <div class="px-[0.85em] pb-[1.2em] pt-[1.2em]">
        <p class="text-[1em] font-semibold leading-none tracking-tight">{{ customerName }}</p>
        <p class="mt-[0.9em] text-[1.9em] font-bold leading-none tracking-tighter tabular-nums">
          {{ outstandingBalance }}
        </p>
        <p class="mt-[0.45em] text-[0.65em] font-semibold leading-[1.1] text-white/55">{{ daysOverdue }} days overdue</p>
      </div>
    </div>

    <div class="bg-white text-[0.85em] leading-none">
      <div class="flex items-center gap-[0.4em] px-[1em] py-[1em] border-b border-black/5">
        <span class="opacity-60">Due</span>
        <span class="ml-auto font-medium">{{ dueDate }}</span>
      </div>

      <div class="flex items-center gap-[0.4em] px-[1em] pt-[1em] pb-[1.2em]">
        <span class="opacity-60">Status</span>
        <span class="ml-auto font-medium">{{ approved ? 'Approved & sent' : 'Reminder ready' }}</span>
      </div>

      <footer class="pb-[0.5em] px-[0.5em]">
        <div
          class="w-full flex items-center justify-center py-[0.9em] gap-[0.4em] rounded-lg bg-foreground/10 text-foreground font-medium">
          <span>{{ approved ? 'View receipt' : 'Review' }}</span>
        </div>
      </footer>
    </div>
  </article>
</template>

<style scoped>
.invoice-review-card {
  font-family: -apple-system, BlinkMacSystemFont, "SF Pro Text", system-ui, sans-serif;
}
</style>
