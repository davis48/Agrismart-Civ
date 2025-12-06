# 📱 AgriSmart CI - Application Mobile

[![Flutter](https://img.shields.io/badge/Flutter-3.10+-02569B.svg)](https://flutter.dev/)
[![Dart](https://img.shields.io/badge/Dart-3.0+-0175C2.svg)](https://dart.dev/)
[![Platform](https://img.shields.io/badge/Platform-Android%20%7C%20iOS-green.svg)]()
[![Status](https://img.shields.io/badge/Status-Production%20Ready-brightgreen.svg)]()

> Application mobile multiplateforme pour les agriculteurs ivoiriens

## 📋 Description

L'application mobile AgriSmart CI permet aux producteurs agricoles de Côte d'Ivoire de gérer leurs exploitations, consulter les données des capteurs IoT en temps réel, diagnostiquer les maladies des plantes via IA, et accéder à un écosystème complet de services agricoles.

### 📊 Statistiques de l'Application

| Métrique | Valeur |
|----------|--------|
| Pages/Écrans | 15+ |
| Fonctionnalités | 12 modules |
| Langues supportées | 3 (FR, Baoulé, Dioula) |
| Plateformes | Android, iOS |
| Architecture | Clean Architecture + BLoC |

## 🚀 Fonctionnalités

### 🏠 Dashboard
- Météo temps réel avec prévisions 7 jours
- Affichage des données capteurs (humidité, température, pH, NPK)
- Alertes multi-niveaux (critique, warning, info)
- Statistiques globales des parcelles

### 🌾 Gestion des Parcelles
- Liste des parcelles avec indicateurs de santé
- Ajout/modification de parcelles
- Suivi par type de culture et type de sol
- Dernières mesures par parcelle

### 📡 Capteurs IoT
- Visualisation en temps réel
- Filtrage par type (humidité, température, pH, NPK)
- Graphiques sparkline d'historique
- État de batterie des capteurs

### 🔬 Diagnostic IA
- Prise de photo via caméra ou galerie
- Analyse automatique par intelligence artificielle
- Détection de 50+ maladies (94% de précision)
- Recommandations de traitements
- Historique des diagnostics

### 💡 Recommandations IA
- Conseils d'irrigation personnalisés
- Recommandations de fertilisation
- Suggestions de cultures adaptées
- Alertes phytosanitaires préventives

### 🛒 Marketplace
- Catalogue de produits agricoles
- Catégories : Semences, Engrais, Phytosanitaires, Récoltes, Équipements
- Création d'annonces de vente
- Mise en relation producteurs/acheteurs

### 🎓 Formations
- Catalogue de cours vidéo et PDF
- Suivi de progression
- Catégories : IoT, Irrigation, Maladies, Sol, Cultures
- Modules interactifs

### 💬 Messagerie
- Chat temps réel entre agriculteurs
- Conversations individuelles et groupes
- Support technique intégré
- Partage de photos

### 📈 Analytics
- Retour sur investissement (ROI)
- Comparaison rendements vs agriculture traditionnelle
- Économies générées (eau, engrais, pertes)
- Performance par parcelle

### 🔔 Notifications
- Alertes critiques (<24h)
- Alertes importantes (<48h)
- Informations générales
- Filtrage et gestion

## 🛠️ Technologies

| Catégorie | Technologie |
|-----------|-------------|
| **Framework** | Flutter 3.10+ |
| **Langage** | Dart 3.0+ |
| **State Management** | flutter_bloc |
| **Navigation** | go_router |
| **HTTP Client** | Dio |
| **Base locale** | Isar |
| **DI** | get_it |
| **Modèles** | Freezed + JSON Serializable |

## 📦 Installation

### Prérequis

- Flutter SDK 3.10+
- Dart SDK 3.0+
- Android Studio / Xcode
- Émulateur Android ou simulateur iOS

### Installation

```bash
# Cloner le repository
git clone https://github.com/agrismart/mobile.git
cd mobile

# Installer les dépendances
flutter pub get

# Générer les fichiers (modèles, Isar)
dart run build_runner build --delete-conflicting-outputs

# Vérifier la configuration
flutter doctor
```

## 🚀 Lancement

### Sur Émulateur Android

```bash
# Lister les émulateurs disponibles
flutter emulators

# Démarrer un émulateur
flutter emulators --launch <emulator_id>
# Exemple: flutter emulators --launch Pixel_7_API_34

# OU via Android Studio
# Ouvrir AVD Manager > Démarrer un émulateur

# Lancer l'application
flutter run
```

### Sur Simulateur iOS (macOS uniquement)

```bash
# Ouvrir le simulateur
open -a Simulator

# Lancer l'application
flutter run -d iPhone
```

### Sur Appareil Physique

```bash
# Android - Activer le débogage USB
# iOS - Connecter via Xcode

# Lister les appareils connectés
flutter devices

# Lancer sur un appareil spécifique
flutter run -d <device_id>
```

### Mode Release

```bash
# Build APK Android
flutter build apk --release

# Build App Bundle Android (Play Store)
flutter build appbundle --release

# Build iOS (macOS uniquement)
flutter build ios --release
```

## ⚙️ Configuration

### Variables d'Environnement

Créez un fichier `lib/core/config/env.dart` :

```dart
class Env {
  // API Backend
  static const String apiBaseUrl = 'http://10.0.2.2:3000/api'; // Émulateur Android
  // static const String apiBaseUrl = 'http://localhost:3000/api'; // iOS Simulator
  // static const String apiBaseUrl = 'https://api.agrismart.ci/api'; // Production
  
  // API IA
  static const String aiServiceUrl = 'http://10.0.2.2:5000';
  
  // Clés API (optionnel)
  static const String? openWeatherKey = null;
}
```

### Configuration Android

Fichier `android/app/src/main/AndroidManifest.xml` :

```xml
<manifest>
    <!-- Permissions -->
    <uses-permission android:name="android.permission.INTERNET"/>
    <uses-permission android:name="android.permission.CAMERA"/>
    <uses-permission android:name="android.permission.READ_EXTERNAL_STORAGE"/>
    <uses-permission android:name="android.permission.ACCESS_FINE_LOCATION"/>
    
    <application
        android:label="AgriSmart CI"
        android:usesCleartextTraffic="true"> <!-- Dev only -->
        ...
    </application>
</manifest>
```

### Configuration iOS

Fichier `ios/Runner/Info.plist` :

```xml
<dict>
    <key>NSCameraUsageDescription</key>
    <string>AgriSmart utilise la caméra pour diagnostiquer les maladies des plantes</string>
    <key>NSPhotoLibraryUsageDescription</key>
    <string>AgriSmart accède à la galerie pour analyser les photos de plantes</string>
    <key>NSLocationWhenInUseUsageDescription</key>
    <string>AgriSmart utilise votre position pour les parcelles et la météo locale</string>
</dict>
```

## 📁 Structure du Projet

```
mobile/
├── lib/
│   ├── core/
│   │   ├── config/          # Configuration
│   │   ├── network/         # Client API (Dio)
│   │   ├── error/           # Gestion erreurs
│   │   └── usecases/        # Base use cases
│   │
│   ├── features/
│   │   ├── auth/            # Authentification
│   │   │   ├── data/        # Datasources, Models, Repositories
│   │   │   ├── domain/      # Entities, Repositories, Usecases
│   │   │   └── presentation/ # BLoC, Pages, Widgets
│   │   │
│   │   ├── dashboard/       # Tableau de bord
│   │   ├── parcelles/       # Gestion parcelles
│   │   ├── capteurs/        # Capteurs IoT
│   │   ├── diagnostic/      # Diagnostic IA
│   │   ├── recommandations/ # Recommandations IA
│   │   ├── marketplace/     # Marketplace
│   │   ├── formations/      # Formations
│   │   ├── messages/        # Messagerie
│   │   ├── analytics/       # Analytics & ROI
│   │   ├── notifications/   # Notifications
│   │   ├── profile/         # Profil utilisateur
│   │   └── settings/        # Paramètres
│   │
│   ├── injection_container.dart  # Dependency Injection
│   └── main.dart                 # Point d'entrée
│
├── android/                 # Configuration Android
├── ios/                     # Configuration iOS
├── assets/                  # Images, fonts
├── test/                    # Tests unitaires
└── pubspec.yaml             # Dépendances
```

## 🧪 Tests

```bash
# Tests unitaires
flutter test

# Tests avec couverture
flutter test --coverage

# Tests d'intégration
flutter test integration_test/
```

## 📱 Captures d'Écran

| Dashboard | Parcelles | Diagnostic |
|-----------|-----------|------------|
| Météo, capteurs, alertes | Liste avec stats | Caméra + IA |

| Marketplace | Formations | Messages |
|-------------|------------|----------|
| Acheter/Vendre | Vidéos + PDF | Chat temps réel |

## 🔧 Commandes Utiles

```bash
# Nettoyer le projet
flutter clean

# Reconstruire
flutter pub get
dart run build_runner build

# Analyser le code
flutter analyze

# Formater le code
dart format lib/

# Mettre à jour les dépendances
flutter pub upgrade

# Vérifier les dépendances obsolètes
flutter pub outdated

# Hot restart (pendant le run)
# Appuyer sur 'R' dans le terminal
```

## 🌍 Internationalisation

L'application supporte 3 langues :
- 🇫🇷 **Français** (défaut)
- 🇨🇮 **Baoulé**
- 🇨🇮 **Dioula**

La sélection de langue se fait dans Paramètres > Langue.

## 🔗 Connexion aux Services

| Service | URL (Dev) | URL (Prod) |
|---------|-----------|------------|
| Backend API | `http://10.0.2.2:3000` | `https://api.agrismart.ci` |
| AI Service | `http://10.0.2.2:5000` | `https://ai.agrismart.ci` |
| WebSocket | `ws://10.0.2.2:3000` | `wss://api.agrismart.ci` |

> **Note**: `10.0.2.2` est l'adresse de localhost pour l'émulateur Android

## 🐛 Dépannage

### L'émulateur ne démarre pas

```bash
# Vérifier les émulateurs
flutter emulators

# Créer un nouvel émulateur via Android Studio
# Tools > Device Manager > Create Device
```

### Erreur de connexion à l'API

1. Vérifier que le backend est lancé : `curl http://localhost:3000/api/health`
2. Vérifier l'URL dans `api_client.dart` (10.0.2.2 pour Android, localhost pour iOS)
3. Vérifier `android:usesCleartextTraffic="true"` pour HTTP en dev

### Erreur Isar

```bash
# Régénérer les fichiers Isar
dart run build_runner clean
dart run build_runner build --delete-conflicting-outputs
```

### Hot Reload ne fonctionne pas

Appuyer sur **R** (majuscule) pour Hot Restart au lieu de **r** (minuscule) pour Hot Reload.

## 📄 Licence

Ce projet est sous licence MIT. Voir le fichier [LICENSE](LICENSE) pour plus de détails.

## 📞 Support

- Email: mobile@agrismart.ci
- Documentation: https://docs.agrismart.ci/mobile
- Issues: https://github.com/agrismart/mobile/issues

---

Développé avec ❤️ et Flutter pour les agriculteurs ivoiriens 🇨🇮
