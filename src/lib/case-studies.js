import { buildMarkdownCollection } from './markdown-content'

const markdownFiles = import.meta.glob('../content/case-studies/*.md', {
  query: '?raw',
  import: 'default',
  eager: true,
})

export const caseStudies = buildMarkdownCollection(markdownFiles, '/case-studies')
export const latestCaseStudy = caseStudies[0] || null
