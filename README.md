# AgriSmart CI - Plateforme Agricole Intelligente

[![Backend](https://img.shields.io/badge/Backend-Node.js%2020-green?logo=node.js)](./backend)
[![Frontend](https://img.shields.io/badge/Frontend-Next.js%2014-black?logo=nextdotjs)](./frontend)
[![Database](https://img.shields.io/badge/Database-PostgreSQL%2015-blue?logo=postgresql)](https://www.postgresql.org/)
[![Docker](https://img.shields.io/badge/Docker-Ready-blue?logo=docker)](https://www.docker.com/)

Plateforme agricole intelligente pour la Côte d'Ivoire, intégrant IoT, IA et communication communautaire.

## 🌱 Présentation

AgriSmart CI est une solution complète pour les agriculteurs ivoiriens, offrant :

- **Monitoring IoT** : Capteurs pour humidité, température, pH du sol
- **Intelligence Artificielle** : Recommandations personnalisées et diagnostic des maladies
- **Alertes en temps réel** : Notifications SMS, WhatsApp et push
- **Marketplace** : Plateforme de vente de produits agricoles
- **Formations** : Modules d'apprentissage multilingues
- **Communauté** : Messagerie entre agriculteurs et conseillers

## 🏗 Architecture

```text
┌─────────────────────────────────────────────────────────────────┐
│                         NGINX (Reverse Proxy)                   │
└─────────────────────────────────────────────────────────────────┘
                    │                           │
                    ▼                           ▼
    ┌───────────────────────┐     ┌───────────────────────┐
    │   Frontend (Next.js)  │     │   Backend (Express)   │
    │      Port: 3001       │     │      Port: 3000       │
    └───────────────────────┘     └───────────────────────┘
                                            │
                    ┌───────────────────────┼───────────────────────┐
                    ▼                       ▼                       ▼
          ┌─────────────────┐     ┌─────────────────┐     ┌─────────────────┐
          │   PostgreSQL    │     │      Redis      │     │    Socket.IO    │
          │   Port: 5432    │     │   Port: 6379    │     │   (Temps réel)  │
          └─────────────────┘     └─────────────────┘     └─────────────────┘
```

## 📋 Prérequis

- Docker & Docker Compose
- Node.js 20+ (pour développement local)
- npm ou yarn

## 🚀 Démarrage rapide

### Avec Docker (recommandé)

```bash
# Cloner le projet
git clone <repository>
cd agriculture

# Copier les fichiers d'environnement
cp backend/.env.example backend/.env
cp frontend/.env.example frontend/.env.local

# Démarrer tous les services
docker-compose up -d

# Vérifier le statut
docker-compose ps
```

### Développement local

#### Backend

```bash
cd backend
npm install
cp .env.example .env
npm run dev
```

#### Frontend

```bash
cd frontend
npm install
cp .env.example .env.local
npm run dev
```

## 🔗 URLs d'accès

| Service | URL | Description |
|---------|-----|-------------|
| Frontend | http://localhost:3001 | Application web |
| Backend API | http://localhost:3000 | API REST |
| API Docs | http://localhost:3000/api/v1 | Documentation API |
| pgAdmin | http://localhost:5050 | Admin PostgreSQL |

## 📁 Structure du projet

```text
agriculture/
├── backend/                # API Node.js/Express
│   ├── src/
│   │   ├── config/        # Configuration
│   │   ├── controllers/   # Contrôleurs
│   │   ├── middlewares/   # Middlewares
│   │   ├── routes/        # Routes API
│   │   ├── services/      # Services métier
│   │   └── utils/         # Utilitaires
│   ├── docs/              # Documentation
│   └── docker-compose.yml # Docker local
│
├── frontend/              # Application Next.js
│   ├── src/
│   │   ├── app/          # Pages (App Router)
│   │   ├── components/   # Composants React
│   │   └── lib/          # Bibliothèques
│   └── docs/             # Documentation
│
├── docker-compose.yml     # Docker production
└── README.md             # Ce fichier
```

## 📊 Base de données

Le système utilise PostgreSQL avec 27 tables couvrant :

- **Utilisateurs** : Gestion des comptes et authentification
- **Parcelles** : Exploitations et cultures
- **Capteurs** : Stations météo et capteurs IoT
- **Alertes** : Système de notifications
- **Marketplace** : Produits et commandes
- **Formations** : Modules éducatifs
- **Messages** : Communication

Voir [Documentation Base de données](./backend/docs/BASE_DE_DONNEES.md)

## 🔐 Authentification

Le système utilise JWT avec vérification OTP :

1. Inscription avec numéro de téléphone
2. Vérification par SMS (OTP)
3. Connexion avec JWT
4. Refresh token automatique

## 🌍 Internationalisation

Langues supportées :
- 🇫🇷 Français (défaut)
- 🇨🇮 Baoulé
- 🇨🇮 Dioula

## 📱 Fonctionnalités

### Dashboard
- Statistiques en temps réel
- Graphiques de performance
- Alertes récentes
- Météo locale

### Parcelles
- CRUD complet
- Géolocalisation GPS
- Historique des cultures
- Capteurs associés

### Capteurs IoT
- Types : humidité, température, pH, NPK, météo, caméra
- Statut en temps réel
- Historique des mesures

### Alertes
- Niveaux : info, important, critique
- Notifications multi-canaux
- Actions recommandées

### IA & Recommandations
- Diagnostic maladies par image
- Recommandations personnalisées
- Prévisions de récolte

### Marketplace
- Catalogue produits
- Système de commandes
- Géolocalisation vendeurs

### Formations
- Modules vidéo et texte
- Suivi de progression
- Certificats

## 🧪 Tests

```bash
# Backend
cd backend
npm test

# Frontend
cd frontend
npm test
```

## 📚 Documentation

| Document | Description |
|----------|-------------|
| [API Documentation](./backend/docs/API_DOCUMENTATION.md) | Endpoints API REST |
| [Base de données](./backend/docs/BASE_DE_DONNEES.md) | Schéma et relations |
| [Conception Backend](./backend/docs/CONCEPTION_BACKEND.md) | Architecture backend |
| [Conception Frontend](./frontend/docs/CONCEPTION_FRONTEND.md) | Architecture frontend |
| [FAQ Dépannage](./backend/docs/FAQ_DEPANNAGE.md) | Problèmes courants |

## 🐳 Docker

### Services

```bash
# Démarrer tous les services
docker-compose up -d

# Voir les logs
docker-compose logs -f

# Arrêter
docker-compose down

# Rebuild
docker-compose build --no-cache
```

### Volumes

- `postgres_data` : Données PostgreSQL
- `redis_data` : Données Redis
- `uploads_data` : Fichiers uploadés

## 🔧 Configuration

### Variables d'environnement Backend

```env
# Base de données
DB_HOST=localhost
DB_PORT=5432
DB_NAME=agrismart
DB_USER=agrismart
DB_PASSWORD=secret

# JWT
JWT_SECRET=your-secret-key
JWT_EXPIRES_IN=7d

# Redis
REDIS_HOST=localhost
REDIS_PORT=6379
REDIS_PASSWORD=redis-password

# SMS (Twilio)
TWILIO_ACCOUNT_SID=xxx
TWILIO_AUTH_TOKEN=xxx
TWILIO_PHONE_NUMBER=+xxx
```

### Variables d'environnement Frontend

```env
NEXT_PUBLIC_API_URL=http://localhost:3000/api/v1
NEXT_PUBLIC_SOCKET_URL=http://localhost:3000
```

## 🤝 Contribution

1. Fork le projet
2. Créer une branche feature
3. Commiter les changements
4. Pousser la branche
5. Ouvrir une Pull Request

## 📄 Licence

MIT License

---

Développé avec ❤️ pour l'agriculture ivoirienne
