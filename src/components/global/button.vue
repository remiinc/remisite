<script setup>
import { cn } from '../../lib/cn'

defineProps({
  href: {
    type: String,
    default: '',
  },
  type: {
    type: String,
    default: 'button',
  },
  variant: {
    type: String,
    default: 'primary',
  },
  size: {
    type: String,
    default: 'default',
  },
})
</script>

<template>
  <component :is="href ? 'a' : 'button'" :href="href || undefined" :type="href ? undefined : type" :class="cn(
    'relative cursor-pointer inline-flex items-center justify-center rounded-full text-sm font-medium transition-colors',
    'focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring',
    'before:content-[\'\'] before:absolute before:inset-0 before:rounded-full before:z-0',
    'hover:before:-inset-0.5 before:transition-all before:duration-200 before:ease-in-out',
      variant === 'primary' && 'before:bg-foreground text-background hover:before:bg-foreground/90',
    variant === 'secondary' && 'before:bg-foreground/5 text-foreground hover:before:bg-foreground/10 before:backdrop-blur-md',
    size === 'default' && 'h-10 px-4',
    size === 'sm' && 'h-8 px-3 text-xs',
  )">
    <span class="relative z-10">
      <slot />
    </span>
  </component>
</template>
