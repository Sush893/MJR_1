import React, { useState, useEffect } from 'react';
import { MoreVertical, CheckCircle, Award, Pencil, Trash2 } from 'lucide-react';
import { ProjectEditor } from './ProjectsPage/ProjectEditor';
import { ProjectAPI } from '../lib/api/project';
import { AuthAPI } from '../lib/api/auth';
import { LoadingSpinner } from './common/LoadingSpinner';
import { useAuth } from '../contexts/AuthContext';

interface Project {
  id: string;
  title: string;
  description: string;
  image_url: string;
  status: 'planning' | 'in-progress' | 'launched';
  progress: number;
  collaborators: number;
  tasksRemaining: string;
}

export function ProjectsPage() {
  const { user } = useAuth();
  const [activeFilter, setActiveFilter] = useState<'planning' | 'in-progress' | 'launched'>('planning');
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [isEditing, setIsEditing] = useState(false);
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [showActions, setShowActions] = useState<string | null>(null);

  useEffect(() => {
    if (user?.id) {
      loadProjects();
    }
  }, [user?.id]);

  const loadProjects = async () => {
    if (!user?.id) return;
    try {
      console.log('📱 ProjectsPage - Loading projects for user ID:', user.id);
      const { data } = await ProjectAPI.getAllProjects(user.id.toString());
      console.log('📱 ProjectsPage - Loaded projects:', data);
      setProjects(data);
    } catch (err) {
      console.error('Error loading projects:', err);
      setError('Failed to load projects');
    } finally {
      setLoading(false);
    }
  };

  const handleCreateProject = async (formData: FormData) => {
    if (!user?.id) return;
    try {
      formData.append('user_id', user.id.toString());
      await ProjectAPI.createProject(formData);
      await loadProjects();
      setIsEditing(false);
    } catch (err) {
      console.error('Error creating project:', err);
      setError('Failed to create project');
    }
  };

  const handleEditProject = async (project: Project) => {
    setSelectedProject(project);
    setIsEditing(true);
  };

  const handleDeleteProject = async (projectId: string) => {
    if (!user?.id) return;
    try {
      await ProjectAPI.deleteProject(projectId, user.id.toString());
      await loadProjects();
    } catch (err) {
      console.error('Error deleting project:', err);
      setError('Failed to delete project');
    }
  };

  const handleUpdateProject = async (formData: FormData) => {
    if (!user?.id || !selectedProject) return;
    try {
      await ProjectAPI.updateProject(selectedProject.id, user.id.toString(), {
        title: formData.get('title') as string,
        description: formData.get('Description') as string,
        status: formData.get('status') as 'planning' | 'in-progress' | 'launched',
        imageUrl: formData.get('image_url') as string
      });
      await loadProjects();
      setSelectedProject(null);
      setIsEditing(false);
    } catch (err) {
      console.error('Error updating project:', err);
      setError('Failed to update project');
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
      {status === 'in-progress' ? 'In Progress' : status.charAt(0).toUpperCase() + status.slice(1)}
    </button>
  );

  if (loading) return <LoadingSpinner />;
  if (error) return <div className="p-8 text-center text-red-500">{error}</div>;

  return (
    <div className="p-8">
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-2xl font-bold dark:text-white">My Projects</h1>
        <button 
          onClick={() => {
            setSelectedProject(null);
            setIsEditing(true);
          }}
          className="px-6 py-2 bg-primary-500 dark:bg-primary-600 text-white rounded-full hover:bg-primary-600 dark:hover:bg-primary-500 transition-colors"
        >
          New Project
        </button>
      </div>

      <div className="flex gap-4 mb-8">
        <FilterButton status="planning" />
        <FilterButton status="in-progress" icon={CheckCircle} />
        <FilterButton status="launched" icon={Award} />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredProjects.map(project => (
          <div 
            key={project.id}
            className="bg-white dark:bg-gray-800 rounded-xl shadow-[0_4px_20px_rgba(0,0,0,0.1)] dark:shadow-gray-900/10 overflow-hidden hover:shadow-[0_4px_25px_rgba(0,0,0,0.15)] dark:hover:shadow-gray-900/20 transition-all duration-200"
          >
            <div className="relative h-48">
              <img 
                src={project.image_url} 
                alt={project.title}
                className="w-full h-full object-cover"
              />
              <div className="absolute top-4 right-4">
                <button 
                  className="p-2 bg-white/90 dark:bg-gray-800/90 rounded-full hover:bg-white dark:hover:bg-gray-700 transition-colors"
                  onClick={(e) => {
                    e.stopPropagation();
                    setShowActions(showActions === project.id ? null : project.id);
                  }}
                >
                  <MoreVertical className="w-5 h-5 text-gray-600 dark:text-gray-300" />
                </button>
                {showActions === project.id && (
                  <div className="absolute right-0 mt-2 w-48 bg-white dark:bg-gray-800 rounded-lg shadow-lg overflow-hidden">
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        handleEditProject(project);
                        setShowActions(null);
                      }}
                      className="w-full px-4 py-2 text-left flex items-center gap-2 hover:bg-gray-100 dark:hover:bg-gray-700"
                    >
                      <Pencil className="w-4 h-4" />
                      Edit Project
                    </button>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        if (window.confirm('Are you sure you want to delete this project?')) {
                          handleDeleteProject(project.id);
                        }
                        setShowActions(null);
                      }}
                      className="w-full px-4 py-2 text-left flex items-center gap-2 hover:bg-gray-100 dark:hover:bg-gray-700 text-red-600"
                    >
                      <Trash2 className="w-4 h-4" />
                      Delete Project
                    </button>
                  </div>
                )}
              </div>
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
          project={selectedProject}
          onSave={selectedProject ? handleUpdateProject : handleCreateProject}
          onClose={() => {
            setSelectedProject(null);
            setIsEditing(false);
          }}
        />
      )}
    </div>
  );
}