<script setup>
import { PhCheck, PhCircleNotch } from '@phosphor-icons/vue'
import { gsap } from 'gsap'
import { nextTick, onBeforeUnmount, onMounted, ref } from 'vue'

const lines = [
  { text: 'Checking connected work surfaces...' },
  { text: 'Reading invoice and estimate history...' },
  { text: 'Finding customer promises...' },
  { text: 'Reviewing email and text replies...' },
  { text: 'Linking calendar and job dates...' },
  { text: 'Catching quotes that went quiet...' },
  { text: 'Checking who still owes money...' },
  { text: 'Learning when to ask for approval...' },
]

const REVEAL_GAP_SECONDS = 1.7
const MAX_BUFFERED_ITEMS = 12
const PREFILL_COUNT = 5

const listRef = ref(null)
const visibleItems = ref([])
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
}

onMounted(async () => {
  const prefill = Math.min(PREFILL_COUNT, lines.length)
  for (let i = 0; i < prefill; i++) {
    const line = lines[i]
    visibleItems.value.push({ id: i, line })
  }
  sequenceIndex = prefill

  await nextTick()

  const items = listRef.value?.querySelectorAll('[data-line]') ?? []
  items.forEach((item) => {
    gsap.set(item, { gridTemplateRows: '1fr', autoAlpha: 1, filter: 'blur(0em)' })
    item.setAttribute('data-animation', 'finished')
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
    class="relative w-full aspect-square lg:aspect-5/4 rounded-[2em] overflow-hidden bg-muted flex flex-col items-center justify-center text-sm">
    <div class="w-full max-w-3/4 md:max-w-9/10 bg-background rounded-[1em] p-[1em]">
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
              </span>
            </span>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>
