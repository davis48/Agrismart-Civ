# 📡 AgriSmart CI - Service IoT

[![Node.js](https://img.shields.io/badge/Node.js-20%20LTS-green.svg)](https://nodejs.org/)
[![MQTT](https://img.shields.io/badge/MQTT-5.0-660066.svg)](https://mqtt.org/)
[![InfluxDB](https://img.shields.io/badge/InfluxDB-2.7-22ADF6.svg)](https://www.influxdata.com/)
[![Status](https://img.shields.io/badge/Status-Production%20Ready-brightgreen.svg)]()

> Gateway IoT pour la collecte et le traitement des données capteurs agricoles

## 📋 Description

Le service IoT AgriSmart CI est le composant central pour la gestion des capteurs agricoles. Il reçoit les données des capteurs via MQTT/HTTP, les valide, les stocke dans InfluxDB et déclenche des alertes en temps réel.

### 📊 Statistiques du Service

| Métrique | Valeur |
|----------|--------|
| Protocoles | MQTT, HTTP, LoRaWAN |
| Types de capteurs | 8+ |
| Fréquence max | 1 mesure/seconde |
| Rétention données | 1 an |
| Alertes temps réel | <100ms |

## 🚀 Fonctionnalités

### 📥 Ingestion de Données
- **MQTT** - Protocole léger pour capteurs batterie
- **HTTP/REST** - API pour capteurs 4G/WiFi
- **LoRaWAN** - Intégration passerelle LoRa
- **Webhooks** - Réception depuis services tiers

### 📊 Types de Capteurs Supportés

| Type | Mesures | Unité |
|------|---------|-------|
| Humidité Sol | 0-100 | % |
| Température Sol | -10-60 | °C |
| Température Air | -20-50 | °C |
| pH Sol | 0-14 | - |
| NPK | N, P, K | mg/kg |
| Pluviométrie | 0-500 | mm |
| Luminosité | 0-100k | lux |
| Niveau Eau | 0-10 | m |

### ⚠️ Système d'Alertes
- Seuils configurables par capteur
- Alertes multi-niveaux (critique, warning, info)
- Notifications temps réel via WebSocket
- Envoi SMS/WhatsApp pour alertes critiques

### 📈 Stockage et Historique
- InfluxDB pour séries temporelles
- Agrégation automatique (minute, heure, jour)
- Rétention configurable
- Export CSV/JSON

## 🛠️ Technologies

| Catégorie | Technologie |
|-----------|-------------|
| **Runtime** | Node.js 20 LTS |
| **MQTT Broker** | Mosquitto 2.0 |
| **Base de données** | InfluxDB 2.7 |
| **Cache** | Redis 7 |
| **Temps réel** | Socket.IO |
| **Queue** | Bull (Redis) |

## 📦 Installation

### Prérequis

- Node.js 20+
- Docker & Docker Compose
- Mosquitto (MQTT Broker)
- InfluxDB 2.7
- Redis 7

### Installation avec Docker (Recommandé)

```bash
# Cloner le repository
git clone https://github.com/agrismart/iot_service.git
cd iot_service

# Copier la configuration
cp .env.example .env

# Lancer tous les services (MQTT, InfluxDB, Redis, IoT Service)
docker-compose up -d

# Vérifier les logs
docker-compose logs -f iot_service
```

### Installation Locale

```bash
# Cloner le repository
cd iot_service

# Installer les dépendances
npm install

# Copier et configurer l'environnement
cp .env.example .env
# Éditer .env avec vos configurations

# Démarrer en mode développement
npm run dev
```

## 🚀 Lancement

### Mode Développement

```bash
# Démarrer le service IoT
npm run dev

# Le service sera accessible sur:
# - HTTP API: http://localhost:4000
# - MQTT: mqtt://localhost:1883
# - WebSocket: ws://localhost:4000
```

### Mode Production

```bash
# Build
npm run build

# Démarrer en production
npm start

# Ou avec PM2
pm2 start ecosystem.config.js
```

### Avec Docker Compose

```bash
# Développement (tous les services)
docker-compose up -d

# Services individuels
docker-compose up -d mosquitto influxdb redis
docker-compose up -d iot_service

# Voir les logs
docker-compose logs -f

# Arrêter
docker-compose down
```

## ⚙️ Configuration

### Variables d'Environnement

Créez un fichier `.env` :

```env
# Serveur
NODE_ENV=development
PORT=4000

# MQTT Broker
MQTT_BROKER_URL=mqtt://localhost:1883
MQTT_USERNAME=agrismart
MQTT_PASSWORD=your_password
MQTT_CLIENT_ID=agrismart-iot-gateway

# InfluxDB
INFLUXDB_URL=http://localhost:8086
INFLUXDB_TOKEN=your_influxdb_token
INFLUXDB_ORG=agrismart
INFLUXDB_BUCKET=sensors

# Redis
REDIS_HOST=localhost
REDIS_PORT=6379
REDIS_PASSWORD=

# Backend API
BACKEND_API_URL=http://localhost:3000/api
BACKEND_API_KEY=your_api_key

# Alertes
ALERT_SMS_ENABLED=false
TWILIO_ACCOUNT_SID=
TWILIO_AUTH_TOKEN=
TWILIO_PHONE_NUMBER=

# Logs
LOG_LEVEL=info
```

### Configuration MQTT

Topics MQTT utilisés :

```
# Format des topics
agrismart/{device_id}/sensors/{sensor_type}

# Exemples
agrismart/DEV001/sensors/humidity
agrismart/DEV001/sensors/temperature
agrismart/DEV001/sensors/ph

# Payload JSON
{
  "value": 45.5,
  "unit": "%",
  "timestamp": "2024-01-15T10:30:00Z",
  "battery": 85
}
```

### Configuration InfluxDB

```bash
# Créer le bucket
influx bucket create -n sensors -o agrismart -r 365d

# Créer un token
influx auth create --org agrismart --read-buckets --write-buckets
```

## 📚 API Documentation

### Health Check

```bash
GET /health

# Réponse
{
  "status": "healthy",
  "mqtt": "connected",
  "influxdb": "connected",
  "redis": "connected"
}
```

### Ingestion HTTP

```bash
POST /api/ingest
Content-Type: application/json
Authorization: Bearer <device_token>

# Body
{
  "device_id": "DEV001",
  "sensors": [
    {
      "type": "humidity",
      "value": 45.5,
      "unit": "%"
    },
    {
      "type": "temperature",
      "value": 28.3,
      "unit": "°C"
    }
  ],
  "battery": 85,
  "timestamp": "2024-01-15T10:30:00Z"
}

# Réponse
{
  "success": true,
  "message": "2 measurements ingested",
  "alerts": []
}
```

### Ingestion Batch

```bash
POST /api/ingest/batch
Content-Type: application/json

# Body
{
  "measurements": [
    { "device_id": "DEV001", "type": "humidity", "value": 45.5 },
    { "device_id": "DEV002", "type": "temperature", "value": 28.3 }
  ]
}
```

### Récupérer les Données

```bash
# Dernières mesures d'un capteur
GET /api/sensors/{device_id}/latest

# Historique
GET /api/sensors/{device_id}/history?from=2024-01-01&to=2024-01-15&interval=1h

# Réponse
{
  "device_id": "DEV001",
  "data": [
    { "time": "2024-01-15T10:00:00Z", "humidity": 45.5, "temperature": 28.3 },
    { "time": "2024-01-15T11:00:00Z", "humidity": 44.2, "temperature": 29.1 }
  ]
}
```

### Configuration des Alertes

```bash
POST /api/alerts/config
Content-Type: application/json

# Body
{
  "device_id": "DEV001",
  "sensor_type": "humidity",
  "rules": [
    { "operator": "<", "value": 30, "level": "critical", "message": "Humidité critique" },
    { "operator": "<", "value": 40, "level": "warning", "message": "Humidité basse" }
  ]
}
```

## 📁 Structure du Projet

```
iot_service/
├── src/
│   ├── index.js              # Point d'entrée
│   ├── mqtt/
│   │   ├── client.js         # Client MQTT
│   │   └── handlers.js       # Handlers messages
│   ├── http/
│   │   ├── server.js         # Serveur Express
│   │   └── routes/
│   │       ├── ingest.js
│   │       └── sensors.js
│   ├── influxdb/
│   │   ├── client.js         # Client InfluxDB
│   │   └── queries.js        # Requêtes Flux
│   ├── alerts/
│   │   ├── engine.js         # Moteur d'alertes
│   │   └── notifier.js       # Envoi notifications
│   ├── services/
│   │   ├── aggregator.js     # Agrégation données
│   │   └── validator.js      # Validation mesures
│   └── utils/
│       └── logger.js
│
├── config/
│   ├── default.json
│   ├── production.json
│   └── mosquitto.conf
│
├── docker-compose.yml
├── Dockerfile
├── ecosystem.config.js       # PM2 config
└── package.json
```

## 🔌 Intégration Capteurs

### Capteurs Compatibles

| Marque | Modèle | Protocole | Notes |
|--------|--------|-----------|-------|
| Dragino | LSE01 | LoRaWAN | Humidité + Temp sol |
| RAK | RAK10700 | LoRaWAN | Multi-capteurs |
| Custom | ESP32 | MQTT/WiFi | DIY |
| Custom | Arduino + SIM | HTTP/4G | Zones sans WiFi |

### Exemple ESP32 (Arduino)

```cpp
#include <WiFi.h>
#include <PubSubClient.h>

const char* mqtt_server = "iot.agrismart.ci";
const char* topic = "agrismart/DEV001/sensors/humidity";

void publishSensor(float value) {
  String payload = "{\"value\":" + String(value) + ",\"unit\":\"%\"}";
  client.publish(topic, payload.c_str());
}
```

### Exemple Python (Raspberry Pi)

```python
import paho.mqtt.client as mqtt
import json

client = mqtt.Client("DEV001")
client.connect("localhost", 1883)

data = {
    "value": 45.5,
    "unit": "%",
    "timestamp": "2024-01-15T10:30:00Z"
}

client.publish("agrismart/DEV001/sensors/humidity", json.dumps(data))
```

## 🧪 Tests

```bash
# Tests unitaires
npm test

# Tests d'intégration
npm run test:integration

# Test manuel MQTT
mosquitto_pub -h localhost -t "agrismart/test/sensors/humidity" \
  -m '{"value": 45.5, "unit": "%"}'

# Test manuel HTTP
curl -X POST http://localhost:4000/api/ingest \
  -H "Content-Type: application/json" \
  -d '{"device_id": "DEV001", "sensors": [{"type": "humidity", "value": 45.5}]}'
```

## 📊 Monitoring

### Métriques Prometheus

```bash
GET /metrics

# Métriques disponibles
iot_messages_total{status="success|error"}
iot_message_processing_seconds
iot_active_devices
iot_alerts_triggered_total
```

### Dashboard Grafana

Un dashboard Grafana est inclus pour visualiser :
- Nombre de messages/seconde
- Latence de traitement
- État des capteurs
- Historique des alertes

```bash
# Importer le dashboard
grafana-cli dashboards import dashboards/iot-overview.json
```

## 🐛 Dépannage

### MQTT ne se connecte pas

```bash
# Vérifier que Mosquitto est lancé
docker-compose ps mosquitto

# Tester la connexion
mosquitto_sub -h localhost -t "test"
# Dans un autre terminal
mosquitto_pub -h localhost -t "test" -m "hello"
```

### InfluxDB timeout

```bash
# Vérifier le token
curl -H "Authorization: Token $INFLUXDB_TOKEN" \
  http://localhost:8086/api/v2/health
```

### Messages perdus

1. Vérifier les logs du service
2. Vérifier la connexion Redis (queue)
3. Vérifier l'espace disque InfluxDB

## 📄 Licence

Ce projet est sous licence MIT.

## 📞 Support

- Email: iot@agrismart.ci
- Documentation: https://docs.agrismart.ci/iot
- Issues: https://github.com/agrismart/iot_service/issues

---

Développé avec ❤️ et Node.js pour les agriculteurs ivoiriens 🇨🇮
