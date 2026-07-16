import { appendAcquisitionToUrl } from './acquisition.js'

export function portalLink(portalUrl) {
  if (typeof window === 'undefined' || !portalUrl) {
    return portalUrl
  }
  return appendAcquisitionToUrl(portalUrl)
}

export default portalLink
