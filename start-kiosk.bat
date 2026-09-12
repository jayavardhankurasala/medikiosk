@echo off
title MediKiosk All-in-One Launcher
echo ====================================================
echo        MediKiosk AI Clinical Intake Platform
echo ====================================================
echo.

:: Check Node.js
where node >nul 2>nul
if %errorlevel% neq 0 (
    echo [ERROR] Node.js is not installed or not in PATH!
    echo Please install Node.js (v20+) from https://nodejs.org
    pause
    exit /b 1
)

:: 1. Backend Setup
echo [1/3] Checking Backend Dependencies...
cd /d "%~dp0backend"
if not exist "node_modules\" (
    echo Installing backend packages...
    call npm install
)
if not exist ".env" (
    echo [NOTICE] backend\.env not found! Creating from .env.example...
    copy .env.example .env >nul
)
call npx prisma generate

:: 2. Frontend Build
echo.
echo [2/3] Building Unified Frontend...
cd /d "%~dp0frontend"
if not exist "node_modules\" (
    echo Installing frontend packages...
    call npm install
)
call npm run build

:: 3. Launch Unified Server on Port 5000
echo.
echo [3/3] Starting Unified MediKiosk Server on Port 5000...
echo.
echo ====================================================
echo   Kiosk is accessible at:
echo     Local:    http://localhost:5000
echo ====================================================
echo.
cd /d "%~dp0backend"

:: Open default browser
start http://localhost:5000

:: Run backend
node dist/index.js
pause
