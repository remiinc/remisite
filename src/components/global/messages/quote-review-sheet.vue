<script setup>
import { PhArrowUp, PhCheck, PhPencilSimple } from '@phosphor-icons/vue'

defineProps({
  allowances: { type: Array, default: () => [] },
  customerName: { type: String, required: true },
  exclusions: { type: Array, default: () => [] },
  paymentSchedule: { type: Array, default: () => [] },
  projectName: { type: String, required: true },
  quoteNumber: { type: String, required: true },
  schedulingBasis: { type: String, default: '' },
  scopeItems: { type: Array, default: () => [] },
  status: {
    type: String,
    default: 'idle',
    validator: value => ['idle', 'approving', 'approved'].includes(value),
  },
  title: { type: String, required: true },
  total: { type: String, required: true },
  validityDays: { type: Number, default: 14 },
})

defineEmits(['approve', 'dismiss'])
</script>

<template>
  <section
    class="quote-review-sheet absolute inset-x-0 bottom-0 top-[3.4em] z-20 flex flex-col overflow-hidden rounded-t-[2em] bg-white text-black"
    aria-label="Quote review">
    <div class="min-h-0 flex-1 overflow-y-auto pb-[5.5em] scrollbar-none">
      <div class="sticky top-0 z-10 bg-[#14108a] text-white">
        <div class="mx-auto h-[0.85em] w-[3.2em] border-b-[0.3em] border-white/35" aria-hidden="true" />
        <header class="flex items-center gap-[0.55em] border-b border-white/10 px-[1.2em] py-[0.9em]">
          <span class="text-[0.75em] font-bold uppercase tracking-[0.075em]">Quote review</span>
          <span class="ml-auto text-[0.7em] font-medium text-white/60">Just now</span>
        </header>
      </div>

      <div class="bg-[#14108a] px-[1.2em] pb-[2.15em] pt-[1.6em] text-white">
        <div class="flex items-baseline gap-[0.75em] text-[0.7em] font-bold uppercase tracking-[0.075em]">
          <span class="truncate">{{ projectName }}</span>
          <span class="ml-auto shrink-0 font-medium text-white/60">#{{ quoteNumber }}</span>
        </div>
        <h2 class="mt-[1.15em] text-[1.45em] font-bold leading-[1.08] tracking-tight">{{ title }}</h2>
        <p class="mt-[1.2em] text-[2.875em] font-bold leading-none tracking-tight tabular-nums">{{ total }}</p>
      </div>

      <section class="quote-review-sheet__section">
        <h3>Customer info</h3>
        <dl>
          <div class="quote-review-sheet__row">
            <dt>Name</dt>
            <dd>{{ customerName }}</dd>
          </div>
        </dl>
      </section>

      <section v-if="scopeItems.length" class="quote-review-sheet__section">
        <h3>Scope &amp; pricing <span>{{ scopeItems.length }} items</span></h3>
        <ul>
          <li v-for="item in scopeItems" :key="item.title" class="quote-review-sheet__amount-row">
            <div>
              <strong>{{ item.title }}</strong>
              <small v-if="item.detail">{{ item.detail }}</small>
            </div>
            <b>{{ item.amount }}</b>
          </li>
        </ul>
      </section>

      <section v-if="allowances.length" class="quote-review-sheet__section">
        <h3>Allowances <span>{{ allowances.length }} allowances</span></h3>
        <ul>
          <li v-for="item in allowances" :key="item.title" class="quote-review-sheet__amount-row">
            <div>
              <strong>{{ item.title }}</strong>
              <small>{{ item.detail }}</small>
            </div>
            <b>{{ item.amount }}</b>
          </li>
        </ul>
      </section>

      <section v-if="exclusions.length" class="quote-review-sheet__section">
        <h3>Exclusions <span>{{ exclusions.length }} items</span></h3>
        <ul class="space-y-[0.6em] px-[1em] py-[1em] text-[0.9em] leading-[1.35]">
          <li v-for="item in exclusions" :key="item" class="flex gap-[0.7em]">
            <span aria-hidden="true">•</span><span>{{ item }}</span>
          </li>
        </ul>
      </section>

      <section v-if="paymentSchedule.length" class="quote-review-sheet__section">
        <h3>Payment schedule <span>{{ paymentSchedule.length }} payments</span></h3>
        <ul>
          <li v-for="item in paymentSchedule" :key="item.title" class="quote-review-sheet__amount-row">
            <div>
              <strong>{{ item.title }}</strong>
              <small v-if="item.detail">{{ item.detail }}</small>
            </div>
            <b>{{ item.amount }}</b>
          </li>
        </ul>
      </section>

      <section class="quote-review-sheet__section">
        <h3>Timing</h3>
        <dl>
          <div class="quote-review-sheet__row">
            <dt>Quote validity</dt>
            <dd>{{ validityDays }} days from issue</dd>
          </div>
          <div v-if="schedulingBasis" class="quote-review-sheet__row">
            <dt>Scheduling</dt>
            <dd>{{ schedulingBasis }}</dd>
          </div>
        </dl>
      </section>
    </div>

    <div class="absolute inset-x-0 bottom-0 flex items-center gap-[0.65em] rounded-t-[2em] bg-white px-[1em] pb-[2em] pt-[1em] shadow-[0_-1em_2em_rgba(0,0,0,0.06)]">
      <button class="flex h-[3.2em] items-center justify-center gap-[0.45em] rounded-full bg-black/5 px-[1.25em] text-[0.875em] font-semibold" type="button"
        @click="$emit('dismiss')">
        <PhPencilSimple class="size-[1em]" weight="bold" aria-hidden="true" />
        <span>Revise</span>
      </button>
      <button
        class="quote-review-sheet__approve flex h-[3.2em] flex-1 items-center justify-center gap-[0.45em] rounded-full bg-[#14108a] px-[1.25em] text-[0.875em] font-semibold text-white disabled:pointer-events-none"
        :class="{ 'quote-review-sheet__approve--pressing': status === 'approving' }"
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
.quote-review-sheet {
  font-family: -apple-system, BlinkMacSystemFont, "SF Pro Text", system-ui, sans-serif;
}

.quote-review-sheet__section > h3 {
  display: flex;
  justify-content: space-between;
  gap: 1em;
  border-bottom: 1px solid rgb(0 0 0 / 0.08);
  padding: 0.85em 1.15em;
  font-size: 0.72em;
  font-weight: 700;
  letter-spacing: 0.075em;
  text-transform: uppercase;
}

.quote-review-sheet__section > h3 span {
  color: rgb(0 0 0 / 0.52);
  font-weight: 500;
  letter-spacing: 0;
  text-transform: none;
}

.quote-review-sheet__section {
  border-bottom: 1px solid rgb(0 0 0 / 0.08);
}

.quote-review-sheet__row,
.quote-review-sheet__amount-row {
  display: flex;
  align-items: flex-start;
  gap: 1em;
  padding: 0.85em 1em;
}

.quote-review-sheet__row + .quote-review-sheet__row,
.quote-review-sheet__amount-row + .quote-review-sheet__amount-row {
  border-top: 1px solid rgb(0 0 0 / 0.08);
}

.quote-review-sheet__row dt {
  color: rgb(0 0 0 / 0.58);
}

.quote-review-sheet__row dd,
.quote-review-sheet__amount-row > b {
  margin-left: auto;
  max-width: 68%;
  text-align: right;
  font-weight: 650;
}

.quote-review-sheet__amount-row strong,
.quote-review-sheet__amount-row small {
  display: block;
}

.quote-review-sheet__amount-row small {
  margin-top: 0.3em;
  color: rgb(0 0 0 / 0.58);
  font-size: 0.82em;
  line-height: 1.3;
}

.quote-review-sheet__approve {
  transition: transform 160ms cubic-bezier(0.23, 1, 0.32, 1);
}

.quote-review-sheet__approve:active,
.quote-review-sheet__approve--pressing {
  transform: scale(0.97);
}
</style>
