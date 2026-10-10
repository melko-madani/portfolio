import type { SiteConfig } from './types'

/**
 * Locale-independent configuration — every value flagged in
 * CONTENT_TO_CONFIRM.md must be checked by Yassine before the site goes live.
 */
export const site: SiteConfig = {
  // TO CONFIRM: no public email was found in the project material.
  email: '',
  // TO CONFIRM: URL taken from the previous portfolio draft; LinkedIn hides profiles behind a login wall so it could not be verified automatically.
  linkedin: { label: 'LinkedIn', href: 'https://www.linkedin.com/in/madaniyassine/', verified: false },
  // TO CONFIRM: no personal GitHub account was confirmed.
  github: null,
  // TO CONFIRM: no CV file was provided. Drop a PDF in /public and set e.g. '/cv/yassine-madani.pdf'.
  cvPath: null,
  // Disabled by default: professional availability is unknown.
  availability: { enabled: false },
  // Employer names appear because they are documented in public material (internship report). Set to false to anonymise.
  showEmployerNames: true,
  // TO CONFIRM: final domain. Used for canonical, Open Graph and hreflang URLs.
  siteUrl: 'https://yassinemadani.example',
}
