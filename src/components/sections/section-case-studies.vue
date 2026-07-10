<script setup>
import { PhArrowLeft, PhArrowRight } from '@phosphor-icons/vue'
import useEmblaCarousel from 'embla-carousel-vue'
import { ref, watch } from 'vue'
import { caseStudies } from '../../lib/case-studies'
import { cn } from '../../lib/cn'

const visibleCaseStudies = caseStudies
const [emblaRef, emblaApi] = useEmblaCarousel({
  align: 'start',
  containScroll: 'trimSnaps',
  loop: false,
})
const selectedIndex = ref(0)
const canScrollPrev = ref(false)
const canScrollNext = ref(false)

const getImageAlt = (caseStudy) =>
  caseStudy.metadata.coverImageAlt ||
  caseStudy.metadata.thumbnailImageAlt ||
  caseStudy.title

const getImageUrl = (caseStudy) => caseStudy.coverImageUrl || caseStudy.thumbnailImageUrl

const updateCarouselState = (api) => {
  selectedIndex.value = api.selectedScrollSnap()
  canScrollPrev.value = api.canScrollPrev()
  canScrollNext.value = api.canScrollNext()
}

const scrollPrev = () => {
  emblaApi.value?.scrollPrev()
}

const scrollNext = () => {
  emblaApi.value?.scrollNext()
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
  <section v-if="visibleCaseStudies.length" id="case-studies"
    :class="cn('w-full scroll-mt-24 overflow-hidden px-6 py-24')" data-section-case-studies>
    <div class="mx-auto flex w-full max-w-(--content-width) flex-col gap-12">
      <div class="flex flex-col gap-8">
        <div class="flex max-w-3xl flex-col items-start gap-4">
          <h2 class="text-5xl font-normal leading-none tracking-tight text-balance text-foreground">
            Helping small business owners do more of what they love.
          </h2>
        </div>

        <div v-if="visibleCaseStudies.length > 1" class="flex items-center gap-6">
          <button type="button" aria-label="Previous case study" :disabled="!canScrollPrev" :class="cn(
            'flex -mx-3 px-3 py-2 rounded-full cursor-pointer items-center justify-center text-foreground transition-colors hover:bg-foreground/10',
            'focus-visible:outline-none disabled:pointer-events-none disabled:opacity-30',
          )" @click="scrollPrev">
            <PhArrowLeft class="size-5" weight="regular" aria-hidden="true" />
          </button>
          <button type="button" aria-label="Next case study" :disabled="!canScrollNext" :class="cn(
            'flex -mx-3 px-3 py-2 rounded-full cursor-pointer items-center justify-center text-foreground transition-colors hover:bg-foreground/10',
            'focus-visible:outline-none disabled:pointer-events-none disabled:opacity-30',
          )" @click="scrollNext">
            <PhArrowRight class="size-5" weight="regular" aria-hidden="true" />
          </button>
        </div>
      </div>

      <div ref="emblaRef" class="w-full overflow-visible" role="region" aria-roledescription="carousel"
        aria-label="Case studies">
        <div class="w-full flex gap-0">
          <article v-for="(caseStudy, index) in visibleCaseStudies" :key="caseStudy.path" role="group"
            :aria-label="`${index + 1} of ${visibleCaseStudies.length}`" class="min-w-0 w-1/3 pr-2 shrink-0"
            :aria-current="selectedIndex === index ? 'true' : undefined">
            <a :href="caseStudy.path" :aria-label="`Read case study: ${caseStudy.title}`"
              class="group w-full flex flex-col items-start justify-between relative aspect-5/7 overflow-hidden rounded-3xl bg-muted text-background focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring">
              <img v-if="getImageUrl(caseStudy)" :src="getImageUrl(caseStudy)" :alt="getImageAlt(caseStudy)"
                class="absolute inset-0 size-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                :loading="index === 0 ? 'eager' : 'lazy'" decoding="async">
              <div class="absolute inset-0 bg-linear-to-t from-foreground/82 via-foreground/20 to-foreground/5" />
              <div class="relative z-1 flex items-center gap-2 p-6">
                <span
                  class="text-sm font-medium leading-none tracking-tight text-balance px-2.5 py-1.5 bg-background/20 shadow-[0_0_0_1px_rgba(255,255,255,0.1)_inset] backdrop-blur-sm rounded-full">{{
                    caseStudy.industryLabel }}</span>
              </div>
              <h3 class="relative z-1 w-full p-6 text-2xl font-normal leading-none tracking-tight text-balance">
                {{ caseStudy.title }}
              </h3>
            </a>
          </article>
        </div>
      </div>
    </div>
  </section>
</template>
