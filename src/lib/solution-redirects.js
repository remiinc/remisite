export const legacySolutionRedirects = {
  '/case-studies': '/solutions',
  '/case-studies/landscaping-change-orders': '/solutions/landscaping-services',
  '/case-studies/remodeling-open-invoices': '/solutions/home-remodeling',
  '/case-studies/roofing-final-payments': '/solutions/roofing-services',
  '/case-studies/painting-quiet-estimates': '/solutions',
  '/solutions/startups': '/solutions',
  '/solutions/small-businesses': '/solutions',
  '/solutions/mid-market': '/solutions',
}

export const getLegacySolutionRedirect = (pathname) =>
  legacySolutionRedirects[pathname] ||
  (pathname.startsWith('/case-studies/') ? '/solutions' : '')
