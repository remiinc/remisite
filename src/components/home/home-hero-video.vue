<script setup>
defineProps({
  videoSrc: {
    type: String,
    default: '/videos/hero-video.mp4',
  },
  videoPoster: {
    type: String,
    default: '',
  },
})
</script>

<template>
  <section class="hero-video-section w-full min-h-[640px] h-(--hero-height) p-(--hero-padding) grid grid-rows-1 grid-cols-1">
    <div
      class="hero-video relative col-start-1 col-end-1 row-start-1 row-end-1 overflow-hidden w-full h-full"
      aria-hidden="true">
      <video v-if="videoSrc" class="absolute inset-0 h-full w-full object-cover" :src="videoSrc"
        :poster="videoPoster || undefined" autoplay muted loop playsinline preload="auto" />
      <div class="absolute inset-0 h-full w-full bg-black/30 mask-t-from-0% mask-t-to-70% pointer-events-none" />
    </div>

    <div
      class="relative col-start-1 col-end-1 row-start-1 row-end-1 w-full max-w-[1400px] h-full px-6 py-24 mx-auto flex flex-col items-center justify-center text-center gap-10">
      <div class="z-1 flex flex-1" aria-hidden="true" />
      <div class="hero-copy relative z-1 flex flex-col items-center gap-10">
        <h1
          class="max-w-[20ch] text-4xl md:text-[clamp(3.5rem,8vw,5rem)] leading-[1em] font-normal tracking-[-0.03em] text-balance text-background select-none">
          Your business should run. <span class="block">It shouldn't run you.</span>
        </h1>
        <p class="text-[0.875em] text-background text-center leading-none *:block flex flex-col gap-1 mb-2">
          <span>Meet the last operations hire you'll ever need.</span>
          <span class="text-background/50">Beta launching late 2026</span>
        </p>
      </div>
      <div class="relative z-1 flex w-full max-w-sm flex-col items-center justify-center gap-3 sm:max-w-none sm:flex-row">
        <a href="#"
          class="inline-flex h-12 w-full items-center justify-center gap-2.5 rounded-full bg-background px-5 text-sm font-medium leading-none text-foreground transition-opacity duration-200 hover:opacity-90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-background/60 focus-visible:ring-offset-2 focus-visible:ring-offset-foreground sm:w-auto">
          <img src="/images/app-logos/ios-messages-icon.svg" alt="" class="size-5 shrink-0" aria-hidden="true">
          <span>Text Remi</span>
        </a>
        <a href="#"
          class="inline-flex h-12 w-full items-center justify-center gap-2.5 rounded-full bg-background/20 px-5 text-sm font-medium leading-none text-background shadow-[0_0_0_1px_rgba(255,255,255,0.18)_inset] backdrop-blur-sm transition-opacity duration-200 hover:opacity-90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-background/60 focus-visible:ring-offset-2 focus-visible:ring-offset-foreground sm:w-auto">
          <img src="/images/app-logos/gmail.svg" alt="" class="size-5 shrink-0" aria-hidden="true">
          <span>Sign up with Gmail</span>
        </a>
      </div>
    </div>
  </section>
</template>

<style scoped>
.hero-video {
  opacity: 0;
  animation: hero-video-appear 0.9s ease both;
  clip-path: inset(0em round 0.875em);
  will-change: clip-path, opacity;
}

@supports (animation-timeline: scroll()) {
  .hero-video {
    animation:
      hero-video-appear 0.9s ease both,
      hero-video-frame linear both;
    animation-timeline: auto, scroll(root block);
    animation-range: normal, 0px 160px;
  }
}

@keyframes hero-video-appear {
  to {
    opacity: 1;
  }
}

@keyframes hero-video-frame {
  from {
    clip-path: inset(0em round 0.875em);
  }

  to {
    clip-path: inset(1em round 2em);
  }
}

@media (min-width: 640px) {
  @keyframes hero-video-frame {
    from {
      clip-path: inset(0em round 0.875em);
    }

    to {
      clip-path: inset(2em round 2em);
    }
  }
}

@media (prefers-reduced-motion: reduce) {
  .hero-video {
    clip-path: inset(1em round 2em);
    opacity: 1;
    animation: none;
  }
}

@media (prefers-reduced-motion: reduce) and (min-width: 640px) {
  .hero-video {
    clip-path: inset(2em round 2em);
  }
}

.hero-video video {
  will-change: opacity;
  background-color: var(--color-background);
}
</style>
