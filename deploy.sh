#!/usr/bin/env bash
# ==============================================================================
# MediKiosk Automated Production Deployment Script (Linux / macOS)
# ==============================================================================
set -e

echo "========================================================"
echo "🏥 MediKiosk Production Deployment Script"
echo "========================================================"

# 1. Environment check
if [ ! -f ".env" ] && [ ! -f "backend/.env" ]; then
  echo "⚠️  No .env file found! Copying .env.example to .env..."
  cp .env.example .env
  echo "👉 Please edit .env with your GEMINI_API_KEY and DATABASE_URL before proceeding."
fi

# 2. Install dependencies
echo "📦 Installing root & workspace dependencies..."
npm install

echo "📦 Installing backend dependencies..."
cd backend
npm install
cd ..

echo "📦 Installing frontend dependencies..."
cd frontend
npm install
cd ..

# 3. Build Frontend
echo "⚛️  Building React Frontend (Vite)..."
cd frontend
npm run build
cd ..

# 4. Generate Prisma & Build Backend
echo "🛠️  Compiling TypeScript Backend & Generating Prisma Client..."
cd backend
npx prisma generate
npm run build
npx prisma db push --accept-data-loss
cd ..

echo "========================================================"
echo "✅ MediKiosk Build & Deployment Preparation Complete!"
echo "To start the production server, run:"
echo "   cd backend && npm start"
echo "Or using Docker Compose:"
echo "   docker-compose up -d --build"
echo "========================================================"
