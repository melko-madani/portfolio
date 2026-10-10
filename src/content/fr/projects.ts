import type { Project } from '../types'

/**
 * Contenu des projets en français. Mêmes faits et mêmes sources que la
 * version anglaise (rapport de stage, code de MP Maroc, brouillon précédent).
 * Les slugs, identifiants de sections, statuts et stacks sont identiques.
 */
export const projects: Project[] = [
  {
    slug: 'btpextract',
    number: '01',
    title: 'BTPExtract',
    subtitle: 'Intelligence documentaire locale pour les factures du BTP',
    category: 'Intelligence documentaire · LLM local',
    status: 'internship',
    statusLabel: 'Projet de stage de fin d’études',
    summary:
      'Un pipeline entièrement local qui transforme des factures fournisseurs hétérogènes — PDF natifs ou scannés — en neuf champs comptables validés, maintenable par des non-développeurs grâce à des règles fournisseur éditables et un banc d’évaluation intégré.',
    role: 'Seul développeur, de l’analyse du besoin et de l’architecture à l’implémentation et à l’évaluation, au sein d’un petit cabinet et sous encadrement académique.',
    roleShort: 'Seul développeur',
    year: '2026',
    stack: ['Python', 'FastAPI', 'DocTR', 'PyMuPDF', 'Ollama · Gemma 2 9B', 'Configuration YAML', 'Jinja2', 'Tailwind CSS', 'JavaScript vanilla', 'openpyxl'],
    visual: 'btpextract',
    featured: true,
    layout: 'wide',
    visualCaption: 'Recréation illustrative de la vue d’extraction avec une facture fictive. Aucune donnée réelle de fournisseur ni donnée financière n’est montrée.',
    seoDescription:
      'BTPExtract : un pipeline d’intelligence documentaire local et confidentiel qui extrait et valide les champs comptables de factures du BTP avec de l’OCR et un LLM local.',
    links: [],
    caseStudySections: [
      {
        id: 'overview',
        heading: 'Vue d’ensemble',
        paragraphs: [
          'BTPExtract a été construit pendant mon stage de fin d’études dans un petit cabinet de conseil en énergie et fiscalité, dont les opérations de rénovation génèrent chaque mois des factures de plus de trente fournisseurs du BTP — électriciens, bureaux d’études, architectes, diagnostiqueurs — chacun avec sa mise en page et sa numérotation.',
          'L’outil lit un PDF, natif ou scanné, et renvoie neuf champs comptables en JSON structuré : numéro et date de facture, montants HT et TTC, taux de TVA, nom du fournisseur, et la commune, le code postal et l’adresse des travaux. Les lots sont exportés dans un classeur Excel à code couleur.',
        ],
      },
      {
        id: 'problem',
        heading: 'Le problème',
        paragraphs: [
          'Le traitement des factures était entièrement manuel : ouvrir le PDF, repérer les champs, les recopier dans un tableur, vérifier. Répétitif, lent et source d’erreurs pour une équipe de quelques personnes.',
          'L’automatiser via une API documentaire cloud aurait été techniquement simple. Ce n’était pas une option : les factures contiennent des données financières de fournisseurs et de chantiers qui ne peuvent pas transiter par des serveurs tiers.',
        ],
      },
      {
        id: 'constraints',
        heading: 'Contraintes',
        bullets: [
          'Confidentialité : aucune donnée ne doit quitter la machine pendant le traitement — vérifiable par analyse du trafic réseau.',
          'Autonomie : les équipes métier doivent pouvoir ajouter ou ajuster un fournisseur sans développeur et sans redémarrer l’application.',
          'Zéro coût récurrent : pas d’API payante, pas d’abonnement.',
          'Hétérogénéité : plus de trente fournisseurs, mises en page libres, PDF natifs et scannés.',
          'Exploitabilité : toute l’application démarre en une seule commande sur une machine équipée d’un GPU.',
        ],
        facts: [
          { label: 'Précision cible', value: '≥ 85 % de champs corrects sur les fournisseurs configurés' },
          { label: 'Ajout d’un fournisseur', value: '≤ 30 minutes sans développeur' },
          { label: 'Temps de traitement', value: '≤ 10 secondes par facture' },
          { label: 'Données sortantes', value: 'Zéro appel réseau externe' },
        ],
      },
      {
        id: 'role',
        heading: 'Mon rôle',
        paragraphs: [
          'J’étais le seul développeur du projet. J’ai mené l’analyse du besoin avec l’équipe, rédigé les spécifications, exploré et comparé les approches, conçu l’architecture, implémenté l’application et construit la méthode d’évaluation qui a servi à la recette.',
          'Le travail était organisé en sprints itératifs, avec dix-neuf fichiers de spécifications écrits avant le code correspondant — une habitude gardée de l’analyse métier.',
        ],
      },
      {
        id: 'approach',
        heading: 'Approche : un pivot documenté',
        paragraphs: [
          'La première approche a consisté à fine-tuner LayoutLMv3, un modèle de compréhension de documents, sur quinze configurations d’entraînement. Elle a plafonné à un F1 de 0,55 : avec 86 exemples annotés pour un minimum estimé à 200, le goulot était le volume de données, pas les hyperparamètres.',
          'Plutôt que de forcer la technologie, j’ai pivoté vers un grand modèle de langage local guidé par des prompts spécialisés par fournisseur. Un prompt générique donnait environ 60 à 70 % de champs corrects sur le portefeuille hétérogène ; formaliser les règles de chaque fournisseur — format du numéro, position des totaux, taux de TVA, pièges connus — dans un prompt dédié a porté ce taux à 85–90 % sur les fournisseurs configurés lors des premiers tests après pivot.',
          'La leçon que j’en garde : sur des problèmes d’extraction métier à faible volume de données, la connaissance explicite du domaine dans des prompts a battu l’apprentissage supervisé implicite, tout en restant maintenable par les personnes qui connaissent les factures.',
        ],
      },
      {
        id: 'system-design',
        heading: 'Architecture du système',
        paragraphs: ['Chaque facture passe par sept étapes déterministes, du PDF brut au JSON validé.'],
        bullets: [
          'OCR — PyMuPDF lit directement les PDF natifs ; les pages scannées sont rendues à 144 dpi et lues par DocTR. Moins de cinquante tokens extractibles signifie que le document est traité comme un scan.',
          'Réparation des tokens — les nombres fragmentés (« 2 », « 860,00 », « € ») sont fusionnés selon des règles de position pour que les montants survivent à l’OCR.',
          'Sélection des pages — pour les factures longues, la page d’en-tête est toujours conservée et la page des totaux est choisie par un score de mots-clés financiers.',
          'Reconstruction du texte — les tokens sont triés par page, ligne et position pour reconstituer une mise en page lisible.',
          'Détection du fournisseur — des mots-clés (raison sociale, numéro d’immatriculation, domaine email) sélectionnent les règles du fournisseur, ou un prompt par défaut.',
          'Extraction — le prompt spécialisé et le texte reconstruit sont envoyés à Gemma 2 9B via Ollama, avec une température à 0 et une graine fixe pour des résultats reproductibles.',
          'Validation — la cohérence arithmétique des montants (TTC = HT × (1 + TVA)) est vérifiée à ±5 % ; les champs incohérents sont marqués « à vérifier ».',
        ],
        note: 'L’application est organisée en cinq couches — cœur métier pur, API FastAPI, interface Jinja2 et Tailwind, configuration YAML et scripts CLI — avec la règle que le cœur ne dépend jamais de la couche web, afin que l’extraction puisse s’exécuter depuis un test, un script ou la ligne de commande.',
      },
      {
        id: 'implementation',
        heading: 'Implémentation',
        bullets: [
          'Sept pages web : extraction générique, extraction avec détection du fournisseur, OCR à la volée, traitement par lot avec export Excel, éditeur d’administration des prompts, laboratoire de génération assistée et banc d’évaluation.',
          'La connaissance fournisseur vit dans des fichiers YAML éditables — trente fournisseurs actifs plus deux prompts système protégés — sauvegardés de façon atomique et rechargés à chaud sans redémarrage.',
          'Génération assistée : à partir de deux à cinq factures exemples et de leurs valeurs correctes, le modèle local rédige un brouillon de prompt pour un nouveau fournisseur, auto-testé champ par champ avant intégration.',
          'Le mode lot diffuse sa progression en Server-Sent Events et produit une feuille Excel par fournisseur plus une feuille consolidée, en vert, orange et rouge.',
          'Banc d’évaluation : vérité terrain importée depuis des exports Excel corrigés, normalisation par type pour les dates, montants et textes, précision par champ, par fournisseur et globale, et comparaison A/B entre deux exécutions.',
        ],
      },
      {
        id: 'evaluation',
        heading: 'Évaluation et résultats',
        paragraphs: [
          'La recette a été définie avant le développement et mesurée avec le banc intégré sur un jeu de vérité terrain interne ; les chiffres ci-dessous décrivent donc un corpus précis, pas une précision générale.',
        ],
        facts: [
          { label: 'Objectif de précision', value: 'Atteint : ≥ 85 % sur le corpus évalué' },
          { label: 'Précision par champ', value: '98,6 % sur 351 champs (39 factures, 3 fournisseurs)' },
          { label: 'Temps de traitement', value: '≈ 5,2 s par facture avec OCR pré-calculé' },
          { label: 'Détection des incohérences', value: '100 % des incohérences arithmétiques réelles sur un jeu de test de 35 factures' },
          { label: 'Trafic sortant', value: 'Aucun — OCR et modèle s’exécutent en local' },
        ],
        note: 'Périmètre : un corpus modeste, concentré sur un fournisseur ; les chiffres des fournisseurs à faible volume sont indicatifs plutôt que statistiquement robustes, et l’évaluation ne couvrait pas encore les trente fournisseurs configurés. Les premières estimations après pivot sur un ensemble plus large se situaient entre 85 et 90 %. Sur le plan opérationnel, l’équipe a rapporté qu’un lot mensuel d’environ soixante-quinze factures passait de plusieurs heures de saisie à quelques minutes de traitement supervisé.',
      },
      {
        id: 'learnings',
        heading: 'Enseignements et limites',
        bullets: [
          'L’adéquation de l’architecture au problème et la qualité des données ont compté davantage que le réglage des hyperparamètres — la piste LayoutLMv3 abandonnée est documentée en entier parce qu’elle a façonné la conception finale.',
          'Le déterminisme garantit la reproductibilité, pas la justesse : la même erreur se reproduira à l’identique, et une mise à jour du modèle obligerait à rejouer toute l’évaluation.',
          'Le banc d’évaluation a aussi servi d’outil de diagnostic — quatre des cinq écarts résiduels étaient des artefacts des données de référence, pas des erreurs d’extraction.',
          'Prochaines étapes identifiées : élargir la vérité terrain, neutraliser les suffixes d’annotation lors de la normalisation et étendre la couverture mesurée à tous les fournisseurs configurés.',
        ],
      },
    ],
  },
  {
    slug: 'mp-maroc',
    number: '02',
    title: 'MP Maroc',
    subtitle: 'Veille des marchés publics marocains',
    category: 'Produit data · Plateforme web',
    status: 'personal',
    statusLabel: 'Projet personnel · en développement',
    summary:
      'Une plateforme qui collecte les appels d’offres du portail officiel marocain, les normalise dans un catalogue consultable avec filtres et dates limites, et permet d’enregistrer des recherches, de suivre des consultations et de recevoir des alertes.',
    role: 'Conception produit et développement full-stack : scraper et API, modèle de données, front-end et espace membre.',
    roleShort: 'Conception et développement full-stack',
    year: '2026',
    stack: ['Python', 'FastAPI', 'SQLite', 'httpx · BeautifulSoup', 'React', 'TypeScript', 'Vite', 'Tailwind CSS'],
    visual: 'mp-maroc',
    featured: true,
    layout: 'split',
    visualCaption: 'Recréation illustrative du catalogue des consultations. Les intitulés, acheteurs et chiffres sont des exemples fictifs.',
    seoDescription:
      'MP Maroc : une plateforme FastAPI et React qui collecte, normalise et surveille les avis de marchés publics marocains avec filtres, recherches enregistrées et alertes de date limite.',
    links: [],
    caseStudySections: [
      {
        id: 'overview',
        heading: 'Vue d’ensemble',
        paragraphs: [
          'Les organismes publics marocains publient des milliers d’appels d’offres sur le portail officiel de l’État. Ce portail est exhaustif, mais difficile à surveiller au quotidien, difficile à bien chercher et impitoyable sur les délais.',
          'MP Maroc transforme ce flot en un catalogue structuré et attentif aux dates limites : les consultations sont collectées automatiquement, normalisées dans un schéma stable et exposées via une interface React avec recherche, filtres, statistiques et fonctions membres. Chaque fiche renvoie vers l’avis officiel.',
        ],
      },
      {
        id: 'problem',
        heading: 'Le problème',
        paragraphs: [
          'Les entreprises qui vivent de la commande publique ratent des opportunités non pas parce que la donnée est secrète, mais parce que personne dans l’équipe ne surveille le portail chaque matin. La douleur, c’est l’attention et le timing : filtrer un flux public jusqu’à ce qui est pertinent, et ne jamais manquer une date de dépôt.',
        ],
      },
      {
        id: 'approach',
        heading: 'Approche',
        bullets: [
          'Partir d’une seule boucle : chercher, enregistrer la recherche ou créer une alerte, recevoir les correspondances, ouvrir la consultation, la suivre, surveiller la date limite, revenir.',
          'Traiter la donnée comme un actif à normaliser une fois — identifiants stables, catégories, secteurs, régions et types de procédure cohérents — pour que chaque fonctionnalité lise le même modèle propre.',
          'Livrer d’abord le catalogue en lecture seule, puis ajouter comptes, recherches enregistrées, favoris et alertes email sur la même API.',
        ],
      },
      {
        id: 'system-design',
        heading: 'Architecture du système',
        paragraphs: ['Collecte → normalisation → stockage → consultation.'],
        bullets: [
          'Un scraper récupère le HTML du portail avec httpx, analyse les lignes de consultations avec BeautifulSoup et normalise chaque avis en enregistrement local.',
          'Les identifiants dérivent des références du portail et d’un hachage, de sorte que les imports répétés restent idempotents (« insert or ignore ») et qu’un journal de collecte trace chaque exécution.',
          'SQLite stocke les consultations, les fiches détaillées et l’historique de collecte ; l’API sert des listes paginées, filtrables et triables ainsi que des agrégats.',
          'Le front-end ne scrape jamais : il ne lit que l’API JSON.',
        ],
      },
      {
        id: 'implementation',
        heading: 'Implémentation',
        bullets: [
          'Catalogue avec recherche par mots-clés et filtres par catégorie (travaux, fournitures, services), secteur, acheteur, localisation ou région, statut, type de procédure et date limite ; tableau triable et paginé.',
          'Fiches détaillées avec les documents officiels lorsqu’ils sont disponibles et un lien vers l’avis source.',
          'Statistiques : consultations actives, clôtures sous sept jours, nouveautés sous sept jours, acheteurs distincts, répartition par catégorie, secteur et procédure.',
          'Annuaires par secteur, région et ville pour la découverte de marché.',
          'Espace membre : comptes authentifiés avec vérification d’email, recherches enregistrées, favoris et alertes email configurables avec prévisualisation et digests planifiés.',
          'Un assistant guidé de préparation de candidature appuyé sur un point d’accès IA, pour aider à comprendre un avis et assembler le volet administratif d’un dossier.',
          'Tests automatisés des deux côtés : plus de vingt modules de tests backend et une suite de tests front-end.',
        ],
      },
      {
        id: 'status',
        heading: 'Statut et enseignements',
        paragraphs: [
          'Le projet est une initiative personnelle en développement actif. Il n’a pas été validé auprès d’utilisateurs payants, et aucun chiffre d’usage, de temps gagné ou de revenu n’est avancé.',
          'Ce qu’il m’a appris : normaliser des données publiques désordonnées est là où se trouvent l’essentiel de la valeur et du travail ; une collecte idempotente et un journal rendent le pipeline sûr à relancer ; et les fonctions membres ne valent que par la qualité du matching derrière les alertes.',
        ],
      },
    ],
  },
  {
    slug: 'realtime-data-pipeline',
    number: '03',
    title: 'Pipeline de données temps réel',
    subtitle: 'Une architecture de streaming, de l’ingestion à l’observabilité',
    category: 'Data engineering · Projet académique',
    status: 'academic',
    statusLabel: 'Projet académique',
    summary:
      'Une architecture distribuée qui ingère des événements en continu avec Kafka, les traite avec Spark Streaming, les stocke dans un cluster Cassandra et expose santé et métriques via Prometheus et Grafana.',
    role: 'Conception et implémentation du pipeline dans un cadre académique, dans le cadre de mon master en systèmes intelligents.',
    roleShort: 'Conception et implémentation',
    stack: ['Apache Kafka', 'Spark Streaming', 'Apache Cassandra', 'Prometheus', 'Grafana'],
    visual: 'streaming-pipeline',
    featured: true,
    layout: 'split-reverse',
    visualCaption: 'Schéma de l’architecture. Aucun chiffre de débit n’est montré car aucun n’a été formellement mesuré.',
    seoDescription:
      'Un pipeline de données temps réel académique construit avec Kafka, Spark Streaming, Cassandra, Prometheus et Grafana.',
    links: [],
    caseStudySections: [
      {
        id: 'overview',
        heading: 'Vue d’ensemble',
        paragraphs: [
          'Ce projet académique explorait le passage des applications isolées aux architectures de données scalables. L’objectif était un pipeline capable de recevoir, traiter, stocker et surveiller un flux continu d’événements.',
        ],
      },
      {
        id: 'system-design',
        heading: 'Architecture du système',
        bullets: [
          'Ingestion — les producteurs publient des événements dans des topics Apache Kafka, ce qui découple les sources des consommateurs.',
          'Traitement — Spark Streaming consomme les topics par micro-lots, nettoie et enrichit les événements.',
          'Stockage — les résultats sont écrits dans un cluster Apache Cassandra, choisi pour son débit en écriture et sa scalabilité horizontale.',
          'Observabilité — Prometheus collecte les métriques des composants et des tableaux de bord Grafana exposent le lag, le débit et la santé des nœuds.',
        ],
      },
      {
        id: 'learnings',
        heading: 'Enseignements',
        bullets: [
          'Le streaming d’événements impose des décisions explicites sur l’ordre, le partitionnement et les pannes, que les systèmes batch masquent.',
          'Un stockage NoSQL se conçoit à partir des requêtes, pas à partir des entités.',
          'La supervision fait partie de l’architecture, pas de l’après-coup — un pipeline que l’on ne peut pas observer est un pipeline auquel on ne peut pas faire confiance.',
        ],
        note: 'Périmètre académique : le pipeline a été construit et démontré dans le cadre d’un cours ; aucune charge de production ni benchmark formel n’a été réalisé.',
      },
    ],
  },
  {
    slug: 'talent-orchestrator',
    number: '04',
    title: 'Talent Orchestrator',
    subtitle: 'Un concept d’assistant IA pour l’analyse RH, avec l’humain dans la boucle',
    category: 'Concept de hackathon · IA pour les RH',
    status: 'hackathon',
    statusLabel: 'Concept de hackathon · projet en équipe',
    summary:
      'Un concept d’assistant IA qui lit des signaux de charge de travail, de complexité des tâches et de contribution pour préparer — jamais décider — les entretiens, les plans de formation et les discussions de mobilité.',
    role: 'Chef de projet et porteur : cadrage du problème, conception du concept et du système, direction technique et business. Les coéquipiers couvraient l’expertise RH et le développement.',
    roleShort: 'Chef de projet et porteur',
    stack: [],
    visual: 'talent-orchestrator',
    featured: true,
    layout: 'compact',
    visualCaption: 'Schéma de concept. Le système a été conçu comme un outil d’aide à la décision ; chaque recommandation passe par un relecteur humain.',
    seoDescription:
      'Talent Orchestrator : un concept de hackathon pour un assistant IA supervisé par l’humain qui soutient l’analyse RH de la charge, des contributions et du développement.',
    links: [],
    caseStudySections: [
      {
        id: 'overview',
        heading: 'Vue d’ensemble',
        paragraphs: [
          'Talent Orchestrator était un projet de hackathon en équipe explorant comment un agent IA pourrait soutenir le travail RH : examiner la charge de travail, la complexité des tâches et les contributions aux projets pour éclairer les entretiens d’évaluation, la formation et la mobilité interne.',
          'J’ai dirigé le projet — cadrage du problème, conception du concept et de son architecture, direction technique et business — tandis que les coéquipiers apportaient la connaissance du métier RH et la capacité de développement.',
        ],
      },
      {
        id: 'problem',
        heading: 'Le problème',
        paragraphs: [
          'Les équipes RH évaluent souvent la contribution à partir de signaux fragmentés et tardifs. Les managers manquent de temps pour les consolider, et les collaborateurs voient rarement comment l’image se construit. La question était de savoir si un assistant pouvait consolider ces signaux de façon transparente, sans les transformer en jugements automatiques.',
        ],
      },
      {
        id: 'approach',
        heading: 'Approche',
        bullets: [
          'Traiter l’assistant comme un orchestrateur d’analyses, pas comme un décideur : il rassemble les signaux, fait émerger des tendances et rédige des points de discussion pour un humain.',
          'Rendre chaque sortie traçable jusqu’aux signaux utilisés, pour qu’un relecteur puisse la contester.',
          'Préférer les conversations aux scores : les livrables sont des préparations d’entretien, des suggestions de formation et des options de mobilité à discuter, pas des classements.',
        ],
      },
      {
        id: 'constraints',
        heading: 'Limites et garde-fous',
        bullets: [
          'Les signaux disponibles — charge, complexité, contributions — sont des indicateurs partiels qui peuvent encoder des biais existants ; le concept exigeait une revue humaine de chaque recommandation.',
          'Le système ne doit ni prendre ni laisser entendre de décision RH autonome, et ses recommandations ne sont pas des mesures objectives.',
          'Tout déploiement réel exigerait le consentement, une revue de protection des données et de la transparence envers les personnes évaluées.',
        ],
      },
      {
        id: 'status',
        heading: 'Statut',
        paragraphs: [
          'Le projet est resté au stade du hackathon : un concept cadré et un démonstrateur, pas un système déployé. Il est présenté ici pour le cadrage et la réflexion de conception, pas comme un produit fini.',
        ],
      },
    ],
  },
]
