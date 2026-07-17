import assert from 'node:assert/strict'
import { readFile } from 'node:fs/promises'
import { join } from 'node:path'
import test from 'node:test'
import { fileURLToPath } from 'node:url'
import { injectPrerenderBody } from '../scripts/prerender-shell.mjs'

const root = join(fileURLToPath(new URL('.', import.meta.url)), '..')

test('prerender handoff preserves money copy and masks the fallback until Vue mounts', async () => {
  const template = '<html><head></head><body><div id="app" class="overscroll-none"></div></body></html>'
  const staticBody = '<main>Pro is $119, Scale is $239, and annual is $199.</main>'
  const output = injectPrerenderBody(template, staticBody)

  assert.equal(output.match(/id="app"/gu)?.length, 1)
  assert.match(output, /Pro is \$119, Scale is \$239, and annual is \$199\./u)
  assert.match(output, /data-prerendered/u)
  assert.match(output, /#app\[data-prerendered\]::before/u)
  assert.match(output, /<noscript>/u)

  const mainSource = await readFile(join(root, 'src/main.js'), 'utf8')
  assert.match(mainSource, /removeAttribute\(['"]data-prerendered['"]\)/u)
})
