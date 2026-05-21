<script setup>
import Button from '../global/button.vue'
import HeaderLink from './components/header-link.vue'
import HeaderLogo from './components/header-logo.vue'

const navigationLinks = [
  { label: 'Features', href: '#features' },
  { label: 'Documentation', href: '#documentation' },
  { label: 'Integrations', href: '#integrations' },
  { label: 'Roadmap', href: '#roadmap' },
  { label: 'Pricing', href: '#pricing' },
]

const emit = defineEmits(['book-demo'])
</script>

<template>
  <header class="fixed top-0 z-50 h-18 w-full pointer-events-none *:pointer-events-auto p-3">
    <nav class="relative mx-auto flex gap-4 max-w-[960px] items-center p-3 [&_div]:z-1 [&_div]:relative before:content-[''] before:absolute before:inset-0 before:rounded-full before:shadow-[0_0_0_1px_rgba(0,0,0,0.02),0_3px_4px_-4px_rgba(0,0,0,0.1),0_4px_12px_-6px_rgba(0,0,0,0.02)] after:content-[''] after:absolute after:inset-0 after:bg-background after:backdrop-blur-sm after:rounded-full after:shadow-[0_0_24px_0_rgba(255,255,255,0.5)_inset,0_0_10px_-10px_rgba(255,255,255,1)_inset]">
      <div class="flex items-center justify-start pl-2">
        <div class="flex items-center justify-center aspect-square">
          <HeaderLogo />
        </div>
      </div>

      <div class="hidden items-center gap-0 md:flex">
        <HeaderLink v-for="link in navigationLinks" :key="link.href" :href="link.href">
          {{ link.label }}
        </HeaderLink>
      </div>

      <div class="flex flex-1 items-center justify-end gap-4">
        <HeaderLink href="https://remi.new/login" target="_blank">Login</HeaderLink>
        <Button @click="emit('book-demo')">Book a Demo</Button>
      </div>
    </nav>
  </header>
</template>
