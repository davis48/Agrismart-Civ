# Guide de Démarrage des Services AgriSmart CI

## ⚠️ Important : Ne PAS lancer les services individuellement

Les services (backend, frontend, AI, IoT) sont configurés pour **fonctionner uniquement dans Docker**. Ils dépendent les uns des autres et utilisent des noms d'hôtes Docker (comme `postgres`, `redis`) qui n'existent pas en dehors des conteneurs.

## ✅ Commandes à Utiliser

### Démarrer tous les services

```bash
cd /Users/amalamanemmanueljeandavid/Documents/Developement/agriculture
docker-compose up -d
```

### Voir l'état des services

```bash
docker-compose ps
```

### Voir les logs d'un service

```bash
# Backend
docker logs agrismart_api --tail 50

# Frontend
docker logs agrismart_frontend --tail 50

# AI Service
docker logs agrismart_ai --tail 50

# IoT Service
docker logs agrismart_iot --tail 50
```

### Redémarrer un service spécifique

```bash
# Exemple : redémarrer le backend
docker-compose restart api

# Redémarrer le frontend
docker-compose restart frontend
```

### Rebuild et redémarrer un service (après modification de code)

```bash
# Rebuild le frontend
docker-compose up -d --build frontend

# Rebuild le backend
docker-compose up -d --build api
```

### Stopper tous les services

```bash
docker-compose down
```

### Rebuild complet (en cas de gros problèmes)

```bash
docker-compose down
docker-compose up -d --build
```

## 🌐 URLs d'Accès

- **Frontend (Web App)**: <http://localhost:3001>
- **Backend API**: <http://localhost:3000/api/v1>
- **AI Service**: <http://localhost:5001>
- **IoT Service**: <http://localhost:4000>

## 📱 Configuration Mobile

L'application mobile doit pointer vers :

- **API_URL**: `http://localhost:3000/api/v1` (sur émulateur) ou `http://VOTRE_IP:3000/api/v1` (sur appareil physique)
- **AI_SERVICE_URL**: `http://localhost:5001` (sur émulateur) ou `http://VOTRE_IP:5001` (sur appareil physique)

## ❌ Ce qu'il NE FAUT PAS FAIRE

### ❌ Ne pas lancer `npm run dev` dans le dossier backend

```bash
# ❌ INCORRECT - Ne fonctionnera pas
cd backend
npm run dev  # ← Causera une erreur "postgres not found"
```

**Pourquoi ?** Le backend recherche PostgreSQL sur l'hôte `postgres`, qui n'existe que dans le réseau Docker.

### ❌ Ne pas lancer `npm run dev` dans le dossier frontend

```bash
# ❌ INCORRECT
cd frontend
npm run dev
```

**Pourquoi ?** Le frontend est configuré avec des variables d'environnement Docker qui ne sont pas disponibles en dehors du conteneur.

## ✅ État Actuel des Services

Après le redémarrage, tous les services sont opérationnels :

- ✅ **PostgreSQL** : Port 5432 (healthy)
- ✅ **Redis** : Port 6379 (healthy)
- ✅ **Backend API** : Port 3000 (healthy)
- ✅ **Frontend** : Port 3001 (running)
- ✅ **AI Service** : Port 5001 (healthy)
- ✅ **InfluxDB** : Port 8086 (healthy)  
- ✅ **Mosquitto (MQTT)** : Ports 1883, 9001 (running)
- ⚠️ **IoT Service** : Port 4000 (unhealthy - mais fonctionnel)

## 🔧 Dépannage

### Si un service ne démarre pas

1. **Vérifier les logs**:

   ```bash
   docker logs <nom_conteneur> --tail 50
   ```

2. **Redémarrer le service**:

   ```bash
   docker-compose restart <nom_service>
   ```

3. **Rebuild si nécessaire**:

   ```bash
   docker-compose up -d --build <nom_service>
   ```

### Si vous ne pouvez pas accéder à la page web

1. Vérifiez que le conteneur frontend est en cours d'exécution:

   ```bash
   docker-compose ps frontend
   ```

2. Tentez d'accéder directement à: <http://127.0.0.1:3001>

3. Vérifiez les logs du frontend:

   ```bash
   docker logs agrismart_frontend
   ```

### Si l'app mobile ne se connecte pas

1. **Sur émulateur**: Utilisez `http://localhost:3000/api/v1`

2. **Sur appareil physique**:
   - Trouvez votre IP: `ifconfig` (Mac) ou `ipconfig` (Windows)
   - Utilisez `http://VOTRE_IP:3000/api/v1`
   - Assurez-vous que l'appareil est sur le même réseau WiFi

## 📋 Checklist Rapide

- [ ] Tous les conteneurs sont en cours d'exécution : `docker-compose ps`
- [ ] Backend répond : <http://localhost:3000/api/v1/health>
- [ ] Frontend accessible : <http://localhost:3001>
- [ ] AI Service répond : <http://localhost:5001/health>
- [ ] Vous pouvez vous connecter avec le compte test : `0700000001` / `password123`
