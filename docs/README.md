# 📚 Documentation AgriSmart CI

Bienvenue dans la documentation complète du projet AgriSmart CI - Plateforme Agricole Intelligente pour la Côte d'Ivoire.

## 🗂️ Index de la Documentation

### 🚀 Démarrage Rapide

1. **[Guide de Démarrage des Services](../DEMARRAGE_SERVICES.md)** ⭐ **À LIRE EN PREMIER**
   - Comment démarrer tous les services avec Docker
   - Commandes importantes
   - URLs d'accès
   - Dépannage

2. **[Vue d'Ensemble du Projet](../README.md)**
   - Architecture globale
   - Technologies utilisées
   - Installation et configuration
   - Changements récents

### 📡 Services Backend

3. **[Backend API](02-BACKEND-API.md)**
   - API REST Node.js
   - Routes et endpoints
   - Authentification JWT
   - WebSocket

4. **[Service Intelligence Artificielle](01-SERVICE-IA.md)**
   - Détection de maladies
   - Prédictions d'irrigation
   - Modèles TensorFlow
   - API endpoints

5. **[Service IoT](05-IOT-SERVICE.md)**
   - Gateway MQTT
   - Gestion des capteurs
   - InfluxDB
   - Protocoles de communication

### 🎨 Services Frontend

6. **[Interface Web](03-FRONTEND-WEB.md)**
   - Application Next.js
   - Dashboard administrateur
   - Composants UI
   - Déploiement

7. **[Application Mobile](04-MOBILE-APP.md)**
   - Application Flutter
   - Fonctionnalités
   - Configuration Android/iOS
   - Build et déploiement

### 🔧 Guides Techniques

8. **[Documentation Technique Complète](TECHNICAL.md)**
   - Architecture détaillée
   - Schéma de base de données
   - API complète
   - Sécurité
   - Monitoring

9. **[Guide de Déploiement VPS](DEPLOYMENT_VPS.md)**
   - Configuration serveur
   - Docker Compose production
   - SSL/TLS avec Let's Encrypt
   - Sauvegardes et monitoring
   - Coûts estimés

## 📋 Documentation par Cas d'Usage

### Pour les Développeurs

**Vous débutez sur le projet ?**

1. Lire [Guide de Démarrage](../DEMARRAGE_SERVICES.md)
2. Lancer les services : `docker-compose up -d`
3. Explorer [Documentation Technique](TECHNICAL.md)
4. Consulter la doc du service sur lequel vous travaillez

**Vous développez le backend ?**

- [Backend API](02-BACKEND-API.md) - Toutes les routes et contrôleurs
- [Documentation Technique](TECHNICAL.md) - Schéma de base de données

**Vous développez le frontend web ?**

- [Frontend Web](03-FRONTEND-WEB.md) - Architecture Next.js
- [Backend API](02-BACKEND-API.md) - API disponibles

**Vous développez l'app mobile ?**

- [Application Mobile](04-MOBILE-APP.md) - Configuration Flutter
- [Backend API](02-BACKEND-API.md) - API disponibles

**Vous travaillez sur l'IA ?**

- [Service IA](01-SERVICE-IA.md) - Modèles et API
- [Documentation Technique](TECHNICAL.md) - Intégration

**Vous gérez l'IoT ?**

- [Service IoT](05-IOT-SERVICE.md) - MQTT et capteurs
- [Documentation Technique](TECHNICAL.md) - Architecture IoT

### Pour les DevOps/Administrateurs

**Vous déployez en production ?**

1. Lire [Guide de Déploiement VPS](DEPLOYMENT_VPS.md)
2. Configurer les variables d'environnement
3. Suivre la checklist de déploiement
4. Configurer les sauvegardes

**Vous gérez l'infrastructure ?**

- [Guide de Déploiement VPS](DEPLOYMENT_VPS.md) - Configuration complète
- [Documentation Technique](TECHNICAL.md) - Monitoring et sécurité

### Pour les Product Owners/Chefs de Projet

**Vous voulez comprendre le projet ?**

- [Vue d'Ensemble](../README.md) - Fonctionnalités et architecture
- [Application Mobile](04-MOBILE-APP.md) - Fonctionnalités mobile
- [Frontend Web](03-FRONTEND-WEB.md) - Interface web

## 🎯 Documents par Thématique

### Architecture & Design

- [Vue d'Ensemble](../ README.md) - Architecture globale
- [Documentation Technique](TECHNICAL.md) - Architecture détaillée
- Diagrammes dans chaque documentation de service

### API & Intégrations

- [Backend API](02-BACKEND-API.md) - API REST complète
- [Service IA](01-SERVICE-IA.md) - API de prédiction
- [Service IoT](05-IOT-SERVICE.md) - API MQTT et données capteurs
- [Documentation Technique](TECHNICAL.md) - Tous les endpoints

### Déploiement & Infrastructure

- [Guide de Démarrage](../DEMARRAGE_SERVICES.md) - Développement local
- [Déploiement VPS](DEPLOYMENT_VPS.md) - Production
- [Documentation Technique](TECHNICAL.md) - Configuration avancée

### Développement Mobile  

- [Application Mobile](04-MOBILE-APP.md) - Guide complet Flutter
- Configuration Android et iOS
- Tests et déploiement

### Intelligence Artificielle

- [Service IA](01-SERVICE-IA.md) - Modèles et API
- Détection de maladies
- Prédictions d'irrigation

### IoT & Capteurs

- [Service IoT](05-IOT-SERVICE.md) - Gateway et protocoles
- Configuration MQTT
- InfluxDB et time-series

## 🔑 Informations Importantes

### Compte de Test

Pour tester l'application :

- **Téléphone** : `0700000001`
- **Mot de passe** : `password123`

### URLs d'Accès (Développement)

- **Frontend Web** : <http://localhost:3001>
- **Backend API** : <http://localhost:3000/api/v1>
- **Service IA** : <http://localhost:5001>
- **Service IoT** : <http://localhost:4000>

### Commandes Rapides

```bash
# Démarrer tous les services
docker-compose up -d

# Voir l'état
docker-compose ps

# Voir les logs
docker-compose logs -f

# Arrêter
docker-compose down
```

## ⚠️ Notes Importantes

1. **Ne JAMAIS lancer `npm run dev` directement** - Toujours utiliser Docker
2. **Le port du service IA est 5001** (et non 5000 pour éviter conflit macOS)
3. **Lire [DEMARRAGE_SERVICES.md](../DEMARRAGE_SERVICES.md) en premier**

## 📞 Support

- 📧 Email : <support@agrismart.ci>
- 📚 Documentation en ligne : <https://docs.agrismart.ci>
- 🐛 Issues : <https://github.com/agrismart/agriculture/issues>

## 🆕 Dernière Mise à Jour

**Version** : 1.2.0  
**Date** : Décembre 2024

**Changements récents** :

- ✅ Port IA changé 5000 → 5001
- ✅ Corrections frontend et backend
- ✅ Documentation complète mise à jour
- ✅ Guide de déploiement VPS créé

---

<p align="center">
  Pour toute question sur la documentation, consulter le support ou créer une issue
</p>
