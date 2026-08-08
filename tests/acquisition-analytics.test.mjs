import assert from 'node:assert/strict'
import { spawnSync } from 'node:child_process'
import { readdir, readFile } from 'node:fs/promises'
import { basename, join } from 'node:path'
import { fileURLToPath } from 'node:url'
import { afterEach, test } from 'node:test'

const root = new URL('..', import.meta.url).pathname
let moduleSequence = 0
const importFresh = (moduleName) =>
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
  Object.defineProperty(globalThis, name, { configurable: true, writable: true, value })
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

function installBrowserHarness(fetchImpl, beaconRequests) {
  const localStorage = memoryStorage()
  const sessionStorage = memoryStorage()
  const location = new URL('https://hireremi.ai/start?email=owner@example.com')
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
    createElement: () => ({
      style: {}, setAttribute() {}, addEventListener() {}, removeEventListener() {},
    }),
    querySelectorAll: () => [],
  }
  const navigator = {
    language: 'en-US',
    userAgent: 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) Chrome/126 Safari/537.36',
    sendBeacon: (url, body) => {
      beaconRequests.push({ url: String(url), body })
      return true
    },
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
  const fetchRequests = []
  const beaconRequests = []
  const fetchImpl = async (url, options = {}) => {
    fetchRequests.push({ url: String(url), body: options.body })
    return new Response('{}', { status: 200, headers: { 'content-type': 'application/json' } })
  }
  const windowLike = installBrowserHarness(fetchImpl, beaconRequests)
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
    assert.equal(initializeAnalytics({
      env: { VITE_POSTHOG_KEY: 'phc_test', VITE_POSTHOG_HOST: 'http://127.0.0.1:4174' },
      windowLike,
    }), true)
    const touch = {
      acquisition_id: 'acq_marketing_1234567890',
      landing_path: '/start',
      referrer_origin: 'https://google.com',
      utm_source: 'meta',
    }
    capturePageview(touch)
    captureMarketingCta({ ...touch, cta: 'hero_text_remi', destination: 'guided' })
    await new Promise((resolve) => setTimeout(resolve, 100))
    return {
      fetchRequests,
      beacons: await Promise.all(beaconRequests.map(async ({ url, body }) => ({
        url,
        body: JSON.parse(await body.text()),
      }))),
      logs,
      config: {
        autocapture: sdk.config.autocapture,
        capture_pageview: sdk.config.capture_pageview,
        capture_pageleave: sdk.config.capture_pageleave,
        disable_session_recording: sdk.config.disable_session_recording,
        save_campaign_params: sdk.config.save_campaign_params,
        save_referrer: sdk.config.save_referrer,
        advanced_disable_flags: sdk.config.advanced_disable_flags,
        disable_beacon: sdk.config.disable_beacon,
      },
    }
  } finally {
    await sdk?.shutdown?.()
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

test('landing-path allowlist matches every current solution and resource route', async () => {
  const { ACQUISITION_LANDING_PATHS } = await importFresh('acquisition')
  const solutionFiles = await readdir(new URL('../src/content/solutions', import.meta.url))
  const resourceFiles = await readdir(new URL('../src/content/resources', import.meta.url))
  const contentPaths = [
    ...solutionFiles.map((file) => `/solutions/${basename(file, '.md')}`),
    ...resourceFiles.map((file) => `/resources/${basename(file, '.md')}`),
  ]
  const staticPaths = [
    '/',
    '/about',
    '/pricing',
    '/privacy',
    '/resources',
    '/security',
    '/solutions',
    '/start',
    '/terms',
  ]
  assert.deepEqual(
    [...ACQUISITION_LANDING_PATHS].sort(),
    [...staticPaths, ...contentPaths].sort(),
  )
})

test('first touch persists, excludes PII, and later campaigns cannot overwrite it', async () => {
  const { getFirstTouch } = await importFresh('acquisition')
  const storage = memoryStorage()
  const windowLike = {
    crypto: { randomUUID: () => 'acq_first_touch_1234567890' },
    location: {
      pathname: '/pricing',
      search: '?utm_source=google&utm_medium=cpc&utm_campaign=summer&utm_id=private&email=owner%40example.com',
    },
    document: { referrer: 'https://google.com/search?q=private' },
    localStorage: storage,
  }
  const first = getFirstTouch({ nowMs: 1_700_000_000_000, windowLike })
  windowLike.location = { pathname: '/security', search: '?utm_source=meta&utm_campaign=overwrite' }
  const later = getFirstTouch({ nowMs: 1_700_000_100_000, windowLike })

  assert.deepEqual(later, first)
  assert.deepEqual(first, {
    acquisition_id: 'acq_first_touch_1234567890',
    created_at: 1_700_000_000_000,
    landing_path: '/pricing',
    referrer_origin: 'https://google.com',
    utm_source: 'google',
    utm_medium: 'cpc',
    utm_campaign: 'summer',
  })
})

test('guided signup entry carries only the opaque acquisition allowlist', async () => {
  const { buildProductEntryLink } = await importFresh('acquisition')
  const firstTouch = {
    acquisition_id: 'acq_entry_touch_1234567890',
    created_at: 1_700_000_000_000,
    landing_path: '/pricing',
    referrer_origin: 'https://meta.com/path?private=true',
    utm_source: 'meta',
    utm_campaign: 'launch',
    email: 'owner@example.com',
  }
  const href = buildProductEntryLink('guided', {
    firstTouch,
    nowMs: 1_700_000_100_000,
  })
  const url = new URL(href, 'https://hireremi.ai')
  assert.equal(url.pathname, '/start')
  assert.deepEqual([...url.searchParams.keys()].sort(), [
    'acquisition_id', 'landing_path', 'referrer', 'utm_campaign', 'utm_source',
  ])
  assert.equal(url.searchParams.get('referrer'), 'https://meta.com')
  assert.equal(url.href.includes('owner%40example.com'), false)
  assert.equal(buildProductEntryLink('google', { firstTouch }), null)
  assert.equal(buildProductEntryLink('linq', { firstTouch }), null)
})

test('guided redirect strips arbitrary and private query values before product entry', async () => {
  const { buildGuidedOnboardingRedirect } = await importFresh('acquisition')
  const url = new URL(buildGuidedOnboardingRedirect(
    '?acquisition_id=acq_entry_touch_1234567890&landing_path=%2Fpricing&referrer=https%3A%2F%2Fmeta.com%2Fprivate&'
    + 'utm_source=meta&utm_campaign=launch&email=owner%40example.com&arbitrary=private',
  ))
  assert.equal(url.origin, 'https://hireremi.ai')
  assert.equal(url.pathname, '/api/onboarding/entry')
  assert.deepEqual([...url.searchParams.keys()].sort(), [
    'acquisition_id', 'landing_path', 'referrer', 'utm_campaign', 'utm_source',
  ])
  assert.equal(url.searchParams.get('referrer'), 'https://meta.com')
  assert.equal(url.href.includes('owner%40example.com'), false)
})

test('storage failures retain current-runtime attribution', async () => {
  for (const localStorage of [
    undefined,
    {
      getItem: () => { throw new Error('disabled') },
      setItem: () => { throw new Error('quota') },
      removeItem: () => { throw new Error('blocked') },
    },
  ]) {
    const { getFirstTouch } = await importFresh('acquisition')
    const first = getFirstTouch({
      nowMs: 1_700_000_000_000,
      windowLike: {
        crypto: { randomUUID: () => 'acq_storage_fallback_1234' },
        location: { pathname: '/', search: '?utm_source=google' },
        document: { referrer: '' },
        localStorage,
      },
    })
    assert.equal(first.utm_source, 'google')
  }

})

test('key absent is a safe no-op with no initialization or capture', async () => {
  const { captureMarketingCta, capturePageview, initializeAnalytics } = await importFresh('analytics')
  const calls = []
  const client = {
    init: (...args) => calls.push(['init', ...args]),
    capture: (...args) => calls.push(['capture', ...args]),
  }
  assert.equal(initializeAnalytics({ client, env: {}, windowLike: {} }), false)
  capturePageview({ landing_path: '/' })
  captureMarketingCta({ cta: 'hero_text_remi', destination: 'guided' })
  assert.deepEqual(calls, [])
})

test('manual CTA tracking uses synchronous beacon transport and never blocks navigation', async () => {
  const { initializeAnalytics, installMarketingCtaTracking } = await importFresh('analytics')
  let listener
  const documentLike = {
    addEventListener: (_name, callback, capture) => {
      listener = callback
      assert.equal(capture, true)
    },
    removeEventListener() {},
  }
  const captures = []
  const client = {
    init() {},
    capture: (...args) => captures.push(args),
  }
  assert.equal(initializeAnalytics({
    client,
    env: { VITE_POSTHOG_KEY: 'phc_test', VITE_POSTHOG_HOST: 'https://us.i.posthog.com' },
    windowLike: {},
  }), true)
  installMarketingCtaTracking(documentLike)
  let prevented = false
  listener({
    preventDefault: () => { prevented = true },
    target: {
      closest: () => ({
        dataset: { marketingCta: 'footer_text_remi', marketingDestination: 'guided' },
      }),
    },
  })
  assert.equal(prevented, false)
  assert.equal(captures.length, 1)
  assert.equal(captures[0][0], 'marketing_cta_clicked')
  assert.deepEqual(captures[0][2], { send_instantly: true, transport: 'sendBeacon' })

  const throwing = await importFresh('analytics')
  throwing.initializeAnalytics({
    client: { init() {}, capture: () => { throw new Error('offline') } },
    env: { VITE_POSTHOG_KEY: 'phc_test', VITE_POSTHOG_HOST: 'https://us.i.posthog.com' },
    windowLike: {},
  })
  assert.doesNotThrow(() => throwing.trackMarketingCta('hero_text_remi', 'guided'))
})

test('actual PostHog transport beacons the CTA before full-page navigation', () => {
  const child = spawnSync(process.execPath, [fileURLToPath(import.meta.url), '--sdk-transport-child'], {
    encoding: 'utf8',
    timeout: 5_000,
  })
  assert.equal(child.status, 0, child.stderr || child.error?.message)
  const { beacons, config, fetchRequests, logs } = JSON.parse(child.stdout)
  assert.deepEqual(config, {
    autocapture: false,
    capture_pageview: false,
    capture_pageleave: false,
    disable_session_recording: true,
    save_campaign_params: false,
    save_referrer: false,
    advanced_disable_flags: true,
    disable_beacon: false,
  })
  assert.equal(fetchRequests.length, 1)
  assert.equal(beacons.length, 1)
  assert.equal(new URL(beacons[0].url).pathname, '/e/')
  assert.equal(beacons[0].body.event, 'marketing_cta_clicked')
  assert.equal(beacons[0].body.properties.cta, 'hero_text_remi')
  assert.equal(beacons[0].body.properties.destination, 'guided')
  assert.equal(logs.some((line) => line.includes('phc_test')), false)
})

test('before_send is a closed event and property privacy boundary', async () => {
  const { sanitizePostHogEvent } = await importFresh('analytics')
  const key = 'phc_test'
  const sanitized = sanitizePostHogEvent({
    event: 'marketing_cta_clicked',
    properties: {
      token: key,
      $lib: 'web',
      $insert_id: 'insert-1',
      acquisition_id: 'acq_marketing_1234567890',
      landing_path: '/start?email=owner@example.com',
      referrer_origin: 'https://google.com/search?q=private',
      utm_source: 'meta',
      cta: 'hero_text_remi',
      destination: 'guided',
      $current_url: 'https://hireremi.ai/start?email=owner@example.com',
      $referrer: 'https://google.com/search?q=private',
      email: 'owner@example.com',
      text: 'private form content',
    },
  }, key)
  assert.deepEqual(sanitized, {
    event: 'marketing_cta_clicked',
    properties: {
      token: key,
      $lib: 'web',
      $insert_id: 'insert-1',
      acquisition_id: 'acq_marketing_1234567890',
      referrer_origin: 'https://google.com',
      utm_source: 'meta',
      cta: 'hero_text_remi',
      destination: 'guided',
    },
  })
  assert.equal(sanitizePostHogEvent({ event: '$autocapture', properties: { token: key } }, key), null)
  assert.equal(sanitizePostHogEvent({ event: '$pageview', properties: { token: 'forged' } }, key), null)
})

test('every current primary CTA family has manual tracking and product entries are neutral', async () => {
  const families = new Map([
    ['src/components/global/announcement-bar.vue', ['announcement_text_remi']],
    ['src/components/header/global-header.vue', ['header_mobile_guided', 'header_guided']],
    ['src/components/hero/hero-a.vue', ['hero_text_remi']],
    ['src/components/hero/hero-b.vue', ['hero_text_remi']],
    ['src/components/sections/section-cta.vue', ['closing_text_remi']],
    ['src/components/home/home-hero.vue', ['home_text_remi']],
    ['src/components/about/about-page.vue', ['about_text_remi']],
    ['src/components/pricing/pricing-page.vue', ['pricing_text_remi']],
    ['src/components/pricing/pricing-plans.vue', ['pricing_pro_guided', 'pricing_scale_guided']],
    ['src/components/sections/section-why-remi.vue', ['comparison_guided']],
    ['src/components/sections/components/bento-dialog-artifacts-documents.vue', ['artifacts_text_remi']],
    ['src/components/sections/components/bento-dialog-shared-memory.vue', ['shared_memory_text_remi']],
    ['src/components/sections/components/bento-dialog-slack-agent.vue', ['slack_agent_text_remi']],
    ['src/components/sections/components/bento-dialog-tool-sync.vue', ['tool_sync_text_remi']],
    ['src/components/security/security-page.vue', ['security_text_remi']],
    ['src/components/solutions/solution-feature.vue', ['solution_feature_text_remi']],
    ['src/components/solutions/solution-page.vue', ['solution_hero_text_remi']],
  ])
  for (const [file, ctas] of families) {
    const source = await readFile(join(root, file), 'utf8')
    for (const cta of ctas) assert.match(source, new RegExp(`['\"]${cta}['\"]`, 'u'), `${file}: ${cta}`)
  }

  const header = await readFile(join(root, 'src/components/header/global-header.vue'), 'utf8')
  const pricing = await readFile(join(root, 'src/components/pricing/pricing-plans.vue'), 'utf8')
  const signupRedirect = await readFile(
    join(root, 'src/components/global/signup-redirect.vue'),
    'utf8',
  )
  const prerender = await readFile(join(root, 'scripts/prerender.mjs'), 'utf8')
  assert.match(header, /getOnboardingEntry\('guided'\)/u)
  assert.match(pricing, /getOnboardingEntry\('guided'\)/u)
  assert.doesNotMatch(pricing, /<Button href="https:\/\/remi\.new\/login"/u)
  assert.match(signupRedirect, /buildGuidedOnboardingRedirect/u)
  assert.match(signupRedirect, /buildProductEntryLink\('guided'\)/u)
  assert.match(signupRedirect, /window\.location\.replace\(destination\)/u)
  assert.match(prerender, /writePage\(\s*'\/start'/u)
  assert.match(prerender, /href="\/api\/onboarding\/entry"/u)
  assert.doesNotMatch(prerender, /remi\.new\/start/u)
  assert.doesNotMatch(prerender, /REMI_TEXT_NUMBER|text-remi-qr|Open Messages/u)
})
