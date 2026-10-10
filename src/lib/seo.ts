import { getContent, locales, localizePath, parsePath, type Locale } from '../content'
import { site } from '../content/site'

export interface RouteMeta {
  locale: Locale
  /** Locale-free path, e.g. `/work/btpextract`. */
  path: string
  /** Localised path, e.g. `/fr/work/btpextract`. */
  localizedPath: string
  title: string
  description: string
  type: 'website' | 'article'
}

function baseTitle(locale: Locale): string {
  const { profile } = getContent(locale)
  return locale === 'fr'
    ? `${profile.name} — Ingénieur IA & Automatisation intelligente`
    : `${profile.name} — AI Engineer & Intelligent Automation`
}

/** Every route that must exist as a static HTML file after the build. */
export function getStaticRoutes(): string[] {
  const routes: string[] = []
  for (const locale of locales) {
    const { projects } = getContent(locale)
    routes.push(localizePath(locale, '/'))
    for (const p of projects) routes.push(localizePath(locale, `/work/${p.slug}`))
  }
  return routes
}

export function getRouteMeta(pathname: string): RouteMeta {
  const { locale, path } = parsePath(pathname)
  const { profile, projects } = getContent(locale)
  const localizedPath = localizePath(locale, path)
  if (path === '/') {
    return { locale, path, localizedPath, title: baseTitle(locale), description: profile.intro, type: 'website' }
  }
  const match = path.match(/^\/work\/([^/]+)$/)
  if (match) {
    const project = projects.find((p) => p.slug === match[1])
    if (project) {
      return {
        locale,
        path,
        localizedPath,
        title: `${project.title} — ${project.subtitle} · ${profile.name}`,
        description: project.seoDescription,
        type: 'article',
      }
    }
  }
  return {
    locale,
    path,
    localizedPath,
    title: locale === 'fr' ? `Page introuvable · ${profile.name}` : `Page not found · ${profile.name}`,
    description: profile.intro,
    type: 'website',
  }
}

export function absoluteUrl(path: string): string {
  const base = site.siteUrl.replace(/\/+$/, '')
  return path === '/' ? `${base}/` : `${base}${path}`
}

/** Renders the <head> tags injected by the prerender script. */
export function renderHeadTags(meta: RouteMeta): string {
  const url = absoluteUrl(meta.localizedPath)
  const image = absoluteUrl('/og-image.png')
  const esc = (s: string) => s.replace(/&/g, '&amp;').replace(/"/g, '&quot;').replace(/</g, '&lt;')
  const alternates = locales.map(
    (l) => `<link rel="alternate" hreflang="${l}" href="${esc(absoluteUrl(localizePath(l, meta.path)))}" />`,
  )
  alternates.push(`<link rel="alternate" hreflang="x-default" href="${esc(absoluteUrl(meta.path))}" />`)
  return [
    `<title>${esc(meta.title)}</title>`,
    `<meta name="description" content="${esc(meta.description)}" />`,
    `<link rel="canonical" href="${esc(url)}" />`,
    ...alternates,
    `<meta property="og:type" content="${meta.type}" />`,
    `<meta property="og:locale" content="${meta.locale === 'fr' ? 'fr_FR' : 'en_GB'}" />`,
    `<meta property="og:title" content="${esc(meta.title)}" />`,
    `<meta property="og:description" content="${esc(meta.description)}" />`,
    `<meta property="og:url" content="${esc(url)}" />`,
    `<meta property="og:image" content="${esc(image)}" />`,
    `<meta property="og:image:width" content="1200" />`,
    `<meta property="og:image:height" content="630" />`,
    `<meta property="og:site_name" content="${esc(getContent(meta.locale).profile.name)}" />`,
    `<meta name="twitter:card" content="summary_large_image" />`,
    `<meta name="twitter:title" content="${esc(meta.title)}" />`,
    `<meta name="twitter:description" content="${esc(meta.description)}" />`,
    `<meta name="twitter:image" content="${esc(image)}" />`,
  ].join('\n    ')
}
