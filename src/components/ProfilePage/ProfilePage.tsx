import React, { useState, useEffect } from 'react';
import { ProfileHeader } from './ProfileHeader';
import { BlogEditor } from './BlogEditor';
import { BlogList } from './BlogList';
import { Sidebar } from './Sidebar';
import { UserProfile, BlogPost } from '../../types/profile';
import { PenSquare } from 'lucide-react';
import { ProfileAPI } from '../../lib/api/profile';
import { BlogAPI } from '../../lib/api/blog';
import { useAuth } from '../../contexts/AuthContext';
import { LoadingSpinner } from '../common/LoadingSpinner';

export function ProfilePage() {
  const { user } = useAuth();
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [isEditing, setIsEditing] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    loadProfile();
  }, []);

  const loadProfile = async () => {
    try {
      const { data } = await ProfileAPI.getProfile();
      setProfile(data);
    } catch (err) {
      console.error('Error loading profile:', err);
      setError('Failed to load profile');
    } finally {
      setLoading(false);
    }
  };

  const handleUpdateProfile = async (updates: Partial<UserProfile>) => {
    try {
      const { data } = await ProfileAPI.updateProfile(updates);
      setProfile(data);
    } catch (err) {
      console.error('Error updating profile:', err);
      setError('Failed to update profile');
    }
  };

  const handleSaveBlog = async (post: Omit<BlogPost, 'id' | 'createdAt'>) => {
    try {
      await BlogAPI.createPost(post);
      await loadProfile();
      setIsEditing(false);
    } catch (err) {
      console.error('Error creating blog post:', err);
      setError('Failed to create blog post');
    }
  };

  const handleDeleteBlog = async (postId: string) => {
    try {
      await BlogAPI.deletePost(postId);
      await loadProfile();
    } catch (err) {
      console.error('Error deleting blog post:', err);
      setError('Failed to delete blog post');
    }
  };

  if (loading) return <LoadingSpinner />;
  if (error) return <div className="p-8 text-center text-red-500">{error}</div>;
  if (!profile) return null;

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <ProfileHeader profile={profile} onUpdateProfile={handleUpdateProfile} />
      
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <div className="mb-8 flex justify-between items-center">
              <h2 className="text-2xl font-bold dark:text-white">Blog Posts</h2>
              <button
                onClick={() => setIsEditing(true)}
                className="flex items-center gap-2 px-4 py-2 bg-primary-500 text-white rounded-full hover:bg-primary-600 transition-colors"
              >
                <PenSquare className="w-4 h-4" />
                Write Blog
              </button>
            </div>
            
            <BlogList
              posts={profile.blogs}
              onEdit={() => {}}
              onDelete={handleDeleteBlog}
            />
          </div>

          <div className="lg:col-span-1">
            <Sidebar
              recommendedMatches={[]}
              activeCommunities={[]}
            />
          </div>
        </div>
      </div>

      {isEditing && (
        <BlogEditor
          onSave={handleSaveBlog}
          onClose={() => setIsEditing(false)}
        />
      )}
    </div>
  );
}