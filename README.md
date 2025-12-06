# 🌾 AgriSmart CI - Plateforme Agricole Intelligente

[![Status](https://img.shields.io/badge/Status-Production%20Ready-brightgreen.svg)]()
[![License](https://img.shields.io/badge/License-MIT-blue.svg)]()
[![Made for](https://img.shields.io/badge/Made%20for-Côte%20d'Ivoire-FF8200.svg)]()

> **Système Agricole Intelligent pour améliorer la productivité agricole en Côte d'Ivoire**

<p align="center">
  <img src="docs/images/logo.png" alt="AgriSmart CI Logo" width="200"/>
</p>

## 📋 Description

AgriSmart CI est une plateforme complète d'agriculture de précision conçue pour les producteurs agricoles de Côte d'Ivoire. Elle combine :

- 📡 **Capteurs IoT** pour le monitoring en temps réel
- 🤖 **Intelligence Artificielle** pour la détection de maladies
- 📱 **Application Mobile** multilingue (Français, Baoulé, Dioula)
- 🌐 **Interface Web** pour l'administration
- 🛒 **Marketplace** pour la vente de produits agricoles

## 🏗️ Architecture

```
┌─────────────────────────────────────────────────────────────────┐
│                         AgriSmart CI                            │
├─────────────────────────────────────────────────────────────────┤
│                                                                 │
│   ┌──────────────┐    ┌──────────────┐    ┌──────────────┐     │
│   │   Mobile     │    │   Frontend   │    │   Capteurs   │     │
│   │   Flutter    │    │   Next.js    │    │   IoT        │     │
│   └──────┬───────┘    └──────┬───────┘    └──────┬───────┘     │
│          │                   │                   │              │
│          │         ┌─────────┴─────────┐         │              │
│          │         │                   │         │              │
│          ▼         ▼                   ▼         ▼              │
│   ┌──────────────────┐         ┌──────────────────┐            │
│   │   Backend API    │◄───────►│   IoT Service    │            │
│   │   Node.js        │         │   MQTT/InfluxDB  │            │
│   └────────┬─────────┘         └──────────────────┘            │
│            │                                                    │
│            ▼                                                    │
│   ┌──────────────────┐         ┌──────────────────┐            │
│   │   PostgreSQL     │         │   AI Service     │            │
│   │   + Redis        │         │   TensorFlow     │            │
│   └──────────────────┘         └──────────────────┘            │
│                                                                 │
└─────────────────────────────────────────────────────────────────┘
```

## 📊 Vue d'Ensemble des Services

| Service | Technologie | Port | Description |
|---------|-------------|------|-------------|
| **Backend** | Node.js/Express | 3000 | API REST principale |
| **Frontend** | Next.js | 3001 | Interface web |
| **Mobile** | Flutter | - | App Android/iOS |
| **AI Service** | Flask/TensorFlow | 5000 | Détection maladies |
| **IoT Service** | Node.js/MQTT | 4000 | Gateway capteurs |
| **PostgreSQL** | - | 5432 | Base de données |
| **Redis** | - | 6379 | Cache & sessions |
| **InfluxDB** | - | 8086 | Données capteurs |

## 🚀 Démarrage Rapide

### Prérequis

- **Docker** & **Docker Compose** (recommandé)
- Ou installation manuelle :
  - Node.js 20+
  - Python 3.10+
  - Flutter 3.10+
  - PostgreSQL 15+
  - Redis 7+

### 🐳 Lancement avec Docker (Recommandé)

```bash
# 1. Cloner le repository
git clone https://github.com/agrismart/agriculture.git
cd agriculture

# 2. Copier les fichiers de configuration
cp backend/.env.example backend/.env
cp ai_service/.env.example ai_service/.env
cp iot_service/.env.example iot_service/.env
cp frontend/.env.example frontend/.env.local

# 3. Lancer tous les services
docker-compose up -d

# 4. Vérifier que tout fonctionne
docker-compose ps

# 5. Voir les logs
docker-compose logs -f
```

Les services seront accessibles sur :
- **Backend API** : http://localhost:3000
- **Frontend Web** : http://localhost:3001
- **AI Service** : http://localhost:5000
- **IoT Service** : http://localhost:4000
- **PgAdmin** : http://localhost:5050 (admin@agrismart.ci / admin)

### 🔧 Lancement Manuel (Sans Docker)

#### 1. Base de Données

```bash
# PostgreSQL
createdb agrismart
psql -d agrismart -f backend/src/database/schema.sql

# Redis (doit être en cours d'exécution)
redis-server
```

#### 2. Backend API

```bash
cd backend

# Installer les dépendances
npm install

# Configurer l'environnement
cp .env.example .env
# Éditer .env avec vos configurations

# Démarrer
npm run dev

# Le backend sera sur http://localhost:3000
```

#### 3. AI Service

```bash
cd ai_service

# Créer l'environnement virtuel
python -m venv venv
source venv/bin/activate  # Linux/macOS
# venv\Scripts\activate   # Windows

# Installer les dépendances
pip install -r requirements.txt

# Démarrer
python app.py

# Le service IA sera sur http://localhost:5000
```

#### 4. IoT Service

```bash
cd iot_service

# Installer les dépendances
npm install

# Configurer
cp .env.example .env

# Démarrer
npm run dev

# Le service IoT sera sur http://localhost:4000
```

#### 5. Frontend Web

```bash
cd frontend

# Installer les dépendances
npm install

# Configurer
cp .env.example .env.local

# Démarrer
npm run dev

# L'interface sera sur http://localhost:3001
```

#### 6. Application Mobile

```bash
cd mobile

# Installer les dépendances Flutter
flutter pub get

# Générer les fichiers
dart run build_runner build --delete-conflicting-outputs

# Lancer l'émulateur Android
flutter emulators --launch Pixel_7_API_34
# Ou ouvrir Android Studio > AVD Manager > Start

# Lancer l'application
flutter run

# Pour iOS (macOS uniquement)
open -a Simulator
flutter run -d iPhone
```

## 📱 Lancer l'Émulateur Mobile

### Android

```bash
# 1. Lister les émulateurs disponibles
flutter emulators

# 2. Créer un émulateur (si nécessaire)
# Ouvrir Android Studio > Tools > Device Manager > Create Device
# Choisir Pixel 7, API 34

# 3. Lancer l'émulateur
flutter emulators --launch <emulator_id>

# 4. Vérifier que l'émulateur est détecté
flutter devices

# 5. Lancer l'app
cd mobile
flutter run -d emulator-5554
```

### iOS (macOS uniquement)

```bash
# 1. Ouvrir le simulateur
open -a Simulator

# 2. Lancer l'app
cd mobile
flutter run -d iPhone
```

## 🔗 Configuration des Services

### URLs de Connexion (Développement)

| Depuis | Backend | AI Service |
|--------|---------|------------|
| Navigateur | `http://localhost:3000` | `http://localhost:5000` |
| Émulateur Android | `http://10.0.2.2:3000` | `http://10.0.2.2:5000` |
| Simulateur iOS | `http://localhost:3000` | `http://localhost:5000` |
| Appareil physique | `http://<IP_PC>:3000` | `http://<IP_PC>:5000` |

### Fichiers de Configuration

```
agriculture/
├── backend/.env              # Config backend
├── frontend/.env.local       # Config frontend
├── ai_service/.env           # Config AI
├── iot_service/.env          # Config IoT
└── mobile/lib/core/network/api_client.dart  # URL backend mobile
```

## 📚 Documentation Détaillée

| Service | README | Documentation |
|---------|--------|---------------|
| 📦 Backend | [README](backend/README.md) | [Docs](backend/docs/) |
| 🌐 Frontend | [README](frontend/README.md) | - |
| 📱 Mobile | [README](mobile/README.md) | - |
| 🤖 AI Service | [README](ai_service/README.md) | - |
| 📡 IoT Service | [README](iot_service/README.md) | - |

## 🧪 Tests

```bash
# Backend
cd backend && npm test

# Frontend
cd frontend && npm test

# AI Service
cd ai_service && pytest

# Mobile
cd mobile && flutter test
```

## 🚀 Déploiement Production

### Avec Docker Compose

```bash
# Build et déploiement production
docker-compose -f docker-compose.prod.yml up -d

# Avec SSL/Nginx
docker-compose -f docker-compose.prod.yml --profile production up -d
```

### Variables d'Environnement Production

```env
NODE_ENV=production
DB_HOST=postgres.agrismart.ci
REDIS_HOST=redis.agrismart.ci
INFLUXDB_URL=https://influxdb.agrismart.ci
```

## 📊 Monitoring

```bash
# Health checks
curl http://localhost:3000/api/health   # Backend
curl http://localhost:5000/health       # AI Service
curl http://localhost:4000/health       # IoT Service
```

## 🐛 Dépannage

### Le backend ne démarre pas

```bash
# Vérifier PostgreSQL
psql -U postgres -c "SELECT 1"

# Vérifier Redis
redis-cli ping
```

### L'émulateur Android ne se connecte pas au backend

1. Utiliser `10.0.2.2` au lieu de `localhost`
2. Vérifier : `adb reverse tcp:3000 tcp:3000`

### Erreur CORS

Le backend doit autoriser les origines frontend :
```javascript
// backend/src/config/cors.js
origin: ['http://localhost:3001', 'http://10.0.2.2:3001']
```

## 📁 Structure du Projet

```
agriculture/
├── backend/           # API REST Node.js
│   ├── src/
│   ├── docs/
│   └── README.md
│
├── frontend/          # Interface Web Next.js
│   ├── app/
│   ├── components/
│   └── README.md
│
├── mobile/            # App Mobile Flutter
│   ├── lib/
│   ├── android/
│   ├── ios/
│   └── README.md
│
├── ai_service/        # Service IA Flask
│   ├── src/
│   ├── models/
│   └── README.md
│
├── iot_service/       # Gateway IoT
│   ├── src/
│   └── README.md
│
├── docker-compose.yml
├── docker-compose.prod.yml
└── README.md          # Ce fichier
```

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

## 📞 Support

- 📧 Email : support@agrismart.ci
- 📚 Documentation : https://docs.agrismart.ci
- 🐛 Issues : https://github.com/agrismart/agriculture/issues
- 💬 Discord : https://discord.gg/agrismart

---

<p align="center">
  Développé avec ❤️ pour les agriculteurs ivoiriens 🇨🇮
</p>
