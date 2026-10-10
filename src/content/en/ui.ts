import type { AboutContent, UiStrings } from '../types'

export const ui: UiStrings = {
  skipToContent: 'Skip to content',
  mainNav: 'Main navigation',
  openMenu: 'Open menu',
  closeMenu: 'Close menu',
  nav: [
    { label: 'Work', href: '/#work' },
    { label: 'About', href: '/#about' },
    { label: 'Experience', href: '/#experience' },
    { label: 'Contact', href: '/#contact' },
  ],
  hero: {
    primaryCta: 'Explore selected work',
    secondaryCta: 'Get in touch',
  },
  work: {
    eyebrow: 'Selected work',
    heading: 'Systems built around real operational problems.',
    intro:
      'Four projects, each presented with its exact status and my actual role: a document-intelligence tool delivered during an internship, a public-procurement data product, an academic streaming architecture and a hackathon concept.',
    readCaseStudy: 'Read the case study',
    role: 'Role',
    status: 'Status',
    stack: 'Stack',
  },
  about: { eyebrow: 'About' },
  capabilities: {
    eyebrow: 'Capabilities',
    heading: 'Organised by the problems they solve, not by logos.',
  },
  experience: {
    eyebrow: 'Experience',
    heading: 'From business analysis to AI engineering.',
    intro:
      'Two complementary sides of the same practice: understanding how an organisation works, then building the systems that make it work better.',
  },
  education: { eyebrow: 'Education', heading: 'Education' },
  contact: {
    eyebrow: 'Contact',
    heading: 'Have a workflow that deserves a better system?',
    text: 'I am happy to discuss document processing, automation, data products or AI integration — starting with the problem, not the technology.',
    emailCta: 'Write me an email',
    linkedinCta: 'Connect on LinkedIn',
  },
  footer: {
    rights: 'All rights reserved.',
    builtWith: 'Designed and built with React, TypeScript and Tailwind CSS. Set in Instrument Serif, Inter and JetBrains Mono.',
  },
  caseStudy: {
    backToWork: 'All work',
    onThisPage: 'On this page',
    nextProject: 'Next project',
    overview: 'Overview',
  },
  notFound: {
    heading: 'This page does not exist.',
    text: 'The address may have changed, or the link you followed is out of date.',
    cta: 'Back to the homepage',
  },
}

export const about: AboutContent = {
  heading: 'I build technology around the way people actually work.',
  paragraphs: [
    'My path runs from computer engineering and information systems to intelligent systems and data science, with a detour through business analysis. That detour matters: before writing a line of code, I want to understand the process, the constraints and the people who will live with the result.',
    'Most of my work sits where a business problem meets data and software: extracting structured information from messy documents without sending them to the cloud, turning a public data firehose into a monitored feed, or framing how an AI assistant could support a team without replacing human judgement.',
    'I prefer measurable objectives over impressions, explicit assumptions over implicit ones, and a simple system that is maintained over a clever one that is abandoned. When a problem does not need a model, I say so.',
  ],
  approachHeading: 'How I work',
  approach: [
    { step: '01', title: 'Understand', text: 'Map the process, the users, the data and the operational constraints before proposing anything.' },
    { step: '02', title: 'Frame', text: 'Formalise the need as measurable objectives and acceptance criteria that can be verified, not debated.' },
    { step: '03', title: 'Design', text: 'Choose the simplest architecture that meets the constraints — local, cloud, rule-based or model-based.' },
    { step: '04', title: 'Build', text: 'Implement in small iterations with specifications, tests and an evaluation loop from the first week.' },
    { step: '05', title: 'Validate', text: 'Measure against the criteria, document what did not work, and hand over something people can maintain.' },
  ],
}
