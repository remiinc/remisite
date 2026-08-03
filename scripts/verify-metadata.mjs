import assert from 'node:assert/strict'
import { existsSync, globSync, readFileSync, statSync } from 'node:fs'
import { dirname, join, relative } from 'node:path'
import { fileURLToPath } from 'node:url'
import { legacySolutionRedirects } from '../src/lib/solution-redirects.js'
import {
  getOgImageType,
  INDEX_ROBOTS,
  OG_IMAGE_HEIGHT,
  OG_IMAGE_WIDTH,
  REDIRECT_ROBOTS,
  SITE_URL,
  toAbsoluteSiteUrl,
} from '../src/lib/site-metadata.js'

const root = join(dirname(fileURLToPath(import.meta.url)), '..')
const distDir = join(root, 'dist')
const pageFiles = globSync('**/index.html', { cwd: distDir })
const imageDimensions = new Map()

const getAttribute = (tag, attribute) =>
  tag.match(new RegExp(`\\s${attribute}="([^"]*)"`))?.[1] || ''

const getMetaTags = (html, attribute, key) =>
  (html.match(/<meta\s[^>]*>/gu) || []).filter((tag) => getAttribute(tag, attribute) === key)

const getSingleMeta = (html, attribute, key, pagePath) => {
  const tags = getMetaTags(html, attribute, key)

  assert.equal(tags.length, 1, `${pagePath}: expected one ${attribute}="${key}" meta tag`)

  const content = getAttribute(tags[0], 'content')
  assert.ok(content, `${pagePath}: ${key} must not be empty`)

  return content
}

const getJpegDimensions = (buffer) => {
  assert.equal(buffer.readUInt16BE(0), 0xffd8, 'invalid JPEG header')

  const startOfFrameMarkers = new Set([
    0xc0, 0xc1, 0xc2, 0xc3, 0xc5, 0xc6, 0xc7, 0xc9, 0xca, 0xcb, 0xcd, 0xce, 0xcf,
  ])
  let offset = 2

  while (offset < buffer.length) {
    if (buffer[offset] !== 0xff) {
      offset += 1
      continue
    }

    const marker = buffer[offset + 1]
    offset += 2

    if (marker === 0xd8 || marker === 0xd9) continue

    const segmentLength = buffer.readUInt16BE(offset)

    if (startOfFrameMarkers.has(marker)) {
      return {
        height: buffer.readUInt16BE(offset + 3),
        width: buffer.readUInt16BE(offset + 5),
      }
    }

    offset += segmentLength
  }

  throw new Error('JPEG dimensions not found')
}

const getImageDimensions = (imagePath, imageType) => {
  if (imageDimensions.has(imagePath)) return imageDimensions.get(imagePath)

  const buffer = readFileSync(imagePath)
  let dimensions

  if (imageType === 'image/png') {
    dimensions = { width: buffer.readUInt32BE(16), height: buffer.readUInt32BE(20) }
  } else {
    dimensions = getJpegDimensions(buffer)
  }

  imageDimensions.set(imagePath, dimensions)
  return dimensions
}

const indexableCanonicals = new Set()

pageFiles.forEach((file) => {
  const pagePath = `/${dirname(file) === '.' ? '' : dirname(file)}`
  const html = readFileSync(join(distDir, file), 'utf8')
  const redirectTarget = legacySolutionRedirects[pagePath]
  const canonicalUrl = toAbsoluteSiteUrl(redirectTarget || pagePath)

  const titleTags = html.match(/<title>[\s\S]*?<\/title>/gu) || []
  assert.equal(titleTags.length, 1, `${pagePath}: expected one title`)
  assert.ok(titleTags[0].replace(/<\/?title>/gu, '').trim(), `${pagePath}: title must not be empty`)

  const canonicalTags = (html.match(/<link\s[^>]*rel="canonical"[^>]*>/gu) || [])
  assert.equal(canonicalTags.length, 1, `${pagePath}: expected one canonical link`)
  assert.equal(getAttribute(canonicalTags[0], 'href'), canonicalUrl, `${pagePath}: canonical mismatch`)

  getSingleMeta(html, 'name', 'description', pagePath)
  assert.equal(
    getSingleMeta(html, 'name', 'robots', pagePath),
    redirectTarget ? REDIRECT_ROBOTS : INDEX_ROBOTS,
    `${pagePath}: robots mismatch`,
  )

  const ogType = getSingleMeta(html, 'property', 'og:type', pagePath)
  const expectedOgType = pagePath.startsWith('/resources/') ? 'article' : 'website'
  assert.equal(ogType, expectedOgType, `${pagePath}: og:type mismatch`)
  assert.equal(getSingleMeta(html, 'property', 'og:site_name', pagePath), 'Remi')
  assert.equal(getSingleMeta(html, 'property', 'og:locale', pagePath), 'en_US')
  getSingleMeta(html, 'property', 'og:title', pagePath)
  getSingleMeta(html, 'property', 'og:description', pagePath)
  assert.equal(getSingleMeta(html, 'property', 'og:url', pagePath), canonicalUrl)

  const ogImage = getSingleMeta(html, 'property', 'og:image', pagePath)
  const ogImageType = getSingleMeta(html, 'property', 'og:image:type', pagePath)
  assert.ok(ogImage.startsWith(`${SITE_URL}/`), `${pagePath}: og:image must use the production origin`)
  assert.equal(getSingleMeta(html, 'property', 'og:image:secure_url', pagePath), ogImage)
  assert.equal(ogImageType, getOgImageType(ogImage), `${pagePath}: og:image:type mismatch`)
  assert.equal(Number(getSingleMeta(html, 'property', 'og:image:width', pagePath)), OG_IMAGE_WIDTH)
  assert.equal(Number(getSingleMeta(html, 'property', 'og:image:height', pagePath)), OG_IMAGE_HEIGHT)
  getSingleMeta(html, 'property', 'og:image:alt', pagePath)

  assert.equal(getSingleMeta(html, 'name', 'twitter:card', pagePath), 'summary_large_image')
  assert.equal(getSingleMeta(html, 'name', 'twitter:url', pagePath), canonicalUrl)
  getSingleMeta(html, 'name', 'twitter:title', pagePath)
  getSingleMeta(html, 'name', 'twitter:description', pagePath)
  assert.equal(getSingleMeta(html, 'name', 'twitter:image', pagePath), ogImage)
  getSingleMeta(html, 'name', 'twitter:image:alt', pagePath)

  const imageUrl = new URL(ogImage)
  const imagePath = join(distDir, imageUrl.pathname.replace(/^\//u, ''))
  assert.ok(existsSync(imagePath), `${pagePath}: social image does not exist at ${imageUrl.pathname}`)
  assert.ok(statSync(imagePath).size <= 5 * 1024 * 1024, `${pagePath}: social image exceeds 5 MB`)
  assert.deepEqual(
    getImageDimensions(imagePath, ogImageType),
    { width: OG_IMAGE_WIDTH, height: OG_IMAGE_HEIGHT },
    `${pagePath}: social image dimensions mismatch`,
  )

  if (ogType === 'article') {
    getSingleMeta(html, 'property', 'article:published_time', pagePath)
    getSingleMeta(html, 'property', 'article:section', pagePath)
  }

  if (!redirectTarget) indexableCanonicals.add(canonicalUrl)
})

const sitemap = readFileSync(join(distDir, 'sitemap.xml'), 'utf8')
const sitemapUrls = new Set(Array.from(sitemap.matchAll(/<loc>([^<]+)<\/loc>/gu), (match) => match[1]))

assert.deepEqual(
  [...sitemapUrls].sort(),
  [...indexableCanonicals].sort(),
  'sitemap URLs must match the self-canonical, indexable pages',
)

console.log(
  `Verified complete social and canonical metadata for ${pageFiles.length} pages using ${imageDimensions.size} social images.`,
)
