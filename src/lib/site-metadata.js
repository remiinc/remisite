export const SITE_URL = 'https://hireremi.ai'
export const DEFAULT_OG_IMAGE = '/images/opengraph/og-default-a.jpg'
export const DEFAULT_OG_IMAGE_ALT = 'Remi social preview showing a phone, an invoice-paid notification, and the message “Grow your business. Let Remi handle the admin.”'
export const OG_IMAGE_WIDTH = 1200
export const OG_IMAGE_HEIGHT = 630
export const INDEX_ROBOTS = 'index, follow, max-image-preview:large'
export const REDIRECT_ROBOTS = 'noindex, follow'

export const toAbsoluteSiteUrl = (path) => new URL(path, SITE_URL).href

export const getOgImageType = (path) => {
  const pathname = new URL(path, SITE_URL).pathname.toLowerCase()

  if (pathname.endsWith('.png')) return 'image/png'
  if (pathname.endsWith('.webp')) return 'image/webp'

  return 'image/jpeg'
}
