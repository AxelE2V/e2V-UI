#!/bin/bash

# E2V Outreach - Setup Script for macOS
# Usage: ./setup.sh

set -e

echo "🚀 E2V Outreach - Installation"
echo "================================"

# Colors
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m'

# Check prerequisites
echo -e "\n${YELLOW}1. Vérification des prérequis...${NC}"

if ! command -v brew &> /dev/null; then
    echo "❌ Homebrew non installé. Installation..."
    /bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)"
fi
echo "✅ Homebrew OK"

if ! command -v python3 &> /dev/null; then
    echo "❌ Python3 non installé. Installation..."
    brew install python@3.11
fi
echo "✅ Python3 OK"

if ! command -v node &> /dev/null; then
    echo "❌ Node.js non installé. Installation..."
    brew install node@18
fi
echo "✅ Node.js OK"

# PostgreSQL
echo -e "\n${YELLOW}2. Configuration PostgreSQL...${NC}"
if ! command -v psql &> /dev/null; then
    echo "Installation de PostgreSQL..."
    brew install postgresql@15
fi
brew services start postgresql@15 2>/dev/null || true
sleep 2

# Create database if not exists
if ! psql -lqt | cut -d \| -f 1 | grep -qw e2v_outreach; then
    echo "Création de la base de données..."
    createdb e2v_outreach
    echo "✅ Base de données créée"
else
    echo "✅ Base de données existe déjà"
fi

# Backend setup
echo -e "\n${YELLOW}3. Configuration Backend...${NC}"
cd backend

if [ ! -d "venv" ]; then
    echo "Création de l'environnement virtuel..."
    python3 -m venv venv
fi

source venv/bin/activate
echo "Installation des dépendances Python..."
pip install -q -r requirements.txt
pip install -q email-validator

# Create .env if not exists
if [ ! -f ".env" ]; then
    echo "Création du fichier .env..."
    cat > .env << 'EOF'
# Database
DATABASE_URL=postgresql://localhost:5432/e2v_outreach

# HubSpot (à configurer)
HUBSPOT_ACCESS_TOKEN=
HUBSPOT_PORTAL_ID=

# SendGrid (à configurer)
SENDGRID_API_KEY=
SENDGRID_FROM_EMAIL=axel@eco2veritas.com
SENDGRID_FROM_NAME=Axel - eco2Veritas

# Security
SECRET_KEY=dev-secret-key-change-in-production
EOF
    echo "✅ Fichier .env créé - Configure tes clés API dedans"
else
    echo "✅ Fichier .env existe déjà"
fi

cd ..

# Frontend setup
echo -e "\n${YELLOW}4. Configuration Frontend...${NC}"
cd frontend
echo "Installation des dépendances Node..."
npm install --silent
cd ..

# Done
echo -e "\n${GREEN}================================${NC}"
echo -e "${GREEN}✅ Installation terminée !${NC}"
echo -e "${GREEN}================================${NC}"
echo ""
echo "Pour lancer l'application :"
echo ""
echo "  Terminal 1 (Backend):"
echo "    cd backend"
echo "    source venv/bin/activate"
echo "    uvicorn main:app --reload"
echo ""
echo "  Terminal 2 (Frontend):"
echo "    cd frontend"
echo "    npm run dev"
echo ""
echo "Puis ouvre http://localhost:3000"
echo ""
echo -e "${YELLOW}N'oublie pas de configurer backend/.env avec tes clés HubSpot/SendGrid${NC}"
