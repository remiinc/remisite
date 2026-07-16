<script setup>
import { PhArrowLeft, PhArrowRight } from '@phosphor-icons/vue'
import useEmblaCarousel from 'embla-carousel-vue'
import { ref, watch } from 'vue'
import { blogPosts } from '../../lib/blog-posts'
import Button from '../global/button.vue'
import { cn } from '../../lib/cn'

const newsPosts = blogPosts.slice(0, 8)

const [emblaRef, emblaApi] = useEmblaCarousel({
  align: 'start',
  containScroll: 'trimSnaps',
  loop: false,
})
const selectedIndex = ref(0)
const canScrollPrev = ref(false)
const canScrollNext = ref(false)

const getPostCategory = (post) => post.metadata.category || 'News'
const getPostReadingTime = (post) => post.metadata.readingTime || '3 min read'

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
  <section v-if="newsPosts.length" id="news" :class="cn('w-full scroll-mt-24 overflow-hidden px-6 py-24')"
    data-section-news>
    <div class="w-full mx-auto max-w-(--content-width) flex flex-col gap-12">
      <div class="flex flex-col gap-8">
        <div class="flex items-center justify-between gap-6">
          <h2 class="text-4xl font-normal tracking-tight text-balance text-foreground">
            News
          </h2>
          <Button href="/resources" variant="secondary" size="sm">See more</Button>
        </div>

        <div v-if="newsPosts.length > 1" class="flex items-center gap-6">
          <button type="button" aria-label="Previous article" :disabled="!canScrollPrev" :class="cn(
            'flex -mx-3 px-3 py-2 rounded-full cursor-pointer items-center justify-center text-foreground transition-colors hover:bg-foreground/10',
            'focus-visible:outline-none disabled:pointer-events-none disabled:opacity-30',
          )" @click="scrollPrev">
            <PhArrowLeft class="size-5" weight="regular" aria-hidden="true" />
          </button>
          <button type="button" aria-label="Next article" :disabled="!canScrollNext" :class="cn(
            'flex -mx-3 px-3 py-2 rounded-full cursor-pointer items-center justify-center text-foreground transition-colors hover:bg-foreground/10',
            'focus-visible:outline-none disabled:pointer-events-none disabled:opacity-30',
          )" @click="scrollNext">
            <PhArrowRight class="size-5" weight="regular" aria-hidden="true" />
          </button>
        </div>
      </div>

      <div ref="emblaRef" class="w-full overflow-visible" role="region" aria-roledescription="carousel"
        aria-label="News">
        <div class="w-full flex gap-0">
          <article v-for="(post, index) in newsPosts" :key="post.path" role="group"
            :aria-label="`${index + 1} of ${newsPosts.length}`"
            class="min-w-0 w-full sm:w-1/2 md:w-1/2 lg:w-1/3 pr-4 shrink-0"
            :aria-current="selectedIndex === index ? 'true' : undefined">
            <a :href="post.path"
              class="block h-full min-w-0 focus-visible:outline-none bg-muted hover:bg-muted-hover focus-visible:bg-muted-hover p-6 lg:p-8 rounded-3xl min-h-80 md:min-h-96 lg:min-h-120">
              <div class="h-full flex flex-col items-start justify-between gap-8">
                <h3 class="max-w-3xl text-2xl font-normal leading-tight tracking-tight text-balance text-foreground">
                  {{ post.title }}
                </h3>
                <p class="flex flex-wrap items-center gap-x-3 gap-y-1 text-sm leading-none text-muted-foreground">
                  <span>{{ getPostCategory(post) }}</span>
                  <span aria-hidden="true">—</span>
                  <span>{{ getPostReadingTime(post) }}</span>
                </p>
              </div>
            </a>
          </article>
        </div>
      </div>
    </div>
  </section>
</template>
