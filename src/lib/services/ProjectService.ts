import api from '../api/client';

type ProjectStatus = 'planning' | 'in-progress' | 'launched';
type StatusNumber = 1 | 2 | 3;

// Map status strings to numbers
const STATUS_MAP: Record<ProjectStatus, StatusNumber> = {
  'planning': 1,
  'in-progress': 2,
  'launched': 3
};

// Map status numbers back to strings
const STATUS_REVERSE_MAP: Record<StatusNumber, ProjectStatus> = {
  1: 'planning',
  2: 'in-progress',
  3: 'launched'
};

export class ProjectService {
  static async createProject(project: {
    userId: string;
    title: string;
    description: string;
    status: ProjectStatus;
    imageUrl?: string;
  }) {
    try {
      const response = await api.post('/createProject', {
        user_id: project.userId,
        title: project.title,
        Description: project.description,
        status: STATUS_MAP[project.status],
        image_url: project.imageUrl
      });

      // Convert status number back to string in the response
      const projectData = response.data.project;
      if (projectData && typeof projectData.status === 'number') {
        projectData.status = STATUS_REVERSE_MAP[projectData.status as StatusNumber];
      }

      return { project: projectData, error: null };
    } catch (error) {
      console.error('Error creating project:', error);
      return { project: null, error };
    }
  }

  static async getProjects(userId?: string) {
    try {
      if (!userId) {
        throw new Error('userId is required');
      }

      const response = await api.get(`/projects/${userId}`);
      
      // Convert status numbers back to strings in the response
      const projects = response.data.projects?.map((project: any) => ({
        ...project,
        status: typeof project.status === 'number' ? STATUS_REVERSE_MAP[project.status as StatusNumber] : project.status
      }));

      return { projects, error: null };
    } catch (error) {
      console.error('Error fetching projects:', error);
      return { projects: null, error };
    }
  }

  static async updateProject(projectId: string, userId: string, updates: {
    title?: string;
    description?: string;
    status?: ProjectStatus;
    imageUrl?: string;
  }) {
    try {
      const response = await api.put(`/projects/${userId}/${projectId}`, {
        title: updates.title,
        Description: updates.description,
        status: updates.status ? STATUS_MAP[updates.status] : undefined,
        image_url: updates.imageUrl
      });

      // Convert status number back to string in the response
      const projectData = response.data.project;
      if (projectData && typeof projectData.status === 'number') {
        projectData.status = STATUS_REVERSE_MAP[projectData.status as StatusNumber];
      }

      return { project: projectData, error: null };
    } catch (error) {
      console.error('Error updating project:', error);
      return { project: null, error };
    }
  }

  static async deleteProject(projectId: string, userId: string) {
    try {
      const response = await api.delete(`/projects/${userId}/${projectId}`);
      return { success: true, error: null };
    } catch (error) {
      console.error('Error deleting project:', error);
      return { success: false, error };
    }
  }
}