import type { Capability, EducationEntry, ExperienceEntry } from '../types'

/**
 * Experience entries. Dates and titles are only shown when confirmed by a
 * source (see CONTENT_TO_CONFIRM.md). `organisation` is rendered only when
 * `site.showEmployerNames` is true; otherwise `organisationFallback` is used.
 */
export const experience: ExperienceEntry[] = [
  {
    id: 'current',
    // TO CONFIRM: official title and start date of the current position.
    period: 'Current',
    role: 'AI & Digital Solutions',
    organisation: 'Melko Énergie',
    organisationFallback: 'Energy and tax consultancy, France',
    kind: 'employment',
    summary:
      'Design and integration of AI and digital solutions for an energy and tax consultancy: process automation, document processing and technical implementation.',
    bullets: [],
    relatedProject: 'btpextract',
  },
  {
    id: 'internship',
    period: '2026',
    role: 'AI Engineer — end-of-studies internship',
    organisation: 'Melko Énergie',
    organisationFallback: 'Energy and tax consultancy, France',
    kind: 'internship',
    summary:
      'Designed and delivered BTPExtract, a local document-intelligence pipeline for supplier invoices, from needs analysis to evaluation.',
    bullets: [
      'Ran the needs analysis and formalised measurable acceptance criteria with the team.',
      'Explored a fine-tuned document model, documented its limits and pivoted to a local LLM with supplier-specific prompts.',
      'Built the application, its administration tools and an evaluation bench used to accept the delivery.',
    ],
    relatedProject: 'btpextract',
  },
  {
    id: 'business-analyst',
    // TO CONFIRM: organisation, dates and publishable scope of this role.
    period: 'Earlier',
    role: 'Business Analyst',
    organisation: null,
    organisationFallback: 'Enterprise software context',
    kind: 'employment',
    summary:
      'Requirements gathering, business-process analysis and stakeholder communication in an enterprise-software context, including on-site work with business teams.',
    bullets: [],
  },
]

export const education: EducationEntry[] = [
  {
    id: 'master',
    period: '2026',
    degree: 'Master’s degree',
    field: 'Intelligent Systems Engineering — AI & Data Science',
    institution: 'Faculté des Sciences Aïn Chock, Université Hassan II',
    location: 'Casablanca',
  },
  {
    id: 'licence',
    degree: 'Professional bachelor’s degree (Licence professionnelle)',
    field: 'Information Systems and Networks Engineering',
    institution: 'École Supérieure de Technologie',
    location: 'Safi',
  },
  {
    id: 'dut',
    degree: 'DUT',
    field: 'Computer Engineering',
    institution: 'École Supérieure de Technologie',
    location: 'Safi',
  },
]

export const capabilities: Capability[] = [
  {
    id: 'document-intelligence',
    title: 'AI & document intelligence',
    problem: 'Turning heterogeneous documents into structured, validated data — locally when confidentiality demands it.',
    tools: ['Local LLMs (Ollama)', 'OCR (DocTR)', 'Structured extraction', 'Prompt engineering', 'Validation rules', 'Evaluation benches'],
  },
  {
    id: 'automation',
    title: 'Automation & integration',
    problem: 'Connecting systems and removing repetitive work: collection, scheduled jobs, notifications and APIs.',
    tools: ['REST APIs', 'Web scraping', 'Scheduled pipelines', 'Email alerts & digests', 'Workflow orchestration'],
  },
  {
    id: 'data-backend',
    title: 'Data & backend',
    problem: 'Modelling, storing and serving data reliably, from a single SQLite file to a streaming cluster.',
    tools: ['Python', 'FastAPI', 'SQL · SQLite', 'Data processing', 'Kafka · Spark · Cassandra'],
  },
  {
    id: 'digital-products',
    title: 'Digital products',
    problem: 'Shipping usable interfaces on top of the data: catalogues, dashboards, admin tools and prototypes.',
    tools: ['React', 'TypeScript', 'Vite', 'Tailwind CSS', 'Functional UX', 'Prototyping'],
  },
  {
    id: 'business-analysis',
    title: 'Business analysis',
    problem: 'Understanding how an organisation works before changing it, and writing it down so everyone agrees.',
    tools: ['Process mapping', 'Requirements & specifications', 'Acceptance criteria', 'Stakeholder communication'],
  },
]
