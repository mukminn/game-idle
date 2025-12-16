# 🚀 Push ke GitHub & Deploy ke Vercel

## Step 1: Setup Git Repository (Di Project Folder)

Buka terminal di folder project (`C:\Users\mukmin\game idler`) dan jalankan:

```bash
# Pastikan Anda di folder project yang benar
cd "C:\Users\mukmin\game idler"

# Initialize git (jika belum)
git init

# Add remote repository
git remote add origin https://github.com/mukminn/game-idle.git

# Atau jika sudah ada remote, update:
git remote set-url origin https://github.com/mukminn/game-idle.git
```

## Step 2: Add & Commit Files

```bash
# Add semua file project
git add .

# Commit
git commit -m "Initial commit: Idle RPG Game with playable prototype"

# Set branch ke main
git branch -M main
```

## Step 3: Push ke GitHub

```bash
# Push ke GitHub
git push -u origin main
```

**Jika pertama kali push, GitHub akan meminta authentication:**
- Gunakan Personal Access Token (bukan password)
- Atau gunakan GitHub CLI: `gh auth login`

## Step 4: Deploy ke Vercel

### Opsi A: Via Vercel Dashboard (Paling Mudah) ⭐

1. **Buka:** https://vercel.com/dashboard
2. **Click:** "Add New Project"
3. **Import Git Repository:**
   - Pilih repository `mukminn/game-idle`
   - Click "Import"
4. **Configure Project:**
   - Framework Preset: **Other**
   - Root Directory: `./` (default)
   - Build Command: (kosongkan)
   - Output Directory: `./` (default)
   - Install Command: (kosongkan)
5. **Deploy:**
   - Click "Deploy"
   - Tunggu deployment selesai (~1-2 menit)
   - Dapatkan URL: `https://game-idle.vercel.app`

### Opsi B: Via Vercel CLI

```bash
# Install Vercel CLI
npm i -g vercel

# Login
vercel login

# Deploy
vercel --prod
```

## Step 5: Selesai! 🎉

Setelah deploy, game akan tersedia di:
- **Production URL:** `https://game-idle.vercel.app`
- **Preview URLs:** Setiap commit akan dapat preview URL

## 🔄 Update Deployment

Setelah perubahan code:

```bash
git add .
git commit -m "Update game"
git push
```

Vercel akan **auto-deploy** jika sudah connect dengan GitHub!

---

## 📝 File yang Sudah Disiapkan

✅ `vercel.json` - Konfigurasi Vercel  
✅ `package.json` - Package info  
✅ `.gitignore` - Git ignore rules  
✅ `DEPLOY.md` - Panduan lengkap  
✅ `QUICK_DEPLOY.md` - Quick guide  

---

## 🐛 Troubleshooting

### Git Push Error

**"Permission denied" atau "Authentication failed":**
- Gunakan Personal Access Token (bukan password)
- Atau setup SSH key

**"Repository not found":**
- Pastikan repository sudah dibuat di GitHub
- Check URL remote: `git remote -v`

### Vercel Deploy Error

**"Build failed":**
- Check `vercel.json` configuration
- Pastikan `index.html` ada di root
- Check build logs di Vercel Dashboard

**"404 Not Found":**
- Pastikan `vercel.json` rewrites configuration benar
- Check file paths (gunakan relative paths)

---

**Selamat deploy!** 🚀

