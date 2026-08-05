import { getLegacySolutionRedirect } from './solution-redirects.js'

export const pageLoaders = Object.freeze({
  about: () => import('../components/about/about-page.vue'),
  blogIndex: () => import('../components/blog/blog-index-page.vue'),
  blogPost: () => import('../components/blog/blog-post-page.vue'),
  legal: () => import('../components/legal/legal-page.vue'),
  legacyRedirect: () => import('../components/global/legacy-redirect.vue'),
  pricing: () => import('../components/pricing/pricing-page.vue'),
  security: () => import('../components/security/security-page.vue'),
  solution: () => import('../components/solutions/solution-page.vue'),
  solutionsIndex: () => import('../components/solutions/solutions-index-page.vue'),
  signupRedirect: () => import('../components/global/signup-redirect.vue'),
})

export function getPageLoader(pathname) {
  const path = pathname.replace(/\/+$/, '') || '/'

  if (getLegacySolutionRedirect(path)) return pageLoaders.legacyRedirect
  if (path === '/about') return pageLoaders.about
  if (path === '/solutions') return pageLoaders.solutionsIndex
  if (path.startsWith('/solutions/')) return pageLoaders.solution
  if (path === '/resources') return pageLoaders.blogIndex
  if (path.startsWith('/resources/')) return pageLoaders.blogPost
  if (path === '/pricing') return pageLoaders.pricing
  if (path === '/security') return pageLoaders.security
  if (path === '/terms' || path === '/privacy') return pageLoaders.legal
  if (path === '/start') return pageLoaders.signupRedirect

  return null
}
