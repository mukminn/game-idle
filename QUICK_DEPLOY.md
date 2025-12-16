# 🚀 Quick Deploy Guide

## Langkah Cepat Deploy ke Vercel

### Step 1: Setup Git (Jika belum)

```bash
# Initialize git
git init
git add .
git commit -m "Initial commit: Idle RPG Game"
git branch -M main

# Add remote (ganti dengan URL repo Anda)
git remote add origin https://github.com/mukminn/game-idle.git

# Push ke GitHub
git push -u origin main
```

**Atau jalankan script:**
```bash
setup-git.bat
```

### Step 2: Deploy ke Vercel

#### Opsi A: Via Vercel CLI (Paling Cepat)

```bash
# Install Vercel CLI
npm i -g vercel

# Login
vercel login

# Deploy
vercel --prod
```

#### Opsi B: Via Vercel Dashboard (Paling Mudah)

1. **Buka:** https://vercel.com/dashboard
2. **Click:** "Add New Project"
3. **Import:** Repository `game-idle` dari GitHub
4. **Configure:**
   - Framework: **Other**
   - Root Directory: `./`
   - Build Command: (kosongkan)
   - Output Directory: `./`
5. **Deploy:** Click "Deploy"

#### Opsi C: Drag & Drop

1. **Buka:** https://vercel.com/dashboard
2. **Click:** "Add New Project" > "Upload"
3. **Drag** folder project atau **zip** semua file
4. **Deploy**

### Step 3: Selesai! 🎉

Setelah deploy, Anda akan dapat URL seperti:
- `https://idle-rpg-game.vercel.app`
- Atau custom domain jika sudah setup

---

## 📝 File yang Sudah Disiapkan

✅ `vercel.json` - Konfigurasi Vercel  
✅ `package.json` - Package info  
✅ `.gitignore` - Git ignore  
✅ `DEPLOY.md` - Panduan lengkap  

---

## 🔄 Update Deployment

Setelah perubahan:

```bash
git add .
git commit -m "Update game"
git push
```

Vercel akan **auto-deploy** jika sudah connect dengan GitHub!

---

## 🐛 Troubleshooting

**Deploy gagal?**
- Pastikan semua file sudah di-commit
- Check `vercel.json` configuration
- Lihat build logs di Vercel Dashboard

**404 Error?**
- Pastikan `index.html` ada di root
- Check `vercel.json` rewrites configuration

---

**Selamat deploy!** 🚀

