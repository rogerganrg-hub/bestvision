$ErrorActionPreference = "Stop"

# === Config ===
$BackendBase = "http://localhost:3000"
# 你的 sqlite 文件路径（按你截图）
$DbPath = "D:\bestvision\apps\backend\data\bestvision.sqlite"

Write-Host "1) Create application via HTTP..."

$body = @{
  name  = "AuditTest"
  email = ("audit_" + [Guid]::NewGuid().ToString("N") + "@example.com")
} | ConvertTo-Json

# 用 Invoke-WebRequest 拿 headers 更方便
$res = Invoke-WebRequest -Method POST -Uri "$BackendBase/api/v1/applications" `
  -Headers @{ "Content-Type" = "application/json" } `
  -Body $body

if ($res.StatusCode -ne 200 -and $res.StatusCode -ne 201) {
  throw "Unexpected status code: $($res.StatusCode)"
}

$json = $res.Content | ConvertFrom-Json
$rid = $res.Headers["X-Request-Id"]
$appId = $json.applicationId

Write-Host "   HTTP ok. applicationId=$appId"
Write-Host "   X-Request-Id=$rid"

if (-not $rid) { throw "Missing X-Request-Id header" }
if (-not $appId) { throw "Missing applicationId in response body" }

Write-Host "2) Query audit_events by request_id..."
if (-not (Test-Path $DbPath)) { throw "DB not found: $DbPath" }

# 取最近一条匹配 request_id 的审计事件
$sql = @"
.headers off
.mode json
SELECT
  audit_id,
  timestamp_utc,
  request_id,
  actor_type,
  actor_id,
  action,
  resource_type,
  resource_id,
  result,
  reason_code,
  meta_json
FROM audit_events
WHERE request_id = '$rid'
ORDER BY timestamp_utc DESC
LIMIT 1;
"@

# 调 sqlite3
$out = sqlite3 $DbPath $sql

if (-not $out -or $out.Trim() -eq "[]") {
  throw "No audit event found for request_id=$rid"
}

Write-Host "3) Found audit event:"
Write-Host $out

Write-Host "`nPASS: audit write exists and request_id matches X-Request-Id."
