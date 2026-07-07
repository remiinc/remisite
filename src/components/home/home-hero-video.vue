<script setup>
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { onBeforeUnmount, onMounted, ref } from 'vue'
import Button from '../global/button.vue'

gsap.registerPlugin(ScrollTrigger)

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

const heroSectionRef = ref(null)
const heroVideoRef = ref(null)

let heroIntroContext = null

onMounted(() => {
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches

  if (prefersReducedMotion) {
    gsap.set(heroVideoRef.value, { autoAlpha: 1 })
    return
  }

  heroIntroContext = gsap.context(() => {
    gsap.fromTo(heroVideoRef.value, {
      autoAlpha: 0,
    }, {
      autoAlpha: 1,
      duration: 0.9,
    })

    gsap.fromTo(
      heroVideoRef.value,
      { '--video-inset': '0em', '--video-radius': '0.875em' },
      {
        '--video-inset': '2em',
        '--video-radius': '2em',
        ease: 'none',
        scrollTrigger: {
          trigger: heroSectionRef.value,
          start: 'top top',
          end: '+=160',
          scrub: 0.75,
          invalidateOnRefresh: true,
        },
      },
    )
  }, heroSectionRef.value)
})

onBeforeUnmount(() => {
  if (heroIntroContext) {
    heroIntroContext.revert()
  }
})
</script>

<template>
  <section ref="heroSectionRef" class="w-full min-h-[640px] h-(--hero-height) p-(--hero-padding) grid grid-rows-1 grid-cols-1">
    <div ref="heroVideoRef"
      class="hero-video relative col-start-1 col-end-1 row-start-1 row-end-1 overflow-hidden opacity-0 w-full h-full"
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
          <span>Your company's new agentic COO</span>
          <span class="text-background/50">Beta launching late 2026</span>
        </p>
      </div>
      <form action="/qualify/contact" method="GET"
        class="hero-email-form relative z-1 w-full max-w-sm rounded-full backdrop-blur-sm p-1 items-center before:content-[''] before:absolute before:inset-0 before:rounded-full before:shadow-[0_0_0_1px_rgba(0,0,0,0.02),0_3px_4px_-4px_rgba(0,0,0,0.1),0_4px_12px_-6px_rgba(0,0,0,0.02)] after:content-[''] after:absolute after:inset-0 after:bg-background/20 after:backdrop-blur-sm after:rounded-full after:shadow-[0_0_4px_0_rgba(255,255,255,0.5)_inset,0_0_10px_-10px_rgba(255,255,255,1)_inset]">
        <div class="relative z-1 flex w-full items-center gap-1">
          <label for="hero-email" class="sr-only">Your email</label>
          <input id="hero-email" name="email" type="email" autocomplete="email" required placeholder="Your email"
            class="hero-email-input h-10 min-w-0 flex-1 bg-transparent px-3 text-base text-background placeholder:text-background/60 outline-none">
          <Button type="submit">Get started</Button>
        </div>
      </form>
    </div>
  </section>
</template>

<style scoped>
.hero-video {
  --video-inset: 0em;
  --video-radius: 0.875em;
  clip-path: inset(var(--video-inset) round var(--video-radius));
  will-change: clip-path, opacity;
}

.hero-video video {
  will-change: opacity;
  background-color: var(--color-background);
}

.hero-email-form:focus-within {
  box-shadow:
    inset 0 0 0 1px color-mix(in oklch, var(--color-background) 28%, transparent),
    0 0 0 4px color-mix(in oklch, var(--color-background) 12%, transparent);
}
</style>
