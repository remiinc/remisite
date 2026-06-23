import { buildMarkdownCollection } from './markdown-content'

const markdownFiles = import.meta.glob('../content/blog/*.md', {
  query: '?raw',
  import: 'default',
  eager: true,
})

export const blogPosts = buildMarkdownCollection(markdownFiles, '/blog')
export const latestBlogPost = blogPosts[0] || null
