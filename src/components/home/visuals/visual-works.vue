<script setup>
import { PhArrowUp } from '@phosphor-icons/vue'
import { gsap } from 'gsap'
import { nextTick, onBeforeUnmount, onMounted, reactive, ref } from 'vue'

const examples = [
  'Schedule a follow-up with the design team for Friday',
  'Summarize the Q3 sales pipeline',
  'Draft a kickoff doc for the new mobile project',
  'Find the latest contract from Acme Corp',
  'Remind me about the planning meeting tomorrow',
  "Pull together the metrics from last week's launch",
  'Send a status update to the leadership channel',
]

const ITEM_H_EM = 3.5
const HOLD_SEC = 1.2
const TYPE_PER_CHAR_SEC = 0.03
const SCROLL_DURATION = 0.6
const PREFILL_COUNT = 2
const MAX_BUFFER = 8

const listRef = ref(null)
const visibleItems = ref([])
const counts = reactive({})
const activeId = ref(null)

let sequenceIndex = 0
let currentYEm = 0
let scheduleTimer = null
let cancelled = false

const targetYForId = (id) => (1 - id) * ITEM_H_EM

const keepEndVisible = (id) => {
  const el = listRef.value?.querySelector(`[data-text-id="${id}"]`)
  if (!el) return
  const parent = el.parentElement
  if (!parent) return
  const overflow = el.scrollWidth - parent.clientWidth
  el.style.transform = overflow > 0 ? `translateX(${-overflow}px)` : 'translateX(0)'
}

async function revealNext() {
  if (cancelled || !listRef.value) return

  const id = sequenceIndex
  const text = examples[sequenceIndex % examples.length]
  sequenceIndex++

  visibleItems.value.push({ id, text })
  counts[id] = 0

  while (visibleItems.value.length > MAX_BUFFER) {
    const removed = visibleItems.value.shift()
    delete counts[removed.id]
  }

  await nextTick()

  activeId.value = id

  const targetY = targetYForId(id)
  if (Math.abs(targetY - currentYEm) > 0.001) {
    await new Promise((resolve) => {
      gsap.to(listRef.value, {
        y: `${targetY}em`,
        duration: SCROLL_DURATION,
        ease: 'power2.inOut',
        onComplete: resolve,
      })
    })
    currentYEm = targetY
  }

  await new Promise((resolve) => {
    gsap.to(counts, {
      [id]: text.length,
      duration: Math.max(0.6, text.length * TYPE_PER_CHAR_SEC),
      ease: 'none',
      onUpdate: () => keepEndVisible(id),
      onComplete: resolve,
    })
  })

  scheduleTimer = setTimeout(revealNext, HOLD_SEC * 1000)
}

onMounted(async () => {
  for (let i = 0; i < PREFILL_COUNT; i++) {
    const id = sequenceIndex
    const text = examples[sequenceIndex % examples.length]
    sequenceIndex++
    visibleItems.value.push({ id, text })
    counts[id] = text.length
  }

  await nextTick()

  currentYEm = targetYForId(PREFILL_COUNT)
  gsap.set(listRef.value, { y: `${currentYEm}em` })

  revealNext()
})

onBeforeUnmount(() => {
  cancelled = true
  if (scheduleTimer) clearTimeout(scheduleTimer)
  if (listRef.value) gsap.killTweensOf(listRef.value)
  gsap.killTweensOf(counts)
})
</script>

<style scoped>
@keyframes cursor-flicker {

  0%,
  50% {
    opacity: 1;
  }

  51%,
  100% {
    opacity: 0;
  }
}

.cursor {
  animation: cursor-flicker 0.9s linear infinite;
}
</style>

<template>
  <div
    class="relative w-full aspect-6/5 rounded-[2em] overflow-hidden bg-muted flex flex-col items-center justify-center text-sm">
    <div class="relative w-full max-w-3/4 h-[10.5em] overflow-hidden px-[0.25em]"
      style="mask-image: linear-gradient(to bottom, transparent, black 25%, black 75%, transparent); -webkit-mask-image: linear-gradient(to bottom, transparent, black 25%, black 75%, transparent);">
      <ul ref="listRef" class="absolute inset-x-[0.25em] top-0">
        <li v-for="item in visibleItems" :key="item.id"
          :style="{ position: 'absolute', top: `${item.id * ITEM_H_EM}em`, left: 0, right: 0 }"
          class="h-[3.5em] flex items-center transition-opacity duration-300"
          :class="item.id === activeId ? 'opacity-100' : 'opacity-40'">
          <div
            class="w-full bg-background rounded-full p-[0.25em] flex items-stretch justify-start shadow-[0_0_0_1px_color-mix(in_oklch,var(--color-foreground)_5%,transparent)]">
            <div class="flex-1 overflow-hidden flex items-stretch justify-start px-[1em]">
              <div class="flex items-center justify-start whitespace-nowrap shrink-0 will-change-transform"
                :data-text-id="item.id">
                <span>{{ item.text.slice(0, Math.round(counts[item.id] ?? 0)) }}</span>
                <span v-if="item.id === activeId"
                  class="cursor inline-block w-[0.1em] h-[1em] bg-blue-500 ml-[0.15em]"></span>
              </div>
            </div>
            <button type="button"
              class="w-[2.5em] h-[2.5em] rounded-full bg-foreground/5 text-foreground/50 flex items-center justify-center shrink-0">
              <PhArrowUp weight="bold" />
            </button>
          </div>
        </li>
      </ul>
    </div>
  </div>
</template>
