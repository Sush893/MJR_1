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
import { Camera, Edit2, MapPin, Briefcase, Search } from 'lucide-react';
import { UserProfile } from '../../types/profile';
import { Startup } from '../../types/recommendation';
import { EditProfileModal } from './EditProfileModal';
import { ImageSelectModal } from './ImageSelectModal';
import RecommendationService from '../../lib/services/RecommendationService';

interface ProfileHeaderProps {
  profile: UserProfile;
  onUpdateProfile: (updates: Partial<UserProfile>) => void;
}

export function ProfileHeader({ profile, onUpdateProfile }: ProfileHeaderProps) {
  // State for managing modal visibility
  const [isEditingProfile, setIsEditingProfile] = useState(false);
  const [imageSelectType, setImageSelectType] = useState<'avatar' | 'background' | null>(null);
  
  // State for search functionality
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState<Startup[]>([]);
  const [recommendedStartups, setRecommendedStartups] = useState<Startup[]>([]);
  const [isSearching, setIsSearching] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [showResults, setShowResults] = useState(false);

  /**
   * Fetches recommended startups based on user profile
   */
  const fetchRecommendations = async () => {
    setIsLoading(true);
    try {
      const recommendations = await RecommendationService.getRecommendations(profile);
      setRecommendedStartups(recommendations);
    } catch (error) {
      console.error('Error fetching recommendations:', error);
    } finally {
      setIsLoading(false);
    }
  };

  // Fetch recommendations when component mounts
  React.useEffect(() => {
    fetchRecommendations();
  }, [profile.id, profile.skills]);

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

  /**
   * Handles search for startups based on user input
   */
  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!searchQuery.trim()) return;

    setIsSearching(true);
    setShowResults(true);

    try {
      const results = await RecommendationService.searchStartups(searchQuery);
      setSearchResults(results);
      
      // Update user profile with search query (for personalization)
      if (profile.id) {
        RecommendationService.updateUserProfile(profile.id, searchQuery);
      }
    } catch (error) {
      console.error('Error searching startups:', error);
    } finally {
      setIsSearching(false);
    }
  };

  return (
    <div className="relative mb-24">
      {/* Search Bar */}
      <div className="absolute top-4 right-4 z-10 w-full max-w-md">
        <form onSubmit={handleSearch} className="relative">
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search for startups..."
            className="w-full py-2 pl-4 pr-10 rounded-full border border-gray-300 dark:border-gray-700 bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm focus:outline-none focus:ring-2 focus:ring-primary-500"
          />
          <button
            type="submit"
            className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 dark:text-gray-400"
            disabled={isSearching}
          >
            <Search className="w-5 h-5" />
          </button>
        </form>

        {/* Search Results Dropdown */}
        {showResults && searchResults.length > 0 && (
          <div className="absolute mt-2 w-full bg-white dark:bg-gray-800 rounded-lg shadow-lg overflow-hidden max-h-96 overflow-y-auto z-20">
            <div className="p-2 border-b border-gray-200 dark:border-gray-700 flex justify-between">
              <h3 className="font-medium">Search Results</h3>
              <button 
                onClick={() => setShowResults(false)}
                className="text-sm text-gray-500 hover:text-gray-700"
              >
                Close
              </button>
            </div>
            <ul>
              {searchResults.map((startup) => (
                <li key={startup.id} className="p-3 hover:bg-gray-100 dark:hover:bg-gray-700 border-b border-gray-200 dark:border-gray-700 last:border-b-0">
                  <h4 className="font-medium">{startup.title}</h4>
                  <p className="text-sm text-gray-600 dark:text-gray-400 line-clamp-2">{startup.description}</p>
                  <div className="mt-1 flex flex-wrap gap-1">
                    {startup.industry && (
                      <span className="px-2 py-0.5 bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 rounded-full text-xs">
                        {startup.industry}
                      </span>
                    )}
                    {startup.tags.slice(0, 3).map((tag) => (
                      <span key={tag} className="px-2 py-0.5 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-full text-xs">
                        {tag}
                      </span>
                    ))}
                  </div>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>

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

      {/* Recommended Startups Section - Add after profile details card */}
      <div className="mt-8 bg-white dark:bg-gray-800 rounded-xl p-6 shadow-md">
        <h2 className="text-xl font-bold mb-4 text-gray-900 dark:text-white">Recommended For You</h2>
        
        {isLoading ? (
          <div className="flex justify-center py-8">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary-500"></div>
          </div>
        ) : recommendedStartups.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {recommendedStartups.map((startup) => (
              <div key={startup.id} className="border border-gray-200 dark:border-gray-700 rounded-lg p-4 hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors">
                <h3 className="font-bold text-gray-900 dark:text-white">{startup.title}</h3>
                <p className="text-sm text-gray-600 dark:text-gray-400 mt-1 line-clamp-2">{startup.description}</p>
                <div className="mt-2 flex flex-wrap gap-1">
                  {startup.industry && (
                    <span className="px-2 py-0.5 bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 rounded-full text-xs">
                      {startup.industry}
                    </span>
                  )}
                  {startup.tags.slice(0, 3).map((tag) => (
                    <span key={tag} className="px-2 py-0.5 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-full text-xs">
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-gray-500 dark:text-gray-400 text-center py-8">
            No recommendations found. Try updating your skills or preferences.
          </p>
        )}
        
        <div className="mt-4 text-center">
          <button
            onClick={fetchRecommendations}
            disabled={isLoading}
            className="text-primary-500 hover:text-primary-600 dark:hover:text-primary-400 text-sm font-medium"
          >
            Refresh recommendations
          </button>
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