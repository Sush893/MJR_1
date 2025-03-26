/**
 * API Client Configuration
 * 
 * Configures and exports an Axios instance for making API requests.
 * Features:
 * - Automatic auth token injection
 * - Request/response interceptors
 * - Error handling with mock data fallback
 * - Consistent request logging
 */

import axios from 'axios';
import { LocalStorage } from '../storage/localStorage';

const API_URL = 'http://localhost:3000/api';

// Create axios instance with default config
const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json'
  }
});

// Add auth token to requests
api.interceptors.request.use((config) => {
  const token = LocalStorage.getAuthToken();
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  console.log('API Request:', config.method?.toUpperCase(), config.url);
  return config;
});

// Handle responses and errors
api.interceptors.response.use(
  (response) => response,
  (error) => {
    // For development, return mock data instead of failing
    console.log('API Error:', error.message);
    console.log('Returning mock data instead');
    
    return Promise.resolve({
      data: getMockData(error.config.url)
    });
  }
);

/**
 * Get mock data based on endpoint
 * Used for development and testing when API is unavailable
 */
function getMockData(url: string | undefined) {
  const mockUser = LocalStorage.getUser();
  const mockProfile = LocalStorage.getProfile();

  // Return appropriate mock data based on endpoint
  if (url?.includes('/profile')) {
    return mockProfile || {
      id: 'mock-user-id',
      email: 'demo@example.com',
      full_name: 'Jenny Jones',
      avatar_url: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=150',
      role: 'Entrepreneur',
      bio: 'Passionate entrepreneur focused on EdTech innovation',
      location: 'San Francisco, CA',
      interests: ['EdTech', 'AI', 'Product Strategy'],
      active_projects: [],
      communities: [],
      onboarding_completed: false,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString()
    };
  }
  
  // Add more mock data for other endpoints...
  
  return {};
}

export default api;