import { content } from '../content'

export interface RouteMeta {
  path: string
  title: string
  description: string
  type: 'website' | 'article'
}

const { profile, projects, site } = content

const baseTitle = `${profile.name} — AI Engineer & Intelligent Automation`

/** Every route that must exist as a static HTML file after the build. */
export function getStaticRoutes(): string[] {
  return ['/', ...projects.map((p) => `/work/${p.slug}`)]
}

export function getRouteMeta(pathname: string): RouteMeta {
  const clean = pathname.replace(/\/+$/, '') || '/'
  if (clean === '/') {
    return { path: '/', title: baseTitle, description: profile.intro, type: 'website' }
  }
  const match = clean.match(/^\/work\/([^/]+)$/)
  if (match) {
    const project = projects.find((p) => p.slug === match[1])
    if (project) {
      return {
        path: clean,
        title: `${project.title} — ${project.subtitle} · ${profile.name}`,
        description: project.seoDescription,
        type: 'article',
      }
    }
  }
  return {
    path: clean,
    title: `Page not found · ${profile.name}`,
    description: profile.intro,
    type: 'website',
  }
}

export function absoluteUrl(path: string): string {
  return `${site.siteUrl.replace(/\/+$/, '')}${path === '/' ? '/' : path}`
}

/** Renders the <head> tags injected by the prerender script. */
export function renderHeadTags(meta: RouteMeta): string {
  const url = absoluteUrl(meta.path)
  const image = absoluteUrl('/og-image.png')
  const esc = (s: string) => s.replace(/&/g, '&amp;').replace(/"/g, '&quot;').replace(/</g, '&lt;')
  return [
    `<title>${esc(meta.title)}</title>`,
    `<meta name="description" content="${esc(meta.description)}" />`,
    `<link rel="canonical" href="${esc(url)}" />`,
    `<meta property="og:type" content="${meta.type}" />`,
    `<meta property="og:title" content="${esc(meta.title)}" />`,
    `<meta property="og:description" content="${esc(meta.description)}" />`,
    `<meta property="og:url" content="${esc(url)}" />`,
    `<meta property="og:image" content="${esc(image)}" />`,
    `<meta property="og:image:width" content="1200" />`,
    `<meta property="og:image:height" content="630" />`,
    `<meta property="og:site_name" content="${esc(profile.name)}" />`,
    `<meta name="twitter:card" content="summary_large_image" />`,
    `<meta name="twitter:title" content="${esc(meta.title)}" />`,
    `<meta name="twitter:description" content="${esc(meta.description)}" />`,
    `<meta name="twitter:image" content="${esc(image)}" />`,
  ].join('\n    ')
}
