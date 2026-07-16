export const ACQUISITION_STORAGE_KEY = 'remi_first_touch_v1'
export const ACQUISITION_MAX_AGE_MS = 90 * 24 * 60 * 60 * 1000

export const ACQUISITION_LANDING_PATHS = Object.freeze([
  '/',
  '/pricing',
  '/security',
  '/start',
  '/solutions',
  '/solutions/auto-repair',
  '/solutions/cleaning-services',
  '/solutions/electrical-services',
  '/solutions/general-contractors',
  '/solutions/home-remodeling',
  '/solutions/hvac-services',
  '/solutions/landscaping-services',
  '/solutions/marketing-agencies',
  '/solutions/plumbing-services',
  '/solutions/roofing-services',
  '/resources',
  '/resources/ai-employee-vs-virtual-assistant',
  '/resources/ask-for-deposit-before-starting-work',
  '/resources/change-order-confirmation-text-template',
  '/resources/charge-late-fees-without-burning-relationship',
  '/resources/client-wont-pay-step-by-step-playbook',
  '/resources/estimate-follow-up-how-soon-how-often',
  '/resources/follow-through-not-another-dashboard',
  '/resources/follow-up-unpaid-invoice-without-losing-client',
  '/resources/friday-money-review-checklist',
  '/resources/housecall-pro-payment-reminders',
  '/resources/jobber-estimate-invoice-follow-ups',
  '/resources/keep-change-orders-in-writing',
  '/resources/late-payment-reminder-templates',
  '/resources/net-30-vs-due-on-receipt',
  '/resources/quickbooks-online-automatic-invoice-reminders',
  '/resources/remi-private-beta',
  '/resources/remi-vs-lindy-vs-viktor',
  '/resources/remi-vs-part-time-office-manager',
  '/resources/respond-first-win-the-job',
  '/resources/what-is-an-ai-back-office',
  '/resources/why-clients-pay-late-follow-up-cadence',
])

const landingPaths = new Set(ACQUISITION_LANDING_PATHS)
const scalarPattern = /^[A-Za-z0-9][A-Za-z0-9_-]{0,127}$/u
const acquisitionIdPattern = /^[A-Za-z0-9_-]{16,128}$/u
const collapsedPhonePattern = /\d{7,}/u
const utmKeys = ['utm_source', 'utm_medium', 'utm_campaign', 'utm_term', 'utm_content']
let memoryFirstTouch = null
let fallbackSequence = 0

function safeScalar(value) {
  if (typeof value !== 'string' || !scalarPattern.test(value)) return null
  return collapsedPhonePattern.test(value.replace(/[_-]/gu, '')) ? null : value
}

function safeLandingPath(value) {
  if (typeof value !== 'string') return null
  const normalized = value.replace(/\/+$/u, '') || '/'
  return landingPaths.has(normalized) ? normalized : null
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
      try {
        storage.removeItem(ACQUISITION_STORAGE_KEY)
      } catch {
        // Memory storage remains available when browser storage is blocked.
      }
    }
    return touch
  } catch {
    return null
  }
}

function createAcquisitionId(windowLike, nowMs) {
  const cryptoLike = windowLike?.crypto ?? globalThis.crypto
  try {
    const id = cryptoLike?.randomUUID?.()
    if (typeof id === 'string' && acquisitionIdPattern.test(id)) return id
  } catch {
    // Use the runtime-safe fallback below.
  }
  try {
    const bytes = new Uint8Array(16)
    cryptoLike?.getRandomValues?.(bytes)
    if (bytes.some((byte) => byte !== 0)) {
      return `acq_${[...bytes].map((byte) => byte.toString(16).padStart(2, '0')).join('')}`
    }
  } catch {
    // Use the runtime-safe fallback below.
  }
  fallbackSequence += 1
  const random = Math.random().toString(36).slice(2).padEnd(12, '0').slice(0, 12)
  return `acq_${nowMs.toString(36)}_${fallbackSequence.toString(36).padStart(4, '0')}_${random}`
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
  try {
    storage?.setItem(ACQUISITION_STORAGE_KEY, JSON.stringify(created))
  } catch {
    // The in-memory copy still preserves the first touch for this page session.
  }
  return created
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

export function appendAcquisitionToUrl(urlValue, options = {}) {
  if (!urlValue) return urlValue
  const windowLike = options.windowLike ?? globalThis.window
  const touch = normalizeStoredTouch(
    options.firstTouch ?? getFirstTouch({ ...options, windowLike }),
    options.nowMs ?? Date.now(),
  )
  if (!touch) return urlValue

  try {
    const url = new URL(urlValue, windowLike?.location?.origin)
    url.searchParams.set('acquisition_id', touch.acquisition_id)
    if (touch.landing_path) url.searchParams.set('landing_path', touch.landing_path)
    if (touch.referrer_origin) url.searchParams.set('referrer', touch.referrer_origin)
    for (const key of utmKeys) {
      if (touch[key]) url.searchParams.set(key, touch[key])
    }
    return url.toString()
  } catch {
    return urlValue
  }
}
