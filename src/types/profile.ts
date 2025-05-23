export interface BlogPost {
  id: string;
  title: string;
  content: string;
  createdAt: string;
  tags: string[];
}

export interface UserProfile {
  id?: string;
  name: string;
  email?: string;
  avatar?: string;
  backgroundImage?: string;
  bio?: string;
  role?: string;
  location?: string;
  skills?: string[];
  searchHistory?: {
    queries: Array<{
      query: string;
      timestamp: number;
    }>
  };
  preferences?: {
    industries: string[];
    tags: string[];
  };
  interests: string[];
  blogs: BlogPost[];
  recommendedMatches: RecommendedMatch[];
  communities: Community[];
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