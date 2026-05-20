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
  <header class="sticky top-0 z-50 py-2">
    <nav class="mx-auto flex max-w-7xl items-center p-3 rounded-2xl bg-[color-mix(var(--color-foreground)_5%,var(--color-background)_80%)] backdrop-blur-2xl">
      <div class="flex flex-1 items-center justify-start">
        <div class="flex items-center justify-center aspect-square">
          <HeaderLogo />
        </div>
      </div>

      <div class="hidden items-center gap-2 md:flex">
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
