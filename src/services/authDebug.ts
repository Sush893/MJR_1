/**
 * Debug utility to help diagnose JWT token issues
 */

import { getToken } from './authService';

// Function to check if a token exists and is valid
export const debugTokenStatus = (): string => {
  const token = getToken();
  
  if (!token) {
    return 'No token found in localStorage';
  }
  
  // Check basic token structure (should have 3 parts separated by dots)
  const parts = token.split('.');
  if (parts.length !== 3) {
    return `Token malformed: Expected 3 parts but got ${parts.length}`;
  }
  
  // Check if each part is valid base64
  try {
    const header = JSON.parse(atob(parts[0]));
    const payload = JSON.parse(atob(parts[1].replace(/-/g, '+').replace(/_/g, '/')));
    
    return `Token appears valid:
    - Algorithm: ${header.alg}
    - Token type: ${header.typ}
    - User ID: ${payload.id}
    - Email: ${payload.email}
    - Expiration: ${new Date(payload.exp * 1000).toLocaleString()}`;
  } catch (error: any) {
    return `Token validation error: ${error.message}`;
  }
};

// Function to log token debug info to console
export const logTokenDebug = (): void => {
  console.group('JWT Token Debug Info');
  console.log(debugTokenStatus());
  console.groupEnd();
};

// Export a function that can be called from browser console for debugging
if (typeof window !== 'undefined') {
  (window as any).debugJWT = logTokenDebug;
} 