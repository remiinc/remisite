<script setup>
import { PhArrowRight } from '@phosphor-icons/vue'
</script>

<template>
  <a
    href="/start"
    aria-label="Remi is now available in Early Access. Try for free."
    class="announcement-bar relative grid h-(--topbar-height) w-full"
    data-announcement-bar
    data-marketing-cta="announcement_text_remi"
    data-marketing-destination="guided"
  >
    <div class="flex w-full min-w-0 items-center justify-center gap-2 px-3 text-center text-sm sm:gap-4 bg-[color-mix(in_oklch,var(--color-background)_10%,var(--color-foreground))] text-background h-full hover:h-[calc(100%+0.5em)] transition-all duration-300">
      <span class="min-w-0 truncate">Now available in Early Access</span>
      <span class="inline-flex shrink-0 items-center justify-center gap-1 text-current/50">
        <span>Try for free</span>
        <PhArrowRight size="16" weight="regular" aria-hidden="true" />
      </span>
    </div>
  </a>
</template>
