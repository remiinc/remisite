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
    class="relative cursor-pointer rounded-full px-3 py-2 text-base font-normal text-foreground transition-colors tracking-[-0.02em] before:content-[''] before:absolute before:inset-1 before:rounded-full before:z-0 before:bg-foreground/5 before:opacity-0 hover:before:opacity-100 before:transition-all before:duration-200 before:ease-in-out hover:before:inset-0"
  >
    <slot />
  </a>
</template>
