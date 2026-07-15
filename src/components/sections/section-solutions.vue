<script setup>
import { PhArrowLeft, PhArrowRight } from '@phosphor-icons/vue'
import useEmblaCarousel from 'embla-carousel-vue'
import { ref, watch } from 'vue'
import { solutions } from '../../lib/solutions'
import { cn } from '../../lib/cn'

const [emblaRef, emblaApi] = useEmblaCarousel({
  align: 'start',
  containScroll: 'trimSnaps',
  loop: false,
})
const selectedIndex = ref(0)
const canScrollPrev = ref(false)
const canScrollNext = ref(false)

const updateCarouselState = (api) => {
  selectedIndex.value = api.selectedScrollSnap()
  canScrollPrev.value = api.canScrollPrev()
  canScrollNext.value = api.canScrollNext()
}

watch(
  emblaApi,
  (api, _previousApi, onCleanup) => {
    if (!api) return

    const updateState = () => updateCarouselState(api)
    updateState()
    api.on('select', updateState)
    api.on('reInit', updateState)

    onCleanup(() => {
      api.off('select', updateState)
      api.off('reInit', updateState)
    })
  },
  { immediate: true },
)
</script>

<template>
  <section v-if="solutions.length" id="solutions" class="w-full scroll-mt-24 overflow-hidden px-6 py-24"
    data-section-solutions>
    <div class="mx-auto flex w-full max-w-(--content-width) flex-col gap-16">
      <div class="flex flex-col items-start justify-between gap-8 md:flex-row md:items-end">
        <div class="flex max-w-3xl flex-col items-start gap-6">
          <p class="text-xs font-medium leading-none text-muted-foreground/75 flex items-center gap-4">
            <span class="uppercase text-foreground">Solutions</span>
            <span class="tracking-tight text-sm">Every firm. Every workflow.</span>
          </p>
          <h2 class="text-5xl font-normal leading-none tracking-tight text-balance text-foreground">
            Built for the businesses that keep Main Street moving.
          </h2>
        </div>

        <div class="flex items-center gap-2">
          <button type="button" aria-label="Previous solution" :disabled="!canScrollPrev" :class="cn(
            'inline-flex size-10 cursor-pointer items-center justify-center rounded-full text-foreground transition-colors hover:bg-foreground/10',
            'focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring disabled:pointer-events-none disabled:opacity-30',
          )" @click="emblaApi?.scrollPrev()">
            <PhArrowLeft class="size-5" weight="regular" aria-hidden="true" />
          </button>
          <button type="button" aria-label="Next solution" :disabled="!canScrollNext" :class="cn(
            'inline-flex size-10 cursor-pointer items-center justify-center rounded-full text-foreground transition-colors hover:bg-foreground/10',
            'focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring disabled:pointer-events-none disabled:opacity-30',
          )" @click="emblaApi?.scrollNext()">
            <PhArrowRight class="size-5" weight="regular" aria-hidden="true" />
          </button>
        </div>
      </div>

      <div ref="emblaRef" class="w-full overflow-visible" role="region" aria-roledescription="carousel"
        aria-label="Industry solutions">
        <div class="flex w-full">
          <article v-for="(solution, index) in solutions" :key="solution.path" role="group"
            :aria-label="`${index + 1} of ${solutions.length}`"
            :aria-current="selectedIndex === index ? 'true' : undefined"
            class="w-[86%] min-w-0 shrink-0 pr-3 sm:w-1/2 lg:w-1/3">
            <a :href="solution.path" :aria-label="`Explore Remi for ${solution.industryLabel}`" :class="cn(
              'group relative flex aspect-3/5 w-full flex-col justify-between overflow-hidden rounded-3xl bg-muted px-8 py-12 focus-visible:outline-4 focus-visible:outline-offset-0 focus-visible:outline-foreground/10',
              solution.thumbnailImageUrl ? 'text-white' : 'text-foreground transition-colors hover:bg-muted-hover',
            )">
              <img v-if="solution.thumbnailImageUrl" :src="solution.thumbnailImageUrl" alt="" aria-hidden="true"
                class="absolute inset-0 size-full object-cover transition-transform duration-500 ease-out group-hover:scale-[1.02] motion-reduce:transition-none"
                :loading="index < 3 ? 'eager' : 'lazy'" decoding="async">
              <span v-if="solution.thumbnailImageUrl"
                class="absolute inset-0 bg-linear-to-b from-black/20 from-50% to-black/40 to-100% transition-colors group-hover:from-black/10 group-hover:to-black/30 group-focus-visible:from-black/10 group-focus-visible:to-black/30 duration-300"
                aria-hidden="true" />
              <h3
                class="relative z-10 text-sm font-normal leading-none tracking-tight text-balance text-center mx-auto">
                {{ solution.industryLabel }}
              </h3>
              <div class="relative z-10 flex flex-col items-center justify-start">
                <span class="w-full text-center">{{ solution.title }}</span>
                <div
                  class="text-center grid grid-rows-[0fr] group-hover:grid-rows-[1fr] group-focus-visible:grid-rows-[1fr] opacity-0 group-hover:opacity-100 group-focus-visible:opacity-100 transition-all duration-300">
                  <span
                    class="overflow-hidden flex flex-col items-center justify-start text-xs uppercase font-medium leading-none tracking-tight text-balance"><span
                      class="pt-4">Learn More</span></span>
                </div>
              </div>
            </a>
          </article>
        </div>
      </div>
    </div>
  </section>
</template>
