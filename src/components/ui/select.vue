<script setup>
import { PhCaretDown, PhCheck } from '@phosphor-icons/vue'
import { computed, nextTick, onBeforeUnmount, onMounted, ref } from 'vue'

const props = defineProps({
  id: {
    type: String,
    required: true,
  },
  modelValue: {
    type: String,
    default: '',
  },
  name: {
    type: String,
    default: '',
  },
  options: {
    type: Array,
    default: () => [],
  },
  placeholder: {
    type: String,
    default: 'Select an option',
  },
  required: {
    type: Boolean,
    default: false,
  },
})

const emit = defineEmits(['update:modelValue'])

const root = ref(null)
const trigger = ref(null)
const listbox = ref(null)
const isFocused = ref(false)
const isOpen = ref(false)
const menuPlacement = ref('bottom')
const menuStyle = ref({})

const menuGap = 8
const menuMaxHeight = 224
const viewportPadding = 8

const listboxId = computed(() => `${props.id}-listbox`)
const selectedOption = computed(() => props.options.find((option) => option.value === props.modelValue))

const updateMenuPosition = () => {
  const triggerRect = trigger.value?.getBoundingClientRect()

  if (!triggerRect) return

  const spaceAbove = Math.max(0, triggerRect.top - viewportPadding - menuGap)
  const spaceBelow = Math.max(0, window.innerHeight - triggerRect.bottom - viewportPadding - menuGap)
  const estimatedHeight = Math.min(menuMaxHeight, props.options.length * 36 + 8)
  const shouldOpenTop = spaceBelow < estimatedHeight && spaceAbove > spaceBelow
  const availableSpace = shouldOpenTop ? spaceAbove : spaceBelow
  const maxHeight = Math.min(menuMaxHeight, Math.max(96, availableSpace))
  const listboxHeight = listbox.value?.getBoundingClientRect().height || Math.min(estimatedHeight, maxHeight)
  const top = shouldOpenTop
    ? Math.max(viewportPadding, triggerRect.top - menuGap - listboxHeight)
    : triggerRect.bottom + menuGap
  const maxLeft = Math.max(viewportPadding, window.innerWidth - viewportPadding - triggerRect.width)
  const left = Math.min(Math.max(viewportPadding, triggerRect.left), maxLeft)

  menuPlacement.value = shouldOpenTop ? 'top' : 'bottom'
  menuStyle.value = {
    left: `${left}px`,
    top: `${top}px`,
    width: `${triggerRect.width}px`,
    maxHeight: `${maxHeight}px`,
  }
}

const openMenu = () => {
  isOpen.value = true
  isFocused.value = true

  nextTick(() => {
    updateMenuPosition()
    window.requestAnimationFrame(updateMenuPosition)
  })
}

const closeMenu = () => {
  isOpen.value = false
}

const closeAndBlur = () => {
  closeMenu()
  isFocused.value = false
}

const toggleMenu = () => {
  if (isOpen.value) {
    closeMenu()
    return
  }

  openMenu()
}

const selectOption = (option) => {
  emit('update:modelValue', option.value)
  closeMenu()

  nextTick(() => {
    trigger.value?.focus()
  })
}

const onDocumentPointerDown = (event) => {
  const isInsideTrigger = root.value?.contains(event.target)
  const isInsideMenu = listbox.value?.contains(event.target)

  if (!isInsideTrigger && !isInsideMenu) {
    closeAndBlur()
  }
}

const onViewportChange = () => {
  if (isOpen.value) {
    updateMenuPosition()
  }
}

onMounted(() => {
  document.addEventListener('pointerdown', onDocumentPointerDown)
  window.addEventListener('resize', onViewportChange)
  window.addEventListener('scroll', onViewportChange, true)
})

onBeforeUnmount(() => {
  document.removeEventListener('pointerdown', onDocumentPointerDown)
  window.removeEventListener('resize', onViewportChange)
  window.removeEventListener('scroll', onViewportChange, true)
})
</script>

<template>
  <div ref="root" class="relative">
    <input
      type="hidden"
      :name="name || undefined"
      :value="modelValue"
    >
    <button
      :id="id"
      ref="trigger"
      type="button"
      data-slot="select-trigger"
      role="combobox"
      aria-haspopup="listbox"
      :aria-controls="listboxId"
      :aria-expanded="isOpen"
      :aria-required="required"
      :data-placeholder="selectedOption ? undefined : 'true'"
      :data-focused="isFocused ? 'true' : undefined"
      class="flex h-9 w-full items-center justify-between gap-2 rounded-full bg-transparent px-3 py-2 text-sm shadow-[inset_0_0_0_1px_color-mix(in_oklch,var(--color-foreground)_10%,transparent),0_0_0_0_color-mix(in_oklch,var(--color-foreground)_0%,transparent)] transition-[box-shadow,color] disabled:cursor-not-allowed disabled:opacity-50"
      @pointerdown="isFocused = true"
      @mousedown="isFocused = true"
      @click="toggleMenu"
      @focus="isFocused = true"
      @focusin="isFocused = true"
      @keydown.down.prevent="openMenu"
      @keydown.enter.prevent="toggleMenu"
      @keydown.space.prevent="toggleMenu"
      @keydown.esc.prevent="closeAndBlur"
    >
      <span
        class="truncate"
        :class="selectedOption ? 'text-foreground' : 'text-muted-foreground'"
      >
        {{ selectedOption?.label || placeholder }}
      </span>
      <PhCaretDown
        class="size-4 shrink-0 text-muted-foreground opacity-50 transition-transform"
        :class="isOpen ? 'rotate-180' : ''"
        weight="bold"
        aria-hidden="true"
      />
    </button>

    <Teleport to="body">
      <div
        v-if="isOpen"
        :id="listboxId"
        ref="listbox"
        role="listbox"
        :data-placement="menuPlacement"
        :style="menuStyle"
        class="fixed z-[120] overflow-y-auto rounded-xl bg-background p-1 shadow-[inset_0_0_0_1px_color-mix(in_oklch,var(--color-foreground)_10%,transparent),0_0_0_3px_color-mix(in_oklch,var(--color-foreground)_4%,transparent)]"
      >
        <button
          v-for="option in options"
          :key="option.value"
          type="button"
          data-slot="select-option"
          role="option"
          :aria-selected="option.value === modelValue"
          class="flex w-full items-center justify-between gap-2 rounded-lg px-3 py-2 text-left text-sm text-foreground transition-colors hover:bg-foreground/5"
          :class="option.value === modelValue ? 'bg-foreground/5' : ''"
          @mousedown.prevent
          @click="selectOption(option)"
        >
          <span class="truncate">{{ option.label }}</span>
          <PhCheck
            v-if="option.value === modelValue"
            class="size-4 shrink-0"
            weight="bold"
            aria-hidden="true"
          />
        </button>
      </div>
    </Teleport>
  </div>
</template>

<style scoped>
button {
  outline: none;
}

button[data-slot='select-trigger']:hover {
  box-shadow:
    inset 0 0 0 1px color-mix(in oklch, var(--color-foreground) 16%, transparent),
    0 0 0 0 color-mix(in oklch, var(--color-foreground) 0%, transparent);
}

button[data-slot='select-trigger'][data-focused='true'] {
  box-shadow:
    inset 0 0 0 1px color-mix(in oklch, var(--color-foreground) 24%, transparent),
    0 0 0 3px color-mix(in oklch, var(--color-foreground) 10%, transparent);
}

button[data-slot='select-option']:focus {
  background: color-mix(in oklch, var(--color-foreground) 5%, transparent);
}
</style>
