import { ProjectService } from '../services/ProjectService';

export const ProjectAPI = {
  getAllProjects: async (userId?: string) => {
    const { projects, error } = await ProjectService.getProjects(userId);
    if (error) throw error;
    return { data: projects };
  },
  
  createProject: async (formData: FormData) => {
    // Convert FormData to the format expected by ProjectService
    const projectData = {
      userId: formData.get('user_id') as string,
      title: formData.get('title') as string,
      description: formData.get('Description') as string,
      status: formData.get('status') as 'planning' | 'in-progress' | 'launched',
      imageUrl: formData.get('image_url') as string
    };

    const { project, error } = await ProjectService.createProject(projectData);
    if (error) throw error;
    return { data: project };
  },
  
  updateProject: async (projectId: string, userId: string, updates: {
    title?: string;
    description?: string;
    status?: 'planning' | 'in-progress' | 'launched';
    imageUrl?: string;
  }) => {
    const { project, error } = await ProjectService.updateProject(projectId, userId, updates);
    if (error) throw error;
    return { data: project };
  },

  deleteProject: async (projectId: string, userId: string) => {
    const { success, error } = await ProjectService.deleteProject(projectId, userId);
    if (error) throw error;
    return { success };
  }
};