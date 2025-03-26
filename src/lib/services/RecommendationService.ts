import { RecommendationEngine } from '../ml/RecommendationEngine';
import { Startup, UserProfile } from '../../types/recommendation';

// Mock startup data based on the Python model's dataset
const mockStartups: Startup[] = [
  {
    id: '1',
    title: 'AgroTech',
    description: 'An innovative agriculture startup focusing on smart farming techniques.',
    industry: 'Agriculture',
    location: 'California, USA',
    fundingStage: 'Seed',
    tags: ['smart farming', 'IoT']
  },
  {
    id: '2',
    title: 'PharmaPlus',
    description: 'A pharmaceutical company developing cutting-edge drugs.',
    industry: 'Pharmaceutical',
    location: 'Berlin, Germany',
    fundingStage: 'Series A',
    tags: ['pharma', 'drugs']
  },
  // ... add all other startups from the Python model
];

class RecommendationService {
  private static engine: RecommendationEngine;
  private static initialized = false;

  private static initialize() {
    if (!this.initialized) {
      this.engine = new RecommendationEngine();
      this.engine.initialize(mockStartups);
      this.initialized = true;
    }
  }

  static getRecommendations(userProfile: UserProfile, topN: number = 5): Startup[] {
    this.initialize();
    return this.engine.recommendStartups(userProfile, topN);
  }

  static searchStartups(query: string, industry?: string, topN: number = 5): Startup[] {
    this.initialize();
    return this.engine.searchStartups(query, industry, topN);
  }

  static updateUserProfile(userId: string, searchQuery: string): void {
    // In a real app, this would update the user's search history in the database
    console.log(`Updating search history for user ${userId} with query: ${searchQuery}`);
  }
}

export default RecommendationService;