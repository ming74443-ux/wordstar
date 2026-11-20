# 一键推送仓库到 GitHub（在 PowerShell 里运行）

$ErrorActionPreference = "Stop"
Set-Location "D:\英语打包\wordstar-rebuild"

$repo = Read-Host "粘贴 GitHub 仓库地址（例如 https://github.com/你的用户名/wordstar.git）"
if (-not $repo) { Write-Host "未输入地址，退出"; exit }

$token = Read-Host "粘贴 GitHub Personal Access Token（repo 权限，输入时不显示）" -AsSecureString
$plain = [Runtime.InteropServices.Marshal]::PtrToStringAuto(
  [Runtime.InteropServices.Marshal]::SecureStringToBSTR($token))

$u = ($repo -replace '^https://', '') -replace '\.git$', ''
$authUrl = "https://x-access-token:$plain@$u.git"

git remote remove origin 2>$null
git remote add origin $authUrl
git branch -M main
git push -u origin main

git remote set-url origin $repo
Write-Host "`n推送完成。打开 https://github.com/$u/actions 手动触发 Build unsigned iOS IPA" -ForegroundColor Green
