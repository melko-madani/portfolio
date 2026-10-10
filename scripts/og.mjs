/**
 * Generates the Open Graph image and the Apple touch icon from SVG using sharp.
 * Run once (`npm run og:generate`) and commit the PNGs in /public.
 */
import { readFile, writeFile } from 'node:fs/promises'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import sharp from 'sharp'

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..')
const publicDir = path.join(root, 'public')

// Fonts are embedded as data URIs so the render does not depend on system fonts.
const fontDir = path.join(root, 'node_modules/@fontsource/instrument-serif/files')
const interDir = path.join(root, 'node_modules/@fontsource-variable/inter/files')
const toDataUri = async (file) => `data:font/woff2;base64,${(await readFile(file)).toString('base64')}`

const serif = await toDataUri(path.join(fontDir, 'instrument-serif-latin-400-normal.woff2'))
const serifItalic = await toDataUri(path.join(fontDir, 'instrument-serif-latin-400-italic.woff2'))
const inter = await toDataUri(path.join(interDir, 'inter-latin-wght-normal.woff2'))

const og = `
<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="630" viewBox="0 0 1200 630">
  <defs>
    <style>
      @font-face { font-family: 'ISR'; src: url(${serif}) format('woff2'); }
      @font-face { font-family: 'ISI'; src: url(${serifItalic}) format('woff2'); }
      @font-face { font-family: 'IN'; src: url(${inter}) format('woff2'); }
    </style>
  </defs>
  <rect width="1200" height="630" fill="#F5F3EE"/>
  <text x="80" y="110" font-family="IN, sans-serif" font-size="20" letter-spacing="4" fill="#4F6657">AI ENGINEER · INTELLIGENT AUTOMATION · DIGITAL SOLUTIONS</text>
  <text x="80" y="290" font-family="ISR, serif" font-size="112" letter-spacing="-4" fill="#171918">Turning complex</text>
  <text x="80" y="400" font-family="ISR, serif" font-size="112" letter-spacing="-4" fill="#171918">workflows into</text>
  <text x="80" y="510" font-family="ISI, serif" font-size="112" letter-spacing="-4" fill="#4F6657">intelligent systems.</text>
  <line x1="80" y1="560" x2="1120" y2="560" stroke="#171918" stroke-opacity="0.2"/>
  <text x="80" y="596" font-family="ISR, serif" font-size="30" fill="#171918">Yassine Madani</text>
  <circle cx="1100" cy="590" r="8" fill="#728A78"/>
</svg>`

await writeFile(path.join(publicDir, 'og-image.png'), await sharp(Buffer.from(og)).png({ compressionLevel: 9 }).toBuffer())

const icon = `
<svg xmlns="http://www.w3.org/2000/svg" width="180" height="180" viewBox="0 0 64 64">
  <defs><style>@font-face { font-family: 'ISR'; src: url(${serif}) format('woff2'); }</style></defs>
  <rect width="64" height="64" rx="14" fill="#171918"/>
  <text x="32" y="43" text-anchor="middle" font-family="ISR, serif" font-size="34" fill="#F5F3EE" letter-spacing="-1">YM</text>
  <circle cx="50" cy="15" r="4" fill="#728A78"/>
</svg>`
await writeFile(path.join(publicDir, 'apple-touch-icon.png'), await sharp(Buffer.from(icon)).resize(180, 180).png().toBuffer())

console.log('generated public/og-image.png and public/apple-touch-icon.png')
