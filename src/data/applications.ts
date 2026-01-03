import { Application } from '../types';

export const applications: Application[] = [
  {
    id: '1',
    name: 'Radiology OnCall Scheduler',
    description: 'Schedule and manage radiology on-call shifts',
    type: 'productivity',
    url: 'http://localhost:3001',
    color: '#6366f1',
    installed: true,
    version: '1.0.0',
    lastUsed: new Date('2024-01-01')
  },
  {
    id: '2',
    name: 'VS Code',
    description: 'Code editor for developers',
    type: 'development',
    url: 'vscode://file',
    color: '#007acc',
    installed: true,
    version: '1.85.0'
  },
  {
    id: '3',
    name: 'Figma',
    description: 'Collaborative design tool',
    type: 'design',
    url: 'https://figma.com',
    color: '#f24e1e',
    installed: false
  },
  {
    id: '4',
    name: 'Slack',
    description: 'Team communication platform',
    type: 'communication',
    url: 'https://slack.com/signin',
    color: '#4a154b',
    installed: true,
    version: '4.36.0'
  },
  {
    id: '5',
    name: 'Notion',
    description: 'All-in-one workspace',
    type: 'productivity',
    url: 'https://notion.so',
    color: '#000000',
    installed: true,
    version: '2.0.0'
  },
  {
    id: '6',
    name: 'Spotify',
    description: 'Music streaming service',
    type: 'media',
    url: 'https://open.spotify.com',
    color: '#1db954',
    installed: false
  },
  {
    id: '7',
    name: 'PostgreSQL',
    description: 'Relational database management',
    type: 'database',
    url: 'postgresql://localhost:5432',
    color: '#336791',
    installed: true,
    version: '15.0'
  },
  {
    id: '8',
    name: 'Postman',
    description: 'API development platform',
    type: 'development',
    url: 'https://postman.com',
    color: '#ff6c37',
    installed: true,
    version: '10.0.0'
  },
  {
    id: '9',
    name: 'Discord',
    description: 'Voice, video and text chat',
    type: 'communication',
    url: 'https://discord.com/app',
    color: '#5865f2',
    installed: false
  },
  {
    id: '10',
    name: 'Adobe Photoshop',
    description: 'Image editing software',
    type: 'design',
    url: 'photoshop://',
    color: '#31a8ff',
    installed: true,
    version: '24.0'
  },
  {
    id: '11',
    name: 'TablePlus',
    description: 'Modern database GUI',
    type: 'database',
    url: 'tableplus://',
    color: '#f0c24b',
    installed: false
  },
  {
    id: '12',
    name: 'Google Analytics',
    description: 'Web analytics service',
    type: 'analytics',
    url: 'https://analytics.google.com',
    color: '#f9ab00',
    installed: true
  }
];
