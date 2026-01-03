# Quick Start Guide

Get your dashboard running in 60 seconds.

## Installation

```bash
npm install
npm start
```

That's it! The app opens at **http://localhost:3002**

---

## First Steps

### 1. Open Settings
- Click the **⚙️ Settings** icon
- Enter PIN: **1234** (default)

### 2. Add Your First App
- Click **Applications** tab
- Click **Add App** button
- Fill in:
  - Name: GitHub
  - URL: https://github.com
  - Description: Code hosting
  - Category: Development
  - Color: #000000
- Click **Save**

### 3. Change Your PIN
- Click **Security** tab
- Enter new PIN
- Confirm PIN
- Click **Update PIN**

---

## That's All You Need!

**The dashboard now works perfectly with:**
- ✅ localStorage (fast, private, reliable)
- ✅ No configuration needed
- ✅ No account required
- ✅ Data persists across sessions

---

## Optional: Enable Cloud Sync

Want to sync across devices?

```bash
# 1. Copy template
cp .env.example .env

# 2. Get Supabase credentials (free)
# Visit https://supabase.com
# Create project
# Copy URL and anon key

# 3. Edit .env
REACT_APP_SUPABASE_URL=your-url-here
REACT_APP_SUPABASE_ANON_KEY=your-key-here

# 4. Restart
npm start
```

See [SUPABASE_SETUP.md](SUPABASE_SETUP.md) for complete instructions.

---

## Build for Production

```bash
npm run build
```

Upload the `build/` folder to any static host:
- Netlify (recommended, free)
- Vercel (free)
- GitHub Pages (free)

---

## Need Help?

- **Setup issues?** → [TROUBLESHOOTING.md](TROUBLESHOOTING.md)
- **Supabase setup?** → [SUPABASE_SETUP.md](SUPABASE_SETUP.md)
- **Deployment?** → [PRODUCTION_READY.md](PRODUCTION_READY.md)
- **Full docs?** → [README.md](README.md)

---

## Common Commands

```bash
npm start          # Development server
npm run build      # Production build
npm test           # Run tests
```

---

That's it! You're ready to go. 🚀
