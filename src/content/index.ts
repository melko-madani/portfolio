import type { Content, Locale } from './types'
import { site } from './site'
import { profile as profileEn } from './en/profile'
import { stories as storiesEn } from './en/stories'
import { about as aboutEn, ui as uiEn } from './en/ui'
import { projects as projectsEn } from './en/projects'
import { capabilities as capabilitiesEn, education as educationEn, experience as experienceEn } from './en/experience'
import { profile as profileFr } from './fr/profile'
import { stories as storiesFr } from './fr/stories'
import { about as aboutFr, ui as uiFr } from './fr/ui'
import { projects as projectsFr } from './fr/projects'
import { capabilities as capabilitiesFr, education as educationFr, experience as experienceFr } from './fr/experience'

const en: Content = {
  locale: 'en',
  site,
  profile: profileEn,
  ui: uiEn,
  about: aboutEn,
  stories: storiesEn,
  projects: projectsEn,
  experience: experienceEn,
  education: educationEn,
  capabilities: capabilitiesEn,
}

const fr: Content = {
  locale: 'fr',
  site,
  profile: profileFr,
  ui: uiFr,
  about: aboutFr,
  stories: storiesFr,
  projects: projectsFr,
  experience: experienceFr,
  education: educationFr,
  capabilities: capabilitiesFr,
}

export const locales: Locale[] = ['en', 'fr']
export const defaultLocale: Locale = 'en'

const contents: Record<Locale, Content> = { en, fr }

export function getContent(locale: Locale = defaultLocale): Content {
  return contents[locale]
}

/** URL prefix of a locale: English lives at the root, French under /fr. */
export function localePrefix(locale: Locale): string {
  return locale === defaultLocale ? '' : `/${locale}`
}

/** Builds a locale-aware path from a locale-free one (e.g. `/work/btpextract`, `/#work`). */
export function localizePath(locale: Locale, path: string): string {
  const prefix = localePrefix(locale)
  if (!prefix) return path
  if (path === '/' || path === '') return prefix
  if (path.startsWith('/#')) return `${prefix}${path.slice(1)}`
  return `${prefix}${path}`
}

/** Splits a pathname into its locale and the locale-free path. */
export function parsePath(pathname: string): { locale: Locale; path: string } {
  const clean = pathname.replace(/\/+$/, '') || '/'
  for (const locale of locales) {
    const prefix = localePrefix(locale)
    if (!prefix) continue
    if (clean === prefix) return { locale, path: '/' }
    if (clean.startsWith(`${prefix}/`)) return { locale, path: clean.slice(prefix.length) }
  }
  return { locale: defaultLocale, path: clean }
}

export const content = en
export type { Content, Locale, Project } from './types'
