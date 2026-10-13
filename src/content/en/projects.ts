import type { Project } from '../types'

/**
 * Project content. Facts come from the internship report (BTPExtract), the
 * MP Maroc source code, and the material Yassine supplied for an earlier
 * draft. Anything not backed by a source is listed in CONTENT_TO_CONFIRM.md.
 */
export const projects: Project[] = [
  {
    slug: 'btpextract',
    number: '01',
    title: 'BTPExtract',
    subtitle: 'Local document intelligence for construction invoices',
    category: 'Document intelligence · Local LLM',
    status: 'internship',
    statusLabel: 'End-of-studies internship project',
    summary:
      'A fully local pipeline that turns heterogeneous supplier invoices — native or scanned PDFs — into nine validated accounting fields, maintainable by non-developers through editable supplier rules and a built-in evaluation bench.',
    role: 'Sole developer, from needs analysis and architecture to implementation and evaluation, within a small consultancy and under academic supervision.',
    roleShort: 'Sole developer',
    year: '2026',
    stack: ['Python', 'FastAPI', 'DocTR', 'PyMuPDF', 'Ollama · Gemma 2 9B', 'YAML configuration', 'Jinja2', 'Tailwind CSS', 'Vanilla JS', 'openpyxl'],
    visual: 'btpextract',
    featured: true,
    layout: 'wide',
    visualCaption: 'Illustrative recreation of the extraction view with a fictitious invoice. No real supplier or financial data is shown.',
    seoDescription:
      'BTPExtract: a local, privacy-first document-intelligence pipeline that extracts and validates accounting fields from construction invoices with OCR and a local LLM.',
    links: [],
    caseStudySections: [
      {
        id: 'overview',
        heading: 'Overview',
        paragraphs: [
          'BTPExtract was built during my end-of-studies internship at a small energy and tax consultancy whose renovation projects generate monthly invoices from more than thirty construction suppliers — electricians, engineering offices, architects, auditors — each with its own layout and numbering.',
          'The tool reads a PDF, native or scanned, and returns nine accounting fields as structured JSON: invoice number and date, amounts excluding and including tax, VAT rate, supplier name, and the city, postcode and address of the works. Batches are exported to a colour-coded Excel workbook.',
        ],
      },
      {
        id: 'problem',
        heading: 'The problem',
        paragraphs: [
          'Invoice processing was entirely manual: open the PDF, find the fields, copy them into a spreadsheet, check. Repetitive, slow and error-prone for a team of a few people.',
          'Automating it through a cloud document API would have been technically simple. It was not an option: the invoices contain supplier and project financial data that cannot transit through third-party servers.',
        ],
      },
      {
        id: 'constraints',
        heading: 'Constraints',
        bullets: [
          'Confidentiality: no data may leave the machine during processing — verifiable by network analysis.',
          'Autonomy: business users must be able to add or adjust a supplier without a developer and without restarting the application.',
          'Zero recurring cost: no paid API, no subscription.',
          'Heterogeneity: thirty-plus suppliers, free-form layouts, native and scanned PDFs.',
          'Operability: the whole application starts with a single command on a GPU-equipped machine.',
        ],
        facts: [
          { label: 'Target accuracy', value: '≥ 85 % of fields correct on configured suppliers' },
          { label: 'Adding a supplier', value: '≤ 30 minutes without a developer' },
          { label: 'Processing time', value: '≤ 10 seconds per invoice' },
          { label: 'Outbound data', value: 'Zero external network calls' },
        ],
      },
      {
        id: 'role',
        heading: 'My role',
        paragraphs: [
          'I was the only developer on the project. I ran the needs analysis with the team, wrote the specifications, explored and compared approaches, designed the architecture, implemented the application and built the evaluation method used to accept it.',
          'The work was organised in iterative sprints, with nineteen specification files written before the corresponding code — a habit I kept from business analysis.',
        ],
      },
      {
        id: 'approach',
        heading: 'Approach: a documented pivot',
        paragraphs: [
          'The first approach fine-tuned LayoutLMv3, a document-understanding model, across fifteen training configurations. It plateaued at an F1 score of 0.55: with 86 annotated samples against an estimated minimum of 200, the bottleneck was data volume, not hyperparameters.',
          'Rather than force the technology, I pivoted to a local large language model guided by supplier-specific prompts. Generic prompting gave roughly 60–70 % field accuracy on the heterogeneous portfolio; formalising each supplier’s rules — number format, where the totals sit, VAT rate, known traps — in a dedicated prompt raised it to the 85–90 % range on configured suppliers in the first post-pivot tests.',
          'The lesson I kept: on low-data business extraction problems, explicit domain knowledge in prompts beat implicit supervised learning, and it stayed maintainable by the people who know the invoices.',
        ],
      },
      {
        id: 'system-design',
        heading: 'System design',
        paragraphs: ['Each invoice goes through seven deterministic steps, from raw PDF to validated JSON.'],
        bullets: [
          'OCR — PyMuPDF reads native PDFs directly; scanned pages are rendered at 144 dpi and read by DocTR. Fewer than fifty extractable tokens means the document is treated as scanned.',
          'Token repair — fragmented numbers (“2”, “860,00”, “€”) are merged using position rules so amounts survive OCR intact.',
          'Page selection — for long invoices, the header page is always kept and the totals page is chosen by a financial-keyword score.',
          'Text reconstruction — tokens are sorted by page, line and position to rebuild a readable layout.',
          'Supplier detection — keywords (company name, registration number, email domain) select the supplier’s rules, or a default prompt.',
          'Extraction — the specialised prompt and the reconstructed text are sent to Gemma 2 9B through Ollama, with temperature 0 and a fixed seed for reproducible results.',
          'Validation — the arithmetic consistency of the amounts (total incl. tax = total excl. tax × (1 + VAT)) is checked within ±5 %; inconsistent fields are flagged “to verify”.',
        ],
        note: 'The application is organised in five layers — pure business core, FastAPI API, Jinja2 and Tailwind interface, YAML configuration, and CLI scripts — with the rule that the core never depends on the web layer, so extraction can run from a test, a script or the command line.',
      },
      {
        id: 'implementation',
        heading: 'Implementation',
        bullets: [
          'Seven web pages: generic extraction, supplier-aware extraction, on-the-fly OCR, batch processing with Excel export, a prompt administration editor, an assisted prompt-generation lab and an evaluation bench.',
          'Supplier knowledge lives in editable YAML files — thirty active suppliers plus two protected system prompts — saved atomically and hot-reloaded without restarting.',
          'Assisted generation: from two to five sample invoices and their correct values, the local model drafts a new supplier prompt, which is auto-tested field by field before being integrated.',
          'Batch mode streams progress over Server-Sent Events and produces one Excel sheet per supplier plus a consolidated sheet, colour-coded green, orange and red.',
          'Evaluation bench: ground truth imported from corrected Excel exports, type-aware normalisation of dates, amounts and text, accuracy per field, per supplier and overall, and A/B comparison between two runs.',
        ],
      },
      {
        id: 'evaluation',
        heading: 'Evaluation and outcomes',
        paragraphs: [
          'Acceptance was defined before development and measured with the built-in bench on an internal ground-truth set, so the numbers below describe a specific corpus rather than a general accuracy claim.',
        ],
        facts: [
          { label: 'Accuracy target', value: 'Met: ≥ 85 % on the evaluated corpus' },
          { label: 'Field-level accuracy', value: '98.6 % on 351 fields (39 invoices, 3 suppliers)' },
          { label: 'Processing time', value: '≈ 5.2 s per invoice with pre-computed OCR' },
          { label: 'Inconsistency detection', value: '100 % of real arithmetic inconsistencies on a 35-invoice test set' },
          { label: 'Outbound traffic', value: 'None — OCR and model run locally' },
        ],
        note: 'Scope: a modest corpus concentrated on one supplier; figures for low-volume suppliers are indicative rather than statistically robust, and the evaluation did not yet cover all thirty configured suppliers. Earlier post-pivot estimates on a wider set were in the 85–90 % range. Operationally, the team reported that a monthly batch of around seventy-five invoices went from several hours of data entry to a few minutes of supervised processing.',
      },
      {
        id: 'learnings',
        heading: 'Learnings and limits',
        bullets: [
          'Architecture fit and data quality mattered more than hyperparameter tuning — the abandoned LayoutLMv3 track is documented in full because it shaped the final design.',
          'Determinism guarantees reproducibility, not correctness: the same error will reproduce identically, and a model update would require replaying the whole evaluation.',
          'The evaluation bench doubled as a diagnostic tool — four of the five residual mismatches turned out to be artefacts in the reference data, not extraction errors.',
          'Next steps identified: widen the ground-truth set, neutralise annotation suffixes during normalisation, and extend measured coverage to every configured supplier.',
        ],
      },
    ],
  },
  {
    slug: 'lead-engine',
    number: '02',
    title: 'Signal-driven lead engine',
    subtitle: 'From public sources to qualified leads, ready for outreach',
    category: 'Automation · Data product',
    status: 'professional',
    statusLabel: 'Professional project · built end to end',
    summary:
      'A sector-agnostic platform that watches public sources, turns what it finds into intent signals, scores and qualifies the organisations that have a reason to act now, and hands them to the sales team with verified contacts, an explained score and automated follow-ups — every rule versioned, every data point traceable.',
    role: 'Sole designer and developer: specification, data model, collectors, rules engine, scoring, screens, CRM integration and scheduling.',
    roleShort: 'Sole designer and developer',
    year: '2026',
    stack: ['Python 3.12', 'FastAPI', 'PostgreSQL', 'DuckDB', 'SQLAlchemy · Alembic', 'YAML rule sets', 'n8n', 'Docker', 'React', 'TypeScript', 'LLM classification', 'SSO (Entra ID)'],
    visual: 'lead-engine',
    featured: true,
    layout: 'split-reverse',
    visualCaption: 'Illustrative recreation of the account list and hand-off. Organisations, signals and scores are fictitious examples.',
    seoDescription:
      'A sector-agnostic lead engine: public-source collectors, versioned signal and scoring rules, human validation, CRM hand-off and automated follow-ups, built with FastAPI, PostgreSQL, n8n and React.',
    links: [],
    caseStudySections: [
      {
        id: 'overview',
        heading: 'Overview',
        paragraphs: [
          'Sales teams do not lack company directories; they lack a short list of organisations that have a reason to act now, with a verifiable motive for the call. This platform produces exactly that list.',
          'It collects official public sources, consolidates them into a clean universe of organisations, detects intent signals, scores each account with explained, versioned rules, and hands validated batches to the CRM with decision-maker contacts. The target segments, signals and weights are configuration, not code — so the same engine serves different offers and sectors.',
        ],
      },
      {
        id: 'problem',
        heading: 'The problem',
        paragraphs: [
          'Prospecting from raw lists wastes the two scarcest resources of a small sales team: attention and credibility. Calling an organisation without a reason burns the relationship; chasing stale data wastes the morning.',
          'The brief was therefore not “find companies” but “find the ones with a reason to act, say why, prove it, and keep the pipeline fresh without anyone watching it”.',
        ],
      },
      {
        id: 'constraints',
        heading: 'Constraints',
        bullets: [
          'Traceability: every displayed fact carries its source, its collection date and a link to verify it; every score can be explained after the fact, even if the data changed since.',
          'Reusability: segments, exclusions, signals and scoring weights live in versioned rule files reviewed by pull request, never hardcoded.',
          'Privacy: personal data only enters the system once an account is eligible, opt-outs arrive through a signed webhook, and a scheduled purge enforces retention.',
          'Operability: idempotent collectors that can be rerun after a failure without creating duplicates, and a freshness alert when a daily feed goes quiet.',
        ],
      },
      {
        id: 'role',
        heading: 'My role',
        paragraphs: [
          'I wrote the specification and the implementation plan, then built the platform alone over four iterations: foundation and universe of organisations, signals, scoring and screens, then contacts, CRM and privacy. Architecture decisions are recorded as short decision records alongside the code.',
        ],
      },
      {
        id: 'approach',
        heading: 'Approach',
        bullets: [
          'Separate what is collected from what is decided: raw records are stored as-is and timestamped; normalisation, entity resolution and rules run on top and can be replayed.',
          'Make the LLM a fact extractor, never a judge: it classifies what an organisation does from its public website; eligibility and scoring stay deterministic.',
          'Keep humans at the gates: ambiguous exclusions and uncertain entity matches go to a review queue, and a batch only reaches the CRM after someone validates it.',
          'Measure before trusting: a reference set of hand-labelled accounts checks that the exclusion gate leaks nothing, and calibration compares expected signal relevance with what reviewers actually decide.',
        ],
      },
      {
        id: 'system-design',
        heading: 'System design',
        paragraphs: ['Collect → normalise → decide → validate → hand off.'],
        bullets: [
          'Collectors, one per source: registry snapshots, legal announcements, job postings, public procurement notices, sector directories and company websites. Each writes idempotently into a raw store keyed by content hash.',
          'A core layer resolves organisations, establishments and contacts under a single identifier and keeps monthly snapshots so that growth and status changes become signals.',
          'A rules engine applies, in order, an exclusion gate, signal detection with weights, lifetimes and decay, then fit-plus-signal scoring that assigns tiers.',
          'Hand-off: eligible accounts are enriched with decision-maker contacts, validated in batches, synchronised to the CRM through its API with blocking checks and no-duplicate recovery, and tracked back through CRM webhooks.',
          'Scheduling: an orchestration tool runs the daily, weekly and monthly jobs through a token-protected jobs API and raises an alert when a feed is more than two days stale.',
        ],
        note: 'A companion engine handles the case workflow once a lead becomes a client: a versioned process model drives tasks by role, automatic reminders when a client input is pending (first after ten days, then weekly), and escalation after three reminders — so follow-ups never depend on someone remembering.',
      },
      {
        id: 'implementation',
        heading: 'Implementation',
        bullets: [
          'FastAPI backend on PostgreSQL with migrations; DuckDB for bulk registry filtering; HTTP client with rate limiting and backoff; an execution journal for every job.',
          'React screens for the account list, the account sheet with sources and raw data, the review queue, the rules in force and a dashboard; SSO with roles for management, reviewers and developers.',
          'Rule sets in YAML: targets, exclusions, signals, scoring, CRM field mapping — versioned and reviewed like code.',
          'Optional LLM classification of websites behind a feature flag, a polite crawler that respects robots.txt, and contact enrichment through an external API.',
          'Automated tests on the API and the rules, linting and type checking in continuous integration, Docker Compose for the whole stack.',
        ],
      },
      {
        id: 'status',
        heading: 'Status and learnings',
        paragraphs: [
          'The four planned iterations are delivered and the pipeline runs end to end on real public data. Some external accounts (a job-postings API, the contact-enrichment service, the CRM instance) were still being switched on at the time of writing, so no conversion figures are claimed here.',
          'What I would keep for any similar system: idempotent raw storage, rules as reviewed configuration, explained scores with their sources, and human validation before anything reaches a customer-facing tool.',
        ],
        note: 'The platform is presented without its sector or employer on purpose: the engine is configuration-driven and meant to serve several offers. Details that would identify a client or a market are omitted.',
      },
    ],
  },
  {
    slug: 'mp-maroc',
    number: '03',
    title: 'MP Maroc',
    subtitle: 'Monitoring Moroccan public tenders',
    category: 'Data product · Web platform',
    status: 'personal',
    statusLabel: 'Personal project · in development',
    summary:
      'A platform that collects public tenders from the official Moroccan portal, normalises them into a searchable catalogue with filters and deadlines, and lets users save searches, follow tenders and receive alerts.',
    role: 'Product design and full-stack development: scraper and API, data model, front-end and member features.',
    roleShort: 'Product design and full-stack development',
    year: '2026',
    stack: ['Python', 'FastAPI', 'SQLite', 'httpx · BeautifulSoup', 'React', 'TypeScript', 'Vite', 'Tailwind CSS'],
    visual: 'mp-maroc',
    featured: true,
    layout: 'split',
    visualCaption: 'Illustrative recreation of the tender catalogue. Tender titles, buyers and figures are fictitious examples.',
    seoDescription:
      'MP Maroc: a FastAPI and React platform that collects, normalises and monitors Moroccan public procurement notices with filters, saved searches and deadline alerts.',
    links: [],
    caseStudySections: [
      {
        id: 'overview',
        heading: 'Overview',
        paragraphs: [
          'Moroccan public bodies publish thousands of tenders on the official state portal. The portal is comprehensive, but hard to monitor daily, hard to search well and unforgiving on deadlines.',
          'MP Maroc turns that firehose into a structured, deadline-aware catalogue: tenders are collected automatically, normalised into a stable schema and exposed through a React interface with search, filters, statistics and member features. Every record links back to the official notice.',
        ],
      },
      {
        id: 'problem',
        heading: 'The problem',
        paragraphs: [
          'Businesses that live off public contracts miss opportunities not because the data is secret, but because nobody on the team is watching the portal every morning. The pain is attention and timing: filtering a public stream down to what is relevant, and never missing a submission date.',
        ],
      },
      {
        id: 'approach',
        heading: 'Approach',
        bullets: [
          'Start from one loop: search, save the search or create an alert, receive matches, open the tender, follow it, track the deadline, come back.',
          'Treat the data as an asset to normalise once — stable identifiers, consistent categories, sectors, regions and procedure types — so every feature reads from the same clean model.',
          'Ship the read-only catalogue first, then add accounts, saved searches, favourites and email alerts on top of the same API.',
        ],
      },
      {
        id: 'system-design',
        heading: 'System design',
        paragraphs: ['Collection → normalisation → storage → consultation.'],
        bullets: [
          'A scraper fetches the portal’s HTML with httpx, parses consultation rows with BeautifulSoup and normalises each tender into a local record.',
          'Identifiers are derived from portal references and a hash, so repeated imports stay idempotent (“insert or ignore”) and a scrape log tracks every run.',
          'SQLite stores tenders, richer detail records and the scrape history; the API serves paginated, filterable, sortable lists and aggregates.',
          'The front-end never scrapes: it reads the JSON API only.',
        ],
      },
      {
        id: 'implementation',
        heading: 'Implementation',
        bullets: [
          'Catalogue with keyword search and filters by category (works, supplies, services), sector, buyer, location or region, status, procedure type and deadline; sortable, paginated table.',
          'Tender detail pages with the official documents when available and a link back to the source notice.',
          'Statistics: active tenders, closing within seven days, new within seven days, distinct buyers, distribution by category, sector and procedure.',
          'Directories by sector, region and city for market discovery.',
          'Member space: authenticated accounts with email verification, saved searches, favourites and configurable email alerts with preview and scheduled digests.',
          'A guided bid-preparation assistant backed by an AI endpoint, to help understand a notice and assemble the administrative side of a candidacy.',
          'Automated tests on both sides: more than twenty backend test modules and a front-end test suite.',
        ],
      },
      {
        id: 'status',
        heading: 'Status and learnings',
        paragraphs: [
          'The project is a personal initiative under active development. It has not been validated with paying users, and no usage, time-saved or revenue figures are claimed.',
          'What it taught me: normalising messy public data is where most of the value and most of the work sits; idempotent collection and a scrape log make the pipeline safe to re-run; and member features are only as good as the quality of the matching behind the alerts.',
        ],
      },
    ],
  },
  {
    slug: 'realtime-data-pipeline',
    number: '04',
    title: 'Real-time data pipeline',
    subtitle: 'A streaming architecture from ingestion to observability',
    category: 'Data engineering · Academic project',
    status: 'academic',
    statusLabel: 'Academic project',
    summary:
      'A distributed architecture that ingests streaming events with Kafka, processes them with Spark Streaming, stores them in a Cassandra cluster and exposes health and metrics through Prometheus and Grafana.',
    role: 'Design and implementation of the pipeline in an academic setting, as part of my Master’s in intelligent systems.',
    roleShort: 'Design and implementation',
    stack: ['Apache Kafka', 'Spark Streaming', 'Apache Cassandra', 'Prometheus', 'Grafana'],
    visual: 'streaming-pipeline',
    featured: true,
    layout: 'compact',
    visualCaption: 'Schematic of the architecture. Throughput figures are not shown because none were formally measured.',
    seoDescription:
      'An academic real-time data pipeline built with Kafka, Spark Streaming, Cassandra, Prometheus and Grafana.',
    links: [],
    caseStudySections: [
      {
        id: 'overview',
        heading: 'Overview',
        paragraphs: [
          'This academic project explored how modern systems move from isolated applications to scalable data architectures. The objective was a pipeline able to receive, process, store and monitor a continuous stream of events.',
        ],
      },
      {
        id: 'system-design',
        heading: 'System design',
        bullets: [
          'Ingestion — producers publish events to Apache Kafka topics, decoupling sources from consumers.',
          'Processing — Spark Streaming consumes the topics in micro-batches, cleans and enriches the events.',
          'Storage — results are written to an Apache Cassandra cluster, chosen for write throughput and horizontal scaling.',
          'Observability — Prometheus scrapes metrics from the components and Grafana dashboards expose lag, throughput and node health.',
        ],
      },
      {
        id: 'learnings',
        heading: 'Learnings',
        bullets: [
          'Event streaming forces explicit decisions about ordering, partitioning and failure that batch systems hide.',
          'A NoSQL store is designed from the queries backwards, not from the entities forwards.',
          'Monitoring is part of the architecture, not an afterthought — a pipeline you cannot observe is a pipeline you cannot trust.',
        ],
        note: 'Academic scope: the pipeline was built and demonstrated as coursework; no production load or formal benchmark was performed.',
      },
    ],
  },
  {
    slug: 'talent-orchestrator',
    number: '05',
    title: 'Talent Orchestrator',
    subtitle: 'An AI assistant concept for HR analysis, with humans in the loop',
    category: 'Hackathon concept · AI for HR',
    status: 'hackathon',
    statusLabel: 'Hackathon concept · team project',
    summary:
      'A concept for an AI assistant that reads workload, task complexity and contribution signals to prepare — never decide — reviews, training plans and mobility discussions.',
    role: 'Project lead and owner: problem framing, concept and system design, technical and business direction. Teammates covered HR expertise and development.',
    roleShort: 'Project lead and owner',
    stack: [],
    visual: 'talent-orchestrator',
    featured: true,
    layout: 'split-reverse',
    visualCaption: 'Concept diagram. The system was designed as a decision-support tool; every recommendation passes through a human reviewer.',
    seoDescription:
      'Talent Orchestrator: a hackathon concept for a human-supervised AI assistant that supports HR analysis of workload, contributions and development.',
    links: [],
    caseStudySections: [
      {
        id: 'overview',
        heading: 'Overview',
        paragraphs: [
          'Talent Orchestrator was a team hackathon project exploring how an AI agent could support HR work: looking at workload, task complexity and project contributions to inform performance reviews, training and internal mobility.',
          'I led the project — framing the problem, designing the concept and its architecture, and owning the technical and business direction — while teammates brought HR domain knowledge and development capacity.',
        ],
      },
      {
        id: 'problem',
        heading: 'The problem',
        paragraphs: [
          'HR teams often assess contribution from fragmented, lagging signals. Managers lack time to consolidate them, and employees rarely see how the picture is built. The question was whether an assistant could consolidate those signals transparently, without turning them into automatic judgements.',
        ],
      },
      {
        id: 'approach',
        heading: 'Approach',
        bullets: [
          'Treat the assistant as an orchestrator of analyses, not a decision-maker: it gathers signals, surfaces patterns and drafts talking points for a human.',
          'Make every output traceable to the signals it used, so a reviewer can challenge it.',
          'Prefer conversations over scores: the deliverables are review preparation, training suggestions and mobility options to discuss, not rankings.',
        ],
      },
      {
        id: 'constraints',
        heading: 'Limits and safeguards',
        bullets: [
          'The signals available — workload, complexity, contributions — are partial proxies and can encode existing biases; the concept required human review of every recommendation.',
          'The system must not make or imply autonomous HR decisions, and its recommendations are not objective measurements.',
          'Any real deployment would require consent, data-protection review and transparency towards the people assessed.',
        ],
      },
      {
        id: 'status',
        heading: 'Status',
        paragraphs: [
          'The project stayed at the hackathon stage: a framed concept and demonstrator, not a deployed system. It is shown here for the framing and design thinking rather than as a finished product.',
        ],
      },
    ],
  },
]

export const featuredProjects = projects.filter((p) => p.featured)

export function getProject(slug: string): Project | undefined {
  return projects.find((p) => p.slug === slug)
}
