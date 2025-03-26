import React from 'react';
import { Sparkles, TrendingUp, Users } from 'lucide-react';

const insights = [
  {
    title: 'Top Performing Blog',
    content: '"The Future of EdTech: AI-Powered Learning"',
    stats: '3.2K views • 245 likes',
    community: 'AI Startups',
  },
  {
    title: 'Most Active Time',
    content: 'Wednesdays, 2-4 PM',
    stats: '42% higher engagement',
  },
  {
    title: 'Growing Network',
    content: '+28 new connections this week',
    stats: '15% increase from last week',
  },
];

const recommendedMatches = [
  {
    name: 'Sarah Chen',
    role: 'Tech Lead',
    avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=150',
    matchScore: 92,
  },
  {
    name: 'Michael Rodriguez',
    role: 'Product Manager',
    avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&q=80&w=150',
    matchScore: 88,
  },
];

export function InsightsSidebar() {
  return (
    <div className="space-y-6">
      {/* Key Insights */}
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-6">
        <h3 className="text-xl font-bold mb-6 flex items-center gap-2 dark:text-gray-200">
          <Sparkles className="w-5 h-5 text-primary-500" />
          Key Insights
        </h3>
        
        <div className="space-y-6">
          {insights.map((insight, index) => (
            <div key={index} className="border-l-2 border-primary-500 pl-4">
              <h4 className="font-medium dark:text-gray-200">{insight.title}</h4>
              <p className="text-gray-600 dark:text-gray-300 mt-1">{insight.content}</p>
              <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">{insight.stats}</p>
              {insight.community && (
                <span className="inline-block mt-2 px-3 py-1 bg-primary-100 dark:bg-primary-900/30 text-primary-700 dark:text-primary-200 rounded-full text-sm">
                  {insight.community}
                </span>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Recommended Matches */}
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-6">
        <h3 className="text-xl font-bold mb-6 flex items-center gap-2 dark:text-gray-200">
          <Users className="w-5 h-5 text-primary-500" />
          Recommended Matches
        </h3>
        
        <div className="space-y-4">
          {recommendedMatches.map((match) => (
            <div key={match.name} className="flex items-center gap-4">
              <img
                src={match.avatar}
                alt={match.name}
                className="w-12 h-12 rounded-full object-cover"
              />
              <div className="flex-1 min-w-0">
                <h4 className="font-medium dark:text-gray-200">{match.name}</h4>
                <p className="text-sm text-gray-500 dark:text-gray-400">{match.role}</p>
              </div>
              <div className="text-right">
                <span className="text-primary-500 dark:text-primary-400 font-medium">
                  {match.matchScore}% Match
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Growth Trends */}
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-6">
        <h3 className="text-xl font-bold mb-6 flex items-center gap-2 dark:text-gray-200">
          <TrendingUp className="w-5 h-5 text-primary-500" />
          Growth Trends
        </h3>
        
        <div className="space-y-4">
          <div className="flex justify-between items-center">
            <span className="text-gray-600 dark:text-gray-300">Profile Views</span>
            <span className="text-green-500 font-medium">↑ 24%</span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-gray-600 dark:text-gray-300">Blog Engagement</span>
            <span className="text-green-500 font-medium">↑ 18%</span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-gray-600 dark:text-gray-300">Network Growth</span>
            <span className="text-green-500 font-medium">↑ 32%</span>
          </div>
        </div>
      </div>
    </div>
  );
}