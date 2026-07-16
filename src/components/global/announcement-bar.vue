<script setup>
import { PhArrowRight } from '@phosphor-icons/vue'
import { latestBlogPost } from '../../lib/blog-posts'

const announcementText =
  latestBlogPost?.metadata.announcement || latestBlogPost?.title || 'Read the latest Remi update'
const announcementHref = latestBlogPost?.path || '/resources'
const announcementLabel = latestBlogPost
  ? `Read latest blog post: ${latestBlogPost.title}`
  : 'Read the latest Remi update'
</script>

<template>
  <a
    :href="announcementHref"
    :aria-label="announcementLabel"
    class="announcement-bar relative flex h-(--topbar-height) w-full flex-col items-center justify-center px-2"
    data-announcement-bar
  >
    <div class="flex w-full min-w-0 items-center justify-center gap-2 px-3 text-center text-sm sm:gap-4">
      <span class="min-w-0 truncate">{{ announcementText }}</span>
      <span class="inline-flex shrink-0 items-center justify-center gap-1 text-foreground/50">
        <span>Read post</span>
        <PhArrowRight size="16" weight="regular" aria-hidden="true" />
      </span>
    </div>
  </a>
</template>
