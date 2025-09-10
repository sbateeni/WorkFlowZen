#!/bin/bash

# WorkFlowZen Deployment Script
echo "🚀 Starting WorkFlowZen deployment..."

# Check if we're in the right directory
if [ ! -f "package.json" ]; then
    echo "❌ Error: package.json not found. Please run this script from the project root."
    exit 1
fi

# Install dependencies
echo "📦 Installing dependencies..."
npm install

# Type check
echo "🔍 Running type check..."
npm run type-check
if [ $? -ne 0 ]; then
    echo "❌ Type check failed. Please fix TypeScript errors before deploying."
    exit 1
fi

# Lint check
echo "🧹 Running linter..."
npm run lint
if [ $? -ne 0 ]; then
    echo "⚠️  Linting issues found. Running auto-fix..."
    npm run lint:fix
fi

# Build the project
echo "🏗️  Building project..."
npm run build
if [ $? -ne 0 ]; then
    echo "❌ Build failed. Please fix build errors before deploying."
    exit 1
fi

# Deploy to Vercel
echo "🌐 Deploying to Vercel..."
if [ "$1" = "preview" ]; then
    echo "📋 Deploying preview version..."
    npm run deploy:preview
else
    echo "🎯 Deploying to production..."
    npm run deploy
fi

echo "✅ Deployment completed successfully!"
echo "🎉 WorkFlowZen is now live!"