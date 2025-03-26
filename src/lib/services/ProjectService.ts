import { supabase } from '../supabase';

export class ProjectService {
  static async createProject(project: {
    userId: string;
    title: string;
    description: string;
    status: 'planning' | 'in-progress' | 'launched';
    imageUrl?: string;
  }) {
    try {
      const { data, error } = await supabase
        .from('projects')
        .insert({
          user_id: project.userId,
          title: project.title,
          description: project.description,
          status: project.status,
          image_url: project.imageUrl
        })
        .select()
        .single();

      if (error) throw error;
      return { project: data, error: null };
    } catch (error) {
      console.error('Error creating project:', error);
      return { project: null, error };
    }
  }

  static async getProjects(userId?: string) {
    try {
      let query = supabase
        .from('projects')
        .select(`
          *,
          likes:likes(count),
          comments:comments(count)
        `)
        .order('created_at', { ascending: false });

      if (userId) {
        query = query.eq('user_id', userId);
      }

      const { data, error } = await query;

      if (error) throw error;
      return { projects: data, error: null };
    } catch (error) {
      console.error('Error fetching projects:', error);
      return { projects: null, error };
    }
  }

  static async updateProjectStatus(projectId: string, status: 'planning' | 'in-progress' | 'launched') {
    try {
      const { data, error } = await supabase
        .from('projects')
        .update({ status })
        .eq('id', projectId)
        .select()
        .single();

      if (error) throw error;
      return { project: data, error: null };
    } catch (error) {
      console.error('Error updating project status:', error);
      return { project: null, error };
    }
  }
}