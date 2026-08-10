<script setup>
import { nextTick, onMounted, ref } from 'vue'
import StaticIphone from '../global/static-iphone.vue'

const openedInvoicePreviewRef = ref(null)

const invoiceMessages = [
  {
    id: 'preview-invoice-heads-up',
    direction: 'incoming',
    text: "morning charlie 👋 mark puckett's $6,850 final is 20 days late",
  },
  {
    id: 'preview-invoice-reply',
    direction: 'outgoing',
    text: 'keep the reminder friendly',
  },
  {
    id: 'preview-invoice-card',
    direction: 'incoming',
    component: 'invoice-review',
    card: {
      customerName: 'Mark Puckett',
      daysOverdue: 20,
      dueDate: 'July 8',
      invoiceNumber: 'SI-1058',
      originalTotal: '$16,250',
      outstandingBalance: '$6,850',
      projectName: 'Puckett kitchen',
    },
  },
]

const quoteMessages = [
  {
    id: 'preview-quote-ready',
    direction: 'incoming',
    text: "bill's bathroom quote is ready. it came to $21,800",
  },
  {
    id: 'preview-quote-card',
    direction: 'incoming',
    component: 'quote-review',
    card: {
      customerName: 'Bill Caudill',
      projectName: 'Bathroom remodel',
      quoteNumber: '2026-1043',
      title: 'Caudill bathroom quote',
      total: '$21,800',
    },
  },
  {
    id: 'preview-quote-reply',
    direction: 'outgoing',
    text: 'looks good — send it',
  },
]

const previews = [
  {
    id: 'invoice',
    eyebrow: 'Invoice review',
    note: 'Click the card to preview the approval sheet.',
    messages: invoiceMessages,
  },
  {
    id: 'quote',
    eyebrow: 'Quote review',
    note: 'Shown with the same dark phone and screen scale as the hero.',
    messages: quoteMessages,
  },
]

onMounted(async () => {
  await nextTick()
  openedInvoicePreviewRef.value
    ?.querySelector('[aria-label="Open invoice review"]')
    ?.click()
})
</script>

<template>
  <main class="min-h-svh bg-foreground px-5 py-8 text-background sm:px-8 sm:py-12" data-review-cards-preview>
    <div class="mx-auto w-full max-w-6xl">
      <header class="flex flex-col gap-6 border-b border-background/10 pb-8 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p class="text-xs font-semibold uppercase tracking-[0.14em] text-background/45">Temporary preview</p>
          <h1 class="mt-3 text-3xl leading-none tracking-tight sm:text-5xl">Review cards in hero context</h1>
        </div>
        <a href="/"
          class="w-fit rounded-full border border-background/15 px-4 py-2 text-sm text-background/70 transition-colors hover:border-background/30 hover:text-background">
          Back to homepage
        </a>
      </header>

      <section class="mt-10 grid gap-12 lg:grid-cols-2 lg:gap-8" aria-label="Review card previews">
        <article v-for="preview in previews" :key="preview.id"
          class="flex min-w-0 flex-col items-center rounded-3xl border border-background/10 bg-background/3 px-4 py-6 sm:px-8 sm:py-8">
          <header class="mb-7 w-full max-w-sm">
            <p class="text-xs font-semibold uppercase tracking-[0.12em] text-background/45">{{ preview.eyebrow }}</p>
            <p class="mt-2 text-sm leading-relaxed text-background/65">{{ preview.note }}</p>
          </header>

          <div class="w-full max-w-sm">
            <StaticIphone fluid theme="dark" :font-size="1.075" :messages="preview.messages" />
          </div>
        </article>
      </section>

      <section class="mt-16 border-t border-background/10 pt-10" aria-labelledby="opened-state-heading">
        <header class="mx-auto mb-8 w-full max-w-sm text-center">
          <p class="text-xs font-semibold uppercase tracking-[0.12em] text-background/45">Existing opened state</p>
          <h2 id="opened-state-heading" class="mt-2 text-2xl leading-none tracking-tight">Invoice review sheet</h2>
        </header>

        <article
          class="mx-auto flex w-full max-w-xl flex-col items-center rounded-3xl border border-background/10 bg-background/3 px-4 py-6 sm:px-8 sm:py-8">
          <div ref="openedInvoicePreviewRef" class="w-full max-w-sm" data-opened-invoice-preview>
            <StaticIphone fluid theme="dark" :font-size="1.075" :messages="invoiceMessages" />
          </div>
        </article>
      </section>
    </div>
  </main>
</template>
