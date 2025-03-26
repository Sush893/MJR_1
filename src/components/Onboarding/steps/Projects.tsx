import React, { useState } from 'react';
import { Plus, X } from 'lucide-react';
import { OnboardingData } from '../OnboardingFlow';

interface Props {
  data: OnboardingData;
  onNext: (data: Partial<OnboardingData>) => void;
}

interface ProjectForm {
  name: string;
  description: string;
  status: 'planning' | 'in-progress' | 'launched';
}

const initialProject: ProjectForm = {
  name: '',
  description: '',
  status: 'planning'
};

export function Projects({ data, onNext }: Props) {
  const [projects, setProjects] = useState<ProjectForm[]>(data.activeProjects);
  const [currentProject, setCurrentProject] = useState<ProjectForm>(initialProject);
  const [isAdding, setIsAdding] = useState(false);

  const handleAddProject = () => {
    if (currentProject.name && currentProject.description) {
      setProjects([...projects, currentProject]);
      setCurrentProject(initialProject);
      setIsAdding(false);
    }
  };

  const handleRemoveProject = (index: number) => {
    setProjects(projects.filter((_, i) => i !== index));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onNext({ activeProjects: projects });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="space-y-4">
        {projects.map((project, index) => (
          <div 
            key={index}
            className="bg-gray-50 dark:bg-gray-700 rounded-lg p-4 relative"
          >
            <button
              type="button"
              onClick={() => handleRemoveProject(index)}
              className="absolute top-2 right-2 p-1 hover:bg-gray-200 dark:hover:bg-gray-600 rounded-full"
            >
              <X className="w-4 h-4" />
            </button>
            <h3 className="font-medium dark:text-white">{project.name}</h3>
            <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
              {project.description}
            </p>
            <span className="inline-block mt-2 text-xs font-medium px-2 py-1 bg-primary-100 dark:bg-primary-900/30 text-primary-700 dark:text-primary-300 rounded-full">
              {project.status}
            </span>
          </div>
        ))}
      </div>

      {isAdding ? (
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Project Name
            </label>
            <input
              type="text"
              value={currentProject.name}
              onChange={(e) => setCurrentProject({ ...currentProject, name: e.target.value })}
              className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-lg"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Description
            </label>
            <textarea
              value={currentProject.description}
              onChange={(e) => setCurrentProject({ ...currentProject, description: e.target.value })}
              className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-lg"
              rows={3}
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Status
            </label>
            <select
              value={currentProject.status}
              onChange={(e) => setCurrentProject({ 
                ...currentProject, 
                status: e.target.value as 'planning' | 'in-progress' | 'launched'
              })}
              className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-lg"
            >
              <option value="planning">Planning</option>
              <option value="in-progress">In Progress</option>
              <option value="launched">Launched</option>
            </select>
          </div>

          <div className="flex gap-3">
            <button
              type="button"
              onClick={handleAddProject}
              className="flex-1 py-2 bg-primary-500 text-white rounded-lg hover:bg-primary-600"
            >
              Add Project
            </button>
            <button
              type="button"
              onClick={() => setIsAdding(false)}
              className="flex-1 py-2 border border-gray-300 rounded-lg hover:bg-gray-50"
            >
              Cancel
            </button>
          </div>
        </div>
      ) : (
        <button
          type="button"
          onClick={() => setIsAdding(true)}
          className="flex items-center gap-2 w-full p-3 border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-lg text-gray-600 dark:text-gray-400 hover:border-primary-500 hover:text-primary-500 transition-colors"
        >
          <Plus className="w-5 h-5" />
          Add Project
        </button>
      )}

      <button
        type="submit"
        className="w-full py-3 bg-primary-500 text-white rounded-lg hover:bg-primary-600 transition-colors"
      >
        Continue
      </button>
    </form>
  );
}