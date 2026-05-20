<script setup>
import { ref } from 'vue'

defineProps({
  modelValue: {
    type: String,
    default: '',
  },
})

defineEmits(['update:modelValue'])

const isFocused = ref(false)
</script>

<template>
  <input
    data-slot="input"
    :value="modelValue"
    :data-focused="isFocused ? 'true' : undefined"
    class="h-9 w-full min-w-0 rounded-full bg-transparent px-3 py-1 text-base shadow-[inset_0_0_0_1px_color-mix(in_oklch,var(--color-foreground)_10%,transparent),0_0_0_0_color-mix(in_oklch,var(--color-foreground)_0%,transparent)] transition-[box-shadow,color] placeholder:text-muted-foreground selection:bg-primary selection:text-primary-foreground disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50 md:text-sm"
    @pointerdown="isFocused = true"
    @mousedown="isFocused = true"
    @click="isFocused = true"
    @focus="isFocused = true"
    @focusin="isFocused = true"
    @blur="isFocused = false"
    @focusout="isFocused = false"
    @input="$emit('update:modelValue', $event.target.value)"
  >
</template>

<style scoped>
input {
  outline: none;
}

input:hover {
  box-shadow:
    inset 0 0 0 1px color-mix(in oklch, var(--color-foreground) 16%, transparent),
    0 0 0 0 color-mix(in oklch, var(--color-foreground) 0%, transparent);
}

input[data-focused='true'] {
  box-shadow:
    inset 0 0 0 1px color-mix(in oklch, var(--color-foreground) 24%, transparent),
    0 0 0 3px color-mix(in oklch, var(--color-foreground) 10%, transparent);
}

input[aria-invalid='true'] {
  box-shadow:
    inset 0 0 0 1px color-mix(in oklch, var(--color-foreground) 40%, transparent),
    0 0 0 3px color-mix(in oklch, var(--color-foreground) 10%, transparent);
}
</style>
