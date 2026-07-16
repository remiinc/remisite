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
  <section class="w-full px-6 py-16 md:py-24" data-solution-feature>
    <article
      class="relative mx-auto aspect-[4/5] w-full max-w-(--content-width) overflow-hidden rounded-3xl bg-foreground md:aspect-[2/1]"
    >
      <img
        :src="feature.imageUrl"
        :alt="feature.imageAlt"
        class="absolute inset-0 size-full object-cover object-[65%_center] md:object-center"
        loading="lazy"
        decoding="async"
      >
      <div class="absolute inset-0 bg-black/45" aria-hidden="true" />

      <div class="relative z-1 flex size-full items-end p-7 md:p-12">
        <div class="flex max-w-2xl flex-col items-start gap-5 text-background">
          <h2 class="max-w-[14ch] text-4xl font-normal leading-none tracking-tight text-balance md:text-5xl">
            {{ feature.title }}
          </h2>
          <p class="max-w-xl text-base leading-snug text-pretty text-background/75 md:text-lg">
            {{ feature.description }}
          </p>
          <Button :href="feature.ctaUrl" variant="white" size="sm">
            {{ feature.ctaLabel }}
          </Button>
        </div>
      </div>
    </article>
  </section>
</template>
