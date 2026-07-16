import assert from 'node:assert/strict'
import { readdir, readFile } from 'node:fs/promises'
import { createServer } from 'node:http'
import { basename, join } from 'node:path'
import { afterEach, test } from 'node:test'

const root = new URL('..', import.meta.url).pathname
let moduleSequence = 0

const importFresh = async (moduleName) =>
  import(`../src/lib/${moduleName}.js?test=${moduleSequence += 1}`)

const windowDescriptor = Object.getOwnPropertyDescriptor(globalThis, 'window')

function setWindow(value) {
  Object.defineProperty(globalThis, 'window', {
    configurable: true,
    writable: true,
    value,
  })
}

function memoryStorage(initial = {}) {
  const values = new Map(Object.entries(initial))
  return {
    getItem: (key) => values.get(key) ?? null,
    setItem: (key, value) => values.set(key, value),
    removeItem: (key) => values.delete(key),
    values,
  }
}

afterEach(() => {
  if (windowDescriptor) {
    Object.defineProperty(globalThis, 'window', windowDescriptor)
  } else {
    delete globalThis.window
  }
})

test('first touch survives navigation and later campaigns never overwrite it', async () => {
  const { getFirstTouch } = await importFresh('acquisition')
  const storage = memoryStorage()
  const firstWindow = {
    crypto: { randomUUID: () => 'acq_first_touch_1234567890' },
    location: {
      pathname: '/pricing',
      search: '?utm_source=google&utm_medium=cpc&utm_campaign=launch&utm_id=private&email=owner%40example.com',
    },
    document: { referrer: 'https://google.com/search?q=private' },
    localStorage: storage,
  }

  const first = getFirstTouch({ nowMs: 1_700_000_000_000, windowLike: firstWindow })
  firstWindow.location = {
    pathname: '/blog/remi-private-beta',
    search: '?utm_source=meta&utm_campaign=overwrite',
  }
  const later = getFirstTouch({ nowMs: 1_700_000_100_000, windowLike: firstWindow })

  assert.deepEqual(later, first)
  assert.equal(first.landing_path, '/pricing')
  assert.equal(first.referrer_origin, 'https://google.com')
  assert.equal(first.utm_source, 'google')
  assert.equal(first.utm_campaign, 'launch')
  assert.equal('email' in first, false)
  assert.equal('utm_id' in first, false)
})

test('storage absent or throwing falls back in memory without breaking links', async () => {
  for (const localStorage of [
    undefined,
    {
      getItem: () => { throw new Error('disabled') },
      setItem: () => { throw new Error('quota') },
      removeItem: () => { throw new Error('blocked') },
    },
  ]) {
    const { buildProductEntryLink, getFirstTouch } = await importFresh('acquisition')
    const windowLike = {
      crypto: { randomUUID: () => 'acq_storage_fallback_1234' },
      location: { pathname: '/', search: '?utm_source=google' },
      document: { referrer: '' },
      localStorage,
    }
    const first = getFirstTouch({ nowMs: 1_700_000_000_000, windowLike })
    windowLike.location.search = '?utm_source=meta'
    assert.deepEqual(getFirstTouch({ nowMs: 1_700_000_001_000, windowLike }), first)
    assert.match(buildProductEntryLink('google', {
      env: { VITE_REMI_ENTRY_ORIGIN: 'https://remi.new' },
      firstTouch: first,
      nowMs: 1_700_000_001_000,
    }), /^https:\/\/remi\.new\/start\/google\?/)
  }
})

test('expired first touch is replaced and quota cleanup failures stay harmless', async () => {
  const { ACQUISITION_MAX_AGE_MS, ACQUISITION_STORAGE_KEY, getFirstTouch } = await importFresh('acquisition')
  const expired = {
    acquisition_id: 'acq_expired_touch_123456789',
    created_at: 1_700_000_000_000,
    landing_path: '/',
    utm_source: 'old',
  }
  const storage = memoryStorage({ [ACQUISITION_STORAGE_KEY]: JSON.stringify(expired) })
  storage.removeItem = () => { throw new Error('cleanup denied') }
  const current = getFirstTouch({
    nowMs: expired.created_at + ACQUISITION_MAX_AGE_MS + 1,
    windowLike: {
      crypto: { randomUUID: () => 'acq_replacement_touch_12345' },
      location: { pathname: '/pricing', search: '?utm_source=new' },
      document: { referrer: '' },
      localStorage: storage,
    },
  })
  assert.equal(current.acquisition_id, 'acq_replacement_touch_12345')
  assert.equal(current.utm_source, 'new')
})

test('landing route contract has deterministic parity with every current content route', async () => {
  const { ACQUISITION_LANDING_PATHS } = await importFresh('acquisition')
  const staticRoutes = [
    '/', '/pricing', '/qualify', '/qualify/contact',
    '/solutions/startups', '/solutions/small-businesses', '/solutions/mid-market',
    '/blog', '/case-studies',
  ]
  const contentRoutes = []
  for (const [directory, prefix] of [['blog', '/blog'], ['case-studies', '/case-studies']]) {
    const files = await readdir(join(root, 'src/content', directory))
    for (const file of files.filter((name) => name.endsWith('.md')).sort()) {
      const source = await readFile(join(root, 'src/content', directory, file), 'utf8')
      if (!/^date(?:Published)?:\s*DRAFT$/mu.test(source)) {
        contentRoutes.push(`${prefix}/${basename(file, '.md')}`)
      }
    }
  }
  assert.deepEqual([...ACQUISITION_LANDING_PATHS].sort(), [...staticRoutes, ...contentRoutes].sort())
  assert.equal(ACQUISITION_LANDING_PATHS.length, 34)
})

test('before_send enforces the final event and property privacy boundary', async () => {
  const { sanitizePostHogEvent } = await importFresh('analytics')
  const key = 'phc_test'
  const enriched = {
    event: 'marketing_cta_clicked',
    properties: {
      token: key,
      $lib: 'web',
      $lib_version: '1.398.3',
      $insert_id: 'insert-1',
      distinct_id: 'anon-1',
      $device_id: 'device-1',
      $session_id: 'session-1',
      acquisition_id: 'acq_marketing_1234567890',
      landing_path: '/qualify?email=owner@example.com',
      referrer_origin: 'https://google.com/search?q=private',
      utm_source: 'meta',
      cta: 'hero_text_remi',
      destination: 'linq',
      $current_url: 'https://hireremi.ai/qualify?email=owner@example.com',
      $referrer: 'https://google.com/search?q=private',
      email: 'owner@example.com',
      text: 'private form content',
    },
  }

  assert.deepEqual(sanitizePostHogEvent(enriched, key), {
    event: 'marketing_cta_clicked',
    properties: {
      token: key,
      $lib: 'web',
      $lib_version: '1.398.3',
      $insert_id: 'insert-1',
      distinct_id: 'anon-1',
      $device_id: 'device-1',
      $session_id: 'session-1',
      acquisition_id: 'acq_marketing_1234567890',
      cta: 'hero_text_remi',
      destination: 'linq',
      referrer_origin: 'https://google.com',
      utm_source: 'meta',
    },
  })
  assert.equal(sanitizePostHogEvent({ event: '$autocapture', properties: { token: key } }, key), null)
  assert.equal(sanitizePostHogEvent({ event: '$pageview', properties: { token: 'forged' } }, key), null)
})

test('key absent is a safe no-op with zero initialization and requests', async () => {
  const { captureMarketingCta, capturePageview, initializeAnalytics } = await importFresh('analytics')
  const calls = []
  const client = {
    init: (...args) => calls.push(['init', ...args]),
    capture: (...args) => calls.push(['capture', ...args]),
  }
  assert.equal(initializeAnalytics({ client, env: {}, windowLike: {} }), false)
  capturePageview({ landing_path: '/' })
  captureMarketingCta({ cta: 'hero_text_remi', destination: 'linq', landing_path: '/' })
  assert.deepEqual(calls, [])
})

test('intercepted transport emits only two sanitized manual events and no flags traffic', async () => {
  const requests = []
  const server = createServer((request, response) => {
    let body = ''
    request.setEncoding('utf8')
    request.on('data', (chunk) => { body += chunk })
    request.on('end', () => {
      requests.push({ path: request.url, body: JSON.parse(body) })
      response.writeHead(200, { 'content-type': 'application/json' })
      response.end('{}')
    })
  })
  await new Promise((resolve, reject) => server.listen(4174, '127.0.0.1', (error) => error ? reject(error) : resolve()))

  try {
    const { captureMarketingCta, capturePageview, initializeAnalytics } = await importFresh('analytics')
    let config
    let key
    const client = {
      init(nextKey, nextConfig) {
        key = nextKey
        config = nextConfig
      },
      capture(event, properties) {
        const enriched = config.before_send({
          event,
          properties: {
            ...properties,
            token: key,
            $lib: 'web',
            $lib_version: '1.398.3',
            $insert_id: `${event}-insert`,
            distinct_id: 'anon-1',
            $device_id: 'device-1',
            $session_id: 'session-1',
            $current_url: 'https://hireremi.ai/qualify?email=owner@example.com',
            $referrer: 'https://google.com/search?q=private',
            email: 'owner@example.com',
          },
        })
        if (enriched) {
          void fetch(`${config.api_host}/e`, {
            method: 'POST',
            headers: { 'content-type': 'application/json' },
            body: JSON.stringify(enriched),
          })
        }
      },
    }
    const logs = []
    const originalLog = console.log
    console.log = (...args) => logs.push(args.join(' '))
    try {
      assert.equal(initializeAnalytics({
        client,
        env: { VITE_POSTHOG_KEY: 'phc_test', VITE_POSTHOG_HOST: 'http://127.0.0.1:4174' },
        windowLike: {},
      }), true)
      assert.deepEqual({
        autocapture: config.autocapture,
        capture_pageview: config.capture_pageview,
        capture_pageleave: config.capture_pageleave,
        disable_session_recording: config.disable_session_recording,
        save_campaign_params: config.save_campaign_params,
        save_referrer: config.save_referrer,
        advanced_disable_flags: config.advanced_disable_flags,
      }, {
        autocapture: false,
        capture_pageview: false,
        capture_pageleave: false,
        disable_session_recording: true,
        save_campaign_params: false,
        save_referrer: false,
        advanced_disable_flags: true,
      })
      const touch = {
        acquisition_id: 'acq_marketing_1234567890',
        landing_path: '/qualify',
        referrer_origin: 'https://google.com',
        utm_source: 'meta',
      }
      capturePageview(touch)
      capturePageview(touch)
      captureMarketingCta({ ...touch, cta: 'hero_text_remi', destination: 'linq' })
      await new Promise((resolve) => setTimeout(resolve, 50))
    } finally {
      console.log = originalLog
    }

    assert.equal(requests.length, 2)
    assert.deepEqual(requests.map(({ path, body }) => ({ path, ...body })), [
      {
        path: '/e',
        event: '$pageview',
        properties: {
          acquisition_id: 'acq_marketing_1234567890',
          landing_path: '/qualify',
          referrer_origin: 'https://google.com',
          utm_source: 'meta',
          token: 'phc_test',
          $lib: 'web',
          $lib_version: '1.398.3',
          $insert_id: '$pageview-insert',
          distinct_id: 'anon-1',
          $device_id: 'device-1',
          $session_id: 'session-1',
        },
      },
      {
        path: '/e',
        event: 'marketing_cta_clicked',
        properties: {
          acquisition_id: 'acq_marketing_1234567890',
          landing_path: '/qualify',
          referrer_origin: 'https://google.com',
          utm_source: 'meta',
          cta: 'hero_text_remi',
          destination: 'linq',
          token: 'phc_test',
          $lib: 'web',
          $lib_version: '1.398.3',
          $insert_id: 'marketing_cta_clicked-insert',
          distinct_id: 'anon-1',
          $device_id: 'device-1',
          $session_id: 'session-1',
        },
      },
    ])
    assert.equal(requests.some(({ path }) => /flags|decide|remote_config/u.test(path)), false)
    assert.equal(logs.some((line) => line.includes('phc_test')), false)
  } finally {
    await new Promise((resolve) => server.close(resolve))
  }
})

test('all owned onboarding CTAs use the canonical entries and placeholders are deleted', async () => {
  const files = [
    'src/components/header/global-header.vue',
    'src/components/sections/section-cta.vue',
    'src/components/home/home-hero-video.vue',
    'src/components/pricing/pricing-page.vue',
    'src/components/sections/section-features.vue',
  ]
  for (const file of files) {
    const source = await readFile(join(root, file), 'utf8')
    assert.doesNotMatch(source, /href=["']#["']/u, file)
    assert.doesNotMatch(source, /https:\/\/remi\.new\/login/u, file)
  }
  const sources = await Promise.all(files.map((file) => readFile(join(root, file), 'utf8')))
  assert.equal(sources.filter((source) => source.includes('linqEntry')).length, 4)
  assert.equal(sources.filter((source) => source.includes('googleEntry')).length, 5)
})
