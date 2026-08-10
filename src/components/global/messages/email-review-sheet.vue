<script setup>
import { PhArrowBendUpLeft, PhArrowUp, PhCalendarBlank, PhCheck, PhCloudRain, PhEnvelopeSimple, PhFile, PhImage, PhPaperclip, PhPencilSimple } from '@phosphor-icons/vue'

// Mirrors ComponentEmailPrototypeView.swift and the shared editorial review primitives.

defineProps({
  attachments: { type: Array, default: () => [] },
  ccEmail: { type: String, default: '' },
  ccName: { type: String, default: '' },
  customerName: { type: String, required: true },
  draftParagraphs: { type: Array, required: true },
  evidence: { type: Array, default: () => [] },
  incomingMessage: { type: String, required: true },
  incomingTimestamp: { type: String, required: true },
  recipientEmail: { type: String, required: true },
  senderEmail: { type: String, required: true },
  senderName: { type: String, required: true },
  status: {
    type: String,
    default: 'idle',
    validator: value => ['idle', 'approving', 'approved'].includes(value),
  },
  subject: { type: String, required: true },
})

defineEmits(['approve', 'dismiss'])
</script>

<template>
  <section class="email-review-sheet absolute inset-x-0 bottom-0 top-[3.2em] z-20 flex flex-col overflow-hidden rounded-t-[1.765em] bg-white text-black"
    aria-label="Email review">
    <div class="absolute left-1/2 top-[0.41em] z-10 h-[0.294em] w-[2.47em] -translate-x-1/2 rounded-full bg-black/20" aria-hidden="true" />

    <header class="shrink-0 border-b border-black/5 px-[1.412em] py-[0.706em] pt-[1.47em]">
      <div class="flex items-baseline gap-[0.47em]">
        <PhEnvelopeSimple class="size-[1em] self-center" weight="bold" aria-hidden="true" />
        <span class="text-[0.706em] font-bold uppercase tracking-[0.067em]">Email draft</span>
        <span class="ml-auto rounded-full bg-[#0a84ff]/12 px-[0.59em] py-[0.294em] text-[0.706em] font-semibold text-[#0a84ff]">Ready to send</span>
      </div>
      <p class="mt-[1.059em] text-[1.412em] font-semibold leading-[1.15] tracking-[-0.021em]">{{ subject }}</p>
    </header>

    <div class="min-h-0 flex-1 overflow-y-auto scrollbar-none">
      <dl class="border-b border-black/5 px-[1.412em] text-[0.824em]">
        <div class="py-[0.706em]"><dt class="inline text-black/58">To: </dt><dd class="inline">{{ customerName }} <span class="text-black/58">({{ recipientEmail }})</span></dd></div>
        <div class="border-t border-black/5 py-[0.706em]"><dt class="inline text-black/58">From: </dt><dd class="inline">{{ senderName }} <span class="text-black/58">({{ senderEmail }})</span></dd></div>
        <div class="border-t border-black/5 py-[0.706em]"><dt class="inline text-black/58">CC: </dt><dd class="inline">{{ ccName }} <span v-if="ccEmail" class="text-black/58">({{ ccEmail }})</span></dd></div>
      </dl>

      <div class="space-y-[0.94em] px-[1.412em] pb-[2em] pt-[1.529em] text-[1em] leading-[1.47]">
        <p v-for="paragraph in draftParagraphs" :key="paragraph">{{ paragraph }}</p>
        <div v-if="attachments.length" class="flex flex-col items-start gap-[0.47em] pt-[0.47em]">
          <span v-for="attachment in attachments" :key="attachment" class="inline-flex items-center gap-[0.47em] rounded-full bg-black/7 px-[0.706em] py-[0.353em] text-[0.824em] leading-none">
            <PhFile v-if="attachment.toLowerCase().endsWith('.pdf')" class="size-[0.86em] text-black/58" weight="fill" aria-hidden="true" />
            <PhImage v-else-if="/\.(jpe?g|png)$/i.test(attachment)" class="size-[0.86em] text-black/58" weight="fill" aria-hidden="true" />
            <PhPaperclip v-else class="size-[0.86em] text-black/58" weight="bold" aria-hidden="true" />
            {{ attachment }}
          </span>
        </div>
      </div>

      <div class="mx-[1.412em] border-t border-black/5 py-[1.647em]">
        <div class="flex items-baseline gap-[0.47em]">
          <PhArrowBendUpLeft class="size-[0.824em] self-center text-black/58" weight="bold" aria-hidden="true" />
          <p class="text-[1em] font-semibold">{{ customerName }} wrote</p>
          <span class="ml-auto shrink-0 text-[0.824em] text-black/58">{{ incomingTimestamp }}</span>
        </div>
        <p class="mt-[0.588em] text-[1em] leading-[1.4] text-black/58">{{ incomingMessage }}</p>
      </div>

      <div v-if="evidence.length" class="border-y border-black/5 pb-[0.824em]">
        <p class="px-[1.412em] pb-[0.353em] pt-[1.059em] text-[1em] font-semibold">Tools used <span class="ml-[0.47em] rounded-full bg-black/7 px-[0.47em] py-[0.235em] text-[0.706em] text-black/58">{{ evidence.length }}</span></p>
        <ul>
          <li v-for="item in evidence" :key="item" class="flex min-h-[1.647em] items-center gap-[0.588em] px-[1.412em] text-[0.941em] text-black/58">
            <PhCloudRain v-if="item.toLowerCase().includes('weather')" class="size-[0.765em]" weight="bold" aria-hidden="true" />
            <PhCalendarBlank v-else class="size-[0.765em]" weight="bold" aria-hidden="true" />
            {{ item }}
          </li>
        </ul>
      </div>
      <div class="h-[2em]" aria-hidden="true" />
    </div>

    <div class="flex shrink-0 items-center gap-[0.706em] border-t border-black/5 bg-white px-[1.176em] pb-[2em] pt-[1.059em] shadow-[0_-0.7em_1.8em_rgba(0,0,0,0.05)]">
      <button class="flex h-[3.294em] items-center justify-center gap-[0.47em] rounded-full bg-[#f2f2f2]/90 px-[1.059em] text-[1em] font-bold shadow-[0_0.5em_1.8em_rgba(0,0,0,0.06)] transition-transform duration-150 active:scale-[0.97]" type="button" @click="$emit('dismiss')">
        <PhPencilSimple class="size-[1em]" weight="bold" aria-hidden="true" />
        <span>Revise</span>
      </button>
      <button class="flex h-[3.294em] flex-1 items-center justify-center gap-[0.47em] rounded-full bg-black px-[1.059em] text-[1em] font-bold text-white shadow-[0_0.5em_1.8em_rgba(0,0,0,0.12)] transition-transform duration-150 active:scale-[0.97] disabled:pointer-events-none"
        :disabled="status !== 'idle'" type="button" @click="$emit('approve')">
        <span v-if="status === 'approving'" class="size-[1em] animate-spin rounded-full border-[0.14em] border-white/35 border-t-white" aria-hidden="true" />
        <PhCheck v-else-if="status === 'approved'" class="size-[1.05em]" weight="bold" aria-hidden="true" />
        <PhArrowUp v-else class="size-[1.05em]" weight="bold" aria-hidden="true" />
        <span>{{ status === 'approved' ? 'Sent' : status === 'approving' ? 'Working...' : 'Approve & Send' }}</span>
      </button>
    </div>
  </section>
</template>

<style scoped>
.email-review-sheet {
  font-family: -apple-system, BlinkMacSystemFont, "SF Pro Text", system-ui, sans-serif;
}
</style>
