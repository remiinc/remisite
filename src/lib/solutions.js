import { buildMarkdownCollection } from './markdown-content'

const markdownFiles = import.meta.glob('../content/solutions/*.md', {
  query: '?raw',
  import: 'default',
  eager: true,
})

const normalizeStats = (stats) =>
  (Array.isArray(stats) ? stats : [])
    .map((stat) => ({
      metric: stat?.metric || '',
      label: stat?.label || '',
      sourceLabel: stat?.sourceLabel || '',
      sourceUrl: stat?.sourceUrl || '',
    }))
    .filter((stat) => stat.metric && stat.label)

const normalizeUseCases = (useCases) =>
  (Array.isArray(useCases) ? useCases : [])
    .map((useCase) => ({
      title: useCase?.title || '',
      description: useCase?.description || '',
      imageUrl: useCase?.imageUrl || '',
      imageAlt: useCase?.imageAlt || '',
    }))
    .filter((useCase) => useCase.title && useCase.description)

const normalizeSolution = (entry) => {
  const { metadata } = entry
  const testimonial = metadata.testimonialQuote && metadata.testimonialAuthor
    ? {
        quote: metadata.testimonialQuote,
        author: metadata.testimonialAuthor,
        role: metadata.testimonialRole || '',
      }
    : null

  return {
    ...entry,
    industryLabel: metadata.industryLabel || '',
    order: Number(metadata.order) || 0,
    heroMessage: metadata.heroMessage || '',
    heroImageUrl: metadata.heroImageUrl || '',
    heroImageAlt: metadata.heroImageAlt || '',
    thumbnailImageUrl: metadata.thumbnailImageUrl || '',
    thumbnailImageAlt: metadata.thumbnailImageAlt || '',
    stats: normalizeStats(metadata.stats),
    useCases: normalizeUseCases(metadata.useCases),
    testimonial,
  }
}

const validateSolution = (solution) => {
  const errors = []

  if (!solution.metadata.title) errors.push('title')
  if (!solution.metadata.description) errors.push('description')
  if (!solution.industryLabel) errors.push('industryLabel')
  if (!solution.heroMessage) errors.push('heroMessage')
  if (solution.order < 1) errors.push('a positive order')
  if (solution.stats.length !== 3) errors.push('exactly three stats')
  if (solution.useCases.length !== 3) errors.push('exactly three use cases')
  if (solution.stats.some((stat) => !stat.sourceLabel || !stat.sourceUrl)) {
    errors.push('a source label and URL for every stat')
  }

  if (errors.length) {
    throw new Error(`Invalid solution guide "${solution.slug}": missing ${errors.join(', ')}`)
  }

  return solution
}

const normalizedSolutions = buildMarkdownCollection(markdownFiles, '/solutions')
  .map(normalizeSolution)
  .map(validateSolution)
  .sort((solutionA, solutionB) => solutionA.order - solutionB.order)

if (normalizedSolutions.length !== 10) {
  throw new Error(`Expected 10 solution guides, found ${normalizedSolutions.length}`)
}

if (new Set(normalizedSolutions.map((solution) => solution.order)).size !== normalizedSolutions.length) {
  throw new Error('Solution guide order values must be unique')
}

export const solutions = normalizedSolutions

export const getSolutionBySlug = (slug) =>
  solutions.find((solution) => solution.slug === slug) || null
