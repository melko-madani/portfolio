import type { Capability, EducationEntry, ExperienceEntry } from '../types'

export const experience: ExperienceEntry[] = [
  {
    id: 'current',
    // À CONFIRMER : intitulé officiel et date de début du poste actuel.
    period: 'Actuel',
    role: 'Solutions IA & digitales',
    organisation: 'Melko Énergie',
    organisationFallback: 'Cabinet de conseil en énergie et fiscalité, France',
    kind: 'employment',
    summary:
      'Conception et intégration de solutions IA et digitales pour un cabinet de conseil en énergie et fiscalité : automatisation de processus, traitement documentaire, moteur de leads par signaux et implémentation technique.',
    bullets: [],
    relatedProject: 'btpextract',
  },
  {
    id: 'internship',
    period: '2026',
    role: 'Ingénieur IA — stage de fin d’études',
    organisation: 'Melko Énergie',
    organisationFallback: 'Cabinet de conseil en énergie et fiscalité, France',
    kind: 'internship',
    summary:
      'Conception et livraison de BTPExtract, un pipeline d’intelligence documentaire local pour les factures fournisseurs, de l’analyse du besoin à l’évaluation.',
    bullets: [
      'Analyse du besoin avec l’équipe et formalisation de critères d’acceptation mesurables.',
      'Exploration d’un modèle documentaire fine-tuné, documentation de ses limites et pivot vers un LLM local à prompts spécialisés par fournisseur.',
      'Développement de l’application, de ses outils d’administration et d’un banc d’évaluation utilisé pour la recette.',
    ],
    relatedProject: 'btpextract',
  },
  {
    id: 'business-analyst',
    // À CONFIRMER : organisation, dates et périmètre publiable de ce poste.
    period: 'Avant',
    role: 'Business Analyst',
    organisation: null,
    organisationFallback: 'Contexte logiciel d’entreprise',
    kind: 'employment',
    summary:
      'Recueil des besoins, analyse des processus métier et communication avec les parties prenantes dans un contexte de logiciel d’entreprise, incluant des interventions sur site auprès des équipes métier.',
    bullets: [],
  },
]

export const education: EducationEntry[] = [
  {
    id: 'master',
    period: '2026',
    degree: 'Master',
    field: 'Ingénierie des Systèmes Intelligents — IA & Data Science',
    institution: 'Faculté des Sciences Aïn Chock, Université Hassan II',
    location: 'Casablanca',
  },
  {
    id: 'licence',
    degree: 'Licence professionnelle',
    field: 'Ingénierie des Systèmes d’Information et Réseaux',
    institution: 'École Supérieure de Technologie',
    location: 'Safi',
  },
  {
    id: 'dut',
    degree: 'DUT',
    field: 'Génie Informatique',
    institution: 'École Supérieure de Technologie',
    location: 'Safi',
  },
]

export const capabilities: Capability[] = [
  {
    id: 'document-intelligence',
    title: 'IA & intelligence documentaire',
    problem: 'Transformer des documents hétérogènes en données structurées et validées — en local quand la confidentialité l’exige.',
    tools: ['LLM locaux (Ollama)', 'OCR (DocTR)', 'Extraction structurée', 'Prompt engineering', 'Règles de validation', 'Bancs d’évaluation'],
  },
  {
    id: 'automation',
    title: 'Automatisation & intégration',
    problem: 'Connecter les systèmes et supprimer le travail répétitif : collecte, tâches planifiées, notifications et API.',
    tools: ['API REST', 'Web scraping', 'Pipelines planifiés', 'Alertes & digests email', 'Orchestration de workflows'],
  },
  {
    id: 'data-backend',
    title: 'Data & backend',
    problem: 'Modéliser, stocker et servir les données de façon fiable, d’un simple fichier SQLite à un cluster de streaming.',
    tools: ['Python', 'FastAPI', 'SQL · SQLite', 'Traitement de données', 'Kafka · Spark · Cassandra'],
  },
  {
    id: 'digital-products',
    title: 'Produits digitaux',
    problem: 'Livrer des interfaces utilisables au-dessus des données : catalogues, tableaux de bord, outils d’administration et prototypes.',
    tools: ['React', 'TypeScript', 'Vite', 'Tailwind CSS', 'UX fonctionnelle', 'Prototypage'],
  },
  {
    id: 'business-analysis',
    title: 'Analyse métier',
    problem: 'Comprendre comment une organisation fonctionne avant de la changer, et l’écrire pour que tout le monde soit d’accord.',
    tools: ['Cartographie des processus', 'Exigences & spécifications', 'Critères d’acceptation', 'Communication avec les parties prenantes'],
  },
]
