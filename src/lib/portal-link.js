/**
 * Append the current page's allowlisted UTM query params to a portal URL so first-touch
 * attribution can be captured on remi.new. Client-side only; returns the base
 * URL unchanged during SSR/prerender or when there are no utm params.
 *
 * @param {string} portalUrl - Absolute portal URL (e.g. https://remi.new/login)
 * @returns {string}
 */
export function portalLink(portalUrl) {
  if (typeof window === 'undefined' || !window.location || !portalUrl) {
    return portalUrl
  }

  const pageParams = new URLSearchParams(window.location.search)
  const utmParams = new URLSearchParams()

  for (const key of ['utm_source', 'utm_medium', 'utm_campaign', 'utm_term', 'utm_content']) {
    const value = pageParams.get(key)?.trim()
    if (value) {
      utmParams.set(key, value.slice(0, 128))
    }
  }

  if ([...utmParams.keys()].length === 0) {
    return portalUrl
  }

  const url = new URL(portalUrl, window.location.origin)
  for (const [key, value] of utmParams.entries()) {
    url.searchParams.set(key, value)
  }

  return url.toString()
}

export default portalLink
