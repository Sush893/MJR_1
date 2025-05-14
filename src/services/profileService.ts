import axios from 'axios';
import { getAuthHeader } from './authService';

const API_URL = 'http://localhost:3000/api/profile';

// Define interface for profile data
interface ProfileData {
  bio?: string;
  location?: string;
  avatar_url?: string;
  interests?: string[];
  [key: string]: any;
}

// Get user profile
export const getUserProfile = async () => {
  try {
    const response = await fetch(API_URL, {
      method: 'GET',
      headers: {
        ...getAuthHeader(),
        'Content-Type': 'application/json'
      }
    });
    
    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.message || 'Failed to get profile');
    }
    
    return await response.json();
  } catch (error) {
    console.error('Error fetching profile:', error);
    throw error;
  }
};

// Update profile during onboarding
export const updateOnboardingProfile = async (profileData: ProfileData) => {
  try {
    const response = await fetch(`${API_URL}/onboarding`, {
      method: 'PUT',
      headers: {
        ...getAuthHeader(),
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(profileData)
    });
    
    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.message || 'Failed to update profile');
    }
    
    return await response.json();
  } catch (error) {
    console.error('Error updating profile:', error);
    throw error;
  }
};

// Complete onboarding
export const completeOnboarding = async () => {
  try {
    const response = await fetch(`${API_URL}/complete-onboarding`, {
      method: 'PUT',
      headers: {
        ...getAuthHeader(),
        'Content-Type': 'application/json'
      }
    });
    
    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.message || 'Failed to complete onboarding');
    }
    
    return await response.json();
  } catch (error) {
    console.error('Error completing onboarding:', error);
    throw error;
  }
}; 