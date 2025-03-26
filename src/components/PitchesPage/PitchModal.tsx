import React from 'react';
import { X, Heart, MessageCircle, Share2, Calendar, Users, ExternalLink } from 'lucide-react';
import { Pitch } from '../../types/pitch';
import { motion } from 'framer-motion';

interface PitchModalProps {
  pitch: Pitch;
  onClose: () => void;
}

export function PitchModal({ pitch, onClose }: PitchModalProps) {
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4"
      onClick={onClose}
    >
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.95 }}
        className="bg-white dark:bg-gray-800 rounded-2xl w-full max-w-4xl max-h-[90vh] overflow-auto"
        onClick={e => e.stopPropagation()}
      >
        {/* Header */}
        <div className="sticky top-0 bg-white dark:bg-gray-800 border-b border-gray-100 dark:border-gray-700 p-6 flex items-center justify-between">
          <h2 className="text-2xl font-bold dark:text-white">{pitch.title}</h2>
          <button 
            onClick={onClose}
            className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-full transition-colors"
          >
            <X className="w-5 h-5 dark:text-gray-400" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 space-y-8">
          {/* Media */}
          <div className="rounded-xl overflow-hidden">
            {pitch.media.type === 'image' ? (
              <img
                src={pitch.media.url}
                alt={pitch.title}
                className="w-full h-[400px] object-cover"
              />
            ) : (
              <video
                src={pitch.media.url}
                className="w-full h-[400px] object-cover"
                controls
              />
            )}
          </div>

          {/* Author Info */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <img
                src={pitch.author.avatar}
                alt={pitch.author.name}
                className="w-16 h-16 rounded-full object-cover"
              />
              <div>
                <h3 className="text-xl font-semibold dark:text-white">{pitch.author.name}</h3>
                <p className="text-gray-600 dark:text-gray-400">{pitch.author.role}</p>
              </div>
            </div>
            <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
              <Calendar className="w-4 h-4" />
              {formatDate(pitch.createdAt)}
            </div>
          </div>

          {/* Description */}
          <div>
            <h4 className="text-lg font-semibold mb-3 dark:text-white">About the Project</h4>
            <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
              {pitch.description}
            </p>
          </div>

          {/* Tags */}
          <div>
            <h4 className="text-lg font-semibold mb-3 dark:text-white">Technologies & Focus Areas</h4>
            <div className="flex flex-wrap gap-2">
              {pitch.tags.map((tag) => (
                <span
                  key={tag}
                  className="px-4 py-2 bg-primary-100 dark:bg-primary-900/30 text-primary-700 dark:text-primary-300 rounded-full text-sm"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>

          {/* Engagement Stats */}
          <div>
            <h4 className="text-lg font-semibold mb-3 dark:text-white">Engagement</h4>
            <div className="grid grid-cols-2 gap-4">
              <div className="p-4 bg-gray-50 dark:bg-gray-700/50 rounded-xl">
                <div className="flex items-center gap-2 text-primary-500 dark:text-primary-400 mb-1">
                  <Heart className="w-5 h-5" />
                  <span className="font-semibold">{pitch.likes}</span>
                </div>
                <p className="text-sm text-gray-600 dark:text-gray-400">People interested</p>
              </div>
              <div className="p-4 bg-gray-50 dark:bg-gray-700/50 rounded-xl">
                <div className="flex items-center gap-2 text-primary-500 dark:text-primary-400 mb-1">
                  <MessageCircle className="w-5 h-5" />
                  <span className="font-semibold">{pitch.comments}</span>
                </div>
                <p className="text-sm text-gray-600 dark:text-gray-400">Discussions</p>
              </div>
            </div>
          </div>
        </div>

        {/* Footer Actions */}
        <div className="sticky bottom-0 bg-white dark:bg-gray-800 border-t border-gray-100 dark:border-gray-700 p-6 flex flex-wrap gap-4">
          <button className="flex-1 px-6 py-3 bg-primary-500 dark:bg-primary-600 text-white rounded-full hover:bg-primary-600 dark:hover:bg-primary-500 transition-colors flex items-center justify-center gap-2">
            <Users className="w-5 h-5" />
            Connect & Collaborate
          </button>
          <button className="flex-1 px-6 py-3 border border-primary-500 dark:border-primary-400 text-primary-500 dark:text-primary-400 rounded-full hover:bg-primary-50 dark:hover:bg-primary-900/20 transition-colors flex items-center justify-center gap-2">
            <Share2 className="w-5 h-5" />
            Share Pitch
          </button>
          <button className="flex-1 px-6 py-3 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-full hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors flex items-center justify-center gap-2">
            <ExternalLink className="w-5 h-5" />
            View Demo
          </button>
        </div>
      </motion.div>
    </motion.div>
  );
}