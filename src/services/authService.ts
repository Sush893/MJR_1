/**
 * Authentication service for handling JWT tokens
 */

// The key used to store the token in localStorage - match with LocalStorage service
const TOKEN_KEY = 'auth_token';

// Function to get the authentication token from localStorage
export const getToken = (): string | null => {
  return localStorage.getItem(TOKEN_KEY);
};

// Function to set the authentication token in localStorage
export const setToken = (token: string): void => {
  localStorage.setItem(TOKEN_KEY, token);
};

// Function to remove the authentication token from localStorage
export const removeToken = (): void => {
  localStorage.removeItem(TOKEN_KEY);
};

// Function to get the authorization header for API requests
export const getAuthHeader = (): { Authorization?: string } => {
  const token = getToken();
  if (!token) {
    console.warn('No authentication token found');
    return {};
  }
  // Ensure token is properly formatted with 'Bearer ' prefix
  return { Authorization: `Bearer ${token}` };
};

// Function to check if the user is authenticated
export const isAuthenticated = (): boolean => {
  return getToken() !== null;
};

// Parse and extract user information from JWT token
export const getUserFromToken = (): any | null => {
  const token = getToken();
  if (!token) {
    return null;
  }
  
  try {
    // JWT tokens consist of three parts: header.payload.signature
    const base64Url = token.split('.')[1];
    if (!base64Url) {
      console.error('Invalid token format');
      return null;
    }
    
    const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    const jsonPayload = decodeURIComponent(
      atob(base64)
        .split('')
        .map(c => '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2))
        .join('')
    );
    
    return JSON.parse(jsonPayload);
  } catch (error: any) {
    console.error('Error parsing token:', error.message);
    // If there's an error, remove the malformed token
    removeToken();
    return null;
  }
}; 