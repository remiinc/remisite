<script setup>
import AutoScroll from 'embla-carousel-auto-scroll'
import useEmblaCarousel from 'embla-carousel-vue'
import { computed, onBeforeUnmount, onMounted, ref } from 'vue'

const metrics = [
  {
    id: 'emails-triaged',
    label: 'Emails triaged',
    value: 2432,
    increment: [2, 7],
    frequency: [800, 240],
  },
  {
    id: 'replies-drafted',
    label: 'Customer replies drafted',
    value: 384,
    increment: [1, 3],
    frequency: [1000, 3000],
  },
  {
    id: 'follow-ups-created',
    label: 'Follow-ups created',
    value: 216,
    increment: [1, 4],
    frequency: [1200, 2000],
  },
  {
    id: 'documents-summarized',
    label: 'Documents summarized',
    value: 528,
    increment: [1, 3],
    frequency: [800, 1000],
  },
  {
    id: 'tasks-created',
    label: 'Tasks created',
    value: 941,
    increment: [2, 5],
    frequency: [1200, 900],
  },
  {
    id: 'calendar-events-checked',
    label: 'Calendar events checked',
    value: 1986,
    increment: [2, 6],
    frequency: [1200, 400],
  },
]

const TICKER_REPEAT_COUNT = 6

const metricValues = ref(metrics.map((metric) => metric.value))
const tickerItems = computed(() =>
  Array.from({ length: TICKER_REPEAT_COUNT }, (_, copyIndex) =>
    metrics.map((metric) => ({ ...metric, copyIndex })),
  ).flat(),
)
const numberFormatter = new Intl.NumberFormat('en-US')

const [emblaRef] = useEmblaCarousel(
  {
    align: 'start',
    containScroll: false,
    dragFree: true,
    loop: true,
    watchDrag: false,
  },
  [
    AutoScroll({
      playOnInit: true,
      speed: 0.7,
      startDelay: 0,
      stopOnFocusIn: false,
      stopOnInteraction: false,
      stopOnMouseEnter: false,
    }),
  ],
)

let metricTimers = []

const getRandomRangeValue = ([minimum, maximum]) =>
  Math.floor(Math.random() * (maximum - minimum + 1)) + minimum

const getMetricValue = (metricId) => {
  const metricIndex = metrics.findIndex((metric) => metric.id === metricId)
  return numberFormatter.format(metricValues.value[metricIndex] || 0)
}

onMounted(() => {
  const incrementMetric = (metricIndex) => {
    const nextValues = [...metricValues.value]
    nextValues[metricIndex] += getRandomRangeValue(metrics[metricIndex].increment)
    metricValues.value = nextValues
    scheduleMetricIncrement(metricIndex)
  }

  const scheduleMetricIncrement = (metricIndex, frequency = metrics[metricIndex].frequency) => {
    const delay = getRandomRangeValue(frequency)

    metricTimers[metricIndex] = window.setTimeout(() => {
      incrementMetric(metricIndex)
    }, delay)
  }

  metrics.forEach((_, metricIndex) => {
    scheduleMetricIncrement(metricIndex, [250, metrics[metricIndex].frequency[0]])
  })
})

onBeforeUnmount(() => {
  metricTimers.forEach((timer) => window.clearTimeout(timer))
  metricTimers = []
})
</script>

<template>
  <div id="remi-metrics" class="w-full" data-section-remi-metrics>
    <div
      class="relative flex w-full cursor-default flex-col items-stretch gap-3 overflow-hidden lg:flex-row lg:items-center lg:gap-0">
      <div class="relative z-10 shrink-0 self-center bg-transparent px-4 lg:self-auto">
        <span
          class="flex items-center gap-2 text-xs font-medium leading-none tracking-tight text-foreground">
          Tracked by Remi today:
        </span>
      </div>

      <div
        class="flex-1 relative isolate min-w-0 w-full overflow-x-clip h-full mask-x-from-[calc(100%-4em)] mask-x-to-100%">
        <div ref="emblaRef" class="overflow-hidden" aria-label="Remi work metrics ticker">
          <ul class="flex items-center">
            <li v-for="metric in tickerItems" :key="`${metric.id}-${metric.copyIndex}`"
              class="flex min-w-0 flex-[0_0_auto] items-center gap-2 px-3 text-xs"
              :aria-hidden="metric.copyIndex > 0 ? 'true' : undefined">
              <span
                class="rounded-full bg-foreground/6 px-2 py-1.5 text-center text-[0.875em] font-medium uppercase leading-none tracking-tight text-foreground tabular-nums transition-colors duration-150">
                {{ getMetricValue(metric.id) }}
              </span>
              <span class="whitespace-nowrap text-xs font-normal tracking-tight leading-none text-foreground/45">
                {{ metric.label }}
              </span>
            </li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>
