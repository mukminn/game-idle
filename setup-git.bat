@echo off
echo ========================================
echo   Setup Git Repository
echo ========================================
echo.

echo [1/4] Initializing Git repository...
git init
echo.

echo [2/4] Adding all files...
git add .
echo.

echo [3/4] Making initial commit...
git commit -m "Initial commit: Idle RPG Game with prototype"
echo.

echo [4/4] Setting default branch to main...
git branch -M main
echo.

echo ========================================
echo   Git Repository Initialized!
echo ========================================
echo.
echo Next steps:
echo.
echo 1. Add remote repository:
echo    git remote add origin https://github.com/mukminn/game-idle.git
echo.
echo 2. Push to GitHub:
echo    git push -u origin main
echo.
echo 3. Then deploy to Vercel (see DEPLOY.md)
echo.
pause

