<script setup>
const topLogoItems = [
  { name: 'Messages', src: '/images/app-logos/ios-messages-icon.svg' },
  { name: 'Gmail', src: '/images/app-logos/gmail.svg' },
  { name: 'Google Calendar', slug: 'googlecalendar' },
  { name: 'Google Drive', slug: 'googledrive' },
  { name: 'WhatsApp', slug: 'whatsapp' },
  { name: 'Dropbox', slug: 'dropbox' },
]

const bottomLogoItems = [
  { name: 'QuickBooks', slug: 'quickbooks' },
  { name: 'Square', slug: 'square' },
  { name: 'Stripe', slug: 'stripe' },
  { name: 'PayPal', slug: 'paypal' },
  { name: 'Xero', slug: 'xero' },
  { name: 'Google Ads', slug: 'googleads' },
]

const rotateItems = (items, offset) => [...items.slice(offset), ...items.slice(0, offset)]

const rowItems = [
  rotateItems(topLogoItems, 0),
  rotateItems(bottomLogoItems, 0),
]

const marqueeRows = rowItems.map((items) => [...items, ...items, ...items])

const getLogoUrl = (logo) => logo.src || `https://logos.composio.dev/api/${logo.slug}`
</script>

<template>
  <div
    class="relative flex aspect-square lg:aspect-5/4 w-full min-w-0 max-w-full flex-col items-center justify-center overflow-hidden rounded-[2em] bg-muted"
    aria-label="Connected tool logos">
    <div aria-hidden="true"
      class="pointer-events-none absolute inset-y-0 left-0 z-1 w-1/4 bg-linear-to-r from-muted to-transparent" />
    <div aria-hidden="true"
      class="pointer-events-none absolute inset-y-0 right-0 z-1 w-1/4 bg-linear-to-l from-muted to-transparent" />

    <div class="flex w-full min-w-0 flex-col gap-5 overflow-hidden">
      <div v-for="(row, rowIndex) in marqueeRows" :key="rowIndex" class="w-full min-w-0 overflow-hidden">
        <div
          class="integrations-marquee-row flex w-max items-center gap-4"
          :data-row="rowIndex">
          <div
            v-for="(logo, index) in row"
            :key="`${rowIndex}-${logo.slug || logo.name}-${index}`"
            class="flex size-16 shrink-0 items-center justify-center rounded-2xl bg-background shadow-[0_0_0_1px_var(--color-border)]">
            <img
              :src="getLogoUrl(logo)"
              :alt="index < rowItems[rowIndex].length ? `${logo.name} logo` : ''"
              class="size-8"
              :aria-hidden="index >= rowItems[rowIndex].length ? 'true' : undefined"
              loading="lazy"
              decoding="async">
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.integrations-marquee-row {
  --marquee-shift: calc((4rem + 1rem) * 6);
  animation: integrations-marquee 28s linear infinite;
  will-change: transform;
}

.integrations-marquee-row[data-row='1'] {
  animation-name: integrations-marquee-reverse;
}

@keyframes integrations-marquee {
  from {
    transform: translateX(0);
  }

  to {
    transform: translateX(calc(var(--marquee-shift) * -1));
  }
}

@keyframes integrations-marquee-reverse {
  from {
    transform: translateX(calc(var(--marquee-shift) * -1));
  }

  to {
    transform: translateX(0);
  }
}

@media (prefers-reduced-motion: reduce) {
  .integrations-marquee-row {
    animation: none;
    transform: translateX(-20%);
  }
}
</style>
