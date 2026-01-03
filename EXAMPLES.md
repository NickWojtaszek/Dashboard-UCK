# Practical Examples

Real-world examples of common edits you'll make to your dashboard.

---

## Example 1: Add Your Local Development Apps

**Scenario:** You have local apps running on different ports and want to add them to the dashboard.

### Before (src/data/applications.ts):
```typescript
export const applications: Application[] = [
  {
    id: '1',
    name: 'Radiology OnCall Scheduler',
    description: 'Schedule and manage radiology on-call shifts',
    type: 'productivity',
    url: 'http://localhost:3001',
    color: '#6366f1',
    installed: true
  }
  // Last app above
];
```

### After:
```typescript
export const applications: Application[] = [
  {
    id: '1',
    name: 'Radiology OnCall Scheduler',
    description: 'Schedule and manage radiology on-call shifts',
    type: 'productivity',
    url: 'http://localhost:3001',
    color: '#6366f1',
    installed: true
  },

  // ===== YOUR LOCAL APPS =====
  {
    id: '13',
    name: 'Admin Dashboard',
    description: 'Internal admin panel',
    type: 'productivity',
    url: 'http://localhost:3000',
    color: '#10b981',
    installed: true,
    version: '1.0.0'
  },
  {
    id: '14',
    name: 'API Server',
    description: 'Backend REST API',
    type: 'development',
    url: 'http://localhost:8080',
    color: '#f59e0b',
    installed: true,
    version: '2.3.1'
  },
  {
    id: '15',
    name: 'Database Admin',
    description: 'PostgreSQL admin interface',
    type: 'database',
    url: 'http://localhost:5050',
    color: '#336791',
    installed: true
  }
];
```

---

## Example 2: Change Color Scheme

**Scenario:** You want all your apps to match a specific color theme.

### Before:
```typescript
{
  id: '1',
  name: 'Radiology OnCall Scheduler',
  color: '#6366f1',  // Purple
  ...
},
{
  id: '2',
  name: 'VS Code',
  color: '#007acc',  // Blue
  ...
}
```

### After (Green theme):
```typescript
{
  id: '1',
  name: 'Radiology OnCall Scheduler',
  color: '#10b981',  // Green
  ...
},
{
  id: '2',
  name: 'VS Code',
  color: '#059669',  // Darker green
  ...
}
```

---

## Example 3: Add a Complete Category

**Scenario:** You're a game developer and want to add gaming tools.

### Step 1: Add type (src/types.ts)
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
  | 'gaming';  // ← Add this
```

### Step 2: Add filter (src/components/FilterPanel.tsx)
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
  { type: 'gaming', label: 'Gaming', icon: '🎮' }  // ← Add this
];
```

### Step 3: Add gaming apps (src/data/applications.ts)
```typescript
export const applications: Application[] = [
  // ... existing apps ...

  // ===== GAMING TOOLS =====
  {
    id: '13',
    name: 'Unity',
    description: 'Game development engine',
    type: 'gaming',
    url: 'unity://',
    color: '#000000',
    installed: true,
    version: '2023.1'
  },
  {
    id: '14',
    name: 'Unreal Engine',
    description: 'Advanced game engine',
    type: 'gaming',
    url: 'unrealengine://',
    color: '#0e0e0e',
    installed: true,
    version: '5.3'
  },
  {
    id: '15',
    name: 'Steam',
    description: 'Gaming platform',
    type: 'gaming',
    url: 'steam://',
    color: '#1b2838',
    installed: true
  },
  {
    id: '16',
    name: 'Discord',
    description: 'Gaming communication',
    type: 'gaming',
    url: 'https://discord.com/app',
    color: '#5865f2',
    installed: true
  }
];
```

---

## Example 4: Replace Sample Apps with Your Real Apps

**Scenario:** Remove all sample apps and add only your actual applications.

### Before (12 sample apps):
```typescript
export const applications: Application[] = [
  { id: '1', name: 'Radiology OnCall Scheduler', ... },
  { id: '2', name: 'VS Code', ... },
  { id: '3', name: 'Figma', ... },
  { id: '4', name: 'Slack', ... },
  { id: '5', name: 'Notion', ... },
  { id: '6', name: 'Spotify', ... },
  { id: '7', name: 'PostgreSQL', ... },
  { id: '8', name: 'Postman', ... },
  { id: '9', name: 'Discord', ... },
  { id: '10', name: 'Adobe Photoshop', ... },
  { id: '11', name: 'TablePlus', ... },
  { id: '12', name: 'Google Analytics', ... }
];
```

### After (Your actual apps):
```typescript
import { Application } from '../types';

export const applications: Application[] = [
  // ===== WORK APPLICATIONS =====
  {
    id: '1',
    name: 'Company Portal',
    description: 'Internal employee portal',
    type: 'productivity',
    url: 'https://portal.company.com',
    color: '#3b82f6',
    installed: true
  },
  {
    id: '2',
    name: 'CRM System',
    description: 'Customer relationship management',
    type: 'productivity',
    url: 'https://crm.company.com',
    color: '#8b5cf6',
    installed: true
  },
  {
    id: '3',
    name: 'Project Tracker',
    description: 'Jira project management',
    type: 'productivity',
    url: 'https://jira.company.com',
    color: '#0052cc',
    installed: true
  },

  // ===== DEVELOPMENT TOOLS =====
  {
    id: '4',
    name: 'GitHub Repos',
    description: 'Source code repositories',
    type: 'development',
    url: 'https://github.com/yourorg',
    color: '#24292e',
    installed: true
  },
  {
    id: '5',
    name: 'CI/CD Pipeline',
    description: 'Jenkins build server',
    type: 'development',
    url: 'https://jenkins.company.com',
    color: '#d24939',
    installed: true
  },

  // ===== COMMUNICATION =====
  {
    id: '6',
    name: 'Teams',
    description: 'Microsoft Teams',
    type: 'communication',
    url: 'https://teams.microsoft.com',
    color: '#6264a7',
    installed: true
  },
  {
    id: '7',
    name: 'Email',
    description: 'Outlook web',
    type: 'communication',
    url: 'https://outlook.office.com',
    color: '#0078d4',
    installed: true
  }
];
```

---

## Example 5: Update App Versions After Updates

**Scenario:** You updated some apps and want to reflect the new versions.

### Before:
```typescript
{
  id: '1',
  name: 'Radiology OnCall Scheduler',
  version: '1.0.0',  // Old version
  installed: true
},
{
  id: '2',
  name: 'VS Code',
  version: '1.85.0',  // Old version
  installed: true
}
```

### After:
```typescript
{
  id: '1',
  name: 'Radiology OnCall Scheduler',
  version: '2.1.0',  // ← Updated
  installed: true,
  lastUsed: new Date('2024-01-15')  // ← Optional: track usage
},
{
  id: '2',
  name: 'VS Code',
  version: '1.86.2',  // ← Updated
  installed: true,
  lastUsed: new Date('2024-01-15')
}
```

---

## Example 6: Mark Apps as Not Installed

**Scenario:** You want to track apps you might want to install later.

### Apps You Have:
```typescript
{
  id: '1',
  name: 'Slack',
  installed: true,  // You have this
  ...
}
```

### Apps You Want:
```typescript
{
  id: '2',
  name: 'Discord',
  installed: false,  // You want to install this
  ...
},
{
  id: '3',
  name: 'Notion',
  installed: false,  // You want to install this
  ...
}
```

The dashboard will show:
- ✅ **Installed apps** → "Launch" button (green)
- ⬇️ **Not installed apps** → "Install" button (gray)

---

## Example 7: Organize by Team/Department

**Scenario:** Multiple teams share the dashboard.

```typescript
export const applications: Application[] = [
  // ===== ENGINEERING TEAM =====
  {
    id: '1',
    name: 'GitHub',
    description: 'Code repositories',
    type: 'development',
    url: 'https://github.com',
    color: '#24292e',
    installed: true
  },
  {
    id: '2',
    name: 'Jenkins',
    description: 'CI/CD Pipeline',
    type: 'development',
    url: 'https://jenkins.company.com',
    color: '#d24939',
    installed: true
  },

  // ===== DESIGN TEAM =====
  {
    id: '3',
    name: 'Figma',
    description: 'Design collaboration',
    type: 'design',
    url: 'https://figma.com',
    color: '#f24e1e',
    installed: true
  },
  {
    id: '4',
    name: 'Adobe Creative Cloud',
    description: 'Design suite',
    type: 'design',
    url: 'https://adobe.com',
    color: '#ff0000',
    installed: true
  },

  // ===== MARKETING TEAM =====
  {
    id: '5',
    name: 'Google Analytics',
    description: 'Website analytics',
    type: 'analytics',
    url: 'https://analytics.google.com',
    color: '#f9ab00',
    installed: true
  },
  {
    id: '6',
    name: 'Mailchimp',
    description: 'Email campaigns',
    type: 'communication',
    url: 'https://mailchimp.com',
    color: '#ffe01b',
    installed: true
  },

  // ===== SHARED TOOLS =====
  {
    id: '7',
    name: 'Slack',
    description: 'Team communication',
    type: 'communication',
    url: 'https://slack.com',
    color: '#4a154b',
    installed: true
  }
];
```

---

## Example 8: Different Environments

**Scenario:** Track dev, staging, and production instances.

```typescript
export const applications: Application[] = [
  // ===== DEVELOPMENT =====
  {
    id: '1',
    name: 'App (Dev)',
    description: 'Development environment',
    type: 'development',
    url: 'http://localhost:3000',
    color: '#10b981',  // Green for dev
    installed: true,
    version: '1.0.0-dev'
  },

  // ===== STAGING =====
  {
    id: '2',
    name: 'App (Staging)',
    description: 'Staging environment',
    type: 'development',
    url: 'https://staging.company.com',
    color: '#f59e0b',  // Yellow for staging
    installed: true,
    version: '1.0.0-beta'
  },

  // ===== PRODUCTION =====
  {
    id: '3',
    name: 'App (Production)',
    description: 'Live production app',
    type: 'productivity',
    url: 'https://app.company.com',
    color: '#ef4444',  // Red for production
    installed: true,
    version: '1.0.0'
  }
];
```

---

## Tips from These Examples

1. **Use comments** (`// =====`) to organize sections
2. **Sequential IDs** keep things simple ('1', '2', '3'...)
3. **Descriptive names** help identify apps quickly
4. **Consistent colors** create visual groupings
5. **Version tracking** helps monitor updates
6. **installed: false** creates a wishlist

---

## Quick Copy-Paste Templates

### Web App
```typescript
{
  id: 'CHANGE_ME',
  name: 'App Name',
  description: 'What it does',
  type: 'productivity',
  url: 'https://example.com',
  color: '#6366f1',
  installed: true
}
```

### Local Development
```typescript
{
  id: 'CHANGE_ME',
  name: 'Local App',
  description: 'Development server',
  type: 'development',
  url: 'http://localhost:3000',
  color: '#10b981',
  installed: true,
  version: '1.0.0'
}
```

### Desktop App
```typescript
{
  id: 'CHANGE_ME',
  name: 'Desktop App',
  description: 'Native application',
  type: 'utility',
  url: 'appname://',
  color: '#8b5cf6',
  installed: true,
  version: '2.0.0'
}
```

---

Need more help? Check [MANAGING_APPS.md](MANAGING_APPS.md) for the complete guide!
