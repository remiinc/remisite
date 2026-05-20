<script setup>
const footerLinks = [
  { label: 'About', href: '#about' },
  { label: 'Features', href: '#features' },
  { label: 'What you get', href: '#what-you-get' },
  { label: 'Pricing', href: '#pricing' },
]
</script>

<template>
  <footer class="border-t border-border bg-background text-foreground" data-global-footer>
    <div class="mx-auto flex max-w-[1400px] flex-col gap-10 px-6 py-10">
      <nav class="flex flex-wrap items-center gap-x-6 gap-y-3" aria-label="Footer navigation">
        <a
          v-for="link in footerLinks"
          :key="link.href"
          :href="link.href"
          class="text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
        >
          {{ link.label }}
        </a>
      </nav>

      <div class="flex flex-col gap-4 border-t border-border pt-6 text-sm text-muted-foreground sm:flex-row sm:items-center sm:justify-between">
        <div class="flex items-center gap-2">
          <span class="size-2 rounded-full bg-emerald-500" aria-hidden="true" />
          <span>Operational</span>
        </div>

        <p>&copy; {{ new Date().getFullYear() }} Remi. All rights reserved.</p>
      </div>
    </div>
  </footer>
</template>
