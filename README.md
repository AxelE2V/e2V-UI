# E2V Outreach

Outil de séquençage outreach commercial avec synchronisation HubSpot bidirectionnelle.

## Fonctionnalités

- **Séquences multi-étapes** : Email + Appel par persona/industrie
- **Templates email** : Variables dynamiques ({{firstName}}, {{company}}, etc.)
- **Sync HubSpot bidirectionnel** : Import contacts, push statuts, log activités
- **Dashboard KPIs** : Emails envoyés, taux ouverture, réponses
- **Actions du Jour** : Exécution manuelle des steps quotidiens

## Stack Technique

### Backend
- **FastAPI** + **PostgreSQL**
- Services : HubSpot API, SendGrid
- Pas de Redis/Celery (envoi manuel des emails)

### Frontend
- **Next.js 14** (App Router)
- **Tailwind CSS** + **shadcn/ui**
- TypeScript

## Installation

### Prérequis
- Python 3.11+
- Node.js 18+
- PostgreSQL 15+

### Backend

```bash
cd backend

# Créer un environnement virtuel
python -m venv venv
source venv/bin/activate  # Linux/Mac
# ou: venv\Scripts\activate  # Windows

# Installer les dépendances
pip install -r requirements.txt

# Configurer les variables d'environnement
cp .env.example .env
# Éditer .env avec vos credentials

# Lancer le serveur
uvicorn main:app --reload --port 8000
```

### Frontend

```bash
cd frontend

# Installer les dépendances
npm install

# Lancer le serveur de développement
npm run dev
```

L'application sera disponible sur http://localhost:3000

## Configuration

### Variables d'environnement (backend/.env)

```env
# Database
DATABASE_URL=postgresql://user:password@localhost:5432/e2v_outreach

# HubSpot (Private App)
HUBSPOT_ACCESS_TOKEN=pat-xxx
HUBSPOT_PORTAL_ID=your-portal-id

# SendGrid
SENDGRID_API_KEY=SG.xxx
SENDGRID_FROM_EMAIL=axel@eco2veritas.com
SENDGRID_FROM_NAME=Axel - eco₂Veritas
```

### Configuration HubSpot

1. Créer une Private App dans HubSpot
2. Scopes requis : `crm.objects.contacts.read`, `crm.objects.contacts.write`, `sales-email-read`
3. Copier l'Access Token dans `.env`

## API Endpoints

### Dashboard
- `GET /api/dashboard/stats` - KPIs
- `GET /api/dashboard/today` - Actions du jour

### Contacts
- `GET /api/contacts` - Liste avec filtres
- `POST /api/contacts` - Créer
- `PUT /api/contacts/{id}` - Modifier

### Séquences
- `GET /api/sequences` - Liste
- `POST /api/sequences` - Créer avec steps
- `POST /api/sequences/{id}/enroll` - Inscrire un contact

### Templates
- `GET /api/templates` - Liste
- `POST /api/templates/preview` - Prévisualiser avec variables

### HubSpot Sync
- `POST /api/hubspot/sync/contacts/import` - Importer contacts
- `POST /api/hubspot/sync/contacts/{id}/push` - Pousser vers HubSpot

## Structure du Projet

```
e2v-outreach/
├── backend/
│   ├── api/routes/          # API endpoints
│   ├── core/                # Config, database
│   ├── models/              # SQLAlchemy models
│   ├── schemas/             # Pydantic schemas
│   ├── services/            # HubSpot, SendGrid
│   ├── main.py              # FastAPI app
│   └── requirements.txt
├── frontend/
│   ├── app/                 # Next.js pages
│   ├── components/          # React components
│   ├── lib/                 # Utils, API client
│   ├── types/               # TypeScript types
│   └── package.json
└── README.md
```

## Développement

### Créer une migration (Alembic)

```bash
cd backend
alembic revision --autogenerate -m "description"
alembic upgrade head
```

### Lancer les tests

```bash
cd backend
pytest
```

## Roadmap

- [ ] Intégration Sales Navigator (Janvier 2026)
- [ ] Tracking email opens/clicks webhook
- [ ] A/B testing templates
- [ ] Reporting avancé

---

Built for eco₂Veritas by Axel Berard
