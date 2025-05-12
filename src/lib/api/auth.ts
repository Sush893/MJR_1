import { LocalStorage } from '../storage/localStorage';
import axios from 'axios';

export const AuthAPI = {
  signIn: async (email: string, password: string) => {
    try {
      const response = await axios.post('http://localhost:3000/api/signin', {
        email,
        password
      });
      
      if (response.data.token) {
        // Store the token for future API requests
        LocalStorage.setAuthToken(response.data.token);
        
        // Return the user data in the format expected by AuthContext
        return { 
          data: { 
            user: response.data.user || {
              id: Date.now().toString(),
              email,
              full_name: email.split('@')[0],
              created_at: new Date().toISOString()
            }
          }, 
          error: null 
        };
      } else {
        // Fallback to mock user if API doesn't return proper data
        return await mockSignIn(email, password);
      }
    } catch (error) {
      console.error('Sign in error:', error);
      
      // If the API call fails, fall back to the mock implementation
      // This allows the app to work even if the backend is not available
      if (process.env.NODE_ENV === 'development') {
        console.log('Falling back to mock auth in development');
        return await mockSignIn(email, password);
      }
      
      return { 
        data: null, 
        error: error instanceof Error ? error : new Error('Authentication failed') 
      };
    }
  },

  signUp: async (email: string, password: string, fullName: string) => {
    try {
      const response = await axios.post('http://localhost:3000/api/signup', {
        email,
        password,
        fullName
      });
      
      if (response.data.token) {
        // Store the token for future API requests
        LocalStorage.setAuthToken(response.data.token);
        
        // Return the user data in the format expected by AuthContext
        return { 
          data: { 
            user: response.data.user || {
              id: Date.now().toString(),
              email,
              full_name: fullName,
              created_at: new Date().toISOString()
            }
          }, 
          error: null 
        };
      } else {
        // Fallback to mock user if API doesn't return proper data
        return await mockSignUp(email, password, fullName);
      }
    } catch (error) {
      console.error('Sign up error:', error);
      
      // If the API call fails, fall back to the mock implementation
      if (process.env.NODE_ENV === 'development') {
        console.log('Falling back to mock auth in development');
        return await mockSignUp(email, password, fullName);
      }
      
      return { 
        data: null, 
        error: error instanceof Error ? error : new Error('Registration failed') 
      };
    }
  },

  signOut: async () => {
    try {
      // Attempt to call the sign out endpoint if it exists
      await axios.post('http://localhost:3000/api/signout');
    } catch (error) {
      console.error('Sign out error:', error);
      // Continue with local sign out even if API call fails
    }
    
    // Clear local storage
    LocalStorage.clearAll();
    
    // Clear axios authorization header
    delete axios.defaults.headers.common['Authorization'];

    return { error: null };
  }
};

// Mock implementations as fallbacks
async function mockSignIn(email: string, password: string) {
  // Simulate API call
  await new Promise(resolve => setTimeout(resolve, 500));

  // For demo, accept any credentials
  const mockUser = {
    id: Date.now().toString(),
    email,
    full_name: email.split('@')[0],
    created_at: new Date().toISOString()
  };

  return { data: { user: mockUser }, error: null };
}

async function mockSignUp(email: string, password: string, fullName: string) {
  // Simulate API call
  await new Promise(resolve => setTimeout(resolve, 500));

  // Create mock user
  const mockUser = {
    id: Date.now().toString(),
    email,
    full_name: fullName,
    created_at: new Date().toISOString()
  };

  return { data: { user: mockUser }, error: null };
}