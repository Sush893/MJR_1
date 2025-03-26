import React from 'react';
import { useAuth } from '../../contexts/AuthContext';
import { LogOut, User, Shield, Bell, Globe } from 'lucide-react';

export function AccountSettings() {
  const { signOut } = useAuth();

  const settingsSections = [
    {
      title: 'Profile Settings',
      icon: User,
      description: 'Update your personal information and profile details'
    },
    {
      title: 'Privacy & Security',
      icon: Shield,
      description: 'Manage your account security and privacy preferences'
    },
    {
      title: 'Notifications',
      icon: Bell,
      description: 'Configure how you receive notifications and updates'
    },
    {
      title: 'Language & Region',
      icon: Globe,
      description: 'Set your preferred language and regional settings'
    }
  ];

  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-8 dark:text-white">Account Settings</h1>
      
      <div className="grid gap-6">
        {settingsSections.map((section) => (
          <div 
            key={section.title}
            className="bg-white dark:bg-gray-800 rounded-xl p-6 hover:shadow-md transition-shadow cursor-pointer"
          >
            <div className="flex items-center gap-4">
              <div className="p-3 bg-primary-100 dark:bg-primary-900/30 rounded-lg">
                <section.icon className="w-6 h-6 text-primary-500 dark:text-primary-400" />
              </div>
              <div>
                <h3 className="text-lg font-semibold dark:text-white">{section.title}</h3>
                <p className="text-gray-600 dark:text-gray-400">{section.description}</p>
              </div>
            </div>
          </div>
        ))}

        <button
          onClick={signOut}
          className="flex items-center gap-3 w-full p-6 bg-red-50 dark:bg-red-900/10 text-red-600 dark:text-red-400 rounded-xl hover:bg-red-100 dark:hover:bg-red-900/20 transition-colors"
        >
          <LogOut className="w-6 h-6" />
          <span className="font-medium">Sign Out</span>
        </button>
      </div>
    </div>
  );
}