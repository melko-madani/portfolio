import type { Story } from '../types'

/**
 * The five cards fanned out in the hero. Every statement is backed by the
 * same sources as the rest of the site (internship report, previous draft,
 * brief); nothing here goes beyond what the About and Experience sections say.
 */
export const stories: Story[] = [
  {
    id: 'who',
    label: ['Who', 'I am'],
    title: 'Who I am',
    pattern: 'portrait',
    paragraphs: [
      'My name is Yassine. I am an AI engineer working where business analysis, data and software meet.',
      'I design and build systems that turn messy operational workflows — supplier invoices, public tenders, HR signals — into something structured, measurable and maintainable by the people who use them.',
    ],
  },
  {
    id: 'path',
    label: ['Safi to', 'Casablanca'],
    title: 'From Safi to Casablanca',
    pattern: 'road',
    paragraphs: [
      'I started with a DUT in computer engineering and a professional bachelor’s degree in information systems and networks at the École Supérieure de Technologie in Safi.',
      'I then moved to Casablanca for a master’s in intelligent systems engineering, in the AI and data science track, at Université Hassan II — completed in 2026 with an end-of-studies internship in France.',
    ],
  },
  {
    id: 'detour',
    label: ['The analyst', 'detour'],
    title: 'The business-analyst detour',
    pattern: 'grid',
    paragraphs: [
      'Before engineering AI systems, I worked as a business analyst: requirements, process mapping, and a lot of conversations with the people who actually run the process.',
      'It changed how I build. On my internship project I wrote nineteen specification files before the code, and defined the acceptance criteria before the first experiment.',
    ],
  },
  {
    id: 'local',
    label: ['Local', 'first'],
    title: 'Local-first AI',
    pattern: 'documents',
    paragraphs: [
      'During my end-of-studies internship, confidentiality ruled out cloud document APIs. So BTPExtract runs OCR and a nine-billion-parameter language model on a single machine, with zero outbound network calls.',
      'The twist I am proudest of: the extraction rules live in plain configuration files, so the business team adds a new supplier in minutes without a developer.',
    ],
  },
  {
    id: 'method',
    label: ['Measure,', 'then ship'],
    title: 'Measure, then ship',
    pattern: 'waves',
    paragraphs: [
      'I prefer measurable objectives over impressions, explicit assumptions over implicit ones, and a simple system that is maintained over a clever one that is abandoned.',
      'Understand, frame, design, build, validate — and when a problem does not need a model, I say so.',
    ],
  },
]
