@echo off
echo ========================================
echo   Deploy Idle RPG Game to Vercel
echo ========================================
echo.

echo [1/3] Checking Git status...
git status
echo.

echo [2/3] Adding all files...
git add .
echo.

echo [3/3] Committing changes...
git commit -m "Deploy game to Vercel"
echo.

echo ========================================
echo   Next Steps:
echo ========================================
echo.
echo 1. Push to GitHub:
echo    git push origin main
echo.
echo 2. Deploy to Vercel:
echo    vercel --prod
echo.
echo    OR
echo.
echo    - Go to https://vercel.com/dashboard
echo    - Import your GitHub repository
echo    - Deploy automatically
echo.
pause

