@echo off
echo ========================================
echo   Push to GitHub - Idle RPG Game
echo ========================================
echo.

cd /d "%~dp0"

echo [1/5] Checking Git repository...
if not exist .git (
    echo Initializing Git repository...
    git init
) else (
    echo Git repository already exists.
)
echo.

echo [2/5] Adding files to Git...
git add index.html style.css game.js
git add *.md *.json *.js *.html *.css *.bat *.ps1 *.py
git add SYSTEMS\*.md
git add vercel.json package.json .gitignore
echo.

echo [3/5] Committing changes...
git commit -m "Initial commit: Idle RPG Game with playable prototype and design documents"
if errorlevel 1 (
    echo Warning: Commit may have failed. Continuing...
)
echo.

echo [4/5] Setting branch to main...
git branch -M main
echo.

echo [5/5] Adding remote (if not exists)...
git remote remove origin 2>nul
git remote add origin https://github.com/mukminn/game-idle.git
echo.

echo ========================================
echo   Ready to Push!
echo ========================================
echo.
echo Next step: Push to GitHub
echo   git push -u origin main
echo.
echo If you get authentication error, use:
echo   - Personal Access Token (not password)
echo   - Or: gh auth login (GitHub CLI)
echo.
pause

