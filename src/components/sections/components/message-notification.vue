<script setup>
import { gsap } from 'gsap'
import { computed, nextTick, onBeforeUnmount, onMounted, ref, watch } from 'vue'

const props = defineProps({
  messages: {
    type: Array,
    default: () => [],
  },
  autoplay: {
    type: Boolean,
    default: true,
  },
  loop: {
    type: Boolean,
    default: true,
  },
  enterDuration: {
    type: Number,
    default: 0.6,
  },
  holdDuration: {
    type: Number,
    default: 2.4,
  },
  exitDuration: {
    type: Number,
    default: 0.45,
  },
  loopDelay: {
    type: Number,
    default: 0.8,
  },
  stackOffset: {
    type: Number,
    default: 10,
  },
  maxVisible: {
    type: Number,
    default: 3,
  },
})

const rootRef = ref(null)
const activeMessageIndex = ref(0)
const isInView = ref(true)

let animationContext = null
let timeline = null
let intersectionObserver = null
let reducedMotionQuery = null
let resizeObserver = null
let resizeFrame = null

const normalizePart = (part) => {
  if (typeof part === 'string') {
    return {
      text: part,
      tone: 'default',
    }
  }

  return {
    text: String(part?.text ?? ''),
    tone: ['blue', 'green'].includes(part?.tone) ? part.tone : 'default',
  }
}

const normalizedMessages = computed(() => props.messages
  .map((message, index) => {
    if (typeof message === 'string') {
      const text = message.trim()

      return {
        id: `message-${index}`,
        parts: [{ text, tone: 'default' }],
        text,
      }
    }

    const parts = (Array.isArray(message?.parts)
      ? message.parts
      : [{ text: message?.text, tone: message?.tone }])
      .map(normalizePart)
      .filter((part) => part.text.trim())

    return {
      id: message?.id ?? `message-${index}`,
      parts,
      text: parts.map((part) => part.text).join('').trim(),
    }
  })
  .filter((message) => message.text))

const activeMessage = computed(() => normalizedMessages.value[activeMessageIndex.value]?.text ?? '')

const safeNumber = (value, fallback, minimum = 0) => {
  const parsedValue = Number(value)
  return Number.isFinite(parsedValue) ? Math.max(parsedValue, minimum) : fallback
}

const getCards = () => rootRef.value
  ? [...rootRef.value.querySelectorAll('[data-message-notification-item]')]
  : []

const getStackState = (age, cardHeight, activeCardHeight) => {
  const scale = Math.max(0.88, 1 - (age * 0.035))
  const brightness = Math.max(0.55, 1 - (age * 0.15))
  const heightOffset = (cardHeight - activeCardHeight) / 2
  const scaleOffset = (cardHeight * (1 - scale)) / 2

  return {
    filter: `brightness(${brightness})`,
    scale,
    y: heightOffset - (safeNumber(props.stackOffset, 10) * age) - scaleOffset,
  }
}

const applyStaticState = (cards, cardHeights) => {
  const latestIndex = cards.length - 1
  const visibleCount = Math.max(1, Math.floor(safeNumber(props.maxVisible, 3, 1)))
  const activeCardHeight = cardHeights[latestIndex]

  cards.forEach((card, index) => {
    const age = latestIndex - index
    const isVisible = age < visibleCount
    const stackState = getStackState(
      isVisible ? age : visibleCount,
      cardHeights[index],
      activeCardHeight,
    )

    gsap.set(card, {
      ...stackState,
      autoAlpha: isVisible ? 1 : 0,
      clearProps: 'willChange',
    })
  })

  activeMessageIndex.value = Math.max(0, latestIndex)
}

const syncPlayback = () => {
  if (!timeline) return

  if (props.autoplay && isInView.value && !reducedMotionQuery?.matches) {
    timeline.play()
    return
  }

  timeline.pause()
}

const destroyAnimation = () => {
  timeline?.kill()
  timeline = null
  animationContext?.revert()
  animationContext = null
}

const buildAnimation = async () => {
  await nextTick()
  destroyAnimation()

  const cards = getCards()
  if (!cards.length || !rootRef.value) return

  // Read every height in one batch before GSAP writes any transform styles.
  const cardHeights = cards.map((card) => card.offsetHeight)

  if (reducedMotionQuery?.matches || !props.autoplay) {
    applyStaticState(cards, cardHeights)
    return
  }

  const enterDuration = safeNumber(props.enterDuration, 0.6)
  const holdDuration = safeNumber(props.holdDuration, 2.4)
  const exitDuration = safeNumber(props.exitDuration, 0.45)
  const loopDelay = safeNumber(props.loopDelay, 0.8)
  const visibleCount = Math.max(1, Math.floor(safeNumber(props.maxVisible, 3, 1)))

  animationContext = gsap.context(() => {
    timeline = gsap.timeline({
      paused: true,
      repeat: props.loop ? -1 : 0,
      repeatDelay: props.loop ? loopDelay : 0,
    })

    timeline.set(cards, {
      autoAlpha: 0,
      filter: 'brightness(1)',
      scale: 0.96,
      transformOrigin: '50% 50%',
      willChange: 'transform, opacity, filter',
      y: 20,
    }, 0)

    cards.forEach((card, index) => {
      const startAt = index * (enterDuration + holdDuration)

      timeline.call(() => {
        activeMessageIndex.value = index
      }, null, startAt)

      cards.slice(0, index).forEach((previousCard, previousIndex) => {
        const age = index - previousIndex
        const isVisible = age < visibleCount
        const state = getStackState(
          isVisible ? age : visibleCount,
          cardHeights[previousIndex],
          cardHeights[index],
        )

        timeline.to(previousCard, {
          ...state,
          autoAlpha: isVisible ? 1 : 0,
          duration: enterDuration,
          ease: 'power3.out',
        }, startAt)
      })

      timeline.to(card, {
        autoAlpha: 1,
        duration: enterDuration,
        ease: 'power3.out',
        filter: 'brightness(1)',
        scale: 1,
        y: 0,
      }, startAt)
    })

    if (props.loop) {
      const exitAt = cards.length * (enterDuration + holdDuration)

      timeline.to(cards, {
        autoAlpha: 0,
        duration: exitDuration,
        ease: 'power2.in',
        stagger: 0.04,
        y: -16,
      }, exitAt)

      timeline.set(cards, { clearProps: 'willChange' })
    } else {
      timeline.set(cards, { clearProps: 'willChange' }, timeline.duration())
    }
  }, rootRef.value)

  syncPlayback()
}

const handleReducedMotionChange = () => {
  buildAnimation()
}

const scheduleAnimationBuild = () => {
  if (resizeFrame !== null) return

  resizeFrame = window.requestAnimationFrame(() => {
    resizeFrame = null
    buildAnimation()
  })
}

watch(() => [
  props.messages,
  props.autoplay,
  props.loop,
  props.enterDuration,
  props.holdDuration,
  props.exitDuration,
  props.loopDelay,
  props.stackOffset,
  props.maxVisible,
], buildAnimation, { deep: true })

watch(isInView, syncPlayback)

onMounted(() => {
  reducedMotionQuery = window.matchMedia('(prefers-reduced-motion: reduce)')
  reducedMotionQuery.addEventListener('change', handleReducedMotionChange)

  if ('IntersectionObserver' in window && rootRef.value) {
    intersectionObserver = new IntersectionObserver(([entry]) => {
      isInView.value = entry.isIntersecting
    }, { threshold: 0.1 })

    intersectionObserver.observe(rootRef.value)
  }

  if ('ResizeObserver' in window && rootRef.value) {
    let previousWidth = rootRef.value.offsetWidth
    let previousHeight = rootRef.value.offsetHeight

    resizeObserver = new ResizeObserver(([entry]) => {
      const { width, height } = entry.contentRect
      const sizeChanged = Math.abs(width - previousWidth) > 0.5 || Math.abs(height - previousHeight) > 0.5
      if (!sizeChanged) return

      previousWidth = width
      previousHeight = height
      scheduleAnimationBuild()
    })

    resizeObserver.observe(rootRef.value)
  }

  buildAnimation()
})

onBeforeUnmount(() => {
  intersectionObserver?.disconnect()
  resizeObserver?.disconnect()
  if (resizeFrame !== null) window.cancelAnimationFrame(resizeFrame)
  reducedMotionQuery?.removeEventListener('change', handleReducedMotionChange)
  destroyAnimation()
})
</script>

<template>
  <div v-show="normalizedMessages.length" ref="rootRef" data-slot="message-notification"
    class="pointer-events-none grid w-full max-w-sm" :data-message-count="normalizedMessages.length">
    <p class="sr-only" role="status" aria-live="polite" aria-atomic="true">
      {{ activeMessage }}
    </p>

    <div v-for="(message, index) in normalizedMessages" :key="`${message.id}-${index}`" data-message-notification-item
      class="invisible col-start-1 row-start-1 self-center rounded-[1.25em] bg-foreground/40 backdrop-blur-sm px-[1.25em] py-[1em] text-base leading-snug tracking-[-0.015em] text-pretty text-background shadow-[0_0_0_1px_inset_oklch(0.95_0.01_0/0.05)]"
      :style="{ zIndex: index + 1 }" aria-hidden="true">
      <span class="mb-[0.5em] text-[0.75em] w-full flex justify-between">
        <span class="font-medium text-current">Remi</span>
        <span class="text-current/40">now</span>
      </span>
      <span v-for="(part, partIndex) in message.parts" :key="partIndex" :data-tone="part.tone">
        {{ part.text }}
      </span>
    </div>
  </div>
</template>

<style scoped>
[data-tone='blue'] {
  color: var(--color-blue-400);
}

[data-tone='green'] {
  color: var(--color-green-400);
}
</style>
