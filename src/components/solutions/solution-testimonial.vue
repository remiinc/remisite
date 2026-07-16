<script setup>
defineProps({
  testimonial: {
    type: Object,
    required: true,
  },
})
</script>

<template>
  <section class="w-full px-6 py-16" aria-label="Customer testimonial" data-solution-testimonial>
    <figure
      class="mx-auto flex py-24 px-8 w-full max-w-(--content-width) flex-col items-center justify-center gap-16 rounded-3xl bg-muted text-center"
      :data-placeholder-testimonial="testimonial.placeholder || undefined"
    >
      <blockquote
        class="max-w-4xl text-2xl lg:text-4xl font-normal leading-[1.125em] tracking-tight text-balance"
      >
        &ldquo;{{ testimonial.quote }}&rdquo;
      </blockquote>

      <figcaption class="flex flex-col text-center items-center gap-y-0.5">
        <p class="text-sm font-medium leading-tight text-foreground">
          {{ testimonial.name }}
        </p>
        <p class="text-sm leading-tight text-muted-foreground">
          {{ testimonial.position }}, {{ testimonial.companyType }}
        </p>
      </figcaption>
    </figure>
  </section>
</template>
