import type { Story } from '../types'

export const stories: Story[] = [
  {
    id: 'who',
    label: ['Qui', 'je suis'],
    title: 'Qui je suis',
    pattern: 'portrait',
    paragraphs: [
      'Je m’appelle Yassine. Je suis ingénieur IA et je travaille là où se rencontrent l’analyse métier, les données et le logiciel.',
      'Je conçois et développe des systèmes qui transforment des workflows opérationnels désordonnés — factures fournisseurs, appels d’offres publics, signaux RH — en quelque chose de structuré, de mesurable et de maintenable par les personnes qui s’en servent.',
    ],
  },
  {
    id: 'path',
    label: ['De Safi à', 'Casablanca'],
    title: 'De Safi à Casablanca',
    pattern: 'road',
    paragraphs: [
      'J’ai commencé par un DUT en génie informatique puis une licence professionnelle en ingénierie des systèmes d’information et réseaux à l’École Supérieure de Technologie de Safi.',
      'Je suis ensuite parti à Casablanca pour un master en ingénierie des systèmes intelligents, parcours IA et data science, à l’Université Hassan II — achevé en 2026 par un stage de fin d’études en France.',
    ],
  },
  {
    id: 'detour',
    label: ['Le détour', 'analyste'],
    title: 'Le détour par l’analyse métier',
    pattern: 'grid',
    paragraphs: [
      'Avant de concevoir des systèmes d’IA, j’ai travaillé comme business analyst : exigences, cartographie des processus, et beaucoup de conversations avec les personnes qui font tourner le processus au quotidien.',
      'Cela a changé ma façon de construire. Sur mon projet de stage, j’ai écrit dix-neuf fichiers de spécifications avant le code, et défini les critères d’acceptation avant la première expérience.',
    ],
  },
  {
    id: 'local',
    label: ['Local', 'd’abord'],
    title: 'L’IA en local d’abord',
    pattern: 'documents',
    paragraphs: [
      'Pendant mon stage de fin d’études, la confidentialité excluait les API documentaires cloud. BTPExtract fait donc tourner l’OCR et un modèle de langage de neuf milliards de paramètres sur une seule machine, sans aucun appel réseau sortant.',
      'Ce dont je suis le plus fier : les règles d’extraction vivent dans de simples fichiers de configuration, et l’équipe métier ajoute un nouveau fournisseur en quelques minutes, sans développeur.',
    ],
  },
  {
    id: 'method',
    label: ['Mesurer,', 'puis livrer'],
    title: 'Mesurer, puis livrer',
    pattern: 'waves',
    paragraphs: [
      'Je préfère des objectifs mesurables aux impressions, des hypothèses explicites aux hypothèses implicites, et un système simple qui est maintenu à un système astucieux qui est abandonné.',
      'Comprendre, cadrer, concevoir, construire, valider — et quand un problème n’a pas besoin d’un modèle, je le dis.',
    ],
  },
]
