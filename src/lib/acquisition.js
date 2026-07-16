export const ACQUISITION_STORAGE_KEY = 'remi_first_touch_v1'
export const ACQUISITION_MAX_AGE_MS = 90 * 24 * 60 * 60 * 1000

export const ACQUISITION_LANDING_PATHS = Object.freeze([
  '/',
  '/pricing',
  '/qualify',
  '/qualify/contact',
  '/solutions/startups',
  '/solutions/small-businesses',
  '/solutions/mid-market',
  '/blog',
  '/blog/ai-employee-vs-virtual-assistant',
  '/blog/ask-for-deposit-before-starting-work',
  '/blog/change-order-confirmation-text-template',
  '/blog/charge-late-fees-without-burning-relationship',
  '/blog/client-wont-pay-step-by-step-playbook',
  '/blog/estimate-follow-up-how-soon-how-often',
  '/blog/follow-through-not-another-dashboard',
  '/blog/follow-up-unpaid-invoice-without-losing-client',
  '/blog/friday-money-review-checklist',
  '/blog/housecall-pro-payment-reminders',
  '/blog/jobber-estimate-invoice-follow-ups',
  '/blog/keep-change-orders-in-writing',
  '/blog/late-payment-reminder-templates',
  '/blog/net-30-vs-due-on-receipt',
  '/blog/quickbooks-online-automatic-invoice-reminders',
  '/blog/remi-private-beta',
  '/blog/remi-vs-lindy-vs-viktor',
  '/blog/remi-vs-part-time-office-manager',
  '/blog/respond-first-win-the-job',
  '/blog/what-is-an-ai-back-office',
  '/blog/why-clients-pay-late-follow-up-cadence',
  '/case-studies',
  '/case-studies/landscaping-change-orders',
  '/case-studies/painting-quiet-estimates',
  '/case-studies/remodeling-open-invoices',
  '/case-studies/roofing-final-payments',
])

const landingPaths = new Set(ACQUISITION_LANDING_PATHS)
const scalarPattern = /^[A-Za-z0-9][A-Za-z0-9_-]{0,127}$/u
const acquisitionIdPattern = /^[A-Za-z0-9_-]{16,128}$/u
const collapsedPhonePattern = /\d{7,}/u
const utmKeys = ['utm_source', 'utm_medium', 'utm_campaign', 'utm_term', 'utm_content']
let memoryFirstTouch = null

function runtimeEnv(env) {
  if (env) return env
  if (import.meta.env) return import.meta.env
  return typeof process !== 'undefined' ? process.env : {}
}

function safeScalar(value) {
  if (typeof value !== 'string' || !scalarPattern.test(value)) return null
  return collapsedPhonePattern.test(value.replace(/[_-]/gu, '')) ? null : value
}

function safeLandingPath(value) {
  return typeof value === 'string' && landingPaths.has(value) ? value : null
}

function safeReferrerOrigin(value) {
  if (typeof value !== 'string' || !value || value.length > 2048) return null
  try {
    const url = new URL(value)
    if (!['https:', 'http:'].includes(url.protocol) || url.username || url.password) return null
    return url.origin
  } catch {
    return null
  }
}

function normalizeStoredTouch(value, nowMs) {
  if (!value || typeof value !== 'object') return null
  if (!acquisitionIdPattern.test(value.acquisition_id) || !Number.isFinite(value.created_at)) return null
  if (value.created_at > nowMs || nowMs - value.created_at >= ACQUISITION_MAX_AGE_MS) return null

  const touch = {
    acquisition_id: value.acquisition_id,
    created_at: value.created_at,
  }
  const landingPath = safeLandingPath(value.landing_path)
  if (landingPath) touch.landing_path = landingPath
  const referrerOrigin = safeReferrerOrigin(value.referrer_origin)
  if (referrerOrigin) touch.referrer_origin = referrerOrigin
  for (const key of utmKeys) {
    const scalar = safeScalar(value[key])
    if (scalar) touch[key] = scalar
  }
  return touch
}

function storageFor(windowLike) {
  try {
    const storage = windowLike?.localStorage
    return storage && typeof storage.getItem === 'function' ? storage : null
  } catch {
    return null
  }
}

function readStoredTouch(storage, nowMs) {
  if (!storage) return null
  try {
    const raw = storage.getItem(ACQUISITION_STORAGE_KEY)
    if (!raw) return null
    const touch = normalizeStoredTouch(JSON.parse(raw), nowMs)
    if (!touch) {
      try { storage.removeItem(ACQUISITION_STORAGE_KEY) } catch { /* memory fallback owns recovery */ }
    }
    return touch
  } catch {
    return null
  }
}

function createAcquisitionId(windowLike, nowMs) {
  try {
    const id = windowLike?.crypto?.randomUUID?.()
    if (typeof id === 'string' && acquisitionIdPattern.test(id)) return id
  } catch { /* deterministic fallback below */ }
  return `acq_${nowMs.toString(36)}_${Math.random().toString(36).slice(2, 14)}`
}

function createFirstTouch(windowLike, nowMs) {
  const touch = {
    acquisition_id: createAcquisitionId(windowLike, nowMs),
    created_at: nowMs,
  }
  const landingPath = safeLandingPath(windowLike?.location?.pathname)
  if (landingPath) touch.landing_path = landingPath
  const referrerOrigin = safeReferrerOrigin(windowLike?.document?.referrer)
  if (referrerOrigin) touch.referrer_origin = referrerOrigin
  const params = new URLSearchParams(windowLike?.location?.search || '')
  for (const key of utmKeys) {
    const scalar = safeScalar(params.get(key))
    if (scalar) touch[key] = scalar
  }
  return touch
}

export function getFirstTouch({ nowMs = Date.now(), windowLike = globalThis.window } = {}) {
  const remembered = normalizeStoredTouch(memoryFirstTouch, nowMs)
  if (remembered) return remembered

  const storage = storageFor(windowLike)
  const stored = readStoredTouch(storage, nowMs)
  if (stored) {
    memoryFirstTouch = stored
    return stored
  }

  const created = createFirstTouch(windowLike, nowMs)
  memoryFirstTouch = created
  try { storage?.setItem(ACQUISITION_STORAGE_KEY, JSON.stringify(created)) } catch { /* memory fallback */ }
  return created
}

function entryOrigin(env) {
  const raw = runtimeEnv(env).VITE_REMI_ENTRY_ORIGIN?.trim()
  if (!raw) return null
  try {
    const url = new URL(raw)
    if (!['https:', 'http:'].includes(url.protocol) || url.username || url.password) return null
    if ((url.pathname !== '/' && url.pathname !== '') || url.search || url.hash) return null
    return url.origin
  } catch {
    return null
  }
}

export function buildProductEntryLink(destination, options = {}) {
  if (destination !== 'google' && destination !== 'linq') return null
  const origin = entryOrigin(options.env)
  if (!origin) return null
  const touch = normalizeStoredTouch(options.firstTouch ?? getFirstTouch(options), options.nowMs ?? Date.now())
  if (!touch) return null

  const url = new URL(`/start/${destination}`, origin)
  url.searchParams.set('acquisition_id', touch.acquisition_id)
  if (touch.landing_path) url.searchParams.set('landing_path', touch.landing_path)
  if (touch.referrer_origin) url.searchParams.set('referrer', touch.referrer_origin)
  for (const key of utmKeys) {
    if (touch[key]) url.searchParams.set(key, touch[key])
  }
  return url.toString()
}

export function getOnboardingEntry(destination, options = {}) {
  const href = buildProductEntryLink(destination, options)
  return { href, available: href !== null, destination }
}

export function normalizeAnalyticsProperties(value) {
  if (!value || typeof value !== 'object' || !acquisitionIdPattern.test(value.acquisition_id)) return {}
  const properties = { acquisition_id: value.acquisition_id }
  const landingPath = safeLandingPath(value.landing_path)
  if (landingPath) properties.landing_path = landingPath
  const referrerOrigin = safeReferrerOrigin(value.referrer_origin)
  if (referrerOrigin) properties.referrer_origin = referrerOrigin
  for (const key of utmKeys) {
    const scalar = safeScalar(value[key])
    if (scalar) properties[key] = scalar
  }
  return properties
}
