import { useState, useEffect } from 'react';
import { LocalStorage } from '../storage/localStorage';

interface User {
  id: string;
  email: string;
  name?: string;
}

interface AuthState {
  user: User | null;
  isLoading: boolean;
  error: Error | null;
}

export function useAuth() {
  const [authState, setAuthState] = useState<AuthState>({
    user: null,
    isLoading: true,
    error: null,
  });

  useEffect(() => {
    const token = LocalStorage.getToken();
    if (!token) {
      setAuthState({ user: null, isLoading: false, error: null });
      return;
    }

    // Parse the JWT token to get user info
    try {
      const base64Url = token.split('.')[1];
      const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
      const jsonPayload = decodeURIComponent(atob(base64).split('').map(function(c) {
        return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
      }).join(''));

      const payload = JSON.parse(jsonPayload);
      setAuthState({
        user: {
          id: payload.sub,
          email: payload.email,
          name: payload.name
        },
        isLoading: false,
        error: null
      });
    } catch (error) {
      setAuthState({
        user: null,
        isLoading: false,
        error: error as Error
      });
    }
  }, []);

  return authState;
} 