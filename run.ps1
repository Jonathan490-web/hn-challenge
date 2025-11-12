# =========================================
# Bootstrap + Run (API + Angular UI)
# Works even if npx.ps1 is blocked (uses cmd)
# =========================================

param(
  [switch]$RunTests  # add -RunTests if you want to run BE/FE tests before starting
)

$ErrorActionPreference = "Stop"

function Write-Line($msg, [ConsoleColor]$c = [ConsoleColor]::Cyan) {
  $old = $host.UI.RawUI.ForegroundColor
  $host.UI.RawUI.ForegroundColor = $c
  Write-Host $msg
  $host.UI.RawUI.ForegroundColor = $old
}

# ---- Precheck: repo structure ----
if (!(Test-Path ".\Hn.Api\Hn.Api.csproj") -or !(Test-Path ".\hn-web\package.json")) {
  throw "Run this from the repo root. Expected Hn.Api/ and hn-web/ to exist."
}

# ---- Dotnet presence ----
try {
  $dotnetVer = (& dotnet --version) 2>$null
  if (-not $dotnetVer) { throw "dotnet not found" }
  Write-Line "✔ .NET SDK: $dotnetVer" Green
} catch {
  throw "❌ .NET SDK not found. Install .NET 8+/9+ first: https://dotnet.microsoft.com/download"
}

# ---- Node presence ----
try {
  $nodeVer = (& node -v) 2>$null
  if (-not $nodeVer) { throw "node not found" }
  Write-Line "✔ Node: $nodeVer" Green
} catch {
  Write-Line "❌ Node.js not found. Install Node LTS (20.19+) or 22.12+." Red
  throw
}

# ===========================================================
# Backend: restore, (optional test), start on http://localhost:5129
# ===========================================================
Write-Line "`n==> Restoring Backend..."
& dotnet restore | Out-Null

if ($RunTests) {
  Write-Line "==> Running Backend tests (xUnit)..."
  & dotnet test --no-build
}

Write-Line "==> Starting Backend API (http://localhost:5129)..."
$beCmd = "dotnet run --project `".\Hn.Api\Hn.Api.csproj`""
Start-Process powershell -ArgumentList '-NoExit','-Command', $beCmd | Out-Null

Start-Sleep -Seconds 3

# ===========================================================
# Frontend: npm ci, (optional test), start on http://localhost:4200
# ===========================================================
Push-Location .\hn-web

Write-Line "`n==> Installing Frontend dependencies (npm ci)..."
cmd /c "npm ci --silent"

if ($RunTests) {
  Write-Line "==> Running Angular unit tests (headless)..."
  cmd /c "npx @angular/cli@latest test --watch=false --browsers=ChromeHeadless"
}

Write-Line "==> Starting Angular dev server (http://localhost:4200)..."
$feCmd = 'cmd /c "npx @angular/cli@latest serve --port 4200 -o"'
Start-Process powershell -ArgumentList '-NoExit','-Command', $feCmd | Out-Null

Pop-Location

Write-Host ""
Write-Line "✅ Both services are being started." Green
Write-Host "   UI : http://localhost:4200"
Write-Host "   API: http://localhost:5129/swagger"
Write-Host ""
Write-Host "Tip: If Angular fails due to Node version:"
Write-Host "     nvm install 22.12.0 ; nvm use 22.12.0"
Write-Host ""
Write-Host "Tip: If API port is blocked:"
Write-Host "     taskkill /IM iisexpress.exe /F"
