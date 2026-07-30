import { buildMarkdownCollection, numberSectionParagraphs } from './markdown-content'

const markdownFiles = import.meta.glob('../content/legal/*.md', {
  eager: true,
  query: '?raw',
  import: 'default',
})

export const legalPages = buildMarkdownCollection(markdownFiles, '').map((page) => ({
  ...page,
  html: numberSectionParagraphs(page.html),
}))
