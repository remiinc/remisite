<script setup>
import Button from '../global/button.vue'
import SectionSecurityPrinciples from './section-security-principles.vue'
</script>

<template>
  <section class="w-full px-6 pt-20 pb-0" data-section-security-intro>
    <span class="mx-auto flex w-full max-w-(--content-width) items-center gap-6">
      <h2 class="inline headline-h2 sm:headline-h3 text-balance text-foreground">
        <span>How we think about security</span>
        <span class="sm:h-[1em] block sm:inline-flex items-center"><Button href="/security" variant="secondary" size="sm"
            class="font-sans relative sm:left-[0.75em] mt-4 sm:mt-0 sm:top-[-0.333em]">Learn more</Button></span>
      </h2>
    </span>
  </section>
  <SectionSecurityPrinciples />
</template>
