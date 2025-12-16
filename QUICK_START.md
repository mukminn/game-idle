# Quick Start Guide - Testing the Game

## 🚀 Running the Game on Localhost

### Option 1: Node.js Server (Recommended) ⭐

**Node.js sudah terdeteksi di sistem Anda!**

1. **Run the server**
   ```bash
   node server.js
   ```
   
   Atau double-click `start-server-node.bat` (Windows)

2. **Open your browser**
   - The game should automatically open at `http://localhost:8000`
   - Or manually navigate to `http://localhost:8000`

### Option 2: PowerShell Server (Windows)

1. **Run PowerShell server**
   ```bash
   powershell -ExecutionPolicy Bypass -File server.ps1
   ```
   
   Atau double-click `start-server-ps1.bat`

2. **Open your browser**
   - Navigate to `http://localhost:8000`

### Option 3: Direct File Open (Simplest)

**Cara termudah - tidak perlu server!**

1. **Double-click `server-simple.html`**
   - File ini adalah versi standalone dengan semua code di satu file
   - Buka langsung di browser (Chrome, Firefox, Edge)
   - **Catatan:** Beberapa fitur localStorage mungkin terbatas

### Option 4: Python HTTP Server

Jika Python terinstall:

```bash
python server.py
```

Atau double-click `start-server.bat`

### Option 3: VS Code Live Server

If you use VS Code:

1. Install the "Live Server" extension
2. Right-click on `index.html`
3. Select "Open with Live Server"

### Option 4: Direct File Open

Simply open `index.html` in your browser (some features may be limited due to CORS).

---

## 🎮 How to Play

1. **Start Battle**: Click "Start Battle" to begin auto-combat
2. **Upgrade Hero**: Use BP to upgrade your hero's stats
3. **Upgrade Equipment**: Improve your weapon, helmet, and armor
4. **Progress**: Defeat enemies to earn BP and progress through stages
5. **Auto-Save**: Your progress is automatically saved to browser localStorage

---

## 🎯 Game Features (Prototype)

- ✅ Auto Battle System
- ✅ Hero Progression (Level, Stats)
- ✅ Equipment System (Weapon, Helmet, Armor)
- ✅ Currency System (BP, Crystals)
- ✅ Stage Progression
- ✅ Upgrade System
- ✅ Statistics Tracking
- ✅ Auto-Save System

---

## 🐛 Troubleshooting

### Server won't start
- Make sure Python is installed: `python --version`
- Try a different port by editing `server.py` (change PORT = 8000)
- Check if port 8000 is already in use

### Game not loading
- Check browser console for errors (F12)
- Make sure all files (index.html, style.css, game.js) are in the same folder
- Try a different browser (Chrome, Firefox, Edge)

### Save not working
- Check if localStorage is enabled in your browser
- Try clearing browser cache and reloading

---

## 📝 Notes

This is a **prototype/demo** version of the game based on the design documents. It implements:
- Core battle mechanics
- Basic progression systems
- Simple UI

Full implementation would require:
- Backend server
- Database
- Authentication
- All features from the design documents

---

**Enjoy testing the game!** 🎮

