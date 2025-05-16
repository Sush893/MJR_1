import { useState, useEffect } from 'react';
import { ProfileAPI } from '../lib/api/profile';
import { ProjectAPI } from '../lib/api/project';
import { PitchAPI } from '../lib/api/pitch';
import { useAuth } from '../contexts/AuthContext';

export interface DashboardData {
  profile: any;
  projects: any[];
  pitches: any[];
  matches: any[];
  communities: any[];
  analytics: any;
  isLoading: boolean;
  error: Error | null;
}

export function useDashboardSync() {
  const { profile: authProfile } = useAuth();
  const [dashboardData, setDashboardData] = useState<DashboardData>({
    profile: null,
    projects: [],
    pitches: [],
    matches: [],
    communities: [],
    analytics: null,
    isLoading: true,
    error: null,
  });

  useEffect(() => {
    const fetchDashboardData = async () => {
      if (!authProfile?.id) return;

      try {
        setDashboardData(prev => ({ ...prev, isLoading: true, error: null }));

        // Fetch all data in parallel
        const [profileResponse, projectsResponse, pitchesResponse] = await Promise.all([
          ProfileAPI.getProfile(),
          ProjectAPI.getAllProjects(authProfile.id),
          PitchAPI.getAllPitches(authProfile.id)
        ]);

        // Update dashboard data
        setDashboardData({
          profile: profileResponse.data,
          projects: projectsResponse.data || [],
          pitches: pitchesResponse.data || [],
          matches: profileResponse.data.matches || [],
          communities: profileResponse.data.communities || [],
          analytics: {
            connections: profileResponse.data.connections || [],
            projects: projectsResponse.data || [],
            pitches: pitchesResponse.data || [],
            events: profileResponse.data.events || []
          },
          isLoading: false,
          error: null,
        });
      } catch (error: any) {
        console.error('Dashboard sync error:', error);
        setDashboardData(prev => ({
          ...prev,
          isLoading: false,
          error: new Error(error.message || 'Failed to sync dashboard data'),
        }));
      }
    };

    fetchDashboardData();

    // Set up polling for real-time updates (every 30 seconds)
    const pollInterval = setInterval(fetchDashboardData, 30000);

    return () => {
      clearInterval(pollInterval);
    };
  }, [authProfile?.id]);

  return dashboardData;
} 