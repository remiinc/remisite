import { getOnboardingEntry } from './acquisition.js'

export const REMI_TEXT_NUMBER = '+12054017193'
export const REMI_TEXT_NUMBER_DISPLAY = '+1 (205) 401-7193'
export const REMI_TEXT_HREF = `sms:${REMI_TEXT_NUMBER}`

export const getTextRemiEntry = (options = {}) => {
  const entry = getOnboardingEntry('linq', options)
  if (entry.available) return entry
  return {
    ...entry,
    href: REMI_TEXT_HREF,
    available: true,
    attributionState: 'direct_unknown',
  }
}

export const isAppleDevice = (navigatorLike = typeof navigator === 'undefined' ? null : navigator) => {
  if (!navigatorLike) {
    return false
  }

  const platform = navigatorLike.userAgentData?.platform || navigatorLike.platform || ''
  const userAgent = navigatorLike.userAgent || ''

  return /Mac|iPhone|iPad|iPod/i.test(`${platform} ${userAgent}`)
}
