import React, { createContext, useContext, useState, useEffect } from 'react';
import { User } from '@supabase/supabase-js';
import { Profile } from '../lib/supabase';
import { AuthContextType } from '../types/auth';
import { LocalStorage } from '../lib/storage/localStorage';
import { AuthAPI } from '../lib/api/auth';
import { ProfileAPI } from '../lib/api/profile';
import { setToken, getToken, removeToken } from '../services/authService';

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [profile, setProfile] = useState<Profile | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [initialized, setInitialized] = useState(false);

  useEffect(() => {
    // Check for existing session on mount
    const storedUser = LocalStorage.getUser();
    const storedProfile = LocalStorage.getProfile();
    const token = getToken() || LocalStorage.getAuthToken();

    if (token && storedUser) {
      // Ensure token is stored in our service
      setToken(token);
      
      setUser(storedUser as User);
      if (storedProfile) {
        setProfile(storedProfile as Profile);
      }
    } else if (!token && storedUser) {
      // If we have user data but no token, clear user data for consistency
      LocalStorage.clearAuth();
      setUser(null);
      setProfile(null);
    }

    setLoading(false);
    setInitialized(true);
  }, []);

  const signIn = async (email: string, password: string) => {
    try {
      setLoading(true);
      setError(null);

      console.log('🔑 [Auth] Starting sign in process for:', email);
      const { data, error } = await AuthAPI.signIn(email, password);
      console.log('🔑 [Auth] Sign in response:', { data, error });
      
      if (error) throw error;
      if (!data || !data.user) throw new Error('No user data returned');

      // Get token from localStorage (was set by AuthAPI.signIn)
      const token = LocalStorage.getAuthToken();
      console.log('🔑 [Auth] Token retrieved from localStorage:', token ? `${token.substring(0, 10)}...` : 'NULL');
      
      if (!token) {
        console.error('No token available after sign in');
      } else {
        // Store token in our service
        console.log('🔑 [Auth] Storing token in authService');
        setToken(token);
      }

      // Try to fetch the user's actual profile to get onboarding status
      let onboardingCompleted = false;
      try {
        console.log('👤 [Auth] Attempting to fetch user profile from API');
        const profileResponse = await AuthAPI.getProfile();
        console.log('👤 [Auth] Full profile response:', profileResponse);
        
        // The profile data is nested in profileResponse.data.profile
        if (profileResponse.data && profileResponse.data.profile && 
            profileResponse.data.profile.onboarding_completed !== undefined) {
          console.log('👤 [Auth] Profile fetched successfully, onboarding status:', 
                     profileResponse.data.profile.onboarding_completed);
          onboardingCompleted = profileResponse.data.profile.onboarding_completed;
        } else {
          console.log('👤 [Auth] Profile fetch successful but no onboarding status found in:', 
                     profileResponse.data);
        }
      } catch (profileError) {
        console.error('❌ [Auth] Error fetching profile, using default onboarding status:', profileError);
      }

      const mockProfile = {
        id: data.user.id,
        email: data.user.email,
        full_name: data.user.full_name,
        first_name: null,
        last_name: null,
        avatar_url: null,
        role: null,
        bio: null,
        location: null,
        interests: [],
        active_projects: [],
        communities: [],
        onboarding_completed: onboardingCompleted, // Use the actual status or default to false
        created_at: data.user.created_at,
        updated_at: data.user.created_at
      };
      
      console.log('👤 [Auth] Storing user and profile in localStorage');
      LocalStorage.setUser(data.user);
      LocalStorage.setProfile(mockProfile);

      setUser(data.user as User);
      setProfile(mockProfile as Profile);
      console.log('✅ [Auth] Sign in completed successfully');
    } catch (err: any) {
      console.error('❌ [Auth] Sign in error:', err);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const signUp = async (email: string, password: string, fullName: string) => {
    try {
      setLoading(true);
      setError(null);

      console.log('📝 [Auth] Starting sign up process for:', email);
      const { data, error } = await AuthAPI.signUp(email, password, fullName);
      console.log('📝 [Auth] Sign up response:', { data, error });
      
      if (error) throw error;
      if (!data || !data.user) throw new Error('No user data returned');

      // Get token from localStorage (was set by AuthAPI.signUp)
      const token = LocalStorage.getAuthToken();
      console.log('🔑 [Auth] Token retrieved from localStorage after signup:', token ? `${token.substring(0, 10)}...` : 'NULL');
      
      if (!token) {
        console.error('No token available after sign up');
      } else {
        // Store token in our service
        console.log('🔑 [Auth] Storing token in authService');
        setToken(token);
      }

      // For new accounts, onboarding should be false by default
      // We'll still try to fetch profile in case the backend created one
      let onboardingCompleted = false;
      try {
        console.log('👤 [Auth] Attempting to fetch new user profile from API');
        const profileResponse = await AuthAPI.getProfile();
        console.log('👤 [Auth] Full profile response from signup:', profileResponse);
        
        // The profile data is nested in profileResponse.data.profile
        if (profileResponse.data && profileResponse.data.profile && 
            profileResponse.data.profile.onboarding_completed !== undefined) {
          console.log('👤 [Auth] Profile fetched successfully, onboarding status:', 
                     profileResponse.data.profile.onboarding_completed);
          onboardingCompleted = profileResponse.data.profile.onboarding_completed;
        } else {
          console.log('👤 [Auth] Profile fetch successful but no onboarding status found in:', 
                     profileResponse.data);
        }
      } catch (profileError) {
        console.log('👤 [Auth] No profile found yet for new user, using default onboarding=false');
      }

      const mockProfile = {
        id: data.user.id,
        email: data.user.email,
        full_name: data.user.full_name,
        first_name: null,
        last_name: null,
        avatar_url: null,
        role: null,
        bio: null,
        location: null,
        interests: [],
        active_projects: [],
        communities: [],
        onboarding_completed: onboardingCompleted, // For new accounts, this will be false
        created_at: data.user.created_at,
        updated_at: data.user.created_at
      };
      
      console.log('👤 [Auth] Storing user and profile in localStorage');
      LocalStorage.setUser(data.user);
      LocalStorage.setProfile(mockProfile);

      setUser(data.user as User);
      setProfile(mockProfile as Profile);
      console.log('✅ [Auth] Sign up completed successfully');
    } catch (err: any) {
      console.error('❌ [Auth] Sign up error:', err);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const signOut = async () => {
    try {
      setLoading(true);
      setError(null);

      await AuthAPI.signOut();
      
      // Clear token from authService
      removeToken();
      // Also clear localStorage
      LocalStorage.clearAuth();

      setUser(null);
      setProfile(null);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  // Add a method to update onboarding status
  const completeOnboarding = async () => {
    if (!profile) {
      console.error('❌ [Auth] Cannot complete onboarding: no profile available');
      return;
    }
    
    console.log('👤 [Auth] Marking onboarding as completed');
    
    const updatedProfile = {
      ...profile,
      onboarding_completed: true
    };
    
    try {
      // Try to update on the server
      console.log('👤 [Auth] Sending onboarding completion status to server');
      await ProfileAPI.updateProfile({
        onboarding_completed: true,
        user_id: profile.id
      });
      console.log('✅ [Auth] Server profile updated with onboarding status');
    } catch (error) {
      console.error('❌ [Auth] Failed to update server profile:', error);
      // Continue with local updates even if server update fails
    }
    
    // Update in localStorage
    console.log('👤 [Auth] Updating onboarding status in localStorage');
    LocalStorage.setProfile(updatedProfile);
    
    // Update state
    setProfile(updatedProfile);
    
    console.log('✅ [Auth] Onboarding status updated successfully');
    return updatedProfile;
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        profile,
        signIn,
        signUp,
        signOut,
        completeOnboarding,
        loading,
        error,
        initialized
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}