# Documentation Frontend - AgriSmart CI

## 📋 Table des matières

1. [Vue d'ensemble](#vue-densemble)
2. [Technologies utilisées](#technologies-utilisées)
3. [Architecture du projet](#architecture-du-projet)
4. [Installation et démarrage](#installation-et-démarrage)
5. [Structure des dossiers](#structure-des-dossiers)
6. [Composants UI](#composants-ui)
7. [Gestion d'état](#gestion-détat)
8. [API et communication backend](#api-et-communication-backend)
9. [Internationalisation](#internationalisation)
10. [Pages et fonctionnalités](#pages-et-fonctionnalités)
11. [Styles et thème](#styles-et-thème)
12. [Bonnes pratiques](#bonnes-pratiques)

---

## Vue d'ensemble

AgriSmart CI est une plateforme agricole intelligente pour la Côte d'Ivoire. Le frontend est construit avec Next.js 14 et utilise l'App Router pour une navigation moderne et performante.

### Fonctionnalités principales

- 🌱 Gestion des parcelles agricoles
- 📊 Tableau de bord avec statistiques en temps réel
- 🔔 Système d'alertes intelligent
- 🤖 Recommandations IA personnalisées
- 📈 Visualisation des mesures des capteurs
- 🛒 Marketplace pour les produits agricoles
- 📚 Formations et modules d'apprentissage
- 💬 Messagerie intégrée
- 🔬 Diagnostic IA des maladies des plantes

---

## Technologies utilisées

| Technologie | Version | Utilisation |
|-------------|---------|-------------|
| Next.js | 14.2.33 | Framework React avec App Router |
| React | 18 | Bibliothèque UI |
| TypeScript | 5 | Typage statique |
| TailwindCSS | 3.4.1 | Styles utilitaires |
| Radix UI | 1.x | Composants primitifs accessibles |
| Zustand | 5.0 | Gestion d'état |
| React Hook Form | 7.x | Gestion des formulaires |
| Zod | 3.x | Validation des schémas |
| Recharts | 2.x | Graphiques et visualisations |
| i18next | 24.x | Internationalisation |
| Axios | 1.x | Client HTTP |
| Socket.IO Client | 4.x | Communication temps réel |
| react-hot-toast | 2.x | Notifications |

---

## Architecture du projet

```
frontend/
├── src/
│   ├── app/                    # App Router (pages et layouts)
│   │   ├── (auth)/            # Routes d'authentification (layout public)
│   │   │   ├── login/         # Page de connexion
│   │   │   └── register/      # Page d'inscription
│   │   ├── (dashboard)/       # Routes protégées (layout avec sidebar)
│   │   │   ├── dashboard/     # Tableau de bord
│   │   │   ├── parcelles/     # Gestion des parcelles
│   │   │   ├── capteurs/      # Gestion des capteurs
│   │   │   ├── mesures/       # Visualisation des mesures
│   │   │   ├── alertes/       # Système d'alertes
│   │   │   ├── recommandations/ # Recommandations IA
│   │   │   ├── diagnostic/    # Diagnostic IA des maladies
│   │   │   ├── marketplace/   # Place de marché
│   │   │   ├── formations/    # Modules de formation
│   │   │   ├── messages/      # Messagerie
│   │   │   └── profil/        # Profil utilisateur
│   │   ├── layout.tsx         # Layout racine
│   │   ├── page.tsx           # Page d'accueil (redirection)
│   │   └── globals.css        # Styles globaux
│   ├── components/
│   │   ├── layout/            # Composants de mise en page
│   │   │   ├── Sidebar.tsx    # Barre latérale
│   │   │   ├── Header.tsx     # En-tête
│   │   │   └── BottomNav.tsx  # Navigation mobile
│   │   └── ui/                # Composants UI réutilisables
│   └── lib/
│       ├── api.ts             # Configuration Axios et endpoints
│       ├── store.ts           # Stores Zustand
│       ├── i18n.ts            # Configuration i18next
│       └── utils.ts           # Fonctions utilitaires
├── public/                    # Assets statiques
├── tailwind.config.ts         # Configuration Tailwind
└── next.config.mjs            # Configuration Next.js
```

---

## Installation et démarrage

### Prérequis

- Node.js 20+
- npm ou yarn

### Installation

```bash
# Cloner le projet
cd /Volumes/dev_partiti/Developpement/agriculture/frontend

# Installer les dépendances
npm install

# Créer le fichier .env.local
cp .env.example .env.local
```

### Variables d'environnement

```env
# .env.local
NEXT_PUBLIC_API_URL=http://localhost:3000/api/v1
NEXT_PUBLIC_SOCKET_URL=http://localhost:3000
```

### Démarrage

```bash
# Mode développement
npm run dev

# Build production
npm run build

# Démarrer en production
npm start
```

Le frontend sera accessible sur `http://localhost:3001` (ou 3000 si disponible).

---

## Structure des dossiers

### `/src/app`

Utilise le App Router de Next.js 14:

- **Route Groups**: `(auth)` et `(dashboard)` pour séparer les layouts
- **Layouts imbriqués**: Chaque groupe a son propre layout
- **Pages dynamiques**: `/parcelles/[id]` pour les détails

### `/src/components/ui`

Composants UI basés sur Radix UI:

| Composant | Description |
|-----------|-------------|
| Button | Boutons avec variantes |
| Card | Cartes conteneurs |
| Input | Champs de saisie |
| Select | Listes déroulantes |
| Dialog | Modales |
| Tabs | Onglets |
| Badge | Badges/étiquettes |
| Avatar | Avatars utilisateur |
| Progress | Barres de progression |
| Switch | Interrupteurs |
| Toast | Notifications (via react-hot-toast) |
| Spinner | Indicateur de chargement |

### `/src/lib`

Bibliothèques et configurations:

- **api.ts**: Client Axios avec intercepteurs d'authentification
- **store.ts**: Stores Zustand pour la gestion d'état
- **i18n.ts**: Configuration multilingue (Français, Baoulé, Dioula)
- **utils.ts**: Fonctions utilitaires (cn, formatDate, etc.)

---

## Composants UI

### Button

```tsx
import { Button } from '@/components/ui/button'

<Button variant="default">Défaut</Button>
<Button variant="outline">Contour</Button>
<Button variant="ghost">Fantôme</Button>
<Button variant="destructive">Destructif</Button>
<Button size="sm">Petit</Button>
<Button size="lg">Grand</Button>
<Button disabled>Désactivé</Button>
```

### Card

```tsx
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from '@/components/ui/card'

<Card>
  <CardHeader>
    <CardTitle>Titre</CardTitle>
    <CardDescription>Description</CardDescription>
  </CardHeader>
  <CardContent>
    Contenu
  </CardContent>
  <CardFooter>
    Footer
  </CardFooter>
</Card>
```

### Dialog

```tsx
import { Dialog, DialogTrigger, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from '@/components/ui/dialog'

<Dialog open={open} onOpenChange={setOpen}>
  <DialogTrigger asChild>
    <Button>Ouvrir</Button>
  </DialogTrigger>
  <DialogContent>
    <DialogHeader>
      <DialogTitle>Titre</DialogTitle>
      <DialogDescription>Description</DialogDescription>
    </DialogHeader>
    {/* Contenu */}
    <DialogFooter>
      <Button onClick={() => setOpen(false)}>Fermer</Button>
    </DialogFooter>
  </DialogContent>
</Dialog>
```

---

## Gestion d'état

### Zustand Stores

#### useAuthStore

```tsx
import { useAuthStore } from '@/lib/store'

const { user, token, login, logout, isAuthenticated } = useAuthStore()
```

#### useParcellesStore

```tsx
import { useParcellesStore } from '@/lib/store'

const { parcelles, selectedParcelle, setParcelles, selectParcelle } = useParcellesStore()
```

#### useAlertesStore

```tsx
import { useAlertesStore } from '@/lib/store'

const { alertes, unreadCount, addAlerte, markAsRead } = useAlertesStore()
```

#### useUIStore

```tsx
import { useUIStore } from '@/lib/store'

const { sidebarOpen, toggleSidebar, theme, setTheme } = useUIStore()
```

### Persistance

Les stores utilisent le middleware `persist` de Zustand pour persister les données dans localStorage:

```tsx
const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      // ...
    }),
    { name: 'auth-storage' }
  )
)
```

---

## API et communication backend

### Configuration Axios

```typescript
// src/lib/api.ts
const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000/api/v1'

const api = axios.create({
  baseURL: API_URL,
  timeout: 30000,
  headers: {
    'Content-Type': 'application/json',
  },
})

// Intercepteur pour le token
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token')
  if (token) {
    config.headers.Authorization = `Bearer ${token}`
  }
  return config
})
```

### Endpoints disponibles

#### Authentification

```typescript
authApi.register(data)  // Inscription
authApi.login(data)     // Connexion
authApi.verifyOtp(data) // Vérification OTP
authApi.logout()        // Déconnexion
```

#### Parcelles

```typescript
parcellesApi.getAll(params)     // Liste des parcelles
parcellesApi.getById(id)        // Détails parcelle
parcellesApi.create(data)       // Créer parcelle
parcellesApi.update(id, data)   // Modifier parcelle
parcellesApi.delete(id)         // Supprimer parcelle
```

#### Capteurs et Mesures

```typescript
capteursApi.getAll(params)      // Liste des capteurs
mesuresApi.getLatest(params)    // Dernières mesures
mesuresApi.getAll(params)       // Historique mesures
```

#### Alertes

```typescript
alertesApi.getAll(params)       // Liste des alertes
alertesApi.markAsRead(id)       // Marquer comme lue
alertesApi.getUnreadCount()     // Nombre non lues
```

---

## Internationalisation

### Configuration

```typescript
// src/lib/i18n.ts
import i18n from 'i18next'
import { initReactI18next } from 'react-i18next'

const resources = {
  fr: { translation: { /* traductions françaises */ } },
  baoule: { translation: { /* traductions baoulé */ } },
  dioula: { translation: { /* traductions dioula */ } },
}
```

### Utilisation

```tsx
import { useTranslation } from 'react-i18next'

function Component() {
  const { t, i18n } = useTranslation()
  
  return (
    <div>
      <h1>{t('dashboard.title')}</h1>
      <button onClick={() => i18n.changeLanguage('baoule')}>
        Changer en Baoulé
      </button>
    </div>
  )
}
```

### Langues supportées

| Code | Langue |
|------|--------|
| fr | Français |
| baoule | Baoulé |
| dioula | Dioula |

---

## Pages et fonctionnalités

### Dashboard (`/dashboard`)

- Statistiques globales (parcelles, alertes, récoltes)
- Graphiques de performance (Recharts)
- Alertes récentes
- Météo du jour
- Activités récentes

### Parcelles (`/parcelles`)

- Liste des parcelles avec filtres
- Création/modification de parcelles
- Carte de localisation (GPS)
- Détails parcelle avec capteurs et mesures

### Capteurs (`/capteurs`)

- Liste des capteurs par type et statut
- Ajout de nouveaux capteurs
- Statut en temps réel (actif, maintenance, inactif)

### Mesures (`/mesures`)

- Graphiques température, humidité, pH, luminosité
- Sélection de période (24h, 7j, 30j)
- Export des données

### Alertes (`/alertes`)

- Alertes par niveau (info, warning, danger)
- Marquage comme lue/traitée
- Historique des alertes

### Recommandations (`/recommandations`)

- Recommandations IA par catégorie
- Actions suggérées avec priorité
- Suivi de l'application des recommandations

### Diagnostic (`/diagnostic`)

- Upload d'images de plantes
- Analyse IA pour détection de maladies
- Historique des diagnostics

### Marketplace (`/marketplace`)

- Catalogue de produits
- Système de commande
- Filtres par catégorie

### Formations (`/formations`)

- Modules de formation
- Suivi de progression
- Certificats

### Messages (`/messages`)

- Conversations avec conseillers
- Messagerie en temps réel

### Profil (`/profil`)

- Informations personnelles
- Paramètres de notifications
- Changement de mot de passe
- Gestion du compte

---

## Styles et thème

### Variables CSS

```css
:root {
  --background: 0 0% 100%;
  --foreground: 222.2 84% 4.9%;
  --primary: 142.1 76.2% 36.3%;     /* Vert agricole */
  --secondary: 210 40% 96.1%;
  --destructive: 0 84.2% 60.2%;
  --muted: 210 40% 96.1%;
  --accent: 210 40% 96.1%;
  --border: 214.3 31.8% 91.4%;
  --radius: 0.5rem;
}
```

### Classes utilitaires

```tsx
import { cn } from '@/lib/utils'

<div className={cn(
  'p-4 rounded-lg',
  isActive && 'bg-primary text-white',
  disabled && 'opacity-50 cursor-not-allowed'
)}>
  Contenu
</div>
```

### Mode sombre

Le thème sombre est configuré via la classe `dark` sur le body:

```tsx
const { theme, setTheme } = useUIStore()

// Toggle
setTheme(theme === 'dark' ? 'light' : 'dark')
```

---

## Bonnes pratiques

### 1. Composants

- Utiliser les composants UI réutilisables de `/components/ui`
- Préférer les composants fonctionnels avec hooks
- Documenter les props avec TypeScript

### 2. État

- Utiliser Zustand pour l'état global
- Utiliser `useState` pour l'état local
- Utiliser React Query pour le cache des requêtes API

### 3. Formulaires

```tsx
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'

const schema = z.object({
  nom: z.string().min(2),
  email: z.string().email(),
})

const { register, handleSubmit, formState: { errors } } = useForm({
  resolver: zodResolver(schema),
})
```

### 4. Gestion des erreurs

```tsx
import toast from 'react-hot-toast'

try {
  await api.post('/endpoint', data)
  toast.success('Opération réussie')
} catch (error) {
  toast.error('Une erreur est survenue')
}
```

### 5. Performances

- Utiliser `React.memo` pour les composants coûteux
- Utiliser `useMemo` et `useCallback` judicieusement
- Lazy loading des pages avec `next/dynamic`

### 6. Accessibilité

- Labels sur tous les inputs
- Attributs ARIA appropriés
- Navigation au clavier
- Contraste de couleurs suffisant

---

## Scripts disponibles

```bash
# Développement
npm run dev

# Build production
npm run build

# Démarrer en production
npm start

# Linting
npm run lint

# Type checking
npx tsc --noEmit
```

---

## Déploiement

### Vercel (recommandé)

```bash
# Installation CLI Vercel
npm i -g vercel

# Déploiement
vercel
```

### Docker

```dockerfile
FROM node:20-alpine
WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY . .
RUN npm run build
EXPOSE 3000
CMD ["npm", "start"]
```

---

## Support

- **Documentation API**: Voir `backend/docs/API_DOCUMENTATION.md`
- **Documentation Base de données**: Voir `backend/docs/BASE_DE_DONNEES.md`
- **FAQ et dépannage**: Voir `backend/docs/FAQ_DEPANNAGE.md`

---

*Documentation mise à jour le 04/12/2025*
