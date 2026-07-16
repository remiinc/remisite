<script setup>
import Button from '../global/button.vue'

defineProps({
  feature: {
    type: Object,
    required: true,
  },
})
</script>

<template>
  <section class="w-full px-6 py-12" data-solution-feature>
    <article
      class="relative grid mx-auto min-h-160 md:min-h-120 w-full max-w-(--content-width) overflow-hidden rounded-3xl bg-foreground"
    >
      <img
        :src="feature.imageUrl"
        :alt="feature.imageAlt"
        class="absolute inset-0 size-full object-cover object-[65%_center] md:object-center"
        loading="lazy"
        decoding="async"
      >
      <div class="absolute inset-0 bg-linear-to-r from-black/40 from-20% to-black/20 to-75% transition-colors duration-300" aria-hidden="true" />

      <div class="relative z-1 h-full flex flex-col items-stretch p-7 md:p-12">
        <div class="flex flex-1 max-w-2xl flex-col items-start justify-between gap-12 text-background">
          <h2 class="max-w-[20ch] text-4xl lg:text-5xl font-normal leading-none tracking-tight text-balance">
            {{ feature.title }}
          </h2>
          <Button :href="feature.ctaUrl" variant="white" size="sm">
            {{ feature.ctaLabel }}
          </Button>
        </div>
      </div>
    </article>
  </section>
</template>
