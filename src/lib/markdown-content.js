const htmlEntities = {
  '&': '&amp;',
  '<': '&lt;',
  '>': '&gt;',
  '"': '&quot;',
  "'": '&#39;',
}

const escapeHtml = (value = '') =>
  String(value).replace(/[&<>"']/g, (character) => htmlEntities[character])

const normalizeFrontmatterValue = (value) => {
  const trimmed = value.trim()

  if (
    (trimmed.startsWith('{') && trimmed.endsWith('}')) ||
    (trimmed.startsWith('[') && trimmed.endsWith(']'))
  ) {
    try {
      return JSON.parse(trimmed)
    } catch {
      // Fall back to the lightweight parsing below for non-JSON frontmatter.
    }
  }

  if (trimmed.startsWith('[') && trimmed.endsWith(']')) {
    return trimmed
      .slice(1, -1)
      .split(',')
      .map((item) => normalizeFrontmatterValue(item))
      .filter(Boolean)
  }

  return trimmed.replace(/^["']|["']$/g, '')
}

const parseNestedFrontmatterList = (lines) => {
  const items = []
  let currentItem = null

  const pushCurrentItem = () => {
    if (currentItem === null) {
      return
    }

    items.push(currentItem)
    currentItem = null
  }

  lines.forEach((line) => {
    const trimmed = line.trim()

    if (!trimmed || trimmed.startsWith('#')) {
      return
    }

    if (trimmed.startsWith('- ')) {
      pushCurrentItem()

      const itemValue = trimmed.slice(2).trim()
      const separatorIndex = itemValue.indexOf(':')

      if (separatorIndex === -1) {
        currentItem = normalizeFrontmatterValue(itemValue)
        return
      }

      currentItem = {}
      const key = itemValue.slice(0, separatorIndex).trim()
      const value = itemValue.slice(separatorIndex + 1)

      currentItem[key] = normalizeFrontmatterValue(value)
      return
    }

    if (currentItem && typeof currentItem === 'object' && !Array.isArray(currentItem)) {
      const separatorIndex = trimmed.indexOf(':')

      if (separatorIndex === -1) {
        return
      }

      const key = trimmed.slice(0, separatorIndex).trim()
      const value = trimmed.slice(separatorIndex + 1)

      currentItem[key] = normalizeFrontmatterValue(value)
    }
  })

  pushCurrentItem()

  return items
}

export const parseFrontmatter = (source) => {
  const frontmatterMatch = source.match(/^---\s*\n([\s\S]*?)\n---\s*(?:\n|$)/)

  if (!frontmatterMatch) {
    return {
      metadata: {},
      markdown: source.trim(),
    }
  }

  const lines = frontmatterMatch[1].split('\n')
  const metadata = {}

  for (let index = 0; index < lines.length; index += 1) {
    const line = lines[index]
    const trimmed = line.trim()
    const separatorIndex = trimmed.indexOf(':')

    if (!trimmed || trimmed.startsWith('#') || separatorIndex === -1) {
      continue
    }

    const key = trimmed.slice(0, separatorIndex).trim()
    const value = trimmed.slice(separatorIndex + 1)

    if (value.trim()) {
      metadata[key] = normalizeFrontmatterValue(value)
      continue
    }

    const nestedLines = []

    while (index + 1 < lines.length) {
      const nextLine = lines[index + 1]

      if (nextLine.trim() && !/^\s/.test(nextLine)) {
        break
      }

      index += 1
      nestedLines.push(nextLine)
    }

    metadata[key] = parseNestedFrontmatterList(nestedLines)
  }

  return {
    metadata,
    markdown: source.slice(frontmatterMatch[0].length).trim(),
  }
}

const parseInlineMarkdown = (source) => {
  const escaped = escapeHtml(source)

  return escaped
    .replace(/!\[([^\]]*)\]\(([^)]+)\)/g, (_, alt, src) => {
      const imageSrc = src.trim()

      return `<img src="${imageSrc}" alt="${alt}" loading="lazy">`
    })
    .replace(/\[([^\]]+)\]\(([^)]+)\)/g, (_, label, href) => {
      const linkHref = href.trim()
      const externalAttributes = /^https?:\/\//.test(linkHref)
        ? ' target="_blank" rel="noreferrer"'
        : ''

      return `<a href="${linkHref}"${externalAttributes}>${label}</a>`
    })
    .replace(/`([^`]+)`/g, '<code>$1</code>')
    .replace(/\*\*([^*]+)\*\*/g, '<strong>$1</strong>')
    .replace(/\*([^*]+)\*/g, '<em>$1</em>')
}

const stripMarkdown = (source) =>
  source
    .replace(/!\[([^\]]*)\]\([^)]+\)/g, '$1')
    .replace(/\[([^\]]+)\]\([^)]+\)/g, '$1')
    .replace(/[`*_]/g, '')
    .trim()

const slugifyHeading = (source) => {
  const normalized = stripMarkdown(source)
    .toLowerCase()
    .replace(/&/g, ' and ')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')

  return normalized || 'section'
}

const uniqueHeadingId = (source, counts) => {
  const slug = slugifyHeading(source)
  const nextCount = (counts.get(slug) || 0) + 1

  counts.set(slug, nextCount)

  return nextCount === 1 ? slug : `${slug}-${nextCount}`
}

export const renderMarkdown = (markdown) => {
  const lines = markdown.replace(/\r\n/g, '\n').split('\n')
  const html = []
  const toc = []
  const headingCounts = new Map()
  let paragraphLines = []
  let unorderedItems = []
  let orderedItems = []
  let quoteLines = []
  let tableLines = []

  const flushParagraph = () => {
    if (!paragraphLines.length) {
      return
    }

    html.push(`<p>${parseInlineMarkdown(paragraphLines.join(' '))}</p>`)
    paragraphLines = []
  }

  const flushLists = () => {
    if (unorderedItems.length) {
      html.push(`<ul>${unorderedItems.map((item) => `<li>${item}</li>`).join('')}</ul>`)
      unorderedItems = []
    }

    if (orderedItems.length) {
      html.push(`<ol>${orderedItems.map((item) => `<li>${item}</li>`).join('')}</ol>`)
      orderedItems = []
    }
  }

  const flushTable = () => {
    if (!tableLines.length) {
      return
    }

    const parseRow = (line) =>
      line
        .replace(/^\|/, '')
        .replace(/\|$/, '')
        .split('|')
        .map((cell) => cell.trim())

    const isSeparatorRow = (cells) => cells.every((cell) => /^:?-{3,}:?$/.test(cell))

    const rows = tableLines.map(parseRow)
    const hasHeader = rows.length > 1 && isSeparatorRow(rows[1])
    const headerCells = hasHeader ? rows[0] : []
    const bodyRows = hasHeader ? rows.slice(2) : rows

    const head = hasHeader
      ? `<thead><tr>${headerCells.map((cell) => `<th>${parseInlineMarkdown(cell)}</th>`).join('')}</tr></thead>`
      : ''
    const body = `<tbody>${bodyRows
      .map((row) => `<tr>${row.map((cell) => `<td>${parseInlineMarkdown(cell)}</td>`).join('')}</tr>`)
      .join('')}</tbody>`

    html.push(`<div class="table-wrap"><table>${head}${body}</table></div>`)
    tableLines = []
  }

  const flushQuotes = () => {
    if (!quoteLines.length) {
      return
    }

    const citationMatch = quoteLines[quoteLines.length - 1].match(/^-\s+(.+)$/)
    const quoteTextLines = citationMatch ? quoteLines.slice(0, -1) : quoteLines
    const quoteBody = quoteTextLines
      .filter(Boolean)
      .map((item) => `<p>${parseInlineMarkdown(item)}</p>`)
      .join('')
    const citation = citationMatch
      ? `<cite>${parseInlineMarkdown(citationMatch[1])}</cite>`
      : ''

    html.push(`<blockquote>${quoteBody}${citation}</blockquote>`)
    quoteLines = []
  }

  lines.forEach((line) => {
    const trimmed = line.trim()

    if (!trimmed) {
      flushParagraph()
      flushLists()
      flushQuotes()
      flushTable()
      return
    }

    const isTableLine = trimmed.startsWith('|') && trimmed.endsWith('|') && trimmed.length > 2

    if (isTableLine) {
      flushParagraph()
      flushLists()
      flushQuotes()
      tableLines.push(trimmed)
      return
    }

    flushTable()

    const headingMatch = trimmed.match(/^(#{1,3})\s+(.+)$/)
    const unorderedMatch = trimmed.match(/^[-*]\s+(.+)$/)
    const orderedMatch = trimmed.match(/^\d+\.\s+(.+)$/)
    const imageMatch = trimmed.match(/^!\[[^\]]*\]\([^)]+\)$/)
    const quoteMatch = trimmed.match(/^>\s?(.+)$/)

    if (headingMatch) {
      flushParagraph()
      flushLists()
      flushQuotes()

      const level = headingMatch[1].length
      const title = stripMarkdown(headingMatch[2])
      const id = uniqueHeadingId(headingMatch[2], headingCounts)

      toc.push({ id, level, title })
      html.push(`<h${level} id="${id}">${parseInlineMarkdown(headingMatch[2])}</h${level}>`)
      return
    }

    if (unorderedMatch) {
      flushParagraph()
      flushQuotes()
      if (orderedItems.length) {
        flushLists()
      }
      unorderedItems.push(parseInlineMarkdown(unorderedMatch[1]))
      return
    }

    if (orderedMatch) {
      flushParagraph()
      flushQuotes()
      if (unorderedItems.length) {
        flushLists()
      }
      orderedItems.push(parseInlineMarkdown(orderedMatch[1]))
      return
    }

    if (imageMatch) {
      flushParagraph()
      flushLists()
      flushQuotes()
      html.push(`<figure>${parseInlineMarkdown(trimmed)}</figure>`)
      return
    }

    if (quoteMatch) {
      flushParagraph()
      flushLists()
      quoteLines.push(quoteMatch[1])
      return
    }

    flushQuotes()
    paragraphLines.push(trimmed)
  })

  flushParagraph()
  flushLists()
  flushQuotes()
  flushTable()

  return {
    html: html.join('\n'),
    toc,
  }
}

const titleFromSlug = (slug) =>
  slug
    .split('-')
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ')

export const formatDate = (value) => {
  if (!value) {
    return ''
  }

  const date = new Date(`${value}T00:00:00`)

  if (Number.isNaN(date.getTime())) {
    return value
  }

  return new Intl.DateTimeFormat('en', {
    month: 'long',
    day: 'numeric',
    year: 'numeric',
  }).format(date)
}

export const buildMarkdownCollection = (markdownFiles, basePath) =>
  Object.entries(markdownFiles)
    .map(([filePath, markdown]) => {
      const slug = filePath.split('/').pop().replace(/\.md$/, '')
      const { metadata, markdown: content } = parseFrontmatter(markdown)
      const rendered = renderMarkdown(content)
      const title = metadata.title || titleFromSlug(slug)
      const description = metadata.description || metadata.ogDescription || ''
      const date = metadata.datePublished || metadata.date || ''

      return {
        slug,
        path: `${basePath}/${slug}`,
        title,
        description,
        date,
        formattedDate: formatDate(date),
        metadata,
        html: rendered.html,
        toc: rendered.toc,
      }
    })
    .sort((entryA, entryB) => new Date(entryB.date) - new Date(entryA.date))
