import { useState, useEffect, useCallback } from 'react';
import { ProfileAPI } from '../lib/api/profile';
import { ProjectAPI } from '../lib/api/project';
import { PitchAPI } from '../lib/api/pitch';
import { useAuth } from '../contexts/AuthContext';
import { BackendPitch } from '../types/pitch';
import { mockPitch } from '../data/mockPitch';

export interface DashboardData {
  profile: any;
  projects: any[];
  pitches: BackendPitch[];
  matches: any[];
  communities: any[];
  analytics: any;
  isLoading: boolean;
  error: Error | null;
  refetch: () => Promise<void>;
}

export function useDashboardSync() {
  const { profile: authProfile } = useAuth();
  const [dashboardData, setDashboardData] = useState<Omit<DashboardData, 'refetch'>>({
    profile: null,
    projects: [],
    pitches: [],
    matches: [],
    communities: [],
    analytics: null,
    isLoading: true,
    error: null,
  });

  const fetchDashboardData = useCallback(async () => {
    if (!authProfile?.id) {
      console.warn('No user profile found. Make sure you are logged in.');
      return;
    }

    try {
      setDashboardData(prev => ({ ...prev, isLoading: true, error: null }));
      console.log('🔄 Fetching dashboard data for user:', authProfile.id);

      // Log used endpoints for debugging
      console.log('📍 DEBUG: API Endpoints that will be called:');
      console.log(`📍 Projects Endpoint: /projects/${authProfile.id}`);
      console.log(`📍 Pitches Endpoint: /pitches/${authProfile.id}`);

      // Fetch all data in parallel
      const [profileResponse, projectsResponse, pitchesResponse] = await Promise.all([
        ProfileAPI.getProfile().catch(error => {
          console.error('Failed to fetch profile:', error);
          throw error;
        }),
        ProjectAPI.getAllProjects(authProfile.id).catch(error => {
          console.error('Failed to fetch projects:', error);
          throw error;
        }),
        PitchAPI.getAllPitches(authProfile.id).catch(error => {
          console.error('Failed to fetch pitches:', error);
          throw error;
        })
      ]);
      
      // More detailed logging of the pitch response
      console.log('📊 COMPLETE PITCH RESPONSE:', pitchesResponse);

      // Extract projects and pitches from the responses
      const projects = Array.isArray(projectsResponse.data) ? projectsResponse.data : [];
      
      // Extract pitches from API response - expect { pitches: [] } format
      let pitches: BackendPitch[] = [];
      
      if (pitchesResponse && pitchesResponse.pitches && Array.isArray(pitchesResponse.pitches)) {
        pitches = pitchesResponse.pitches;
        console.log('📍 Found pitches in response:', pitches.length);
      } else {
        console.log('📍 No pitches found in expected format');
      }
      
      // Log details about what we found
      console.log('📊 Final pitch data:', {
        found: pitches.length > 0,
        count: pitches.length,
        source: 'backend API'
      });

      // Update dashboard data
      setDashboardData({
        profile: profileResponse.data,
        projects: projects,
        pitches: pitches,
        matches: profileResponse.data?.matches || [],
        communities: profileResponse.data?.communities || [],
        analytics: {
          connections: profileResponse.data?.connections || [],
          projects: projects,
          pitches: pitches,
          events: profileResponse.data?.events || []
        },
        isLoading: false,
        error: null,
      });
    } catch (error: any) {
      console.error('❌ Dashboard sync error:', error);
      setDashboardData(prev => ({
        ...prev,
        isLoading: false,
        error: new Error(error.message || 'Failed to sync dashboard data'),
      }));
    }
  }, [authProfile?.id]);

  useEffect(() => {
    fetchDashboardData();

    // Set up polling for real-time updates (every 30 seconds)
    const pollInterval = setInterval(fetchDashboardData, 30000);

    return () => {
      clearInterval(pollInterval);
    };
  }, [fetchDashboardData]);

  return {
    ...dashboardData,
    refetch: fetchDashboardData
  };
} 