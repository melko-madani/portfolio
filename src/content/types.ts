// Content model shared by every locale. Each locale provides the exact same
// structure (`src/content/en`, `src/content/fr`) — the components never
// hardcode copy.

export type Locale = 'en' | 'fr'

export interface ExternalLink {
  label: string
  href: string
  /** Set to true once the URL has been checked by Yassine. Unverified links are still rendered but listed in CONTENT_TO_CONFIRM.md. */
  verified: boolean
}

/** Locale-independent configuration (contact details, toggles, site URL). */
export interface SiteConfig {
  /** Public email. Leave empty to hide email CTAs (the contact section then falls back to LinkedIn). */
  email: string
  linkedin: ExternalLink | null
  github: ExternalLink | null
  /** Path under /public to a real CV file. Leave null to hide the download link. */
  cvPath: string | null
  /** Availability indicator — disabled by default because the situation is unknown. */
  availability: { enabled: boolean }
  /** Whether employer names may appear publicly. */
  showEmployerNames: boolean
  /** Canonical site URL, used for Open Graph and hreflang tags once deployed. */
  siteUrl: string
}

export interface Profile {
  name: string
  firstName: string
  initials: string
  /** Short label shown next to the wordmark in the header. */
  shortTitle: string
  title: string
  /** Three headline lines; the last one is set in italic sage. */
  headline: [string, string, string]
  intro: string
  contextLine: string[]
  availabilityLabel: string
  portrait: { src: string; alt: string; width: number; height: number }
}

export type ProjectStatus = 'internship' | 'professional' | 'personal' | 'academic' | 'hackathon' | 'prototype' | 'production'

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

export type VisualKind = 'btpextract' | 'lead-engine' | 'mp-maroc' | 'streaming-pipeline' | 'talent-orchestrator'

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
  /** Short role used in the project list. */
  roleShort: string
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

/**
 * The hero's fanned cards: short personal stories, each with a graphic
 * pattern drawn in the site's palette. Clicking a card opens the story deck.
 */
export type StoryPattern = 'portrait' | 'road' | 'grid' | 'documents' | 'waves'

export interface Story {
  id: string
  /** Two-line label: a bold first line and a serif second line (e.g. "Who" / "I am"). */
  label: [string, string]
  /** Accessible name of the card button and heading of the story. */
  title: string
  paragraphs: string[]
  pattern: StoryPattern
}

export interface VisualLabels {
  lead: {
    sources: string
    sourceItems: [string, string][]
    accounts: string
    sortedBy: string
    rows: { name: string; meta: string; signals: string[]; tier: string; score: string }[]
    explained: string
    handoff: string
    steps: [string, string][]
    privacy: string
    schedule: string[]
  }
  btp: {
    output: string
    supplier: string
    supplierValue: string
    consistency: string
    outbound: string
    steps: string[]
    invoiceAlt: string
  }
  streaming: {
    title: string
    producers: string
    source: string
    kafka: string
    kafkaSub: string
    kafkaNote: string
    spark: string
    sparkSub: string
    sparkSteps: [string, string, string]
    sparkNote: string
    cassandra: string
    cassandraSub: string
    cassandraNote: string
    metrics: string
    metricsSub: string
    metricsLabel: string
    metricsNote: [string, string]
  }
  talent: {
    title: string
    signals: string
    signalItems: [string, string, string]
    proxies: [string, string]
    orchestrator: string
    orchestratorSub: string
    steps: [string, string, string, string]
    human: [string, string]
    humanActions: string
    discuss: string
    outputs: [[string, string], [string, string], [string, string]]
    feedback: string
    safeguardsTitle: string
    safeguards: [string, string]
  }
}

export interface UiStrings {
  localeName: string
  /** Label of the link that switches to the other language, e.g. "Français" on the English site. */
  switchLanguage: { label: string; ariaLabel: string }
  skipToContent: string
  mainNav: string
  openMenu: string
  closeMenu: string
  homeAria: string
  nav: { label: string; hash: string }[]
  hero: { primaryCta: string; secondaryCta: string }
  stories: {
    /** Prefix of each card's accessible name, e.g. "View" → "View Who I am". */
    view: string
    /** Label of the header button that opens the deck on the first story. */
    open: string
    close: string
    previous: string
    next: string
    /** Accessible label of the deck dialog. */
    dialogLabel: string
    /** Small caption under the fan, e.g. "Five cards about me — tap one". */
    hint: string
  }
  work: { eyebrow: string; heading: string; intro: string; readCaseStudy: string; role: string; status: string; stack: string; projectPrefix: string }
  about: { eyebrow: string }
  capabilities: { eyebrow: string; heading: string }
  experience: { eyebrow: string; heading: string; intro: string; roleKind: string; internshipKind: string; caseStudySuffix: string }
  education: { eyebrow: string; heading: string }
  contact: { eyebrow: string; headingBefore: string; headingAccent: string; headingAfter: string; text: string; emailCta: string; linkedinCta: string }
  footer: { rights: string; builtWith: string; downloadCv: string }
  caseStudy: { backToWork: string; onThisPage: string; nextProject: string; year: string; links: string }
  notFound: { heading: string; text: string; cta: string }
  visuals: VisualLabels
}

export interface Content {
  locale: Locale
  site: SiteConfig
  profile: Profile
  ui: UiStrings
  about: AboutContent
  stories: Story[]
  projects: Project[]
  experience: ExperienceEntry[]
  education: EducationEntry[]
  capabilities: Capability[]
}
