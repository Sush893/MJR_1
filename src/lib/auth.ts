import { AuthError } from '../types/auth';
import { supabase } from './supabase';

export async function signInWithEmail(email: string, password: string) {
  try {
    // Demo admin login
    if (email === 'admin' && password === 'admin') {
      return {
        data: {
          user: {
            id: '1',
            email: 'admin@example.com',
            user_metadata: { full_name: 'Admin User' }
          }
        },
        error: null
      };
    }

    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) throw error;
    return { data, error: null };
  } catch (error) {
    console.error('Sign in error:', error);
    return {
      data: null,
      error: {
        message: 'Invalid login credentials. Please try again.',
        status: 400
      }
    };
  }
}

export async function signUpWithEmail(email: string, password: string, fullName: string) {
  try {
    // First check if email exists in auth.users (more reliable than profiles check)
    const { data: { user }, error: signUpError } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: { full_name: fullName },
      }
    });

    if (signUpError) {
      throw signUpError;
    }

    // Wait briefly for the trigger to create the profile
    if (user) {
      await new Promise(resolve => setTimeout(resolve, 1000));
    }

    return { data: { user }, error: null };
  } catch (error) {
    console.error('Sign up error:', error);
    
    // Handle specific error cases
    if (error.message?.includes('unique constraint')) {
      return {
        data: null,
        error: {
          message: 'This email is already registered. Please sign in instead.',
          status: 400
        }
      };
    }

    return {
      data: null,
      error: {
        message: 'Unable to create account. Please try again.',
        status: 500
      }
    };
  }
}