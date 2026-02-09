# Quick Start Script for Windows PowerShell

Write-Host "🚀 Setting up ArtEcommerce Database..." -ForegroundColor Cyan
Write-Host ""

# Step 1: Generate Prisma Client
Write-Host "📦 Step 1: Generating Prisma Client..." -ForegroundColor Yellow
npx prisma generate
if ($LASTEXITCODE -ne 0) {
    Write-Host "❌ Failed to generate Prisma Client" -ForegroundColor Red
    exit 1
}
Write-Host "✅ Prisma Client generated successfully!" -ForegroundColor Green
Write-Host ""

# Step 2: Push Database Schema
Write-Host "🗄️  Step 2: Pushing database schema..." -ForegroundColor Yellow
npx prisma db push
if ($LASTEXITCODE -ne 0) {
    Write-Host "❌ Failed to push database schema" -ForegroundColor Red
    Write-Host "⚠️  Please check your DATABASE_URL in .env.local" -ForegroundColor Yellow
    exit 1
}
Write-Host "✅ Database schema pushed successfully!" -ForegroundColor Green
Write-Host ""

# Step 3: Seed Database
Write-Host "🌱 Step 3: Seeding database with initial data..." -ForegroundColor Yellow
node prisma/seed.js
if ($LASTEXITCODE -ne 0) {
    Write-Host "❌ Failed to seed database" -ForegroundColor Red
    exit 1
}
Write-Host "✅ Database seeded successfully!" -ForegroundColor Green
Write-Host ""

# Success Message
Write-Host "🎉 Setup Complete!" -ForegroundColor Green
Write-Host ""
Write-Host "📝 Next Steps:" -ForegroundColor Cyan
Write-Host "  1. Run: npm run dev" -ForegroundColor White
Write-Host "  2. Open: http://localhost:3000" -ForegroundColor White
Write-Host "  3. Login with:" -ForegroundColor White
Write-Host "     Email: admin@art.com" -ForegroundColor White
Write-Host "     Password: admin" -ForegroundColor White
Write-Host ""
Write-Host "📚 View database: npx prisma studio" -ForegroundColor Cyan
Write-Host ""
