import { describe, expect, it } from 'vitest'
import { getContent, locales, localizePath, parsePath } from './index'
import { getRouteMeta, getStaticRoutes, renderHeadTags } from '../lib/seo'

const en = getContent('en')
const fr = getContent('fr')

describe.each(locales)('%s content', (locale) => {
  const { projects, experience, education, site, ui } = getContent(locale)

  it('has unique, URL-safe slugs and sequential numbers', () => {
    const slugs = projects.map((p) => p.slug)
    expect(new Set(slugs).size).toBe(slugs.length)
    for (const slug of slugs) expect(slug).toMatch(/^[a-z0-9-]+$/)
    expect(projects.map((p) => p.number)).toEqual(projects.map((_, i) => String(i + 1).padStart(2, '0')))
  })

  it('declares an exact status, a role and a visual caveat for every project', () => {
    for (const p of projects) {
      expect(p.statusLabel.length).toBeGreaterThan(3)
      expect(p.role.length).toBeGreaterThan(10)
      expect(p.roleShort.length).toBeGreaterThan(3)
      expect(p.visualCaption.length).toBeGreaterThan(10)
      expect(p.caseStudySections.length).toBeGreaterThan(0)
      const ids = p.caseStudySections.map((s) => s.id)
      expect(new Set(ids).size).toBe(ids.length)
    }
  })

  it('contains no placeholder copy', () => {
    const text = JSON.stringify(getContent(locale)).toLowerCase()
    for (const forbidden of ['lorem', 'ipsum', 'coming soon', 'bientôt disponible', 'todo', 'tbd']) {
      expect(text, `found "${forbidden}"`).not.toContain(forbidden)
    }
  })

  it('only uses http(s) or mailto links', () => {
    const links = [site.linkedin, site.github, ...projects.flatMap((p) => p.links)].filter(Boolean) as { href: string }[]
    for (const l of links) expect(l.href).toMatch(/^(https?:\/\/|mailto:)/)
    if (site.email) expect(site.email).toMatch(/^[^@\s]+@[^@\s]+\.[^@\s]+$/)
  })

  it('provides a fallback organisation label for anonymised entries and lists the three known degrees', () => {
    for (const e of experience) expect(e.organisationFallback.length).toBeGreaterThan(3)
    expect(education.map((e) => e.id)).toEqual(['master', 'licence', 'dut'])
  })

  it('points navigation at sections that exist on the home page', () => {
    for (const item of ui.nav) expect(['work', 'about', 'experience', 'contact']).toContain(item.hash)
  })
})

describe('locale parity', () => {
  it('has the same projects, sections, facts and stacks in both languages', () => {
    expect(fr.projects.map((p) => p.slug)).toEqual(en.projects.map((p) => p.slug))
    for (const [i, p] of en.projects.entries()) {
      const q = fr.projects[i]
      expect(q.caseStudySections.map((s) => s.id)).toEqual(p.caseStudySections.map((s) => s.id))
      expect(q.status).toBe(p.status)
      expect(q.year).toBe(p.year)
      expect(q.stack.length).toBe(p.stack.length)
      expect(q.visual).toBe(p.visual)
      expect(q.layout).toBe(p.layout)
      for (const [j, s] of p.caseStudySections.entries()) {
        expect(q.caseStudySections[j].facts?.length).toBe(s.facts?.length)
        expect(q.caseStudySections[j].bullets?.length).toBe(s.bullets?.length)
        expect(q.caseStudySections[j].paragraphs?.length).toBe(s.paragraphs?.length)
      }
    }
    expect(fr.experience.map((e) => e.id)).toEqual(en.experience.map((e) => e.id))
    expect(fr.capabilities.map((c) => c.id)).toEqual(en.capabilities.map((c) => c.id))
  })

  it('keeps the site configuration shared', () => {
    expect(fr.site).toBe(en.site)
  })
})

describe('routing and SEO', () => {
  it('maps localised paths both ways', () => {
    expect(localizePath('en', '/work/x')).toBe('/work/x')
    expect(localizePath('fr', '/work/x')).toBe('/fr/work/x')
    expect(localizePath('fr', '/')).toBe('/fr')
    expect(localizePath('fr', '/#work')).toBe('/fr#work')
    expect(parsePath('/fr/work/x')).toEqual({ locale: 'fr', path: '/work/x' })
    expect(parsePath('/fr')).toEqual({ locale: 'fr', path: '/' })
    expect(parsePath('/frankly')).toEqual({ locale: 'en', path: '/frankly' })
  })

  it('prerenders the home page and one page per project in both languages', () => {
    const expected = [
      '/',
      ...en.projects.map((p) => `/work/${p.slug}`),
      '/fr',
      ...fr.projects.map((p) => `/fr/work/${p.slug}`),
    ]
    expect(getStaticRoutes()).toEqual(expected)
  })

  it('gives each project page a specific, localised title and hreflang alternates', () => {
    for (const locale of locales) {
      const { projects } = getContent(locale)
      const titles = new Set<string>()
      for (const p of projects) {
        const meta = getRouteMeta(localizePath(locale, `/work/${p.slug}`))
        expect(meta.locale).toBe(locale)
        expect(meta.title).toContain(p.title)
        expect(meta.description.length).toBeGreaterThan(40)
        titles.add(meta.title)
        const head = renderHeadTags(meta)
        expect(head).toContain('hreflang="en"')
        expect(head).toContain('hreflang="fr"')
        expect(head).toContain('hreflang="x-default"')
      }
      expect(titles.size).toBe(projects.length)
    }
  })
})
