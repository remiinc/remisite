import { buildMarkdownCollection } from './markdown-content'
import { resolveSolutionTool } from './solution-tools'

const markdownFiles = import.meta.glob('../content/solutions/*.md', {
  query: '?raw',
  import: 'default',
  eager: true,
})

const normalizeWorkflow = (workflow) =>
  (Array.isArray(workflow) ? workflow : []).map((step) => {
    const key = String(step?.tool || '')
    const tool = resolveSolutionTool(key)

    return {
      key,
      name: tool?.name || '',
      iconUrl: tool?.iconUrl || '',
      action: String(step?.action || ''),
    }
  })

const normalizeIntegrations = (integrations) => {
  if (!integrations || typeof integrations !== 'object') return null

  return {
    title: String(integrations.title || ''),
    description: String(integrations.description || ''),
    tools: (Array.isArray(integrations.tools) ? integrations.tools : []).map((entry) => {
      const key = String(entry?.tool || '')
      const tool = resolveSolutionTool(key)

      return {
        key,
        name: tool?.name || '',
        iconUrl: tool?.iconUrl || '',
        docsUrl: tool?.docsUrl || '',
        title: String(entry?.title || ''),
        description: String(entry?.description || ''),
      }
    }),
  }
}

const normalizeFeature = (feature) => {
  if (!feature || typeof feature !== 'object') return null

  return {
    title: String(feature.title || ''),
    imageUrl: String(feature.imageUrl || ''),
    imageAlt: String(feature.imageAlt || ''),
    ctaLabel: String(feature.ctaLabel || ''),
    ctaUrl: String(feature.ctaUrl || ''),
  }
}

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
      workflow: normalizeWorkflow(useCase?.workflow),
      thread: normalizeThread(useCase?.thread),
    }))
    .filter((useCase) => useCase.title && useCase.description)

const normalizeUseCaseCatalog = (catalog) => {
  if (!catalog || typeof catalog !== 'object') return null

  return {
    title: String(catalog.title || ''),
    description: String(catalog.description || ''),
    categories: (Array.isArray(catalog.categories) ? catalog.categories : []).map((category) => ({
      title: String(category?.title || ''),
      items: (Array.isArray(category?.items) ? category.items : []).map((item) => ({
        title: String(item?.title || ''),
        description: String(item?.description || ''),
      })),
    })),
  }
}

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
  const testimonialFields = [
    metadata.testimonialQuote,
    metadata.testimonialName,
    metadata.testimonialPosition,
    metadata.testimonialCompanyType,
  ]
  const testimonial = testimonialFields.some(Boolean)
    ? {
        quote: String(metadata.testimonialQuote || ''),
        name: String(metadata.testimonialName || ''),
        position: String(metadata.testimonialPosition || ''),
        companyType: String(metadata.testimonialCompanyType || ''),
        placeholder: metadata.testimonialPlaceholder === true,
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
    useCasesTitle: metadata.useCasesTitle || '',
    stats: normalizeStats(metadata.stats),
    useCases: normalizeUseCases(metadata.useCases),
    useCaseCatalog: normalizeUseCaseCatalog(metadata.useCaseCatalog),
    integrations: normalizeIntegrations(metadata.integrations),
    feature: normalizeFeature(metadata.feature),
    testimonial,
  }
}

const validateSolution = (solution) => {
  const errors = []

  if (!solution.metadata.title) errors.push('title')
  if (!solution.metadata.description) errors.push('description')
  if (!solution.industryLabel) errors.push('industryLabel')
  if (!solution.heroMessage) errors.push('heroMessage')
  if (!solution.useCasesTitle) errors.push('useCasesTitle')
  if (solution.order < 1) errors.push('a positive order')
  if (solution.stats.length !== 3) errors.push('exactly three stats')
  if (solution.useCases.length !== 3) errors.push('exactly three use cases')
  if (solution.useCases.some((useCase) => !isValidThread(useCase.thread))) {
    errors.push('a valid 3-6 message thread for every use case')
  }
  if (solution.useCases.some((useCase) => (
    useCase.workflow.length < 4
    || useCase.workflow.length > 6
    || useCase.workflow.some((step) => !step.name || !step.iconUrl || !step.action)
    || !useCase.workflow.some((step) => step.key === 'messages')
  ))) {
    errors.push('a valid 4-6 step workflow with a Messages handoff for every use case')
  }
  if (!solution.useCaseCatalog?.title || !solution.useCaseCatalog?.description) {
    errors.push('use case catalog title and description')
  }
  if (solution.useCaseCatalog?.categories.length !== 4) {
    errors.push('exactly four use case catalog categories')
  }
  if (solution.useCaseCatalog?.categories.some((category) => (
    !category.title
    || category.items.length !== 4
    || category.items.some((item) => !item.title || !item.description)
  ))) {
    errors.push('four complete items in every use case catalog category')
  }
  if (
    solution.useCaseCatalog
    && new Set(solution.useCaseCatalog.categories.map((category) => category.title)).size
      !== solution.useCaseCatalog.categories.length
  ) {
    errors.push('unique use case catalog category titles')
  }
  if (solution.useCaseCatalog) {
    const catalogItemTitles = solution.useCaseCatalog.categories.flatMap((category) => (
      category.items.map((item) => item.title)
    ))

    if (new Set(catalogItemTitles).size !== catalogItemTitles.length) {
      errors.push('unique use case catalog item titles')
    }
  }
  if (!solution.integrations?.title || !solution.integrations?.description) {
    errors.push('integration section title and description')
  }
  if (solution.integrations?.tools.length !== 5) {
    errors.push('exactly five integration tools')
  }
  if (solution.integrations?.tools.some((tool) => (
    !tool.key
    || !tool.name
    || !tool.iconUrl
    || !tool.docsUrl
    || !tool.title
    || !tool.description
  ))) {
    errors.push('recognized integration tools with complete copy')
  }
  if (
    solution.integrations
    && new Set(solution.integrations.tools.map((tool) => tool.key)).size !== solution.integrations.tools.length
  ) {
    errors.push('unique integration tools')
  }
  if (solution.feature && (
    !solution.feature.title
    || !solution.feature.imageUrl
    || !solution.feature.imageAlt
    || !solution.feature.ctaLabel
    || !solution.feature.ctaUrl
  )) {
    errors.push('complete optional feature content')
  }
  if (solution.testimonial && (
    !solution.testimonial.quote
    || !solution.testimonial.name
    || !solution.testimonial.position
    || !solution.testimonial.companyType
  )) {
    errors.push('complete optional testimonial content')
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

if (new Set(normalizedSolutions.map((solution) => solution.useCaseCatalog.title)).size !== normalizedSolutions.length) {
  throw new Error('Solution use case catalog titles must be unique')
}

if (
  new Set(normalizedSolutions.map((solution) => solution.useCaseCatalog.description)).size
    !== normalizedSolutions.length
) {
  throw new Error('Solution use case catalog descriptions must be unique')
}

if (normalizedSolutions.reduce((total, solution) => total + solution.integrations.tools.length, 0) !== 50) {
  throw new Error('Expected 50 solution integration entries')
}

if (normalizedSolutions.reduce((total, solution) => (
  total + solution.useCaseCatalog.categories.reduce((categoryTotal, category) => (
    categoryTotal + category.items.length
  ), 0)
), 0) !== 160) {
  throw new Error('Expected 160 solution catalog use cases')
}

export const solutions = normalizedSolutions

export const getSolutionBySlug = (slug) =>
  solutions.find((solution) => solution.slug === slug) || null
