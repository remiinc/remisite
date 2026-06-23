import { buildMarkdownCollection } from './markdown-content'

const markdownFiles = import.meta.glob('../content/case-studies/*.md', {
  query: '?raw',
  import: 'default',
  eager: true,
})

const normalizeStats = (stats) => {
  const rawStats = Array.isArray(stats) ? stats : stats ? [stats] : []

  return rawStats
    .map((stat) => {
      if (typeof stat === 'string') {
        const [metric, label] = stat.split('|').map((part) => part?.trim())

        return {
          metric: metric || '',
          label: label || '',
        }
      }

      return {
        metric: stat?.metric || '',
        label: stat?.label || '',
      }
    })
    .filter((stat) => stat.metric && stat.label)
}

const normalizeCaseStudy = (caseStudy) => {
  const metadata = caseStudy.metadata
  const coverImageUrl = metadata.coverImageUrl || metadata.coverImage || metadata.heroImage || metadata.ogImage || ''
  const thumbnailImageUrl =
    metadata.thumbnailImageUrl ||
    metadata.thumbnailImage ||
    coverImageUrl
  const industryLabel = metadata.industryLabel || metadata.industry || ''
  const stats = normalizeStats(metadata.stats || metadata.stat)

  return {
    ...caseStudy,
    coverImageUrl,
    thumbnailImageUrl,
    industryLabel,
    stats,
    metadata: {
      ...metadata,
      coverImageUrl,
      thumbnailImageUrl,
      industryLabel,
      stats,
    },
  }
}

export const caseStudies = buildMarkdownCollection(markdownFiles, '/case-studies')
  .map(normalizeCaseStudy)
export const latestCaseStudy = caseStudies[0] || null
