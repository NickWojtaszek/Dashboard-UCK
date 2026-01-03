export interface Application {
  id: string;
  name: string;
  description: string;
  type: ApplicationType;
  url: string;
  icon?: string;
  color: string;
  installed: boolean;  // Required field with default value of true
  version?: string;
  lastUsed?: Date;
}

export type ApplicationType =
  | 'productivity'
  | 'development'
  | 'design'
  | 'communication'
  | 'media'
  | 'utility'
  | 'database'
  | 'analytics';

export interface Category {
  type: ApplicationType;
  label: string;
}

export type ViewMode = 'grid' | 'list';

export interface FilterOptions {
  searchQuery: string;
  selectedTypes: ApplicationType[];
}

export interface AppSettings {
  adminPin: string;
  categories: Category[];
}
