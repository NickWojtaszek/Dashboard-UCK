# Quick Edit Guide

## 🚀 Add an App in 3 Steps

### Step 1: Open the applications file
```
📁 Dashboard/src/data/applications.ts
```

### Step 2: Copy this template and paste at the end

```typescript
{
  id: '13',  // ← Change this to a unique number
  name: 'Your App Name',
  description: 'What your app does',
  type: 'productivity',  // ← Choose a category (see list below)
  url: 'https://your-app-url.com',
  color: '#6366f1',  // ← App's brand color
  installed: true
}
```

### Step 3: Save the file
The dashboard will refresh automatically!

---

## 📝 Categories You Can Use

Just replace the `type` field with one of these:

```typescript
'productivity'      // 📊 Productivity tools
'development'       // 💻 Developer tools
'design'            // 🎨 Design software
'communication'     // 💬 Chat, email, collaboration
'media'             // 🎵 Music, video, streaming
'utility'           // 🔧 System utilities
'database'          // 🗄️ Database tools
'analytics'         // 📈 Analytics, reporting
```

---

## ✏️ Edit an Existing App

Find the app in `applications.ts` and change any field:

```typescript
{
  id: '1',
  name: 'My App',  // ← Change name
  description: 'New description',  // ← Change description
  type: 'development',  // ← Change category
  url: 'http://localhost:8080',  // ← Change URL
  color: '#ff6600',  // ← Change color
  installed: true,  // ← Change to false to show "Install" button
  version: '2.0.0'  // ← Update version
}
```

---

## 🗑️ Remove an App

Find the app and delete the entire block (including commas):

```typescript
// DELETE THIS ENTIRE SECTION ↓
{
  id: '6',
  name: 'Spotify',
  description: 'Music streaming',
  type: 'media',
  url: 'https://open.spotify.com',
  color: '#1db954',
  installed: false
},  // ← Don't forget the comma!
// DELETE UP TO HERE ↑
```

---

## 🎨 Need App Templates?

Check the template file with 50+ ready-to-use apps:

```
📁 Dashboard/src/data/app-templates.ts
```

Just copy an app template, change the ID, and paste it!

**Example apps included:**
- GitHub, VS Code, Docker
- Slack, Teams, Discord
- Figma, Photoshop, Sketch
- MongoDB, PostgreSQL
- Spotify, Netflix
- And 40+ more!

---

## 🔍 Validate Your Changes

Run this command to check for errors:

```bash
npm run validate
```

This checks for:
- ✅ Duplicate IDs
- ✅ Invalid colors
- ✅ Invalid categories
- ✅ URL formats

---

## ➕ Add a New Category

### Step 1: Add to types (`src/types.ts`)

```typescript
export type ApplicationType =
  | 'productivity'
  | 'development'
  | 'finance'      // ← Add your new category
  | 'gaming';      // ← Add another one
```

### Step 2: Add to filters (`src/components/FilterPanel.tsx`)

Find the `appTypes` array and add:

```typescript
const appTypes = [
  // ... existing types ...
  { type: 'finance', label: 'Finance', icon: '💰' },
  { type: 'gaming', label: 'Gaming', icon: '🎮' }
];
```

### Step 3: Use it in your apps!

```typescript
{
  id: '20',
  name: 'QuickBooks',
  type: 'finance',  // ← New category!
  ...
}
```

---

## 🎨 Popular App Colors

Copy these brand colors for common apps:

```
GitHub:        #24292e
Slack:         #4a154b
Discord:       #5865f2
VS Code:       #007acc
Figma:         #f24e1e
Notion:        #000000
Trello:        #0079bf
Spotify:       #1db954
Netflix:       #e50914
YouTube:       #ff0000
Photoshop:     #31a8ff
PostgreSQL:    #336791
MongoDB:       #47a248
Docker:        #2496ed
```

---

## 💡 Pro Tips

1. **Keep IDs unique** - Use sequential numbers: '1', '2', '3'...
2. **Use hex colors** - Format: `#6366f1` (always 6 digits)
3. **Test URLs** - Make sure they work before adding
4. **Group by category** - Add comments to organize large lists
5. **Run validation** - Use `npm run validate` before deploying

---

## 🆘 Common Issues

### "Duplicate ID" error
❌ Problem: Two apps have the same ID
✅ Solution: Make each ID unique

### App doesn't appear
❌ Problem: Syntax error or missing comma
✅ Solution: Check for missing commas between apps

### Filter doesn't work
❌ Problem: Category not added to FilterPanel
✅ Solution: Add category to both `types.ts` AND `FilterPanel.tsx`

### Colors look wrong
❌ Problem: Invalid hex format
✅ Solution: Use format `#6366f1` (must have # and 6 digits)

---

## 📖 Full Documentation

For detailed instructions, see:
- [MANAGING_APPS.md](MANAGING_APPS.md) - Complete guide
- [README.md](README.md) - Project overview
- [src/data/app-templates.ts](src/data/app-templates.ts) - Ready-to-use templates

---

## ⚡ Quick Commands

```bash
npm start              # Start the dashboard
npm run validate       # Check for errors
npm run build          # Build for production
```

Happy customizing! 🎉
