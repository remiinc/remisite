<script setup>
import { PhCaretRight, PhEnvelopeSimple, PhPaperclip } from '@phosphor-icons/vue'

// Mirrors ComponentEmailTranscriptCardView.swift. Keep geometry in sync with the native component.

defineProps({
  approved: { type: Boolean, default: false },
  attachments: { type: Array, default: () => [] },
  customerName: { type: String, required: true },
  draftParagraphs: { type: Array, required: true },
  jobName: { type: String, required: true },
  recipientEmail: { type: String, required: true },
  subject: { type: String, required: true },
})
</script>

<template>
  <article class="email-review-card w-[88%] overflow-hidden rounded-[0.88em] bg-white text-neutral-950 shadow-[0_0.5em_1.5em_-0.25em_rgba(0,0,0,0.08),0_0_0_1px_rgba(0,0,0,0.06)]"
    :aria-label="`Email review for ${customerName} about ${jobName}. ${approved ? 'Approved and sent.' : 'Needs your approval.'}`">
    <header class="flex items-center gap-[0.45em] border-b border-black/5 px-[0.85em] py-[0.7em]">
      <PhEnvelopeSimple class="size-[0.85em] shrink-0" weight="bold" aria-hidden="true" />
      <span class="text-[0.675em] font-bold uppercase tracking-[0.08em]">Email reply</span>
      <span class="ml-auto text-[0.675em] font-medium text-black/55">2 min ago</span>
    </header>

    <div class="flex items-center gap-[0.45em] border-b border-black/5 px-[0.85em] py-[0.7em] text-[0.675em] leading-none">
      <span class="min-w-0 truncate text-black/55">To: <strong class="font-normal text-black">{{ customerName }}</strong> ({{ recipientEmail }})</span>
      <span class="ml-auto shrink-0 font-semibold text-black/55">{{ jobName }}</span>
    </div>

    <div class="px-[0.85em] pb-[1.2em] pt-[1.2em]">
      <p class="text-[1em] font-semibold leading-[1.15] tracking-tight">{{ subject }}</p>
      <p class="mt-[0.45em] line-clamp-5 text-[0.675em] leading-[1.45] text-black/55">
        {{ draftParagraphs.join(' ') }}
      </p>
      <span v-if="attachments.length" class="mt-[0.55em] inline-flex items-center gap-[0.4em] rounded-full bg-black/7 px-[0.55em] py-[0.3em] text-[0.675em]">
        <PhPaperclip class="size-[0.8em] text-black/55" weight="bold" aria-hidden="true" />
        {{ attachments.length === 1 ? attachments[0] : `${attachments.length} attachments` }}
      </span>
    </div>

    <footer class="px-[0.5em] pb-[0.5em]">
      <div class="flex w-full items-center gap-[0.4em] rounded-lg bg-foreground/10 px-[0.5em] py-[0.9em] leading-none">
        <span class="rounded-full bg-[#0a84ff]/12 px-[0.55em] py-[0.3em] text-[0.65em] font-semibold text-[#0a84ff]">{{ approved ? 'Approved & sent' : 'Needs your approval' }}</span>
        <span class="ml-auto text-[0.85em] font-medium">{{ approved ? 'View receipt' : 'Review' }}</span>
        <PhCaretRight class="size-[0.55em]" weight="bold" aria-hidden="true" />
      </div>
    </footer>
  </article>
</template>

<style scoped>
.email-review-card {
  font-family: -apple-system, BlinkMacSystemFont, "SF Pro Text", system-ui, sans-serif;
}
</style>
