import assert from 'node:assert/strict'
import { spawnSync } from 'node:child_process'
import { readdir, readFile } from 'node:fs/promises'
import { basename, join } from 'node:path'
import { fileURLToPath } from 'node:url'
import { afterEach, test } from 'node:test'

const root = new URL('..', import.meta.url).pathname
let moduleSequence = 0

const importFresh = async (moduleName) =>
  import(`../src/lib/${moduleName}.js?test=${moduleSequence += 1}`)

const browserGlobalNames = [
  'window', 'document', 'navigator', 'self', 'location', 'localStorage',
  'sessionStorage', 'screen', 'history', 'Element', 'fetch',
]
const browserGlobalDescriptors = new Map(browserGlobalNames.map((name) => [
  name,
  Object.getOwnPropertyDescriptor(globalThis, name),
]))

function setGlobal(name, value) {
  Object.defineProperty(globalThis, name, {
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
  for (const [name, descriptor] of browserGlobalDescriptors) {
    if (descriptor) Object.defineProperty(globalThis, name, descriptor)
    else delete globalThis[name]
  }
})

function installBrowserHarness(fetchImpl) {
  const localStorage = memoryStorage()
  const sessionStorage = memoryStorage()
  const location = new URL('https://hireremi.ai/qualify?email=owner@example.com')
  const document = {
    body: { appendChild() {}, removeChild() {} },
    cookie: '',
    documentElement: { clientHeight: 900, clientWidth: 1440 },
    location,
    readyState: 'complete',
    referrer: 'https://google.com/search?q=private',
    title: 'Remi',
    visibilityState: 'visible',
    addEventListener() {},
    removeEventListener() {},
    createElement() {
      return { style: {}, setAttribute() {}, addEventListener() {}, removeEventListener() {} }
    },
    querySelectorAll: () => [],
  }
  const navigator = {
    language: 'en-US',
    userAgent: 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 Chrome/126 Safari/537.36',
  }
  const windowLike = {
    crypto: globalThis.crypto,
    document,
    fetch: fetchImpl,
    history: { replaceState() {}, pushState() {} },
    location,
    localStorage,
    navigator,
    screen: { height: 900, width: 1440 },
    sessionStorage,
    addEventListener() {},
    removeEventListener() {},
    requestAnimationFrame: (callback) => setTimeout(callback, 0),
    cancelAnimationFrame: clearTimeout,
    setTimeout,
    clearTimeout,
  }
  class Element {}
  for (const [name, value] of Object.entries({
    window: windowLike,
    self: windowLike,
    document,
    navigator,
    location,
    localStorage,
    sessionStorage,
    screen: windowLike.screen,
    history: windowLike.history,
    Element,
    fetch: fetchImpl,
  })) setGlobal(name, value)
  return windowLike
}

async function runActualSdkTransport() {
  const requests = []
  const fetchImpl = async (url, options = {}) => {
    requests.push({ url: String(url), body: options.body })
    return new Response('{}', { status: 200, headers: { 'content-type': 'application/json' } })
  }
  const windowLike = installBrowserHarness(fetchImpl)
  const logs = []
  const originalConsole = {}
  for (const method of ['log', 'info', 'warn', 'error']) {
    originalConsole[method] = console[method]
    console[method] = (...args) => logs.push(args.join(' '))
  }
  let sdk
  try {
    const { captureMarketingCta, capturePageview, initializeAnalytics } = await importFresh('analytics')
    ;({ posthog: sdk } = await import('posthog-js'))
    if (!initializeAnalytics({
      env: { VITE_POSTHOG_KEY: 'phc_test', VITE_POSTHOG_HOST: 'http://127.0.0.1:4174' },
      windowLike,
    })) throw new Error('actual_posthog_init_failed')
    const touch = {
      acquisition_id: 'acq_marketing_1234567890',
      landing_path: '/qualify',
      referrer_origin: 'https://google.com',
      utm_source: 'meta',
    }
    capturePageview(touch)
    capturePageview(touch)
    captureMarketingCta({ ...touch, cta: 'hero_text_remi', destination: 'linq' })
    await new Promise((resolve) => setTimeout(resolve, 100))
    const config = {
      autocapture: sdk.config.autocapture,
      capture_pageview: sdk.config.capture_pageview,
      capture_pageleave: sdk.config.capture_pageleave,
      disable_session_recording: sdk.config.disable_session_recording,
      save_campaign_params: sdk.config.save_campaign_params,
      save_referrer: sdk.config.save_referrer,
      advanced_disable_flags: sdk.config.advanced_disable_flags,
      request_batching: sdk.config.request_batching,
      disable_compression: sdk.config.disable_compression,
      disable_beacon: sdk.config.disable_beacon,
    }
    await sdk.shutdown()
    return { requests, logs, config }
  } finally {
    for (const [method, implementation] of Object.entries(originalConsole)) {
      console[method] = implementation
    }
  }
}

if (process.argv.includes('--sdk-transport-child')) {
  try {
    process.stdout.write(JSON.stringify(await runActualSdkTransport()))
    process.exit(0)
  } catch (error) {
    process.stderr.write(error instanceof Error ? error.stack : String(error))
    process.exit(1)
  }
}

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

test('crypto-unavailable fallback always produces an admitted acquisition id', async () => {
  const { buildProductEntryLink, getFirstTouch } = await importFresh('acquisition')
  const originalRandom = Math.random
  Math.random = () => 0
  try {
    const firstTouch = getFirstTouch({
      nowMs: 1_700_000_000_000,
      windowLike: {
        crypto: {},
        location: { pathname: '/', search: '' },
        document: { referrer: '' },
      },
    })
    assert.match(firstTouch.acquisition_id, /^[A-Za-z0-9_-]{16,128}$/u)
    assert.match(buildProductEntryLink('google', {
      env: { VITE_REMI_ENTRY_ORIGIN: 'https://remi.new' },
      firstTouch,
      nowMs: 1_700_000_000_000,
    }), /^https:\/\/remi\.new\/start\/google\?/u)
  } finally {
    Math.random = originalRandom
  }
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

test('intercepted transport emits only two sanitized manual events and no flags traffic', async () => {
  const child = spawnSync(process.execPath, [fileURLToPath(import.meta.url), '--sdk-transport-child'], {
    encoding: 'utf8',
    timeout: 5_000,
  })
  assert.equal(child.status, 0, child.stderr || child.error?.message)
  assert.equal(child.signal, null)
  const { requests, logs, config } = JSON.parse(child.stdout)
  assert.deepEqual(config, {
    autocapture: false,
    capture_pageview: false,
    capture_pageleave: false,
    disable_session_recording: true,
    save_campaign_params: false,
    save_referrer: false,
    advanced_disable_flags: true,
    request_batching: false,
    disable_compression: true,
    disable_beacon: true,
  })
  const decoded = requests.map(({ url, body }) => ({
    path: new URL(url).pathname,
    body: JSON.parse(body),
  }))
  assert.equal(decoded.length, 2)
  assert.deepEqual(decoded.map(({ path, body }) => ({
    path,
    event: body.event,
    propertyKeys: Object.keys(body.properties).sort(),
  })), [
    {
      path: '/e/',
      event: '$pageview',
      propertyKeys: [
        '$device_id', '$insert_id', '$lib', '$lib_version', '$session_id',
        'acquisition_id', 'distinct_id', 'landing_path', 'referrer_origin', 'token', 'utm_source',
      ],
    },
    {
      path: '/e/',
      event: 'marketing_cta_clicked',
      propertyKeys: [
        '$device_id', '$insert_id', '$lib', '$lib_version', '$session_id',
        'acquisition_id', 'cta', 'destination', 'distinct_id', 'landing_path',
        'referrer_origin', 'token', 'utm_source',
      ],
    },
  ])
  const [pageview, cta] = decoded.map(({ body }) => body)
  assert.deepEqual({
    acquisition_id: pageview.properties.acquisition_id,
    landing_path: pageview.properties.landing_path,
    referrer_origin: pageview.properties.referrer_origin,
    utm_source: pageview.properties.utm_source,
    token: pageview.properties.token,
    $lib: pageview.properties.$lib,
    $lib_version: pageview.properties.$lib_version,
  }, {
    acquisition_id: 'acq_marketing_1234567890',
    landing_path: '/qualify',
    referrer_origin: 'https://google.com',
    utm_source: 'meta',
    token: 'phc_test',
    $lib: 'web',
    $lib_version: '1.398.3',
  })
  assert.equal(cta.properties.cta, 'hero_text_remi')
  assert.equal(cta.properties.destination, 'linq')
  for (const property of ['distinct_id', '$device_id', '$session_id']) {
    assert.equal(typeof pageview.properties[property], 'string')
    assert.equal(cta.properties[property], pageview.properties[property])
  }
  for (const event of [pageview, cta]) {
    assert.match(event.properties.$insert_id, /^[A-Za-z0-9_-]+$/u)
    assert.match(event.uuid, /^[A-Za-z0-9-]+$/u)
  }
  assert.equal(requests.some(({ url }) => /flags|decide|remote_config|\/s\//u.test(url)), false)
  assert.equal(logs.some((line) => line.includes('phc_test')), false)
  assert.equal(child.stderr.includes('phc_test'), false)
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
