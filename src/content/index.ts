import type { Content, Locale } from './types'
import { profile, site } from './en/site'
import { about, ui } from './en/ui'
import { projects } from './en/projects'
import { capabilities, education, experience } from './en/experience'

const en: Content = {
  locale: 'en',
  site,
  profile,
  ui,
  about,
  projects,
  experience,
  education,
  capabilities,
}

const contents: Record<Locale, Content> = { en }

export function getContent(locale: Locale = 'en'): Content {
  return contents[locale]
}

export const content = en
export type { Content, Project } from './types'
