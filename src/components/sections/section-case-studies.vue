<script setup>
import Fade from 'embla-carousel-fade'
import useEmblaCarousel from 'embla-carousel-vue'
import { computed, ref, watch } from 'vue'
import { caseStudies } from '../../lib/case-studies'
import { cn } from '../../lib/cn'
import Button from '../global/button.vue'

const visibleCaseStudies = caseStudies.slice(0, 4)
const [emblaRef, emblaApi] = useEmblaCarousel(
  {
    align: 'start',
    containScroll: false,
    loop: visibleCaseStudies.length > 1,
  },
  [Fade()],
)
const selectedIndex = ref(0)

const activeCaseStudy = computed(() => visibleCaseStudies[selectedIndex.value] || visibleCaseStudies[0] || null)

const setActiveIndex = (index) => {
  emblaApi.value?.scrollTo(index)
}

const getImageAlt = (caseStudy) =>
  caseStudy.metadata.coverImageAlt ||
  caseStudy.metadata.thumbnailImageAlt ||
  caseStudy.title

const getSummary = (caseStudy) => caseStudy.description || caseStudy.metadata.ogDescription || ''

watch(
  emblaApi,
  (api, _previousApi, onCleanup) => {
    if (!api) return

    const updateSelectedIndex = () => {
      selectedIndex.value = api.selectedScrollSnap()
    }

    updateSelectedIndex()
    api.on('select', updateSelectedIndex)
    api.on('reInit', updateSelectedIndex)

    onCleanup(() => {
      api.off('select', updateSelectedIndex)
      api.off('reInit', updateSelectedIndex)
    })
  },
  { immediate: true },
)
</script>

<template>
  <section v-if="activeCaseStudy" id="case-studies" :class="cn('w-full scroll-mt-24 px-6 py-24')"
    data-section-case-studies>
    <div class="mx-auto flex w-full max-w-(--content-width) flex-col gap-12">
      <div class="flex max-w-3xl flex-col items-start gap-4">
        <h2 class="text-5xl font-normal leading-none tracking-tight text-balance text-foreground">
          See how Remi chases money, follows up, and keeps proof close.
        </h2>
      </div>

      <div class="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
        <div class="flex flex-wrap items-center gap-2" aria-label="Case study industries">
          <button v-for="(caseStudy, index) in visibleCaseStudies" :key="caseStudy.path" type="button"
            :aria-pressed="selectedIndex === index" :class="cn(
              'inline-flex h-10 cursor-pointer items-center justify-center rounded-full px-4 text-sm font-medium transition-colors',
              'focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring',
              selectedIndex === index
                ? 'bg-foreground text-background'
                : 'bg-muted text-foreground hover:bg-muted-hover'
            )" @click="setActiveIndex(index)">
            {{ caseStudy.industryLabel }}
          </button>
        </div>
      </div>

      <div ref="emblaRef" class="overflow-hidden" data-active-case-study>
        <div class="flex">
          <div v-for="(caseStudy, index) in visibleCaseStudies" :key="caseStudy.path" class="min-w-0 flex-[0_0_100%]">
            <div class="grid gap-2 lg:h-140 lg:items-stretch"
              :aria-hidden="selectedIndex !== index" :inert="selectedIndex !== index">
              <article
                class="grid min-h-0 overflow-hidden rounded-3xl bg-background p-2 shadow-[0_0_0_1px_inset_var(--color-border)] lg:h-full lg:grid-cols-[2fr_1fr_1fr] gap-y-4 gap-x-2">
                <div class="flex min-h-0 flex-col items-start justify-between gap-10 p-8 lg:h-full lg:max-w-md">
                  <div class="flex flex-col items-start gap-6">
                    <p class="text-sm font-medium leading-tight tracking-tight text-muted-foreground">
                      {{ caseStudy.industryLabel }}
                    </p>
                    <h3 class="w-full text-3xl font-normal leading-none tracking-tight text-balance text-foreground">
                      {{ caseStudy.title }}
                    </h3>
                    <Button :href="caseStudy.path" variant="secondary" size="default">
                      <span>Read more</span>
                    </Button>
                  </div>

                  <p class="w-full text-base leading-normal text-pretty text-muted-foreground">
                    {{ getSummary(caseStudy) }}
                  </p>
                </div>

                <dl class="flex min-h-0 flex-col gap-2 lg:h-full">
                  <div v-for="stat in caseStudy.stats" :key="`${stat.metric}-${stat.label}`"
                    class="flex min-h-0 flex-1 flex-col justify-between gap-2 rounded-2xl bg-muted p-6 text-foreground">
                    <dt class="text-sm leading-snug text-pretty capitalize text-muted-foreground">
                      {{ stat.label }}
                    </dt>
                    <dd class="mt-2 text-3xl font-normal leading-none tracking-tight tabular-nums">
                      {{ stat.metric }}
                    </dd>
                  </div>
                </dl>

                <figure
                  class="order-first lg:order-last relative aspect-2/1 min-h-0 w-full overflow-hidden rounded-2xl bg-background lg:aspect-auto lg:h-full">
                  <img :src="caseStudy.coverImageUrl" :alt="getImageAlt(caseStudy)"
                    class="absolute inset-0 size-full object-cover" loading="lazy" decoding="async">
                </figure>
              </article>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>
