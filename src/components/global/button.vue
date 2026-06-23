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
    'relative cursor-pointer inline-flex items-center justify-center rounded-full text-base font-normal tracking-[-0.02em] leading-none transition-colors',
    'focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring',
    'select-none',
    'text-nowrap whitespace-nowrap',
    'before:content-[\'\'] before:absolute before:inset-0 before:rounded-full before:z-0',
    'hover:before:-inset-0.5 before:transition-all before:duration-200 before:ease-in-out',
      variant === 'primary' && 'before:bg-foreground text-background hover:before:bg-foreground/90 before:shadow-[0_2px_4px_-3px_rgba(0,0,0,0.5)]',
      variant === 'white' && 'before:bg-white text-foreground hover:before:bg-white/90 before:shadow-[0_1.5px_3px_-2px_rgba(0,0,0,0.25)]',
    variant === 'secondary' && 'before:bg-foreground/5 text-foreground hover:before:bg-foreground/10 before:backdrop-blur-md',
    size === 'default' && 'h-10 px-4',
    size === 'sm' && 'h-9 px-3 text-sm',
  )">
    <span class="relative z-10">
      <slot />
    </span>
  </component>
</template>
