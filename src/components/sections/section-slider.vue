<script setup>
import { computed, onBeforeUnmount, ref, watch } from 'vue'
import useEmblaCarousel from 'embla-carousel-vue'
import Fade from 'embla-carousel-fade'
import { FilmGrain, Shader, Swirl } from 'shaders/vue'
import { cn } from '../../lib/cn'

const defaultSlideShaders = [
  {
    colorA: 'oklch(0.995 0.05 85)',
    colorB: 'oklch(0.925 0.2 100)',
    speed: 1,
    detail: 1.5,
    blend: 30,
  },
  {
    colorA: 'oklch(0.98 0.024 259.597)',
    colorB: 'oklch(0.858 0.07 259.597)',
    speed: 0.5,
    detail: 1.35,
    blend: 50,
  },
  {
    colorA: 'oklch(0.96 0.08 170)',
    colorB: 'oklch(0.9 0.05 215)',
    speed: 0.55,
    detail: 1.45,
    blend: 44,
  },
  {
    colorA: 'oklch(0.97 0.05 292.24)',
    colorB: 'oklch(0.95 0.2 457)',
    speed: 0.5,
    detail: 1.35,
    blend: 50,
  },
]

const props = defineProps({
  headline: {
    type: String,
    default: 'One platform to operate your service business.',
  },
  body: {
    type: String,
    default:
      'Remi is the everything app for email, CRM, project management and AI that organizes itself and gets work done for you.',
  },
  tabs: {
    type: Array,
    default: () => [
      {
        id: 'tasks',
        label: 'Tasks',
        caption: 'Sessions your whole community can always show up for.',
      },
      {
        id: 'integrations',
        label: 'Integrations',
        caption: 'A focused home for lessons, progress, and resources.',
      },
      {
        id: 'files',
        label: 'Files',
        caption: 'Live moments that stay connected to the rest of your work.',
      },
      {
        id: 'intelligence',
        label: 'Intelligence',
        caption: 'A clear view of the people who make your community move.',
      },
    ],
  },
  autoplay: {
    type: Boolean,
    default: true,
  },
  autoplayDelay: {
    type: Number,
    default: 4500,
  },
})

const slugify = (value) =>
  value
    .toString()
    .trim()
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '')

const normalizedTabs = computed(() =>
  props.tabs.map((tab, index) => {
    const label = tab.label || `Tab ${index + 1}`
    const id = tab.id || slugify(label) || `tab-${index + 1}`

    return {
      ...tab,
      id,
      label,
      caption: tab.caption || '',
      slot: tab.slot || id,
      shader: {
        ...defaultSlideShaders[index % defaultSlideShaders.length],
        ...(tab.shader || {}),
      },
    }
  }),
)

const emblaOptions = computed(() => ({
  align: 'start',
  containScroll: false,
  loop: normalizedTabs.value.length > 1,
}))

const [emblaRef, emblaApi] = useEmblaCarousel(emblaOptions, [Fade()])
const selectedIndex = ref(0)
const isTimerRunning = ref(false)
const selectedTab = computed(() => normalizedTabs.value[selectedIndex.value] || normalizedTabs.value[0])
const tabListStyle = computed(() => {
  const count = Math.max(normalizedTabs.value.length, 1)
  const index = Math.min(selectedIndex.value, count - 1)
  const gapRem = 0.5
  const paddingRem = 0.25
  const fixedRem = paddingRem * 2 + (count - 1) * gapRem
  const fallbackWidth = `calc(${100 / count}% - ${fixedRem / count}rem)`
  const fallbackLeftOffset = paddingRem - (fixedRem / count) * index + gapRem * index

  return {
    '--active-section-slider-tab-anchor': `--section-slider-tab-${index}`,
    '--section-slider-fallback-left': `calc(${(100 / count) * index}% + ${fallbackLeftOffset}rem)`,
    '--section-slider-fallback-width': fallbackWidth,
    '--section-slider-autoplay-delay': `${props.autoplayDelay}ms`,
  }
})

const activeTabIndicatorDuration = 300
let autoplayTimeout
let timerDelayTimeout
let timerAnimationFrame

const clearAutoplayTimer = () => {
  if (autoplayTimeout) {
    window.clearTimeout(autoplayTimeout)
    autoplayTimeout = undefined
  }

  if (timerDelayTimeout) {
    window.clearTimeout(timerDelayTimeout)
    timerDelayTimeout = undefined
  }

  if (timerAnimationFrame) {
    window.cancelAnimationFrame(timerAnimationFrame)
    timerAnimationFrame = undefined
  }

  isTimerRunning.value = false
}

const startAutoplayTimer = () => {
  clearAutoplayTimer()

  if (!props.autoplay || normalizedTabs.value.length <= 1) return

  timerDelayTimeout = window.setTimeout(() => {
    timerDelayTimeout = undefined
    timerAnimationFrame = window.requestAnimationFrame(() => {
      timerAnimationFrame = undefined
      isTimerRunning.value = true

      autoplayTimeout = window.setTimeout(() => {
        autoplayTimeout = undefined
        isTimerRunning.value = false
        emblaApi.value?.scrollNext()
      }, props.autoplayDelay)
    })
  }, activeTabIndicatorDuration)
}

watch(
  emblaApi,
  (api, _previousApi, onCleanup) => {
    if (!api) return

    const updateSelectedTab = () => {
      selectedIndex.value = api.selectedScrollSnap()
      clearAutoplayTimer()
    }

    const handleSettle = () => {
      selectedIndex.value = api.selectedScrollSnap()
      startAutoplayTimer()
    }

    const handleReInit = () => {
      selectedIndex.value = api.selectedScrollSnap()
      startAutoplayTimer()
    }

    updateSelectedTab()
    startAutoplayTimer()
    api.on('select', updateSelectedTab)
    api.on('settle', handleSettle)
    api.on('reInit', handleReInit)

    onCleanup(() => {
      api.off('select', updateSelectedTab)
      api.off('settle', handleSettle)
      api.off('reInit', handleReInit)
      clearAutoplayTimer()
    })
  },
  { immediate: true },
)

const scrollTo = (index) => {
  clearAutoplayTimer()

  if (index === selectedIndex.value) {
    startAutoplayTimer()
    return
  }

  emblaApi.value?.scrollTo(index)
}

const scrollPrev = () => {
  clearAutoplayTimer()
  emblaApi.value?.scrollPrev()
}

const scrollNext = () => {
  clearAutoplayTimer()
  emblaApi.value?.scrollNext()
}

onBeforeUnmount(clearAutoplayTimer)

const getTabClass = (index) => {
  const isActive = selectedIndex.value === index

  return cn(
    'relative z-10 flex-1 cursor-pointer rounded-full overflow-hidden px-4 py-3 text-sm font-medium transition-colors',
    '[anchor-name:var(--section-slider-tab-anchor)]',
    isActive ? 'text-background' : 'text-foreground/50 hover:text-foreground',
    isActive &&
      isTimerRunning.value &&
      'before:absolute before:inset-0 before:bg-foreground before:content-[""] before:-translate-x-full before:[animation:section-slider-timer_var(--section-slider-autoplay-delay)_linear_forwards]',
  )
}

const getSlideFrameClass = (gradientClass) =>
  cn(
    'relative flex min-h-160 flex-col items-center justify-center overflow-hidden rounded-4xl bg-card px-8 py-12',
    'text-[0.675em] sm:text-[0.75em] md:text-[0.875em] lg:text-[1em]',
    gradientClass,
  )
</script>

<template>
  <section class="mx-auto max-w-[1400px] px-6 py-24" data-section-slider>
    <div class="grid gap-8 md:grid-cols-2 md:items-start">
      <h2 class="max-w-xl text-4xl font-normal tracking-tight text-balance text-foreground">
        {{ headline }}
      </h2>
      <p class="max-w-[48ch] text-base leading-normal text-muted-foreground md:pt-3">
        {{ body }}
      </p>
    </div>

    <div
      class="relative isolate mt-12 flex justify-center gap-2 rounded-full bg-foreground/5 p-1 after:absolute after:z-0 after:rounded-full after:bg-foreground/80 after:content-[''] after:left-(--section-slider-fallback-left) after:top-1 after:h-[calc(100%-0.5rem)] after:w-(--section-slider-fallback-width) after:transition-[left,top,width,height] after:duration-300 after:ease-out supports-[position-anchor:--section-slider-tab-0]:after:left-[anchor(var(--active-section-slider-tab-anchor)_left)] supports-[position-anchor:--section-slider-tab-0]:after:top-[anchor(var(--active-section-slider-tab-anchor)_top)] supports-[position-anchor:--section-slider-tab-0]:after:h-[anchor-size(var(--active-section-slider-tab-anchor)_height)] supports-[position-anchor:--section-slider-tab-0]:after:w-[anchor-size(var(--active-section-slider-tab-anchor)_width)] supports-[position-anchor:--section-slider-tab-0]:after:[position-anchor:var(--active-section-slider-tab-anchor)]"
      :style="tabListStyle"
    >
      <button
        v-for="(tab, index) in normalizedTabs"
        :key="tab.id"
        type="button"
        data-section-slider-tab
        :class="getTabClass(index)"
        :style="{ '--section-slider-tab-anchor': `--section-slider-tab-${index}` }"
        :aria-selected="selectedIndex === index"
        @click="scrollTo(index)"
      >
        <span class="relative z-10">{{ tab.label }}</span>
      </button>
    </div>

    <div ref="emblaRef" class="mt-12 overflow-hidden">
      <div class="flex">
        <div
          v-for="(tab, index) in normalizedTabs"
          :key="tab.id"
          data-section-slider-slide
          class="min-w-0 flex-[0_0_100%]"
        >
          <div
            :class="getSlideFrameClass(tab.gradientClass)"
            data-section-slider-frame
          >
            <Shader class="absolute inset-0 h-full w-full" disable-telemetry>
              <FilmGrain :strength="0.5" :bias="0.4" :animated="true">
                <Swirl
                  :color-a="tab.shader.colorA"
                  :color-b="tab.shader.colorB"
                  color-space="oklch"
                  :speed="tab.shader.speed"
                  :detail="tab.shader.detail"
                  :blend="tab.shader.blend"
                />
              </FilmGrain>
            </Shader>
            <div class="relative z-10 flex h-full w-full items-center justify-center">
              <slot :name="tab.slot" :tab="tab" :index="index">
                <slot :tab="tab" :index="index">
                  <div class="flex h-full items-center justify-center bg-muted p-8 text-center text-sm font-medium text-muted-foreground">
                    {{ tab.label }}
                  </div>
                </slot>
              </slot>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="mt-6 grid grid-cols-[auto_1fr_auto] items-center gap-4">
      <button
        type="button"
        class="flex size-10 bg-foreground/5 items-center justify-center rounded-full text-lg text-muted-foreground transition-colors hover:bg-foreground/10 hover:text-foreground"
        aria-label="Previous slide"
        @click="scrollPrev"
      >
        <span aria-hidden="true">&larr;</span>
      </button>

      <p class="text-center text-sm font-medium text-muted-foreground">
        {{ selectedTab?.caption || 'Sessions your whole community can always show up for.' }}
      </p>

      <button
        type="button"
        class="flex size-10 bg-foreground/5 items-center justify-center rounded-full text-lg text-muted-foreground transition-colors hover:bg-foreground/10 hover:text-foreground"
        aria-label="Next slide"
        @click="scrollNext"
      >
        <span aria-hidden="true">&rarr;</span>
      </button>
    </div>
  </section>
</template>
