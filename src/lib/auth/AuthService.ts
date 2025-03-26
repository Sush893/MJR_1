import { supabase } from '../supabase';
import { AuthError } from '../../types/auth';

export class AuthService {
  static async getSession() {
    try {
      // Clear any existing session first
      await this.clearSession();
      
      const { data: { session }, error } = await supabase.auth.getSession();
      if (error) throw error;
      return { session, error: null };
    } catch (error) {
      console.error('Get session error:', error);
      return { session: null, error: error as AuthError };
    }
  }

  static async clearSession() {
    try {
      await supabase.auth.signOut();
      localStorage.removeItem('supabase.auth.token');
      return { error: null };
    } catch (error) {
      return { error };
    }
  }

  // ... rest of the AuthService class remains the same
}