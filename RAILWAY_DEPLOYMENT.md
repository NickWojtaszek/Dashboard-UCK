# Railway Deployment Guide

Deploy your dashboard to Railway in minutes.

## Prerequisites

- GitHub account
- Railway account (free tier available)
- Your code in a Git repository

---

## Option 1: Deploy from GitHub (Recommended)

### Step 1: Push to GitHub

```bash
# Initialize git (if not already done)
git init

# Add all files
git add .

# Commit
git commit -m "Initial commit - App Launcher Dashboard"

# Create GitHub repo and push
# (Follow GitHub's instructions)
git remote add origin https://github.com/yourusername/dashboard.git
git branch -M main
git push -u origin main
```

### Step 2: Deploy to Railway

1. Go to [railway.app](https://railway.app)
2. Click **"Start a New Project"**
3. Select **"Deploy from GitHub repo"**
4. Authorize Railway to access your GitHub
5. Select your dashboard repository
6. Railway will auto-detect it's a Node.js app

### Step 3: Configure Build Settings

Railway should auto-detect settings, but verify:

**Build Command:**
```
npm install && npm run build
```

**Start Command:**
```
npx serve -s build -l $PORT
```

**Root Directory:** `/` (leave as is)

### Step 4: Add Environment Variables (Optional - for Supabase)

If you want cloud sync:

1. In Railway dashboard, go to your project
2. Click **"Variables"** tab
3. Add:
   ```
   REACT_APP_SUPABASE_URL=your-supabase-url
   REACT_APP_SUPABASE_ANON_KEY=your-anon-key
   ```
4. Click **"Deploy"** to apply changes

### Step 5: Get Your URL

Railway will provide a URL like:
```
https://your-app-name.up.railway.app
```

---

## Option 2: Deploy from CLI

### Install Railway CLI

```bash
# Windows (PowerShell as Admin)
iwr https://railway.app/install.ps1 | iex

# Mac/Linux
curl -fsSL https://railway.app/install.sh | sh
```

### Deploy

```bash
# Login to Railway
railway login

# Initialize project
railway init

# Link to your project (or create new)
railway link

# Add environment variables (optional)
railway variables set REACT_APP_SUPABASE_URL=your-url
railway variables set REACT_APP_SUPABASE_ANON_KEY=your-key

# Deploy
railway up
```

---

## Railway Configuration File

Create `railway.json` in your project root:

```json
{
  "$schema": "https://railway.app/railway.schema.json",
  "build": {
    "builder": "NIXPACKS",
    "buildCommand": "npm install && npm run build"
  },
  "deploy": {
    "startCommand": "npx serve -s build -l $PORT",
    "restartPolicyType": "ON_FAILURE",
    "restartPolicyMaxRetries": 10
  }
}
```

Or create `Procfile`:

```
web: npx serve -s build -l $PORT
```

---

## Add Static Server Dependency

Railway needs a static server. Add to `package.json`:

```json
{
  "scripts": {
    "start": "react-scripts start",
    "build": "react-scripts build",
    "serve": "serve -s build -l $PORT"
  },
  "dependencies": {
    // ... existing dependencies
    "serve": "^14.2.1"
  }
}
```

Install it:

```bash
npm install serve --save
```

---

## Dockerfile (Alternative Approach)

If you prefer Docker, create `Dockerfile`:

```dockerfile
# Build stage
FROM node:18-alpine AS build

WORKDIR /app

# Copy package files
COPY package*.json ./

# Install dependencies
RUN npm ci

# Copy source
COPY . .

# Build app
RUN npm run build

# Production stage
FROM node:18-alpine

WORKDIR /app

# Install serve
RUN npm install -g serve

# Copy build from build stage
COPY --from=build /app/build ./build

# Expose port
EXPOSE $PORT

# Start server
CMD serve -s build -l $PORT
```

---

## .gitignore Updates

Make sure these are in `.gitignore`:

```
# dependencies
node_modules/

# production
build/

# environment
.env
.env.local
.env.production

# misc
.DS_Store
npm-debug.log*

# Railway
.railway/
```

**Important:** Do NOT commit `.env` file!

---

## Environment Variables on Railway

### For localStorage-only (default):
No environment variables needed!

### For Supabase sync:

**Via Railway Dashboard:**
1. Project → Variables tab
2. Add variables:
   - `REACT_APP_SUPABASE_URL`
   - `REACT_APP_SUPABASE_ANON_KEY`

**Via Railway CLI:**
```bash
railway variables set REACT_APP_SUPABASE_URL=your-url
railway variables set REACT_APP_SUPABASE_ANON_KEY=your-key
```

---

## Custom Domain (Optional)

### Add Custom Domain on Railway

1. Go to your Railway project
2. Click **Settings** → **Domains**
3. Click **"Generate Domain"** (free .railway.app subdomain)
4. Or add your custom domain:
   - Enter your domain (e.g., `dashboard.yourdomain.com`)
   - Add DNS records as shown by Railway
   - Wait for DNS propagation (~5-60 minutes)

### DNS Configuration

Railway will show you DNS records to add:

**For subdomain:**
```
Type: CNAME
Name: dashboard
Value: your-app.up.railway.app
```

**For root domain:**
```
Type: A
Name: @
Value: [Railway's IP]
```

---

## Monitoring & Logs

### View Logs

**Railway Dashboard:**
1. Go to your project
2. Click **"Deployments"**
3. Click on latest deployment
4. View logs in real-time

**Railway CLI:**
```bash
railway logs
```

### Check Build Status

Railway dashboard shows:
- ✅ Build succeeded
- 🔄 Building
- ❌ Build failed

Click on deployment for detailed logs.

---

## Troubleshooting Railway

### Build Fails

**Check build logs:**
```bash
railway logs --deployment [deployment-id]
```

**Common fixes:**
```bash
# Clear cache and redeploy
railway service --remove
railway init
railway up

# Or via dashboard: Settings → Redeploy
```

### Port Issues

Railway automatically provides `$PORT` environment variable.

Make sure your start command uses it:
```json
"serve": "serve -s build -l $PORT"
```

NOT hardcoded:
```json
"serve": "serve -s build -p 3000"  // ❌ Wrong
```

### Environment Variables Not Working

1. Make sure they start with `REACT_APP_`
2. Redeploy after adding variables
3. Check they're set: Railway Dashboard → Variables

### App Not Loading

1. **Check deployment status** - Should be "Active"
2. **Check logs** for errors
3. **Verify build succeeded** - Green checkmark
4. **Check domain** - Try both Railway domain and custom

---

## Cost Estimate

### Railway Pricing

**Free Tier (Starter):**
- $5 free credit/month
- ~500 hours of runtime
- Perfect for this dashboard!

**Pro Plan ($5/month):**
- $5 credit + $5/month usage
- More resources
- Priority support

**For this dashboard:**
- Estimated cost: **FREE** (stays within free tier)
- Static site uses minimal resources

---

## Update Your Deployment

### Automatic Deploys (Recommended)

Railway auto-deploys when you push to GitHub:

```bash
git add .
git commit -m "Update dashboard"
git push
# Railway automatically deploys! 🚀
```

### Manual Deploy via CLI

```bash
railway up
```

---

## Performance Optimization on Railway

### Enable Gzip Compression

`serve` already includes gzip. Verify with:

```bash
# In serve command, add -c for compression
npx serve -s build -l $PORT -c
```

Update `package.json`:
```json
"serve": "serve -s build -l $PORT -c"
```

### Add Health Check

Create `public/health.json`:
```json
{
  "status": "healthy",
  "timestamp": "2026-01-02"
}
```

Railway can use this for health checks.

---

## Security on Railway

### HTTPS

✅ Railway provides free HTTPS automatically for all domains!

### Environment Variables

✅ Stored securely
✅ Not exposed in logs
✅ Not in Git repository

### Headers

Add security headers by creating `serve.json`:

```json
{
  "headers": [
    {
      "source": "**/*",
      "headers": [
        {
          "key": "X-Content-Type-Options",
          "value": "nosniff"
        },
        {
          "key": "X-Frame-Options",
          "value": "DENY"
        },
        {
          "key": "X-XSS-Protection",
          "value": "1; mode=block"
        }
      ]
    }
  ]
}
```

---

## Backup Strategy

### Database (if using Supabase)
✅ Supabase automatically backs up your data

### Code
✅ Stored in GitHub

### Environment Variables
⚠️ **Save your .env file locally** (don't commit it!)

Backup template:
```bash
# Save locally (not in Git)
cp .env .env.backup.local
```

---

## Complete Deployment Checklist

### Pre-Deployment ✅
- [ ] Code pushed to GitHub
- [ ] Build succeeds locally (`npm run build`)
- [ ] `.env` in `.gitignore`
- [ ] `serve` added to dependencies
- [ ] Start command uses `$PORT`

### Railway Setup ✅
- [ ] Railway account created
- [ ] GitHub connected
- [ ] Project created
- [ ] Environment variables added (if using Supabase)
- [ ] First deployment successful

### Post-Deployment ✅
- [ ] App loads at Railway URL
- [ ] Test adding/editing apps
- [ ] Test PIN authentication
- [ ] Verify localStorage persists
- [ ] Test Supabase sync (if enabled)
- [ ] Custom domain working (if configured)

---

## Railway CLI Quick Reference

```bash
# Login
railway login

# Initialize project
railway init

# Link existing project
railway link

# Deploy
railway up

# View logs
railway logs

# Open dashboard
railway open

# Add variable
railway variables set KEY=value

# List variables
railway variables

# Run command in Railway environment
railway run npm start
```

---

## Example: Complete Railway Deployment

```bash
# 1. Install serve
npm install serve --save

# 2. Update package.json
# Add: "serve": "serve -s build -l $PORT"

# 3. Commit changes
git add .
git commit -m "Add Railway deployment config"
git push

# 4. Deploy to Railway
railway login
railway init
railway link  # or create new project

# 5. Add environment variables (optional)
railway variables set REACT_APP_SUPABASE_URL=your-url
railway variables set REACT_APP_SUPABASE_ANON_KEY=your-key

# 6. Deploy
railway up

# 7. Get URL
railway open
# Copy your URL: https://your-app.up.railway.app
```

---

## Success! 🎉

Your dashboard is now live on Railway!

**Next steps:**
- Share your URL
- Set up custom domain (optional)
- Enable Supabase sync (optional)
- Monitor logs and performance

---

## Support

- **Railway Docs:** https://docs.railway.app
- **Railway Discord:** https://discord.gg/railway
- **Dashboard Issues:** See [TROUBLESHOOTING.md](TROUBLESHOOTING.md)

---

**Deployed!** Your dashboard is now accessible worldwide via Railway. 🚀
