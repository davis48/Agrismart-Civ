# AgriSmart CI - Frontend

[![Next.js](https://img.shields.io/badge/Next.js-14.2.33-black?logo=nextdotjs)](https://nextjs.org/)
[![React](https://img.shields.io/badge/React-18-blue?logo=react)](https://react.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5-blue?logo=typescript)](https://www.typescriptlang.org/)
[![TailwindCSS](https://img.shields.io/badge/TailwindCSS-3.4-38B2AC?logo=tailwind-css)](https://tailwindcss.com/)

Application web moderne pour la plateforme agricole intelligente AgriSmart CI.

## 🚀 Fonctionnalités

- 📊 **Dashboard** - Tableau de bord avec statistiques et graphiques
- 🌱 **Parcelles** - Gestion complète des parcelles agricoles
- 📡 **Capteurs** - Monitoring des capteurs IoT
- 📈 **Mesures** - Visualisation des données avec Recharts
- 🔔 **Alertes** - Système d'alertes en temps réel
- 🤖 **IA** - Recommandations et diagnostic intelligent
- 🛒 **Marketplace** - Place de marché agricole
- 📚 **Formations** - Modules d'apprentissage
- 💬 **Messagerie** - Communication intégrée
- 🌍 **Multilingue** - Français, Baoulé, Dioula

## 📋 Prérequis

- Node.js 20+
- npm ou yarn
- Backend AgriSmart CI (port 3000)

## 🛠 Installation

```bash
# Cloner le projet
git clone <repository>
cd frontend

# Installer les dépendances
npm install

# Configuration environnement
cp .env.example .env.local
```

## ⚙️ Configuration

Créez un fichier `.env.local` :

```env
NEXT_PUBLIC_API_URL=http://localhost:3000/api/v1
NEXT_PUBLIC_SOCKET_URL=http://localhost:3000
```

## 🏃 Démarrage

```bash
# Mode développement
npm run dev

# Build production
npm run build

# Démarrer en production
npm start
```

L'application sera accessible sur `http://localhost:3001`.

## 📁 Structure du projet

```text
src/
├── app/                    # Pages (App Router)
│   ├── (auth)/            # Routes publiques (login, register)
│   └── (dashboard)/       # Routes protégées
├── components/
│   ├── layout/            # Sidebar, Header, BottomNav
│   └── ui/                # Composants réutilisables
└── lib/
    ├── api.ts             # Client API
    ├── store.ts           # État global (Zustand)
    ├── i18n.ts            # Internationalisation
    └── utils.ts           # Utilitaires
```

## 🎨 Technologies

| Catégorie | Technologies |
|-----------|--------------|
| Framework | Next.js 14 (App Router) |
| UI | React 18, TailwindCSS, Radix UI |
| État | Zustand |
| Formulaires | React Hook Form, Zod |
| Graphiques | Recharts |
| i18n | i18next |
| HTTP | Axios |
| Temps réel | Socket.IO |

## 📱 Pages

| Route | Description |
|-------|-------------|
| `/login` | Connexion |
| `/register` | Inscription |
| `/dashboard` | Tableau de bord |
| `/parcelles` | Liste des parcelles |
| `/parcelles/[id]` | Détail parcelle |
| `/parcelles/nouveau` | Nouvelle parcelle |
| `/capteurs` | Gestion capteurs |
| `/mesures` | Visualisation mesures |
| `/alertes` | Alertes |
| `/recommandations` | Recommandations IA |
| `/diagnostic` | Diagnostic maladies |
| `/marketplace` | Place de marché |
| `/formations` | Formations |
| `/messages` | Messagerie |
| `/profil` | Profil utilisateur |

## 🔒 Authentification

L'authentification utilise JWT avec OTP :

1. L'utilisateur entre son téléphone et mot de passe
2. Un code OTP est envoyé par SMS
3. Après vérification, un token JWT est stocké
4. Le token est envoyé avec chaque requête

## 📚 Documentation

- [Documentation complète](./docs/CONCEPTION_FRONTEND.md)
- [Documentation API Backend](../backend/docs/API_DOCUMENTATION.md)
- [Base de données](../backend/docs/BASE_DE_DONNEES.md)

## 🧪 Scripts

```bash
npm run dev       # Développement
npm run build     # Build production
npm run start     # Production
npm run lint      # Linting ESLint
```

## 🐳 Docker

```bash
# Build image
docker build -t agrismart-frontend .

# Run container
docker run -p 3001:3000 agrismart-frontend
```

## 🤝 Contribution

1. Fork le projet
2. Créer une branche (`git checkout -b feature/nouvelle-fonctionnalite`)
3. Commit (`git commit -m 'Ajout nouvelle fonctionnalité'`)
4. Push (`git push origin feature/nouvelle-fonctionnalite`)
5. Ouvrir une Pull Request

## 📄 Licence

MIT License - Voir [LICENSE](../LICENSE)

---

Développé avec ❤️ pour l'agriculture ivoirienne
