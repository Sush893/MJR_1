import React from 'react';
import { Heart, MessageCircle, Share2 } from 'lucide-react';
import { Pitch } from '../../types/pitch';

interface PitchCardProps {
  pitch: Pitch;
  onView: (pitch: Pitch) => void;
}

export function PitchCard({ pitch, onView }: PitchCardProps) {
  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm overflow-hidden hover:shadow-md transition-shadow">
      <div 
        onClick={() => onView(pitch)}
        className="cursor-pointer"
      >
        {pitch.media.type === 'image' ? (
          <img
            src={pitch.media.url}
            alt={pitch.title}
            className="w-full h-64 object-cover"
          />
        ) : (
          <video
            src={pitch.media.url}
            className="w-full h-64 object-cover"
            controls
          />
        )}
        
        <div className="p-6">
          <div className="flex items-center gap-4 mb-4">
            <img
              src={pitch.author.avatar}
              alt={pitch.author.name}
              className="w-12 h-12 rounded-full object-cover"
            />
            <div>
              <h3 className="font-medium dark:text-gray-200">{pitch.author.name}</h3>
              <p className="text-sm text-gray-500 dark:text-gray-400">{pitch.author.role}</p>
            </div>
          </div>
          
          <h2 className="text-xl font-bold mb-2 dark:text-gray-200">{pitch.title}</h2>
          <p className="text-gray-600 dark:text-gray-400 mb-4 line-clamp-3">{pitch.description}</p>
          
          <div className="flex flex-wrap gap-2 mb-4">
            {pitch.tags.map((tag) => (
              <span
                key={tag}
                className="px-3 py-1 bg-primary-100 dark:bg-primary-900/30 text-primary-700 dark:text-primary-300 rounded-full text-sm"
              >
                {tag}
              </span>
            ))}
          </div>
        </div>
      </div>
      
      <div className="px-6 py-4 border-t border-gray-100 dark:border-gray-700 flex items-center justify-between">
        <div className="flex items-center gap-6">
          <button className="flex items-center gap-2 text-gray-500 dark:text-gray-400 hover:text-primary-500 dark:hover:text-primary-400 transition-colors">
            <Heart className="w-5 h-5" />
            <span>{pitch.likes}</span>
          </button>
          <button className="flex items-center gap-2 text-gray-500 dark:text-gray-400 hover:text-primary-500 dark:hover:text-primary-400 transition-colors">
            <MessageCircle className="w-5 h-5" />
            <span>{pitch.comments}</span>
          </button>
        </div>
        <button className="text-gray-500 dark:text-gray-400 hover:text-primary-500 dark:hover:text-primary-400 transition-colors">
          <Share2 className="w-5 h-5" />
        </button>
      </div>
    </div>
  );
}