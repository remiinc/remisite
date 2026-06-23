<script setup>
import { cn } from '../../lib/cn'

const solutionCards = [
  {
    title: 'Startups',
    href: '/solutions/startups',
    image: '/images/solutions/startups.jpg',
  },
  {
    title: 'Small Businesses',
    href: '/solutions/small-businesses',
    image: '/images/solutions/small-business.jpg',
  },
  {
    title: 'Mid-Market',
    href: '/solutions/mid-market',
    image: '/images/solutions/mid-market.jpg',
  },
]
</script>

<template>
  <section ref="sectionRef" id="solutions" :class="cn('relative z-1 w-full px-6 py-12 md:py-16')" data-section-how>
    <div class="mx-auto max-w-(--content-width)">
      <div class="mb-12 max-w-3xl">
        <h2 class="text-4xl font-normal leading-none tracking-tight text-balance text-foreground">
          Built for teams with too much to keep track of.<br>
          <span class="text-foreground/50">Pick the way Remi fits into your day.</span>
        </h2>
      </div>

      <!-- Grid -->
      <div class="w-full grid grid-cols-1 md:grid-cols-3 gap-4 py-12">
        <a v-for="card in solutionCards" :key="card.href" :href="card.href"
          class="group relative z-1 col-span-1 block w-full overflow-hidden rounded-[2em] bg-muted aspect-4/5 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-ring">
          <img :src="card.image" :alt="card.title"
            class="absolute inset-0 w-full h-full object-cover pointer-events-none z-0 transition-transform duration-500 ease-out group-hover:scale-[1.03] group-focus-visible:scale-[1.03]">
          <div
            class="relative size-full z-1 p-8 flex flex-col items-stretch justify-end bg-linear-to-b from-50% from-transparent to-100% to-black/50">
            <h3 class="text-3xl font-normal leading-none tracking-tight text-balance text-background">
              {{ card.title }}
            </h3>
          </div>
        </a>
      </div>
    </div>
  </section>
</template>
