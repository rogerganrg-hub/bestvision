# ===== BestVision env check (PowerShell) =====
$ErrorActionPreference = "Continue"

Write-Host "=== 0) Where am I? ==="
pwd
dir | Select-Object -First 20

Write-Host "`n=== 1) Node / pnpm ==="
node -v
pnpm -v
where node
where pnpm

Write-Host "`n=== 2) Git (optional but recommended) ==="
git --version
where git

Write-Host "`n=== 3) Docker client / daemon / context ==="
where docker
docker --version
docker compose version
docker context ls
docker context show
docker info

Write-Host "`n=== 4) Repo structure sanity ==="
if (Test-Path "pnpm-workspace.yaml") { "OK: pnpm-workspace.yaml exists" } else { "MISSING: pnpm-workspace.yaml" }
if (Test-Path "package.json") { "OK: root package.json exists" } else { "MISSING: root package.json" }
if (Test-Path ".env") { "OK: root .env exists" } else { "MISSING: root .env" }

Write-Host "`n=== 5) infra compose discovery ==="
if (Test-Path "infra") {
    dir infra | Select-Object -First 40
    dir infra\*.yml -ErrorAction SilentlyContinue
    dir infra\*compose*.yml -ErrorAction SilentlyContinue
}
else {
    "MISSING: infra folder"
}

Write-Host "`n=== 6) pnpm scripts at root ==="
if (Test-Path "package.json") {
    node -p "require('./package.json').name"
    node -p "require('./package.json').scripts"
}

Write-Host "`n=== 7) workspace packages (rough) ==="
if (Test-Path "pnpm-workspace.yaml") {
    type pnpm-workspace.yaml
}
