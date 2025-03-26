```typescript
/**
 * Database Configuration
 * 
 * Replace these values with your actual database credentials.
 * For security, use environment variables in production.
 */

export const DB_CONFIG = {
  url: process.env.VITE_SUPABASE_URL || 'your-supabase-url',
  anonKey: process.env.VITE_SUPABASE_ANON_KEY || 'your-anon-key',
  
  // Optional: Additional database configuration
  options: {
    schema: 'public',
    autoRefreshToken: true,
    persistSession: true,
    detectSessionInUrl: true
  }
};
```