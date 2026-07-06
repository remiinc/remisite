<script setup>
import SiteLogo from './site-logo.vue'
import Button from './button.vue'

const footerLinks = [
  { label: 'About', href: '#about' },
  { label: 'Features', href: '#features' },
  { label: 'What you get', href: '#what-you-get' },
  { label: 'Pricing', href: '#pricing' },
]

const usecases = [
  { label: 'Meeting follow-ups', href: '#meeting-follow-ups' },
  { label: 'Client status updates', href: '#client-status-updates' },
  { label: 'Recurring operations', href: '#recurring-operations' },
  { label: 'Finding business context', href: '#finding-business-context' },
  { label: 'Support ticket triage', href: '#support-ticket-triage' },
  { label: 'Proposal prep', href: '#proposal-prep' },
]

const integrations = [
  { label: 'Remi in iMessage', href: '#gmail' },
  { label: 'Remi in Slack', href: '#slack' },
  { label: 'Remi in Salesforce', href: '#salesforce' },
  { label: 'Remi in HubSpot', href: '#hubspot' },
  { label: 'Remi in Zoom', href: '#zoom' },
  { label: 'Remi in Stripe', href: '#stripe' },
  { label: 'Remi in Shopify', href: '#shopify' },
]
</script>

<template>
  <footer class="bg-background text-foreground px-6 pt-10 pb-20" data-global-footer>
    <div class="mx-auto max-w-(--content-width) grid grid-cols-6 gap-x-10 gap-y-16">
      <div class="col-span-full lg:col-span-3 flex flex-col items-start gap-12 justify-between">
        <div class="flex flex-col items-start gap-4 max-w-md text-balance">
        <SiteLogo />
        <h3 class="text-2xl font-medium text-foreground my-2">AI tools answer questions. Operations need follow-through.</h3>
        <Button>Book a Demo</Button>
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
        <span class="text-base font-medium text-foreground mb-4">Usecases</span>
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
          <span class="size-2 rounded-full bg-emerald-500" aria-hidden="true" />
          <span>Operational</span>
        </div>

        <p>&copy; {{ new Date().getFullYear() }} Remi. All rights reserved.</p>
      </div>
    </div>

  </footer>
</template>
