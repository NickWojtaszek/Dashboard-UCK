# Managing Applications & Categories

This guide shows you how to add, remove, and customize applications and categories in your dashboard.

## Table of Contents
1. [Adding Applications](#adding-applications)
2. [Removing Applications](#removing-applications)
3. [Modifying Applications](#modifying-applications)
4. [Adding Categories](#adding-categories)
5. [Removing Categories](#removing-categories)
6. [Category Icons](#category-icons)

---

## Adding Applications

### Step 1: Open the applications file
Edit: `src/data/applications.ts`

### Step 2: Add a new application object to the array

```typescript
{
  id: '13',  // Must be unique! Increment from the last one
  name: 'GitHub',
  description: 'Code hosting and collaboration platform',
  type: 'development',  // Choose from available categories
  url: 'https://github.com',
  color: '#24292e',  // Hex color for the app's brand
  installed: true,  // true = shows "Launch", false = shows "Install"
  version: '1.0.0',  // Optional - app version
  lastUsed: new Date('2024-01-15')  // Optional - last usage date
}
```

### Example: Adding Multiple Apps at Once

```typescript
export const applications: Application[] = [
  // ... existing apps ...

  // Add your new apps here:
  {
    id: '13',
    name: 'GitHub',
    description: 'Code hosting and collaboration',
    type: 'development',
    url: 'https://github.com',
    color: '#24292e',
    installed: true
  },
  {
    id: '14',
    name: 'Trello',
    description: 'Project management boards',
    type: 'productivity',
    url: 'https://trello.com',
    color: '#0079bf',
    installed: false
  },
  {
    id: '15',
    name: 'MongoDB Compass',
    description: 'MongoDB GUI client',
    type: 'database',
    url: 'mongodb-compass://',
    color: '#47a248',
    installed: true,
    version: '1.40.0'
  }
];
```

### Field Descriptions

| Field | Required | Description | Example |
|-------|----------|-------------|---------|
| `id` | ✅ Yes | Unique identifier (string) | `'13'` |
| `name` | ✅ Yes | Application name | `'GitHub'` |
| `description` | ✅ Yes | Short description | `'Code hosting platform'` |
| `type` | ✅ Yes | Category (see categories below) | `'development'` |
| `url` | ✅ Yes | Launch URL or protocol | `'https://github.com'` |
| `color` | ✅ Yes | Hex color code | `'#24292e'` |
| `installed` | ❌ No | Installation status (default: false) | `true` |
| `version` | ❌ No | Version string | `'1.0.0'` |
| `lastUsed` | ❌ No | Last usage date | `new Date('2024-01-15')` |

---

## Removing Applications

### Method 1: Delete the entire object

Find the application in `src/data/applications.ts` and delete it:

```typescript
// BEFORE
{
  id: '6',
  name: 'Spotify',
  description: 'Music streaming service',
  type: 'media',
  url: 'https://open.spotify.com',
  color: '#1db954',
  installed: false
},  // ← Delete from here to the comma

// AFTER - application removed
```

### Method 2: Comment it out (to keep for later)

```typescript
/*
{
  id: '6',
  name: 'Spotify',
  description: 'Music streaming service',
  type: 'media',
  url: 'https://open.spotify.com',
  color: '#1db954',
  installed: false
},
*/
```

---

## Modifying Applications

Simply edit the fields you want to change:

```typescript
{
  id: '1',
  name: 'Radiology OnCall Scheduler',
  description: 'Schedule and manage radiology on-call shifts',
  type: 'productivity',
  url: 'http://localhost:3001',  // ← Change URL
  color: '#8b5cf6',  // ← Change color
  installed: true,
  version: '2.0.0',  // ← Update version
}
```

---

## Adding Categories

### Step 1: Add to TypeScript types

Edit: `src/types.ts`

```typescript
export type ApplicationType =
  | 'productivity'
  | 'development'
  | 'design'
  | 'communication'
  | 'media'
  | 'utility'
  | 'database'
  | 'analytics'
  | 'finance'       // ← Add new category
  | 'health'        // ← Add new category
  | 'education';    // ← Add new category
```

### Step 2: Add to filter panel

Edit: `src/components/FilterPanel.tsx`

Find the `appTypes` array and add your new categories:

```typescript
const appTypes: { type: ApplicationType; label: string; icon: string }[] = [
  { type: 'productivity', label: 'Productivity', icon: '📊' },
  { type: 'development', label: 'Development', icon: '💻' },
  { type: 'design', label: 'Design', icon: '🎨' },
  { type: 'communication', label: 'Communication', icon: '💬' },
  { type: 'media', label: 'Media', icon: '🎵' },
  { type: 'utility', label: 'Utility', icon: '🔧' },
  { type: 'database', label: 'Database', icon: '🗄️' },
  { type: 'analytics', label: 'Analytics', icon: '📈' },

  // Add your new categories here:
  { type: 'finance', label: 'Finance', icon: '💰' },
  { type: 'health', label: 'Health', icon: '🏥' },
  { type: 'education', label: 'Education', icon: '📚' }
];
```

### Step 3: Use the new category

Now you can use the new category in your applications:

```typescript
{
  id: '16',
  name: 'QuickBooks',
  description: 'Accounting software',
  type: 'finance',  // ← New category!
  url: 'https://quickbooks.intuit.com',
  color: '#2ca01c',
  installed: true
}
```

---

## Removing Categories

### Step 1: Remove from TypeScript types

Edit: `src/types.ts`

```typescript
export type ApplicationType =
  | 'productivity'
  | 'development'
  | 'design'
  | 'communication'
  // | 'media'  // ← Comment out or delete
  | 'utility'
  | 'database'
  | 'analytics';
```

### Step 2: Remove from filter panel

Edit: `src/components/FilterPanel.tsx`

```typescript
const appTypes: { type: ApplicationType; label: string; icon: string }[] = [
  { type: 'productivity', label: 'Productivity', icon: '📊' },
  { type: 'development', label: 'Development', icon: '💻' },
  { type: 'design', label: 'Design', icon: '🎨' },
  { type: 'communication', label: 'Communication', icon: '💬' },
  // { type: 'media', label: 'Media', icon: '🎵' },  // ← Remove this line
  { type: 'utility', label: 'Utility', icon: '🔧' },
  { type: 'database', label: 'Database', icon: '🗄️' },
  { type: 'analytics', label: 'Analytics', icon: '📈' }
];
```

### Step 3: Update affected applications

Change or remove any apps that used the deleted category:

```typescript
// BEFORE
{
  id: '6',
  name: 'Spotify',
  type: 'media',  // ← This category no longer exists!
  ...
}

// AFTER - Change to a different category
{
  id: '6',
  name: 'Spotify',
  type: 'utility',  // ← Changed to existing category
  ...
}
```

---

## Category Icons

You can use any emoji as category icons. Here are some suggestions:

### Business & Productivity
- 📊 Charts/Analytics
- 📈 Trending/Growth
- 📝 Notes/Writing
- 📅 Calendar
- ✅ Tasks/Todos
- 💼 Business

### Development & Tech
- 💻 Computer/Development
- 🖥️ Desktop
- ⚙️ Settings/Config
- 🔧 Tools/Utilities
- 🛠️ Build Tools
- 🔌 Plugins
- ⚡ Performance
- 🚀 Deploy/Launch

### Creative & Design
- 🎨 Art/Design
- 🖌️ Drawing
- 📐 Layout/Geometry
- 🎬 Video
- 📷 Photography
- 🖼️ Images

### Communication
- 💬 Chat/Messaging
- 📧 Email
- 📞 Phone/Calls
- 👥 Team/Collaboration
- 🗣️ Voice

### Data & Analytics
- 🗄️ Database
- 📊 Analytics
- 📈 Metrics
- 🔍 Search
- 📉 Reports

### Finance
- 💰 Money/Finance
- 💳 Payments
- 💵 Currency
- 📊 Financial Analytics
- 🏦 Banking

### Health & Medical
- 🏥 Hospital/Medical
- 💊 Medicine
- 🩺 Healthcare
- ❤️ Health
- 🧬 Science/Bio

### Education
- 📚 Books/Learning
- 🎓 Education
- 📖 Reading
- ✏️ Study
- 🧑‍🎓 Student

### Media & Entertainment
- 🎵 Music
- 🎮 Gaming
- 🎬 Movies
- 📺 TV/Video
- 🎧 Audio

### Security
- 🔒 Security/Lock
- 🔐 Encryption
- 🛡️ Protection
- 🔑 Keys/Auth

---

## Tips & Best Practices

### 1. Keep IDs Sequential
```typescript
// Good
{ id: '1', ... },
{ id: '2', ... },
{ id: '3', ... }

// Also fine (but keep consistent)
{ id: 'app-001', ... },
{ id: 'app-002', ... },
{ id: 'app-003', ... }
```

### 2. Use Meaningful Colors
- Match the app's brand color when possible
- Use online tools like [brand colors](https://brandcolors.net) to find official colors
- Use [color picker](https://htmlcolorcodes.com/color-picker/) if needed

### 3. Write Clear Descriptions
```typescript
// Good - Concise and descriptive
description: 'Code hosting and collaboration platform'

// Too vague
description: 'A tool for developers'

// Too long
description: 'A comprehensive platform for hosting code repositories with built-in collaboration tools'
```

### 4. URL Formats
```typescript
// Web apps
url: 'https://app.example.com'

// Local apps
url: 'http://localhost:3000'

// Desktop app protocols
url: 'vscode://file'
url: 'slack://'
url: 'spotify://'

// File paths (Windows)
url: 'file:///C:/Program%20Files/MyApp/app.exe'
```

### 5. Organizing Large App Lists
Group apps by category in your file for easier management:

```typescript
export const applications: Application[] = [
  // ===== PRODUCTIVITY =====
  { id: '1', name: 'Notion', type: 'productivity', ... },
  { id: '2', name: 'Trello', type: 'productivity', ... },

  // ===== DEVELOPMENT =====
  { id: '3', name: 'VS Code', type: 'development', ... },
  { id: '4', name: 'GitHub', type: 'development', ... },

  // ===== DESIGN =====
  { id: '5', name: 'Figma', type: 'design', ... },
  { id: '6', name: 'Photoshop', type: 'design', ... },
];
```

---

## Quick Reference: Complete Example

Here's a complete example showing how to add a new category and apps:

### 1. Add category type (`src/types.ts`)
```typescript
export type ApplicationType =
  | 'productivity'
  | 'development'
  | 'gaming';  // ← New category
```

### 2. Add to filter (`src/components/FilterPanel.tsx`)
```typescript
const appTypes = [
  // ... existing types ...
  { type: 'gaming', label: 'Gaming', icon: '🎮' }  // ← New filter
];
```

### 3. Add apps (`src/data/applications.ts`)
```typescript
{
  id: '16',
  name: 'Steam',
  description: 'Gaming platform and store',
  type: 'gaming',  // ← Using new category
  url: 'steam://',
  color: '#1b2838',
  installed: true,
  version: '1.0.0'
}
```

The dashboard will automatically update when you save! 🎉

---

## Need Help?

- Changes not showing? Make sure the dev server is running (`npm start`)
- TypeScript errors? Check that your category exists in `types.ts`
- App not launching? Verify the URL format is correct
- Want to reset? Delete `src/data/applications.ts` and restore from the original

Happy customizing! 🚀
