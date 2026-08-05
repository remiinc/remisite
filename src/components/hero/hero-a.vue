<script setup>
import Button from '../global/button.vue'

defineProps({
  videoSrc: {
    type: String,
    default: '/videos/hero-video.mp4',
  },
  mobileVideoSrc: {
    type: String,
    default: '/videos/hero-video-mobile.mp4',
  },
  videoPoster: {
    type: String,
    default: '/images/hero-video-poster.jpg',
  },
})
</script>

<template>
  <section
    class="hero-video-section w-full min-h-160 h-(--hero-height) p-(--hero-padding) grid grid-rows-1 grid-cols-1">
    <div class="hero-video relative col-start-1 col-end-1 row-start-1 row-end-1 overflow-hidden w-full h-full"
      aria-hidden="true">
      <video v-if="videoSrc" class="absolute inset-0 h-full w-full object-cover object-bottom"
        :poster="videoPoster || undefined" width="1280" height="720" autoplay muted loop playsinline preload="metadata">
        <source v-if="mobileVideoSrc" :src="mobileVideoSrc" media="(max-width: 767px)" type="video/mp4">
        <source :src="videoSrc" type="video/mp4">
      </video>
      <div
        class="absolute inset-0 h-full w-full bg-linear-to-b from-black/20 via-60% via-black/0 to-black/60 pointer-events-none" />
    </div>

    <div
      class="relative col-start-1 col-end-1 row-start-1 row-end-1 w-full max-w-(--content-width) h-full py-24 px-6 mx-auto flex flex-col items-center justify-center text-center gap-12">
      <div class="z-1 flex flex-1" aria-hidden="true" />

      <div class="hero-copy relative z-1 flex flex-col items-center gap-10">
        <h1
          class="headline-h1 max-w-[20ch] text-center text-balance text-background select-none">
          Grow your business. <span class="block">Let Remi handle the admin.</span>
        </h1>
      </div>

      <div
        class="relative z-1 flex w-full max-w-sm flex-col items-center justify-center gap-y-3 gap-x-8 sm:max-w-none sm:flex-row">
        <Button href="/start" variant="white" size="lg" class="w-full sm:w-auto" data-marketing-cta="hero_text_remi"
          data-marketing-destination="guided">
          <span class="flex items-center gap-2.5">
            <img src="/images/app-logos/ios-messages-icon.svg" alt="" class="size-5 shrink-0" aria-hidden="true">
            <span>Text Remi</span>
          </span>
        </Button>
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
