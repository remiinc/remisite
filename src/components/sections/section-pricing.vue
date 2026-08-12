<script setup>
import { PhArrowCounterClockwise, PhArrowRight, PhCheck, PhShieldCheck } from '@phosphor-icons/vue'
import Autoplay from 'embla-carousel-autoplay'
import useEmblaCarousel from 'embla-carousel-vue'
import { onBeforeUnmount, onMounted, ref, watch } from 'vue'
import { getOnboardingEntry } from '../../lib/acquisition.js'
import Button from '../global/button.vue'
import MessageNotification from './components/message-notification.vue'

const guidedEntry = getOnboardingEntry('guided')
const guidedEntryHref = guidedEntry.href || '/start'

const included = [
  'Learns your business across email, calendar, messages, and connected tools',
  'Finds follow-ups and moves useful work forward without waiting to be asked',
  'Handles quotes, invoices, scheduling, and customer records',
  'Brings you approvals and receipts instead of another dashboard',
]

const carouselDelay = 5500
const placeholderMessages = ['This is a placeholder image']
const carouselSlides = [
  {
    src: '/images/features/start-feature-01@2x.webp',
    alt: 'A business owner checking Remi from his phone',
    objectPosition: 'center 72%',
  },
  {
    src: '/images/solutions/plumbing-feature@2x.webp',
    alt: 'A plumbing contractor meeting with a customer in her home',
    objectPosition: '72% center',
  },
  {
    src: '/images/features/home-feature-02@2x.jpg',
    alt: 'A business owner using a laptop at a workshop',
    objectPosition: 'center',
  },
  {
    src: '/images/misc/contractor-001@2x.webp',
    alt: 'A contractor standing at an active job site',
    objectPosition: 'center',
  },
]

const reducedMotionQuery = '(prefers-reduced-motion: reduce)'
const selectedSlideIndex = ref(0)
const progressCycle = ref(0)
const progressElapsed = ref(0)
const isAutoplayPlaying = ref(false)
const isReducedMotion = ref(
  typeof window !== 'undefined' && window.matchMedia(reducedMotionQuery).matches,
)
const carouselOptions = {
  loop: true,
  slidesToScroll: 1,
  breakpoints: {
    [reducedMotionQuery]: {
      duration: 0,
    },
  },
}
const carouselPlugins = [Autoplay({
  delay: carouselDelay,
  playOnInit: false,
  stopOnFocusIn: false,
  stopOnInteraction: true,
  stopOnMouseEnter: false,
})]
const [carouselRef, carouselApi] = useEmblaCarousel(carouselOptions, carouselPlugins)
let reducedMotionMedia = null
let syncReducedMotion = null
let autoplayTimerStartedAt = null
let remainingAutoplayDelay = carouselDelay
let resumeTimer = null
let resumeTimerStartedAt = null

const clearResumeTimer = () => {
  if (resumeTimer === null) return

  window.clearTimeout(resumeTimer)
  resumeTimer = null
  resumeTimerStartedAt = null
}

const pauseAutoplay = (api) => {
  const now = Date.now()

  if (resumeTimer !== null && resumeTimerStartedAt !== null) {
    remainingAutoplayDelay = Math.max(0, remainingAutoplayDelay - (now - resumeTimerStartedAt))
    clearResumeTimer()
  } else if (autoplayTimerStartedAt !== null) {
    remainingAutoplayDelay = Math.max(0, carouselDelay - (now - autoplayTimerStartedAt))
  }

  autoplayTimerStartedAt = null
  api.plugins().autoplay?.stop()
  progressElapsed.value = carouselDelay - remainingAutoplayDelay
  progressCycle.value += 1
  isAutoplayPlaying.value = false
}

const finishRemainingAutoplay = (api) => {
  resumeTimer = null
  resumeTimerStartedAt = null
  api.scrollNext(isReducedMotion.value)
  api.plugins().autoplay?.play()
}

const resumeAutoplay = (api) => {
  if (isReducedMotion.value || resumeTimer !== null) return
  if (remainingAutoplayDelay <= 0) {
    finishRemainingAutoplay(api)
    return
  }

  resumeTimerStartedAt = Date.now()
  resumeTimer = window.setTimeout(() => finishRemainingAutoplay(api), remainingAutoplayDelay)
  isAutoplayPlaying.value = true
}

const syncSelectedSlide = (api) => {
  selectedSlideIndex.value = api.selectedScrollSnap()
}

const syncAutoplay = (api) => {
  const autoplay = api.plugins().autoplay

  if (!autoplay) return
  if (isReducedMotion.value) {
    clearResumeTimer()
    autoplayTimerStartedAt = null
    remainingAutoplayDelay = carouselDelay
    progressElapsed.value = 0
    isAutoplayPlaying.value = false
    autoplay.stop()
    return
  }

  autoplay.play()
}

const scrollToSlide = (index) => {
  const api = carouselApi.value

  if (!api) return
  pauseAutoplay(api)
  api.scrollTo(index, isReducedMotion.value)
  resumeAutoplay(api)
}

watch(
  carouselApi,
  (api, _previousApi, onCleanup) => {
    if (!api) return

    const handleSelect = () => {
      syncSelectedSlide(api)
    }
    const handleTimerSet = () => {
      clearResumeTimer()
      autoplayTimerStartedAt = Date.now()
      remainingAutoplayDelay = carouselDelay
      progressElapsed.value = 0
      isAutoplayPlaying.value = true
      progressCycle.value += 1
    }
    const handleTimerStopped = () => {
      isAutoplayPlaying.value = false
    }
    const handlePointerDown = () => {
      pauseAutoplay(api)
    }
    const handlePointerUp = () => {
      resumeAutoplay(api)
    }

    syncSelectedSlide(api)
    api.on('select', handleSelect)
    api.on('reInit', handleSelect)
    api.on('pointerDown', handlePointerDown)
    api.on('pointerUp', handlePointerUp)
    api.on('autoplay:timerset', handleTimerSet)
    api.on('autoplay:timerstopped', handleTimerStopped)
    syncAutoplay(api)

    onCleanup(() => {
      api.off('select', handleSelect)
      api.off('reInit', handleSelect)
      api.off('pointerDown', handlePointerDown)
      api.off('pointerUp', handlePointerUp)
      api.off('autoplay:timerset', handleTimerSet)
      api.off('autoplay:timerstopped', handleTimerStopped)
      clearResumeTimer()
    })
  },
  { immediate: true },
)

watch(isReducedMotion, () => {
  if (carouselApi.value) syncAutoplay(carouselApi.value)
})

onMounted(() => {
  reducedMotionMedia = window.matchMedia(reducedMotionQuery)
  syncReducedMotion = () => {
    isReducedMotion.value = reducedMotionMedia.matches
  }

  syncReducedMotion()
  reducedMotionMedia.addEventListener('change', syncReducedMotion)
})

onBeforeUnmount(() => {
  clearResumeTimer()
  if (syncReducedMotion) reducedMotionMedia?.removeEventListener('change', syncReducedMotion)
})
</script>

<template>
  <section id="pricing" class="w-full scroll-mt-24 px-6 py-24 md:py-32" data-section-pricing>
    <div
      class="mx-auto grid w-full max-w-(--content-width) items-stretch gap-12 lg:grid-cols-[1.08fr_0.92fr] lg:gap-20"
    >
      <div
        class="min-w-0 lg:order-2"
        role="region"
        aria-label="Remi at work"
        aria-roledescription="carousel"
        data-pricing-carousel>
        <div ref="carouselRef" class="h-[28rem] overflow-hidden rounded-3xl sm:h-[38rem] lg:h-[42rem]">
          <div class="pricing-carousel__container flex h-full">
            <figure
              v-for="(slide, index) in carouselSlides"
              :key="slide.src"
              class="relative mr-3 h-full w-full min-w-0 flex-[0_0_100%] overflow-hidden rounded-3xl bg-muted"
              role="group"
              aria-roledescription="slide"
              :aria-label="`${index + 1} of ${carouselSlides.length}`"
              :aria-current="selectedSlideIndex === index ? 'true' : undefined"
              :aria-hidden="selectedSlideIndex === index ? undefined : 'true'"
              :inert="selectedSlideIndex !== index">
              <img
                :src="slide.src"
                :alt="slide.alt"
                class="absolute inset-0 size-full rounded-3xl object-cover"
                :style="{ objectPosition: slide.objectPosition }"
                loading="lazy"
              >
              <div class="absolute inset-0 z-10 grid place-items-center p-6">
                <MessageNotification
                  :messages="placeholderMessages"
                  :autoplay="false"
                  :loop="false"
                  :max-visible="1" />
              </div>
            </figure>
          </div>
        </div>

        <div class="mt-4" data-pricing-carousel-controls>
          <div class="flex min-w-0 items-center gap-1" aria-label="Choose a carousel image">
            <button
              v-for="(_slide, index) in carouselSlides"
              :key="index"
              type="button"
              class="group flex h-8 min-w-0 basis-0 shrink cursor-pointer items-center transition-[flex-grow] duration-300 ease-out"
              :class="selectedSlideIndex === index ? 'grow-[4]' : 'grow'"
              :aria-label="`Show image ${index + 1} of ${carouselSlides.length}`"
              :aria-current="selectedSlideIndex === index ? 'true' : undefined"
              data-pricing-carousel-dot
              @click="scrollToSlide(index)">
              <span class="relative block h-1.5 w-full overflow-hidden rounded-full bg-foreground/15">
                <span
                  v-if="selectedSlideIndex === index"
                  :key="`${index}-${progressCycle}`"
                  class="pricing-carousel__progress absolute inset-0 origin-left rounded-full bg-foreground"
                  :class="isAutoplayPlaying ? '' : 'is-paused'"
                  :style="{
                    '--pricing-carousel-delay': `${carouselDelay}ms`,
                    '--pricing-carousel-elapsed': `-${progressElapsed}ms`,
                  }"
                  aria-hidden="true" />
              </span>
            </button>
          </div>
        </div>
      </div>

      <div class="w-full flex max-w-xl md:max-w-none flex-col justify-center lg:order-1 lg:py-10">
        <div class="flex flex-col gap-8">
          <div class="flex flex-col gap-4">
            <h2 class="headline-h1 max-w-[13ch] text-balance text-foreground">
              The first week is on us.
            </h2>
            <p class="max-w-[42ch] text-base leading-normal text-pretty text-muted-foreground">
              Meet the teammate who keeps the business side moving while you focus on the work only you can do.
            </p>
          </div>

          <ul class="grid gap-3.5" aria-label="Everything included with Remi">
            <li v-for="item in included" :key="item" class="flex gap-3 text-base leading-snug text-foreground/70">
              <PhCheck class="mt-0.5 size-4 shrink-0 text-foreground" weight="bold" aria-hidden="true" />
              <span>{{ item }}</span>
            </li>
          </ul>

          <div class="flex items-end gap-3 border-t border-border pt-8">
            <span class="headline-h1 leading-[0.9em] text-foreground">
              $49
            </span>
            <span class="pb-1 text-base leading-tight text-muted-foreground">/month</span>
          </div>

          <div class="flex flex-col gap-4">
            <Button
              :href="guidedEntryHref"
              class="w-full"
              size="lg"
              data-marketing-cta="pricing_single_guided"
              data-marketing-destination="guided"
              :data-attribution-state="guidedEntry.attributionState"
            >
              <span class="inline-flex items-center gap-2">
                <span>Start your free trial</span>
                <PhArrowRight class="size-4" weight="bold" aria-hidden="true" />
              </span>
            </Button>

            <ul class="flex flex-wrap gap-x-5 gap-y-2 text-xs text-muted-foreground sm:text-sm" aria-label="Trial terms">
              <li class="flex items-center gap-1.5">
                <PhCheck class="size-4" weight="bold" aria-hidden="true" />
                <span>7 days free</span>
              </li>
              <li class="flex items-center gap-1.5">
                <PhArrowCounterClockwise class="size-4" aria-hidden="true" />
                <span>Cancel anytime</span>
              </li>
              <li class="flex items-center gap-1.5">
                <PhShieldCheck class="size-4" aria-hidden="true" />
                <span>Your data stays yours</span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
.pricing-carousel__container {
  touch-action: pan-y pinch-zoom;
}

.pricing-carousel__progress {
  transform: scaleX(0);
  animation: pricing-carousel-progress var(--pricing-carousel-delay) linear forwards;
  animation-delay: var(--pricing-carousel-elapsed);
  will-change: transform;
}

.pricing-carousel__progress.is-paused {
  animation-play-state: paused;
}

@keyframes pricing-carousel-progress {
  to {
    transform: scaleX(1);
  }
}

@media (prefers-reduced-motion: reduce) {
  .pricing-carousel__progress {
    animation: none;
    transform: scaleX(1);
    will-change: auto;
  }
}
</style>
