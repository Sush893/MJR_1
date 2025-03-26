import api from './client';
import { BlogPost } from '../../types/profile';

export const BlogAPI = {
  getAllPosts: () => api.get('/blog'),
  
  getMyPosts: () => api.get('/blog/my-posts'),
  
  createPost: (data: Omit<BlogPost, 'id' | 'createdAt'>) => 
    api.post('/blog', data),
  
  updatePost: (id: string, data: Partial<BlogPost>) => 
    api.patch(`/blog/${id}`, data),
  
  deletePost: (id: string) => api.delete(`/blog/${id}`)
};