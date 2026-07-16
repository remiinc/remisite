import { buildMarkdownCollection } from './markdown-content'

const markdownFiles = import.meta.glob('../content/resources/*.md', {
  query: '?raw',
  import: 'default',
  eager: true,
})

export const blogPosts = buildMarkdownCollection(markdownFiles, '/resources')
export const latestBlogPost = blogPosts[0] || null
