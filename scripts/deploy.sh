#!/bin/bash

# Deployment script to clear caches and ensure fresh deployment

echo "🚀 Starting deployment with cache clearing..."

# Clean local build cache
echo "🧹 Cleaning local caches..."
rm -rf .next
rm -rf node_modules/.cache
npm cache clean --force

# Install dependencies fresh
echo "📦 Installing dependencies..."
npm ci

# Build the application
echo "🔨 Building application..."
npm run build

# Deploy to Vercel
echo "🌐 Deploying to Vercel..."
npx vercel --prod

# Optionally purge CDN cache (if using CloudFlare or similar)
# echo "🔄 Purging CDN cache..."
# Add your CDN cache purging commands here

echo "✅ Deployment completed successfully!"
echo "💡 Tip: If users still see old content, ask them to hard refresh (Ctrl+F5 or Cmd+Shift+R)" 