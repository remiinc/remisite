<script setup>
import { PhCaretDown } from '@phosphor-icons/vue'

defineProps({
  href: {
    type: String,
    default: '#',
  },
})
</script>

<template>
  <a
    :href="href"
    class="group relative flex select-none items-center gap-1 rounded-full px-3 py-2 text-sm font-normal tracking-[-0.02em] text-current transition-colors before:absolute before:inset-1 before:z-0 before:rounded-full before:bg-foreground/20 before:opacity-0 before:transition-all before:duration-200 before:ease-in-out before:content-[''] hover:before:inset-0 hover:before:opacity-100 group-hover:before:inset-0 group-hover:before:opacity-100 group-focus-within:before:inset-0 group-focus-within:before:opacity-100"
    aria-haspopup="true"
  >
    <span class="relative z-1">
      <slot />
    </span>
    <PhCaretDown
      aria-hidden="true"
      weight="bold"
      class="relative z-1 size-3 transition-transform duration-200 group-hover:rotate-180 group-focus-within:rotate-180"
    />
  </a>
</template>
