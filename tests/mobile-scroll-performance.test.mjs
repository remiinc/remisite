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
    /\.image-tile\s*\{[^}]*animation:\s*mobile-image-tile-counter-rotate/s,
    'the eight visible mobile cards should only counter-rotate',
  )
  assert.doesNotMatch(
    mobileCss,
    /animation-composition/,
    'mobile cards must not use additive per-frame transform composition',
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
    /if \(!isMobileViewport\) \{\s*stopMotionEffects = initializeMotionEffects\(\)\s*\}/s,
    'GSAP ScrollTrigger keeps Mobile Safari WebContent hot across the entire page',
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
