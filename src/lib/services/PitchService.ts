import { Pitch } from '../../types/pitch';

// Mock pitches data
const mockPitches: Pitch[] = [
  {
    id: '1',
    title: 'AI-Powered EdTech Platform',
    description: 'Revolutionizing education with personalized AI learning paths. Our platform adapts to each student\'s unique learning style and pace, providing customized content and real-time feedback.',
    media: {
      type: 'image',
      url: 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&q=80&w=800'
    },
    author: {
      id: 'mock-user-id',
      name: 'Jenny Jones',
      avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=150',
      role: 'Entrepreneur'
    },
    tags: ['EdTech', 'AI', 'Machine Learning', 'Education'],
    likes: 42,
    comments: 12,
    createdAt: new Date().toISOString()
  },
  {
    id: '2',
    title: 'Sustainable Learning Initiative',
    description: 'Creating eco-friendly educational resources and tools. Our initiative focuses on environmental education while maintaining a zero-carbon footprint in our digital delivery methods.',
    media: {
      type: 'image',
      url: 'https://images.unsplash.com/photo-1497633762265-9d179a990aa6?auto=format&fit=crop&q=80&w=800'
    },
    author: {
      id: 'mock-user-id',
      name: 'Jenny Jones',
      avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=150',
      role: 'Entrepreneur'
    },
    tags: ['EdTech', 'Sustainability', 'GreenTech'],
    likes: 35,
    comments: 8,
    createdAt: new Date(Date.now() - 86400000).toISOString() // 1 day ago
  }
];

export class PitchService {
  static async createPitch(pitch: Omit<Pitch, 'id' | 'createdAt' | 'likes' | 'comments'>) {
    try {
      const newPitch: Pitch = {
        id: Date.now().toString(),
        ...pitch,
        likes: 0,
        comments: 0,
        createdAt: new Date().toISOString()
      };
      
      return { pitch: newPitch, error: null };
    } catch (error) {
      console.error('Error creating pitch:', error);
      return { pitch: null, error };
    }
  }

  static async getPitches() {
    try {
      return { pitches: mockPitches, error: null };
    } catch (error) {
      console.error('Error fetching pitches:', error);
      return { pitches: null, error };
    }
  }

  static async likePitch(pitchId: string, userId: string) {
    try {
      return { data: { success: true }, error: null };
    } catch (error) {
      console.error('Error liking pitch:', error);
      return { data: null, error };
    }
  }

  static async commentOnPitch(pitchId: string, userId: string, content: string) {
    try {
      const comment = {
        id: Date.now().toString(),
        content,
        userId,
        createdAt: new Date().toISOString()
      };
      return { comment, error: null };
    } catch (error) {
      console.error('Error commenting on pitch:', error);
      return { comment: null, error };
    }
  }
}