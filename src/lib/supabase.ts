/**
 * Supabase Client Wrapper
 *
 * This module provides a safe, optional Supabase integration.
 * If env vars are not configured, all functions gracefully return null/false.
 * This prevents TypeScript errors and allows the app to work without Supabase.
 */

import { createClient, SupabaseClient } from '@supabase/supabase-js';

// Type-safe environment variable access
const supabaseUrl = process.env.REACT_APP_SUPABASE_URL;
const supabaseAnonKey = process.env.REACT_APP_SUPABASE_ANON_KEY;

// Only create client if both env vars are present
let supabaseClient: SupabaseClient | null = null;

if (supabaseUrl && supabaseAnonKey) {
  try {
    supabaseClient = createClient(supabaseUrl, supabaseAnonKey);
    console.log('✓ Supabase client initialized');
  } catch (error) {
    console.warn('Failed to initialize Supabase client:', error);
    supabaseClient = null;
  }
} else {
  console.log('ℹ Supabase not configured - using localStorage only');
}

/**
 * Export the client (may be null if not configured)
 */
export const supabase = supabaseClient;

/**
 * Check if Supabase is configured and available
 */
export const isSupabaseConfigured = (): boolean => {
  return supabaseClient !== null;
};

/**
 * Check if user is authenticated (returns false if Supabase not configured)
 */
export const isSupabaseAuthenticated = async (): Promise<boolean> => {
  if (!supabaseClient) return false;

  try {
    const { data: { session } } = await supabaseClient.auth.getSession();
    return session !== null;
  } catch (error) {
    console.warn('Failed to check auth status:', error);
    return false;
  }
};

/**
 * Get current user (returns null if not authenticated or Supabase not configured)
 */
export const getCurrentUser = async () => {
  if (!supabaseClient) return null;

  try {
    const { data: { user } } = await supabaseClient.auth.getUser();
    return user;
  } catch (error) {
    console.warn('Failed to get current user:', error);
    return null;
  }
};
