import assert from 'node:assert/strict'
import { readFile } from 'node:fs/promises'
import { test } from 'node:test'

const vercelConfig = JSON.parse(
  await readFile(new URL('../vercel.json', import.meta.url), 'utf8'),
)

const onboardingDestinations = new Map(
  (vercelConfig.rewrites ?? []).map(({ source, destination }) => [
    source,
    destination,
  ]),
)

test('hireremi.ai owns the complete guided onboarding journey', () => {
  assert.deepEqual(
    Object.fromEntries(onboardingDestinations),
    {
      '/_next/:path*': 'https://app.hireremi.ai/_next/:path*',
      '/api/auth/google/callback':
        'https://app.hireremi.ai/api/auth/google/callback',
      '/api/billing/checkout-session':
        'https://app.hireremi.ai/api/billing/checkout-session',
      '/api/integrations/google/:path*':
        'https://app.hireremi.ai/api/integrations/google/:path*',
      '/api/onboarding/entry': 'https://app.hireremi.ai/start',
      '/api/onboarding/guided/:path*':
        'https://app.hireremi.ai/api/onboarding/guided/:path*',
      '/images/onboarding/:path*':
        'https://app.hireremi.ai/images/onboarding/:path*',
      '/onboarding/:path*':
        'https://app.hireremi.ai/onboarding/:path*',
    },
  )
})

test('the proxy identifies the public origin after Vercel replaces forwarded hosts', () => {
  const proxyOrigins = new Map()
  for (const route of vercelConfig.routes ?? []) {
    const transform = route.transforms?.find(
      ({ type, op, target }) =>
        type === 'request.headers' &&
        op === 'set' &&
        target?.key === 'x-remi-guided-signup-origin',
    )
    if (transform && route.continue === true) {
      proxyOrigins.set(route.src, transform.args)
    }
  }

  for (const source of [
    '/api/onboarding/guided(?:/(.*))?',
    '/api/integrations/google(?:/(.*))?',
    '/api/auth/google/callback',
  ]) {
    assert.equal(proxyOrigins.get(source), 'https://hireremi.ai')
  }
  const guidedSource = '/api/onboarding/guided(?:/(.*))?'
  const guidedMatcher = new RegExp(`^${guidedSource}$`)
  assert.equal(guidedMatcher.test('/api/onboarding/guided'), true)
  assert.equal(guidedMatcher.test('/api/onboarding/guided/start'), true)
})
