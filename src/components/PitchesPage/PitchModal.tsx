import React, { useState } from 'react';
import { X, Heart, MessageCircle, Share2, Calendar, Users, ExternalLink, Edit, Trash } from 'lucide-react';
import { BackendPitch, transformPitch } from '../../types/pitch';
import { motion } from 'framer-motion';

interface PitchModalProps {
  pitch: BackendPitch;
  onClose: () => void;
  onDelete?: () => void;
  onUpdate?: (data: {
    title?: string;
    description?: string;
    media_type?: 'image' | 'video';
    media_url?: string;
    tags?: string[];
  }) => void;
}

export function PitchModal({ pitch, onClose, onDelete, onUpdate }: PitchModalProps) {
  const transformedPitch = transformPitch(pitch);
  const [isEditing, setIsEditing] = useState(false);
  const [editForm, setEditForm] = useState({
    title: transformedPitch.title,
    description: transformedPitch.description,
    media_type: transformedPitch.media.type,
    media_url: transformedPitch.media.url,
    tags: transformedPitch.tags
  });

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (onUpdate) {
      onUpdate(editForm);
      setIsEditing(false);
    }
  };

  const handleTagsChange = (value: string) => {
    setEditForm(prev => ({
      ...prev,
      tags: value.split(',').map(tag => tag.trim()).filter(Boolean)
    }));
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
          {isEditing ? (
            <input
              type="text"
              value={editForm.title}
              onChange={e => setEditForm(prev => ({ ...prev, title: e.target.value }))}
              className="text-2xl font-bold dark:text-white bg-transparent border-b border-gray-300 dark:border-gray-600 focus:outline-none focus:border-primary-500"
            />
          ) : (
            <h2 className="text-2xl font-bold dark:text-white">{transformedPitch.title}</h2>
          )}
          <div className="flex items-center gap-2">
            {onUpdate && !isEditing && (
              <button
                onClick={() => setIsEditing(true)}
                className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-full transition-colors"
              >
                <Edit className="w-5 h-5 dark:text-gray-400" />
              </button>
            )}
            {onDelete && !isEditing && (
              <button
                onClick={onDelete}
                className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-full transition-colors text-red-500"
              >
                <Trash className="w-5 h-5" />
              </button>
            )}
            <button 
              onClick={onClose}
              className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-full transition-colors"
            >
              <X className="w-5 h-5 dark:text-gray-400" />
            </button>
          </div>
        </div>

        {isEditing ? (
          <form onSubmit={handleSubmit} className="p-6 space-y-6">
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Media URL
                </label>
                <input
                  type="text"
                  value={editForm.media_url}
                  onChange={e => setEditForm(prev => ({ ...prev, media_url: e.target.value }))}
                  className="w-full p-2 border border-gray-300 dark:border-gray-600 rounded-lg"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Media Type
                </label>
                <select
                  value={editForm.media_type}
                  onChange={e => setEditForm(prev => ({ ...prev, media_type: e.target.value as 'image' | 'video' }))}
                  className="w-full p-2 border border-gray-300 dark:border-gray-600 rounded-lg"
                >
                  <option value="image">Image</option>
                  <option value="video">Video</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Description
                </label>
                <textarea
                  value={editForm.description}
                  onChange={e => setEditForm(prev => ({ ...prev, description: e.target.value }))}
                  className="w-full p-2 border border-gray-300 dark:border-gray-600 rounded-lg"
                  rows={4}
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Tags (comma-separated)
                </label>
                <input
                  type="text"
                  value={editForm.tags.join(', ')}
                  onChange={e => handleTagsChange(e.target.value)}
                  className="w-full p-2 border border-gray-300 dark:border-gray-600 rounded-lg"
                />
              </div>
            </div>

            <div className="flex justify-end gap-4">
              <button
                type="button"
                onClick={() => setIsEditing(false)}
                className="px-4 py-2 text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-4 py-2 bg-primary-500 text-white rounded-lg hover:bg-primary-600"
              >
                Save Changes
              </button>
            </div>
          </form>
        ) : (
          <>
            {/* Content */}
            <div className="p-6 space-y-8">
              {/* Media */}
              <div className="rounded-xl overflow-hidden">
                {transformedPitch.media.type === 'image' ? (
                  <div className="w-full aspect-[16/9] bg-gray-100 dark:bg-gray-900">
                    <img
                      src={transformedPitch.media.url}
                      alt={transformedPitch.title}
                      className="w-full h-full object-cover"
                    />
                  </div>
                ) : (
                  <video
                    src={transformedPitch.media.url}
                    className="w-full h-[400px] object-cover"
                    controls
                  />
                )}
              </div>

              {/* Author Info */}
              {transformedPitch.author && (
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <img
                      src={transformedPitch.author.avatar}
                      alt={transformedPitch.author.name}
                      className="w-16 h-16 rounded-full object-cover"
                    />
                    <div>
                      <h3 className="text-xl font-semibold dark:text-white">{transformedPitch.author.name}</h3>
                      <p className="text-gray-600 dark:text-gray-400">{transformedPitch.author.role}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
                    <Calendar className="w-4 h-4" />
                    {formatDate(transformedPitch.createdAt)}
                  </div>
                </div>
              )}

              {/* Description */}
              <div>
                <h4 className="text-lg font-semibold mb-3 dark:text-white">About the Project</h4>
                <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
                  {transformedPitch.description}
                </p>
              </div>

              {/* Tags */}
              <div>
                <h4 className="text-lg font-semibold mb-3 dark:text-white">Technologies & Focus Areas</h4>
                <div className="flex flex-wrap gap-2">
                  {transformedPitch.tags.map((tag) => (
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
                      <span className="font-semibold">{transformedPitch.likes}</span>
                    </div>
                    <p className="text-sm text-gray-600 dark:text-gray-400">People interested</p>
                  </div>
                  <div className="p-4 bg-gray-50 dark:bg-gray-700/50 rounded-xl">
                    <div className="flex items-center gap-2 text-primary-500 dark:text-primary-400 mb-1">
                      <MessageCircle className="w-5 h-5" />
                      <span className="font-semibold">{transformedPitch.comments}</span>
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
          </>
        )}
      </motion.div>
    </motion.div>
  );
}