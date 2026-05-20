<script setup>
import {
  PhCalendarCheck,
  PhChartLineUp,
  PhPlugsConnected,
  PhSparkle,
  PhSquaresFour,
  PhStorefront,
  PhUsersThree,
} from '@phosphor-icons/vue'

const features = [
  {
    title: 'Community Operations',
    description: 'Courses, events, members, and discussions in one branded workspace.',
    icon: PhSquaresFour,
  },
  {
    title: 'AI Workflows',
    description: 'Follow-ups, reminders, and handoffs that move without manual chasing.',
    icon: PhSparkle,
  },
  {
    title: 'Branded Member Space',
    description: 'A home that feels like your business, not another rented platform.',
    icon: PhStorefront,
  },
  {
    title: 'Courses and Events',
    description: 'Publish lessons, host live sessions, and keep every resource organized.',
    icon: PhCalendarCheck,
  },
  {
    title: 'Member Intelligence',
    description: 'Know who needs attention, what is working, and where momentum is fading.',
    icon: PhUsersThree,
  },
  {
    title: 'Connected Tools',
    description: 'Bring signals from your stack into one place so operations stay current.',
    icon: PhPlugsConnected,
  },
]

</script>

<template>
  <section class="mx-auto max-w-[1400px] px-6 py-24" data-product-overview>
    <div class="space-y-0 text-3xl font-normal leading-none tracking-tight text-balance">
      <h2 class="text-foreground">
        Get to know Remi.
      </h2>
      <p class="text-foreground/40">
        AI-powered operations for communities, courses, and client work.
      </p>
    </div>

    <div class="mt-20 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
      <article
        v-for="feature in features"
        :key="feature.title"
        class="rounded-3xl bg-foreground/3 p-8"
      >
        <component :is="feature.icon" class="size-6 text-foreground" weight="fill" aria-hidden="true" />
        <div class="mt-10">
          <h3 class="text-base font-normal leading-tight tracking-tight text-foreground">
            {{ feature.title }}
          </h3>
          <p class="mt-2 text-sm font-normal leading-normal text-foreground/45">
            {{ feature.description }}
          </p>
        </div>
      </article>
    </div>
  </section>
</template>
