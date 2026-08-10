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
  <article class="email-review-card w-full max-w-[18.53em] overflow-hidden rounded-[0.94em] bg-white text-neutral-950 shadow-[0_0_0_1px_rgba(0,0,0,0.08)]"
    :aria-label="`Email review for ${customerName} about ${jobName}. ${approved ? 'Approved and sent.' : 'Needs your approval.'}`">
    <header class="flex items-center gap-[0.47em] border-b border-black/8 px-[0.94em] py-[0.82em]">
      <PhEnvelopeSimple class="size-[1em] shrink-0" weight="bold" aria-hidden="true" />
      <span class="text-[0.706em] font-bold uppercase tracking-[0.067em]">Email reply</span>
      <span class="ml-auto text-[0.706em] font-medium text-black/58">2 min ago</span>
    </header>

    <div class="flex items-center gap-[0.47em] border-b border-black/8 px-[0.94em] py-[0.82em] text-[0.706em] leading-none">
      <span class="min-w-0 truncate text-black/58">To: <strong class="font-normal text-black">{{ customerName }}</strong> ({{ recipientEmail }})</span>
      <span class="ml-auto shrink-0 font-semibold text-black/58">{{ jobName }}</span>
    </div>

    <div class="px-[0.94em] py-[1.06em]">
      <p class="text-[1.118em] font-medium leading-[1.18] tracking-[-0.021em]">{{ subject }}</p>
      <p class="mt-[0.47em] line-clamp-5 text-[0.706em] leading-[1.5] text-black/58">
        {{ draftParagraphs.join(' ') }}
      </p>
      <span v-if="attachments.length" class="mt-[0.59em] inline-flex items-center gap-[0.47em] rounded-full bg-black/7 px-[0.59em] py-[0.29em] text-[0.706em]">
        <PhPaperclip class="size-[0.83em] text-black/58" weight="bold" aria-hidden="true" />
        {{ attachments.length === 1 ? attachments[0] : `${attachments.length} attachments` }}
      </span>
    </div>

    <footer class="flex items-center gap-[0.47em] border-t border-black/8 px-[0.94em] py-[0.82em] leading-none">
      <span class="rounded-full bg-[#0a84ff]/12 px-[0.59em] py-[0.29em] text-[0.706em] font-semibold text-[#0a84ff]">{{ approved ? 'Approved & sent' : 'Needs your approval' }}</span>
      <span class="ml-auto text-[1em] font-bold">{{ approved ? 'View receipt' : 'Review' }}</span>
      <PhCaretRight class="size-[0.53em]" weight="bold" aria-hidden="true" />
    </footer>
  </article>
</template>

<style scoped>
.email-review-card {
  font-family: -apple-system, BlinkMacSystemFont, "SF Pro Text", system-ui, sans-serif;
}
</style>
