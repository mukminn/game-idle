# ✅ Setup Git Repository dengan Benar

## ⚠️ Masalah
Git repository dibuat di home directory (`C:\Users\mukmin`) bukan di project folder (`C:\Users\mukmin\game idler`).

## ✅ Solusi

### Step 1: Hapus Git Repository yang Salah

Buka PowerShell di folder project dan jalankan:

```powershell
# Pastikan di folder project
cd "C:\Users\mukmin\game idler"

# Hapus .git di home directory (jika ada)
Remove-Item -Path "C:\Users\mukmin\.git" -Recurse -Force -ErrorAction SilentlyContinue
```

### Step 2: Initialize Git di Folder Project

```powershell
# Pastikan di folder project
cd "C:\Users\mukmin\game idler"

# Initialize git di folder project
git init

# Add hanya file project (bukan semua file)
git add index.html style.css game.js
git add *.md *.json *.js *.html *.css *.bat *.ps1 *.py
git add SYSTEMS\*.md
git add vercel.json package.json .gitignore

# Commit
git commit -m "Initial commit: Idle RPG Game with playable prototype"

# Set branch ke main
git branch -M main
```

### Step 3: Add Remote & Push

```powershell
# Add remote
git remote add origin https://github.com/mukminn/game-idle.git

# Push ke GitHub
git push -u origin main
```

**Jika error authentication:**
- Gunakan Personal Access Token (bukan password)
- Atau: `gh auth login` (jika pakai GitHub CLI)

---

## 🚀 Quick Script

Jalankan script ini di PowerShell (di folder project):

```powershell
cd "C:\Users\mukmin\game idler"

# Remove wrong git repo
Remove-Item -Path "C:\Users\mukmin\.git" -Recurse -Force -ErrorAction SilentlyContinue

# Initialize
git init

# Add project files only
git add index.html style.css game.js vercel.json package.json .gitignore
git add *.md
git add SYSTEMS
git add *.bat *.ps1 *.py *.js

# Commit
git commit -m "Initial commit: Idle RPG Game"

# Branch
git branch -M main

# Remote
git remote add origin https://github.com/mukminn/game-idle.git

# Push
git push -u origin main
```

---

## ✅ Verifikasi

Setelah push, cek di GitHub:
- https://github.com/mukminn/game-idle
- Pastikan file project muncul (bukan file home directory)

---

**Setelah ini, repository tidak akan kosong lagi!** 🎉

