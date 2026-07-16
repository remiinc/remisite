<script setup>
import { PhArrowRight } from '@phosphor-icons/vue'
</script>

<template>
  <a
    href="/start"
    aria-label="Remi is now available in Early Access. Try for free."
    class="announcement-bar relative flex h-(--topbar-height) w-full flex-col items-center justify-center px-2"
    data-announcement-bar
    data-marketing-cta="announcement_text_remi"
    data-marketing-destination="linq"
  >
    <div class="flex w-full min-w-0 items-center justify-center gap-2 px-3 text-center text-sm sm:gap-4">
      <span class="min-w-0 truncate">Now available in Early Access</span>
      <span class="inline-flex shrink-0 items-center justify-center gap-1 text-foreground/50">
        <span>Try for free</span>
        <PhArrowRight size="16" weight="regular" aria-hidden="true" />
      </span>
    </div>
  </a>
</template>
