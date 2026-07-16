import { mkdirSync, writeFileSync } from 'node:fs'
import { dirname, join } from 'node:path'
import { fileURLToPath } from 'node:url'
import QRCode from 'qrcode'
import { REMI_TEXT_HREF } from '../src/lib/start-contact.js'

const root = join(dirname(fileURLToPath(import.meta.url)), '..')
const outputPath = join(root, 'public/images/start/text-remi-qr.svg')
const componentPath = join(root, 'src/components/start/text-remi-qr.vue')

mkdirSync(dirname(outputPath), { recursive: true })

const generatedSvg = await QRCode.toString(REMI_TEXT_HREF, {
  type: 'svg',
  errorCorrectionLevel: 'M',
  margin: 4,
  color: {
    dark: '#000000',
    light: '#00000000',
  },
})

const themedSvg = generatedSvg
  .replace(/<path fill="#00000000"[^>]*\/>/, '')
  .replace('stroke="#000000"', 'fill="none" stroke="currentColor"')

writeFileSync(outputPath, themedSvg)
writeFileSync(componentPath, `<template>\n  ${themedSvg}\n</template>\n`)

console.log(`Generated ${outputPath} and ${componentPath}`)
