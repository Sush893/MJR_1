import { LocalStorage } from '../storage/localStorage';
import { Pitch } from '../../types/pitch';

export const PitchAPI = {
  getAllPitches: () => {
    const pitches = LocalStorage.getPitches();
    return Promise.resolve({ data: pitches });
  },
  
  createPitch: (formData: FormData) => {
    const user = LocalStorage.getUser();
    const profile = LocalStorage.getProfile();

    if (!user || !profile) {
      return Promise.reject(new Error('User not authenticated'));
    }

    const title = formData.get('title') as string;
    const description = formData.get('description') as string;
    const mediaType = formData.get('mediaType') as 'image' | 'video';
    const mediaUrl = formData.get('mediaUrl') as string;
    const tags = JSON.parse(formData.get('tags') as string);

    const newPitch: Pitch = {
      id: Date.now().toString(),
      title,
      description,
      media: {
        type: mediaType,
        url: mediaUrl
      },
      author: {
        id: user.id,
        name: user.full_name,
        avatar: profile.avatar_url || 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=150',
        role: profile.role || 'Entrepreneur'
      },
      tags,
      likes: 0,
      comments: 0,
      createdAt: new Date().toISOString()
    };

    LocalStorage.addPitch(newPitch);
    return Promise.resolve({ data: newPitch });
  },
  
  likePitch: (id: string) => {
    const pitches = LocalStorage.getPitches();
    const updatedPitches = pitches.map(pitch => 
      pitch.id === id 
        ? { ...pitch, likes: pitch.likes + 1 }
        : pitch
    );
    LocalStorage.setPitches(updatedPitches);
    return Promise.resolve({ data: { success: true } });
  }
};