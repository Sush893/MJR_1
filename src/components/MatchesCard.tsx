import React from 'react';

interface MatchesCardProps {
  interests: string[];
}

export function MatchesCard({ interests }: MatchesCardProps) {
  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-[0_4px_20px_rgba(0,0,0,0.1)] dark:shadow-gray-900/10 p-6">
      <div className="flex items-center gap-4 mb-6">
        <span className="text-5xl font-bold text-primary-600 dark:text-primary-400">5</span>
        <p className="text-lg font-medium leading-tight dark:text-gray-200">Recommended Matches</p>
      </div>
      <div className="flex flex-wrap gap-2">
        {interests.map((interest) => (
          <span key={interest} className="px-3 py-1 bg-primary-100 dark:bg-primary-900/30 text-primary-700 dark:text-primary-300 rounded-full text-sm font-medium">
            {interest}
          </span>
        ))}
      </div>
    </div>
  );
}