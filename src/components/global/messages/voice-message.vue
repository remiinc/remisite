<script setup>
import { PhPlay } from '@phosphor-icons/vue'

defineProps({
  duration: {
    type: String,
    required: true,
  },
})

const bars = [5, 9, 13, 7, 16, 11, 6, 14, 18, 9, 12, 6, 15, 10, 5, 8, 13, 7]
</script>

<template>
  <div class="flex min-w-[10.6em] items-center gap-[0.6em] rounded-[1.25em] bg-blue-400 px-[0.7em] py-[0.55em] text-white"
    :aria-label="`${duration} voice message from Charlie`">
    <span class="flex size-[1.8em] shrink-0 items-center justify-center rounded-full bg-white text-blue-400">
      <PhPlay class="ml-[0.08em] size-[0.8em]" weight="fill" aria-hidden="true" />
    </span>
    <span class="flex h-[1.45em] flex-1 items-center gap-[0.13em]" aria-hidden="true">
      <span v-for="(height, index) in bars" :key="index" class="w-[0.12em] rounded-full bg-white/85"
        :style="{ height: `${height / 16}em` }" />
    </span>
    <span class="text-[0.65em] font-medium tabular-nums text-white/75">{{ duration }}</span>
  </div>
</template>
