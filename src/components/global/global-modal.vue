<script setup>
import { PhX } from '@phosphor-icons/vue'
import { computed, nextTick, onBeforeUnmount, ref, watch } from 'vue'
import { cn } from '../../lib/cn'

const props = defineProps({
  modelValue: {
    type: Boolean,
    default: false,
  },
  label: {
    type: String,
    default: 'Dialog',
  },
  size: {
    type: String,
    default: 'default',
    validator: (value) => ['default', 'large'].includes(value),
  },
})

const emit = defineEmits(['update:modelValue'])

const shouldRender = ref(false)
const isOpen = ref(false)
const isClosing = ref(false)
let closeTimer
let openFrame

const closeDuration = 150

const clearOpenFrame = () => {
  if (!openFrame) return
  window.cancelAnimationFrame(openFrame)
  openFrame = undefined
}

const clearCloseTimer = () => {
  if (!closeTimer) return
  window.clearTimeout(closeTimer)
  closeTimer = undefined
}

const close = () => {
  emit('update:modelValue', false)
}

const startOpen = () => {
  clearCloseTimer()
  clearOpenFrame()
  shouldRender.value = true
  isClosing.value = false
  isOpen.value = false

  nextTick(() => {
    if (!props.modelValue || !shouldRender.value) return

    openFrame = window.requestAnimationFrame(() => {
      isOpen.value = true
      openFrame = undefined
    })
  })
}

const startClose = () => {
  clearCloseTimer()
  clearOpenFrame()
  isOpen.value = false
  isClosing.value = true

  closeTimer = window.setTimeout(() => {
    shouldRender.value = false
    isClosing.value = false
    isOpen.value = false
    closeTimer = undefined
  }, closeDuration)
}

watch(
  () => props.modelValue,
  (isOpen) => {
    if (isOpen) {
      startOpen()
      return
    }

    if (shouldRender.value) {
      startClose()
    }
  },
  { immediate: true },
)

const onKeydown = (event) => {
  if (event.key === 'Escape' && props.modelValue) {
    close()
  }
}

watch(
  () => props.modelValue,
  (isOpen) => {
    if (isOpen) {
      document.addEventListener('keydown', onKeydown)
    } else {
      document.removeEventListener('keydown', onKeydown)
    }
  },
  { immediate: true },
)

onBeforeUnmount(() => {
  clearOpenFrame()
  clearCloseTimer()
  document.removeEventListener('keydown', onKeydown)
})

const modalClass = computed(() =>
  cn(
    't-modal relative min-h-64 max-h-[90vh] w-full overflow-y-auto bg-background shadow-none',
    props.size === 'large' ? 'max-w-6xl p-10 rounded-4xl' : 'max-w-lg p-8 rounded-2xl',
    'focus:outline-none',
    isOpen.value && !isClosing.value && 'is-open',
    isClosing.value && 'is-closing',
  ),
)

const overlayClass = computed(() =>
  cn(
    'fixed inset-0 z-[100] flex items-center justify-center bg-foreground/10 p-4',
    'transition-opacity duration-150',
    isOpen.value && !isClosing.value ? 'opacity-100' : 'opacity-0',
  ),
)
</script>

<template>
  <Teleport to="body">
    <div
      v-if="shouldRender"
      :class="overlayClass"
      data-global-modal-overlay
      @click.self="close"
    >
      <div
        :class="modalClass"
        role="dialog"
        aria-modal="true"
        :aria-label="label"
        data-global-modal
      >
        <button
          type="button"
          class="absolute right-4 top-4 inline-flex size-10 items-center justify-center rounded-full text-foreground/50 transition-colors hover:bg-foreground/5 hover:text-foreground focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring"
          aria-label="Close modal"
          @click="close"
        >
          <PhX :size="18" weight="bold" aria-hidden="true" />
        </button>
        <slot />
      </div>
    </div>
  </Teleport>
</template>

<style scoped>
:global(:root) {
  --modal-open-dur: 250ms;
  --modal-close-dur: 150ms;
  --modal-scale: 0.96;
  --modal-scale-close: 0.96;
  --modal-ease: cubic-bezier(0.22, 1, 0.36, 1);
}

.t-modal {
  transform-origin: center;
  transform: scale(var(--modal-scale));
  opacity: 0;
  pointer-events: none;
  transition:
    transform var(--modal-open-dur) var(--modal-ease),
    opacity var(--modal-open-dur) var(--modal-ease);
  will-change: transform, opacity;
}

.t-modal.is-open {
  transform: scale(1);
  opacity: 1;
  pointer-events: auto;
}

.t-modal.is-closing {
  transform: scale(var(--modal-scale-close));
  opacity: 0;
  pointer-events: none;
  transition:
    transform var(--modal-close-dur) var(--modal-ease),
    opacity var(--modal-close-dur) var(--modal-ease);
}

@media (prefers-reduced-motion: reduce) {
  .t-modal {
    transition: none !important;
  }
}
</style>
