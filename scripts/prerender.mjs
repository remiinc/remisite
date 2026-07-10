// Post-build prerender for content routes. Emits static HTML for /blog,
// /blog/<slug>, /case-studies, and /case-studies/<slug> so crawlers and
// answer engines see full article HTML without executing JS. The Vue app
// still mounts on #app and takes over on load.
//
// Also generates sitemap.xml and rss.xml. Runs as part of `npm run build`.

import { mkdirSync, readFileSync, readdirSync, writeFileSync } from 'node:fs'
import { dirname, join } from 'node:path'
import { fileURLToPath } from 'node:url'
import { formatDate, parseFrontmatter, renderMarkdown } from '../src/lib/markdown-content.js'

const root = join(dirname(fileURLToPath(import.meta.url)), '..')
const distDir = join(root, 'dist')
const SITE = 'https://remi.new'

const template = readFileSync(join(distDir, 'index.html'), 'utf8')

const escapeHtml = (value = '') =>
  String(value)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')

const escapeXml = escapeHtml

const loadCollection = (contentDir, basePath) =>
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
    .filter((entry) => entry.date && entry.date !== 'DRAFT')
    .sort((entryA, entryB) => new Date(entryB.date) - new Date(entryA.date))

const posts = loadCollection('src/content/blog', '/blog')
const caseStudies = loadCollection('src/content/case-studies', '/case-studies')

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

const articleBody = (entry, sectionLabel) => `
<main class="px-6 pt-32 pb-20">
  <article class="mx-auto w-full" style="max-width: 44rem">
    <p>${escapeHtml(entry.metadata.category || sectionLabel)} · <time datetime="${entry.date}">${entry.formattedDate}</time>${entry.metadata.author ? ` · ${escapeHtml(entry.metadata.author)}` : ''}</p>
    <h1>${escapeHtml(entry.title)}</h1>
    <p>${escapeHtml(entry.description)}</p>
    ${entry.html}
    <p><a href="/qualify/contact">See what's slipping through your inbox. Get started with Remi.</a></p>
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
    <p><a href="/qualify">Start free trial</a></p>
  </section>
</main>`

// Blog posts and case studies
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
caseStudies.forEach((study) => writePage(study.path, renderEntryPage(study, 'Case Study')))

// Index pages
writePage(
  '/blog',
  injectBody(
    setHead(template, {
      title: 'Blog | Remi',
      description:
        'Practical guides for owner-run businesses: getting paid, following up on quotes, and keeping the money side of the business moving.',
      url: `${SITE}/blog`,
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
  '/case-studies',
  injectBody(
    setHead(template, {
      title: 'Case Studies | Remi',
      description: 'How owner-run businesses use Remi to follow up on estimates, invoices, and client work.',
      url: `${SITE}/case-studies`,
      ogType: 'website',
    }),
    indexBody(
      'Case Studies',
      'How owner-run businesses use Remi to follow up on estimates, invoices, and client work.',
      caseStudies,
    ),
  ),
)

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

// sitemap.xml
const staticUrls = [
  { loc: `${SITE}/`, priority: '1.0' },
  { loc: `${SITE}/pricing`, priority: '0.9' },
  { loc: `${SITE}/blog`, priority: '0.8' },
  { loc: `${SITE}/case-studies`, priority: '0.7' },
]

const contentUrls = [...posts, ...caseStudies].map((entry) => ({
  loc: entry.url,
  lastmod: entry.metadata.dateModified || entry.date,
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
    <link>${SITE}/blog</link>
    <atom:link href="${SITE}/rss.xml" rel="self" type="application/rss+xml" />
    <description>Practical guides for owner-run businesses: getting paid, following up on quotes, and keeping the money side moving.</description>
    <language>en-us</language>
${rssItems}
  </channel>
</rss>
`

writeFileSync(join(distDir, 'rss.xml'), rss)

console.log(
  `Prerendered ${posts.length} blog posts, ${caseStudies.length} case studies, 3 index pages, sitemap.xml, rss.xml`,
)
