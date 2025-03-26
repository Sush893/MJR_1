export interface Startup {
  id: string;
  title: string;
  description: string;
  industry: string;
  location: string;
  fundingStage: string;
  tags: string[];
}

export interface SearchQuery {
  query: string;
  timestamp: number;
}

export interface SearchHistory {
  userId: string;
  queries: SearchQuery[];
}

export interface UserProfile {
  id: string;
  searchHistory: SearchHistory;
  preferences: {
    industries: string[];
    tags: string[];
  };
}