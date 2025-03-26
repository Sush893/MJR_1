import React from 'react';
import { TrendingUp, Eye, ThumbsUp, MessageCircle } from 'lucide-react';

const stats = [
  {
    title: 'Total Views',
    value: '12.5K',
    change: '+24%',
    icon: Eye,
  },
  {
    title: 'Avg. Read Time',
    value: '4.2m',
    change: '+12%',
    icon: TrendingUp,
  },
  {
    title: 'Likes',
    value: '2.1K',
    change: '+18%',
    icon: ThumbsUp,
  },
  {
    title: 'Comments',
    value: '842',
    change: '+32%',
    icon: MessageCircle,
  },
];

export function BlogStats() {
  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-6">
      <h3 className="text-xl font-bold mb-6 dark:text-gray-200">Blog Performance</h3>
      
      <div className="grid grid-cols-2 gap-4">
        {stats.map((stat) => (
          <div key={stat.title} className="p-4 bg-gray-50 dark:bg-gray-700/50 rounded-lg">
            <div className="flex items-center justify-between mb-2">
              <stat.icon className="w-5 h-5 text-primary-500 dark:text-primary-400" />
              <span className="text-green-500 text-sm font-medium">{stat.change}</span>
            </div>
            <p className="text-2xl font-bold dark:text-gray-200">{stat.value}</p>
            <p className="text-sm text-gray-500 dark:text-gray-400">{stat.title}</p>
          </div>
        ))}
      </div>
    </div>
  );
}