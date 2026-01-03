# Quick Start Guide

## Your Dashboard is Running! 🎉

The application is now live at: **http://localhost:3002**

## Features Overview

### 1. View Modes
- **Grid View**: Click the grid icon (top right) for card-based layout
- **List View**: Click the list icon for detailed table view

### 2. Search & Filter
- Use the search bar (left sidebar) to find apps by name or description
- Click category filters to show only specific app types
- Click "Clear" to reset all filters

### 3. Launch Applications
- **Installed apps**: Click "Launch" button to open the application
- **Not installed**: Click "Install" button (placeholder - customize as needed)

## Customizing Your Dashboard

### Add Your Own Applications

Edit: [src/data/applications.ts](src/data/applications.ts)

```typescript
{
  id: 'unique-id',
  name: 'Your App Name',
  description: 'What your app does',
  type: 'productivity', // Choose category
  url: 'http://localhost:3000', // Launch URL
  color: '#6366f1', // Brand color
  installed: true,
  version: '1.0.0'
}
```

### Available Categories
- `productivity` - Office, planning, task management
- `development` - Code editors, IDEs, dev tools
- `design` - Creative tools, design software
- `communication` - Chat, email, collaboration
- `media` - Music, video, streaming
- `utility` - System tools, utilities
- `database` - Database management tools
- `analytics` - Data analysis, reporting

### Color Scheme (Dark Theme)
The dashboard uses these colors from your Aura app:

```css
Background: #0a0e1a (Dark blue-black)
Surface: #151a2d (Lighter dark blue)
Border: #1e2540 (Subtle borders)
Primary: #6366f1 (Purple accent)
Text: #ffffff (White)
Muted: #8b92b0 (Gray blue)
```

## Development Commands

```bash
# Start development server
npm start

# Create production build
npm run build

# Run tests
npm test
```

## File Structure

```
src/
├── components/         # All UI components
├── data/
│   └── applications.ts # Your app data (EDIT THIS!)
├── types.ts           # TypeScript definitions
└── App.tsx            # Main component
```

## Next Steps

1. **Add your real applications** to `src/data/applications.ts`
2. **Customize colors** in component CSS files if needed
3. **Add more categories** by editing `src/types.ts` and `FilterPanel.tsx`
4. **Implement install functionality** in `AppCard.tsx` and `AppListItem.tsx`
5. **Build for production** with `npm run build` when ready

## Tips

- The dashboard automatically opens apps in new tabs when launched
- Search is case-insensitive and searches both names and descriptions
- You can select multiple category filters simultaneously
- The app count updates automatically based on filters
- Grid view is great for browsing, list view for detailed information

Enjoy your new application launcher! 🚀
