import { LocalStorage } from '../storage/localStorage';

export const ProjectAPI = {
  getAllProjects: () => {
    const projects = LocalStorage.getProjects();
    return Promise.resolve({ data: projects });
  },
  
  createProject: (formData: FormData) => {
    const title = formData.get('title') as string;
    const image = formData.get('image') as string;
    const status = formData.get('status') as 'active' | 'completed' | 'achieved';

    const newProject = {
      id: Date.now().toString(),
      title,
      image,
      tasksRemaining: '0/0',
      progress: 0,
      collaborators: 0,
      status
    };

    LocalStorage.addProject(newProject);
    return Promise.resolve({ data: newProject });
  },
  
  updateProjectStatus: (id: string, status: 'active' | 'completed' | 'achieved') => {
    const projects = LocalStorage.getProjects();
    const updatedProjects = projects.map(project => 
      project.id === id 
        ? { ...project, status }
        : project
    );
    LocalStorage.setProjects(updatedProjects);
    return Promise.resolve({ data: { success: true } });
  }
};