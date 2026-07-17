<script setup>
import SiteLogo from './site-logo.vue'
import Button from './button.vue'

const footerLinks = [
  { label: 'About', href: '#about' },
  { label: 'Features', href: '#features' },
  { label: 'What you get', href: '#what-you-get' },
  { label: 'Solutions', href: '/solutions' },
  { label: 'Pricing', href: '/pricing' },
  { label: 'Security', href: '/security' },
]

const constructionSolutions = [
  { label: 'All solutions', href: '/solutions' },
  { label: 'General Contractors', href: '/solutions/general-contractors' },
  { label: 'Home Remodeling', href: '/solutions/home-remodeling' },
  { label: 'Landscaping Services', href: '/solutions/landscaping-services' },
  { label: 'Roofing Services', href: '/solutions/roofing-services' },
]

const serviceSolutions = [
  { label: 'HVAC Services', href: '/solutions/hvac-services' },
  { label: 'Plumbing Services', href: '/solutions/plumbing-services' },
  { label: 'Electrical Services', href: '/solutions/electrical-services' },
  { label: 'Cleaning Services', href: '/solutions/cleaning-services' },
  { label: 'Auto Repair', href: '/solutions/auto-repair' },
  { label: 'Marketing Agencies', href: '/solutions/marketing-agencies' },
]
</script>

<template>
  <footer class="bg-background text-foreground px-6 py-10 flex flex-col gap-16" data-global-footer>
    <div class="w-full mx-auto max-w-(--content-width) grid md:grid-cols-[1fr_3fr] gap-x-10 gap-y-16">

      <div class="w-full flex flex-col items-start justify-between gap-6 md:gap-12 max-w-md text-balance">
        <h3 class="text-3xl md:text-2xl font-[450] leading-[1.125em] tracking-tight text-foreground">Your business shouldn't run you. It should run itself.
        </h3>
        <Button href="/start" data-marketing-cta="footer_text_remi"
          data-marketing-destination="linq">Text Remi</Button>
      </div>

      <div class="grid grid-cols-2 md:grid-cols-3 w-full md:max-w-3xl md:justify-self-end gap-x-12 gap-y-12">
        <nav class="flex flex-col items-start gap-1"
          aria-label="Footer navigation">
          <span class="text-base font-medium text-foreground mb-4">Company</span>
          <a v-for="link in footerLinks" :key="link.href" :href="link.href"
            class="text-sm font-normal text-foreground/60 hover:text-foreground transition-colors">
            {{ link.label }}
          </a>
        </nav>
        <nav class="md:col-span-2 flex flex-col items-start gap-1"
          aria-label="Footer navigation">
          <span class="text-base font-medium text-foreground mb-4">Solutions</span>
          <div class="w-full grid md:grid-cols-2 gap-x-12 gap-y-1">
          <a v-for="link in constructionSolutions" :key="link.href" :href="link.href"
            class="text-sm font-normal text-foreground/60 transition-colors hover:text-foreground">
            {{ link.label }}
          </a>
          <a v-for="link in serviceSolutions" :key="link.href" :href="link.href"
            class="text-sm font-normal text-foreground/60 transition-colors hover:text-foreground">
            {{ link.label }}
          </a>
        </div>
        </nav>
      </div>

    </div>

    <div class="w-full mx-auto max-w-(--content-width)">
      <svg class="w-full h-full col-span-full" viewBox="0 0 370 90" fill="none" xmlns="http://www.w3.org/2000/svg"
        alt="Remi">
        <path d="M73 32H36V88H2V32C2 15.4315 15.4315 2 32 2H73V32Z" fill="currentColor" />
        <path
          d="M152 2C168.569 2 182 15.4315 182 32V50H146V32H116V58H182V88H110C93.6904 88 80.4205 74.9851 80.0098 58.7744L80 58V32C80 15.4315 93.4315 2 110 2H152Z"
          fill="currentColor" />
        <path d="M292 2C308.569 2 322 15.4315 322 32V88H288V32H275V88H241V32H228V88H194V2H292Z" fill="currentColor" />
        <path d="M368 88H334V2H368V88Z" fill="currentColor" />
      </svg>
    </div>

    <div
      class="w-full mx-auto max-w-(--content-width) grid gap-4 text-sm text-muted-foreground sm:grid-cols-3 sm:items-center">
      <div class="flex items-center gap-2">
        <span class="relative flex size-2" aria-hidden="true">
          <span class="absolute inline-flex size-full animate-ping rounded-full bg-emerald-400 opacity-75" />
          <span class="relative inline-flex size-2 rounded-full bg-emerald-500" />
        </span>
        <span>All Systems Healthy</span>
      </div>

      <p class="sm:text-center">Made with love in the USA 🇺🇸</p>

      <p class="sm:text-right">&copy; {{ new Date().getFullYear() }} Remi. All rights reserved.</p>
    </div>
  </footer>
</template>
