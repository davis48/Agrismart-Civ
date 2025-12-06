# 🤖 AgriSmart CI - Service IA

[![Python](https://img.shields.io/badge/Python-3.10+-3776AB.svg)](https://python.org/)
[![Flask](https://img.shields.io/badge/Flask-2.3-000000.svg)](https://flask.palletsprojects.com/)
[![TensorFlow](https://img.shields.io/badge/TensorFlow-2.13-FF6F00.svg)](https://www.tensorflow.org/)
[![Status](https://img.shields.io/badge/Status-Production%20Ready-brightgreen.svg)]()

> Service d'Intelligence Artificielle pour la détection de maladies et recommandations agricoles

## 📋 Description

Le service IA AgriSmart CI est une API Flask qui utilise des modèles de deep learning pour :
- Détecter les maladies des plantes à partir de photos
- Prédire les besoins en irrigation
- Recommander les cultures adaptées au sol
- Analyser les données des capteurs pour des alertes précoces

### 📊 Statistiques du Service

| Métrique | Valeur |
|----------|--------|
| Maladies détectables | 50+ |
| Précision détection | 94% |
| Cultures supportées | 15+ |
| Temps de réponse | <2s |
| Modèles ML | 3 |

## 🚀 Fonctionnalités

### 🔬 Détection de Maladies
- **Input** : Image de feuille/plante (JPEG, PNG)
- **Output** : Maladie détectée, confiance, traitements recommandés
- **Maladies** : Mildiou, Oïdium, Rouille, Anthracnose, Carences (N, P, K), etc.

### 💧 Prédiction d'Irrigation
- **Input** : Données capteurs (humidité, température, type sol, culture)
- **Output** : Quantité d'eau recommandée, fréquence, meilleur moment

### 🌱 Recommandation de Cultures
- **Input** : Caractéristiques du sol (pH, NPK, texture)
- **Output** : Cultures adaptées avec scores de compatibilité

### ⚠️ Alertes Précoces
- Analyse des tendances des capteurs
- Détection d'anomalies
- Prédiction de risques (sécheresse, gel, maladies)

## 🛠️ Technologies

| Catégorie | Technologie |
|-----------|-------------|
| **Langage** | Python 3.10+ |
| **Framework** | Flask 2.3 |
| **ML Framework** | TensorFlow 2.13 |
| **Image Processing** | Pillow, OpenCV |
| **Data** | NumPy, Pandas |
| **API** | Flask-RESTful, Flask-CORS |

## 📦 Installation

### Prérequis

- Python 3.10+
- pip ou conda
- GPU CUDA (optionnel, pour accélération)

### Installation avec pip

```bash
# Cloner le repository
git clone https://github.com/agrismart/ai_service.git
cd ai_service

# Créer un environnement virtuel
python -m venv venv

# Activer l'environnement
# Linux/macOS:
source venv/bin/activate
# Windows:
venv\Scripts\activate

# Installer les dépendances
pip install -r requirements.txt

# Télécharger les modèles pré-entraînés (optionnel)
python scripts/download_models.py
```

### Installation avec Conda

```bash
# Créer l'environnement
conda env create -f environment.yml

# Activer
conda activate agrismart-ai
```

## 🚀 Lancement

### Mode Développement

```bash
# Activer l'environnement virtuel
source venv/bin/activate  # Linux/macOS

# Lancer le serveur Flask
python app.py

# Ou avec Flask CLI
flask run --host=0.0.0.0 --port=5000

# Le service sera accessible sur http://localhost:5000
```

### Mode Production (Gunicorn)

```bash
# Installer Gunicorn
pip install gunicorn

# Lancer avec Gunicorn
gunicorn --bind 0.0.0.0:5000 --workers 4 app:app

# Avec plus d'options
gunicorn \
  --bind 0.0.0.0:5000 \
  --workers 4 \
  --threads 2 \
  --timeout 120 \
  --log-level info \
  app:app
```

### Avec Docker

```bash
# Build de l'image
docker build -t agrismart-ai .

# Lancer le conteneur
docker run -p 5000:5000 agrismart-ai

# Avec GPU (NVIDIA Docker)
docker run --gpus all -p 5000:5000 agrismart-ai

# Ou via docker-compose (depuis la racine du projet)
docker-compose up ai_service
```

## ⚙️ Configuration

### Variables d'Environnement

Créez un fichier `.env` :

```env
# Flask
FLASK_ENV=development
FLASK_DEBUG=1
SECRET_KEY=your_secret_key

# Serveur
HOST=0.0.0.0
PORT=5000

# Modèles
MODEL_PATH=./models
DISEASE_MODEL=disease_detection_v2.h5
IRRIGATION_MODEL=irrigation_predictor.h5

# GPU
USE_GPU=false
CUDA_VISIBLE_DEVICES=0

# Logs
LOG_LEVEL=INFO
LOG_FILE=logs/ai_service.log

# Cache
ENABLE_CACHE=true
CACHE_TTL=3600
```

### Configuration des Modèles

Les modèles ML doivent être placés dans le dossier `models/` :

```
models/
├── disease_detection/
│   ├── disease_model.h5
│   └── labels.json
├── irrigation/
│   └── irrigation_model.pkl
└── crop_recommendation/
    └── crop_model.pkl
```

## 📚 API Documentation

### Health Check

```bash
GET /health

# Réponse
{
  "status": "healthy",
  "version": "1.0.0",
  "models_loaded": true
}
```

### Détection de Maladies

```bash
POST /predict/disease
Content-Type: multipart/form-data

# Body
image: <fichier image>

# Réponse
{
  "success": true,
  "prediction": {
    "disease": "Mildiou",
    "confidence": 0.94,
    "description": "Maladie fongique causée par Phytophthora infestans",
    "treatments": [
      "Appliquer un fongicide à base de cuivre",
      "Retirer les feuilles infectées",
      "Améliorer la circulation d'air"
    ],
    "prevention": [
      "Éviter l'arrosage par le haut",
      "Rotation des cultures"
    ]
  }
}
```

### Prédiction d'Irrigation

```bash
POST /predict/irrigation
Content-Type: application/json

# Body
{
  "humidity": 35,
  "temperature": 28,
  "soil_type": "argileux",
  "crop": "maïs",
  "last_irrigation": "2024-01-15T08:00:00Z"
}

# Réponse
{
  "success": true,
  "recommendation": {
    "water_amount_mm": 25,
    "frequency_days": 3,
    "best_time": "06:00-08:00",
    "urgency": "high",
    "notes": "Sol sec, irrigation urgente recommandée"
  }
}
```

### Recommandation de Cultures

```bash
POST /predict/crop
Content-Type: application/json

# Body
{
  "ph": 6.5,
  "nitrogen": 40,
  "phosphorus": 35,
  "potassium": 40,
  "soil_type": "limono-argileux",
  "region": "centre"
}

# Réponse
{
  "success": true,
  "recommendations": [
    {
      "crop": "Riz",
      "score": 0.92,
      "yield_estimate": "4.2 t/ha",
      "season": "Avril-Septembre"
    },
    {
      "crop": "Maïs",
      "score": 0.88,
      "yield_estimate": "3.5 t/ha",
      "season": "Mars-Juillet"
    }
  ]
}
```

## 📁 Structure du Projet

```
ai_service/
├── app.py                    # Point d'entrée Flask
├── requirements.txt          # Dépendances pip
├── environment.yml           # Environnement Conda
├── Dockerfile
│
├── models/                   # Modèles ML pré-entraînés
│   ├── disease_detection/
│   ├── irrigation/
│   └── crop_recommendation/
│
├── src/
│   ├── __init__.py
│   ├── disease_detector.py   # Détection maladies
│   ├── irrigation_predictor.py
│   ├── crop_recommender.py
│   └── utils/
│       ├── image_processing.py
│       └── data_preprocessing.py
│
├── data/
│   ├── diseases.json         # Base de données maladies
│   ├── crops.json            # Infos cultures
│   └── treatments.json       # Traitements recommandés
│
├── scripts/
│   ├── download_models.py    # Télécharger modèles
│   ├── train_disease.py      # Entraîner modèle maladies
│   └── evaluate.py           # Évaluer performances
│
├── tests/
│   ├── test_disease.py
│   ├── test_irrigation.py
│   └── test_api.py
│
└── logs/
```

## 🧪 Tests

```bash
# Tous les tests
pytest

# Tests avec couverture
pytest --cov=src

# Tests spécifiques
pytest tests/test_disease.py

# Test manuel de l'API
curl -X POST http://localhost:5000/predict/disease \
  -F "image=@test_images/leaf.jpg"
```

## 📊 Entraînement des Modèles

### Détection de Maladies

```bash
# Préparer le dataset
python scripts/prepare_dataset.py --input data/raw --output data/processed

# Entraîner
python scripts/train_disease.py \
  --data data/processed \
  --epochs 50 \
  --batch-size 32 \
  --model-output models/disease_detection/

# Évaluer
python scripts/evaluate.py --model models/disease_detection/model.h5
```

### Dataset

Le modèle de détection est entraîné sur :
- PlantVillage Dataset (54,000+ images)
- Dataset local Côte d'Ivoire (5,000+ images)
- Augmentation (rotation, flip, brightness)

## 🔧 Performance

### Optimisation GPU

```python
# Dans app.py
import tensorflow as tf

# Limiter la mémoire GPU
gpus = tf.config.experimental.list_physical_devices('GPU')
if gpus:
    tf.config.experimental.set_memory_growth(gpus[0], True)
```

### Cache des Prédictions

Le service utilise un cache pour les images déjà analysées :

```python
# Activer le cache
ENABLE_CACHE=true
CACHE_TTL=3600  # 1 heure
```

## 🐛 Dépannage

### Erreur "Model not found"

```bash
# Télécharger les modèles
python scripts/download_models.py

# Ou placer manuellement dans models/
```

### Erreur mémoire GPU

```bash
# Réduire la taille de batch
BATCH_SIZE=1

# Ou désactiver le GPU
USE_GPU=false
```

### Prédictions lentes

1. Activer le GPU si disponible
2. Réduire la taille des images en entrée
3. Utiliser le cache

### Erreur CORS

Le service inclut Flask-CORS. Vérifier que le frontend est autorisé dans `app.py`.

## 📈 Monitoring

### Endpoint de Métriques

```bash
GET /metrics

# Réponse
{
  "total_predictions": 1234,
  "average_response_time_ms": 450,
  "cache_hit_rate": 0.35,
  "model_versions": {
    "disease": "2.0.0",
    "irrigation": "1.5.0"
  }
}
```

### Logs

Les logs sont dans `logs/ai_service.log` avec rotation quotidienne.

## 📄 Licence

Ce projet est sous licence MIT.

## 📞 Support

- Email: ai@agrismart.ci
- Documentation: https://docs.agrismart.ci/ai
- Issues: https://github.com/agrismart/ai_service/issues

---

Développé avec ❤️ et TensorFlow pour les agriculteurs ivoiriens 🇨🇮
