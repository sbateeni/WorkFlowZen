@echo off
REM WorkFlowZen Deployment Script for Windows

echo 🚀 Starting WorkFlowZen deployment...

REM Check if we're in the right directory
if not exist "package.json" (
    echo ❌ Error: package.json not found. Please run this script from the project root.
    exit /b 1
)

REM Install dependencies
echo 📦 Installing dependencies...
npm install
if %errorlevel% neq 0 (
    echo ❌ Failed to install dependencies.
    exit /b 1
)

REM Type check
echo 🔍 Running type check...
npm run type-check
if %errorlevel% neq 0 (
    echo ❌ Type check failed. Please fix TypeScript errors before deploying.
    exit /b 1
)

REM Lint check
echo 🧹 Running linter...
npm run lint
if %errorlevel% neq 0 (
    echo ⚠️ Linting issues found. Running auto-fix...
    npm run lint:fix
)

REM Build the project
echo 🏗️ Building project...
npm run build
if %errorlevel% neq 0 (
    echo ❌ Build failed. Please fix build errors before deploying.
    exit /b 1
)

REM Deploy to Vercel
echo 🌐 Deploying to Vercel...
if "%1"=="preview" (
    echo 📋 Deploying preview version...
    npm run deploy:preview
) else (
    echo 🎯 Deploying to production...
    npm run deploy
)

if %errorlevel% neq 0 (
    echo ❌ Deployment failed.
    exit /b 1
)

echo ✅ Deployment completed successfully!
echo 🎉 WorkFlowZen is now live!