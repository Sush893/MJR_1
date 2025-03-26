import React, { useState } from 'react';
import { X, ChevronRight } from 'lucide-react';

interface Project {
  name: string;
  description: string;
  status: 'planning' | 'in-progress' | 'launched';
}

interface ProjectsCardProps {
  projects: Project[];
}

export function ProjectsCard({ projects }: ProjectsCardProps) {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const getStatusColor = (status: Project['status']) => {
    switch (status) {
      case 'planning':
        return 'bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300';
      case 'in-progress':
        return 'bg-yellow-100 dark:bg-yellow-900/30 text-yellow-700 dark:text-yellow-300';
      case 'launched':
        return 'bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-300';
    }
  };

  return (
    <>
      <div 
        className="bg-white dark:bg-gray-800 rounded-xl shadow-[0_4px_20px_rgba(0,0,0,0.1)] dark:shadow-gray-900/10 p-6 cursor-pointer hover:shadow-[0_4px_25px_rgba(0,0,0,0.15)] dark:hover:shadow-gray-900/20 transition-all duration-200"
        onClick={() => setIsModalOpen(true)}
      >
        <div className="flex items-center gap-4 mb-6">
          <span className="text-5xl font-bold text-primary-600 dark:text-primary-400">
            {projects.length}
          </span>
          <p className="text-lg font-medium leading-tight dark:text-gray-200">Active Projects & Pitches</p>
          <ChevronRight className="w-5 h-5 ml-auto text-primary-600 dark:text-primary-400" />
        </div>
        <div className="flex flex-wrap gap-2">
          {projects.slice(0, 4).map((project) => (
            <span key={project.name} className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(project.status)}`}>
              {project.name}
            </span>
          ))}
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
            
            <div className="p-6 space-y-6">
              {projects.map((project) => (
                <div 
                  key={project.name}
                  className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-6 hover:shadow-lg transition-shadow"
                >
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-xl font-bold dark:text-white">{project.name}</h3>
                    <span className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(project.status)}`}>
                      {project.status}
                    </span>
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
              ))}
            </div>
          </div>
        </div>
      )}
    </>
  );
}