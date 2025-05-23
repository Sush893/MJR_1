import React from 'react';
import { Calendar } from './Calendar';
import { QuickActions } from './QuickActions';
import { Community } from './Community';
import { ProjectsCard } from './ProjectsCard';
import { MatchesCard } from './MatchesCard';
import { AnalyticsChart } from './AnalyticsChart';
import { RecommendedStartups } from './RecommendedStartups';
import { useDashboardSync } from '../hooks/useDashboardSync';
import { useAuth } from '../contexts/AuthContext';
import { BackendPitch } from '../types/pitch';

// Define interface for combined project/pitch type
interface ProjectCardItem {
  id: string;
  title: string;
  description: string;
  status: 'planning' | 'in-progress' | 'launched';
  imageUrl?: string;
  type: 'project' | 'pitch';
}

export function DashboardContent() {
  const { user, profile: authProfile } = useAuth();
  const { 
    profile, 
    projects, 
    pitches, 
    matches, 
    communities, 
    analytics, 
    isLoading, 
    error,
    refetch 
  } = useDashboardSync();

  // Debug logs for detailed pitch data inspection
  console.log('PITCH DATA DEBUG - Raw pitches:', pitches);
  console.log('PITCH DATA DEBUG - Pitches type:', typeof pitches);
  console.log('PITCH DATA DEBUG - Is array?', Array.isArray(pitches));
  console.log('PITCH DATA DEBUG - Pitches length:', pitches?.length || 0);
  
  if (pitches && pitches.length > 0) {
    console.log('PITCH DATA DEBUG - First pitch example:', pitches[0]);
    console.log('PITCH DATA DEBUG - First pitch keys:', pitches[0] ? Object.keys(pitches[0]) : 'No keys');
  } else {
    console.log('PITCH DATA DEBUG - No pitches found');
  }

  // Combine projects and pitches for the ProjectsCard
  const allProjects: ProjectCardItem[] = [
    // Map projects data
    ...(projects || []).map(project => ({
      id: project.id || `project-${Math.random().toString(36).substr(2, 9)}`,
      title: project.title || 'Untitled Project',
      description: project.description || '',
      status: (project.status as 'planning' | 'in-progress' | 'launched') || 'planning',
      imageUrl: project.imageUrl || project.media_url || '',
      type: 'project' as const
    })),
    
    // Map pitches data with more flexible property access
    ...(pitches || []).map((pitch: BackendPitch) => {
      console.log('PITCH DATA DEBUG - Mapping pitch:', pitch);
      return {
        id: pitch.id || `pitch-${Math.random().toString(36).substr(2, 9)}`,
        title: pitch.title || 'Untitled Pitch',
        description: pitch.description || '',
        status: 'planning' as const,
        imageUrl: pitch.media_url || '',
        type: 'pitch' as const
      };
    })
  ];

  // Debug log to trace data
  console.log('DASHBOARD DEBUG - Combined Project+Pitch data:', allProjects);
  console.log('PITCH COUNT:', pitches ? pitches.length : 0);
  console.log('PROJECT COUNT:', projects ? projects.length : 0);
  console.log('PITCH COUNT in allProjects:', allProjects.filter(p => p.type === 'pitch').length);
  console.log('PROJECT COUNT in allProjects:', allProjects.filter(p => p.type === 'project').length);

  if (isLoading) {
    return (
      <div className="p-8 flex items-center justify-center min-h-[calc(100vh-80px)]">
        <div className="flex flex-col items-center space-y-4">
          <div className="w-12 h-12 border-4 border-emerald-500 border-t-transparent rounded-full animate-spin"></div>
          <p className="text-gray-600 dark:text-gray-400">Loading your dashboard...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-8 flex items-center justify-center min-h-[calc(100vh-80px)]">
        <div className="bg-red-50 dark:bg-red-900/20 p-6 rounded-xl max-w-lg text-center">
          <h3 className="text-red-800 dark:text-red-200 font-semibold text-lg mb-2">Error Loading Dashboard</h3>
          <p className="text-red-600 dark:text-red-300">{error.message}</p>
          <button 
            onClick={() => refetch()}
            className="mt-4 px-4 py-2 bg-red-100 dark:bg-red-800 text-red-700 dark:text-red-200 rounded-lg hover:bg-red-200 dark:hover:bg-red-700 transition-colors"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  if (!profile) {
    return (
      <div className="p-8 flex items-center justify-center min-h-[calc(100vh-80px)]">
        <div className="bg-yellow-50 dark:bg-yellow-900/20 p-6 rounded-xl max-w-lg text-center">
          <h3 className="text-yellow-800 dark:text-yellow-200 font-semibold text-lg mb-2">Profile Not Found</h3>
          <p className="text-yellow-600 dark:text-yellow-300">Please complete your profile setup to view the dashboard.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="p-8">
      {/* Profile Card */}
      <div className="mb-8 bg-white dark:bg-gray-800 rounded-xl shadow-[0_4px_20px_rgba(0,0,0,0.1)] p-8 flex flex-col items-center">
        <img
          src={profile.avatar_url || "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=150&h=150"}
          alt={profile.full_name || "Profile"}
          className="w-32 h-32 rounded-full object-cover mb-4 ring-4 ring-emerald-500/20"
        />
        <h2 className="text-2xl font-bold dark:text-white">
          {authProfile?.full_name || profile.full_name || `${profile.first_name} ${profile.last_name}`}
        </h2>
        <p className="text-gray-500 dark:text-gray-400 mt-1">{profile.role || 'Entrepreneur'}</p>
        <p className="text-gray-400 dark:text-gray-500 text-sm mt-1">{user?.email}</p>
      </div>

      {/* Grid of 4 cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <ProjectsCard 
          projects={allProjects} 
          isLoading={isLoading} 
          error={error} 
        />
        <MatchesCard interests={matches || []} />
        <QuickActions />
        <Community communities={communities || []} />
      </div>

      {/* Recommendations Section */}
      <div className="mt-8">
        <RecommendedStartups />
      </div>

      {/* Calendar and Analytics in a row */}
      <div className="mt-8 grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Calendar />
        <AnalyticsChart data={analytics || []} />
      </div>
    </div>
  );
}