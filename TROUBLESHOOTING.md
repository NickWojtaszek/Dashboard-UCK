# Troubleshooting Guide

## Common Issues and Solutions

### TypeScript Error: "Cannot find module '@supabase/supabase-js'"

**Error:**
```
TS2307: Cannot find module '@supabase/supabase-js' or its corresponding type declarations.
```

**Cause:** Stale or corrupted node_modules

**Solution:**
```bash
# Clean install
rm -rf node_modules package-lock.json
npm install
npm run build
```

**Why this works:** Sometimes node_modules gets into an inconsistent state. A clean reinstall fixes it.

---

### Build Compiles But Still Shows Error in IDE

**Symptom:** VSCode shows red squiggles but `npm run build` succeeds

**Solution:**
1. Reload VSCode window: `Ctrl+Shift+P` → "Developer: Reload Window"
2. Or restart TypeScript server: `Ctrl+Shift+P` → "TypeScript: Restart TS Server"

**Why this works:** IDE TypeScript server sometimes doesn't pick up node_modules changes.

---

### Modal Not Closing After Edit

**Status:** ✅ FIXED

This was fixed in [SettingsPanel.tsx](src/components/SettingsPanel.tsx#L78-L85) using `requestAnimationFrame`.

If you still see this:
1. Clear browser cache
2. Hard reload: `Ctrl+Shift+R`
3. Check you're running latest code

---

### "Supabase not configured" Message

**Status:** ✅ THIS IS NORMAL

The app works perfectly without Supabase. This message means localStorage mode is active.

**To enable Supabase:**
```bash
cp .env.example .env
# Edit .env with your credentials
npm start
```

**To stay in localStorage mode:**
- Do nothing! This is the default and recommended mode.

---

### Data Not Persisting

**Check:**
1. Are you in incognito/private mode? (localStorage is cleared on close)
2. Is localStorage disabled in browser settings?
3. Are you clearing browser data manually?

**Test:**
```javascript
// Open browser console and run:
localStorage.setItem('test', 'works');
localStorage.getItem('test'); // Should return 'works'
```

If this fails, localStorage is disabled or quota exceeded.

---

### Port 3000 Already in Use

**Error:**
```
Something is already running on port 3000.
```

**Solution:**
The app will automatically try port 3002. Just wait for it to start.

**To use a specific port:**
```bash
PORT=3005 npm start
```

---

### npm install Fails

**Errors about permissions or locks:**

**Windows:**
```bash
# Run as Administrator or:
npm cache clean --force
rm -rf node_modules package-lock.json
npm install
```

**Mac/Linux:**
```bash
sudo npm cache clean --force
rm -rf node_modules package-lock.json
npm install
```

---

### Build Size Too Large

**Current size:** 97.21 kB gzipped (excellent!)

**If you see much larger:**
1. Check you're running production build: `npm run build`
2. Not development server: `npm start`

Development builds are larger and unoptimized.

---

### Supabase Sync Not Working

**Check console for:**
- ✓ "Supabase client initialized" - Good!
- ✓ "DataService: Supabase sync enabled" - Good!
- ⚠ Any error messages? Check:

1. **Credentials correct?** Verify `.env` file:
   ```bash
   cat .env
   # Should show your Supabase URL and key
   ```

2. **Database tables created?** Run SQL from [SUPABASE_SETUP.md](SUPABASE_SETUP.md)

3. **RLS policies set?** Check Supabase dashboard → Authentication → Policies

4. **Restarted server?** `.env` changes require restart:
   ```bash
   # Stop server (Ctrl+C)
   npm start
   ```

---

### TypeScript Errors in IDE

**"Property does not exist" or "Type errors":**

**Quick fix:**
```bash
# Reload IDE TypeScript server
# VSCode: Ctrl+Shift+P → "TypeScript: Restart TS Server"
```

**Full fix:**
```bash
rm -rf node_modules package-lock.json
npm install
# Then reload IDE
```

---

### Performance Issues

**App feels slow:**

1. **Check browser console for errors**
2. **Disable browser extensions** (especially ad blockers)
3. **Clear localStorage** if it's huge:
   ```javascript
   // Browser console:
   localStorage.clear();
   // Then refresh page
   ```

4. **Check you're in production build:**
   ```bash
   npm run build
   serve -s build
   ```

---

### Cannot Save to LocalStorage

**Error:** "QuotaExceededError"

**Cause:** localStorage limit is ~5-10 MB

**Solution:**
1. Clear old data:
   ```javascript
   localStorage.removeItem('dashboard_apps');
   localStorage.removeItem('dashboard_categories');
   ```

2. Or enable Supabase to move data to cloud

**Check usage:**
```javascript
// Browser console:
Object.keys(localStorage).map(key => ({
  key,
  size: (localStorage[key].length / 1024).toFixed(2) + ' KB'
}));
```

---

### Dev Server Won't Start

**"Failed to compile" immediately:**

1. **Check for syntax errors** in recent code changes
2. **Clear cache and reinstall:**
   ```bash
   rm -rf node_modules package-lock.json
   npm cache clean --force
   npm install
   npm start
   ```

3. **Check Node version:**
   ```bash
   node --version  # Should be v14+ (v16+ recommended)
   ```

---

### Browser Compatibility

**Tested and working:**
- ✅ Chrome 90+
- ✅ Firefox 88+
- ✅ Safari 14+
- ✅ Edge 90+

**Known issues:**
- ⚠ IE 11: Not supported (React 18 requirement)
- ⚠ Very old browsers: localStorage might not work

---

### Git Issues

**Can't commit `.env` file:**

✅ **This is correct!** `.env` is in `.gitignore` for security.

`.env` contains secrets and should NEVER be committed.

**To share setup:**
- Commit `.env.example` instead (no secrets)
- Others copy `.env.example` to `.env` and add their own credentials

---

### Deployment Issues

**Build succeeds locally but fails in CI/CD:**

1. **Node version mismatch:**
   ```bash
   # In CI/CD, set Node version to match local
   # Example for GitHub Actions:
   - uses: actions/setup-node@v3
     with:
       node-version: '18'
   ```

2. **Environment variables:**
   - Add Supabase env vars to your hosting platform
   - Or just deploy without them (localStorage mode)

3. **Build command:**
   ```bash
   npm ci          # Not npm install (uses lock file)
   npm run build
   ```

---

## Quick Fixes

### The "Turn It Off and On Again" Fix
```bash
# Stop server
# Ctrl+C

# Clean everything
rm -rf node_modules package-lock.json

# Reinstall
npm install

# Restart
npm start
```

### The "Nuclear Option"
```bash
# Delete everything generated
rm -rf node_modules package-lock.json build

# Fresh install
npm install

# Rebuild
npm run build

# Restart
npm start
```

### The "It Works On My Machine" Checklist
- [ ] Same Node version? (`node --version`)
- [ ] Clean install? (`rm -rf node_modules && npm install`)
- [ ] Hard refresh browser? (`Ctrl+Shift+R`)
- [ ] Different browser?
- [ ] Incognito mode?
- [ ] Browser console errors?

---

## Getting Help

### Before Asking

1. **Check console** (F12) for errors
2. **Try clean install** (see above)
3. **Check this file** for your specific error
4. **Review docs:**
   - [SUPABASE_SETUP.md](SUPABASE_SETUP.md)
   - [PRODUCTION_READY.md](PRODUCTION_READY.md)

### When Asking for Help

Include:
1. **Exact error message** (copy-paste, not screenshot)
2. **Steps to reproduce**
3. **What you've tried**
4. **Environment:**
   ```bash
   node --version
   npm --version
   # OS (Windows/Mac/Linux)
   # Browser and version
   ```

---

## Prevention

### Best Practices

1. **Commit package-lock.json** - Ensures consistent installs
2. **Use .env for secrets** - Never commit credentials
3. **Test builds before deploying:**
   ```bash
   npm run build
   # If this works, deployment should work
   ```

4. **Keep dependencies updated:**
   ```bash
   npm outdated  # Check for updates
   # Update cautiously, test after
   ```

---

## Status Check Commands

### Quick Health Check
```bash
# Check all is working:
npm run build && echo "✅ Build OK" || echo "❌ Build failed"
```

### Detailed Check
```bash
# Node version
node --version

# npm version
npm --version

# Dependencies installed?
ls node_modules/@supabase/supabase-js && echo "✅ Supabase installed"

# Build test
npm run build

# Check bundle size
ls -lh build/static/js/main.*.js
```

---

## Recovery Procedures

### Lost All Data

**localStorage cleared:**
- Data is gone if no Supabase sync
- With Supabase: just reload, data syncs back

**Backup manually:**
```javascript
// Browser console:
const backup = {
  apps: localStorage.getItem('dashboard_apps'),
  categories: localStorage.getItem('dashboard_categories'),
  pin: localStorage.getItem('dashboard_pin')
};
console.log(JSON.stringify(backup));
// Copy output and save to file
```

**Restore from backup:**
```javascript
// Paste your backup object, then:
localStorage.setItem('dashboard_apps', backup.apps);
localStorage.setItem('dashboard_categories', backup.categories);
localStorage.setItem('dashboard_pin', backup.pin);
// Refresh page
```

---

## Still Stuck?

If nothing here helps:

1. **Try the Nuclear Option** (delete everything, reinstall)
2. **Check GitHub Issues** (if open source)
3. **Ask with full context** (error, steps, environment)

**Remember:** The app works perfectly in localStorage mode without Supabase. If you're having Supabase issues, you can always disable it and use localStorage only.
