/**
 * Application Templates
 *
 * Copy these templates to quickly add common applications to your dashboard.
 * Simply copy the object, change the ID to be unique, and paste into applications.ts
 */

import { Application } from '../types';

// ===== PRODUCTIVITY APPS =====

export const productivityTemplates = [
  {
    id: 'CHANGE_ME',
    name: 'Notion',
    description: 'All-in-one workspace for notes and docs',
    type: 'productivity' as const,
    url: 'https://notion.so',
    color: '#000000',
    installed: false
  },
  {
    id: 'CHANGE_ME',
    name: 'Trello',
    description: 'Visual project management boards',
    type: 'productivity' as const,
    url: 'https://trello.com',
    color: '#0079bf',
    installed: false
  },
  {
    id: 'CHANGE_ME',
    name: 'Asana',
    description: 'Team task and project management',
    type: 'productivity' as const,
    url: 'https://app.asana.com',
    color: '#f06a6a',
    installed: false
  },
  {
    id: 'CHANGE_ME',
    name: 'Monday.com',
    description: 'Work operating system',
    type: 'productivity' as const,
    url: 'https://monday.com',
    color: '#ff3d57',
    installed: false
  },
  {
    id: 'CHANGE_ME',
    name: 'Todoist',
    description: 'Task manager and to-do list',
    type: 'productivity' as const,
    url: 'https://todoist.com',
    color: '#e44332',
    installed: false
  }
];

// ===== DEVELOPMENT APPS =====

export const developmentTemplates = [
  {
    id: 'CHANGE_ME',
    name: 'VS Code',
    description: 'Code editor for developers',
    type: 'development' as const,
    url: 'vscode://',
    color: '#007acc',
    installed: false
  },
  {
    id: 'CHANGE_ME',
    name: 'GitHub',
    description: 'Code hosting and collaboration',
    type: 'development' as const,
    url: 'https://github.com',
    color: '#24292e',
    installed: false
  },
  {
    id: 'CHANGE_ME',
    name: 'GitLab',
    description: 'DevOps platform',
    type: 'development' as const,
    url: 'https://gitlab.com',
    color: '#fc6d26',
    installed: false
  },
  {
    id: 'CHANGE_ME',
    name: 'Postman',
    description: 'API development and testing',
    type: 'development' as const,
    url: 'https://postman.com',
    color: '#ff6c37',
    installed: false
  },
  {
    id: 'CHANGE_ME',
    name: 'Docker',
    description: 'Container platform',
    type: 'development' as const,
    url: 'https://docker.com',
    color: '#2496ed',
    installed: false
  },
  {
    id: 'CHANGE_ME',
    name: 'IntelliJ IDEA',
    description: 'Java IDE by JetBrains',
    type: 'development' as const,
    url: 'idea://',
    color: '#000000',
    installed: false
  },
  {
    id: 'CHANGE_ME',
    name: 'JetBrains Rider',
    description: '.NET IDE',
    type: 'development' as const,
    url: 'rider://',
    color: '#c90f5e',
    installed: false
  }
];

// ===== DESIGN APPS =====

export const designTemplates = [
  {
    id: 'CHANGE_ME',
    name: 'Figma',
    description: 'Collaborative design tool',
    type: 'design' as const,
    url: 'https://figma.com',
    color: '#f24e1e',
    installed: false
  },
  {
    id: 'CHANGE_ME',
    name: 'Adobe Photoshop',
    description: 'Image editing software',
    type: 'design' as const,
    url: 'photoshop://',
    color: '#31a8ff',
    installed: false
  },
  {
    id: 'CHANGE_ME',
    name: 'Adobe Illustrator',
    description: 'Vector graphics editor',
    type: 'design' as const,
    url: 'illustrator://',
    color: '#ff9a00',
    installed: false
  },
  {
    id: 'CHANGE_ME',
    name: 'Sketch',
    description: 'Digital design toolkit',
    type: 'design' as const,
    url: 'sketch://',
    color: '#f7b500',
    installed: false
  },
  {
    id: 'CHANGE_ME',
    name: 'Canva',
    description: 'Graphic design platform',
    type: 'design' as const,
    url: 'https://canva.com',
    color: '#00c4cc',
    installed: false
  },
  {
    id: 'CHANGE_ME',
    name: 'Adobe XD',
    description: 'UX/UI design and prototyping',
    type: 'design' as const,
    url: 'xd://',
    color: '#ff61f6',
    installed: false
  }
];

// ===== COMMUNICATION APPS =====

export const communicationTemplates = [
  {
    id: 'CHANGE_ME',
    name: 'Slack',
    description: 'Team communication platform',
    type: 'communication' as const,
    url: 'https://slack.com/signin',
    color: '#4a154b',
    installed: false
  },
  {
    id: 'CHANGE_ME',
    name: 'Discord',
    description: 'Voice, video and text chat',
    type: 'communication' as const,
    url: 'https://discord.com/app',
    color: '#5865f2',
    installed: false
  },
  {
    id: 'CHANGE_ME',
    name: 'Microsoft Teams',
    description: 'Business communication platform',
    type: 'communication' as const,
    url: 'https://teams.microsoft.com',
    color: '#6264a7',
    installed: false
  },
  {
    id: 'CHANGE_ME',
    name: 'Zoom',
    description: 'Video conferencing',
    type: 'communication' as const,
    url: 'https://zoom.us',
    color: '#2d8cff',
    installed: false
  },
  {
    id: 'CHANGE_ME',
    name: 'Gmail',
    description: 'Email service',
    type: 'communication' as const,
    url: 'https://mail.google.com',
    color: '#ea4335',
    installed: false
  },
  {
    id: 'CHANGE_ME',
    name: 'Telegram',
    description: 'Cloud-based messaging',
    type: 'communication' as const,
    url: 'https://web.telegram.org',
    color: '#0088cc',
    installed: false
  }
];

// ===== DATABASE APPS =====

export const databaseTemplates = [
  {
    id: 'CHANGE_ME',
    name: 'PostgreSQL',
    description: 'Open source relational database',
    type: 'database' as const,
    url: 'postgresql://localhost:5432',
    color: '#336791',
    installed: false
  },
  {
    id: 'CHANGE_ME',
    name: 'MongoDB Compass',
    description: 'MongoDB GUI client',
    type: 'database' as const,
    url: 'mongodb-compass://',
    color: '#47a248',
    installed: false
  },
  {
    id: 'CHANGE_ME',
    name: 'MySQL Workbench',
    description: 'MySQL database tool',
    type: 'database' as const,
    url: 'mysqlworkbench://',
    color: '#4479a1',
    installed: false
  },
  {
    id: 'CHANGE_ME',
    name: 'TablePlus',
    description: 'Modern database GUI',
    type: 'database' as const,
    url: 'tableplus://',
    color: '#f0c24b',
    installed: false
  },
  {
    id: 'CHANGE_ME',
    name: 'Redis',
    description: 'In-memory data store',
    type: 'database' as const,
    url: 'redis://localhost:6379',
    color: '#dc382d',
    installed: false
  },
  {
    id: 'CHANGE_ME',
    name: 'DBeaver',
    description: 'Universal database tool',
    type: 'database' as const,
    url: 'dbeaver://',
    color: '#8b5a3c',
    installed: false
  }
];

// ===== ANALYTICS APPS =====

export const analyticsTemplates = [
  {
    id: 'CHANGE_ME',
    name: 'Google Analytics',
    description: 'Web analytics service',
    type: 'analytics' as const,
    url: 'https://analytics.google.com',
    color: '#f9ab00',
    installed: false
  },
  {
    id: 'CHANGE_ME',
    name: 'Tableau',
    description: 'Data visualization platform',
    type: 'analytics' as const,
    url: 'https://tableau.com',
    color: '#e97627',
    installed: false
  },
  {
    id: 'CHANGE_ME',
    name: 'Power BI',
    description: 'Business analytics service',
    type: 'analytics' as const,
    url: 'https://powerbi.microsoft.com',
    color: '#f2c811',
    installed: false
  },
  {
    id: 'CHANGE_ME',
    name: 'Mixpanel',
    description: 'Product analytics',
    type: 'analytics' as const,
    url: 'https://mixpanel.com',
    color: '#7856ff',
    installed: false
  },
  {
    id: 'CHANGE_ME',
    name: 'Amplitude',
    description: 'Digital analytics platform',
    type: 'analytics' as const,
    url: 'https://amplitude.com',
    color: '#1e5fff',
    installed: false
  }
];

// ===== MEDIA APPS =====

export const mediaTemplates = [
  {
    id: 'CHANGE_ME',
    name: 'Spotify',
    description: 'Music streaming service',
    type: 'media' as const,
    url: 'https://open.spotify.com',
    color: '#1db954',
    installed: false
  },
  {
    id: 'CHANGE_ME',
    name: 'YouTube',
    description: 'Video sharing platform',
    type: 'media' as const,
    url: 'https://youtube.com',
    color: '#ff0000',
    installed: false
  },
  {
    id: 'CHANGE_ME',
    name: 'Netflix',
    description: 'Streaming entertainment service',
    type: 'media' as const,
    url: 'https://netflix.com',
    color: '#e50914',
    installed: false
  },
  {
    id: 'CHANGE_ME',
    name: 'VLC Media Player',
    description: 'Multimedia player',
    type: 'media' as const,
    url: 'vlc://',
    color: '#ff8800',
    installed: false
  },
  {
    id: 'CHANGE_ME',
    name: 'Apple Music',
    description: 'Music streaming service',
    type: 'media' as const,
    url: 'https://music.apple.com',
    color: '#fa243c',
    installed: false
  }
];

// ===== UTILITY APPS =====

export const utilityTemplates = [
  {
    id: 'CHANGE_ME',
    name: '1Password',
    description: 'Password manager',
    type: 'utility' as const,
    url: 'https://1password.com',
    color: '#0094f5',
    installed: false
  },
  {
    id: 'CHANGE_ME',
    name: 'Dropbox',
    description: 'Cloud storage service',
    type: 'utility' as const,
    url: 'https://dropbox.com',
    color: '#0061ff',
    installed: false
  },
  {
    id: 'CHANGE_ME',
    name: 'Google Drive',
    description: 'Cloud storage and sync',
    type: 'utility' as const,
    url: 'https://drive.google.com',
    color: '#4285f4',
    installed: false
  },
  {
    id: 'CHANGE_ME',
    name: 'LastPass',
    description: 'Password management',
    type: 'utility' as const,
    url: 'https://lastpass.com',
    color: '#d32d27',
    installed: false
  },
  {
    id: 'CHANGE_ME',
    name: 'WinRAR',
    description: 'File archiver utility',
    type: 'utility' as const,
    url: 'winrar://',
    color: '#003366',
    installed: false
  }
];

// ===== CUSTOM TEMPLATE =====

export const customTemplate: Application = {
  id: 'CHANGE_ME',  // ← Make this unique!
  name: 'App Name',
  description: 'Short description of what this app does',
  type: 'productivity',  // ← Choose category
  url: 'https://example.com',
  color: '#6366f1',  // ← Brand color in hex
  installed: false,  // ← true or false
  version: '1.0.0',  // ← Optional: version number
  lastUsed: new Date('2024-01-15')  // ← Optional: last used date
};

/**
 * USAGE INSTRUCTIONS:
 *
 * 1. Find the app template you want from the categories above
 * 2. Copy the entire object (including the curly braces)
 * 3. Open src/data/applications.ts
 * 4. Change the 'id' field to a unique number/string
 * 5. Paste it into the applications array
 * 6. Adjust any fields as needed (url, installed, version, etc.)
 * 7. Save the file - the dashboard will auto-update!
 *
 * Example:
 *
 * // Copy this template:
 * {
 *   id: 'CHANGE_ME',
 *   name: 'Slack',
 *   ...
 * }
 *
 * // Change ID and paste into applications.ts:
 * export const applications: Application[] = [
 *   // ... existing apps ...
 *   {
 *     id: '13',  // ← Changed from 'CHANGE_ME'
 *     name: 'Slack',
 *     description: 'Team communication platform',
 *     type: 'communication',
 *     url: 'https://slack.com/signin',
 *     color: '#4a154b',
 *     installed: true  // ← Changed to true
 *   }
 * ];
 */
