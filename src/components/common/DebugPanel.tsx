import React, { useState } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import { LocalStorage } from '../../lib/storage/localStorage';

export const DebugPanel = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { profile, completeOnboarding } = useAuth();
  const [message, setMessage] = useState<string | null>(null);

  const handleOverrideOnboarding = async () => {
    try {
      setMessage('Overriding onboarding status...');
      await completeOnboarding();
      setMessage('Onboarding status overridden. Reloading in 2 seconds...');
      
      // Reload after a short delay to show the success message
      setTimeout(() => {
        window.location.reload();
      }, 2000);
    } catch (error) {
      console.error('Failed to override onboarding:', error);
      setMessage('Error overriding onboarding status');
    }
  };

  if (!isOpen) {
    return (
      <button 
        onClick={() => setIsOpen(true)}
        className="fixed bottom-4 right-4 p-2 bg-gray-800 text-white rounded-full opacity-50 hover:opacity-100 z-50"
        title="Debug Tools"
      >
        🛠️
      </button>
    );
  }

  return (
    <div className="fixed bottom-4 right-4 p-4 bg-gray-800 text-white rounded-lg shadow-lg z-50 w-64">
      <div className="flex justify-between items-center mb-4">
        <h3 className="font-semibold">Debug Tools</h3>
        <button 
          onClick={() => setIsOpen(false)}
          className="text-gray-400 hover:text-white"
        >
          ✕
        </button>
      </div>
      
      <div className="space-y-2">
        <div className="text-xs mb-2">
          <div>User ID: {profile?.id || 'Not logged in'}</div>
          <div>Onboarding: {profile?.onboarding_completed ? 'Completed' : 'Not Completed'}</div>
        </div>
        
        <button
          onClick={handleOverrideOnboarding}
          className="w-full py-1 px-3 bg-blue-600 hover:bg-blue-700 text-white text-sm rounded"
        >
          Override Onboarding Status
        </button>
        
        <button
          onClick={() => {
            LocalStorage.clearAll();
            window.location.reload();
          }}
          className="w-full py-1 px-3 bg-red-600 hover:bg-red-700 text-white text-sm rounded"
        >
          Clear Local Storage
        </button>
      </div>
      
      {message && (
        <div className="mt-3 p-2 bg-gray-700 text-xs rounded">
          {message}
        </div>
      )}
    </div>
  );
}; 