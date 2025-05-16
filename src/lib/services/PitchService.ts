import { Pitch } from '../../types/pitch';
import api from '../api/client';

interface CreatePitchData {
  author: {
    id: string;
    name: string;
    avatar?: string;
    role?: string;
  };
  title: string;
  description: string;
  media: {
    type: string;
    url: string;
  };
  tags: string[];
}

export class PitchService {
  static async createPitch(pitch: CreatePitchData) {
    try {
      const response = await api.post('/createPitch', {
        user_id: pitch.author.id,
        title: pitch.title,
        description: pitch.description,
        media_type: pitch.media.type,
        media_url: pitch.media.url,
        tags: pitch.tags
      });

      return { pitch: response.data.pitch, error: null };
    } catch (error) {
      console.error('Error creating pitch:', error);
      return { pitch: null, error };
    }
  }

  static async getPitches(userId?: string) {
    try {
      if (!userId) {
        throw new Error('userId is required');
      }

      const response = await api.get(`/pitches/${userId}`);
      return { pitches: response.data.pitches, error: null };
    } catch (error) {
      console.error('Error fetching pitches:', error);
      return { pitches: null, error };
    }
  }

  static async updatePitch(pitchId: string, userId: string, updates: Partial<Pitch>) {
    try {
      const response = await api.put(`/updatePitch/${userId}/${pitchId}`, {
        title: updates.title,
        description: updates.description,
        media_type: updates.media?.type,
        media_url: updates.media?.url,
        tags: updates.tags
      });

      return { pitch: response.data.pitch, error: null };
    } catch (error) {
      console.error('Error updating pitch:', error);
      return { pitch: null, error };
    }
  }

  static async deletePitch(pitchId: string, userId: string) {
    try {
      await api.delete(`/deletePitch/${userId}/${pitchId}`);
      return { success: true, error: null };
    } catch (error) {
      console.error('Error deleting pitch:', error);
      return { success: false, error };
    }
  }

  static async likePitch(pitchId: string, userId: string) {
    try {
      const response = await api.post(`/pitches/${pitchId}/like`, { userId });
      return { data: response.data, error: null };
    } catch (error) {
      console.error('Error liking pitch:', error);
      return { data: null, error };
    }
  }

  static async commentOnPitch(pitchId: string, userId: string, content: string) {
    try {
      const response = await api.post(`/pitches/${pitchId}/comment`, {
        userId,
        content
      });
      return { comment: response.data.comment, error: null };
    } catch (error) {
      console.error('Error commenting on pitch:', error);
      return { comment: null, error };
    }
  }
}