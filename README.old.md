# App Launcher Dashboard

A modern, dark-themed React application dashboard for managing and launching your applications. Built with TypeScript and designed to match the Aura color scheme.

## Features

- **Grid & List Views**: Toggle between grid cards and detailed list view
- **Smart Filtering**: Filter applications by category/type
- **Real-time Search**: Instantly search across app names and descriptions
- **Application Categories**: Organize apps by type (productivity, development, design, etc.)
- **Status Tracking**: See which apps are installed vs. available
- **Version Management**: Track application versions
- **Launch Integration**: Click to launch installed applications
- **Responsive Design**: Works on desktop, tablet, and mobile devices

## Installation

1. Install dependencies:
```bash
npm install
```

2. Start the development server:
```bash
npm start
```

3. Open [http://localhost:3000](http://localhost:3000) in your browser

## Project Structure

```
src/
├── components/          # React components
│   ├── Header.tsx      # Top navigation bar
│   ├── SearchBar.tsx   # Search input
│   ├── FilterPanel.tsx # Category filters
│   ├── AppGrid.tsx     # Grid view container
│   ├── AppCard.tsx     # Individual app card (grid)
│   ├── AppList.tsx     # List view container
│   └── AppListItem.tsx # Individual app row (list)
├── data/
│   └── applications.ts # Application data
├── types.ts            # TypeScript type definitions
├── App.tsx             # Main application component
└── index.tsx           # Application entry point
```

## Adding New Applications

Edit `src/data/applications.ts` to add new applications:

```typescript
{
  id: 'unique-id',
  name: 'App Name',
  description: 'App description',
  type: 'productivity', // or other category
  url: 'https://app-url.com',
  color: '#6366f1', // hex color for branding
  installed: true,
  version: '1.0.0'
}
```

## Customization

### Color Scheme

The app uses a dark theme matching the Aura design:
- Background: `#0a0e1a`
- Surface: `#151a2d`
- Border: `#1e2540`
- Primary: `#6366f1`
- Text: `#ffffff`
- Muted Text: `#8b92b0`

### Application Categories

Available categories:
- productivity
- development
- design
- communication
- media
- utility
- database
- analytics

Add more categories by updating the `ApplicationType` in `src/types.ts` and the filter list in `FilterPanel.tsx`.

## Building for Production

```bash
npm run build
```

This creates an optimized production build in the `build/` folder.

## Technologies Used

- React 18
- TypeScript
- Lucide React (icons)
- CSS3 (custom styling)

## License

MIT
