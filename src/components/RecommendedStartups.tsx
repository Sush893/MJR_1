import React, { useEffect, useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import RecommendationService from '../lib/services/RecommendationService';
import { Startup } from '../types/recommendation';
import { Building2, MapPin, Tags } from 'lucide-react';

export function RecommendedStartups() {
  const { user } = useAuth();
  const [recommendations, setRecommendations] = useState<Startup[]>([]);

  useEffect(() => {
    if (user) {
      // Mock user profile for demonstration
      const userProfile = {
        id: user.id,
        searchHistory: {
          userId: user.id,
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

      const startups = RecommendationService.getRecommendations(userProfile);
      setRecommendations(startups);
    }
  }, [user]);

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold dark:text-white">Recommended Startups</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {recommendations.map((startup) => (
          <div 
            key={startup.id}
            className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-6 hover:shadow-md transition-all"
          >
            <h3 className="text-xl font-bold mb-3 dark:text-white">{startup.title}</h3>
            
            <div className="space-y-3 mb-4">
              <div className="flex items-center gap-2 text-gray-600 dark:text-gray-400">
                <Building2 className="w-4 h-4" />
                <span>{startup.industry}</span>
              </div>
              
              <div className="flex items-center gap-2 text-gray-600 dark:text-gray-400">
                <MapPin className="w-4 h-4" />
                <span>{startup.location}</span>
              </div>
              
              <div className="flex items-center gap-2 text-gray-600 dark:text-gray-400">
                <Tags className="w-4 h-4" />
                <div className="flex flex-wrap gap-2">
                  {startup.tags.map((tag) => (
                    <span 
                      key={tag}
                      className="px-2 py-1 bg-primary-100 dark:bg-primary-900/30 text-primary-700 dark:text-primary-300 rounded-full text-sm"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </div>
            
            <p className="text-gray-600 dark:text-gray-400 mb-4">
              {startup.description}
            </p>
            
            <div className="flex justify-between items-center">
              <span className="text-sm font-medium text-primary-500 dark:text-primary-400">
                {startup.fundingStage}
              </span>
              <button className="px-4 py-2 bg-primary-500 dark:bg-primary-600 text-white rounded-full hover:bg-primary-600 dark:hover:bg-primary-500 transition-colors">
                View Details
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}