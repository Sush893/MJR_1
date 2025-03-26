import React, { useEffect, useState } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import api from '../../lib/api/client';

export function SupabaseTest() {
  const [status, setStatus] = useState<'checking' | 'connected' | 'error'>('checking');
  const [error, setError] = useState<string | null>(null);
  const { user } = useAuth();

  useEffect(() => {
    async function checkConnection() {
      try {
        if (!user) {
          setStatus('error');
          setError('Not authenticated');
          return;
        }

        const { data } = await api.get('/profile');
        if (data) {
          setStatus('connected');
        } else {
          throw new Error('No profile data');
        }
      } catch (err: any) {
        setStatus('error');
        setError(err.message);
      }
    }

    checkConnection();
  }, [user]);

  return (
    <div className="fixed bottom-4 right-4 p-4 rounded-lg shadow-lg bg-white dark:bg-gray-800">
      <h3 className="text-lg font-semibold mb-2">API Connection Status</h3>
      <div className="flex items-center gap-2">
        <div
          className={`w-3 h-3 rounded-full ${
            status === 'checking'
              ? 'bg-yellow-500'
              : status === 'connected'
              ? 'bg-green-500'
              : 'bg-red-500'
          }`}
        />
        <span className="text-sm">
          {status === 'checking'
            ? 'Checking connection...'
            : status === 'connected'
            ? 'Connected to API'
            : 'Connection Error'}
        </span>
      </div>
      {error && <p className="text-sm text-red-500 mt-2">{error}</p>}
    </div>
  );
}