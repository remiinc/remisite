<script setup>
import { PhCheck, PhCircleNotch } from '@phosphor-icons/vue'
import { gsap } from 'gsap'
import { nextTick, onBeforeUnmount, onMounted, ref } from 'vue'

const lines = [
  {
    text: 'Scanning your connected tools...',
    icons: [
      '/images/app-logos/slack.svg',
      '/images/app-logos/gmail.svg',
      '/images/app-logos/linear.svg',
    ],
    meta: { value: 12, prefix: '+' },
  },
  { text: 'Reading shared documents...', meta: { value: 124, label: 'files' } },
  { text: 'Indexing customer conversations...', meta: { value: 375, label: 'threads' } },
  { text: 'Reviewing email threads...', meta: { value: 1842, label: 'messages' } },
  { text: 'Linking calendar events...', meta: { value: 64, label: 'meetings' } },
  { text: 'Capturing recurring decisions...' },
  { text: 'Mapping internal workflows...' },
  { text: 'Learning how your team works...' },
]

const REVEAL_GAP_SECONDS = 1.7
const MAX_BUFFERED_ITEMS = 12
const PREFILL_COUNT = 5

const listRef = ref(null)
const visibleItems = ref([])
const counters = ref({})
const ready = ref(false)

let sequenceIndex = 0
let scheduleTimer = null
let cancelled = false

function scheduleNext(delaySec = REVEAL_GAP_SECONDS) {
  if (cancelled) return
  scheduleTimer = setTimeout(revealNext, delaySec * 1000)
}

async function revealNext() {
  if (cancelled || !listRef.value) return

  const id = sequenceIndex
  const line = lines[sequenceIndex % lines.length]
  sequenceIndex++

  visibleItems.value.push({ id, line })
  if (line.meta) counters.value[id] = 0

  while (visibleItems.value.length > MAX_BUFFERED_ITEMS) {
    visibleItems.value.shift()
  }

  await nextTick()

  const item = listRef.value?.querySelector(`[data-id="${id}"]`)
  if (!item) {
    scheduleNext()
    return
  }

  listRef.value.querySelectorAll('[data-line]').forEach((el) => {
    const state = el.getAttribute('data-animation') ?? ''
    if (state.startsWith('focused')) {
      el.setAttribute('data-animation', 'finished')
    }
  })

  gsap.set(item, { gridTemplateRows: '0fr', autoAlpha: 0, filter: 'blur(0.25em)' })
  const trailingIcons = item.querySelectorAll('img[data-trailing]')
  const trailingTexts = item.querySelectorAll('span[data-trailing]')
  if (trailingIcons.length) {
    gsap.set(trailingIcons, { autoAlpha: 0, scale: 0.5, filter: 'blur(0.25em)' })
  }
  if (trailingTexts.length) {
    gsap.set(trailingTexts, { autoAlpha: 0, filter: 'blur(0.25em)' })
  }

  item.setAttribute('data-animation', 'focused transitioning')

  const tl = gsap.timeline({
    onComplete: () => {
      item.setAttribute('data-animation', 'focused complete')
      scheduleNext()
    },
  })

  tl.to(item, {
    gridTemplateRows: '1fr',
    autoAlpha: 1,
    filter: 'blur(0em)',
    duration: 0.5,
    ease: 'power2.out',
  })

  const allTrailing = item.querySelectorAll('[data-trailing]')
  if (allTrailing.length) {
    tl.to(
      allTrailing,
      {
        autoAlpha: 1,
        scale: 1,
        filter: 'blur(0em)',
        duration: 0.35,
        ease: 'power2.out',
        stagger: 0.12,
      },
      '<0.2',
    )
  }

  if (line.meta) {
    tl.to(
      counters.value,
      {
        [id]: line.meta.value,
        duration: 0.9,
        ease: 'power2.out',
      },
      '<',
    )
  }
}

onMounted(async () => {
  const prefill = Math.min(PREFILL_COUNT, lines.length)
  for (let i = 0; i < prefill; i++) {
    const line = lines[i]
    visibleItems.value.push({ id: i, line })
    if (line.meta) counters.value[i] = line.meta.value
  }
  sequenceIndex = prefill

  await nextTick()

  const items = listRef.value?.querySelectorAll('[data-line]') ?? []
  items.forEach((item) => {
    gsap.set(item, { gridTemplateRows: '1fr', autoAlpha: 1, filter: 'blur(0em)' })
    item.setAttribute('data-animation', 'finished')

    const trailingIcons = item.querySelectorAll('img[data-trailing]')
    const trailingTexts = item.querySelectorAll('span[data-trailing]')
    if (trailingIcons.length) {
      gsap.set(trailingIcons, { autoAlpha: 1, scale: 1, filter: 'blur(0em)' })
    }
    if (trailingTexts.length) {
      gsap.set(trailingTexts, { autoAlpha: 1, filter: 'blur(0em)' })
    }
  })

  ready.value = true
  revealNext()
})

onBeforeUnmount(() => {
  cancelled = true
  if (scheduleTimer) clearTimeout(scheduleTimer)
  gsap.killTweensOf('*')
})
</script>

<style scoped>
.icon {
  opacity: 0;
  scale: 0.5;
  filter: blur(0.5em);
  transition: opacity 300ms ease, scale 300ms ease, filter 300ms ease;
}

[data-animation~="focused"] .icon-spinner {
  opacity: 1;
  scale: 1;
  filter: blur(0);
}

[data-animation~="focused"] .line-text {
  color: var(--color-foreground);
}

[data-animation="finished"] .icon-check,
[data-animation="transitioning"] .icon-check {
  opacity: 1;
  scale: 1;
  filter: blur(0);
}
</style>

<template>
  <div
    class="relative w-full aspect-6/5 rounded-[2em] overflow-hidden bg-muted flex flex-col items-center justify-center text-sm">
    <div class="w-full max-w-3/4 bg-background rounded-[1em] p-[1em]">
      <div class="w-full overflow-hidden h-[9.75em] flex flex-col justify-end transition-opacity duration-200 mask-t-from-50% mask-t-to-100%" :class="ready ? 'opacity-100' : 'opacity-0'">
        <ul ref="listRef" class="w-full flex flex-col items-stretch justify-end">
          <li v-for="item in visibleItems" :key="item.id" :data-id="item.id" data-line data-animation="idle"
            class="grid grid-cols-1 grid-rows-[0fr]">
            <span class="overflow-hidden">
              <span class="line-text flex items-center gap-[0.5em] py-[0.125em] leading-snug text-muted-foreground/80 transition-colors duration-300">
                <span class="relative inline-flex items-center justify-center w-[1em] h-[1em] shrink-0">
                  <PhCircleNotch class="icon icon-spinner absolute inset-0 w-full h-full animate-spin" />
                  <PhCheck class="icon icon-check absolute inset-0 w-full h-full" />
                </span>
                <span>{{ item.line.text }}</span>
                <span v-if="item.line.icons?.length" class="inline-flex items-center gap-[0.25em]">
                  <img v-for="(icon, j) in item.line.icons" :key="j" :src="icon" data-trailing
                    alt="" class="trailing-icon w-[1em] h-[1em] shrink-0 p-[0.05em]" />
                </span>
                <span v-if="item.line.meta" data-trailing
                  class="text-foreground/40 tabular-nums"
                  :class="item.line.meta.prefix ? 'text-[0.75em]' : 'text-[0.875em]'">
                  {{ (item.line.meta.prefix ?? '') + Math.round(counters[item.id] ?? 0) + (item.line.meta.label ? ' ' + item.line.meta.label : '') }}
                </span>
              </span>
            </span>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>
