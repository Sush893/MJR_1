import { supabase } from '../supabase';
import { Profile } from '../supabase';

export class ProfileService {
  static async getProfile(userId: string) {
    try {
      const { data, error } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', userId)
        .single();

      if (error) throw error;
      return { profile: data as Profile, error: null };
    } catch (error) {
      console.error('Error fetching profile:', error);
      return { profile: null, error };
    }
  }

  static async updateProfile(userId: string, updates: Partial<Profile>) {
    try {
      const { data, error } = await supabase
        .from('profiles')
        .update(updates)
        .eq('id', userId)
        .select()
        .single();

      if (error) throw error;
      return { profile: data as Profile, error: null };
    } catch (error) {
      console.error('Error updating profile:', error);
      return { profile: null, error };
    }
  }
}