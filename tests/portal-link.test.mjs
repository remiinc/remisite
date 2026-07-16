import assert from 'node:assert/strict'
import { test } from 'node:test'

import { buildProductEntryLink } from '../src/lib/acquisition.js'

const firstTouch = {
  acquisition_id: 'acq_marketing_1234567890',
  created_at: 1_700_000_000_000,
  landing_path: '/pricing',
  referrer_origin: 'https://google.com',
  utm_source: 'google',
  utm_medium: 'cpc',
  utm_campaign: 'summer',
  utm_term: 'bookkeeper',
  utm_content: 'hero',
}

test('migrates portal links to the canonical Google entry builder', () => {
  assert.equal(
    buildProductEntryLink('google', {
      env: { VITE_REMI_ENTRY_ORIGIN: 'https://remi.new' },
      firstTouch,
      nowMs: 1_700_000_000_000,
    }),
    'https://remi.new/start/google?acquisition_id=acq_marketing_1234567890&landing_path=%2Fpricing&referrer=https%3A%2F%2Fgoogle.com&utm_source=google&utm_medium=cpc&utm_campaign=summer&utm_term=bookkeeper&utm_content=hero',
  )
})

test('builds both product entries from the same privacy allowlist', () => {
  const options = {
    env: { VITE_REMI_ENTRY_ORIGIN: 'https://remi.new/private?token=secret' },
    firstTouch: { ...firstTouch, email: 'owner@example.com', token: 'secret' },
    nowMs: 1_700_000_000_000,
  }

  assert.equal(buildProductEntryLink('google', options), null)
  assert.equal(buildProductEntryLink('linq', options), null)

  const linq = new URL(buildProductEntryLink('linq', {
    ...options,
    env: { VITE_REMI_ENTRY_ORIGIN: 'https://remi.new/' },
  }))
  assert.equal(linq.pathname, '/start/linq')
  assert.deepEqual([...linq.searchParams.keys()], [
    'acquisition_id',
    'landing_path',
    'referrer',
    'utm_source',
    'utm_medium',
    'utm_campaign',
    'utm_term',
    'utm_content',
  ])
})
