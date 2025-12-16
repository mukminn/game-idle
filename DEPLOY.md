# Deployment Guide - Vercel

## 🚀 Deploy ke Vercel

### Metode 1: Deploy via Vercel CLI (Recommended)

#### 1. Install Vercel CLI
```bash
npm i -g vercel
```

#### 2. Login ke Vercel
```bash
vercel login
```

#### 3. Deploy
```bash
vercel
```

Follow the prompts:
- Set up and deploy? **Yes**
- Which scope? (pilih akun Anda)
- Link to existing project? **No**
- Project name? **idle-rpg-game** (atau nama lain)
- Directory? **./** (current directory)
- Override settings? **No**

#### 4. Production Deploy
```bash
vercel --prod
```

### Metode 2: Deploy via GitHub (Recommended untuk CI/CD)

#### 1. Push ke GitHub

**Jika belum ada repository:**
```bash
# Initialize git
git init

# Add all files
git add .

# Commit
git commit -m "Initial commit: Idle RPG Game"

# Add remote (ganti dengan URL repo Anda)
git remote add origin https://github.com/mukminn/game-idle.git

# Push
git branch -M main
git push -u origin main
```

**Jika sudah ada repository:**
```bash
git add .
git commit -m "Add game prototype and Vercel config"
git push
```

#### 2. Connect ke Vercel

1. **Buka [Vercel Dashboard](https://vercel.com/dashboard)**
2. **Click "Add New Project"**
3. **Import Git Repository**
   - Pilih repository `game-idle`
   - Click "Import"

4. **Configure Project**
   - Framework Preset: **Other**
   - Root Directory: `./`
   - Build Command: (kosongkan)
   - Output Directory: `./`
   - Install Command: (kosongkan)

5. **Deploy**
   - Click "Deploy"
   - Tunggu deployment selesai
   - Dapatkan URL: `https://your-project.vercel.app`

### Metode 3: Deploy via Vercel Dashboard (Drag & Drop)

1. **Buka [Vercel Dashboard](https://vercel.com/dashboard)**
2. **Click "Add New Project"**
3. **Pilih "Upload"**
4. **Drag folder project atau zip file**
5. **Deploy**

## 📝 File Konfigurasi

File yang sudah dibuat untuk Vercel:
- ✅ `vercel.json` - Konfigurasi Vercel
- ✅ `package.json` - Node.js package info
- ✅ `.gitignore` - Git ignore rules

## 🌐 Setelah Deploy

### Custom Domain (Optional)

1. Buka project di Vercel Dashboard
2. Go to Settings > Domains
3. Add custom domain
4. Follow DNS setup instructions

### Environment Variables (Jika diperlukan)

1. Buka project di Vercel Dashboard
2. Go to Settings > Environment Variables
3. Add variables jika diperlukan

## 🔄 Update Deployment

### Via CLI
```bash
vercel --prod
```

### Via GitHub
```bash
git add .
git commit -m "Update game"
git push
```
Vercel akan auto-deploy jika GitHub integration sudah setup.

## 📊 Monitoring

- **Vercel Dashboard**: https://vercel.com/dashboard
- **Analytics**: Available di Vercel Dashboard
- **Logs**: Available di Vercel Dashboard > Project > Logs

## 🐛 Troubleshooting

### Build Fails
- Check `vercel.json` configuration
- Ensure all files are committed
- Check build logs di Vercel Dashboard

### 404 Errors
- Ensure `index.html` is in root directory
- Check `vercel.json` routes configuration

### Assets Not Loading
- Check file paths (use relative paths)
- Ensure all files are in repository

## 🎯 Quick Deploy Commands

```bash
# Install Vercel CLI
npm i -g vercel

# Login
vercel login

# Deploy to preview
vercel

# Deploy to production
vercel --prod
```

---

**Deployment URL akan seperti:** `https://idle-rpg-game.vercel.app`

