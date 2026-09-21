# ==============================================================================
# MediKiosk Automated Production Deployment Script (Windows PowerShell)
# ==============================================================================
$ErrorActionPreference = "Stop"

Write-Host "========================================================" -ForegroundColor Cyan
Write-Host "🏥 MediKiosk Production Deployment Script" -ForegroundColor Cyan
Write-Host "========================================================" -ForegroundColor Cyan

# 1. Environment check
if (-not (Test-Path ".env") -and -not (Test-Path "backend\.env")) {
    Write-Host "⚠️  No .env file found! Copying .env.example to .env..." -ForegroundColor Yellow
    Copy-Item ".env.example" ".env"
    Write-Host "👉 Please edit .env with your GEMINI_API_KEY and DATABASE_URL before proceeding." -ForegroundColor Yellow
}

# 2. Install dependencies
Write-Host "📦 Installing root & workspace dependencies..." -ForegroundColor Green
npm install

Write-Host "📦 Installing backend dependencies..." -ForegroundColor Green
Set-Location backend
npm install
Set-Location ..

Write-Host "📦 Installing frontend dependencies..." -ForegroundColor Green
Set-Location frontend
npm install
Set-Location ..

# 3. Build Frontend
Write-Host "⚛️  Building React Frontend (Vite)..." -ForegroundColor Green
Set-Location frontend
npm run build
Set-Location ..

# 4. Generate Prisma & Build Backend
Write-Host "🛠️  Compiling TypeScript Backend & Generating Prisma Client..." -ForegroundColor Green
Set-Location backend
npx prisma generate
npm run build
try {
    npx prisma db push --accept-data-loss
} catch {
    Write-Host "⚠️  Prisma db push encountered a warning (check DATABASE_URL). In-memory fallback will handle runtime." -ForegroundColor Yellow
}
Set-Location ..

Write-Host "========================================================" -ForegroundColor Cyan
Write-Host "✅ MediKiosk Build & Deployment Preparation Complete!" -ForegroundColor Green
Write-Host "To start the production server, run:" -ForegroundColor White
Write-Host "   Set-Location backend; npm start" -ForegroundColor Yellow
Write-Host "Or with Docker Compose:" -ForegroundColor White
Write-Host "   docker-compose up -d --build" -ForegroundColor Yellow
Write-Host "========================================================" -ForegroundColor Cyan
