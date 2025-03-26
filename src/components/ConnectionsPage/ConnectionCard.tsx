import React from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { Connection } from '../../types/connection';

interface ConnectionCardProps {
  connection: Connection;
  onViewProfile: (connection: Connection) => void;
}

export function ConnectionCard({ connection, onViewProfile }: ConnectionCardProps) {
  return (
    <div className="bg-emerald-500 rounded-xl overflow-hidden hover:shadow-lg transition-all duration-200">
      <div className="p-6 text-white text-center">
        <div className="relative w-32 h-32 mx-auto mb-4">
          <img 
            src={connection.avatar} 
            alt={connection.name}
            className="rounded-full w-full h-full object-cover border-4 border-white"
          />
          <button className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-1/2 bg-white/90 p-1 rounded-full">
            <ChevronLeft className="w-4 h-4 text-emerald-600" />
          </button>
          <button className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-1/2 bg-white/90 p-1 rounded-full">
            <ChevronRight className="w-4 h-4 text-emerald-600" />
          </button>
        </div>
        
        <h3 className="text-xl font-bold mb-1">{connection.name}</h3>
        <p className="text-emerald-100 italic mb-4">{connection.role}</p>
        
        <div className="space-y-2 mb-4">
          <div className="text-sm">
            <p className="text-emerald-100">Shared Interests:</p>
            <div className="flex flex-wrap gap-2 justify-center mt-1">
              {connection.sharedInterests.map((interest) => (
                <span key={interest} className="px-2 py-1 bg-white/10 rounded-full text-xs">
                  {interest}
                </span>
              ))}
            </div>
          </div>
        </div>
        
        <div className="space-y-2">
          <button 
            onClick={() => onViewProfile(connection)}
            className="w-full px-4 py-2 bg-white text-emerald-600 rounded-full hover:bg-emerald-50 transition-colors text-sm font-medium"
          >
            View Profile
          </button>
          <button className="w-full px-4 py-2 bg-emerald-600 text-white rounded-full hover:bg-emerald-700 transition-colors text-sm font-medium">
            Connect
          </button>
        </div>
      </div>
    </div>
  );
}