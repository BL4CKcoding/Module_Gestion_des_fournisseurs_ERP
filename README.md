# ERP System - Gestion Fournisseurs, Achats, Stock & Comptabilité

Système ERP modulaire pour la gestion des fournisseurs, achats, stock et comptabilité. Solution complète pour optimiser vos processus d'approvisionnement.

## Fonctionnalités

- **Gestion des Fournisseurs** : Ajout, modification et suivi des fournisseurs
- **Gestion des Achats** : Demandes d'achat, devis, commandes et bons de livraison
- **Gestion du Stock** : Suivi des articles, seuils d'alerte, catégories
- **Comptabilité** : Gestion des factures, paiements et workflow de validation

## Technologies utilisées

- **Frontend** : React 18, TypeScript, Vite
- **UI/UX** : shadcn/ui, Tailwind CSS, Radix UI
- **Routing** : React Router DOM
- **Formulaires** : React Hook Form, Zod
- **Charts** : Recharts
- **Icons** : Lucide React

## Installation et exécution

### Prérequis

- Node.js (version 16 ou supérieure)
- npm ou yarn

### Installation

```bash
# Clonez le repository
git clone <YOUR_GIT_URL>

# Accédez au dossier du projet
cd projet_erp-main

# Installez les dépendances
npm install
```

### Développement

```bash
# Lancez le serveur de développement
npm run dev

# Le serveur sera accessible sur http://localhost:8080
```

### Build de production

```bash
# Build pour la production
npm run build

# Prévisualisez la version de production
npm run preview
```

### Linting

```bash
# Vérifiez le code avec ESLint
npm run lint
```

## Structure du projet

```
src/
├── components/          # Composants réutilisables
│   ├── compta/         # Composants comptabilité
│   ├── layout/         # Layout et navigation
│   ├── ui/             # Composants UI de base
│   └── ...
├── pages/              # Pages de l'application
│   ├── achats/         # Pages achats
│   ├── compta/         # Pages comptabilité
│   ├── fournisseurs/   # Pages fournisseurs
│   └── stock/          # Pages stock
├── services/           # Services et données mockées
├── types/              # Types TypeScript
└── hooks/              # Hooks personnalisés
```

## Scripts disponibles

- `npm run dev` - Serveur de développement
- `npm run build` - Build de production
- `npm run build:dev` - Build en mode développement
- `npm run lint` - Vérification du code
- `npm run preview` - Prévisualisation du build

## Déploiement

Le projet peut être déployé sur n'importe quelle plateforme supportant les applications React statiques (Vercel, Netlify, GitHub Pages, etc.).

## Licence

Ce projet est privé et confidentiel.
