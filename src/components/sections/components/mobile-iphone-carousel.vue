<script setup>
import { PhCaretLeft, PhCaretRight } from '@phosphor-icons/vue'
import AutoHeight from 'embla-carousel-auto-height'
import useEmblaCarousel from 'embla-carousel-vue'
import { nextTick, onBeforeUnmount, onMounted, ref, watch } from 'vue'
import StaticIphone from '../../global/static-iphone.vue'

const props = defineProps({
  scenarios: {
    type: Array,
    required: true,
  },
  hasStartedPlayback: {
    type: Boolean,
    default: false,
  },
  initialScenarioId: {
    type: String,
    default: '',
  },
})

const emit = defineEmits(['scenario-change'])

const reducedMotionQuery = '(prefers-reduced-motion: reduce)'
const initialIndex = Math.max(
  0,
  props.scenarios.findIndex(scenario => scenario.id === props.initialScenarioId),
)
const selectedIndex = ref(initialIndex)
const liveMessage = ref('')
const shouldAnnounceNextSelection = ref(false)
const hasMeasuredSlideHeights = ref(false)
const isPreparingHeightMeasurement = ref(true)
const isReducedMotion = ref(
  typeof window !== 'undefined' && window.matchMedia(reducedMotionQuery).matches,
)
let carouselWidth = null
let isUnmounting = false

const prepareHeightMeasurement = (api) => {
  if (isPreparingHeightMeasurement.value) return

  isPreparingHeightMeasurement.value = true
  hasMeasuredSlideHeights.value = false

  nextTick(() => {
    if (isUnmounting || emblaApi.value !== api) return

    api.reInit()
    nextTick(() => {
      if (isUnmounting || emblaApi.value !== api) return

      hasMeasuredSlideHeights.value = true
      nextTick(() => {
        if (isUnmounting || emblaApi.value !== api) return

        isPreparingHeightMeasurement.value = false
      })
    })
  })
}

const watchCarouselResize = (api) => {
  const nextWidth = api.rootNode().getBoundingClientRect().width

  if (carouselWidth === null) {
    carouselWidth = nextWidth
    return false
  }

  if (Math.abs(nextWidth - carouselWidth) < 0.5) return false

  carouselWidth = nextWidth
  prepareHeightMeasurement(api)
  return false
}

const carouselOptions = {
  align: 'center',
  containScroll: 'trimSnaps',
  loop: true,
  slidesToScroll: 1,
  startIndex: initialIndex,
  watchResize: watchCarouselResize,
  breakpoints: {
    [reducedMotionQuery]: {
      duration: 0,
    },
  },
}
const carouselPlugins = [AutoHeight()]
const [emblaRef, emblaApi] = useEmblaCarousel(carouselOptions, carouselPlugins)
let reducedMotionMedia = null
let syncReducedMotion = null

const syncSelectedScenario = (api, announce = false) => {
  const index = api.selectedScrollSnap()
  const scenario = props.scenarios[index] || props.scenarios[0]

  selectedIndex.value = index
  if (!scenario) return

  emit('scenario-change', scenario.id)
  if (announce) {
    liveMessage.value = `${index + 1} of ${props.scenarios.length}: ${scenario.title}`
  }
}

const markNextSelectionForAnnouncement = () => {
  shouldAnnounceNextSelection.value = true
}

const scrollPrev = () => {
  markNextSelectionForAnnouncement()
  emblaApi.value?.scrollPrev(isReducedMotion.value)
}

const scrollNext = () => {
  markNextSelectionForAnnouncement()
  emblaApi.value?.scrollNext(isReducedMotion.value)
}

const handlePlaybackComplete = (index) => {
  if (
    index !== selectedIndex.value
    || !props.hasStartedPlayback
    || isReducedMotion.value
  ) return

  shouldAnnounceNextSelection.value = false
  emblaApi.value?.scrollNext()
}

watch(
  emblaApi,
  (api, _previousApi, onCleanup) => {
    if (!api) return

    const handleSelect = () => {
      syncSelectedScenario(api, shouldAnnounceNextSelection.value)
      shouldAnnounceNextSelection.value = false
    }
    const handleReInit = () => {
      carouselWidth = api.rootNode().getBoundingClientRect().width
      syncSelectedScenario(api)
    }
    const handlePointerDown = () => {
      markNextSelectionForAnnouncement()
    }

    syncSelectedScenario(api)
    api.on('select', handleSelect)
    api.on('reInit', handleReInit)
    api.on('pointerDown', handlePointerDown)

    onCleanup(() => {
      api.off('select', handleSelect)
      api.off('reInit', handleReInit)
      api.off('pointerDown', handlePointerDown)
    })
  },
  { immediate: true },
)

onMounted(() => {
  reducedMotionMedia = window.matchMedia(reducedMotionQuery)
  syncReducedMotion = () => {
    isReducedMotion.value = reducedMotionMedia.matches
  }

  syncReducedMotion()
  reducedMotionMedia.addEventListener('change', syncReducedMotion)

  nextTick(() => {
    hasMeasuredSlideHeights.value = true
    nextTick(() => {
      isPreparingHeightMeasurement.value = false
    })
  })
})

onBeforeUnmount(() => {
  isUnmounting = true
  if (syncReducedMotion) reducedMotionMedia?.removeEventListener('change', syncReducedMotion)
})
</script>

<template>
  <div
    class="relative w-full sm:hidden"
    role="region"
    aria-label="Remi message scenarios"
    aria-roledescription="carousel"
    data-mobile-iphone-carousel>
    <div
      ref="emblaRef"
      class="mobile-iphone-embla__viewport w-full cursor-grab overflow-hidden py-6 active:cursor-grabbing">
      <div class="mobile-iphone-embla__container">
        <article
          v-for="(scenario, index) in scenarios"
          :key="scenario.id"
          role="group"
          aria-roledescription="slide"
          :aria-label="`${index + 1} of ${scenarios.length}: ${scenario.title}`"
          :aria-current="selectedIndex === index ? 'true' : undefined"
          :aria-hidden="selectedIndex === index ? undefined : 'true'"
          :inert="selectedIndex !== index"
          class="mobile-iphone-embla__slide rounded-4xl px-6 py-12 transition-colors duration-300"
          :class="selectedIndex === index ? 'bg-muted' : 'bg-transparent'">
          <div class="mobile-iphone-embla__slide-content">
            <StaticIphone
              :key="`${scenario.id}-${hasStartedPlayback && selectedIndex === index ? 'playing' : 'preview'}`"
              :autoplay="hasStartedPlayback && selectedIndex === index"
              class="mx-auto w-full max-w-9/10"
              :completion-delay="2000"
              :font-size="1.075"
              :loop-delay="0"
              :messages="scenario.messages"
              @playback-complete="handlePlaybackComplete(index)" />

            <div
              class="mobile-iphone-copy-reveal grid transition-[grid-template-rows,opacity] duration-300 ease-out"
              :class="[
                !hasMeasuredSlideHeights || selectedIndex === index
                  ? 'grid-rows-[1fr]'
                  : 'grid-rows-[0fr]',
                selectedIndex === index ? 'opacity-100' : 'opacity-0',
                isPreparingHeightMeasurement ? 'mobile-iphone-copy-reveal--measuring' : '',
              ]"
              :aria-hidden="selectedIndex === index ? undefined : 'true'"
              data-mobile-scenario-copy>
              <div class="min-h-0 overflow-hidden">
                <div class="mx-auto mt-12 flex w-full flex-col items-center px-10 text-center">
                  <h2 class="mobile-iphone-scenario-title text-lg font-semibold leading-tight tracking-tight text-balance text-foreground">
                    {{ scenario.title }}
                  </h2>
                  <p class="mt-4 text-sm leading-normal tracking-tight text-pretty text-muted-foreground">
                    {{ scenario.description }}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </article>
      </div>
    </div>

    <p class="sr-only" aria-live="polite" aria-atomic="true">
      {{ liveMessage }}
    </p>

    <div
      class="pointer-events-none absolute inset-0 flex h-full w-full items-center justify-between gap-3 px-4 *:pointer-events-auto"
      data-mobile-scenario-controls>
      <button
        type="button"
        class="flex size-11 cursor-pointer items-center justify-center rounded-full bg-foreground/10 text-foreground transition active:scale-95 backdrop-blur-sm"
        aria-label="Previous message scenario"
        @click="scrollPrev">
        <PhCaretLeft class="size-5" weight="bold" aria-hidden="true" />
      </button>

      <button
        type="button"
        class="flex size-11 cursor-pointer items-center justify-center rounded-full bg-foreground/10 text-foreground transition active:scale-95 backdrop-blur-sm"
        aria-label="Next message scenario"
        @click="scrollNext">
        <PhCaretRight class="size-5" weight="bold" aria-hidden="true" />
      </button>
    </div>
  </div>
</template>

<style scoped>
.mobile-iphone-embla__viewport {
  --mobile-iphone-slide-size: min(80%, 24rem);
  --mobile-iphone-slide-gap: 1rem;
  --mobile-iphone-track-bleed: 0.5rem;
}

.mobile-iphone-embla__container {
  display: flex;
  align-items: flex-start;
  margin-inline: calc(var(--mobile-iphone-track-bleed) * -1);
  transition: height 300ms ease-out;
  touch-action: pan-y pinch-zoom;
}

.mobile-iphone-embla__slide {
  flex: 0 0 var(--mobile-iphone-slide-size);
  min-width: 0;
}

.mobile-iphone-embla__slide-content {
  display: flex;
  width: 100%;
  flex-direction: column;
  align-items: center;
}

.mobile-iphone-copy-reveal--measuring {
  transition: none;
}

.mobile-iphone-scenario-title {
  font-synthesis: none;
  font-variation-settings: "wght" 600, "ital" 100;
}

@media (prefers-reduced-motion: reduce) {
  .mobile-iphone-embla__container,
  .mobile-iphone-embla__slide,
  .mobile-iphone-copy-reveal {
    transition-duration: 0ms;
  }
}
</style>
