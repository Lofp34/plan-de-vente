# Plan de Vente Interactif 🚀

Une application web moderne et interactive pour optimiser votre processus de vente commercial. Conçue avec React, TypeScript et Tailwind CSS pour offrir une expérience utilisateur exceptionnelle.

## ✨ Fonctionnalités

### 🎯 Processus de vente structuré
- **10 étapes détaillées** du cycle commercial
- Interface avec cartes dépliables et animations fluides
- Vue d'ensemble du processus avec indicateurs visuels

### 🔧 Personnalisation avancée
- **Sections personnalisables** avec format XML pour l'IA
- **Protection par mot de passe** pour les modifications
- **Personas cibles** configurables avec balises XML
- **Canaux de prospection** adaptables selon votre secteur

### 💼 Modules spécialisés
- **Pitch personnalisé** en 3 paragraphes (20 secondes)
- **Phase de découverte** avec thématiques et questions
- **Argumentation BAC** (Bénéfice-Avantage-Caractéristique)
- **Traitement des objections** avec méthode structurée

### 🤖 Compatible IA
- Format XML pour personnalisation automatique
- Intégration prête pour ChatGPT/Gemini
- Génération de contenu basée sur vos enregistrements d'appels

## 🚀 Installation et Lancement

```bash
# Installation des dépendances
npm install

# Lancement en mode développement
npm run dev

# Build pour la production
npm run build
```

L'application sera accessible sur `http://localhost:3000`

## 🎨 Design et UX

- **Animations fluides** avec Framer Motion
- **Interface moderne** avec dégradés et effets visuels
- **Responsive design** optimisé pour tous les écrans
- **Accessibilité** et ergonomie soignées

## 🔐 Utilisation

### Navigation
1. **Vue d'ensemble** : Parcourez les 10 étapes du processus
2. **Cartes interactives** : Cliquez pour déplier le contenu détaillé
3. **Mode édition** : Activez avec le bouton d'édition (mot de passe : `admin123`)

### Sections personnalisables
- **Personas** : Format `<persona_1>` et `<description_du_personne>`
- **Pitch** : Balises `<pitch_personnalise>` pour chaque paragraphe
- **Canaux de prospection** : Étapes d'activation modifiables
- **Arguments** : Structure BAC personnalisable
- **Objections** : Méthodes de réponse adaptables

### Sections fixes (non personnalisables)
- Mindset commercial
- Biais cognitifs
- Règles d'or de l'argumentation
- Méthode de traitement des objections
- Techniques de closing
- Suivi client

## 🛠️ Technologies utilisées

- **React 18** - Interface utilisateur moderne
- **TypeScript** - Typage statique et robustesse
- **Tailwind CSS** - Styling utilitaire et responsive
- **Framer Motion** - Animations et transitions fluides
- **Lucide React** - Icônes modernes et consistantes
- **Vite** - Build tool rapide et optimisé

## 📱 Fonctionnalités avancées

### Format XML personnalisé
```xml
<persona_1>
  <description_du_personne>
    Description du personnage cible
  </description_du_personne>
</persona_1>

<pitch_personnalise>
  Contenu du pitch adapté à votre secteur
</pitch_personnalise>
```

### Intégration IA
- Génération automatique de contenu
- Personnalisation basée sur vos données
- Suggestions d'amélioration du processus

## 🎯 Cas d'usage

- **Commerciaux** : Structurer et optimiser leurs approches
- **Managers commerciaux** : Former et standardiser les équipes
- **Entreprises** : Personnaliser selon leur secteur d'activité
- **Consultants** : Adapter aux spécificités client

## 📄 Structure des données

L'application utilise des interfaces TypeScript robustes :
- `PersonaTemplate` - Définition des personas cibles
- `ProspectionChannel` - Canaux de prospection
- `PitchSection` - Structure du pitch
- `DiscoverySection` - Thématiques de découverte
- `Argument` - Arguments de vente
- `Objection` - Traitement des objections

## 🔮 Évolutions futures

- Sauvegarde cloud des configurations
- Intégration CRM native
- Analytics de performance
- Templates sectoriels prêts à l'emploi
- Mode collaboratif équipe

---

**Conçu avec ❤️ pour révolutionner votre approche commerciale**
