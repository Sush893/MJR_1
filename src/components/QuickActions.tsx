import React from 'react';
import { Zap } from 'lucide-react';

export function QuickActions() {
  const actions = [
    'Find New Project',
    'Join New Team',
    'Update Your Skills'
  ];

  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-[0_4px_20px_rgba(0,0,0,0.1)] dark:shadow-gray-900/10 p-6">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-xl font-bold dark:text-gray-200">Quick Actions</h3>
        <Zap className="w-8 h-8 text-primary-500 dark:text-primary-400" />
      </div>
      <div className="space-y-2">
        {actions.map((action) => (
          <button
            key={action}
            className="w-full px-4 py-2 bg-primary-500 dark:bg-primary-600 text-white rounded-full hover:bg-primary-600 dark:hover:bg-primary-500 transition-colors text-sm"
          >
            {action}
          </button>
        ))}
      </div>
    </div>
  );
}