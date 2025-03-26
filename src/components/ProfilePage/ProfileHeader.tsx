/**
 * ProfileHeader Component
 * 
 * A comprehensive profile header component that displays user information and allows
 * editing of profile details including avatar and background images.
 * 
 * Features:
 * - Displays user's background image with option to change
 * - Shows profile avatar with upload/change capability
 * - Displays user info (name, role, location)
 * - Shows user's skills as tags
 * - Provides edit functionality for all profile information
 */

import React, { useState } from 'react';
import { Camera, Edit2, MapPin, Briefcase } from 'lucide-react';
import { UserProfile } from '../../types/profile';
import { EditProfileModal } from './EditProfileModal';
import { ImageSelectModal } from './ImageSelectModal';

interface ProfileHeaderProps {
  profile: UserProfile;
  onUpdateProfile: (updates: Partial<UserProfile>) => void;
}

export function ProfileHeader({ profile, onUpdateProfile }: ProfileHeaderProps) {
  // State for managing modal visibility
  const [isEditingProfile, setIsEditingProfile] = useState(false);
  const [imageSelectType, setImageSelectType] = useState<'avatar' | 'background' | null>(null);

  /**
   * Handles image selection from the ImageSelectModal
   * Updates either the avatar or background image based on selection type
   */
  const handleImageSelect = (imageUrl: string) => {
    if (imageSelectType === 'avatar') {
      onUpdateProfile({ avatar: imageUrl });
    } else if (imageSelectType === 'background') {
      onUpdateProfile({ backgroundImage: imageUrl });
    }
    setImageSelectType(null);
  };

  return (
    <div className="relative mb-24">
      {/* Background Image Section */}
      <div className="relative h-80 overflow-hidden rounded-xl">
        {profile.backgroundImage ? (
          // Show selected background image if available
          <img
            src={profile.backgroundImage}
            alt="Background"
            className="w-full h-full object-cover"
          />
        ) : (
          // Show placeholder with upload button if no background image
          <div className="w-full h-full bg-gradient-to-br from-primary-500/20 to-primary-600/20 dark:from-primary-500/10 dark:to-primary-600/10 flex items-center justify-center">
            <button
              onClick={() => setImageSelectType('background')}
              className="flex items-center gap-2 px-4 py-2 bg-white dark:bg-gray-800 rounded-lg shadow-md hover:shadow-lg transition-shadow"
            >
              <Camera className="w-5 h-5 text-primary-500" />
              <span className="text-gray-700 dark:text-gray-300">Add Cover Photo</span>
            </button>
          </div>
        )}
        
        {/* Background image change button */}
        {profile.backgroundImage && (
          <button
            onClick={() => setImageSelectType('background')}
            className="absolute bottom-4 right-4 p-2 bg-black/50 rounded-full text-white hover:bg-black/70 transition-colors"
            title="Change background image"
          >
            <Camera className="w-5 h-5" />
          </button>
        )}
      </div>

      {/* Profile Information Section */}
      <div className="absolute -bottom-16 left-8 right-8 flex flex-col md:flex-row md:items-end gap-6">
        {/* Profile Avatar Section */}
        <div className="relative">
          {profile.avatar ? (
            // Show selected avatar if available
            <>
              <img
                src={profile.avatar}
                alt={profile.name}
                className="w-32 h-32 rounded-full border-4 border-white dark:border-gray-800 object-cover shadow-lg"
              />
              <button
                onClick={() => setImageSelectType('avatar')}
                className="absolute bottom-0 right-0 p-2 bg-primary-500 rounded-full text-white hover:bg-primary-600 transition-colors shadow-md"
                title="Change profile picture"
              >
                <Camera className="w-4 h-4" />
              </button>
            </>
          ) : (
            // Show placeholder with upload button if no avatar
            <button
              onClick={() => setImageSelectType('avatar')}
              className="w-32 h-32 rounded-full border-4 border-white dark:border-gray-800 bg-gray-100 dark:bg-gray-700 flex items-center justify-center shadow-lg hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors"
            >
              <div className="text-center">
                <Camera className="w-8 h-8 text-gray-400 dark:text-gray-500 mx-auto mb-1" />
                <span className="text-xs text-gray-500 dark:text-gray-400">Add Photo</span>
              </div>
            </button>
          )}
        </div>
        
        {/* Profile Details Card */}
        <div className="flex-1">
          <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-md relative group">
            {/* Edit Profile Button */}
            <button
              onClick={() => setIsEditingProfile(true)}
              className="absolute top-4 right-4 p-2 bg-gray-100 dark:bg-gray-700 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
            >
              <Edit2 className="w-4 h-4 text-gray-600 dark:text-gray-300" />
            </button>

            {/* Profile Information */}
            <div className="mb-4">
              <h1 className="text-2xl font-bold text-gray-900 dark:text-white">{profile.name}</h1>
              <div className="flex items-center gap-4 text-gray-600 dark:text-gray-400 mt-1">
                {profile.role && (
                  <div className="flex items-center gap-1">
                    <Briefcase className="w-4 h-4" />
                    <span>{profile.role}</span>
                  </div>
                )}
                {profile.location && (
                  <div className="flex items-center gap-1">
                    <MapPin className="w-4 h-4" />
                    <span>{profile.location}</span>
                  </div>
                )}
              </div>
            </div>

            {/* Skills Section */}
            {profile.skills && profile.skills.length > 0 && (
              <div className="flex flex-wrap gap-2 mb-4">
                {profile.skills.map((skill) => (
                  <span
                    key={skill}
                    className="px-3 py-1 bg-primary-100 dark:bg-primary-900/30 text-primary-700 dark:text-primary-300 rounded-full text-sm font-medium"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            )}

            {/* Bio Section */}
            <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
              {profile.bio || 'No bio yet'}
            </p>
          </div>
        </div>
      </div>

      {/* Modals */}
      {isEditingProfile && (
        <EditProfileModal
          profile={profile}
          onSave={onUpdateProfile}
          onClose={() => setIsEditingProfile(false)}
        />
      )}

      {imageSelectType && (
        <ImageSelectModal
          type={imageSelectType}
          onSelect={handleImageSelect}
          onClose={() => setImageSelectType(null)}
        />
      )}
    </div>
  );
}