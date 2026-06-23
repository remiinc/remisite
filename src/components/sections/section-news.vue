<script setup>
import { blogPosts } from '../../lib/blog-posts'
import { cn } from '../../lib/cn'

const newsPosts = blogPosts.slice(0, 2)

const getPostImage = (post) => post.metadata.heroImage || post.metadata.ogImage || '/images/og-image.png'
const getPostImageAlt = (post) => post.metadata.heroImageAlt || post.title
const getPostCategory = (post) => post.metadata.category || 'News'
const getPostReadingTime = (post) => post.metadata.readingTime || '3 min read'
</script>

<template>
  <section
    id="news"
    :class="cn('mx-auto max-w-(--content-width) scroll-mt-24 px-6 py-24')"
    data-section-news
  >
    <div class="flex items-center justify-between gap-6">
      <h2 class="text-4xl font-normal tracking-tight text-balance text-foreground">
        News
      </h2>
      <a
        href="/blog"
        class="text-base font-medium text-foreground transition-colors hover:text-muted-foreground focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-ring"
      >
        See more
      </a>
    </div>

    <div class="mt-12 grid grid-cols-1 gap-8 md:grid-cols-2">
      <a
        v-for="post in newsPosts"
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
          <h3 class="max-w-3xl text-2xl font-normal leading-tight tracking-tight text-balance text-foreground">
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
</template>
