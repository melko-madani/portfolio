/**
 * Static prerender: renders every route to its own HTML file so that
 * /work/<slug> loads directly from any static host, with per-page metadata.
 *
 * Runs after `vite build` (client) and `vite build --ssr` (server bundle).
 */
import { mkdir, readFile, rm, writeFile } from 'node:fs/promises'
import path from 'node:path'
import { fileURLToPath, pathToFileURL } from 'node:url'

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..')
const dist = path.join(root, process.env.OUT_DIR || 'dist')
const ssrDir = path.join(root, process.env.SSR_DIR || 'dist-ssr')

const template = await readFile(path.join(dist, 'index.html'), 'utf8')
const { render, getStaticRoutes, getRouteMeta, renderHeadTags } = await import(
  pathToFileURL(path.join(ssrDir, 'entry-server.js')).href
)

const year = new Date().getFullYear()
const routes = getStaticRoutes()

for (const route of routes) {
  const html = render(route, year)
  const meta = getRouteMeta(route)
  const page = template
    .replace(/<!--seo-->[\s\S]*?<!--\/seo-->/, renderHeadTags(meta))
    .replace('<div id="root"><!--app-html--></div>', `<div id="root" data-year="${year}" data-route="${route}">${html}</div>`)

  const file = route === '/' ? path.join(dist, 'index.html') : path.join(dist, route, 'index.html')
  await mkdir(path.dirname(file), { recursive: true })
  await writeFile(file, page, 'utf8')
  console.log(`prerendered ${route} → ${path.relative(root, file)}`)
}

// 404 page (GitHub Pages, Cloudflare Pages and Netlify pick it up automatically).
const notFoundHtml = render('/__not_found__', year)
const notFoundMeta = getRouteMeta('/__not_found__')
await writeFile(
  path.join(dist, '404.html'),
  template
    .replace(/<!--seo-->[\s\S]*?<!--\/seo-->/, renderHeadTags(notFoundMeta))
    .replace('<div id="root"><!--app-html--></div>', `<div id="root" data-year="${year}" data-route="*">${notFoundHtml}</div>`),
  'utf8',
)
console.log('prerendered 404.html')

await rm(ssrDir, { recursive: true, force: true })
