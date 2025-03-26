import React, { useState, useEffect } from 'react';
import { MoreVertical, CheckCircle, Award } from 'lucide-react';
import { ProjectEditor } from './ProjectsPage/ProjectEditor';
import { ProjectAPI } from '../lib/api/project';
import { LoadingSpinner } from './common/LoadingSpinner';

interface Project {
  id: string;
  title: string;
  image: string;
  tasksRemaining: string;
  progress: number;
  collaborators: number;
  status: 'active' | 'completed' | 'achieved';
}

export function ProjectsPage() {
  const [activeFilter, setActiveFilter] = useState<'active' | 'completed' | 'achieved'>('active');
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [isEditing, setIsEditing] = useState(false);
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    loadProjects();
  }, []);

  const loadProjects = async () => {
    try {
      const { data } = await ProjectAPI.getAllProjects();
      setProjects(data);
    } catch (err) {
      console.error('Error loading projects:', err);
      setError('Failed to load projects');
    } finally {
      setLoading(false);
    }
  };

  const handleCreateProject = async (formData: FormData) => {
    try {
      await ProjectAPI.createProject(formData);
      await loadProjects();
      setIsEditing(false);
    } catch (err) {
      console.error('Error creating project:', err);
      setError('Failed to create project');
    }
  };

  const handleUpdateStatus = async (projectId: string, status: 'active' | 'completed' | 'achieved') => {
    try {
      await ProjectAPI.updateProjectStatus(projectId, status);
      await loadProjects();
    } catch (err) {
      console.error('Error updating project status:', err);
      setError('Failed to update project status');
    }
  };

  const filteredProjects = projects.filter(project => project.status === activeFilter);

  const FilterButton = ({ status, icon: Icon }: { status: typeof activeFilter, icon?: React.ComponentType<any> }) => (
    <button
      onClick={() => setActiveFilter(status)}
      className={`px-6 py-2 rounded-full transition-all duration-200 flex items-center gap-2
        ${activeFilter === status 
          ? 'bg-primary-500 dark:bg-primary-600 text-white' 
          : 'bg-primary-100/50 dark:bg-primary-900/30 text-primary-700 dark:text-primary-300 hover:bg-primary-100 dark:hover:bg-primary-900/50'}`}
    >
      {Icon && <Icon className="w-4 h-4" />}
      {status.charAt(0).toUpperCase() + status.slice(1)}
    </button>
  );

  if (loading) return <LoadingSpinner />;
  if (error) return <div className="p-8 text-center text-red-500">{error}</div>;

  return (
    <div className="p-8">
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-2xl font-bold dark:text-white">My Projects</h1>
        <button 
          onClick={() => setIsEditing(true)}
          className="px-6 py-2 bg-primary-500 dark:bg-primary-600 text-white rounded-full hover:bg-primary-600 dark:hover:bg-primary-500 transition-colors"
        >
          New Project
        </button>
      </div>

      <div className="flex gap-4 mb-8">
        <FilterButton status="active" />
        <FilterButton status="completed" icon={CheckCircle} />
        <FilterButton status="achieved" icon={Award} />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredProjects.map(project => (
          <div 
            key={project.id}
            className="bg-white dark:bg-gray-800 rounded-xl shadow-[0_4px_20px_rgba(0,0,0,0.1)] dark:shadow-gray-900/10 overflow-hidden hover:shadow-[0_4px_25px_rgba(0,0,0,0.15)] dark:hover:shadow-gray-900/20 transition-all duration-200 cursor-pointer"
            onClick={() => setSelectedProject(project)}
          >
            <div className="relative h-48">
              <img 
                src={project.image} 
                alt={project.title}
                className="w-full h-full object-cover"
              />
              <button className="absolute top-4 right-4 p-2 bg-white/90 dark:bg-gray-800/90 rounded-full hover:bg-white dark:hover:bg-gray-700 transition-colors">
                <MoreVertical className="w-5 h-5 text-gray-600 dark:text-gray-300" />
              </button>
            </div>
            
            <div className="p-6">
              <h3 className="text-lg font-semibold mb-4 dark:text-white">{project.title}</h3>
              
              <div className="space-y-4">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-600 dark:text-gray-400">Tasks Remaining:</span>
                  <span className="font-medium dark:text-gray-300">{project.tasksRemaining}</span>
                </div>
                
                <div>
                  <div className="flex justify-between text-sm mb-1">
                    <span className="text-gray-600 dark:text-gray-400">Progress:</span>
                    <span className="font-medium dark:text-gray-300">{project.progress}%</span>
                  </div>
                  <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                    <div 
                      className="bg-primary-500 dark:bg-primary-400 h-2 rounded-full transition-all duration-300"
                      style={{ width: `${project.progress}%` }}
                    />
                  </div>
                </div>
                
                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-600 dark:text-gray-400">Collaborators:</span>
                  <span className="font-medium dark:text-gray-300">{project.collaborators}</span>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {isEditing && (
        <ProjectEditor
          onSave={handleCreateProject}
          onClose={() => setIsEditing(false)}
        />
      )}
    </div>
  );
}