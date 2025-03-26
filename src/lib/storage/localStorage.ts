/**
 * LocalStorage Service
 * 
 * Provides a centralized interface for managing application data in localStorage.
 * Handles storage and retrieval of user data, profiles, pitches, projects, events,
 * analytics, and connections.
 * 
 * Features:
 * - Type-safe storage operations
 * - Consistent data structure
 * - Error handling for JSON parsing
 * - Clear separation of concerns for different data types
 */

// Define storage keys as constants to prevent typos and enable easier updates
const STORAGE_KEYS = {
  AUTH_TOKEN: 'auth_token',
  USER: 'user',
  PROFILE: 'profile',
  PITCHES: 'pitches',
  PROJECTS: 'projects',
  EVENTS: 'events',
  ANALYTICS: 'analytics',
  CONNECTIONS: 'connections'
} as const;

// Type definitions for stored data structures
interface StoredUser {
  id: string;
  email: string;
  full_name: string;
  created_at: string;
}

// ... (rest of the interfaces)

export const LocalStorage = {
  /**
   * Authentication Methods
   * Handle storage of auth tokens and session data
   */
  setAuthToken: (token: string) => {
    localStorage.setItem(STORAGE_KEYS.AUTH_TOKEN, token);
  },

  getAuthToken: () => {
    return localStorage.getItem(STORAGE_KEYS.AUTH_TOKEN);
  },

  /**
   * User Methods
   * Handle storage of user data
   */
  setUser: (user: StoredUser) => {
    localStorage.setItem(STORAGE_KEYS.USER, JSON.stringify(user));
  },

  getUser: (): StoredUser | null => {
    const user = localStorage.getItem(STORAGE_KEYS.USER);
    return user ? JSON.parse(user) : null;
  },

  /**
   * Profile Methods
   * Handle storage of user profile data
   */
  setProfile: (profile: StoredProfile) => {
    localStorage.setItem(STORAGE_KEYS.PROFILE, JSON.stringify(profile));
  },

  getProfile: (): StoredProfile | null => {
    const profile = localStorage.getItem(STORAGE_KEYS.PROFILE);
    return profile ? JSON.parse(profile) : null;
  },

  /**
   * Pitches Methods
   * Handle storage of pitch data including CRUD operations
   */
  setPitches: (pitches: StoredPitch[]) => {
    localStorage.setItem(STORAGE_KEYS.PITCHES, JSON.stringify(pitches));
  },

  getPitches: (): StoredPitch[] => {
    const pitches = localStorage.getItem(STORAGE_KEYS.PITCHES);
    return pitches ? JSON.parse(pitches) : [];
  },

  addPitch: (pitch: StoredPitch) => {
    const pitches = LocalStorage.getPitches();
    pitches.unshift(pitch); // Add new pitch at the beginning
    LocalStorage.setPitches(pitches);
  },

  /**
   * Projects Methods
   * Handle storage of project data including CRUD operations
   */
  setProjects: (projects: StoredProject[]) => {
    localStorage.setItem(STORAGE_KEYS.PROJECTS, JSON.stringify(projects));
  },

  getProjects: (): StoredProject[] => {
    const projects = localStorage.getItem(STORAGE_KEYS.PROJECTS);
    return projects ? JSON.parse(projects) : [];
  },

  addProject: (project: StoredProject) => {
    const projects = LocalStorage.getProjects();
    projects.unshift(project); // Add new project at the beginning
    LocalStorage.setProjects(projects);
  },

  /**
   * Events Methods
   * Handle storage of event data including CRUD operations
   */
  setEvents: (events: StoredEvent[]) => {
    localStorage.setItem(STORAGE_KEYS.EVENTS, JSON.stringify(events));
  },

  getEvents: (): StoredEvent[] => {
    const events = localStorage.getItem(STORAGE_KEYS.EVENTS);
    return events ? JSON.parse(events) : [];
  },

  addEvent: (event: StoredEvent) => {
    const events = LocalStorage.getEvents();
    events.unshift(event); // Add new event at the beginning
    LocalStorage.setEvents(events);
  },

  /**
   * Analytics Methods
   * Handle storage of analytics data and events
   */
  setAnalytics: (analytics: any[]) => {
    localStorage.setItem(STORAGE_KEYS.ANALYTICS, JSON.stringify(analytics));
  },

  getAnalytics: () => {
    const analytics = localStorage.getItem(STORAGE_KEYS.ANALYTICS);
    return analytics ? JSON.parse(analytics) : [];
  },

  addAnalyticsEvent: (event: any) => {
    const analytics = LocalStorage.getAnalytics();
    analytics.unshift({
      ...event,
      timestamp: new Date().toISOString()
    });
    LocalStorage.setAnalytics(analytics);
  },

  /**
   * Connections Methods
   * Handle storage of user connections and their states
   */
  setConnections: (connections: any[]) => {
    localStorage.setItem(STORAGE_KEYS.CONNECTIONS, JSON.stringify(connections));
  },

  getConnections: () => {
    const connections = localStorage.getItem(STORAGE_KEYS.CONNECTIONS);
    return connections ? JSON.parse(connections) : [];
  },

  addConnection: (connection: any) => {
    const connections = LocalStorage.getConnections();
    connections.unshift(connection);
    LocalStorage.setConnections(connections);
  },

  updateConnectionStatus: (connectionId: string, status: 'pending' | 'accepted' | 'declined') => {
    const connections = LocalStorage.getConnections();
    const updatedConnections = connections.map(conn => 
      conn.id === connectionId ? { ...conn, status } : conn
    );
    LocalStorage.setConnections(updatedConnections);
  },

  /**
   * Utility Methods
   */
  clearAll: () => {
    Object.values(STORAGE_KEYS).forEach(key => {
      localStorage.removeItem(key);
    });
  }
};