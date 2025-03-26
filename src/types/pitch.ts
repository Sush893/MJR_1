export interface Pitch {
  id: string;
  title: string;
  description: string;
  media: {
    type: 'image' | 'video';
    url: string;
  };
  author: {
    id: string;
    name: string;
    avatar: string;
    role: string;
  };
  tags: string[];
  likes: number;
  comments: number;
  createdAt: string;
}