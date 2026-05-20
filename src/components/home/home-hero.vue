<script setup>
import HeroInput from './hero-input.vue'

const emit = defineEmits(['book-demo'])
</script>

<template>
  <section class="mx-auto flex max-w-4xl flex-col items-center justify-center gap-2 px-6 py-24 text-center sm:py-32">
    <h1 class="max-w-[20ch] text-8xl font-normal tracking-tight text-balance text-foreground">
      The last operations hire you'll ever need
    </h1>
    <p class="mt-4 max-w-[56ch] text-base leading-tight text-muted-foreground">
      AI agent for service businesses.
    </p>
    <div class="mt-8 w-full">
      <HeroInput @send="emit('book-demo')" />
    </div>
  </section>
</template>
