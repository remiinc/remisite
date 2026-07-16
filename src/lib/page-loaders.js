import { getLegacySolutionRedirect } from './solution-redirects.js'

export const pageLoaders = Object.freeze({
  blogIndex: () => import('../components/blog/blog-index-page.vue'),
  blogPost: () => import('../components/blog/blog-post-page.vue'),
  legacyRedirect: () => import('../components/global/legacy-redirect.vue'),
  pricing: () => import('../components/pricing/pricing-page.vue'),
  security: () => import('../components/security/security-page.vue'),
  solution: () => import('../components/solutions/solution-page.vue'),
  solutionsIndex: () => import('../components/solutions/solutions-index-page.vue'),
  start: () => import('../components/start/start-page.vue'),
})

export function getPageLoader(pathname) {
  const path = pathname.replace(/\/+$/, '') || '/'

  if (getLegacySolutionRedirect(path)) return pageLoaders.legacyRedirect
  if (path === '/solutions') return pageLoaders.solutionsIndex
  if (path.startsWith('/solutions/')) return pageLoaders.solution
  if (path === '/resources') return pageLoaders.blogIndex
  if (path.startsWith('/resources/')) return pageLoaders.blogPost
  if (path === '/pricing') return pageLoaders.pricing
  if (path === '/security') return pageLoaders.security
  if (path === '/start') return pageLoaders.start

  return null
}
