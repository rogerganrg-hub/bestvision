# ================================
# BestVision Platform Initial Script
# Directory Structure v5.0
# Node 20 LTS + pnpm + monorepo
# Next.js + NestJS + PostgreSQL
# ================================

Write-Host "Initializing BestVision Platform..." -ForegroundColor Cyan

# -------------------------------
# 1. Create root directory
# -------------------------------
$root = "bestvision"
New-Item -ItemType Directory -Force -Path $root | Out-Null
Set-Location $root

# -------------------------------
# 2. Create pnpm workspace root
# -------------------------------
Write-Host "Creating root package.json (pnpm workspace)..." -ForegroundColor Cyan

@"
{
  "name": "bestvision",
  "private": true,
  "version": "1.0.0",
  "packageManager": "pnpm@9",
  "workspaces": [
    "shared/*",
    "integrations/api",
    "identity/web",
    "identity/api",
    "aggregation/web",
    "aggregation/api",
    "audit/api",
    "audit/web"
  ]
}
"@ | Out-File -Encoding UTF8 package.json

# -------------------------------
# 3. Create shared modules
# -------------------------------
Write-Host "Creating shared modules..." -ForegroundColor Cyan

New-Item -ItemType Directory -Force -Path "shared/contracts" | Out-Null
New-Item -ItemType Directory -Force -Path "shared/utils" | Out-Null
New-Item -ItemType Directory -Force -Path "shared/ui" | Out-Null

# -------------------------------
# 4. Create integrations (server-only)
# -------------------------------
Write-Host "Creating integrations api..." -ForegroundColor Cyan

New-Item -ItemType Directory -Force -Path "integrations/api/adapters/plaid" | Out-Null
New-Item -ItemType Directory -Force -Path "integrations/api/adapters/finicity" | Out-Null
New-Item -ItemType Directory -Force -Path "integrations/api/adapters/crypto" | Out-Null
New-Item -ItemType Directory -Force -Path "integrations/api/token-store" | Out-Null
New-Item -ItemType Directory -Force -Path "integrations/api/connection-sm" | Out-Null
New-Item -ItemType Directory -Force -Path "integrations/api/tests" | Out-Null

# -------------------------------
# 5. Create domain modules
# -------------------------------
$domains = @("identity", "aggregation", "audit")

foreach ($d in $domains) {
  Write-Host "Creating module: $d" -ForegroundColor Green

  New-Item -ItemType Directory -Force -Path "$d/web" | Out-Null
  New-Item -ItemType Directory -Force -Path "$d/api" | Out-Null
  New-Item -ItemType Directory -Force -Path "$d/tests" | Out-Null
}

# -------------------------------
# 6. Initialize Next.js apps
# -------------------------------
Write-Host "Initializing Next.js webs..." -ForegroundColor Cyan

foreach ($d in $domains) {
  Set-Location "$d/web"
  pnpm create next-app . --ts --eslint --app --no-tailwind --no-src-dir --import-alias "@$d/*"
  Set-Location ../../
}

# -------------------------------
# 7. Initialize NestJS apps
# -------------------------------
Write-Host "Initializing NestJS apis..." -ForegroundColor Cyan

foreach ($d in $domains) {
  Set-Location "$d/api"
  pnpm dlx @nestjs/cli new app --package-manager pnpm --skip-git
  Move-Item "app/*" "." -Force
  Remove-Item "app" -Recurse -Force
  Set-Location ../../
}

# -------------------------------
# 8. Initialize integrations api (NestJS)
# -------------------------------
Write-Host "Initializing integrations api (NestJS)..." -ForegroundColor Cyan

Set-Location "integrations/api"
pnpm dlx @nestjs/cli new app --package-manager pnpm --skip-git
Move-Item "app/*" "." -Force
Remove-Item "app" -Recurse -Force
Set-Location ../../

# -------------------------------
# 9. Create infra/docker-compose.yml
# -------------------------------
Write-Host "Creating infra/docker-compose.yml..." -ForegroundColor Cyan

New-Item -ItemType Directory -Force -Path "infra" | Out-Null

@"
version: '3.9'
services:
  postgres:
    image: postgres:16
    container_name: bestvision-db
    restart: always
    environment:
      POSTGRES_USER: bestvision
      POSTGRES_PASSWORD: bestvision
      POSTGRES_DB: bestvision
    ports:
      - "5432:5432"
    volumes:
      - postgres_data:/var/lib/postgresql/data

volumes:
  postgres_data:
"@ | Out-File -Encoding UTF8 "infra/docker-compose.yml"

# -------------------------------
# 10. Create .env.example
# -------------------------------
Write-Host "Creating .env.example..." -ForegroundColor Cyan

@"
# Plaid
PLAID_CLIENT_ID=
PLAID_SECRET=
PLAID_ENV=sandbox

# Database
DATABASE_URL=postgresql://bestvision:bestvision@localhost:5432/bestvision

# Encryption
ENCRYPTION_KEY=
"@ | Out-File -Encoding UTF8 ".env.example"

# -------------------------------
# Done
# -------------------------------
Write-Host "Initialization complete." -ForegroundColor Green
