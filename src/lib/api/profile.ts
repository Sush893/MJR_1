// src/services/api/profile.ts
import api from './client';

export interface Profile {
  userId: string;
  first_name: string;
  last_name: string;
  avatar_url?: string;
  role: string;
  role_details?: Record<string, any>;
  bio?: string;
  location?: string;
  interests: string[];
  active_projects: any[];
  communities: string[];
  onboarding_completed: boolean;
}

export const ProfileAPI = {
  /**
   * Get current user's profile
   */
  getProfile: async (): Promise<Profile> => {
    try {
      const response = await api.get('/profile');
      return response.data;
    } catch (error) {
      console.error('Failed to fetch profile:', error);
      throw error;
    }
  },

  /**
   * Update existing profile
   */
  updateProfile: async (data: Partial<Profile>): Promise<Profile> => {
    try {
      const response = await api.patch('/profile', data);
      return response.data;
    } catch (error) {
      console.error('Failed to update profile:', error);
      throw error;
    }
  },

  /**
   * Create new profile
   */
  createProfile: async (data: Profile): Promise<Profile> => {
    try {
      const response = await api.post('/profile', data);
      return response.data;
    } catch (error) {
      console.error('Failed to create profile:', error);
      throw error;
    }
  },

  /**
   * Upload avatar image
   */
  uploadAvatar: async (file: File): Promise<{ avatar_url: string }> => {
    try {
      const formData = new FormData();
      formData.append('avatar', file);
      
      const response = await api.post('/profile/avatar', formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });
      
      return response.data;
    } catch (error) {
      console.error('Failed to upload avatar:', error);
      throw error;
    }
  },

  /**
   * Complete onboarding process
   */
  completeOnboarding: async (data: Profile): Promise<Profile> => {
    try {
      // First try to update, fall back to create if needed
      try {
        return await ProfileAPI.updateProfile(data);
      } catch (updateError) {
        if (updateError.response?.status === 404) {
          return await ProfileAPI.createProfile(data);
        }
        throw updateError;
      }
    } catch (error) {
      console.error('Failed to complete onboarding:', error);
      throw error;
    }
  }
};