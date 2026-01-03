/**
 * Data Service Layer
 * Provides unified interface for data operations with optional Supabase sync
 *
 * Strategy:
 * - localStorage is ALWAYS the source of truth
 * - Supabase sync is optional and opportunistic
 * - If Supabase not configured: pure localStorage (fast, reliable)
 * - If Supabase configured: sync to cloud when possible, fallback to localStorage
 * - Never block on Supabase - always prioritize local operations
 */

import { supabase, isSupabaseConfigured } from '../lib/supabase';
import { Application, Category } from '../types';

const STORAGE_KEYS = {
  APPS: 'dashboard_apps',
  CATEGORIES: 'dashboard_categories',
  PIN: 'dashboard_pin',
};

interface DataServiceStatus {
  ready: boolean;
  usingSupabase: boolean;
  isOnline: boolean;
  error?: string;
}

class DataService {
  private status: DataServiceStatus = {
    ready: true,
    usingSupabase: false,
    isOnline: navigator.onLine,
  };

  constructor() {
    // Initialize status
    this.status.usingSupabase = isSupabaseConfigured();

    // Monitor online/offline status (for future sync features)
    if (typeof window !== 'undefined') {
      window.addEventListener('online', () => this.handleOnlineStatus(true));
      window.addEventListener('offline', () => this.handleOnlineStatus(false));
    }

    if (this.status.usingSupabase) {
      console.log('📡 DataService: Supabase sync enabled');
    } else {
      console.log('💾 DataService: localStorage mode (Supabase not configured)');
    }
  }

  private handleOnlineStatus(online: boolean): void {
    this.status.isOnline = online;
    console.log(`🌐 Network status: ${online ? 'online' : 'offline'}`);
  }

  /**
   * Get current service status
   */
  getStatus(): DataServiceStatus {
    return { ...this.status };
  }

  /**
   * Load applications
   * - Tries Supabase first if configured
   * - Always falls back to localStorage
   * - Never fails - returns empty array at worst
   */
  async loadApplications(): Promise<Application[]> {
    try {
      // Try Supabase if configured and online
      if (this.status.usingSupabase && this.status.isOnline && supabase) {
        try {
          const { data, error } = await supabase
            .from('applications')
            .select('*')
            .order('created_at', { ascending: false });

          if (!error && data && data.length > 0) {
            // Cache to localStorage
            localStorage.setItem(STORAGE_KEYS.APPS, JSON.stringify(data));
            console.log(`✓ Loaded ${data.length} apps from Supabase`);
            return data as Application[];
          }
        } catch (supabaseError) {
          console.warn('Supabase load failed, using localStorage:', supabaseError);
          this.status.error = 'Using cached data';
        }
      }

      // Fallback to localStorage (or primary if Supabase not configured)
      const cached = localStorage.getItem(STORAGE_KEYS.APPS);
      if (cached) {
        const apps = JSON.parse(cached);
        console.log(`💾 Loaded ${apps.length} apps from localStorage`);
        return apps;
      }

      return [];
    } catch (error) {
      console.error('Error loading applications:', error);
      this.status.error = 'Failed to load applications';
      return [];
    }
  }

  /**
   * Load categories
   * - Tries Supabase first if configured
   * - Always falls back to localStorage
   */
  async loadCategories(): Promise<Category[]> {
    try {
      // Try Supabase if configured and online
      if (this.status.usingSupabase && this.status.isOnline && supabase) {
        try {
          const { data, error } = await supabase
            .from('categories')
            .select('*')
            .order('created_at', { ascending: false });

          if (!error && data && data.length > 0) {
            // Cache to localStorage
            localStorage.setItem(STORAGE_KEYS.CATEGORIES, JSON.stringify(data));
            console.log(`✓ Loaded ${data.length} categories from Supabase`);
            return data as Category[];
          }
        } catch (supabaseError) {
          console.warn('Supabase load failed, using localStorage:', supabaseError);
          this.status.error = 'Using cached data';
        }
      }

      // Fallback to localStorage
      const cached = localStorage.getItem(STORAGE_KEYS.CATEGORIES);
      if (cached) {
        const categories = JSON.parse(cached);
        console.log(`💾 Loaded ${categories.length} categories from localStorage`);
        return categories;
      }

      return [];
    } catch (error) {
      console.error('Error loading categories:', error);
      this.status.error = 'Failed to load categories';
      return [];
    }
  }

  /**
   * Load PIN (always from localStorage - never synced to cloud for security)
   */
  async loadPin(): Promise<string> {
    try {
      const cached = localStorage.getItem(STORAGE_KEYS.PIN);
      return cached || '1234'; // Default PIN
    } catch (error) {
      console.error('Error loading PIN:', error);
      return '1234';
    }
  }

  /**
   * Save applications
   * - ALWAYS saves to localStorage first (source of truth)
   * - Opportunistically syncs to Supabase if configured
   * - Never fails - localStorage save is critical path
   */
  async saveApplications(applications: Application[]): Promise<void> {
    try {
      // CRITICAL: Save to localStorage first (source of truth)
      localStorage.setItem(STORAGE_KEYS.APPS, JSON.stringify(applications));
      console.log(`💾 Saved ${applications.length} apps to localStorage`);
      this.status.error = undefined;

      // Opportunistic sync to Supabase (non-blocking, best-effort)
      if (this.status.usingSupabase && this.status.isOnline && supabase) {
        // Fire-and-forget sync (don't await, don't block)
        this.syncApplicationsToSupabase(applications).catch(err =>
          console.warn('Background Supabase sync failed:', err)
        );
      }
    } catch (error) {
      console.error('Error saving applications:', error);
      this.status.error = 'Failed to save applications';
      throw new Error('Failed to save applications');
    }
  }

  /**
   * Background sync to Supabase (non-critical, best-effort)
   */
  private async syncApplicationsToSupabase(applications: Application[]): Promise<void> {
    if (!supabase) return;

    try {
      // Note: This is a simplified implementation
      // Production would need: conflict resolution, batch operations, error recovery
      console.log('📡 Syncing to Supabase...');

      // For each app, upsert to Supabase
      for (const app of applications) {
        const { error } = await supabase
          .from('applications')
          .upsert({
            id: app.id,
            name: app.name,
            url: app.url,
            description: app.description,
            type: app.type,
            color: app.color,
            installed: app.installed,
            version: app.version || null,
            updated_at: new Date().toISOString(),
          }, {
            onConflict: 'id'
          });

        if (error) {
          console.warn(`Failed to sync app ${app.name}:`, error);
        }
      }

      console.log('✓ Supabase sync complete');
    } catch (error) {
      console.warn('Supabase sync error:', error);
      // Don't throw - this is best-effort
    }
  }

  /**
   * Save categories
   * - ALWAYS saves to localStorage first
   * - Opportunistically syncs to Supabase
   */
  async saveCategories(categories: Category[]): Promise<void> {
    try {
      // CRITICAL: Save to localStorage first
      localStorage.setItem(STORAGE_KEYS.CATEGORIES, JSON.stringify(categories));
      console.log(`💾 Saved ${categories.length} categories to localStorage`);
      this.status.error = undefined;

      // Opportunistic sync to Supabase
      if (this.status.usingSupabase && this.status.isOnline && supabase) {
        this.syncCategoriesToSupabase(categories).catch(err =>
          console.warn('Background Supabase sync failed:', err)
        );
      }
    } catch (error) {
      console.error('Error saving categories:', error);
      this.status.error = 'Failed to save categories';
      throw new Error('Failed to save categories');
    }
  }

  /**
   * Background sync categories to Supabase (non-critical, best-effort)
   */
  private async syncCategoriesToSupabase(categories: Category[]): Promise<void> {
    if (!supabase) return;

    try {
      console.log('📡 Syncing categories to Supabase...');

      for (const category of categories) {
        const { error } = await supabase
          .from('categories')
          .upsert({
            type: category.type,
            label: category.label,
            updated_at: new Date().toISOString(),
          }, {
            onConflict: 'type'
          });

        if (error) {
          console.warn(`Failed to sync category ${category.label}:`, error);
        }
      }

      console.log('✓ Categories synced to Supabase');
    } catch (error) {
      console.warn('Supabase category sync error:', error);
    }
  }

  /**
   * Save PIN (localStorage only - NEVER synced to cloud)
   */
  async savePin(pin: string): Promise<void> {
    try {
      localStorage.setItem(STORAGE_KEYS.PIN, pin);
      console.log('🔐 PIN updated');
      this.status.error = undefined;
    } catch (error) {
      console.error('Error saving PIN:', error);
      this.status.error = 'Failed to save PIN';
      throw new Error('Failed to save PIN');
    }
  }

  /**
   * Add single application
   */
  async addApplication(app: Application): Promise<void> {
    const apps = await this.loadApplications();
    apps.push(app);
    await this.saveApplications(apps);
  }

  /**
   * Update single application
   */
  async updateApplication(app: Application): Promise<void> {
    const apps = await this.loadApplications();
    const index = apps.findIndex(a => a.id === app.id);
    if (index !== -1) {
      apps[index] = app;
      await this.saveApplications(apps);
    }
  }

  /**
   * Delete single application
   */
  async deleteApplication(id: string): Promise<void> {
    const apps = await this.loadApplications();
    await this.saveApplications(apps.filter(a => a.id !== id));

    // Also delete from Supabase if configured (fire-and-forget)
    if (this.status.usingSupabase && supabase) {
      supabase.from('applications').delete().eq('id', id).then((result: any) => {
        if (result.error) console.warn('Failed to delete from Supabase:', result.error);
        else console.log('✓ Deleted from Supabase');
      });
    }
  }

  /**
   * Clear all data (for testing/reset)
   */
  async clearAllData(): Promise<void> {
    localStorage.removeItem(STORAGE_KEYS.APPS);
    localStorage.removeItem(STORAGE_KEYS.CATEGORIES);
    localStorage.removeItem(STORAGE_KEYS.PIN);
    console.log('🗑️ All local data cleared');
  }
}

// Export singleton instance
export const dataService = new DataService();
