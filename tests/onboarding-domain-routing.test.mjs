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
      '/api/onboarding/entry': 'https://app.hireremi.ai/start',
      '/api/onboarding/guided/:path*':
        'https://app.hireremi.ai/api/onboarding/guided/:path*',
      '/images/onboarding/:path*':
        'https://app.hireremi.ai/images/onboarding/:path*',
      '/onboarding/:path*':
        'https://app.hireremi.ai/onboarding/:path*',
      '/privacy': 'https://app.hireremi.ai/privacy',
      '/terms': 'https://app.hireremi.ai/terms',
    },
  )
})
