<script setup>
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
    class="cursor-pointer rounded-full px-2 py-1 text-sm font-medium text-muted-foreground transition-colors hover:bg-foreground/5 hover:text-foreground"
  >
    <slot />
  </a>
</template>
