// Content model shared by every locale. Adding a French version means
// creating `src/content/fr/*.ts` with these exact types — the components
// never hardcode copy.

export type Locale = 'en'

export interface ExternalLink {
  label: string
  href: string
  /** Set to true once the URL has been checked by Yassine. Unverified links are still rendered but listed in CONTENT_TO_CONFIRM.md. */
  verified: boolean
}

export interface SiteConfig {
  /** Public email. Leave empty to hide email CTAs (the contact section then falls back to LinkedIn). */
  email: string
  linkedin: ExternalLink | null
  github: ExternalLink | null
  /** Path under /public to a real CV file. Leave null to hide the download link. */
  cvPath: string | null
  /** Availability indicator — disabled by default because the situation is unknown. */
  availability: { enabled: boolean; label: string }
  /** Whether employer names may appear publicly. */
  showEmployerNames: boolean
  /** Canonical site URL, used for Open Graph tags once deployed. */
  siteUrl: string
}

export interface Profile {
  name: string
  firstName: string
  initials: string
  title: string
  tagline: string
  intro: string
  contextLine: string[]
  portrait: { src: string; alt: string; width: number; height: number }
}

export type ProjectStatus =
  | 'internship'
  | 'personal'
  | 'academic'
  | 'hackathon'
  | 'prototype'
  | 'production'

export interface CaseStudySection {
  id: string
  heading: string
  paragraphs?: string[]
  bullets?: string[]
  /** Optional small data table (label / value rows). */
  facts?: { label: string; value: string }[]
  /** A footnote shown under the section in smaller type, for scope and caveats. */
  note?: string
}

export type VisualKind = 'btpextract' | 'mp-maroc' | 'streaming-pipeline' | 'talent-orchestrator'

export interface Project {
  slug: string
  number: string
  title: string
  subtitle: string
  category: string
  status: ProjectStatus
  statusLabel: string
  summary: string
  role: string
  /** Only set when confirmed by a source. */
  year?: string
  stack: string[]
  visual: VisualKind
  featured: boolean
  /** Layout variant used on the home page so the four projects do not look like four identical cards. */
  layout: 'wide' | 'split' | 'split-reverse' | 'compact'
  seoDescription: string
  caseStudySections: CaseStudySection[]
  links: ExternalLink[]
  /** Visible caveat rendered under the visual (for example: fictitious data). */
  visualCaption: string
}

export interface ExperienceEntry {
  id: string
  period: string
  role: string
  organisation: string | null
  organisationFallback: string
  kind: 'employment' | 'internship'
  summary: string
  bullets: string[]
  relatedProject?: string
}

export interface EducationEntry {
  id: string
  period?: string
  degree: string
  field: string
  institution: string
  location?: string
}

export interface Capability {
  id: string
  title: string
  problem: string
  tools: string[]
}

export interface AboutContent {
  heading: string
  paragraphs: string[]
  approachHeading: string
  approach: { step: string; title: string; text: string }[]
}

export interface UiStrings {
  skipToContent: string
  mainNav: string
  openMenu: string
  closeMenu: string
  nav: { label: string; href: string }[]
  hero: { primaryCta: string; secondaryCta: string }
  work: { eyebrow: string; heading: string; intro: string; readCaseStudy: string; role: string; status: string; stack: string }
  about: { eyebrow: string }
  capabilities: { eyebrow: string; heading: string }
  experience: { eyebrow: string; heading: string; intro: string }
  education: { eyebrow: string; heading: string }
  contact: { eyebrow: string; heading: string; text: string; emailCta: string; linkedinCta: string }
  footer: { rights: string; builtWith: string }
  caseStudy: { backToWork: string; onThisPage: string; nextProject: string; overview: string }
  notFound: { heading: string; text: string; cta: string }
}

export interface Content {
  locale: Locale
  site: SiteConfig
  profile: Profile
  ui: UiStrings
  about: AboutContent
  projects: Project[]
  experience: ExperienceEntry[]
  education: EducationEntry[]
  capabilities: Capability[]
}
