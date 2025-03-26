```typescript
/**
 * ML Recommendation Client
 * 
 * Handles communication with the Python recommendation model.
 * Provides a simple interface for getting recommendations.
 */

import axios from 'axios';

const ML_API_URL = 'http://localhost:5000'; // Update with your ML service URL

export class RecommendationClient {
  /**
   * Get startup recommendations for a user
   */
  static async getStartupRecommendations(userId: string, limit: number = 5) {
    try {
      const response = await axios.get(`${ML_API_URL}/recommendations/startups`, {
        params: { userId, limit }
      });
      return response.data;
    } catch (error) {
      console.error('Error getting recommendations:', error);
      return [];
    }
  }

  /**
   * Get co-founder matches for a user
   */
  static async getCoFounderMatches(userId: string, limit: number = 5) {
    try {
      const response = await axios.get(`${ML_API_URL}/recommendations/matches`, {
        params: { userId, limit }
      });
      return response.data;
    } catch (error) {
      console.error('Error getting matches:', error);
      return [];
    }
  }

  /**
   * Update user preferences for better recommendations
   */
  static async updateUserPreferences(userId: string, preferences: any) {
    try {
      await axios.post(`${ML_API_URL}/users/${userId}/preferences`, preferences);
      return true;
    } catch (error) {
      console.error('Error updating preferences:', error);
      return false;
    }
  }
}
```