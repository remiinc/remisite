<script setup>
import { computed, nextTick, onMounted, ref, watch } from 'vue'
import useEmblaCarousel from 'embla-carousel-vue'
import Fade from 'embla-carousel-fade'
import IMessageIcon from '../global/icons/imessage-icon.vue'
import SlackIcon from '../global/icons/slack-icon.vue'
import SiteLogo from '../global/site-logo.vue'
import { cn } from '../../lib/cn'

const defaultGradients = [
  'bg-gradient-to-b from-[#9491e2] to-[#aff2d8]',
  'bg-gradient-to-b from-[#1c3e35] to-[#99f2d1]',
  'bg-gradient-to-b from-[#8399a2] to-[#eef2f3]',
]

const props = defineProps({
  headline: {
    type: String,
    default: 'Wherever you are,<br />Remi is too.',
  },
  tabs: {
    type: Array,
    default: () => [
      {
        id: 'slack',
        icon: 'slack',
        label: 'Slack',
        description: 'Keep members, creators, and internal teams moving without leaving the conversation.',
      },
      {
        id: 'imessage',
        icon: 'imessage',
        label: 'iMessage',
        description: 'Let high-touch conversations stay personal while Remi remembers the details.',
      },
      {
        id: 'web',
        icon: 'web',
        label: 'Web',
        description: 'Give every member a home base for courses, events, discussions, and support.',
      },
    ],
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
      icon: tab.icon || id,
      label,
      description: tab.description || '',
      slot: tab.slot || id,
      gradientClass: tab.gradientClass || defaultGradients[index % defaultGradients.length],
    }
  }),
)

const headlineParts = computed(() =>
  props.headline
    .split(/<br\s*\/?>/i)
    .map((part) => part.trim())
    .filter(Boolean),
)

const emblaOptions = computed(() => ({
  align: 'start',
  containScroll: false,
  loop: normalizedTabs.value.length > 1,
}))

const [emblaRef, emblaApi] = useEmblaCarousel(emblaOptions, [Fade()])
const selectedIndex = ref(0)

const syncSlideVideos = async () => {
  await nextTick()

  const slides = emblaRef.value?.querySelectorAll('[data-canvas-slider-slide]')
  if (!slides) return

  slides.forEach((slide, index) => {
    slide.querySelectorAll('video').forEach((video) => {
      if (index !== selectedIndex.value) {
        video.pause()
        return
      }

      if (!video.autoplay || !video.paused) return

      video.play().catch(() => {})
    })
  })
}

watch(
  emblaApi,
  (api) => {
    if (!api) return

    const updateSelected = () => {
      selectedIndex.value = api.selectedScrollSnap()
      syncSlideVideos()
    }

    updateSelected()
    api.on('select', updateSelected)
    api.on('reInit', updateSelected)
  },
  { immediate: true },
)

watch(selectedIndex, syncSlideVideos, { flush: 'post' })

onMounted(syncSlideVideos)

const scrollTo = (index) => {
  emblaApi.value?.scrollTo(index)
}

const getTabClass = (index) =>
  cn(
    'cursor-pointer flex-1 w-full flex flex-col items-start justify-between text-left p-6 rounded-2xl bg-foreground/5 text-foreground transition-opacity',
    selectedIndex.value === index ? 'opacity-100' : 'opacity-50 hover:opacity-100',
  )

const getFrameClass = (gradientClass) =>
  cn('relative flex min-h-160 items-center justify-center', gradientClass)

const tabIcons = {
  slack: SlackIcon,
  imessage: IMessageIcon,
  web: SiteLogo,
}

const getTabIcon = (icon) => tabIcons[icon]
</script>

<template>
  <section class="mx-auto max-w-[1400px] px-6 py-24 flex flex-col gap-12" data-canvas-slider>
    <div class="space-y-4">
      <h2 class="max-w-xl text-4xl font-normal tracking-tight text-balance text-foreground">
        <template v-for="(part, index) in headlineParts" :key="`${part}-${index}`">
          <br v-if="index > 0">
          {{ part }}
        </template>
      </h2>
    </div>
    <div class="grid gap-2 lg:grid-cols-[0.36fr_0.64fr] lg:items-stretch">
      <aside class="flex flex-col gap-2">

        <div class="w-full h-full flex flex-col gap-2" role="tablist" aria-label="Canvas slider tabs">
          <button v-for="(tab, index) in normalizedTabs" :id="`canvas-slider-tab-${tab.id}`" :key="tab.id" type="button"
            role="tab" data-canvas-slider-tab :class="getTabClass(index)" :aria-selected="selectedIndex === index"
            :aria-controls="`canvas-slider-panel-${tab.id}`" @click="scrollTo(index)">
            <component
              :is="getTabIcon(tab.icon)"
              v-if="getTabIcon(tab.icon)"
              class="size-6 shrink-0"
              data-canvas-slider-tab-icon
            />
            <span>
              <span class="block text-base font-medium tracking-tight">
                {{ tab.label }}
              </span>
              <span v-if="tab.description" class="mt-2 block max-w-sm text- leading-normal line-clamp-2 text-foreground/50">
                {{ tab.description }}
              </span>
            </span>
          </button>
        </div>
      </aside>

      <div ref="emblaRef" class="overflow-hidden rounded-2xl bg-card">
        <div class="flex h-full">
          <div v-for="(tab, index) in normalizedTabs" :id="`canvas-slider-panel-${tab.id}`" :key="tab.id"
            role="tabpanel" data-canvas-slider-slide class="min-w-0 flex-[0_0_100%]"
            :aria-labelledby="`canvas-slider-tab-${tab.id}`">
            <div :class="getFrameClass(tab.gradientClass)" data-canvas-slider-frame>
              <slot :name="tab.slot" :tab="tab" :index="index">
                <slot :tab="tab" :index="index" />
              </slot>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>
