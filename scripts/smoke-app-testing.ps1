# tools/smoke-application.ps1
# BestVision 0004 - Application E2E Smoke Test (POST -> GET -> LIST)
# Run from repo root:  pwsh -File tools/smoke_application.ps1

$ErrorActionPreference = "Stop"

# Use Next rewrites path (recommended)
$BaseUrl = "http://localhost:4000"
if (-not $BaseUrl) { $BaseUrl = "http://localhost:3000" }

Write-Host "== BestVision Application Smoke Test ==" -ForegroundColor Cyan
Write-Host "BaseUrl: $BaseUrl"
Write-Host ""

function Assert-Ok($cond, $msg) {
  if (-not $cond) {
    throw "ASSERT FAILED: $msg"
  }
}

function Get-RequestIdFromHeaders($headers) {
  # In PowerShell, headers keys can be case-insensitive but may vary in shape.
  # Try common variants.
  if ($headers["x-request-id"]) { return $headers["x-request-id"] }
  if ($headers["X-Request-Id"]) { return $headers["X-Request-Id"] }
  return $null
}

# 1) POST /api/v1/applications
$name = "Roy"
$email = "roy+$([System.Guid]::NewGuid().ToString('N').Substring(0,6))@example.com"

$bodyObj = @{ name = $name; email = $email }
$bodyJson = $bodyObj | ConvertTo-Json

Write-Host "[1] POST /api/v1/applications" -ForegroundColor Yellow
$postResp = Invoke-WebRequest `
  -Method Post `
  -Uri "$BaseUrl/api/v1/applications" `
  -ContentType "application/json" `
  -Body $bodyJson

$postRid = Get-RequestIdFromHeaders $postResp.Headers
$postJson = $postResp.Content | ConvertFrom-Json

Write-Host "  HTTP: $($postResp.StatusCode)"
Write-Host "  rid : $postRid"
Write-Host "  body: $($postResp.Content)"

Assert-Ok ($postResp.StatusCode -ge 200 -and $postResp.StatusCode -lt 300) "POST should be 2xx"
Assert-Ok ($postJson.ok -eq $true) "POST body ok=true"
Assert-Ok ($postJson.applicationId) "POST should return applicationId"

$applicationId = $postJson.applicationId

Write-Host ""

# 2) GET /api/v1/applications/{id}
Write-Host "[2] GET /api/v1/applications/$applicationId" -ForegroundColor Yellow
$getResp = Invoke-WebRequest `
  -Method Get `
  -Uri "$BaseUrl/api/v1/applications/$applicationId"

$getRid = Get-RequestIdFromHeaders $getResp.Headers
$getJson = $getResp.Content | ConvertFrom-Json

Write-Host "  HTTP: $($getResp.StatusCode)"
Write-Host "  rid : $getRid"
Write-Host "  body: $($getResp.Content)"

Assert-Ok ($getResp.StatusCode -eq 200) "GET by id should be 200"
Assert-Ok ($getJson.ok -eq $true) "GET body ok=true"
Assert-Ok ($getJson.application.applicationId -eq $applicationId) "GET should return same applicationId"

Write-Host ""

# 3) LIST /api/v1/applications?limit=5
Write-Host "[3] GET /api/v1/applications?limit=5" -ForegroundColor Yellow
$listResp = Invoke-WebRequest `
  -Method Get `
  -Uri "$BaseUrl/api/v1/applications?limit=5"

$listRid = Get-RequestIdFromHeaders $listResp.Headers
$listJson = $listResp.Content | ConvertFrom-Json

Write-Host ""
Write-Host "== Plaid Sandbox Smoke (P-002..P-005) =="

# [P0] Status should be configured=true (sandbox)
Write-Host "[P0] GET /api/v1/integrations/plaid/status"
$plaidStatus = Invoke-RestMethod -Method GET -Uri "$BaseUrl/api/v1/integrations/plaid/status"
if (-not $plaidStatus.ok) { throw "Plaid status not ok" }
if (-not $plaidStatus.configured) { throw "Plaid not configured (configured=false). Check apps/api .env" }
Write-Host "  configured=$($plaidStatus.configured) env=$($plaidStatus.env)"

# [P2] Create link_token (auto)
Write-Host "[P2] POST /api/v1/integrations/plaid/link-token"
$linkResp = Invoke-RestMethod -Method POST -Uri "$BaseUrl/api/v1/integrations/plaid/link-token" -Headers @{ "Content-Type"="application/json" } -Body "{}"
if (-not $linkResp.ok) { throw "Link-token failed" }
if (-not $linkResp.linkToken) { throw "Missing linkToken in response" }
Write-Host "  linkToken ok"

Write-Host ""
Write-Host "NOTE: Exchange/accounts require a public_token from the front-end Plaid Link UI."
Write-Host "      Open: http://localhost:3000/integrations/plaid"
Write-Host "      Complete Link, then copy the public_token into the prompt below."

$publicToken = Read-Host "Enter public_token (or press Enter to SKIP exchange/accounts)"
if ([string]::IsNullOrWhiteSpace($publicToken)) {
  Write-Host "SKIP: No public_token provided. Plaid exchange/accounts skipped."
  Write-Host "✅ Smoke test PASSED (auto part)"
  return
}

# [P4] Exchange (semi-auto)
Write-Host "[P4] POST /api/v1/integrations/plaid/exchange"
$exBody = @{ public_token = $publicToken } | ConvertTo-Json
$exResp = Invoke-RestMethod -Method POST -Uri "$BaseUrl/api/v1/integrations/plaid/exchange" -Headers @{ "Content-Type"="application/json" } -Body $exBody
if (-not $exResp.ok) { throw "Exchange failed" }
if (-not $exResp.itemId) { throw "Missing itemId in exchange response" }
Write-Host "  itemId=$($exResp.itemId)"

# [P5] Accounts fetch (semi-auto continuation)
Write-Host "[P5] GET /api/v1/integrations/plaid/accounts?item_id=..."
$accResp = Invoke-RestMethod -Method GET -Uri "$BaseUrl/api/v1/integrations/plaid/accounts?item_id=$($exResp.itemId)"
if (-not $accResp.ok) { throw "Accounts fetch failed" }
if (-not $accResp.accounts) { throw "Missing accounts" }
Write-Host "  accounts.count=$($accResp.accounts.Count)"

# 4) Audit Failure Drill (AUDIT_FORCE_FAIL=1, business must NOT be blocked)
Write-Host ""
Write-Host "== Audit Failure Drill (AUDIT_FORCE_FAIL=1, business must NOT be blocked) =="

# 失败演练需要后端以 AUDIT_FORCE_FAIL=1 启动。
# 为避免误判，先通过 debug endpoint 读取后端当前状态；未开启则跳过演练。
$auditDbg = Invoke-RestMethod -Method GET -Uri "$BaseUrl/api/v1/debug/audit"
if (-not $auditDbg.auditForceFail) {
  Write-Host "SKIP: AUDIT_FORCE_FAIL is NOT enabled on api."
  Write-Host "      Restart api with AUDIT_FORCE_FAIL=1, then re-run smoke test to execute the drill."
  Write-Host "      Example (PowerShell): `$env:AUDIT_FORCE_FAIL='1' ; <start-api>"
  Write-Host ""
}
else {
  Write-Host "Api reports AUDIT_FORCE_FAIL=1. Running drill..."

  $RepoRoot = (Resolve-Path (Join-Path $PSScriptRoot "..")).Path
  $DrillScript = Join-Path $RepoRoot "apps\api\scripts\audit_failure_drill.mjs"
  if (-not (Test-Path $DrillScript)) {
    throw "Missing drill script: $DrillScript"
  }
  
  Write-Host "[D1] node $DrillScript"
  $p = Start-Process -FilePath "node" -ArgumentList @("$DrillScript") -NoNewWindow -PassThru -Wait -Environment @{ API_BASE = $BaseUrl }
  if ($p.ExitCode -ne 0) {
    throw "Audit failure drill FAILED (exit code $($p.ExitCode)). Check api console for 'audit_write_failed'."
  }
  Write-Host "Audit failure drill PASS."
  Write-Host ""
}

# Continue LIST test output
Write-Host "  HTTP: $($listResp.StatusCode)"
Write-Host "  rid : $listRid"
Write-Host "  body: $($listResp.Content)"

Assert-Ok ($listResp.StatusCode -eq 200) "LIST should be 200"
Assert-Ok ($listJson.ok -eq $true) "LIST body ok=true"
Assert-Ok ($listJson.items) "LIST should return items[]"
Assert-Ok ($listJson.items.Count -ge 1) "LIST should return >= 1 item"

# Optional: verify our created record is present in latest list (best-effort)
$found = $false
foreach ($it in $listJson.items) {
  if ($it.applicationId -eq $applicationId) { $found = $true; break }
}
Write-Host "  contains created applicationId? $found"

Write-Host ""
Write-Host "✅ Smoke test PASSED" -ForegroundColor Green
Write-Host "POST rid: $postRid"
Write-Host "GET  rid: $getRid"
Write-Host "LIST rid: $listRid"
