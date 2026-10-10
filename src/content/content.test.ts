import { describe, expect, it } from 'vitest'
import { content } from './index'
import { getRouteMeta, getStaticRoutes } from '../lib/seo'

const { projects, experience, education, site, ui } = content

describe('project content', () => {
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
      expect(p.visualCaption.length).toBeGreaterThan(10)
      expect(p.caseStudySections.length).toBeGreaterThan(0)
      const ids = p.caseStudySections.map((s) => s.id)
      expect(new Set(ids).size).toBe(ids.length)
    }
  })

  it('contains no placeholder copy', () => {
    const text = JSON.stringify(content).toLowerCase()
    for (const forbidden of ['lorem', 'ipsum', 'coming soon', 'todo', 'tbd']) {
      expect(text, `found "${forbidden}"`).not.toContain(forbidden)
    }
  })

  it('only uses http(s) or mailto links', () => {
    const links = [site.linkedin, site.github, ...projects.flatMap((p) => p.links)].filter(Boolean) as { href: string }[]
    for (const l of links) expect(l.href).toMatch(/^(https?:\/\/|mailto:)/)
    if (site.email) expect(site.email).toMatch(/^[^@\s]+@[^@\s]+\.[^@\s]+$/)
  })

  it('does not show the availability indicator unless explicitly enabled', () => {
    expect(typeof site.availability.enabled).toBe('boolean')
  })
})

describe('experience and education', () => {
  it('provides a fallback organisation label for anonymised entries', () => {
    for (const e of experience) expect(e.organisationFallback.length).toBeGreaterThan(3)
  })
  it('lists the three known degrees', () => {
    expect(education.map((e) => e.id)).toEqual(['master', 'licence', 'dut'])
  })
})

describe('routing and SEO', () => {
  it('prerenders the home page and one page per project', () => {
    expect(getStaticRoutes()).toEqual(['/', ...projects.map((p) => `/work/${p.slug}`)])
  })
  it('gives each project page a specific title and description', () => {
    const titles = new Set<string>()
    for (const p of projects) {
      const meta = getRouteMeta(`/work/${p.slug}`)
      expect(meta.title).toContain(p.title)
      expect(meta.description.length).toBeGreaterThan(40)
      titles.add(meta.title)
    }
    expect(titles.size).toBe(projects.length)
  })
  it('points navigation at sections that exist on the home page', () => {
    for (const item of ui.nav) expect(item.href).toMatch(/^\/#(work|about|experience|contact)$/)
  })
})
