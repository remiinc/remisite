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

const usecases = [
  { label: 'Send quotes from the truck', href: '/#features' },
  { label: 'Chase late payments', href: '/blog/follow-up-unpaid-invoice-without-losing-client' },
  { label: 'Nudge a late invoice', href: '/blog/late-payment-reminder-templates' },
  { label: "Snap a receipt, it's filed", href: '/#features' },
  { label: 'Track client agreements', href: '/blog/keep-change-orders-in-writing' },
  { label: 'Answer the lead first', href: '/blog/respond-first-win-the-job' },
]

const integrations = [
  { label: 'Remi + iMessage', href: '/#features' },
  { label: 'Remi + Gmail', href: '/#features' },
  { label: 'Remi + QuickBooks', href: '/blog/quickbooks-online-automatic-invoice-reminders' },
  { label: 'Remi + Jobber', href: '/blog/jobber-estimate-invoice-follow-ups' },
  { label: 'Remi + Housecall Pro', href: '/blog/housecall-pro-payment-reminders' },
  { label: 'Remi + Google Calendar', href: '/#features' },
]
</script>

<template>
  <footer class="bg-background text-foreground px-6 pt-10 pb-20" data-global-footer>
    <div class="mx-auto max-w-(--content-width) grid grid-cols-6 gap-x-10 gap-y-16">
      <div class="col-span-full lg:col-span-3 flex flex-col items-start gap-12 justify-between">
        <div class="flex flex-col items-start gap-4 max-w-md text-balance">
        <SiteLogo class="w-24" />
        <h3 class="text-2xl font-medium text-foreground my-2">Your business shouldn't run you. It should run itself.</h3>
        <Button href="/qualify">Book a Demo</Button>
      </div>
      <span class="text-sm font-normal text-foreground/60 inline-flex items-center gap-1.5">🇺🇸 Made with love in the USA</span>
      </div>
      <nav class="flex flex-col items-start gap-1 col-span-full xs:col-span-2 lg:col-span-1" aria-label="Footer navigation">
        <span class="text-base font-medium text-foreground mb-4">Company</span>
        <a v-for="link in footerLinks" :key="link.href" :href="link.href"
          class="text-sm font-normal text-foreground/60 hover:text-foreground transition-colors">
          {{ link.label }}
        </a>
      </nav>
      <nav class="flex flex-col items-start gap-1 col-span-full xs:col-span-2 lg:col-span-1" aria-label="Footer navigation">
        <span class="text-base font-medium text-foreground mb-4">Use cases</span>
        <a v-for="link in usecases" :key="link.href" :href="link.href"
          class="text-sm font-normal text-foreground/60 transition-colors hover:text-foreground">
          {{ link.label }}
        </a>
      </nav>
      <nav class="flex flex-col items-start gap-1 col-span-full xs:col-span-2 lg:col-span-1" aria-label="Footer navigation">
        <span class="text-base font-medium text-foreground mb-4">Integrations</span>
        <a v-for="link in integrations" :key="link.href" :href="link.href"
          class="text-sm font-normal text-foreground/60 transition-colors hover:text-foreground">
          {{ link.label }}
        </a>
      </nav>
      <div
        class="col-span-full flex flex-col gap-4 pt-6 text-sm text-muted-foreground sm:flex-row sm:items-center sm:justify-between">
        <div class="flex items-center gap-2">
          <span class="relative flex size-2" aria-hidden="true">
            <span class="absolute inline-flex size-full animate-ping rounded-full bg-emerald-400 opacity-75" />
            <span class="relative inline-flex size-2 rounded-full bg-emerald-500" />
          </span>
          <span>All Systems Healthy</span>
        </div>

        <p>&copy; {{ new Date().getFullYear() }} Remi. All rights reserved.</p>
      </div>
    </div>

  </footer>
</template>
