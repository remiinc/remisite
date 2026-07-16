import { posthog } from 'posthog-js'

import { getFirstTouch, normalizeAnalyticsProperties } from './acquisition.js'

const protocolProperties = [
  '$lib',
  '$lib_version',
  '$insert_id',
  'distinct_id',
  '$device_id',
  '$session_id',
]
const acquisitionProperties = [
  'acquisition_id',
  'landing_path',
  'referrer_origin',
  'utm_source',
  'utm_medium',
  'utm_campaign',
  'utm_term',
  'utm_content',
]
const safeSlugPattern = /^[A-Za-z0-9][A-Za-z0-9_-]{0,127}$/u
let analyticsClient = null
let initialized = false
let pageviewCaptured = false

function runtimeEnv(env) {
  if (env) return env
  if (import.meta.env) return import.meta.env
  return typeof process !== 'undefined' ? process.env : {}
}

function analyticsHost(value) {
  if (!value?.trim()) return null
  try {
    const url = new URL(value.trim())
    return ['https:', 'http:'].includes(url.protocol) && !url.username && !url.password
      ? url.origin
      : null
  } catch {
    return null
  }
}

function copyDefined(target, source, keys) {
  for (const key of keys) {
    if (source[key] !== undefined && source[key] !== null) target[key] = source[key]
  }
}

export function sanitizePostHogEvent(payload, configuredKey) {
  if (!payload || !['$pageview', 'marketing_cta_clicked'].includes(payload.event)) return null
  const source = payload.properties && typeof payload.properties === 'object'
    ? payload.properties
    : {}
  if (!configuredKey || source.token !== configuredKey) return null

  const properties = { token: configuredKey }
  copyDefined(properties, source, protocolProperties)
  copyDefined(properties, normalizeAnalyticsProperties(source), acquisitionProperties)
  if (payload.event === 'marketing_cta_clicked') {
    if (!safeSlugPattern.test(source.cta || '')) return null
    if (source.destination !== 'google' && source.destination !== 'linq') return null
    properties.cta = source.cta
    properties.destination = source.destination
  }
  return { event: payload.event, properties }
}

export function initializeAnalytics({
  client = posthog,
  env,
  windowLike = globalThis.window,
} = {}) {
  if (initialized) return true
  const values = runtimeEnv(env)
  const key = values.VITE_POSTHOG_KEY?.trim()
  const host = analyticsHost(values.VITE_POSTHOG_HOST)
  if (!key || !host || !windowLike) return false

  client.init(key, {
    api_host: host,
    api_transport: 'fetch',
    autocapture: false,
    capture_pageview: false,
    capture_pageleave: false,
    capture_exceptions: false,
    disable_session_recording: true,
    disable_surveys: true,
    disable_web_experiments: true,
    disable_external_dependency_loading: true,
    disable_beacon: true,
    disable_compression: true,
    save_campaign_params: false,
    save_referrer: false,
    advanced_disable_flags: true,
    person_profiles: 'never',
    request_batching: false,
    before_send: (event) => sanitizePostHogEvent(event, key),
  })
  analyticsClient = client
  initialized = true
  return true
}

export function capturePageview(firstTouch = getFirstTouch()) {
  if (!analyticsClient || pageviewCaptured) return
  const properties = normalizeAnalyticsProperties(firstTouch)
  if (!properties.landing_path) return
  pageviewCaptured = true
  analyticsClient.capture('$pageview', properties)
}

export function captureMarketingCta({ cta, destination, ...firstTouch }) {
  if (!analyticsClient) return
  analyticsClient.capture('marketing_cta_clicked', {
    ...normalizeAnalyticsProperties(firstTouch),
    cta,
    destination,
  })
}

export function trackMarketingCta(cta, destination) {
  captureMarketingCta({
    ...getFirstTouch(),
    cta,
    destination,
  })
}
