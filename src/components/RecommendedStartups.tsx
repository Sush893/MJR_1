import React, { useEffect, useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import RecommendationService from '../lib/services/RecommendationService';
import { Startup } from '../types/recommendation';
import { Building2, MapPin, Tags, RefreshCw } from 'lucide-react';

export function RecommendedStartups() {
  const { user } = useAuth();
  const [recommendations, setRecommendations] = useState<Startup[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchRecommendations = async () => {
    console.log('Fetching recommendations, user:', user);
    if (!user) {
      console.log('No user available, skipping recommendation fetch');
      setIsLoading(false);
      return;
    }
    
    setIsLoading(true);
    setError(null);
    
    try {
      // Mock user profile for demonstration
      const userProfile = {
        id: user.id || 'guest',
        searchHistory: {
          userId: user.id || 'guest',
          queries: [
            { query: 'Agriculture IoT', timestamp: Date.now() - 86400000 },
            { query: 'Smart Farming', timestamp: Date.now() }
          ]
        },
        preferences: {
          industries: ['Agriculture', 'Technology'],
          tags: ['IoT', 'AI']
        }
      };

      console.log('Calling RecommendationService with profile:', userProfile);
      const startups = await RecommendationService.getRecommendations(userProfile);
      console.log('Recommendation results received:', startups);
      
      // Guard against null/undefined and ensure it's an array
      if (startups && Array.isArray(startups)) {
        setRecommendations(startups);
      } else {
        console.error('Received invalid recommendations data:', startups);
        setRecommendations([]);
        setError('Received invalid data format from recommendation service');
      }
    } catch (err) {
      console.error('Error fetching recommendations:', err);
      setError('Failed to fetch recommendations');
      setRecommendations([]);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchRecommendations();
  }, [user]);

  const handleRetry = () => {
    fetchRecommendations();
  };

  if (isLoading) {
    return (
      <div className="space-y-6">
        <h2 className="text-2xl font-bold dark:text-white">Recommended Startups</h2>
        <div className="flex justify-center py-12">
          <div className="animate-spin rounded-full h-10 w-10 border-t-2 border-b-2 border-primary-500"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold dark:text-white">Recommended Startups</h2>
        <button 
          onClick={handleRetry} 
          className="flex items-center gap-1 text-primary-500 hover:text-primary-600"
          disabled={isLoading}
        >
          <RefreshCw className="w-4 h-4" />
          <span>Refresh</span>
        </button>
      </div>
      
      {error && (
        <div className="bg-red-100 dark:bg-red-900/30 p-4 rounded-lg text-red-800 dark:text-red-200 mb-4">
          {error}
        </div>
      )}
      
      {(!recommendations || recommendations.length === 0) ? (
        <div className="bg-gray-100 dark:bg-gray-800 p-6 rounded-lg text-center text-gray-600 dark:text-gray-400">
          No startup recommendations available.
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {recommendations.map((startup) => (
            <div 
              key={startup.id}
              className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-6 hover:shadow-md transition-all"
            >
              <h3 className="text-xl font-bold mb-3 dark:text-white">{startup.title || 'Unnamed Startup'}</h3>
              
              <div className="space-y-3 mb-4">
                {startup.industry && (
                  <div className="flex items-center gap-2 text-gray-600 dark:text-gray-400">
                    <Building2 className="w-4 h-4" />
                    <span>{startup.industry}</span>
                  </div>
                )}
                
                {startup.location && (
                  <div className="flex items-center gap-2 text-gray-600 dark:text-gray-400">
                    <MapPin className="w-4 h-4" />
                    <span>{startup.location}</span>
                  </div>
                )}
                
                {startup.tags && Array.isArray(startup.tags) && startup.tags.length > 0 && (
                  <div className="flex items-center gap-2 text-gray-600 dark:text-gray-400">
                    <Tags className="w-4 h-4" />
                    <div className="flex flex-wrap gap-2">
                      {startup.tags.map((tag, index) => (
                        <span 
                          key={`${tag}-${index}`}
                          className="px-2 py-1 bg-primary-100 dark:bg-primary-900/30 text-primary-700 dark:text-primary-300 rounded-full text-sm"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                )}
              </div>
              
              <p className="text-gray-600 dark:text-gray-400 mb-4">
                {startup.description || 'No description available.'}
              </p>
              
              <div className="flex justify-between items-center">
                {startup.fundingStage && (
                  <span className="text-sm font-medium text-primary-500 dark:text-primary-400">
                    {startup.fundingStage}
                  </span>
                )}
                <button className="px-4 py-2 bg-primary-500 dark:bg-primary-600 text-white rounded-full hover:bg-primary-600 dark:hover:bg-primary-500 transition-colors">
                  View Details
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}