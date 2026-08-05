<script setup>
import { PhArrowCounterClockwise, PhCalendarCheck, PhShieldCheck } from '@phosphor-icons/vue'

defineProps({
  align: {
    type: String,
    default: 'center',
    validator: (value) => ['center', 'start'].includes(value),
  },
  limit: {
    type: Number,
    default: 4,
    validator: (value) => Number.isInteger(value) && value >= 0,
  },
})
</script>

<template>
  <ul
    class="flex flex-wrap items-center gap-x-5 gap-y-4 text-xs font-medium tracking-[-0.01em] text-background/65 sm:gap-x-8 sm:text-sm"
    :class="align === 'start' ? 'justify-start' : 'justify-center'"
    aria-label="Product assurances">
    <li v-if="limit >= 1" class="flex items-center gap-2 whitespace-nowrap">
      <PhCalendarCheck class="size-4 shrink-0" weight="regular" aria-hidden="true" />
      <span>7-day free trial</span>
    </li>
    <li v-if="limit >= 2" class="flex items-center gap-2 whitespace-nowrap">
      <PhArrowCounterClockwise class="size-4 shrink-0" weight="regular" aria-hidden="true" />
      <span>Cancel anytime</span>
    </li>
    <li v-if="limit >= 3" class="flex items-center gap-2 whitespace-nowrap">
      <PhShieldCheck class="size-4 shrink-0" weight="regular" aria-hidden="true" />
      <span>Your data stays yours</span>
    </li>
    <li v-if="limit >= 4" class="flex items-center gap-2 whitespace-nowrap">
      <img src="/images/icons/us-flag.svg?v=monochrome" alt=""
        class="size-4 shrink-0 object-contain opacity-[0.65]" aria-hidden="true">
      <span>US-based support</span>
    </li>
  </ul>
</template>
