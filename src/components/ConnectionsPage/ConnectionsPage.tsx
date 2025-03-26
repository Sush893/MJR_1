import React, { useState } from 'react';
import { connections } from '../../data/connections';
import { ConnectionCard } from './ConnectionCard';
import { ProfileModal } from './ProfileModal';
import { Connection, ConnectionRole, ExpertiseField } from '../../types/connection';
import { ChevronDown } from 'lucide-react';

export function ConnectionsPage() {
  const [selectedRole, setSelectedRole] = useState<ConnectionRole | 'All'>('All');
  const [selectedExpertise, setSelectedExpertise] = useState<ExpertiseField | 'All'>('All');
  const [selectedLocation, setSelectedLocation] = useState<string>('All');
  const [selectedProfile, setSelectedProfile] = useState<Connection | null>(null);

  const locations = Array.from(new Set(connections.map(c => c.location)));
  
  const filteredConnections = connections.filter(connection => {
    if (selectedRole !== 'All' && connection.role !== selectedRole) return false;
    if (selectedExpertise !== 'All' && !connection.expertise.includes(selectedExpertise)) return false;
    if (selectedLocation !== 'All' && connection.location !== selectedLocation) return false;
    return true;
  });

  return (
    <div className="p-8">
      {/* Filters */}
      <div className="mb-8 grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="relative">
          <label className="block text-sm font-medium text-gray-700 mb-1">Role:</label>
          <div className="relative">
            <select
              value={selectedRole}
              onChange={(e) => setSelectedRole(e.target.value as ConnectionRole | 'All')}
              className="w-full p-2 pr-8 bg-white border border-gray-300 rounded-lg appearance-none focus:outline-none focus:ring-2 focus:ring-emerald-500"
            >
              <option value="All">All Roles</option>
              <option value="Co-Founder">Co-Founder</option>
              <option value="Mentor">Mentor</option>
              <option value="Investor">Investor</option>
            </select>
            <ChevronDown className="absolute right-2 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
          </div>
        </div>

        <div className="relative">
          <label className="block text-sm font-medium text-gray-700 mb-1">Industry/Field of Expertise:</label>
          <div className="relative">
            <select
              value={selectedExpertise}
              onChange={(e) => setSelectedExpertise(e.target.value as ExpertiseField | 'All')}
              className="w-full p-2 pr-8 bg-white border border-gray-300 rounded-lg appearance-none focus:outline-none focus:ring-2 focus:ring-emerald-500"
            >
              <option value="All">All Fields</option>
              <option value="EdTech">EdTech</option>
              <option value="FinTech">FinTech</option>
              <option value="HealthTech">HealthTech</option>
              <option value="AI/ML">AI/ML</option>
              <option value="Blockchain">Blockchain</option>
              <option value="E-commerce">E-commerce</option>
            </select>
            <ChevronDown className="absolute right-2 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
          </div>
        </div>

        <div className="relative">
          <label className="block text-sm font-medium text-gray-700 mb-1">Location:</label>
          <div className="relative">
            <select
              value={selectedLocation}
              onChange={(e) => setSelectedLocation(e.target.value)}
              className="w-full p-2 pr-8 bg-white border border-gray-300 rounded-lg appearance-none focus:outline-none focus:ring-2 focus:ring-emerald-500"
            >
              <option value="All">All Locations</option>
              {locations.map((location) => (
                <option key={location} value={location}>{location}</option>
              ))}
            </select>
            <ChevronDown className="absolute right-2 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
          </div>
        </div>
      </div>

      {/* Connection Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredConnections.map((connection) => (
          <ConnectionCard
            key={connection.id}
            connection={connection}
            onViewProfile={setSelectedProfile}
          />
        ))}
      </div>

      {/* Profile Modal */}
      {selectedProfile && (
        <ProfileModal
          connection={selectedProfile}
          onClose={() => setSelectedProfile(null)}
        />
      )}
    </div>
  );
}