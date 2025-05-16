import api from './client';
import { BackendPitch } from '../../types/pitch';

interface UpdatePitchData {
  title?: string;
  description?: string;
  media_type?: 'image' | 'video';
  media_url?: string;
  tags?: string[];
}

export const PitchAPI = {
  getAllPitches: async (userId: string) => {
    const response = await api.get(`/pitches/${userId}`);
    return response.data;
  },
  
  createPitch: async (formData: FormData) => {
    const data = {
      user_id: formData.get('user_id'),
      title: formData.get('title'),
      description: formData.get('description'),
      media_type: formData.get('media_type'),
      media_url: formData.get('media_url'),
      tags: JSON.parse(formData.get('tags') as string)
    };

    const response = await api.post('/createPitch', data);
    return response.data;
  },
  
  updatePitch: async (userId: string, pitchId: string, data: UpdatePitchData) => {
    // Convert frontend format to backend format
    const backendData = {
      title: data.title,
      description: data.description,
      media_type: data.media_type,
      media_url: data.media_url,
      tags: data.tags
    };

    const response = await api.put(`/updatePitch/${userId}/${pitchId}`, backendData);
    return response.data;
  },

  deletePitch: async (userId: string, pitchId: string) => {
    const response = await api.delete(`/deletePitch/${userId}/${pitchId}`);
    return response.data;
  }
};