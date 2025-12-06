# 🌐 AgriSmart CI - Frontend Web

[![Next.js](https://img.shields.io/badge/Next.js-14-black.svg)](https://nextjs.org/)
[![React](https://img.shields.io/badge/React-18-61DAFB.svg)](https://reactjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5-3178C6.svg)](https://www.typescriptlang.org/)
[![TailwindCSS](https://img.shields.io/badge/TailwindCSS-3-06B6D4.svg)](https://tailwindcss.com/)
[![Status](https://img.shields.io/badge/Status-Production%20Ready-brightgreen.svg)]()

> Interface web d'administration et tableau de bord pour AgriSmart CI

## 📋 Description

Le frontend web AgriSmart CI est une application Next.js moderne offrant un tableau de bord complet pour les administrateurs, conseillers agricoles et producteurs. Il permet la supervision en temps réel des exploitations, la gestion des utilisateurs et l'accès aux analytics avancées.

### 📊 Statistiques du Projet

| Métrique | Valeur |
|----------|--------|
| Pages | 20+ |
| Composants | 50+ |
| Langues supportées | 3 (FR, Baoulé, Dioula) |
| Thèmes | Light/Dark |

## 🚀 Fonctionnalités

### Pour les Administrateurs
- **Dashboard Supervision** - Vue d'ensemble de toutes les exploitations
- **Gestion Utilisateurs** - CRUD producteurs, conseillers, partenaires
- **Monitoring Capteurs** - État en temps réel de tous les capteurs IoT
- **Analytics Globales** - Statistiques agrégées par région
- **Gestion Alertes** - Configuration des seuils et notifications
- **Marketplace Admin** - Modération des annonces

### Pour les Conseillers
- **Suivi Producteurs** - Liste des producteurs assignés
- **Recommandations** - Création et envoi de conseils personnalisés
- **Chat** - Communication avec les producteurs
- **Rapports** - Génération de rapports d'activité

### Pour les Producteurs (version web)
- **Dashboard Personnel** - Vue simplifiée des parcelles
- **Historique** - Consultation des données historiques
- **Formations** - Accès aux modules de formation
- **Profil** - Gestion du compte

## 🛠️ Technologies

| Catégorie | Technologie |
|-----------|-------------|
| **Framework** | Next.js 14 (App Router) |
| **Langage** | TypeScript 5 |
| **UI Components** | Radix UI |
| **Styling** | TailwindCSS 3 |
| **State Management** | Zustand |
| **Forms** | React Hook Form + Zod |
| **HTTP Client** | Axios |
| **Temps réel** | Socket.IO Client |
| **i18n** | i18next |
| **Charts** | Recharts |

## 📦 Installation

### Prérequis

- Node.js 18+
- npm ou yarn
- Backend AgriSmart en cours d'exécution

### Installation

```bash
# Cloner le repository
git clone https://github.com/agrismart/frontend.git
cd frontend

# Installer les dépendances
npm install
# ou
yarn install

# Copier la configuration
cp .env.example .env.local
```

## 🚀 Lancement

### Mode Développement

```bash
# Démarrer le serveur de développement
npm run dev
# ou
yarn dev

# L'application sera accessible sur http://localhost:3001
```

### Mode Production

```bash
# Build de production
npm run build

# Démarrer en production
npm start

# ou avec PM2
pm2 start npm --name "agrismart-frontend" -- start
```

### Avec Docker

```bash
# Build de l'image
docker build -t agrismart-frontend .

# Lancer le conteneur
docker run -p 3001:3001 agrismart-frontend

# Ou via docker-compose (depuis la racine du projet)
docker-compose up frontend
```

## ⚙️ Configuration

### Variables d'Environnement

Créez un fichier `.env.local` :

```env
# API Backend
NEXT_PUBLIC_API_URL=http://localhost:3000/api
NEXT_PUBLIC_WS_URL=ws://localhost:3000

# API IA
NEXT_PUBLIC_AI_SERVICE_URL=http://localhost:5000

# App
NEXT_PUBLIC_APP_URL=http://localhost:3001
NEXT_PUBLIC_APP_NAME=AgriSmart CI

# Analytics (optionnel)
NEXT_PUBLIC_GA_ID=UA-XXXXXXXXX-X

# Environnement
NODE_ENV=development
```

### Configuration Next.js

Fichier `next.config.js` :

```javascript
/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ['localhost', 'api.agrismart.ci'],
  },
  i18n: {
    locales: ['fr', 'baoule', 'dioula'],
    defaultLocale: 'fr',
  },
}

module.exports = nextConfig
```

## 📁 Structure du Projet

```
frontend/
├── app/                      # Next.js App Router
│   ├── (auth)/               # Routes authentification
│   │   ├── login/
│   │   └── register/
│   ├── (dashboard)/          # Routes dashboard
│   │   ├── dashboard/
│   │   ├── parcelles/
│   │   ├── capteurs/
│   │   ├── alertes/
│   │   ├── marketplace/
│   │   ├── formations/
│   │   ├── messages/
│   │   └── settings/
│   ├── admin/                # Routes admin
│   │   ├── users/
│   │   ├── analytics/
│   │   └── config/
│   ├── layout.tsx
│   └── page.tsx
│
├── components/
│   ├── ui/                   # Composants UI (Radix)
│   │   ├── button.tsx
│   │   ├── card.tsx
│   │   ├── dialog.tsx
│   │   └── ...
│   ├── charts/               # Graphiques
│   ├── forms/                # Formulaires
│   ├── layout/               # Layout components
│   └── shared/               # Composants partagés
│
├── lib/
│   ├── api/                  # Clients API
│   ├── hooks/                # Custom hooks
│   ├── stores/               # Zustand stores
│   ├── utils/                # Utilitaires
│   └── validations/          # Schémas Zod
│
├── public/
│   ├── images/
│   ├── icons/
│   └── locales/              # Fichiers traduction
│
├── styles/
│   └── globals.css           # TailwindCSS
│
├── types/                    # Types TypeScript
├── tailwind.config.js
├── next.config.js
└── package.json
```

## 🧪 Tests

```bash
# Tests unitaires
npm run test

# Tests avec couverture
npm run test:coverage

# Tests E2E (Playwright)
npm run test:e2e

# Mode watch
npm run test:watch
```

## 📊 Scripts Disponibles

```bash
# Développement
npm run dev          # Serveur dev avec hot-reload

# Build
npm run build        # Build de production
npm start            # Démarrer la build

# Qualité
npm run lint         # Linter ESLint
npm run lint:fix     # Fix auto des erreurs
npm run type-check   # Vérification TypeScript

# Tests
npm run test         # Tests unitaires
npm run test:e2e     # Tests E2E

# Autres
npm run analyze      # Analyser le bundle
npm run storybook    # Lancer Storybook
```

## 🌍 Internationalisation

Les traductions sont dans `public/locales/` :

```
public/locales/
├── fr/
│   ├── common.json
│   ├── dashboard.json
│   └── ...
├── baoule/
│   └── ...
└── dioula/
    └── ...
```

Utilisation dans les composants :

```tsx
import { useTranslation } from 'react-i18next';

export default function Dashboard() {
  const { t } = useTranslation('dashboard');
  
  return <h1>{t('title')}</h1>;
}
```

## 🎨 Thèmes

L'application supporte les thèmes Light et Dark via TailwindCSS :

```tsx
// Composant de switch
import { useTheme } from 'next-themes';

export function ThemeToggle() {
  const { theme, setTheme } = useTheme();
  
  return (
    <button onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}>
      Toggle Theme
    </button>
  );
}
```

## 🔗 Connexion aux Services

| Service | Variable | Défaut |
|---------|----------|--------|
| Backend API | `NEXT_PUBLIC_API_URL` | `http://localhost:3000/api` |
| WebSocket | `NEXT_PUBLIC_WS_URL` | `ws://localhost:3000` |
| AI Service | `NEXT_PUBLIC_AI_SERVICE_URL` | `http://localhost:5000` |

## 🐛 Dépannage

### Erreur "Module not found"

```bash
# Supprimer node_modules et réinstaller
rm -rf node_modules .next
npm install
```

### Erreur CORS avec l'API

Vérifier que le backend autorise l'origine `http://localhost:3001` dans sa configuration CORS.

### Hot Reload ne fonctionne pas

1. Vérifier que le fichier n'est pas dans `.gitignore`
2. Redémarrer le serveur : `npm run dev`
3. Vider le cache : `rm -rf .next`

### Erreur de build TypeScript

```bash
# Vérifier les erreurs de type
npm run type-check
```

## 📄 Licence

Ce projet est sous licence MIT.

## 📞 Support

- Email: frontend@agrismart.ci
- Documentation: https://docs.agrismart.ci/frontend
- Issues: https://github.com/agrismart/frontend/issues

---

Développé avec ❤️ et Next.js pour les agriculteurs ivoiriens 🇨🇮
