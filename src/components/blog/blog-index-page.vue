<script setup>
import { computed, onBeforeUnmount, watchEffect } from 'vue'
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

        <div
          v-if="remainingPosts.length"
          class="mt-20 grid grid-cols-1 gap-x-5 gap-y-12 md:grid-cols-2 lg:grid-cols-3"
          aria-label="More blog posts"
        >
          <a
            v-for="post in remainingPosts"
            :key="post.path"
            :href="post.path"
            class="block min-w-0 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-ring"
          >
            <div class="aspect-13/10 overflow-hidden rounded-2xl bg-muted">
              <img
                :src="getPostImage(post)"
                :alt="getPostImageAlt(post)"
                class="size-full object-cover"
                loading="lazy"
                decoding="async"
              >
            </div>

            <div class="mt-5">
              <h3 class="text-2xl font-normal leading-tight tracking-tight text-balance text-foreground">
                {{ post.title }}
              </h3>
              <p class="mt-4 flex flex-wrap items-center gap-x-3 gap-y-1 text-sm font-medium leading-none text-muted-foreground">
                <span>{{ getPostCategory(post) }}</span>
                <span aria-hidden="true">—</span>
                <span>{{ getPostReadingTime(post) }}</span>
              </p>
            </div>
          </a>
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
