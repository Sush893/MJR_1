import React, { useState, useEffect } from 'react';
import { X, ChevronRight, Loader2 } from 'lucide-react';

interface Project {
  id: string;
  title: string;
  description: string;
  status: 'planning' | 'in-progress' | 'launched';
  imageUrl?: string;
  type?: 'project' | 'pitch';
}

interface ProjectsCardProps {
  projects: Project[];
  isLoading?: boolean;
  error?: Error | null;
}

export function ProjectsCard({ projects, isLoading = false, error = null }: ProjectsCardProps) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [projectCount, setProjCount] = useState(0);
  const [pitchCount, setPitchCount] = useState(0);

  // Log the projects array to see what we're receiving
  console.log('ProjectsCard received projects:', projects);
  
  // Set project and pitch counts with useEffect to ensure they update properly
  useEffect(() => {
    // Count projects and pitches separately
    const pCount = projects?.filter(item => item.type === 'project')?.length || 0;
    const pitCount = projects?.filter(item => item.type === 'pitch')?.length || 0;
    
    setProjCount(pCount);
    setPitchCount(pitCount);
    
    console.log('ProjectsCard counts - Projects:', pCount, 'Pitches:', pitCount);
  }, [projects]);

  const getStatusColor = (status: Project['status']) => {
    switch (status) {
      case 'planning':
        return 'bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300';
      case 'in-progress':
        return 'bg-yellow-100 dark:bg-yellow-900/30 text-yellow-700 dark:text-yellow-300';
      case 'launched':
        return 'bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-300';
      default:
        return 'bg-gray-100 dark:bg-gray-900/30 text-gray-700 dark:text-gray-300';
    }
  };

  if (error) {
    return (
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-[0_4px_20px_rgba(0,0,0,0.1)] dark:shadow-gray-900/10 p-6">
        <div className="text-red-500 dark:text-red-400">
          <p>Error loading projects: {error.message}</p>
        </div>
      </div>
    );
  }

  return (
    <>
      <div 
        className="bg-white dark:bg-gray-800 rounded-xl shadow-[0_4px_20px_rgba(0,0,0,0.1)] dark:shadow-gray-900/10 p-6 cursor-pointer hover:shadow-[0_4px_25px_rgba(0,0,0,0.15)] dark:hover:shadow-gray-900/20 transition-all duration-200"
        onClick={() => setIsModalOpen(true)}
      >
        <div className="flex flex-col gap-2 mb-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              {isLoading ? (
                <Loader2 className="w-8 h-8 text-primary-600 dark:text-primary-400 animate-spin" />
              ) : (
                <span className="text-4xl font-bold text-primary-600 dark:text-primary-400">
                  {projectCount}
                </span>
              )}
              <p className="text-lg font-medium leading-tight dark:text-gray-200">Projects</p>
            </div>
          </div>
          
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              {isLoading ? (
                <Loader2 className="w-8 h-8 text-primary-600 dark:text-primary-400 animate-spin" />
              ) : (
                <span className="text-4xl font-bold text-primary-600 dark:text-primary-400">
                  {pitchCount}
                </span>
              )}
              <p className="text-lg font-medium leading-tight dark:text-gray-200">Pitches</p>
            </div>
            <ChevronRight className="w-5 h-5 ml-auto text-primary-600 dark:text-primary-400" />
          </div>
        </div>
        <div className="flex flex-wrap gap-2">
          {isLoading ? (
            <div className="w-full flex items-center justify-center py-2">
              <Loader2 className="w-5 h-5 text-primary-600 dark:text-primary-400 animate-spin" />
            </div>
          ) : projects.length > 0 ? (
            projects.slice(0, 4).map((project) => (
              <span key={project.id} className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(project.status)}`}>
                {project.title}
                {project.type && <small className="ml-1 opacity-60">({project.type})</small>}
              </span>
            ))
          ) : (
            <p className="text-gray-500 dark:text-gray-400 text-sm">No active projects</p>
          )}
        </div>
      </div>

      {/* Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white dark:bg-gray-800 rounded-2xl w-full max-w-4xl max-h-[90vh] overflow-auto">
            <div className="sticky top-0 bg-white dark:bg-gray-800 border-b border-gray-100 dark:border-gray-700 p-6 flex items-center justify-between">
              <h2 className="text-2xl font-bold dark:text-white">Active Projects & Pitches</h2>
              <button 
                onClick={() => setIsModalOpen(false)}
                className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-full transition-colors"
              >
                <X className="w-5 h-5 dark:text-gray-400" />
              </button>
            </div>
            
            <div className="p-6 grid grid-cols-1 gap-4">
              {isLoading ? (
                <div className="flex items-center justify-center py-8">
                  <Loader2 className="w-8 h-8 text-primary-600 dark:text-primary-400 animate-spin" />
                </div>
              ) : projects.length > 0 ? (
                projects.map((project) => (
                  <div 
                    key={project.id}
                    className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-6 hover:shadow-lg transition-shadow"
                  >
                    <div className="flex items-center justify-between mb-4">
                      <h3 className="text-xl font-bold dark:text-white">{project.title}</h3>
                      <div className="flex gap-2">
                        <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                          project.type === 'pitch' ? 'bg-purple-100 dark:bg-purple-900/30 text-purple-700 dark:text-purple-300' : 'bg-emerald-100 dark:bg-emerald-900/30 text-emerald-700 dark:text-emerald-300'
                        }`}>
                          {project.type === 'pitch' ? 'Pitch' : 'Project'}
                        </span>
                        <span className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(project.status)}`}>
                          {project.status}
                        </span>
                      </div>
                    </div>
                    
                    <p className="text-gray-600 dark:text-gray-400 mb-4">
                      {project.description}
                    </p>
                    
                    <div className="flex gap-3">
                      <button className="flex-1 px-4 py-2 bg-primary-500 dark:bg-primary-600 text-white rounded-full hover:bg-primary-600 dark:hover:bg-primary-500 transition-colors text-sm font-medium">
                        View Details
                      </button>
                      <button className="flex-1 px-4 py-2 border border-primary-500 dark:border-primary-400 text-primary-500 dark:text-primary-400 rounded-full hover:bg-primary-50 dark:hover:bg-primary-900/20 transition-colors text-sm font-medium">
                        Team Chat
                      </button>
                    </div>
                  </div>
                ))
              ) : (
                <div className="text-center py-8">
                  <p className="text-gray-500 dark:text-gray-400">No active projects</p>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
}