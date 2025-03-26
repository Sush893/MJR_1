import React from 'react';

interface CommunityProps {
  communities: string[];
}

export function Community({ communities }: CommunityProps) {
  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-[0_4px_20px_rgba(0,0,0,0.1)] dark:shadow-gray-900/10 p-6">
      <h3 className="text-xl font-bold mb-4 dark:text-gray-200">Communities</h3>
      <div className="space-y-2">
        {communities.map((community) => (
          <button
            key={community}
            className="w-full px-4 py-2 bg-primary-500 dark:bg-primary-600 text-white rounded-full hover:bg-primary-600 dark:hover:bg-primary-500 transition-colors text-sm"
          >
            {community}
          </button>
        ))}
        <button
          className="w-full px-4 py-2 border border-primary-500 dark:border-primary-400 text-primary-500 dark:text-primary-400 rounded-full hover:bg-primary-50 dark:hover:bg-primary-900/20 transition-colors text-sm"
        >
          Discover More
        </button>
      </div>
    </div>
  );
}