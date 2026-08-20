<script setup>
import SectionCta from '../sections/section-cta.vue'

const footerLinks = [
  { label: 'Home', href: '/' },
  { label: 'About', href: '/about' },
  { label: 'Pricing', href: '/pricing' },
  { label: 'Security', href: '/security' },
  { label: 'Resources', href: '/resources' },
  { label: "What's New", href: '/whats-new' },
]

const solutionLinks = [
  { label: 'All solutions', href: '/solutions' },
  { label: 'General Contractors', href: '/solutions/general-contractors' },
  { label: 'Home Remodeling', href: '/solutions/home-remodeling' },
  { label: 'Landscaping Services', href: '/solutions/landscaping-services' },
  { label: 'Roofing Services', href: '/solutions/roofing-services' },
  { label: 'HVAC Services', href: '/solutions/hvac-services' },
  { label: 'Plumbing Services', href: '/solutions/plumbing-services' },
  { label: 'Electrical Services', href: '/solutions/electrical-services' },
  { label: 'Cleaning Services', href: '/solutions/cleaning-services' },
  { label: 'Auto Repair', href: '/solutions/auto-repair' },
  { label: 'Marketing Agencies', href: '/solutions/marketing-agencies' },
]

const capabilityLinks = [
  { label: 'Catch Every Loose End', href: '/solutions/catch-every-loose-end' },
  { label: 'Send Quotes Faster', href: '/solutions/send-quotes-faster' },
  { label: 'Stop Missing Follow-Ups', href: '/solutions/stop-missing-follow-ups' },
  { label: 'Keep Jobs Moving', href: '/solutions/keep-jobs-moving' },
  { label: 'Get Paid on Time', href: '/solutions/get-paid-on-time' },
  { label: 'Capture Every Approval', href: '/solutions/capture-every-approval' },
  { label: 'End Paperwork Chaos', href: '/solutions/end-paperwork-chaos' },
]
</script>

<template>
  <footer class="bg-foreground text-background" data-global-footer>
    <SectionCta embedded />

    <div class="flex flex-col gap-16 px-6 pb-10 pt-16">
      <div
        class="mx-auto grid w-full max-w-(--content-width) grid-cols-2 gap-x-8 gap-y-12 md:grid-cols-4 md:gap-x-12">
        <nav class="col-span-2 flex flex-col items-start gap-1 border-l border-background/5 pl-6 md:col-span-1 md:pl-8"
          aria-label="Company links">
          <span class="text-base font-medium text-current mb-4">Company</span>
          <a v-for="link in footerLinks" :key="link.href" :href="link.href"
            class="text-sm font-normal text-current/60 hover:text-current transition-colors">
            {{ link.label }}
          </a>
        </nav>
        <nav class="flex flex-col items-start border-l border-background/5 pl-6 md:col-span-2 md:pl-8"
          aria-label="Solution links">
          <span class="text-base font-medium text-current mb-4">Solutions</span>
          <div class="grid w-full gap-x-12 gap-y-1 md:grid-flow-col md:grid-rows-6">
            <a v-for="link in solutionLinks" :key="link.href" :href="link.href"
              class="text-sm font-normal text-current/60 transition-colors hover:text-current">
              {{ link.label }}
            </a>
          </div>
        </nav>
        <nav class="flex flex-col items-start gap-1 border-l border-background/5 pl-6 md:pl-8"
          aria-label="Capability links">
          <span class="text-base font-medium text-current mb-4">Capabilities</span>
          <a v-for="link in capabilityLinks" :key="link.href" :href="link.href"
            class="text-sm font-normal text-current/60 transition-colors hover:text-current">
            {{ link.label }}
          </a>
        </nav>
      </div>

      <div class="w-full mx-auto max-w-(--content-width)">
        <svg class="w-full h-full col-span-full text-current/10" viewBox="0 0 370 90" fill="none" xmlns="http://www.w3.org/2000/svg"
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
        class="w-full mx-auto max-w-(--content-width) grid gap-4 text-sm text-current sm:grid-cols-3 sm:items-center">
        <nav class="flex items-center gap-4" aria-label="Legal">
          <a href="/terms" class="transition-colors text-current/50 hover:text-current/80">Terms</a>
          <a href="/privacy" class="transition-colors text-current/50 hover:text-current/80">Privacy</a>
        </nav>

        <p class="sm:text-center text-current/50">Made with love in the USA 🇺🇸</p>

        <p class="sm:text-right text-current/50">&copy; {{ new Date().getFullYear() }} Remi. All rights reserved.</p>
      </div>
    </div>
  </footer>
</template>
