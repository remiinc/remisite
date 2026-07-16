import assert from 'node:assert/strict'
import { readdir } from 'node:fs/promises'
import { basename } from 'node:path'
import { test } from 'node:test'

let moduleSequence = 0

const importFresh = (moduleName) =>
  import(`../src/lib/${moduleName}.js?test=${moduleSequence += 1}`)

function memoryStorage() {
  const values = new Map()
  return {
    getItem: (key) => values.get(key) ?? null,
    setItem: (key, value) => values.set(key, value),
    removeItem: (key) => values.delete(key),
  }
}

test('landing-path allowlist matches the current solution and resource collections', async () => {
  const { ACQUISITION_LANDING_PATHS } = await importFresh('acquisition')
  const solutionFiles = await readdir(new URL('../src/content/solutions', import.meta.url))
  const resourceFiles = await readdir(new URL('../src/content/resources', import.meta.url))
  const expectedContentPaths = [
    ...solutionFiles.map((file) => `/solutions/${basename(file, '.md')}`),
    ...resourceFiles.map((file) => `/resources/${basename(file, '.md')}`),
  ]

  for (const path of expectedContentPaths) {
    assert.ok(ACQUISITION_LANDING_PATHS.includes(path), `missing acquisition path: ${path}`)
  }
  assert.equal(ACQUISITION_LANDING_PATHS.includes('/qualify'), false)
  assert.equal(ACQUISITION_LANDING_PATHS.some((path) => path.startsWith('/case-studies')), false)
})

test('first-touch attribution persists and later campaigns do not overwrite it', async () => {
  const { appendAcquisitionToUrl, getFirstTouch } = await importFresh('acquisition')
  const storage = memoryStorage()
  const windowLike = {
    crypto: { randomUUID: () => 'acq_first_touch_1234567890' },
    location: {
      origin: 'https://hireremi.ai',
      pathname: '/pricing',
      search: '?utm_source=google&utm_medium=cpc&utm_campaign=summer_launch&utm_id=private&email=owner%40example.com',
    },
    document: { referrer: 'https://google.com/search?q=private' },
    localStorage: storage,
  }

  const first = getFirstTouch({ nowMs: 1_700_000_000_000, windowLike })
  windowLike.location.pathname = '/security'
  windowLike.location.search = '?utm_source=meta&utm_campaign=overwrite'
  const later = getFirstTouch({ nowMs: 1_700_000_100_000, windowLike })
  const portalUrl = new URL(appendAcquisitionToUrl('https://remi.new/login', {
    firstTouch: later,
    nowMs: 1_700_000_100_000,
    windowLike,
  }))

  assert.deepEqual(later, first)
  assert.equal(portalUrl.searchParams.get('acquisition_id'), 'acq_first_touch_1234567890')
  assert.equal(portalUrl.searchParams.get('landing_path'), '/pricing')
  assert.equal(portalUrl.searchParams.get('referrer'), 'https://google.com')
  assert.equal(portalUrl.searchParams.get('utm_source'), 'google')
  assert.equal(portalUrl.searchParams.get('utm_campaign'), 'summer_launch')
  assert.equal(portalUrl.searchParams.has('utm_id'), false)
  assert.equal(portalUrl.searchParams.has('email'), false)
})

test('analytics initialization is a no-op without public configuration', async () => {
  const { initializeAnalytics } = await importFresh('analytics')
  const client = { init: () => assert.fail('PostHog should not initialize') }

  assert.equal(initializeAnalytics({ client, env: {}, windowLike: {} }), false)
})

test('analytics sends only explicit pageview and CTA properties', async () => {
  const {
    captureMarketingCta,
    capturePageview,
    initializeAnalytics,
    sanitizePostHogEvent,
  } = await importFresh('analytics')
  const captured = []
  let config
  const client = {
    init: (_key, value) => { config = value },
    capture: (event, properties) => captured.push({ event, properties }),
  }
  const env = {
    VITE_POSTHOG_KEY: 'phc_test',
    VITE_POSTHOG_HOST: 'https://us.i.posthog.com',
  }
  const touch = {
    acquisition_id: 'acq_marketing_1234567890',
    created_at: 1_700_000_000_000,
    landing_path: '/start',
    referrer_origin: 'https://google.com',
    utm_source: 'google',
    email: 'owner@example.com',
  }

  assert.equal(initializeAnalytics({ client, env, windowLike: {} }), true)
  capturePageview(touch)
  capturePageview(touch)
  captureMarketingCta({ ...touch, cta: 'hero_text_remi', destination: 'linq' })

  assert.equal(config.autocapture, false)
  assert.equal(config.capture_pageview, false)
  assert.equal(config.disable_session_recording, true)
  assert.equal(config.person_profiles, 'never')
  assert.equal(captured.length, 2)
  assert.deepEqual(captured[0], {
    event: '$pageview',
    properties: {
      acquisition_id: 'acq_marketing_1234567890',
      landing_path: '/start',
      referrer_origin: 'https://google.com',
      utm_source: 'google',
    },
  })
  assert.equal(captured[1].event, 'marketing_cta_clicked')
  assert.equal(captured[1].properties.email, undefined)
  assert.equal(captured[1].properties.created_at, undefined)

  const sanitized = sanitizePostHogEvent({
    event: 'marketing_cta_clicked',
    properties: {
      token: 'phc_test',
      acquisition_id: 'acq_marketing_1234567890',
      landing_path: '/start',
      utm_source: 'google',
      cta: 'hero_text_remi',
      destination: 'linq',
      email: 'owner@example.com',
      $current_url: 'https://hireremi.ai/start?email=owner@example.com',
    },
  }, 'phc_test')

  assert.deepEqual(sanitized, {
    event: 'marketing_cta_clicked',
    properties: {
      token: 'phc_test',
      acquisition_id: 'acq_marketing_1234567890',
      landing_path: '/start',
      utm_source: 'google',
      cta: 'hero_text_remi',
      destination: 'linq',
    },
  })
})
