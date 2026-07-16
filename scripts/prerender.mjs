// Post-build prerender for content routes. Emits static HTML for blog and
// solution pages so crawlers and answer engines see the full page content
// without executing JS. The Vue app still mounts on #app and takes over.
//
// Also generates sitemap.xml and rss.xml. Runs as part of `npm run build`.

import { mkdirSync, readFileSync, readdirSync, writeFileSync } from 'node:fs'
import { dirname, join } from 'node:path'
import { fileURLToPath } from 'node:url'
import { formatDate, parseFrontmatter, renderMarkdown } from '../src/lib/markdown-content.js'
import { getFaqGroup } from '../src/lib/faqs.js'
import { legacySolutionRedirects } from '../src/lib/solution-redirects.js'
import { resolveSolutionTool } from '../src/lib/solution-tools.js'
import { REMI_TEXT_HREF, REMI_TEXT_NUMBER_DISPLAY } from '../src/lib/start-contact.js'

const root = join(dirname(fileURLToPath(import.meta.url)), '..')
const distDir = join(root, 'dist')
const SITE = 'https://remi.new'

const template = readFileSync(join(distDir, 'index.html'), 'utf8')
const startQrSvg = readFileSync(join(root, 'public/images/start/text-remi-qr.svg'), 'utf8')

const escapeHtml = (value = '') =>
  String(value)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')

const escapeXml = escapeHtml

const faqBody = (type) => {
  const group = getFaqGroup(type)
  if (!group) return ''

  return `<section class="mx-auto w-full" style="max-width: 72rem">
    <h2>${escapeHtml(group.title)}</h2>
    <dl>
      ${group.items
        .map((faq) => `<div>
        <dt>${escapeHtml(faq.question)}</dt>
        <dd>${faq.answers.map((answer) => `<p>${escapeHtml(answer)}</p>`).join('')}</dd>
      </div>`)
        .join('\n      ')}
    </dl>
  </section>`
}

const loadCollection = (contentDir, basePath, { requiresDate = true, sortBy = 'date' } = {}) =>
  readdirSync(join(root, contentDir))
    .filter((file) => file.endsWith('.md'))
    .map((file) => {
      const source = readFileSync(join(root, contentDir, file), 'utf8')
      const slug = file.replace(/\.md$/, '')
      const { metadata, markdown } = parseFrontmatter(source)
      const rendered = renderMarkdown(markdown)
      const date = metadata.datePublished || metadata.date || ''

      return {
        slug,
        path: `${basePath}/${slug}`,
        url: `${SITE}${basePath}/${slug}`,
        title: metadata.title || slug,
        description: metadata.description || metadata.ogDescription || '',
        date,
        formattedDate: formatDate(date),
        metadata,
        html: rendered.html,
      }
    })
    .filter((entry) => !requiresDate || (entry.date && entry.date !== 'DRAFT'))
    .sort((entryA, entryB) => {
      if (sortBy === 'order') {
        return (Number(entryA.metadata.order) || 0) - (Number(entryB.metadata.order) || 0)
      }

      return new Date(entryB.date) - new Date(entryA.date)
    })

const posts = loadCollection('src/content/resources', '/resources')
const solutions = loadCollection('src/content/solutions', '/solutions', {
  requiresDate: false,
  sortBy: 'order',
})

if (solutions.length !== 10) {
  throw new Error(`Expected 10 solution guides, found ${solutions.length}`)
}

if (new Set(solutions.map((solution) => Number(solution.metadata.order))).size !== solutions.length) {
  throw new Error('Solution guide order values must be unique')
}

if (new Set(solutions.map((solution) => solution.metadata.useCaseCatalog?.title)).size !== solutions.length) {
  throw new Error('Solution use case catalog titles must be unique')
}

if (new Set(solutions.map((solution) => solution.metadata.useCaseCatalog?.description)).size !== solutions.length) {
  throw new Error('Solution use case catalog descriptions must be unique')
}

solutions.forEach((solution) => {
  const errors = []
  const stats = Array.isArray(solution.metadata.stats) ? solution.metadata.stats : []
  const useCases = Array.isArray(solution.metadata.useCases) ? solution.metadata.useCases : []
  const useCaseCatalog = solution.metadata.useCaseCatalog
  const useCaseCatalogCategories = Array.isArray(useCaseCatalog?.categories) ? useCaseCatalog.categories : []
  const useCaseCatalogItems = useCaseCatalogCategories.flatMap((category) => (
    Array.isArray(category?.items) ? category.items : []
  ))
  const integrations = solution.metadata.integrations
  const integrationTools = Array.isArray(integrations?.tools) ? integrations.tools : []
  const feature = solution.metadata.feature
  const testimonialFields = [
    solution.metadata.testimonialQuote,
    solution.metadata.testimonialName,
    solution.metadata.testimonialPosition,
    solution.metadata.testimonialCompanyType,
  ]

  if (!solution.metadata.title) errors.push('title')
  if (!solution.metadata.description) errors.push('description')
  if (!solution.metadata.industryLabel) errors.push('industryLabel')
  if (!solution.metadata.useCasesTitle) errors.push('useCasesTitle')
  if ((Number(solution.metadata.order) || 0) < 1) errors.push('a positive order')
  if (stats.length !== 3) errors.push('exactly three stats')
  if (useCases.length !== 3) errors.push('exactly three use cases')
  if (!useCaseCatalog?.title || !useCaseCatalog?.description) {
    errors.push('use case catalog title and description')
  }
  if (useCaseCatalogCategories.length !== 4) {
    errors.push('exactly four use case catalog categories')
  }
  if (useCaseCatalogCategories.some((category) => (
    !category?.title
    || !Array.isArray(category.items)
    || category.items.length !== 4
    || category.items.some((item) => !item?.title || !item?.description)
  ))) {
    errors.push('four complete items in every use case catalog category')
  }
  if (new Set(useCaseCatalogCategories.map((category) => category?.title)).size !== useCaseCatalogCategories.length) {
    errors.push('unique use case catalog category titles')
  }
  if (new Set(useCaseCatalogItems.map((item) => item?.title)).size !== useCaseCatalogItems.length) {
    errors.push('unique use case catalog item titles')
  }
  if (!integrations?.title || !integrations?.description) {
    errors.push('integration section title and description')
  }
  if (integrationTools.length !== 5) errors.push('exactly five integration tools')
  if (new Set(integrationTools.map((tool) => tool?.tool)).size !== integrationTools.length) {
    errors.push('unique integration tools')
  }
  if (integrationTools.some((entry) => {
    const tool = resolveSolutionTool(entry?.tool)
    return !tool?.docsUrl || !tool?.iconUrl || !entry?.title || !entry?.description
  })) {
    errors.push('recognized integration tools with complete copy')
  }
  if (feature && (
    !feature.title
    || !feature.imageUrl
    || !feature.imageAlt
    || !feature.ctaLabel
    || !feature.ctaUrl
  )) {
    errors.push('complete optional feature content')
  }
  if (testimonialFields.some(Boolean) && testimonialFields.some((value) => !value)) {
    errors.push('complete optional testimonial content')
  }
  if (stats.some((stat) => !stat.sourceLabel || !stat.sourceUrl)) {
    errors.push('source labels and URLs for every stat')
  }

  if (errors.length) {
    throw new Error(`Invalid solution guide "${solution.slug}": missing ${errors.join(', ')}`)
  }
})

const solutionCatalogItemCount = solutions.reduce((total, solution) => (
  total + solution.metadata.useCaseCatalog.categories.reduce((categoryTotal, category) => (
    categoryTotal + category.items.length
  ), 0)
), 0)

if (solutionCatalogItemCount !== 160) {
  throw new Error(`Expected 160 solution catalog use cases, found ${solutionCatalogItemCount}`)
}

const setHead = (html, { title, description, url, ogType, ogImage, jsonLd = [] }) => {
  let output = html

  const fullImage = ogImage && ogImage.startsWith('http') ? ogImage : ogImage ? `${SITE}${ogImage}` : ''

  output = output.replace(/<title>[\s\S]*?<\/title>/, `<title>${escapeHtml(title)}</title>`)
  output = output.replace(
    /(<meta\s[^>]*name="description"[^>]*content=")[^"]*(")/,
    `$1${escapeHtml(description)}$2`,
  )
  output = output.replace(/(<link\s[^>]*rel="canonical"[^>]*href=")[^"]*(")/, `$1${url}$2`)

  const propertyReplacements = {
    'og:type': ogType,
    'og:url': url,
    'og:title': title,
    'og:description': description,
  }

  Object.entries(propertyReplacements).forEach(([property, content]) => {
    if (!content) {
      return
    }

    output = output.replace(
      new RegExp(`(<meta\\s[^>]*property="${property}"[^>]*content=")[^"]*(")`),
      `$1${escapeHtml(content)}$2`,
    )
  })

  const nameReplacements = {
    'twitter:url': url,
    'twitter:title': title,
    'twitter:description': description,
  }

  Object.entries(nameReplacements).forEach(([name, content]) => {
    output = output.replace(
      new RegExp(`(<meta\\s[^>]*name="${name}"[^>]*content=")[^"]*(")`),
      `$1${escapeHtml(content)}$2`,
    )
  })

  if (fullImage) {
    output = output
      .replace(/(<meta\s[^>]*property="og:image"[^>]*content=")[^"]*(")/, `$1${fullImage}$2`)
      .replace(/(<meta\s[^>]*property="og:image:secure_url"[^>]*content=")[^"]*(")/, `$1${fullImage}$2`)
      .replace(/(<meta\s[^>]*name="twitter:image"[^>]*content=")[^"]*(")/, `$1${fullImage}$2`)
  }

  const jsonLdTags = jsonLd
    .map((schema) => `<script type="application/ld+json">${JSON.stringify(schema)}</script>`)
    .join('\n    ')

  if (jsonLdTags) {
    output = output.replace('</head>', `    ${jsonLdTags}\n  </head>`)
  }

  return output
}

const injectBody = (html, staticBody) =>
  html.replace(
    /(<div id="app"[^>]*>)(<\/div>)/,
    `$1${staticBody}$2`,
  )

const writePage = (routePath, html) => {
  const outDir = join(distDir, ...routePath.split('/').filter(Boolean))
  mkdirSync(outDir, { recursive: true })
  writeFileSync(join(outDir, 'index.html'), html)
}

const articleSchema = (entry) => ({
  '@context': 'https://schema.org',
  '@type': 'BlogPosting',
  headline: entry.title,
  description: entry.description,
  datePublished: entry.date,
  dateModified: entry.metadata.dateModified || entry.date,
  author: {
    '@type': 'Person',
    name: entry.metadata.author || 'Remi Team',
    url: `${SITE}/`,
  },
  publisher: {
    '@type': 'Organization',
    name: 'Remi',
    url: `${SITE}/`,
    logo: { '@type': 'ImageObject', url: `${SITE}/icon-512.png` },
  },
  image: entry.metadata.ogImage
    ? entry.metadata.ogImage.startsWith('http')
      ? entry.metadata.ogImage
      : `${SITE}${entry.metadata.ogImage}`
    : `${SITE}/images/og-image.png`,
  mainEntityOfPage: entry.url,
})

const faqSchema = (entry) => {
  const faq = Array.isArray(entry.metadata.faq) ? entry.metadata.faq : []
  const valid = faq.filter((item) => item && typeof item === 'object' && item.q && item.a)

  if (!valid.length) {
    return null
  }

  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: valid.map((item) => ({
      '@type': 'Question',
      name: item.q,
      acceptedAnswer: { '@type': 'Answer', text: item.a },
    })),
  }
}

const solutionSchema = (entry) => ({
  '@context': 'https://schema.org',
  '@type': 'WebPage',
  name: entry.metadata.ogTitle || `Remi for ${entry.metadata.industryLabel}`,
  description: entry.description,
  url: entry.url,
  about: {
    '@type': 'Service',
    name: `Remi for ${entry.metadata.industryLabel}`,
    provider: {
      '@type': 'Organization',
      name: 'Remi',
      url: `${SITE}/`,
    },
  },
})

const articleBody = (entry, sectionLabel) => `
<main class="px-6 pt-32 pb-20">
  <article class="mx-auto w-full" style="max-width: 44rem">
    <p>${escapeHtml(entry.metadata.category || sectionLabel)} · <time datetime="${entry.date}">${entry.formattedDate}</time>${entry.metadata.author ? ` · ${escapeHtml(entry.metadata.author)}` : ''}</p>
    <h1>${escapeHtml(entry.title)}</h1>
    <p>${escapeHtml(entry.description)}</p>
    ${entry.html}
    <p><a href="https://remi.new/login">See what's slipping through your inbox. Get started with Remi.</a></p>
  </article>
</main>`

const indexBody = (label, description, entries) => `
<main class="px-6 pt-32 pb-20">
  <section class="mx-auto w-full" style="max-width: 44rem">
    <h1>${escapeHtml(label)}</h1>
    <p>${escapeHtml(description)}</p>
    <ul>
      ${entries
        .map(
          (entry) =>
            `<li><a href="${entry.path}">${escapeHtml(entry.title)}</a> · <time datetime="${entry.date}">${entry.formattedDate}</time><br>${escapeHtml(entry.description)}</li>`,
        )
        .join('\n      ')}
    </ul>
  </section>
</main>`

const solutionBody = (entry) => {
  const stats = entry.metadata.stats
  const useCases = entry.metadata.useCases
  const useCaseCatalog = entry.metadata.useCaseCatalog
  const integrations = entry.metadata.integrations
  const feature = entry.metadata.feature
  const hasTestimonial = entry.metadata.testimonialQuote
    && entry.metadata.testimonialName
    && entry.metadata.testimonialPosition
    && entry.metadata.testimonialCompanyType

  return `
<main class="px-6 pt-32 pb-20">
  <section class="mx-auto w-full text-center" style="max-width: 64rem">
    <p>Solutions / ${escapeHtml(entry.metadata.industryLabel)}</p>
    <h1>${escapeHtml(entry.title)}</h1>
    <p>${escapeHtml(entry.description)}</p>
    <p><a href="https://remi.new/login">Book a demo</a></p>
  </section>
  <section class="mx-auto w-full" style="max-width: 72rem">
    <p>Use cases</p>
    <h2>${escapeHtml(useCaseCatalog.title)}</h2>
    <p>${escapeHtml(useCaseCatalog.description)}</p>
    ${useCaseCatalog.categories
      .map(
        (category) => `<section>
      <h3>${escapeHtml(category.title)}</h3>
      <ul>
        ${category.items
          .map(
            (item) => `<li>
          <h4>${escapeHtml(item.title)}</h4>
          <p>${escapeHtml(item.description)}</p>
        </li>`,
          )
          .join('\n        ')}
      </ul>
    </section>`,
      )
      .join('\n    ')}
  </section>
  <section class="mx-auto w-full" style="max-width: 72rem">
    <h2>Remi for ${escapeHtml(entry.metadata.industryLabel)}:</h2>
    <dl>
      ${stats
        .map(
          (stat) => `<div>
        <dt>${escapeHtml(stat.label)}</dt>
        <dd>${escapeHtml(stat.metric)}</dd>
        <a href="${escapeHtml(stat.sourceUrl)}">${escapeHtml(stat.sourceLabel)}</a>
      </div>`,
        )
        .join('\n      ')}
    </dl>
  </section>
  <section class="mx-auto w-full" style="max-width: 72rem">
    <h2>${escapeHtml(entry.metadata.useCasesTitle)}</h2>
    ${useCases
      .map(
        (useCase) => `<article>
      <h2>${escapeHtml(useCase.title)}</h2>
      <p>${escapeHtml(useCase.description)}</p>
    </article>`,
      )
      .join('\n    ')}
  </section>
  <section class="mx-auto w-full" style="max-width: 72rem">
    <p>Your tools, handled</p>
    <h2>${escapeHtml(integrations.title)}</h2>
    <p>${escapeHtml(integrations.description)}</p>
    <ul>
      ${integrations.tools
        .map((entry) => {
          const tool = resolveSolutionTool(entry.tool)
          return `<li>
        <h3>${escapeHtml(tool.name)}: ${escapeHtml(entry.title)}</h3>
        <p>${escapeHtml(entry.description)}</p>
      </li>`
        })
        .join('\n      ')}
    </ul>
    <p>Remi works inside the access you grant. Customer-facing sends and important record changes wait for your approval.</p>
  </section>
  ${feature ? `<section class="mx-auto w-full" style="max-width: 72rem">
    <img src="${escapeHtml(feature.imageUrl)}" alt="${escapeHtml(feature.imageAlt)}">
    <h2>${escapeHtml(feature.title)}</h2>
    <p><a href="${escapeHtml(feature.ctaUrl)}">${escapeHtml(feature.ctaLabel)}</a></p>
  </section>` : ''}
  ${hasTestimonial ? `<figure>
    <blockquote>${escapeHtml(entry.metadata.testimonialQuote)}</blockquote>
    <figcaption>${escapeHtml(entry.metadata.testimonialName)}, ${escapeHtml(entry.metadata.testimonialPosition)}, ${escapeHtml(entry.metadata.testimonialCompanyType)}</figcaption>
  </figure>` : ''}
  ${faqBody('solutions')}
</main>`
}

const solutionsIndexBody = () => `
<main class="px-6 pt-32 pb-20">
  <section class="mx-auto w-full" style="max-width: 72rem">
    <p>Solutions</p>
    <h1>Built for businesses with work already in motion.</h1>
    <p>See how Remi keeps customer replies, estimates, agreements, invoices, and the next decision moving in your line of work.</p>
    <ul>
      ${solutions
        .map(
          (solution) => `<li>
        <a href="${solution.path}">${escapeHtml(solution.metadata.industryLabel)}</a><br>
        ${escapeHtml(solution.title)}
      </li>`,
        )
        .join('\n      ')}
    </ul>
  </section>
  ${faqBody('solutions')}
</main>`

const redirectBody = (target) => `
<main class="px-6 pt-32 pb-20">
  <p>This page has moved. <a href="${target}">Continue to Solutions</a>.</p>
</main>`

const pricingBody = () => `
<main class="px-6 pt-32 pb-20">
  <section class="mx-auto w-full text-center" style="max-width: 44rem">
    <h1>One missed follow-up can cost more than a month of Remi.</h1>
  </section>
  <section class="mx-auto w-full" style="max-width: 44rem">
    <h2>The human plan</h2>
    <p>Hiring office help can run $45-55k a year before benefits, tools, onboarding, and the work of managing the work. Great humans are great. Hiring one just to chase loose ends is an expensive way to remember who still owes you money.</p>
    <h2>Pro</h2>
    <p>$119 per month, or $99 per month billed annually. Built for owner-run teams ready to hand Remi the daily chase list.</p>
    <h2>Scale</h2>
    <p>$239 per month, or $199 per month billed annually. Built for busier teams with more open loops, more customers, and more work in motion.</p>
    <p><a href="https://remi.new/login">Start free trial</a></p>
  </section>
  ${faqBody('pricing')}
</main>`

const securityBody = () => `
<main class="px-6 pt-32 pb-20">
  <section class="mx-auto w-full" style="max-width: 44rem">
    <p>Security</p>
    <h1>Secure by design, careful by default.</h1>
    <p>Remi can see sensitive business details. We keep that access narrow, logged, and approval-first.</p>
  </section>
  <section class="mx-auto w-full" style="max-width: 44rem">
    <h2>Permission before power.</h2>
    <p>Remi works inside the access you grant. Connections can be changed, limited, or revoked as your business changes.</p>
    <h2>Every action leaves a trail.</h2>
    <p>When Remi drafts, remembers, or prepares a next step, the source stays close so you can see where the answer came from.</p>
    <h2>Your data is not training data.</h2>
    <p>Your business data is not sold, shared for advertising, or used to train AI models.</p>
    <h2>Prepared for review.</h2>
    <p>If your team needs details for vendor review, we can walk through architecture, data handling, encryption, access, retention, and approval controls.</p>
    <p><a href="mailto:security@remi.new">Contact security</a></p>
    <h2>Serious about security?</h2>
    <p>Book a demo to see Remi in action.</p>
    <p><a href="https://remi.new/login">Book a demo</a></p>
  </section>
  ${faqBody('security')}
</main>`

const startBody = () => `
<main class="px-6 pt-32 pb-20">
  <section class="mx-auto w-full" style="max-width: 72rem">
    <h1>Your new hire is one text away.</h1>
    <p>Scan the code or open Messages to text Remi. She'll ask a few questions, learn how you work, and help you get started.</p>
    <p><a href="${escapeHtml(REMI_TEXT_HREF)}">${escapeHtml(REMI_TEXT_NUMBER_DISPLAY)}</a></p>
    <p><a href="${escapeHtml(REMI_TEXT_HREF)}">Open Messages</a></p>
    <figure>
      ${startQrSvg.replace('<svg ', `<svg role="img" aria-label="QR code to text Remi at ${escapeHtml(REMI_TEXT_NUMBER_DISPLAY)}" `)}
      <figcaption>Scan to text Remi</figcaption>
    </figure>
  </section>
</main>`

// Blog posts
const renderEntryPage = (entry, sectionLabel) => {
  const jsonLd = [articleSchema(entry)]
  const faq = faqSchema(entry)

  if (faq) {
    jsonLd.push(faq)
  }

  let page = setHead(template, {
    title: `${entry.metadata.ogTitle || entry.title} | Remi`,
    description: entry.description,
    url: entry.url,
    ogType: 'article',
    ogImage: entry.metadata.ogImage,
    jsonLd,
  })

  page = page.replace(
    '</head>',
    `    <meta property="article:published_time" content="${entry.date}" />\n  </head>`,
  )

  return injectBody(page, articleBody(entry, sectionLabel))
}

posts.forEach((post) => writePage(post.path, renderEntryPage(post, 'Blog')))

const renderSolutionPage = (entry) =>
  injectBody(
    setHead(template, {
      title: `${entry.metadata.ogTitle || `Remi for ${entry.metadata.industryLabel}`} | Remi`,
      description: entry.metadata.ogDescription || entry.description,
      url: entry.url,
      ogType: 'website',
      ogImage: entry.metadata.ogImage,
      jsonLd: [solutionSchema(entry)],
    }),
    solutionBody(entry),
  )

solutions.forEach((solution) => writePage(solution.path, renderSolutionPage(solution)))

// Index pages
writePage(
  '/resources',
  injectBody(
    setHead(template, {
      title: 'Blog | Remi',
      description:
        'Practical guides for owner-run businesses: getting paid, following up on quotes, and keeping the money side of the business moving.',
      url: `${SITE}/resources`,
      ogType: 'website',
    }),
    indexBody(
      'The Remi Blog',
      'Practical guides for owner-run businesses: getting paid, following up on quotes, and keeping the money side moving.',
      posts,
    ),
  ),
)

writePage(
  '/solutions',
  injectBody(
    setHead(template, {
      title: 'Solutions for Owner-Run Service Businesses | Remi',
      description: 'Explore how Remi helps contractors, home-service businesses, auto shops, cleaning companies, and agencies keep customer work moving.',
      url: `${SITE}/solutions`,
      ogType: 'website',
      jsonLd: [{
        '@context': 'https://schema.org',
        '@type': 'CollectionPage',
        name: 'Remi Solutions',
        description: 'Industry guides for owner-run service businesses.',
        url: `${SITE}/solutions`,
        hasPart: solutions.map((solution) => ({
          '@type': 'WebPage',
          name: solution.metadata.industryLabel,
          url: solution.url,
        })),
      }],
    }),
    solutionsIndexBody(),
  ),
)

Object.entries(legacySolutionRedirects).forEach(([from, target]) => {
  let redirectPage = setHead(template, {
    title: 'Page moved | Remi',
    description: 'Continue to Remi Solutions.',
    url: `${SITE}${target}`,
    ogType: 'website',
  })

  redirectPage = redirectPage.replace(
    '</head>',
    `    <meta http-equiv="refresh" content="0; url=${target}">\n    <script>window.location.replace(${JSON.stringify(target)})</script>\n  </head>`,
  )

  writePage(from, injectBody(redirectPage, redirectBody(target)))
})

writePage(
  '/pricing',
  injectBody(
    setHead(template, {
      title: 'Pricing | Remi',
      description:
        'Early access pricing for Remi: Pro and Scale plans for owner-run businesses that need invoices, estimates, and follow-ups to keep moving.',
      url: `${SITE}/pricing`,
      ogType: 'website',
    }),
    pricingBody(),
  ),
)

writePage(
  '/security',
  injectBody(
    setHead(template, {
      title: 'Security | Remi',
      description:
        'How Remi protects customer messages, invoices, receipts, connected-app data, and approval workflows for owner-run businesses.',
      url: `${SITE}/security`,
      ogType: 'website',
    }),
    securityBody(),
  ),
)

writePage(
  '/start',
  injectBody(
    setHead(template, {
      title: 'Text Remi to Get Started — Remi',
      description: `Text Remi at ${REMI_TEXT_NUMBER_DISPLAY} or scan the QR code to open Messages and get started.`,
      url: `${SITE}/start`,
      ogType: 'website',
      jsonLd: [{
        '@context': 'https://schema.org',
        '@type': 'WebPage',
        name: 'Text Remi to get started',
        description: 'Open Messages to text Remi and get started.',
        url: `${SITE}/start`,
      }],
    }),
    startBody(),
  ),
)

// sitemap.xml
const staticUrls = [
  { loc: `${SITE}/`, priority: '1.0' },
  { loc: `${SITE}/start`, priority: '0.9' },
  { loc: `${SITE}/pricing`, priority: '0.9' },
  { loc: `${SITE}/security`, priority: '0.8' },
  { loc: `${SITE}/resources`, priority: '0.8' },
  { loc: `${SITE}/solutions`, priority: '0.9' },
]

const contentUrls = [...posts, ...solutions].map((entry) => ({
  loc: entry.url,
  lastmod: entry.metadata.dateModified || entry.date || '',
  priority: '0.7',
}))

const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${[...staticUrls, ...contentUrls]
  .map(
    (url) =>
      `  <url><loc>${url.loc}</loc>${url.lastmod ? `<lastmod>${url.lastmod}</lastmod>` : ''}<priority>${url.priority}</priority></url>`,
  )
  .join('\n')}
</urlset>
`

writeFileSync(join(distDir, 'sitemap.xml'), sitemap)

// rss.xml
const rssItems = posts
  .map(
    (post) => `    <item>
      <title>${escapeXml(post.title)}</title>
      <link>${post.url}</link>
      <guid isPermaLink="true">${post.url}</guid>
      <pubDate>${new Date(`${post.date}T00:00:00Z`).toUTCString()}</pubDate>
      <description>${escapeXml(post.description)}</description>
    </item>`,
  )
  .join('\n')

const rss = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>The Remi Blog</title>
    <link>${SITE}/resources</link>
    <atom:link href="${SITE}/rss.xml" rel="self" type="application/rss+xml" />
    <description>Practical guides for owner-run businesses: getting paid, following up on quotes, and keeping the money side moving.</description>
    <language>en-us</language>
${rssItems}
  </channel>
</rss>
`

writeFileSync(join(distDir, 'rss.xml'), rss)

console.log(
  `Prerendered ${posts.length} blog posts, ${solutions.length} solution guides, 6 index pages, sitemap.xml, rss.xml`,
)
