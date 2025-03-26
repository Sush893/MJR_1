import React, { useState } from 'react';
import { Bell, Menu, User } from 'lucide-react';
import { ThemeToggle } from './ThemeToggle';
import { NotificationsDropdown } from './NotificationsDropdown';
import { useAuth } from '../contexts/AuthContext';

interface HeaderProps {
  onMenuClick: () => void;
}

export function Header({ onMenuClick }: HeaderProps) {
  const [isNotificationsOpen, setIsNotificationsOpen] = useState(false);
  const { profile } = useAuth();

  return (
    <header className="fixed top-0 left-0 right-0 bg-white dark:bg-gray-800 shadow-md dark:shadow-gray-900/10 p-4 flex items-center justify-between z-10">
      <button 
        onClick={onMenuClick}
        className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-full transition-colors"
      >
        <Menu className="w-6 h-6 dark:text-gray-200" />
      </button>
      <div className="flex-1 max-w-xl mx-4">
        <input
          type="search"
          placeholder="Search..."
          className="w-full px-4 py-2 rounded-full bg-gray-100 dark:bg-gray-700 dark:text-gray-200 focus:outline-none focus:ring-2 focus:ring-primary-500 transition-all duration-200"
        />
      </div>
      <div className="flex items-center gap-6">
        <ThemeToggle />
        <div className="relative">
          <button 
            onClick={() => setIsNotificationsOpen(!isNotificationsOpen)}
            className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-full transition-colors relative"
          >
            <Bell className="w-5 h-5 dark:text-gray-200" />
            <span className="absolute top-0 right-0 w-2 h-2 bg-red-500 rounded-full" />
          </button>
          <NotificationsDropdown 
            isOpen={isNotificationsOpen}
            onClose={() => setIsNotificationsOpen(false)}
          />
        </div>
        <select className="bg-transparent dark:text-gray-200 focus:outline-none cursor-pointer">
          <option>ENG</option>
        </select>
        <div className="flex items-center gap-3">
          {profile?.avatar_url ? (
            <img
              src={profile.avatar_url}
              alt={profile.full_name || 'Profile'}
              className="w-10 h-10 rounded-full object-cover ring-2 ring-primary-500"
            />
          ) : (
            <div className="w-10 h-10 rounded-full bg-gray-100 dark:bg-gray-700 ring-2 ring-primary-500 flex items-center justify-center">
              <User className="w-5 h-5 text-gray-400 dark:text-gray-500" />
            </div>
          )}
          <span className="font-medium dark:text-gray-200">{profile?.full_name || 'Guest'}</span>
        </div>
      </div>
    </header>
  );
}