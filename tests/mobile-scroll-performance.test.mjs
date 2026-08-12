import assert from 'node:assert/strict'
import { readFile } from 'node:fs/promises'
import { dirname, join } from 'node:path'
import test from 'node:test'
import { fileURLToPath } from 'node:url'

const root = join(dirname(fileURLToPath(import.meta.url)), '..')

const readComponent = (path) => readFile(join(root, path), 'utf8')

test('mobile pinned headline keeps the scroll choreography within a small compositor budget', async () => {
  const source = await readComponent('src/components/sections/section-pinned-headline.vue')
  const mobileStart = source.indexOf('@media (max-width: 767px)')
  const reducedMotionStart = source.indexOf('@media (prefers-reduced-motion: reduce)', mobileStart)

  assert.notEqual(mobileStart, -1, 'missing the mobile animation budget')
  assert.notEqual(reducedMotionStart, -1, 'mobile overrides must precede reduced-motion overrides')

  const mobileCss = source.slice(mobileStart, reducedMotionStart)

  assert.match(
    mobileCss,
    /\.image-grid-outer\s*\{[^}]*display:\s*none;/s,
    'the 12-card outer ring must not render on mobile',
  )
  assert.match(
    mobileCss,
    /\.image-grid-outer,\s*\.image-tile-outer\s*\{[^}]*animation:\s*none;/s,
    'hidden outer-ring elements must not retain scroll timelines',
  )
  assert.match(
    mobileCss,
    /\.image-tile\s*\{[^}]*animation:\s*mobile-image-tile-handoff/s,
    'the eight visible mobile cards should share one combined handoff animation each',
  )
  assert.doesNotMatch(
    mobileCss,
    /animation-composition/,
    'mobile cards must not use additive per-frame transform composition',
  )
  assert.doesNotMatch(
    mobileCss,
    /opacity:\s*0/,
    'the mobile card grid should remain visible while it collapses into the phone',
  )
  assert.match(
    mobileCss,
    /\.image-tile-card\s*\{[^}]*-webkit-backdrop-filter:\s*none;[^}]*backdrop-filter:\s*none;/s,
    'moving mobile cards must not require live backdrop-filter rendering passes',
  )
})

test('mobile header avoids a live backdrop blur while scrolling', async () => {
  const source = await readComponent('src/components/header/global-header.vue')
  const mobileStart = source.indexOf('@media (max-width: 767px)')

  assert.notEqual(mobileStart, -1, 'missing the mobile header paint budget')

  const mobileCss = source.slice(mobileStart)

  assert.match(
    mobileCss,
    /\.header-backdrop\s*\{[^}]*-webkit-backdrop-filter:\s*none;[^}]*backdrop-filter:\s*none;/s,
    'mobile header must not repaint a backdrop blur on every scroll frame',
  )
  assert.match(
    mobileCss,
    /\.scroll-progress rect\s*\{[^}]*animation:\s*none;[^}]*stroke-dashoffset:\s*0;/s,
    'mobile header progress should remain a static compositor-friendly border',
  )
})

test('mobile skips the global GSAP ScrollTrigger initializer', async () => {
  const source = await readComponent('src/App.vue')

  assert.match(
    source,
    /const isMobileViewport = window\.matchMedia\('\(max-width: 767px\)'\)\.matches/,
    'mobile detection should be shared by the animation and preload budgets',
  )
  assert.match(
    source,
    /if \(!isMobileViewport\) \{\s*import\('\.\/lib\/motion\.js'\)/s,
    'desktop motion should load outside the mobile startup graph',
  )
  assert.doesNotMatch(
    source.slice(0, source.indexOf('onMounted')),
    /from '\.\/lib\/motion\.js'/,
    'GSAP ScrollTrigger must not be a static App dependency on mobile',
  )
})

test('mobile skips hero GSAP and its parallax ScrollTrigger', async () => {
  const source = await readComponent('src/components/hero/hero-b.vue')

  assert.match(
    source,
    /const mobileViewport = window\.matchMedia\('\(max-width: 767px\)'\)\.matches/,
    'the hero must share the mobile motion budget',
  )
  assert.match(
    source,
    /if \(reducedMotion \|\| mobileViewport \|\| !heroMediaRef\.value\) return/,
    'hero parallax should never initialize on mobile Safari',
  )
  assert.doesNotMatch(
    source.slice(0, source.indexOf('onMounted')),
    /from 'gsap/,
    'GSAP must not be part of the hero static import graph',
  )
})

test('mobile preloads the interactive phone before the user reaches its scroll boundary', async () => {
  const source = await readComponent('src/App.vue')

  assert.match(
    source,
    /if \(isMobileViewport\) \{\s*shouldLoadIphoneSection\.value = true\s*return\s*\}/s,
    'mounting the phone from a near-viewport observer causes a large mid-scroll hitch on mobile',
  )
})

test('mobile first fold gives Safari matching chrome and a larger phone stage', async () => {
  const [documentSource, mainSource, heroSource, prerenderSource] = await Promise.all([
    readComponent('index.html'),
    readComponent('src/main.js'),
    readComponent('src/components/hero/hero-b.vue'),
    readComponent('scripts/prerender.mjs'),
  ])

  assert.match(
    documentSource,
    /name="viewport" content="[^"]*viewport-fit=cover[^"]*"/,
    'iOS Safari should allow the page color to reach its safe-area edges',
  )
  assert.match(
    documentSource,
    /name="theme-color" content="#181613"/,
    'Safari chrome should match the charcoal first fold instead of the cream page background',
  )
  assert.match(
    mainSource,
    /usesDarkFirstFold = \['\/', '\/about'\]\.includes\(normalizedPath\)/,
    'dark first folds should keep dark Safari chrome without tinting light routes',
  )
  assert.match(
    prerenderSource,
    /themeColor = '#fffef9',[\s\S]*themeColor: '#181613'/,
    'prerendered light routes should ship cream chrome while the dark about page stays charcoal',
  )
  assert.match(
    heroSource,
    /aspect-2\/3[^\n]*sm:aspect-square/,
    'the mobile media stage should be tall enough to enlarge the phone without distorting it',
  )
  assert.match(
    heroSource,
    /col-start-5 col-span-24[^\n]*sm:col-start-10 sm:col-span-15/,
    'the hero phone should occupy more of the narrow viewport while preserving the desktop composition',
  )
  assert.match(
    heroSource,
    /mx-auto grid w-full min-w-0 place-items-center/,
    'the phone stage must retain the full viewport width after its collage tiles are hidden',
  )
  assert.equal(
    heroSource.match(/hero-b__media-tile hidden sm:grid/g)?.length,
    6,
    'the surrounding hero collage should stay off mobile while remaining visible from the small breakpoint',
  )
  assert.equal(
    heroSource.match(/v-if="showHeroCollage"/g)?.length,
    6,
    'mobile markup must omit every hidden collage image so Safari does not download it',
  )
  assert.match(
    heroSource,
    /heroCollageMedia[\s\S]*matchMedia\('\(min-width: 640px\)'\)[\s\S]*showHeroCollage = ref\(heroCollageMedia\?\.matches/,
    'collage rendering should be decided before the first client render',
  )
  assert.match(
    heroSource,
    /heroCollageMedia\?\.addEventListener\('change', syncHeroCollage\)[\s\S]*heroCollageMedia\?\.removeEventListener\('change', syncHeroCollage\)/,
    'crossing the small breakpoint should restore or remove the collage without leaking a listener',
  )
  assert.match(
    heroSource,
    /\.hero-b__media-tile\s*\{[^}]*display:\s*none;[^}]*\}[\s\S]*@media \(min-width: 640px\)\s*\{\s*\.hero-b__media-tile\s*\{\s*display:\s*grid;/,
    'scoped component styles must not override the mobile collage hide',
  )
})
