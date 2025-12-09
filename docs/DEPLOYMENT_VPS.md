# 🚀 Guide de Déploiement AgriSmart CI sur VPS

## ✅ État de la Base de Données

### Vérification Effectuée

La base de données PostgreSQL est **complète et opérationnelle** :

- ✅ **26 tables** créées et fonctionnelles
- ✅ **9 types ENUM** définis
- ✅ Extensions activées (uuid-ossp, pgcrypto)
- ✅ **2 utilisateurs** présents (dont compte test)
- ✅ Relations et contraintes configurées
- ✅ Indexes optimisés

**Tables principales** :

- users, parcelles, plantations, cultures
- capteurs, stations, mesures, mesures_agregees
- alertes, recommandations
- maladies, detections_maladies
- marketplace_produits, marketplace_commandes
- formations, messages
- meteo, previsions_meteo, previsions_irrigation
- regions, cooperatives
- refresh_tokens, otp_codes, audit_logs

## 🎯 Prérequis pour le VPS

### Configuration Minimale Recommandée

**Pour Production Légère (1-100 utilisateurs)** :

- CPU : 2 vCPU
- RAM : 4 GB
- Stockage : 40 GB SSD
- OS : Ubuntu 22.04 LTS
- Bande passante : Illimitée

**Pour Production Standard (100-1000 utilisateurs)** :

- CPU : 4 vCPU
- RAM : 8 GB
- Stockage : 80 GB SSD
- OS : Ubuntu 22.04 LTS
- Bande passante : Illimitée

### Fournisseurs VPS Recommandés

| Fournisseur | Prix/mois | Config | Localisation |
|-------------|-----------|--------|--------------|
| **DigitalOcean** | $24 | 2vCPU, 4GB RAM | Amsterdam/Londres |
| **Hetzner** | €12 | 2vCPU, 4GB RAM | Europe |
| **Vultr** | $24 | 2vCPU, 4GB RAM | Paris |
| **Contabo** | €7 | 4vCPU, 8GB RAM | Europe |
| **OVH** | €12 | 2vCPU, 4GB RAM | Europe/Afrique |

> 💡 **Recommandation** : Choisir un VPS avec datacenter en Europe pour une latence minimale vers la Côte d'Ivoire.

## 🔧 Installation Étape par Étape

### 1. Configuration Initiale du VPS

```bash
# Se connecter au VPS
ssh root@VOTRE_IP_VPS

# Mettre à jour le système
apt update && apt upgrade -y

# Installer les outils de base
apt install -y curl git vim ufw fail2ban

# Configurer le firewall
ufw allow 22/tcp      # SSH
ufw allow 80/tcp      # HTTP
ufw allow 443/tcp     # HTTPS
ufw enable

# Créer un utilisateur non-root
adduser agrismart
usermod -aG sudo agrismart
usermod -aG docker agrismart
su - agrismart
```

### 2. Installation Docker & Docker Compose

```bash
# Installer Docker
curl -fsSL https://get.docker.com -o get-docker.sh
sudo sh get-docker.sh

# Installer Docker Compose
sudo curl -L "https://github.com/docker/compose/releases/download/v2.24.0/docker-compose-$(uname -s)-$(uname -m)" -o /usr/local/bin/docker-compose
sudo chmod +x /usr/local/bin/docker-compose

# Vérifier les installations
docker --version
docker-compose --version

# Démarrer Docker
sudo systemctl enable docker
sudo systemctl start docker
```

### 3. Cloner le Projet

```bash
# Créer le dossier d'application
mkdir -p /home/agrismart/app
cd /home/agrismart/app

# Cloner le repository
git clone https://github.com/votre-repo/agriculture.git
cd agriculture

# Ou transférer depuis votre machine locale
# Sur votre machine locale :
# rsync -avz -e ssh /Users/.../agriculture/ agrismart@VOTRE_IP:/home/agrismart/app/agriculture/
```

### 4. Configuration des Variables d'Environnement

```bash
cd /home/agrismart/app/agriculture

# Créer le fichier .env pour le backend
cat > backend/.env << 'EOF'
NODE_ENV=production
PORT=3000

# Base de données
DB_HOST=postgres
DB_PORT=5432
DB_NAME=agrismart_ci
DB_USER=agrismart
DB_PASSWORD=CHANGEZ_MOI_PRODUCTION_DB_PASSWORD_FORT

# Redis
REDIS_HOST=redis
REDIS_PORT=6379
REDIS_PASSWORD=CHANGEZ_MOI_REDIS_PASSWORD

# JWT
JWT_SECRET=CHANGEZ_MOI_JWT_SECRET_TRES_LONG_ET_SECURISE_32_CHARS
JWT_REFRESH_SECRET=CHANGEZ_MOI_REFRESH_SECRET_TRES_LONG_ET_SECURISE
JWT_EXPIRES_IN=7d
JWT_REFRESH_EXPIRES_IN=30d

# Twilio (SMS/WhatsApp)
TWILIO_ACCOUNT_SID=votre_twilio_sid
TWILIO_AUTH_TOKEN=votre_twilio_token
TWILIO_PHONE_NUMBER=+33XXXXXXXXX
TWILIO_WHATSAPP_NUMBER=whatsapp:+33XXXXXXXXX

# Email
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=votre_email@gmail.com
SMTP_PASSWORD=votre_app_password
EMAIL_FROM=AgriSmart CI <noreply@agrismart.ci>

# Météo
WEATHER_API_KEY=votre_openweather_api_key
WEATHER_API_URL=https://api.openweathermap.org/data/2.5

# URLs
FRONTEND_URL=https://agrismart.ci
API_URL=https://api.agrismart.ci

# Logging
LOG_LEVEL=info
LOG_FILE=/var/log/agrismart/app.log

# Rate Limiting
RATE_LIMIT_WINDOW_MS=900000
RATE_LIMIT_MAX_REQUESTS=100

# CORS
CORS_ORIGIN=https://agrismart.ci,https://www.agrismart.ci
EOF

# Créer le fichier .env pour le frontend
cat > frontend/.env.local << 'EOF'
NEXT_PUBLIC_API_URL=https://api.agrismart.ci/api/v1
NEXT_PUBLIC_SOCKET_URL=https://api.agrismart.ci
NEXT_PUBLIC_AI_SERVICE_URL=https://ai.agrismart.ci
EOF

# Créer le fichier .env pour l'AI service
cat > ai_service/.env << 'EOF'
PORT=5001
TF_CPP_MIN_LOG_LEVEL=2
DISEASE_MODEL_PATH=models/disease_detection_model.h5
IRRIGATION_MODEL_PATH=models/irrigation_model.h5
EOF

# Créer le fichier .env pour l'IoT service
cat > iot_service/.env << 'EOF'
PORT=4000
MQTT_BROKER_URL=mqtt://mosquitto:1883
INFLUXDB_URL=http://influxdb:8086
INFLUXDB_TOKEN=votre_influxdb_token
INFLUXDB_ORG=agrismart
INFLUXDB_BUCKET=sensor_data
EOF

# Sécuriser les fichiers .env
chmod 600 backend/.env frontend/.env.local ai_service/.env iot_service/.env
```

### 5. Configuration Docker Compose Production

Créer `docker-compose.prod.yml` :

```yaml
version: '3.8'

services:
  # PostgreSQL
  postgres:
    image: postgres:15-alpine
    container_name: agrismart_postgres_prod
    environment:
      POSTGRES_USER: agrismart
      POSTGRES_PASSWORD: ${DB_PASSWORD}
      POSTGRES_DB: agrismart_ci
    volumes:
      - postgres_data:/var/lib/postgresql/data
      - ./backend/src/database/schema.sql:/docker-entrypoint-initdb.d/schema.sql
    networks:
      - agrismart_network
    restart: unless-stopped
    healthcheck:
      test: ["CMD-SHELL", "pg_isready -U agrismart -d agrismart_ci"]
      interval: 10s
      timeout: 5s
      retries: 5

  # Redis
  redis:
    image: redis:7-alpine
    container_name: agrismart_redis_prod
    command: redis-server --requirepass ${REDIS_PASSWORD}
    volumes:
      - redis_data:/data
    networks:
      - agrismart_network
    restart: unless-stopped

  # InfluxDB
  influxdb:
    image: influxdb:2.7-alpine
    container_name: agrismart_influxdb_prod
    environment:
      DOCKER_INFLUXDB_INIT_MODE: setup
      DOCKER_INFLUXDB_INIT_USERNAME: admin
      DOCKER_INFLUXDB_INIT_PASSWORD: ${INFLUXDB_PASSWORD}
      DOCKER_INFLUXDB_INIT_ORG: agrismart
      DOCKER_INFLUXDB_INIT_BUCKET: sensor_data
      DOCKER_INFLUXDB_INIT_ADMIN_TOKEN: ${INFLUXDB_TOKEN}
    volumes:
      - influxdb_data:/var/lib/influxdb2
    networks:
      - agrismart_network
    restart: unless-stopped

  # Backend API
  api:
    build:
      context: ./backend
      dockerfile: Dockerfile
    container_name: agrismart_api_prod
    env_file:
      - backend/.env
    depends_on:
      postgres:
        condition: service_healthy
      redis:
        condition: service_started
    networks:
      - agrismart_network
    restart: unless-stopped
    labels:
      - "traefik.enable=true"
      - "traefik.http.routers.api.rule=Host(\`api.agrismart.ci\`)"
      - "traefik.http.routers.api.entrypoints=websecure"
      - "traefik.http.routers.api.tls.certresolver=letsencrypt"
      - "traefik.http.services.api.loadbalancer.server.port=3000"

  # Frontend
  frontend:
    build:
      context: ./frontend
      dockerfile: Dockerfile
    container_name: agrismart_frontend_prod
    env_file:
      - frontend/.env.local
    depends_on:
      - api
    networks:
      - agrismart_network
    restart: unless-stopped
    labels:
      - "traefik.enable=true"
      - "traefik.http.routers.frontend.rule=Host(\`agrismart.ci\`) || Host(\`www.agrismart.ci\`)"
      - "traefik.http.routers.frontend.entrypoints=websecure"
      - "traefik.http.routers.frontend.tls.certresolver=letsencrypt"
      - "traefik.http.services.frontend.loadbalancer.server.port=3000"

  # AI Service
  ai_service:
    build:
      context: ./ai_service
      dockerfile: Dockerfile
    container_name: agrismart_ai_prod
    env_file:
      - ai_service/.env
    networks:
      - agrismart_network
    restart: unless-stopped
    labels:
      - "traefik.enable=true"
      - "traefik.http.routers.ai.rule=Host(\`ai.agrismart.ci\`)"
      - "traefik.http.routers.ai.entrypoints=websecure"
      - "traefik.http.routers.ai.tls.certresolver=letsencrypt"
      - "traefik.http.services.ai.loadbalancer.server.port=5001"

  # IoT Service
  iot_service:
    build:
      context: ./iot_service
      dockerfile: Dockerfile
    container_name: agrismart_iot_prod
    env_file:
      - iot_service/.env
    depends_on:
      - influxdb
      - mosquitto
    networks:
      - agrismart_network
    restart: unless-stopped

  # Mosquitto MQTT
  mosquitto:
    image: eclipse-mosquitto:2
    container_name: agrismart_mosquitto_prod
    volumes:
      - ./iot_service/mosquitto/config:/mosquitto/config
      - mosquitto_data:/mosquitto/data
      - mosquitto_logs:/mosquitto/log
    ports:
      - "1883:1883"
      - "9001:9001"
    networks:
      - agrismart_network
    restart: unless-stopped

  # Traefik (Reverse Proxy)
  traefik:
    image: traefik:v2.10
    container_name: traefik
    command:
      - "--api.dashboard=true"
      - "--providers.docker=true"
      - "--providers.docker.exposedbydefault=false"
      - "--entrypoints.web.address=:80"
      - "--entrypoints.websecure.address=:443"
      - "--certificatesresolvers.letsencrypt.acme.httpchallenge=true"
      - "--certificatesresolvers.letsencrypt.acme.httpchallenge.entrypoint=web"
      - "--certificatesresolvers.letsencrypt.acme.email=admin@agrismart.ci"
      - "--certificatesresolvers.letsencrypt.acme.storage=/letsencrypt/acme.json"
    ports:
      - "80:80"
      - "443:443"
    volumes:
      - "/var/run/docker.sock:/var/run/docker.sock:ro"
      - "letsencrypt:/letsencrypt"
    networks:
      - agrismart_network
    restart: unless-stopped
    labels:
      - "traefik.enable=true"
      - "traefik.http.routers.dashboard.rule=Host(\`traefik.agrismart.ci\`)"
      - "traefik.http.routers.dashboard.service=api@internal"
      - "traefik.http.routers.dashboard.middlewares=auth"
      - "traefik.http.middlewares.auth.basicauth.users=admin:$$apr1$$..." # htpasswd

volumes:
  postgres_data:
  redis_data:
  influxdb_data:
  mosquitto_data:
  mosquitto_logs:
  letsencrypt:

networks:
  agrismart_network:
    driver: bridge
```

### 6. Configuration DNS

Configurez vos enregistrements DNS :

```
A     agrismart.ci            →  VOTRE_IP_VPS
A     www.agrismart.ci        →  VOTRE_IP_VPS
A     api.agrismart.ci        →  VOTRE_IP_VPS
A     ai.agrismart.ci         →  VOTRE_IP_VPS
A     traefik.agrismart.ci    →  VOTRE_IP_VPS
```

### 7. Lancement en Production

```bash
cd /home/agrismart/app/agriculture

# Build et démarrage
docker-compose -f docker-compose.prod.yml up -d --build

# Vérifier que tout fonctionne
docker-compose -f docker-compose.prod.yml ps

# Voir les logs
docker-compose -f docker-compose.prod.yml logs -f
```

### 8. Initialisation de la Base de Données

```bash
# Si la DB n'est pas initialisée (déjà fait normalement)
docker exec agrismart_postgres_prod psql -U agrismart -d agrismart_ci -f /docker-entrypoint-initdb.d/schema.sql

# Créer l'utilisateur admin
docker exec agrismart_api_prod node scripts/create_admin_user.js
```

## 🔒 Sécurité Production

### SSL/TLS avec Let's Encrypt

Traefik gère automatiquement les certificats SSL via Let's Encrypt. Assurez-vous que :

- Les DNS pointent vers votre VPS
- Les ports 80 et 443 sont ouverts

### Sauvegardes Automatiques

```bash
# Créer un script de backup
cat > /home/agrismart/backup.sh << 'EOF'
#!/bin/bash
BACKUP_DIR="/home/agrismart/backups"
DATE=$(date +%Y%m%d_%H%M%S)

# Backup PostgreSQL
docker exec agrismart_postgres_prod pg_dump -U agrismart agrismart_ci | gzip > $BACKUP_DIR/postgres_$DATE.sql.gz

# Backup volumes
docker run --rm -v agriculture_postgres_data:/data -v $BACKUP_DIR:/backup alpine tar czf /backup/postgres_volume_$DATE.tar.gz /data

# Garder seulement les 7 derniers jours
find $BACKUP_DIR -name "*.gz" -mtime +7 -delete

echo "Backup completed: $DATE"
EOF

chmod +x /home/agrismart/backup.sh

# Ajouter au cron (tous les jours à 2h du matin)
crontab -e
# Ajouter la ligne :
0 2 * * * /home/agrismart/backup.sh >> /var/log/agrismart_backup.log 2>&1
```

### Monitoring avec Prometheus + Grafana

```yaml
# Ajouter à docker-compose.prod.yml

  prometheus:
    image: prom/prometheus
    container_name: prometheus
    volumes:
      - ./monitoring/prometheus.yml:/etc/prometheus/prometheus.yml
      - prometheus_data:/prometheus
    networks:
      - agrismart_network
    restart: unless-stopped

  grafana:
    image: grafana/grafana
    container_name: grafana
    environment:
      - GF_SECURITY_ADMIN_PASSWORD=admin
    volumes:
      - grafana_data:/var/lib/grafana
    networks:
      - agrismart_network
    restart: unless-stopped
    labels:
      - "traefik.enable=true"
      - "traefik.http.routers.grafana.rule=Host(\`monitoring.agrismart.ci\`)"
      - "traefik.http.routers.grafana.entrypoints=websecure"
      - "traefik.http.routers.grafana.tls.certresolver=letsencrypt"
```

## 📊 Vérification Post-Déploiement

Testez tous les endpoints :

```bash
# API Health
curl https://api.agrismart.ci/api/v1/health

# Frontend

curl https://agrismart.ci

# AI Service
curl https://ai.agrismart.ci/health

# Login
curl -X POST https://api.agrismart.ci/api/v1/auth/login \
  -H "Content-Type: application/json" \
  -d '{"identifier":"0700000001","password":"password123"}'
```

## 🔄 Mises à Jour

```bash
cd /home/agrismart/app/agriculture

# Pull les dernières modifications
git pull origin main

# Rebuild et redéployer
docker-compose -f docker-compose.prod.yml up -d --build

# Ou redéployer un service spécifique
docker-compose -f docker-compose.prod.yml up -d --build api
```

## 💰 Estimation des Coûts Mensuels

| Poste | Coût Mensuel |
|-------|--------------|
| VPS (4GB RAM, 2vCPU) | €12-24 |
| Nom de domaine (.ci) | €30-50/an (€3-4/mois) |
| Twilio SMS (500 SMS/mois) | €8-15 |
| Email (SMTP gratuit Gmail) | €0 |
| Stockage backups (optionnel) | €5 |
| **TOTAL** | **€28-48/mois** |

## ✅ Checklist de Déploiement

- [ ] VPS acheté et configuré
- [ ] Docker et Docker Compose installés
- [ ] Nom de domaine configuré avec DNS
- [ ] Variables d'environnement configurées
- [ ] Secrets changés (DB_PASSWORD, JWT_SECRET, etc.)
- [ ] docker-compose.prod.yml créé
- [ ] Services démarrés
- [ ] SSL activé (Let's Encrypt)
- [ ] Tests des endpoints réussis
- [ ] Backups automatiques configurés
- [ ] Monitoring configuré (optionnel)
- [ ] Documentation d'exploitation créée

## 📞 Support

Pour toute question sur le déploiement :

- 📧 Email : <devops@agrismart.ci>
- 📚 Docs : <https://docs.agrismart.ci/deployment>
