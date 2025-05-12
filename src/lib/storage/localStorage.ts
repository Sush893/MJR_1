// /**
//  * LocalStorage Service
//  * 
//  * Provides a centralized interface for managing application data in localStorage.
//  * Handles storage and retrieval of user data, profiles, pitches, projects, events,
//  * analytics, and connections.
//  * 
//  * Features:
//  * - Type-safe storage operations
//  * - Consistent data structure
//  * - Error handling for JSON parsing
//  * - Clear separation of concerns for different data types
//  */

// // Define storage keys as constants to prevent typos and enable easier updates
// const STORAGE_KEYS = {
//   AUTH_TOKEN: 'auth_token',
//   USER: 'user',
//   PROFILE: 'profile',
//   PITCHES: 'pitches',
//   PROJECTS: 'projects',
//   EVENTS: 'events',
//   ANALYTICS: 'analytics',
//   CONNECTIONS: 'connections'
// } as const;

// // Type definitions for stored data structures
// interface StoredUser {
//   id: string;
//   email: string;
//   full_name: string;
//   created_at: string;
// }

// // ... (rest of the interfaces)

// export const LocalStorage = {
//   /**
//    * Authentication Methods
//    * Handle storage of auth tokens and session data
//    */
//   setAuthToken: (token: string) => {
//     localStorage.setItem(STORAGE_KEYS.AUTH_TOKEN, token);
//   },

//   getAuthToken: () => {
//     return localStorage.getItem(STORAGE_KEYS.AUTH_TOKEN);
//   },

//   /**
//    * User Methods
//    * Handle storage of user data
//    */
//   setUser: (user: StoredUser) => {
//     localStorage.setItem(STORAGE_KEYS.USER, JSON.stringify(user));
//   },

//   getUser: (): StoredUser | null => {
//     const user = localStorage.getItem(STORAGE_KEYS.USER);
//     return user ? JSON.parse(user) : null;
//   },

//   /**
//    * Profile Methods
//    * Handle storage of user profile data
//    */
//   setProfile: (profile: StoredProfile) => {
//     localStorage.setItem(STORAGE_KEYS.PROFILE, JSON.stringify(profile));
//   },

//   getProfile: (): StoredProfile | null => {
//     const profile = localStorage.getItem(STORAGE_KEYS.PROFILE);
//     return profile ? JSON.parse(profile) : null;
//   },

//   /**
//    * Pitches Methods
//    * Handle storage of pitch data including CRUD operations
//    */
//   setPitches: (pitches: StoredPitch[]) => {
//     localStorage.setItem(STORAGE_KEYS.PITCHES, JSON.stringify(pitches));
//   },

//   getPitches: (): StoredPitch[] => {
//     const pitches = localStorage.getItem(STORAGE_KEYS.PITCHES);
//     return pitches ? JSON.parse(pitches) : [];
//   },

//   addPitch: (pitch: StoredPitch) => {
//     const pitches = LocalStorage.getPitches();
//     pitches.unshift(pitch); // Add new pitch at the beginning
//     LocalStorage.setPitches(pitches);
//   },

//   /**
//    * Projects Methods
//    * Handle storage of project data including CRUD operations
//    */
//   setProjects: (projects: StoredProject[]) => {
//     localStorage.setItem(STORAGE_KEYS.PROJECTS, JSON.stringify(projects));
//   },

//   getProjects: (): StoredProject[] => {
//     const projects = localStorage.getItem(STORAGE_KEYS.PROJECTS);
//     return projects ? JSON.parse(projects) : [];
//   },

//   addProject: (project: StoredProject) => {
//     const projects = LocalStorage.getProjects();
//     projects.unshift(project); // Add new project at the beginning
//     LocalStorage.setProjects(projects);
//   },

//   /**
//    * Events Methods
//    * Handle storage of event data including CRUD operations
//    */
//   setEvents: (events: StoredEvent[]) => {
//     localStorage.setItem(STORAGE_KEYS.EVENTS, JSON.stringify(events));
//   },

//   getEvents: (): StoredEvent[] => {
//     const events = localStorage.getItem(STORAGE_KEYS.EVENTS);
//     return events ? JSON.parse(events) : [];
//   },

//   addEvent: (event: StoredEvent) => {
//     const events = LocalStorage.getEvents();
//     events.unshift(event); // Add new event at the beginning
//     LocalStorage.setEvents(events);
//   },

//   /**
//    * Analytics Methods
//    * Handle storage of analytics data and events
//    */
//   setAnalytics: (analytics: any[]) => {
//     localStorage.setItem(STORAGE_KEYS.ANALYTICS, JSON.stringify(analytics));
//   },

//   getAnalytics: () => {
//     const analytics = localStorage.getItem(STORAGE_KEYS.ANALYTICS);
//     return analytics ? JSON.parse(analytics) : [];
//   },

//   addAnalyticsEvent: (event: any) => {
//     const analytics = LocalStorage.getAnalytics();
//     analytics.unshift({
//       ...event,
//       timestamp: new Date().toISOString()
//     });
//     LocalStorage.setAnalytics(analytics);
//   },

//   /**
//    * Connections Methods
//    * Handle storage of user connections and their states
//    */
//   setConnections: (connections: any[]) => {
//     localStorage.setItem(STORAGE_KEYS.CONNECTIONS, JSON.stringify(connections));
//   },

//   getConnections: () => {
//     const connections = localStorage.getItem(STORAGE_KEYS.CONNECTIONS);
//     return connections ? JSON.parse(connections) : [];
//   },

//   addConnection: (connection: any) => {
//     const connections = LocalStorage.getConnections();
//     connections.unshift(connection);
//     LocalStorage.setConnections(connections);
//   },

//   updateConnectionStatus: (connectionId: string, status: 'pending' | 'accepted' | 'declined') => {
//     const connections = LocalStorage.getConnections();
//     const updatedConnections = connections.map(conn => 
//       conn.id === connectionId ? { ...conn, status } : conn
//     );
//     LocalStorage.setConnections(updatedConnections);
//   },

//   /**
//    * Utility Methods
//    */
//   clearAll: () => {
//     Object.values(STORAGE_KEYS).forEach(key => {
//       localStorage.removeItem(key);
//     });
//   }
// };

import { User } from '@supabase/supabase-js';
import { Profile } from '../supabase';

// Keys for storing data in localStorage
const KEYS = {
  AUTH_TOKEN: 'auth_token',
  USER: 'user',
  PROFILE: 'profile',
  THEME: 'theme',
  
};

const TOKEN_KEY= 'auth_token'

// Type guard to check if something is a User object
const isUser = (obj: any): obj is User => {
  return obj && 
    typeof obj === 'object' &&
    'id' in obj &&
    'email' in obj;
};

// Type guard to check if something is a Profile object
const isProfile = (obj: any): obj is Profile => {
  return obj && 
    typeof obj === 'object' &&
    'id' in obj &&
    'email' in obj &&
    'full_name' in obj;
};

export const LocalStorage = {
  /**
   * Get auth token from localStorage
   */
  getAuthToken: (): string | null => {
    return localStorage.getItem(KEYS.AUTH_TOKEN);
  },

  /**
   * Set auth token in localStorage
   */
  setAuthToken: (token: string): void => {
    localStorage.setItem(KEYS.AUTH_TOKEN, token);
  },

  /**
   * Get user from localStorage
   */
  getUser: (): User | null => {
    try {
      const userString = localStorage.getItem(KEYS.USER);
      if (!userString) return null;
      
      const user = JSON.parse(userString);
      return isUser(user) ? user : null;
    } catch (error) {
      console.error('Error parsing user from localStorage:', error);
      return null;
    }
  },

  /**
   * Set user in localStorage
   */
  setUser: (user: User | object): void => {
    localStorage.setItem(KEYS.USER, JSON.stringify(user));
  },

  /**
   * Get profile from localStorage
   */
  getProfile: (): Profile | null => {
    try {
      const profileString = localStorage.getItem(KEYS.PROFILE);
      if (!profileString) return null;
      
      const profile = JSON.parse(profileString);
      return isProfile(profile) ? profile : null;
    } catch (error) {
      console.error('Error parsing profile from localStorage:', error);
      return null;
    }
  },

  /**
   * Set profile in localStorage
   */
  setProfile: (profile: Profile | object): void => {
    localStorage.setItem(KEYS.PROFILE, JSON.stringify(profile));
  },

  /**
   * Get theme preference from localStorage
   */
  getTheme: (): string | null => {
    return localStorage.getItem(KEYS.THEME);
  },

  /**
   * Set theme preference in localStorage
   */
  setTheme: (theme: string): void => {
    localStorage.setItem(KEYS.THEME, theme);
  },

  /**
   * Clear all authentication-related data from localStorage
   */
  clearAuth: (): void => {
    localStorage.removeItem(KEYS.AUTH_TOKEN);
    localStorage.removeItem(KEYS.USER);
    localStorage.removeItem(KEYS.PROFILE);
  },

  /**
   * Clear all data from localStorage
   */
  clearAll: (): void => {
    localStorage.clear();
  },

   getToken(): string | null {
    return localStorage.getItem(TOKEN_KEY);
  },

  //  method to set token
   setToken(token: string): void {
    localStorage.setItem(TOKEN_KEY, token);
  },

  //  method to remove token
   removeToken(): void {
    localStorage.removeItem(TOKEN_KEY);
  },

  // Generalized methods for other data
   getItem(key: string): string | null {
    return localStorage.getItem(key);
  },

   setItem(key: string, value: string): void {
    localStorage.setItem(key, value);
  },

   removeItem(key: string): void {
    localStorage.removeItem(key);
  },

   clear(): void {
    localStorage.clear();
  }

};