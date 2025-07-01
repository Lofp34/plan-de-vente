import { SalesPlan, SalesStage } from '../types';

export const defaultSalesPlan: SalesPlan = {
  id: 'default-plan',
  title: 'Plan de Vente Interactif',
  personas: [
    {
      id: 'persona1',
      name: '<persona_1>',
      description: '<description_du_personne>Description du personnage</description_du_personne>'
    },
    {
      id: 'persona2', 
      name: '<persona_2>',
      description: '<description_du_personne>Description du personnage</description_du_personne>'
    }
  ],
  prospectionChannels: [
    {
      id: 'salons',
      name: 'Salons professionnels',
      description: 'Participation aux événements sectoriels',
      steps: [
        'Identifier les salons pertinents',
        'Préparer la présentation et les supports',
        'Planifier les rendez-vous',
        'Assurer le suivi post-salon'
      ],
      isCustomizable: true
    },
    {
      id: 'recommendations',
      name: 'Recommandations clients',
      description: 'Développement par le réseau existant',
      steps: [
        'Identifier les clients satisfaits',
        'Demander des recommandations spécifiques',
        'Préparer l\'approche référencée',
        'Maintenir la relation tripartite'
      ],
      isCustomizable: true
    }
  ],
  pitch: {
    challenges: '<pitch_personnalise>Les enjeux de nos clients auxquels nous répondons</pitch_personnalise>',
    valueProposition: '<pitch_personnalise>Notre valeur ajoutée, notre savoir-faire, nos preuves de pertinence</pitch_personnalise>',
    benefits: '<pitch_personnalise>Les bénéfices de notre collaboration pour nos clients</pitch_personnalise>'
  },
  discovery: {
    currentSituation: [
      {
        id: 'situation-1',
        name: 'Contexte actuel',
        questions: ['Pouvez-vous me décrire votre situation actuelle ?']
      }
    ],
    history: [
      {
        id: 'historique-1',
        name: 'Historique',
        questions: ['Comment avez-vous procédé jusqu\'à présent ?']
      }
    ],
    experience: [
      {
        id: 'experience-1',
        name: 'Expérience',
        questions: ['Quelle est votre expérience dans ce domaine ?']
      }
    ],
    project: [
      {
        id: 'projet-1',
        name: 'Projet',
        questions: ['Quels sont vos objectifs pour ce projet ?']
      }
    ],
    ambitions: [
      {
        id: 'ambitions-1',
        name: 'Ambitions',
        questions: ['Quelles sont vos ambitions à long terme ?']
      }
    ]
  },
  arguments: [
    {
      id: 'arg-1',
      benefit: 'Bénéfice client à personnaliser',
      advantage: 'Avantage à personnaliser',
      characteristic: 'Caractéristique à personnaliser'
    }
  ],
  objections: [
    {
      id: 'obj-1',
      objection: 'Objection fréquente',
      origin: 'Origine de l\'objection',
      questionsToAsk: ['Question à poser pour clarifier'],
      responseArguments: ['Argument de réponse']
    }
  ],
  stages: []
};

export const salesStages: SalesStage[] = [
  {
    id: 'mindset',
    title: 'La vente n\'est ni un talent ni du hasard',
    icon: '🧠',
    description: 'Développer le bon état d\'esprit commercial',
    isPersonalizable: false,
    content: {
      principles: [
        'La vente est une compétence qui s\'apprend',
        'Le succès commercial repose sur la méthode et la préparation',
        'Chaque interaction est une opportunité d\'apprentissage'
      ]
    }
  },
  {
    id: 'biais-cognitifs',
    title: 'Maîtrisez vos biais cognitifs',
    icon: '🎯',
    description: 'Identifier et contourner les biais qui nuisent à la vente',
    isPersonalizable: false,
    content: {
      biais: [
        'Biais de confirmation',
        'Effet de halo',
        'Biais d\'ancrage',
        'Biais de disponibilité'
      ]
    }
  },
  {
    id: 'target-audience',
    title: 'À qui s\'adresse cette solution ?',
    icon: '👥',
    description: 'Définir et personnaliser vos personas cibles',
    isPersonalizable: true,
    content: {
      personas: defaultSalesPlan.personas
    }
  },
  {
    id: 'prospection',
    title: 'Canaux de prospection',
    icon: '📡',
    description: 'Outils et méthodes de prospection commerciale',
    isPersonalizable: true,
    content: {
      channels: defaultSalesPlan.prospectionChannels
    }
  },
  {
    id: 'contact',
    title: 'Prise de contact',
    icon: '📞',
    description: 'Première approche et pitch personnalisé',
    isPersonalizable: true,
    content: {
      pitch: defaultSalesPlan.pitch
    }
  },
  {
    id: 'discovery',
    title: 'Phase de découverte',
    icon: '🔍',
    description: 'Questionnement structuré pour identifier les besoins',
    isPersonalizable: true,
    content: {
      objectives: [
        'Établir les enjeux et besoins spécifiques',
        'Faire prendre conscience du fonctionnement',
        'Prouver sa compétence via des cas concrets'
      ],
      discovery: defaultSalesPlan.discovery
    }
  },
  {
    id: 'argumentation',
    title: 'Argumentation',
    icon: '💡',
    description: 'Présentation structurée de votre proposition de valeur',
    isPersonalizable: true,
    content: {
      goldRules: [
        'Adapter l\'argument au besoin identifié',
        'Utiliser la structure BAC (Bénéfice-Avantage-Caractéristique)',
        'Vérifier la compréhension après chaque argument'
      ],
      arguments: defaultSalesPlan.arguments
    }
  },
  {
    id: 'objections',
    title: 'Traitement des objections',
    icon: '🛡️',
    description: 'Méthodes pour répondre aux objections client',
    isPersonalizable: true,
    content: {
      method: [
        'Écouter l\'objection complètement',
        'Reformuler pour valider la compréhension',
        'Questionner pour identifier l\'origine',
        'Répondre avec des arguments factuels',
        'Vérifier que l\'objection est levée'
      ],
      objections: defaultSalesPlan.objections
    }
  },
  {
    id: 'closing',
    title: 'Closing',
    icon: '✅',
    description: 'Techniques de conclusion et prise de décision',
    isPersonalizable: false,
    content: {
      goldRules: [
        'Reconnaître les signaux d\'achat',
        'Poser des questions fermées pour confirmer',
        'Proposer des alternatives de choix',
        'Créer un sentiment d\'urgence justifié',
        'Finaliser les détails pratiques'
      ]
    }
  },
  {
    id: 'suivi',
    title: 'Suivi client',
    icon: '📈',
    description: 'Maintenir la relation et développer le compte',
    isPersonalizable: false,
    content: {
      goldRules: [
        'Planifier les points de suivi réguliers',
        'Anticiper les besoins futurs',
        'Mesurer la satisfaction client',
        'Identifier les opportunités d\'upselling',
        'Demander des recommandations'
      ]
    }
  }
];