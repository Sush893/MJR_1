/**
 * Mock pitch data for testing
 */

import { BackendPitch } from '../types/pitch';

export const mockPitch: BackendPitch = {
  id: 'mock-pitch-001',
  user_id: 'current-user-id',
  title: 'Revolutionary EdTech Platform',
  description: 'An AI-powered platform that personalizes education for students based on their learning style.',
  media_type: 'image',
  media_url: 'https://images.unsplash.com/photo-1501504905252-473c47e087f8?q=80&w=1074',
  tags: ['EdTech', 'AI', 'Education'],
  likes: 12,
  comments: 5,
  created_at: new Date().toISOString(),
  updated_at: new Date().toISOString(),
  author: {
    id: 'current-user-id',
    name: 'Demo User',
    avatar: 'https://images.unsplash.com/photo-1599566150163-29194dcaad36?q=80&w=687',
    role: 'Entrepreneur'
  }
}; 