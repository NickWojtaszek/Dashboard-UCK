# Railway Quick Setup

Deploy in 5 minutes! ⚡

## ✅ You're Already Prepared!

Your project is **Railway-ready** with:
- ✅ `serve` dependency installed
- ✅ `railway.json` configured
- ✅ `Procfile` created
- ✅ Build script ready
- ✅ Port configuration set

---

## 🚀 Deploy Now

### Option 1: From GitHub (Easiest)

1. **Push to GitHub:**
   ```bash
   git add .
   git commit -m "Ready for Railway deployment"
   git push origin main
   ```

2. **Go to Railway:**
   - Visit [railway.app](https://railway.app)
   - Click "Start a New Project"
   - Select "Deploy from GitHub repo"
   - Choose your repository
   - Click "Deploy"

3. **That's it!** Railway will:
   - Detect Node.js
   - Run `npm install && npm run build`
   - Start with `npm run serve`
   - Give you a URL

### Option 2: Railway CLI

```bash
# Install Railway CLI (if not installed)
# Windows PowerShell:
iwr https://railway.app/install.ps1 | iex

# Then deploy:
railway login
railway init
railway up
```

---

## 🔧 Add Supabase (Optional)

If you want cloud sync:

**In Railway Dashboard:**
1. Go to your project
2. Click "Variables"
3. Add:
   - `REACT_APP_SUPABASE_URL` = your Supabase URL
   - `REACT_APP_SUPABASE_ANON_KEY` = your Supabase key
4. Click "Redeploy"

---

## ✅ Verify Deployment

1. Railway will give you a URL like:
   ```
   https://your-app-production.up.railway.app
   ```

2. Open it and test:
   - [ ] App loads
   - [ ] Can open settings (PIN: 1234)
   - [ ] Can add an app
   - [ ] Can edit an app
   - [ ] localStorage persists

---

## 📊 Your Railway Project

**What Railway does automatically:**
- ✅ Installs dependencies (`npm install`)
- ✅ Builds your app (`npm run build`)
- ✅ Serves static files (`npm run serve`)
- ✅ Provides HTTPS
- ✅ Auto-redeploys on git push
- ✅ Gives you a free subdomain

**Resources used:**
- Minimal (static site)
- Stays within free tier
- ~$0-1/month

---

## 🎯 Next Steps

After deploying:

1. **Get your URL** from Railway dashboard
2. **Test the live site**
3. **Share with your team**
4. **Add custom domain** (optional)
5. **Set up Supabase** if you want multi-device sync

---

## 📱 Custom Domain (Optional)

1. Railway Dashboard → Settings → Domains
2. Add your domain
3. Update DNS:
   ```
   Type: CNAME
   Name: dashboard (or @)
   Value: your-app.up.railway.app
   ```
4. Wait 5-60 minutes for DNS propagation

---

## 🆘 Need Help?

See full guide: [RAILWAY_DEPLOYMENT.md](RAILWAY_DEPLOYMENT.md)

Common issues:
- Build fails → Check Railway logs
- Port error → We use `$PORT` (already configured ✅)
- 404 errors → Build succeeded? Check Railway logs

---

**You're all set for Railway deployment!** 🎉

Just push to GitHub and deploy, or use Railway CLI.
