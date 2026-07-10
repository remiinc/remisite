<script setup>
import { computed, onBeforeUnmount, ref, watchEffect } from 'vue'
import { blogPosts } from '../../lib/blog-posts'
import { cn } from '../../lib/cn'
import Button from '../global/button.vue'
import GlobalFooter from '../global/global-footer.vue'
import GlobalHeader from '../header/global-header.vue'

const featuredPost = computed(() => blogPosts[0] || null)
const remainingPosts = computed(() => blogPosts.slice(1))
const originalTitle = typeof document !== 'undefined' ? document.title : ''

const getPostImage = (post) => post.metadata.heroImage || post.metadata.ogImage || '/images/og-image.png'
const getPostImageAlt = (post) => post.metadata.heroImageAlt || post.title
const getPostCategory = (post) => post.metadata.category || 'Blog'
const getPostReadingTime = (post) => post.metadata.readingTime || '3 min read'

const activeCategory = ref('All')

const categories = computed(() => {
  const unique = new Set(remainingPosts.value.map(getPostCategory))
  return ['All', ...unique]
})

const filteredPosts = computed(() =>
  activeCategory.value === 'All'
    ? remainingPosts.value
    : remainingPosts.value.filter((post) => getPostCategory(post) === activeCategory.value),
)

watchEffect(() => {
  if (typeof document === 'undefined') {
    return
  }

  document.title = 'Blog | Remi'
})

onBeforeUnmount(() => {
  if (typeof document === 'undefined') {
    return
  }

  document.title = originalTitle
})
</script>

<template>
  <div class="min-h-svh bg-background text-foreground">
    <GlobalHeader theme="light" />

    <main class="px-6 pt-[calc(var(--header-height)+3rem)] pb-24" data-blog-index>
      <section v-if="featuredPost" class="mx-auto max-w-(--content-width)" aria-labelledby="blog-index-title">
        <h1 id="blog-index-title" class="sr-only">Blog</h1>

        <a
          :href="featuredPost.path"
          :class="cn(
            'grid items-center gap-8 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-ring',
            'lg:grid-cols-[minmax(0,1fr)_minmax(22rem,0.82fr)] lg:gap-12'
          )"
          data-featured-blog-post
        >
          <div class="overflow-hidden rounded-2xl bg-muted">
            <img
              :src="getPostImage(featuredPost)"
              :alt="getPostImageAlt(featuredPost)"
              class="aspect-3/2 size-full object-cover"
              fetchpriority="high"
            >
          </div>

          <div class="flex min-w-0 flex-col items-start">
            <p class="flex flex-wrap items-center gap-x-4 gap-y-1 text-sm font-medium leading-none text-muted-foreground">
              <span>{{ getPostCategory(featuredPost) }}</span>
              <time v-if="featuredPost.formattedDate" :datetime="featuredPost.date">{{ featuredPost.formattedDate }}</time>
            </p>

            <h2 class="mt-6 text-balance text-4xl font-normal leading-none tracking-tight text-foreground md:text-5xl">
              {{ featuredPost.title }}
            </h2>

            <p
              v-if="featuredPost.description"
              class="mt-6 max-w-2xl text-xl leading-normal text-pretty text-muted-foreground"
            >
              {{ featuredPost.description }}
            </p>
          </div>
        </a>

        <div v-if="remainingPosts.length" class="mt-20 flex flex-col gap-8">
          <div
            v-if="categories.length > 2"
            class="flex flex-wrap items-center gap-2"
            role="group"
            aria-label="Filter posts by category"
          >
            <button
              v-for="category in categories"
              :key="category"
              type="button"
              :aria-pressed="activeCategory === category"
              :class="cn(
                'inline-flex h-9 items-center rounded-full px-4 text-sm font-medium leading-none transition-colors cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background',
                activeCategory === category
                  ? 'bg-foreground text-background'
                  : 'bg-muted text-foreground hover:bg-muted-hover',
              )"
              @click="activeCategory = category"
            >
              {{ category }}
            </button>
          </div>

          <div
            v-if="filteredPosts.length"
            class="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3"
            aria-label="More blog posts"
          >
          <a
            v-for="post in filteredPosts"
            :key="post.path"
            :href="post.path"
            class="block h-full min-w-0 focus-visible:outline-none bg-muted hover:bg-muted-hover focus-visible:bg-muted-hover p-6 lg:p-8 rounded-3xl min-h-96 md:min-h-120 lg:nth-[10n+5]:col-span-2 lg:nth-[10n+9]:col-span-2"
          >
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
          </div>
        </div>
      </section>

      <section v-else class="mx-auto flex max-w-2xl flex-col items-start gap-6 py-24">
        <p class="text-sm font-medium text-muted-foreground">Blog</p>
        <h1 class="text-5xl font-normal leading-none tracking-tight text-balance text-foreground">
          No posts yet
        </h1>
        <p class="text-lg leading-normal text-pretty text-muted-foreground">
          Markdown posts added to the blog folder will show up here automatically.
        </p>
        <Button href="/">Back home</Button>
      </section>
    </main>

    <GlobalFooter />
  </div>
</template>
