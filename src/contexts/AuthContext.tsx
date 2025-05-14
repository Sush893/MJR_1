import React, { createContext, useContext, useState, useEffect } from 'react';
import { User } from '@supabase/supabase-js';
import { Profile } from '../lib/supabase';
import { AuthContextType } from '../types/auth';
import { LocalStorage } from '../lib/storage/localStorage';
import { AuthAPI } from '../lib/api/auth';
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

      const { data, error } = await AuthAPI.signIn(email, password);
      if (error) throw error;
      if (!data || !data.user) throw new Error('No user data returned');

      // Get token from localStorage (was set by AuthAPI.signIn)
      const token = LocalStorage.getAuthToken();
      if (!token) {
        console.error('No token available after sign in');
      } else {
        // Store token in our service
        setToken(token);
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
        onboarding_completed: false,
        created_at: data.user.created_at,
        updated_at: data.user.created_at
      };
      
      LocalStorage.setUser(data.user);
      LocalStorage.setProfile(mockProfile);

      setUser(data.user as User);
      setProfile(mockProfile as Profile);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const signUp = async (email: string, password: string, fullName: string) => {
    try {
      setLoading(true);
      setError(null);

      const { data, error } = await AuthAPI.signUp(email, password, fullName);
      if (error) throw error;
      if (!data || !data.user) throw new Error('No user data returned');

      // Get token from localStorage (was set by AuthAPI.signUp)
      const token = LocalStorage.getAuthToken();
      if (!token) {
        console.error('No token available after sign up');
      } else {
        // Store token in our service
        setToken(token);
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
        onboarding_completed: false,
        created_at: data.user.created_at,
        updated_at: data.user.created_at
      };
      
      LocalStorage.setUser(data.user);
      LocalStorage.setProfile(mockProfile);

      setUser(data.user as User);
      setProfile(mockProfile as Profile);
    } catch (err: any) {
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

  return (
    <AuthContext.Provider
      value={{
        user,
        profile,
        signIn,
        signUp,
        signOut,
        loading,
        error,
        initialized
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}