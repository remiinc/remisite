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

const normalizeDocumentPreview = (documentPreview) => {
  if (typeof documentPreview === 'string') {
    return documentPreview ? { label: documentPreview } : null
  }

  if (documentPreview && typeof documentPreview === 'object') {
    return documentPreview.label ? { label: String(documentPreview.label) } : null
  }

  return null
}

const normalizeThread = (thread) => {
  if (!thread || typeof thread !== 'object') return null

  return {
    time: thread.time ? String(thread.time) : '09:42',
    messages: (Array.isArray(thread.messages) ? thread.messages : []).map((message) => ({
      variant: message?.variant || '',
      text: message?.text || '',
      quickActions: (Array.isArray(message?.quickActions) ? message.quickActions : []).map(String),
      documentPreview: normalizeDocumentPreview(message?.documentPreview),
    })),
  }
}

const normalizeUseCases = (useCases) =>
  (Array.isArray(useCases) ? useCases : [])
    .map((useCase) => ({
      title: useCase?.title || '',
      description: useCase?.description || '',
      imageUrl: useCase?.imageUrl || '',
      imageAlt: useCase?.imageAlt || '',
      thread: normalizeThread(useCase?.thread),
    }))
    .filter((useCase) => useCase.title && useCase.description)

const isValidThread = (thread) => {
  if (!thread || thread.messages.length < 3 || thread.messages.length > 6) return false

  return thread.messages.every((message) => (
    ['incoming', 'outgoing'].includes(message.variant)
    && Boolean(message.text)
    && message.quickActions.every((action) => ['notes', 'reminders'].includes(action))
    && (!message.documentPreview || Boolean(message.documentPreview.label))
  ))
}

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
  if (solution.useCases.some((useCase) => !isValidThread(useCase.thread))) {
    errors.push('a valid 3-6 message thread for every use case')
  }
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
