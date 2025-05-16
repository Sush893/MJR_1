// Backend pitch data structure
export interface BackendPitch {
  id: string;
  user_id: string;
  title: string;
  description: string;
  media_type: 'image' | 'video';
  media_url: string;
  author?: {
    id: string;
    name: string;
    avatar: string;
    role: string;
  };
  tags: string[];
  likes: number;
  comments: number;
  created_at: string;
  updated_at: string;
}

// Frontend pitch data structure
export interface Pitch {
  id: string;
  user_id: string;
  title: string;
  description: string;
  media: {
    type: 'image' | 'video';
    url: string;
  };
  author?: {
    id: string;
    name: string;
    avatar: string;
    role: string;
  };
  tags: string[];
  likes: number;
  comments: number;
  createdAt: string;
  updatedAt: string;
}

// Helper function to transform backend pitch data to frontend format
export function transformPitch(backendPitch: BackendPitch): Pitch {
  return {
    id: backendPitch.id,
    user_id: backendPitch.user_id,
    title: backendPitch.title,
    description: backendPitch.description,
    media: {
      type: backendPitch.media_type,
      url: backendPitch.media_url
    },
    author: backendPitch.author,
    tags: backendPitch.tags,
    likes: backendPitch.likes,
    comments: backendPitch.comments,
    createdAt: backendPitch.created_at,
    updatedAt: backendPitch.updated_at
  };
}