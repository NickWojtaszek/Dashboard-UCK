# Dashboard Cheat Sheet

Quick reference for common tasks.

---

## 📂 Key Files to Edit

```
src/data/applications.ts          ← Add/remove/edit apps
src/types.ts                      ← Add new categories (step 1)
src/components/FilterPanel.tsx    ← Add new categories (step 2)
src/data/app-templates.ts         ← Copy pre-made app templates
```

---

## ➕ Add an App (30 seconds)

1. Open `src/data/applications.ts`
2. Copy this at the end of the array:

```typescript
{
  id: '13',  // Make unique!
  name: 'GitHub',
  description: 'Code hosting',
  type: 'development',
  url: 'https://github.com',
  color: '#24292e',
  installed: true
}
```

3. Save → Dashboard auto-updates! ✅

---

## 🗑️ Remove an App

1. Open `src/data/applications.ts`
2. Find the app
3. Delete from `{` to `},` (including comma)
4. Save

---

## 🎨 Change Category Color

1. Open `src/data/applications.ts`
2. Find the `color` field
3. Change to any hex color: `#6366f1`

### Popular colors:
```
Purple:  #6366f1    Green:   #10b981
Blue:    #3b82f6    Orange:  #f97316
Red:     #ef4444    Yellow:  #eab308
Pink:    #ec4899    Gray:    #6b7280
```

---

## 📁 Add a New Category

### File 1: `src/types.ts`
```typescript
export type ApplicationType =
  | 'productivity'
  | 'finance';  // ← Add this line
```

### File 2: `src/components/FilterPanel.tsx`
```typescript
const appTypes = [
  // ... existing types ...
  { type: 'finance', label: 'Finance', icon: '💰' }  // ← Add this line
];
```

### Now use it:
```typescript
{ type: 'finance', ... }
```

---

## 🔍 Validate Your Changes

```bash
npm run validate
```

Checks for:
- Duplicate IDs ✅
- Invalid colors ✅
- Invalid categories ✅
- Bad URL formats ✅

---

## 📋 App Template

```typescript
{
  id: 'UNIQUE_ID',
  name: 'App Name',
  description: 'Short description',
  type: 'productivity',  // See categories below
  url: 'https://example.com',
  color: '#6366f1',
  installed: true,  // or false
  version: '1.0.0'  // optional
}
```

---

## 📊 All Categories

```typescript
'productivity'      // 📊
'development'       // 💻
'design'            // 🎨
'communication'     // 💬
'media'             // 🎵
'utility'           // 🔧
'database'          // 🗄️
'analytics'         // 📈
```

---

## 🎯 Common URL Formats

```typescript
// Web apps
url: 'https://github.com'

// Local dev
url: 'http://localhost:3000'

// Desktop apps
url: 'vscode://'
url: 'slack://'
url: 'spotify://'

// Database
url: 'postgresql://localhost:5432'
```

---

## 🔥 Hot Tips

1. **Keep IDs sequential**: '1', '2', '3'...
2. **Use hex colors**: `#6366f1` (6 digits + #)
3. **Add comments**: Organize with `// =====`
4. **Check templates**: `src/data/app-templates.ts`
5. **Validate often**: `npm run validate`

---

## 🚀 Commands

```bash
npm start           # Start dashboard
npm run validate    # Check for errors
npm run build       # Build for production
```

---

## 🆘 Troubleshooting

**App doesn't show up?**
- Check for syntax errors
- Make sure ID is unique
- Verify commas between apps

**Filter not working?**
- Add category to `types.ts`
- Add category to `FilterPanel.tsx`
- Both files must match!

**Color looks wrong?**
- Use format: `#6366f1`
- Must have # and exactly 6 characters

---

## 📖 Full Guides

- [QUICK_EDIT_GUIDE.md](QUICK_EDIT_GUIDE.md) - Step-by-step tutorials
- [MANAGING_APPS.md](MANAGING_APPS.md) - Complete documentation
- [EXAMPLES.md](EXAMPLES.md) - Real-world examples
- [README.md](README.md) - Project overview

---

## ⚡ One-Liners

**Add app from template:**
1. Open `src/data/app-templates.ts`
2. Copy an app
3. Paste in `applications.ts`
4. Change ID
5. Save!

**Change all colors to purple:**
Replace all `color:` values with `#6366f1`

**Remove all sample apps:**
Delete everything in `applications.ts` array, keep `export const applications: Application[] = [];`

---

## 🎨 Emoji Icons

Use these in FilterPanel.tsx:

```
Business: 📊 📈 📉 💼 💰 💳
Tech:     💻 🖥️ ⚙️ 🔧 🛠️ ⚡
Creative: 🎨 🖌️ 📐 🎬 📷 🖼️
Social:   💬 📧 📞 👥 🗣️ ❤️
Data:     🗄️ 📊 📈 🔍 💾 📉
Media:    🎵 🎮 🎬 📺 🎧 📻
Learn:    📚 🎓 📖 ✏️ 🧑‍🎓 🏫
Health:   🏥 💊 🩺 ❤️ 🧬 💉
```

---

Print this and keep it handy! 📌
