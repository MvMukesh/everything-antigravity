# Everything Antigravity (EAG) — PowerShell Installer for Windows

Write-Host "============================================================" -ForegroundColor Cyan
Write-Host "   Installing Everything Antigravity (EAG) Plugin Suite     " -ForegroundColor Cyan
Write-Host "============================================================" -ForegroundColor Cyan

$ScriptDir = Split-Path -Parent $MyInvocation.MyCommand.Path
$EagRoot = Resolve-Path (Join-Path $ScriptDir "..")
$DestDir = Join-Path $HOME ".gemini\config\plugins\everything-antigravity"

Write-Host "📍 Source directory: $EagRoot"
Write-Host "📍 Target directory: $DestDir"

if (-not (Test-Path $DestDir)) {
    New-Item -ItemType Directory -Path $DestDir -Force | Out-Null
}

Copy-Item -Path (Join-Path $EagRoot "plugin.json") -Destination $DestDir -Force -ErrorAction SilentlyContinue
Copy-Item -Path (Join-Path $EagRoot "SOUL.md") -Destination $DestDir -Force -ErrorAction SilentlyContinue
Copy-Item -Path (Join-Path $EagRoot "RULES.md") -Destination $DestDir -Force -ErrorAction SilentlyContinue
Copy-Item -Path (Join-Path $EagRoot "agents") -Destination $DestDir -Recurse -Force -ErrorAction SilentlyContinue
Copy-Item -Path (Join-Path $EagRoot "skills") -Destination $DestDir -Recurse -Force -ErrorAction SilentlyContinue
Copy-Item -Path (Join-Path $EagRoot "rules") -Destination $DestDir -Recurse -Force -ErrorAction SilentlyContinue
Copy-Item -Path (Join-Path $EagRoot "workflows") -Destination $DestDir -Recurse -Force -ErrorAction SilentlyContinue
Copy-Item -Path (Join-Path $EagRoot "scripts") -Destination $DestDir -Recurse -Force -ErrorAction SilentlyContinue

Write-Host "✅ Everything Antigravity (EAG) installed successfully on Windows!" -ForegroundColor Green
