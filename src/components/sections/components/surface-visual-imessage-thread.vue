<script setup>
import { PhCaretLeft } from '@phosphor-icons/vue'
import { cn } from '../../../lib/cn'
import SiteLogo from '../../global/site-logo.vue'

const imessageThread = [
  {
    id: 'customer-note',
    from: 'me',
    text: 'Remi, what still needs doing for the Johnson order?',
  },
  {
    id: 'reminder-set',
    from: 'remi',
    text: 'They approved the quote. Deposit is paid. Pickup time still needs confirming.',
  },
  {
    id: 'open-loops',
    from: 'me',
    text: 'Draft the follow-up?',
  },
  {
    id: 'open-loops-summary',
    from: 'remi',
    text: 'Done. I included the balance, pickup window, and care notes from last week.',
  },
]
</script>

<template>
  <div class="w-full aspect-4/3 md:aspect-square rounded-[2em] bg-muted flex flex-col items-center justify-start pt-[4em] overflow-hidden">
    <div class="w-full max-w-[20em] aspect-3/5 bg-background rounded-tl-[2.5em] rounded-tr-[2.5em] flex flex-col">
      <div class="w-full pt-[1.6em] grid grid-cols-3 px-[1em]">
        <div
          class="self-start justify-self-start p-[0.5em] rounded-full shadow-[0_0_0_1px_color-mix(in_oklch,var(--color-foreground)_5%,transparent)] text-foreground/50"
        >
          <PhCaretLeft weight="bold" />
        </div>
        <div
          class="justify-self-center size-[3.25em] rounded-full bg-linear-to-b from-foreground/5 to-foreground/10 flex items-center justify-center uppercase font-medium"
        >
          <SiteLogo class="size-[1.5em]" />
        </div>
        <div></div>
      </div>
      <div class="flex flex-1 flex-col gap-[0.45em] px-[1.35em] pt-[1.25em] text-[0.78em] leading-tight">
        <p class="text-center text-[0.8em] text-foreground/35">
          Today 2:14 PM
        </p>
        <p
          v-for="message in imessageThread"
          :key="message.id"
          :class="cn(
            'max-w-[86%] rounded-[1.2em] px-[0.85em] py-[0.55em] text-pretty',
            message.from === 'me'
              ? 'self-end rounded-br-[0.35em] bg-foreground text-background'
              : 'self-start rounded-bl-[0.35em] bg-foreground/7 text-foreground/75',
          )"
        >
          {{ message.text }}
        </p>
      </div>
    </div>
  </div>
</template>
