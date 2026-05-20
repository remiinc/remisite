<script setup>
import { PhArrowRight } from '@phosphor-icons/vue'

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
    class="group mt-12 inline-flex items-center gap-2 text-base font-medium tracking-tight text-foreground transition-colors hover:text-muted-foreground"
  >
    <span>
      <slot />
    </span>
    <PhArrowRight
      :size="14"
      weight="bold"
      class="shrink-0 transition-transform duration-200 ease-out group-hover:translate-x-1"
      aria-hidden="true"
    />
  </a>
</template>
