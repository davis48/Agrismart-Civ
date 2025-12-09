# 🌾 AgriSmart CI - Plateforme Agricole Intelligente

[![Status](https://img.shields.io/badge/Status-Production%20Ready-brightgreen.svg)]()
[![License](https://img.shields.io/badge/License-MIT-blue.svg)]()
[![Made for](https://img.shields.io/badge/Made%20for-Côte%20d'Ivoire-FF8200.svg)]()

> **Système Agricole Intelligent pour améliorer la productivité agricole en Côte d'Ivoire**

## 📋 Description

AgriSmart CI est une plateforme complète d'agriculture de précision conçue pour les producteurs agricoles de Côte d'Ivoire. Elle combine :

- 📡 **Capteurs IoT** pour le monitoring en temps réel
- 🤖 **Intelligence Artificielle** pour la détection de maladies et recommandations d'irrigation
- 📱 **Application Mobile Flutter** multilingue (Français, Baoulé, Malinké, Sénoufo)
- 🌐 **Interface Web Next.js** pour l'administration et la visualisation
- 🛒 **Marketplace** pour la vente de produits agricoles
- 📚 **Formations** vidéo pour les agriculteurs
- 💬 **Messagerie** et support communautaire

## 🏗️ Architecture

```
┌─────────────────────────────────────────────────────────────────┐
│                         AgriSmart CI                            │
├─────────────────────────────────────────────────────────────────┤
│                                                                 │
│   ┌──────────────┐    ┌──────────────┐    ┌──────────────┐     │
│   │   Mobile     │    │   Frontend   │    │   Capteurs   │     │
│   │   Flutter    │    │   Next.js    │    │   IoT/MQTT   │     │
│   └──────┬───────┘    └──────┬───────┘    └──────┬───────┘     │
│          │                   │                   │              │
│          │         ┌─────────┴─────────┐         │              │
│          │         │                   │         │              │
│          ▼         ▼                   ▼         ▼              │
│   ┌──────────────────┐         ┌──────────────────┐            │
│   │   Backend API    │◄───────►│   IoT Service    │            │
│   │   Node.js/Socket │         │   MQTT/InfluxDB  │            │
│   └────────┬─────────┘         └──────────────────┘            │
│            │                                                    │
│            ▼                                                    │
│   ┌──────────────────┐         ┌──────────────────┐            │
│   │   PostgreSQL     │         │   AI Service     │            │
│   │   + Redis        │         │   Flask/Gunicorn │            │
│   └──────────────────┘         └──────────────────┘            │
│                                                                 │
└─────────────────────────────────────────────────────────────────┘
```

## 📊 Vue d'Ensemble des Services

| Service | Technologie | Port | Description |
|---------|-------------|------|-------------|
| **Backend** | Node.js/Express | 3000 | API REST principale + WebSocket |
| **Frontend** | Next.js 14 | 3001 | Interface web responsive |
| **Mobile** | Flutter 3.10+ | - | App Android/iOS multilingue |
| **AI Service** | Flask/TensorFlow | 5001 | Détection maladies + prédiction irrigation |
| **IoT Service** | Node.js/MQTT | 4000 | Gateway capteurs en temps réel |
| **PostgreSQL** | PostgreSQL 15 | 5432 | Base de données principale |
| **Redis** | Redis 7 | 6379 | Cache & sessions |
| **InfluxDB** | InfluxDB 2.7 | 8086 | Données time-series capteurs |
| **Mosquitto** | Eclipse Mosquitto | 1883 | MQTT Broker pour IoT |

## ✨ Fonctionnalités Principales

### 🌱 Monitoring Agricole

- Suivi en temps réel de l'humidité du sol, température, pH
- Alertes automatiques basées sur des seuils configurables
- Historique et visualisation graphique des données
- Support de multiples parcelles et plantations

### 🤖 Intelligence Artificielle

- **Détection de maladies** : Analyse d'images de plantes avec TensorFlow
- **Recommandations d'irrigation** : ML pour optimiser l'arrosage
- Prédictions météorologiques intégrées
- Conseils personnalisés par culture

### 📱 Application Mobile

- Interface multilingue (FR, Baoulé, Malinké, Sénoufo)
- Scan d'images pour diagnostic de maladies
- Notifications push pour les alertes
- Mode hors ligne avec synchronisation
- Gestion complète des parcelles

### 🌐 Interface Web

- Dashboard avec KPIs agricoles
- Gestion des utilisateurs et rôles (Producteur, Conseiller, Admin)
- Visualisation temps réel des données capteurs
- Marketplace intégrée
- Système de formations vidéo

### 📡 IoT & Capteurs

- Support de multiples types de capteurs (humidité, température, pH, NPK)
- Communication via MQTT
- Stockage optimisé dans InfluxDB
- Configuration flexible des seuils d'alerte

## 🚀 Démarrage Rapide

### ⚠️ Important : Utiliser Docker

**Les services sont configurés pour fonctionner UNIQUEMENT dans Docker.** Ne lancez pas `npm run dev` ou `python app.py` directement.

### Prérequis

- **Docker** & **Docker Compose** (obligatoire)
- Git

### 🐳 Installation et Lancement

```bash
# 1. Cloner le repository
git clone https://github.com/votre-repo/agriculture.git
cd agriculture

# 2. Lancer tous les services
docker-compose up -d

# 3. Vérifier que tout fonctionne
docker-compose ps

# Les services devraient tous être "Up" ou "healthy"
```

### 🌐 Accès aux Services

- **Frontend Web** : <http://localhost:3001>
- **Backend API** : <http://localhost:3000/api/v1>
- **AI Service** : <http://localhost:5001>
- **API Documentation** : <http://localhost:3000/api/v1> (page d'accueil)

### 👤 Compte de Test

L'application est livrée avec un compte de test :

- **Téléphone** : `0700000001`
- **Mot de passe** : `password123`

## 📚 Documentation Complète

| Document | Description |
|----------|-------------|
| [DEMARRAGE_SERVICES.md](DEMARRAGE_SERVICES.md) | **Guide complet de démarrage** (IMPORTANT) |
| [backend/README.md](backend/README.md) | Documentation API Backend |
| [frontend/README.md](frontend/README.md) | Documentation Frontend |
| [mobile/README.md](mobile/README.md) | Documentation App Mobile |
| [ai_service/README.md](ai_service/README.md) | Documentation Service IA |
| [iot_service/README.md](iot_service/README.md) | Documentation Service IoT |

## 🔧 Commandes Utiles

```bash
# Voir l'état des services
docker-compose ps

# Voir les logs en temps réel
docker-compose logs -f

# Voir les logs d'un service spécifique
docker logs agrismart_api --tail 50
docker logs agrismart_frontend --tail 50
docker logs agrismart_ai --tail 50

# Redémarrer un service
docker-compose restart api

# Rebuild un service après modification
docker-compose up -d --build frontend

# Stopper tous les services
docker-compose down

# Rebuild complet
docker-compose down
docker-compose up -d --build
```

## 🛠️ Configuration

### Variables d'Environnement

Les fichiers `.env.example` sont fournis dans chaque service :

```bash
backend/.env.example       # Configuration backend
frontend/.env.example      # Configuration frontend  
ai_service/.env.example    # Configuration AI
iot_service/.env.example   # Configuration IoT
```

**Pour le développement Docker**, les configurations sont dans `docker-compose.yml`.

### Configuration Mobile

Modifier `mobile/lib/core/config/app_config.dart` :

```dart
// Pour émulateur Android
static const String baseUrl = 'http://10.0.2.2:3000/api/v1';
static const String aiServiceUrl = 'http://10.0.2.2:5001';

// Pour appareil physique
static const String baseUrl = 'http://VOTRE_IP:3000/api/v1';
static const String aiServiceUrl = 'http://VOTRE_IP:5001';
```

## 📱 Application Mobile

### Installation

```bash
cd mobile

# Installer les dépendances
flutter pub get

# Générer les fichiers
dart run build_runner build --delete-conflicting-outputs

# Lancer sur Android
flutter run -d emulator-5554

# Lancer sur iOS (macOS uniquement)
flutter run -d iPhone
```

### Fonctionnalités Mobile

- ✅ Authentification avec OTP (mode production) ou directe (développement)
- ✅ Dashboard avec statistiques agricoles
- ✅ Gestion des parcelles et plantations
- ✅ Détection de maladies par caméra
- ✅ Alertes et notifications push
- ✅ Marketplace pour acheter/vendre
- ✅ Formations vidéo
- ✅ Support multilingue (FR, Baoulé, Malinké, Sénoufo)

## 🧪 Tests

```bash
# Backend
docker exec agrismart_api npm test

# Frontend
docker exec agrismart_frontend npm test

# AI Service
docker exec agrismart_ai pytest

# Mobile
cd mobile && flutter test
```

## 📊 Monitoring & Health Checks

```bash
# Vérifier la santé de chaque service
curl http://localhost:3000/api/v1/health   # Backend
curl http://localhost:5001/health          # AI Service
curl http://localhost:4000/health          # IoT Service

# Voir les métriques
docker stats
```

## 🔐 Sécurité

- ✅ Authentification JWT avec refresh tokens
- ✅ OTP par SMS (Twilio) en production
- ✅ Rate limiting sur toutes les routes
- ✅ Helmet.js pour sécuriser les headers HTTP
- ✅ CORS configuré
- ✅ Validation des données avec express-validator
- ✅ Hashage des mots de passe avec bcrypt (12 rounds)
- ✅ Environnements isolés Docker

## 🐛 Dépannage

### Les services ne démarrent pas

```bash
# Vérifier les logs
docker-compose logs

# Rebuild complet
docker-compose down
docker-compose up -d --build
```

### Le backend ne répond pas

```bash
# Vérifier que PostgreSQL est healthy
docker-compose ps postgres

# Redémarrer le backend
docker-compose restart api

# Voir les logs
docker logs agrismart_api --tail 50
```

### L'app mobile ne se connecte pas

1. **Émulateur Android** : Utiliser `http://10.0.2.2:3000`
2. **Appareil physique** : Utiliser l'IP de votre machine
3. Vérifier que les services Docker sont accessibles
4. Vérifier les logs : `flutter run -v`

### Frontend : Erreur 400 pour les alertes

Si vous voyez `GET /api/v1/alertes?status=non_lue 400`, c'est déjà corrigé. Le frontend utilise maintenant `/api/v1/alertes/unread`.

## 🚀 Déploiement Production

### Docker Compose Production

```bash
# Build pour production
docker-compose -f docker-compose.prod.yml up -d --build

# Avec reverse proxy Nginx
docker-compose -f docker-compose.prod.yml --profile nginx up -d
```

### Variables d'Environnement Production

```env
NODE_ENV=production
DB_HOST=postgres.agrismart.ci
REDIS_HOST=redis.agrismart.ci
JWT_SECRET=<secret_fort>
TWILIO_ACCOUNT_SID=<twilio_sid>
TWILIO_AUTH_TOKEN=<twilio_token>
```

## 📁 Structure du Projet

```
agriculture/
├── backend/               # API REST Node.js + Socket.IO
│   ├── src/
│   │   ├── config/       # Configuration
│   │   ├── controllers/  # Contrôleurs
│   │   ├── middler/      # Middlewares
│   │   ├── routes/       # Routes API
│   │   ├── services/     # Services métier
│   │   └── database/     # Schémas SQL
│   ├── scripts/          # Scripts utilitaires
│   └── Dockerfile
│
├── frontend/              # Interface Web Next.js
│   ├── src/
│   │   ├── app/          # Pages Next.js
│   │   ├── components/   # Composants React
│   │   ├── lib/          # Utilitaires
│   │   └── styles/       # CSS
│   └── Dockerfile
│
├── mobile/                # App Mobile Flutter
│   ├── lib/
│   │   ├── core/         # Config, réseau, utils
│   │   ├── features/     # Fonctionnalités
│   │   └── shared/       # Widgets partagés
│   ├── android/
│   └── ios/
│
├── ai_service/            # Service IA Flask
│   ├── app.py            # Application Flask
│   ├── models/           # Modèles TensorFlow
│   ├── requirements.txt
│   └── Dockerfile
│
├── iot_service/           # Gateway IoT
│   ├── src/
│   │   ├── mqtt/         # Client MQTT
│   │   ├── influxdb/     # Client InfluxDB
│   │   └── server.js
│   └── Dockerfile
│
├── docker-compose.yml     # Configuration Docker (DEV)
├── DEMARRAGE_SERVICES.md  # Guide de démarrage
└── README.md              # Ce fichier
```

## 🆕 Changements Récents

### v1.2.0 (Décembre 2024)

#### Corrections Critiques

- ✅ **AI Service** : Port changé de 5000 → 5001 (conflit macOS AirPlay)
- ✅ **AI Service** : Ajout de `gunicorn` dans requirements.txt
- ✅ **Frontend** : Correction du build Docker et permissions fichiers
- ✅ **Backend** : Correction de l'API registration route (`/api/v1/auth/register`)
- ✅ **Frontend** : Correction des alertes (utilisation de `/alertes/unread` au lieu de status enum invalide)

#### Améliorations

- ✅ Création de compte test automatique (`0700000001`)
- ✅ Amélioration de la page de connexion avec gestion d'erreurs
- ✅ Suppression des identifiants demo visibles sur la page login
- ✅ Création de la page "Mot de passe oublié"
- ✅ Documentation complète de démarrage (DEMARRAGE_SERVICES.md)
- ✅ Ajout du champ `lu_at` dans l'interface Alerte TypeScript

## 🤝 Contribution

1. Fork le projet
2. Créer une branche (`git checkout -b feature/nouvelle-fonctionnalite`)
3. Commit (`git commit -am 'Ajouter nouvelle fonctionnalité'`)
4. Push (`git push origin feature/nouvelle-fonctionnalite`)
5. Créer une Pull Request

## 📄 Licence

Ce projet est sous licence MIT. Voir [LICENSE](LICENSE) pour plus de détails.

## 👥 Équipe

- **Développement** : Équipe AgriSmart CI
- **Design** : UX/UI Team
- **DevOps** : Infrastructure Team
- **IA/ML** : Data Science Team

## 📞 Support

- 📧 Email : <support@agrismart.ci>
- 📚 Documentation : <https://docs.agrismart.ci>
- 🐛 Issues : <https://github.com/agrismart/agriculture/issues>
- 💬 Discord : <https://discord.gg/agrismart>

---

<p align="center">
  Développé avec ❤️ pour les agriculteurs ivoiriens 🇨🇮
</p>
