# 🤖 AgriSmart CI - Service IA

Service d'intelligence artificielle pour la détection de maladies des plantes et les recommandations d'irrigation.

## 📋 Description

Le service IA utilise TensorFlow pour :

- **Détection de maladies** : Analyse d'images de plantes pour identifier les maladies
- **Prédiction d'irrigation** : Recommandations d'arrosage basées sur les données des capteurs

## 🏗️ Architecture

```
┌─────────────────────────────────────┐
│        AI Service (Flask)           │
├─────────────────────────────────────┤
│                                     │
│  ┌──────────────┐  ┌─────────────┐ │
│  │   Disease    │  │ Irrigation  │ │
│  │  Detection   │  │ Prediction  │ │
│  │   Model      │  │   Model     │ │
│  └──────────────┘  └─────────────┘ │
│                                     │
│  ┌──────────────────────────────┐  │
│  │   Flask API (Gunicorn)       │  │
│  └──────────────────────────────┘  │
│                                     │
└─────────────────────────────────────┘
```

## 🚀 Démarrage

### Avec Docker (Recommandé)

```bash
# Depuis la racine du projet
docker-compose up -d ai_service

# Vérifier les logs
docker logs agrismart_ai

# Tester le service
curl http://localhost:5001/health
```

### Configuration

Le service utilise les variables d'environnement suivantes :

```env
# Port d'écoute
PORT=5001

# Chemins des modèles
DISEASE_MODEL_PATH=models/disease_detection_model.h5
IRRIGATION_MODEL_PATH=models/irrigation_model.h5

# Configuration TensorFlow
TF_CPP_MIN_LOG_LEVEL=2
```

## 📡 API Endpoints

### Health Check

```http
GET /health
```

**Réponse** :

```json
{
  "status": "healthy",
  "service": "AgriSmart AI"
}
```

### Détection de Maladies

```http
POST /predict/disease
Content-Type: multipart/form-data

image: <fichier image>
```

**Réponse** :

```json
{
  "success": true,
  "prediction": {
    "disease": "Mildiou",
    "confidence": 0.95,
    "severity": "Modéré",
    "recommendations": [
      "Appliquer un fongicide à base de cuivre",
      "Améliorer la ventilation",
      "Éviter l'arrosage par aspersion"
    ]
  }
}
```

### Prédiction d'Irrigation

```http
POST /predict/irrigation
Content-Type: application/json

{
  "soil_moisture": 45.2,
  "temperature": 28.5,
  "humidity": 65.0,
  "rainfall_forecast": 0.0,
  "crop_type": "cacao"
}
```

**Réponse** :

```json
{
  "success": true,
  "prediction": {
    "should_irrigate": true,
    "water_amount_mm": 15.5,
    "confidence": 0.88,
    "reasoning": "Sol sec et pas de pluie prévue"
  }
}
```

## 🧠 Modèles

### Modèle de Détection de Maladies

- **Architecture** : MobileNetV2 (Transfer Learning)
- **Dataset** : PlantVillage + données locales Côte d'Ivoire
- **Classes** : 15 maladies courantes
- **Précision** : ~92% sur le jeu de test

Maladies détectées :

- Mildiou
- Pourriture noire
- Anthracnose
- Rouille du café
- etc.

### Modèle de Prédiction d'Irrigation

- **Architecture** : Random Forest Regressor
- **Features** :
  - Humidité du sol (%)
  - Température (°C)
  - Humidité de l'air (%)
  - Prévisions de pluie
  - Type de culture
  - Stade de croissance

## 🔧 Développement

### Dépendances

```txt
flask==3.0.0
gunicorn==21.2.0
tensorflow==2.15.0
numpy==1.24.3
Pillow==10.1.0
python-dotenv==1.0.0
```

### Structure du Projet

```
ai_service/
├── app.py                 # Application Flask principale
├── models/                # Modèles TensorFlow
│   ├── disease_detection_model.h5
│   └── irrigation_model.h5
├── requirements.txt       # Dépendances Python
├── Dockerfile            # Image Docker
└── README.md             # Ce fichier
```

### Entraîner les Modèles

```bash
# Détection de maladies
python scripts/train_disease_model.py --dataset data/plantvillage

# Irrigation
python scripts/train_irrigation_model.py --dataset data/sensor_data.csv
```

## 🐳 Docker

### Dockerfile

```dockerfile
FROM python:3.10-slim

WORKDIR /app

# Installer les dépendances système
RUN apt-get update && apt-get install -y \
    libglib2.0-0 \
    libsm6 \
    libxext6 \
    libxrender-dev \
    libgomp1 \
    && rm -rf /var/lib/apt/lists/*

# Copier et installer les requirements
COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

# Copier le code
COPY . .

# Exposition du port
EXPOSE 5001

# Lancer avec Gunicorn
CMD ["gunicorn", "--bind", "0.0.0.0:5001", "--workers", "2", "--timeout", "120", "app:app"]
```

### Build & Run

```bash
# Build
docker build -t agrismart-ai .

# Run
docker run -p 5001:5001 agrismart-ai
```

## 📊 Performance

| Endpoint | Temps Moyen | Mémoire |
|----------|-------------|---------|
| `/health` | ~5ms | - |
| `/predict/disease` | ~800ms | ~500MB |
| `/predict/irrigation` | ~50ms | ~200MB |

## 🔧 Dépannage

### Le service ne démarre pas

```bash
# Vérifier les logs
docker logs agrismart_ai

# Vérifier que le port 5001 n'est pas utilisé
lsof -i :5001

# Redémarrer le service
docker-compose restart ai_service
```

### Erreur "Model not found"

Les modèles doivent être présents dans le dossier `models/`. Si manquants :

```bash
# Télécharger les modèles pré-entraînés
wget https://storage.agrismart.ci/models/disease_model.h5 -O models/disease_detection_model.h5
wget https://storage.agrismart.ci/models/irrigation_model.h5 -O models/irrigation_model.h5
```

### Prédictions lentes

- Augmenter le nombre de workers Gunicorn (dans `docker-compose.yml`)
- Utiliser une instance avec plus de RAM
- Activer le GPU (nécessite tensorflow-gpu et NVIDIA drivers)

## 🆕 Changements Récents

### v1.2.0 (Décembre 2024)

- ✅ **Port changé de 5000 → 5001** (conflit macOS AirPlay)
- ✅ Ajout de **Gunicorn** dans requirements.txt
- ✅ Correction du chargement des modèles au démarrage
- ✅ Amélioration de la gestion d'erreurs
- ✅ Ajout de logs détaillés

## 📞 Support

Pour toute question sur le service IA :

- 📧 Email : <ai-team@agrismart.ci>
- 🐛 Issues : <https://github.com/agrismart/agriculture/issues>
- 📚 Docs : <https://docs.agrismart.ci/ai-service>
