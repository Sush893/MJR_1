import { LocalStorage } from '../storage/localStorage';
import axios from 'axios';

// Update to match the port in server.js (PORT variable)
const API_BASE_URL = 'http://localhost:3000/api';

// Add authorization header to all requests
axios.interceptors.request.use(
  (config) => {
    const token = LocalStorage.getAuthToken();
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

export const AuthAPI = {
  signIn: async (email: string, password: string) => {
    try {
      console.log('🔑 [API] Sending login request for:', email);
      
      const response = await axios.post(`${API_BASE_URL}/signin`, {
        email,
        password
      });
      
      console.log('✅ [API] Login successful, response:', response.data);
      
      if (response.data.token) {
        // Store the token for future API requests
        console.log('🔒 [API] Storing token in localStorage, length:', response.data.token.length);
        LocalStorage.setAuthToken(response.data.token);
        console.log('🔍 [API] Verification: token in localStorage after setting:', LocalStorage.getAuthToken()?.length);
        
        // Return the user data in the format expected by AuthContext
        return { 
          data: { 
            user: response.data.user
          }, 
          error: null 
        };
      } else {
        console.error('❌ [API] Login response missing token');
        return { 
          data: null, 
          error: new Error('Authentication failed - missing token')
        };
      }
    } catch (error: any) {
      console.error('❌ [API] Sign in error:', error.response?.data || error.message);
      console.error('❌ [API] Full error:', error);
      
      // If the API call fails in development, fall back to mock implementation
      if (process.env.NODE_ENV === 'development' && error.response?.status >= 500) {
        console.log('⚠️ [API] Falling back to mock auth in development due to server error');
        return await mockSignIn(email, password);
      }
      
      return { 
        data: null, 
        error: new Error(error.response?.data?.error || 'Authentication failed')
      };
    }
  },

  signUp: async (email: string, password: string, fullName: string) => {
    try {
      console.log('📝 [API] Sending registration request for:', email);
      console.log('📝 [API] Registration data:', { email, fullName, passwordLength: password?.length });
      
      const response = await axios.post(`${API_BASE_URL}/signup`, {
        email,
        password,
        fullName
      });
      
      console.log('✅ [API] Registration successful, response data:', response.data);
      
      if (response.data.token) {
        // Store the token for future API requests
        console.log('🔒 [API] Storing token in localStorage, length:', response.data.token.length);
        LocalStorage.setAuthToken(response.data.token);
        console.log('🔍 [API] Verification: token in localStorage after setting:', LocalStorage.getAuthToken()?.length);
        
        // Return the user data in the format expected by AuthContext
        return { 
          data: { 
            user: response.data.user
          }, 
          error: null 
        };
      } else {
        console.error('❌ [API] Registration response missing token');
        return { 
          data: null, 
          error: new Error('Registration failed - missing token')
        };
      }
    } catch (error: any) {
      console.error('❌ [API] Sign up error:', error.response?.data || error.message);
      console.error('❌ [API] Full error:', error);
      
      // If the API call fails in development, fall back to mock implementation
      if (process.env.NODE_ENV === 'development' && error.response?.status >= 500) {
        console.log('⚠️ [API] Falling back to mock auth in development due to server error');
        return await mockSignUp(email, password, fullName);
      }
      
      return { 
        data: null, 
        error: new Error(error.response?.data?.error || 'Registration failed')
      };
    }
  },

  signOut: async () => {
    try {
      console.log('🚪 [API] Sending logout request');
      
      // Attempt to call the sign out endpoint if it exists
      await axios.post(`${API_BASE_URL}/signout`);
      console.log('✅ [API] Logout successful');
    } catch (error: any) {
      console.error('❌ [API] Sign out error:', error.response?.data || error.message);
      // Continue with local sign out even if API call fails
    }
    
    // Clear local storage
    LocalStorage.clearAll();
    
    // Clear axios authorization header
    delete axios.defaults.headers.common['Authorization'];

    return { error: null };
  },
  
  // Get current user profile
  getProfile: async () => {
    try {
      console.log('👤 [API] Fetching user profile');
      
      const response = await axios.get(`${API_BASE_URL}/profile`);
      console.log('✅ [API] Profile fetched successfully:', response.data);
      
      return {
        data: response.data,
        error: null
      };
    } catch (error: any) {
      console.error('❌ [API] Get profile error:', error.response?.data || error.message);
      
      return {
        data: null,
        error: new Error(error.response?.data?.error || 'Failed to fetch profile')
      };
    }
  }
};

// Mock implementations as fallbacks
async function mockSignIn(email: string, password: string) {
  console.log('⚠️ [API] Using mock signIn');
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
  console.log('⚠️ [API] Using mock signUp');
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