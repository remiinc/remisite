<script setup>
import Button from '../global/button.vue'
import SectionSecurityPrinciples from './section-security-principles.vue'
</script>

<template>
  <section class="w-full px-6 pt-20 pb-0" data-section-security-intro>
    <span class="mx-auto flex w-full max-w-(--content-width) items-center gap-6">
      <h2 class="inline headline-h3 text-balance text-foreground">
        <span>How we think about security</span>
        <span class="h-[1em] inline-flex items-center"><Button href="/security" variant="secondary" size="sm"
            class="font-sans relative left-[0.75em] top-[-0.333em]">Learn more</Button></span>
      </h2>
    </span>
  </section>
  <SectionSecurityPrinciples />
</template>
