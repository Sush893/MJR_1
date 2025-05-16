import { User } from '@supabase/supabase-js';
import { Profile } from '../lib/supabase';

export interface AuthContextType {
  user: User | null;
  profile: Profile | null;
  signIn: (email: string, password: string) => Promise<void>;
  signUp: (email: string, password: string, fullName: string) => Promise<void>;
  signOut: () => Promise<void>;
  completeOnboarding: () => Promise<Profile | void>;
  loading: boolean;
  error: string | null;
  initialized: boolean;
}

export interface AuthError {
  message: string;
  status?: number;
}