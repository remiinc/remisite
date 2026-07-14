/**
 * Append the current page's utm_* query params to a portal URL so first-touch
 * attribution can be captured on remi.new. Client-side only; returns the base
 * URL unchanged during SSR/prerender or when there are no utm params.
 *
 * @param {string} portalUrl - Absolute portal URL (e.g. https://remi.new/login)
 * @returns {string}
 */
export function portalLink(portalUrl) {
  if (typeof window === 'undefined' || !portalUrl) {
    return portalUrl
  }

  const pageParams = new URLSearchParams(window.location.search)
  const utmParams = new URLSearchParams()

  for (const [key, value] of pageParams.entries()) {
    if (key.startsWith('utm_') && value) {
      utmParams.set(key, value)
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
