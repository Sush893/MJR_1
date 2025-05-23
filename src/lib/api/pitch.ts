import api from './client';
import { BackendPitch } from '../../types/pitch';
import { mockPitch } from '../../data/mockPitch';

interface UpdatePitchData {
  title?: string;
  description?: string;
  media_type?: 'image' | 'video';
  media_url?: string;
  tags?: string[];
}

export const PitchAPI = {
  getAllPitches: async (userId: string) => {
    console.log('PitchAPI.getAllPitches called with userId:', userId);
    try {
      // Attempt to get pitches from the server
      const response = await api.get(`/pitches/${userId}`);
      console.log('PitchAPI.getAllPitches response:', response);
      console.log('PitchAPI.getAllPitches response.data:', response.data);
      
      // Return the actual API response
      if (response.data) {
        return response.data;
      } else {
        console.warn('PitchAPI.getAllPitches: Empty response data');
        // If in development mode, provide mock data
        if (process.env.NODE_ENV === 'development') {
          return { pitches: [mockPitch] };
        }
        return { pitches: [] };
      }
    } catch (error) {
      console.error('PitchAPI.getAllPitches ERROR:', error);
      
      // Even on error, return mock data in development mode
      if (process.env.NODE_ENV === 'development') {
        console.log('PitchAPI.getAllPitches: Error occurred, using mock data in development mode');
        return { pitches: [mockPitch] };
      }
      throw error;
    }
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