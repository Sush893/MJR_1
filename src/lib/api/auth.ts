import { LocalStorage } from '../storage/localStorage';

export const AuthAPI = {
  signIn: async (email: string, password: string) => {
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
  },

  signUp: async (email: string, password: string, fullName: string) => {
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
  },

  signOut: async () => {
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 500));
    
    // Clear local storage
    LocalStorage.clearAll();

    return { error: null };
  }
};