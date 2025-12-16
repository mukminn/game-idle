# 🔧 Fix Git Setup - Repository Kosong

## Masalah
Repository GitHub masih kosong karena Git repository dibuat di lokasi yang salah.

## Solusi

### Step 1: Setup Git di Folder Project yang Benar

Buka terminal/PowerShell di folder project:
```
C:\Users\mukmin\game idler
```

Jalankan script:
```bash
push-to-github.bat
```

Atau manual:

```bash
# Pastikan di folder project yang benar
cd "C:\Users\mukmin\game idler"

# Hapus .git yang salah (jika ada di parent folder)
# Initialize git di folder project
git init

# Add hanya file project (bukan semua file di home)
git add index.html style.css game.js
git add *.md *.json *.js *.html *.css *.bat *.ps1 *.py
git add SYSTEMS\*.md
git add vercel.json package.json .gitignore

# Commit
git commit -m "Initial commit: Idle RPG Game"

# Set branch
git branch -M main

# Add remote
git remote add origin https://github.com/mukminn/game-idle.git
```

### Step 2: Push ke GitHub

```bash
git push -u origin main
```

**Jika error authentication:**
- Gunakan Personal Access Token (bukan password)
- Atau install GitHub CLI: `gh auth login`

### Step 3: Verifikasi

Setelah push, cek di GitHub:
- https://github.com/mukminn/game-idle
- Pastikan file sudah muncul

### Step 4: Deploy ke Vercel

Setelah repository tidak kosong lagi:
1. Buka https://vercel.com/dashboard
2. Import repository `mukminn/game-idle`
3. Deploy

---

## File yang Harus di-Push

✅ `index.html`  
✅ `style.css`  
✅ `game.js`  
✅ `vercel.json`  
✅ `package.json`  
✅ `.gitignore`  
✅ `README.md`  
✅ Semua file `.md` (documentation)  
✅ Folder `SYSTEMS/`  

❌ Jangan push:
- `node_modules/`
- `.git/` di parent folder
- File sistem Windows
- File personal

---

**Setelah push berhasil, repository tidak akan kosong lagi!** 🚀

