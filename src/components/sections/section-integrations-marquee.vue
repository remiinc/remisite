<script setup>
import AutoScroll from 'embla-carousel-auto-scroll'
import useEmblaCarousel from 'embla-carousel-vue'
import TextLink from '../global/text-link.vue'
import AutomationsView from './automations-view.vue'

const logoItems = [
  { name: 'Gmail', slug: 'gmail' },
  { name: 'Slack', slug: 'slack' },
  { name: 'Salesforce', slug: 'salesforce' },
  { name: 'HubSpot', slug: 'hubspot' },
  { name: 'Zoom', slug: 'zoom' },
  { name: 'Stripe', slug: 'stripe' },
  { name: 'Shopify', slug: 'shopify' },
  { name: 'Mailchimp', slug: 'mailchimp' },
  { name: 'Airtable', slug: 'airtable' },
]

const marqueeItems = [...logoItems, ...logoItems]

const [emblaRef] = useEmblaCarousel(
  {
    align: 'start',
    containScroll: false,
    dragFree: true,
    loop: true,
  },
  [
    AutoScroll({
      playOnInit: true,
      speed: 1,
      startDelay: 0,
      stopOnFocusIn: false,
      stopOnInteraction: false,
      stopOnMouseEnter: true,
    }),
  ],
)

const getLogoUrl = (slug) => `https://logos.composio.dev/api/${slug}`
</script>

<template>
  <section id="integrations" class="mx-auto max-w-[1400px] px-6 py-24" data-integrations-marquee>
    <div class="grid gap-10 md:grid-cols-2">
      <div class="min-w-0">
        <div class="space-y-0 text-3xl font-normal leading-none tracking-tight text-balance">
          <h2 class="text-foreground">
            Connect anywhere
          </h2>
          <p class="text-foreground/40">
            Plug in and get started immediately.
          </p>
          <TextLink href="#integrations">Integrations</TextLink>
        </div>

        <div class="mt-14 flex aspect-[4/3] items-center overflow-hidden rounded-4xl bg-foreground/3">
          <div ref="emblaRef" class="w-full overflow-hidden" aria-label="Integration logos">
            <div class="flex items-center" data-integrations-marquee-track>
              <div
                v-for="(logo, index) in marqueeItems"
                :key="`${logo.slug}-${index}`"
                class="flex min-w-0 flex-[0_0_auto] items-center justify-center px-10"
              >
                <img
                  :src="getLogoUrl(logo.slug)"
                  :alt="index < logoItems.length ? `${logo.name} logo` : ''"
                  class="size-12"
                  :aria-hidden="index >= logoItems.length ? 'true' : undefined"
                  data-integrations-logo
                  loading="lazy"
                  decoding="async"
                >
              </div>
            </div>
          </div>
        </div>
        <p class="mt-5 max-w-sm text-sm font-normal leading-normal text-foreground/40">
          Connect the tools your team already uses and keep work moving across every system.
        </p>
      </div>
      <AutomationsView />
    </div>
  </section>
</template>
