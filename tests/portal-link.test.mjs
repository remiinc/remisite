import assert from 'node:assert/strict'
import { afterEach, test } from 'node:test'

import { portalLink } from '../src/lib/portal-link.js'

const originalWindowDescriptor = Object.getOwnPropertyDescriptor(globalThis, 'window')

function setWindow(value) {
  Object.defineProperty(globalThis, 'window', {
    configurable: true,
    writable: true,
    value,
  })
}

afterEach(() => {
  if (originalWindowDescriptor) {
    Object.defineProperty(globalThis, 'window', originalWindowDescriptor)
  } else {
    delete globalThis.window
  }
})

test('returns the portal URL unchanged during SSR and prerender', () => {
  delete globalThis.window
  assert.equal(portalLink('https://remi.new/login'), 'https://remi.new/login')

  setWindow({})
  assert.equal(portalLink('https://remi.new/login'), 'https://remi.new/login')

  setWindow({ location: undefined })
  assert.equal(portalLink('https://remi.new/login'), 'https://remi.new/login')
})

test('forwards the five canonical UTM values and preserves the portal URL', () => {
  setWindow({
    location: {
      origin: 'https://hireremi.ai',
      search: '?utm_source=google&utm_medium=%20cpc%20&utm_campaign=summer&utm_term=bookkeeper&utm_content=hero',
    },
  })

  assert.equal(
    portalLink('https://remi.new/login?next=%2Finbox#sign-in'),
    'https://remi.new/login?next=%2Finbox&utm_source=google&utm_medium=cpc&utm_campaign=summer&utm_term=bookkeeper&utm_content=hero#sign-in',
  )
})

test('leaves tagged and bare portal URLs unchanged when the page has no usable UTM touch', () => {
  setWindow({
    location: {
      origin: 'https://hireremi.ai',
      search: '?utm_source=%20%20&utm_campaign=&gclid=secret',
    },
  })

  assert.equal(portalLink('https://remi.new/login'), 'https://remi.new/login')
  assert.equal(
    portalLink('https://remi.new/login?next=%2Fsettings&utm_source=existing'),
    'https://remi.new/login?next=%2Fsettings&utm_source=existing',
  )
})

test('keeps the first duplicate, tolerates malformed percent input, and clamps values', () => {
  const oversized = 'x'.repeat(160)
  setWindow({
    location: {
      origin: 'https://hireremi.ai',
      search: `?utm_source=first&utm_source=second&utm_campaign=%E0%A4%A&utm_content=${oversized}`,
    },
  })

  const result = new URL(portalLink('https://remi.new/login'))
  assert.equal(result.searchParams.get('utm_source'), 'first')
  assert.equal(result.searchParams.getAll('utm_source').length, 1)
  assert.equal(result.searchParams.has('utm_campaign'), true)
  assert.equal(result.searchParams.get('utm_content'), 'x'.repeat(128))
})

test('forwards exactly the five-key UTM allowlist and no lookalike or unrelated data', () => {
  setWindow({
    location: {
      origin: 'https://hireremi.ai',
      search: '?utm_source=google&utm_medium=cpc&utm_campaign=spring&utm_term=books&utm_content=nav&utm_id=private&utm_source_extra=private&utm_=private&email=owner%40example.com&token=secret',
    },
  })

  const result = new URL(portalLink('https://remi.new/login'))
  assert.deepEqual(
    [...result.searchParams.entries()],
    [
      ['utm_source', 'google'],
      ['utm_medium', 'cpc'],
      ['utm_campaign', 'spring'],
      ['utm_term', 'books'],
      ['utm_content', 'nav'],
    ],
  )
})

test('returns falsy portal inputs unchanged', () => {
  setWindow({ location: { origin: 'https://hireremi.ai', search: '?utm_source=google' } })
  assert.equal(portalLink(''), '')
  assert.equal(portalLink(null), null)
})
