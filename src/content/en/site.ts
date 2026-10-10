import type { Profile, SiteConfig } from '../types'

/**
 * Provisional configuration — every value flagged in CONTENT_TO_CONFIRM.md
 * must be checked by Yassine before the site goes live.
 */
export const site: SiteConfig = {
  // TO CONFIRM: no public email was found in the project material.
  email: '',
  // TO CONFIRM: URL taken from the previous portfolio draft; LinkedIn hides profiles behind a login wall so it could not be verified automatically.
  linkedin: { label: 'LinkedIn', href: 'https://www.linkedin.com/in/madaniyassine/', verified: false },
  // TO CONFIRM: no GitHub account was found in the project material.
  github: null,
  // TO CONFIRM: no CV file was provided. Drop a PDF in /public and set e.g. '/cv/yassine-madani.pdf'.
  cvPath: null,
  // Disabled by default: professional availability is unknown.
  availability: { enabled: false, label: 'Open to opportunities' },
  // Employer names appear because they are documented in public material (internship report). Set to false to anonymise.
  showEmployerNames: true,
  // TO CONFIRM: final domain. Used for canonical and Open Graph URLs.
  siteUrl: 'https://yassinemadani.example',
}

export const profile: Profile = {
  name: 'Yassine Madani',
  firstName: 'Yassine',
  initials: 'YM',
  title: 'AI Engineer · Intelligent Automation · Digital Solutions',
  tagline: 'Turning complex workflows into intelligent systems.',
  intro:
    'I design and build AI-powered solutions that connect business needs, data and software — from local document intelligence to automated digital workflows.',
  contextLine: ['AI engineering', 'Automation', 'Digital products'],
  portrait: {
    src: '/images/yassine-madani.jpg',
    alt: 'Portrait of Yassine Madani',
    width: 400,
    height: 400,
  },
}
