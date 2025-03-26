export interface BlogPost {
  id: string;
  title: string;
  content: string;
  createdAt: string;
  tags: string[];
}

export interface UserProfile {
  id: string;
  name: string;
  role: string;
  avatar: string;
  backgroundImage: string;
  bio: string;
  location: string;
  skills: string[];
  interests: string[];
  blogs: BlogPost[];
}

export interface Community {
  id: string;
  name: string;
  memberCount: number;
  category: string;
  icon: string;
}

export interface RecommendedMatch {
  id: string;
  name: string;
  role: string;
  avatar: string;
  matchPercentage: number;
  sharedInterests: string[];
}