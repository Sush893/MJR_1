import { Startup, UserProfile as RecommendationUserProfile } from '../../types/recommendation';
import { UserProfile as ProfileUserProfile } from '../../types/profile';

class RecommendationService {
  private static apiUrl = 'http://localhost:5000';

  static async getRecommendations(userProfile: ProfileUserProfile | RecommendationUserProfile, topN: number = 5): Promise<Startup[]> {
    console.log('Getting recommendations for user profile:', userProfile);
    
    // Extract search terms from either profile type
    let searchTerms = '';

    // Handle profile.ts UserProfile (which has skills)
    if ('skills' in userProfile && userProfile.skills) {
      searchTerms += userProfile.skills.join(' ') + ' ';
      
      // Add role if available
      if (userProfile.role) {
        searchTerms += userProfile.role + ' ';
      }
    }
    
    // Handle recommendation.ts UserProfile (which has preferences)
    if ('preferences' in userProfile && userProfile.preferences) {
      if (userProfile.preferences.industries) {
        searchTerms += userProfile.preferences.industries.join(' ') + ' ';
      }
      if (userProfile.preferences.tags) {
        searchTerms += userProfile.preferences.tags.join(' ') + ' ';
      }
    }
    
    // If we have no search terms, use some default terms
    if (!searchTerms.trim()) {
      searchTerms = "technology startup innovation";
    }

    console.log('Search terms extracted from profile:', searchTerms);
    
    return this.searchStartups(searchTerms.trim(), undefined, topN);
  }

  static async searchStartups(query: string, industry?: string, topN: number = 5): Promise<Startup[]> {
    console.log(`Searching startups with query: "${query}", industry: "${industry || 'any'}"`);
    
    try {
      // Create request payload
      const payload = { query, industry };
      console.log('Request payload:', payload);
      
      console.log(`Sending POST request to ${this.apiUrl}/search`);
      const response = await fetch(`${this.apiUrl}/search`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
        },
        mode: 'cors',
        credentials: 'omit',
        body: JSON.stringify(payload),
      });

      console.log('Response status:', response.status);
      
      if (!response.ok) {
        console.error('API error:', response.status, response.statusText);
        
        // Try to read error message from response
        try {
          const errorData = await response.json();
          console.error('Error details:', errorData);
        } catch (e) {
          console.error('Could not parse error details');
        }
        
        return this.getMockStartups(); // Return mock data as fallback
      }

      const data = await response.json();
      console.log('API response data:', data);
      
      // Check if data is an array (valid response)
      if (!Array.isArray(data)) {
        console.error('Invalid response format (not an array):', data);
        return this.getMockStartups(); // Return mock data as fallback
      }
      
      // Map API response to Startup interface
      const mappedResults = data.map((item: any) => ({
        id: item.id?.toString() || '',
        title: item.title || '',
        description: item.description || '',
        industry: item.industry || '',
        location: item.location || '', // May not be provided by API
        fundingStage: item.fundingStage || '', // May not be provided by API
        tags: Array.isArray(item.tags) ? item.tags : [],
      })).slice(0, topN);
      
      console.log('Mapped results:', mappedResults);
      return mappedResults;
    } catch (error) {
      console.error('Error fetching recommendations:', error);
      return this.getMockStartups(); // Return mock data as fallback
    }
  }

  // Fallback mock data
  private static getMockStartups(): Startup[] {
    console.log('Using mock startup data as fallback');
    return [
      {
        id: '1',
        title: 'AgroTech Solutions',
        description: 'Smart farming and agricultural technology solutions using IoT sensors and AI.',
        industry: 'Agriculture',
        location: 'California, USA',
        fundingStage: 'Seed',
        tags: ['Agriculture', 'IoT', 'AI']
      },
      {
        id: '2',
        title: 'HealthTech Innovations',
        description: 'Healthcare technology focused on remote patient monitoring and diagnostics.',
        industry: 'Healthcare',
        location: 'Boston, USA',
        fundingStage: 'Series A',
        tags: ['Healthcare', 'Telemedicine', 'AI']
      },
      {
        id: '3',
        title: 'EduLearn Platform',
        description: 'Online education platform with personalized learning paths.',
        industry: 'Education',
        location: 'London, UK',
        fundingStage: 'Seed',
        tags: ['Education', 'E-learning', 'Technology']
      }
    ];
  }

  static updateUserProfile(userId: string, searchQuery: string): void {
    // In a real app, this would update the user's search history in the database
    console.log(`Updating search history for user ${userId} with query: ${searchQuery}`);
  }
}

export default RecommendationService;