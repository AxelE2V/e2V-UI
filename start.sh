#!/bin/bash

# E2V Outreach - Start Script
# Lance le backend et frontend en parallèle

set -e

echo "🚀 Démarrage E2V Outreach..."

# Start PostgreSQL if not running
brew services start postgresql@15 2>/dev/null || true

# Start Backend
echo "Starting Backend on http://localhost:8000..."
cd backend
source venv/bin/activate
uvicorn main:app --reload --port 8000 &
BACKEND_PID=$!
cd ..

# Wait for backend to be ready
sleep 3

# Start Frontend
echo "Starting Frontend on http://localhost:3000..."
cd frontend
npm run dev &
FRONTEND_PID=$!
cd ..

echo ""
echo "✅ E2V Outreach is running!"
echo ""
echo "   Frontend: http://localhost:3000"
echo "   Backend:  http://localhost:8000"
echo "   API Docs: http://localhost:8000/docs"
echo ""
echo "Press Ctrl+C to stop both servers"

# Handle Ctrl+C
trap "echo 'Stopping...'; kill $BACKEND_PID $FRONTEND_PID 2>/dev/null; exit" INT

# Wait for processes
wait
