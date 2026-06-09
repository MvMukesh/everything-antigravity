# Everything Antigravity (EAG) — PowerShell Scaffolder

param (
    [string]$TargetDir = "."
)

Write-Host "🚀 Scaffolding Everything Antigravity (EAG) in $TargetDir..." -ForegroundColor Cyan

$AgentsDir = Join-Path $TargetDir ".gemini\agents"
$SkillsDir = Join-Path $TargetDir ".gemini\skills"
$RulesDir = Join-Path $TargetDir ".gemini\rules"
$WorkflowsDir = Join-Path $TargetDir ".gemini\workflows"

New-Item -ItemType Directory -Path $AgentsDir -Force | Out-Null
New-Item -ItemType Directory -Path $SkillsDir -Force | Out-Null
New-Item -ItemType Directory -Path $RulesDir -Force | Out-Null
New-Item -ItemType Directory -Path $WorkflowsDir -Force | Out-Null

$ScriptDir = Split-Path -Parent $MyInvocation.MyCommand.Path
$EagRoot = Resolve-Path (Join-Path $ScriptDir "..")

Copy-Item -Path (Join-Path $EagRoot "agents\*") -Destination $AgentsDir -Recurse -Force -ErrorAction SilentlyContinue
Copy-Item -Path (Join-Path $EagRoot "skills\*") -Destination $SkillsDir -Recurse -Force -ErrorAction SilentlyContinue
Copy-Item -Path (Join-Path $EagRoot "rules\*") -Destination $RulesDir -Recurse -Force -ErrorAction SilentlyContinue
Copy-Item -Path (Join-Path $EagRoot "workflows\*") -Destination $WorkflowsDir -Recurse -Force -ErrorAction SilentlyContinue
Copy-Item -Path (Join-Path $EagRoot "SOUL.md") -Destination $TargetDir -Force -ErrorAction SilentlyContinue
Copy-Item -Path (Join-Path $EagRoot "RULES.md") -Destination $TargetDir -Force -ErrorAction SilentlyContinue

Write-Host "✨ EAG successfully scaffolded into $TargetDir!" -ForegroundColor Green
