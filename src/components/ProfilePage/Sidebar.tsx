import React from 'react';
import { Users, Sparkles } from 'lucide-react';
import { RecommendedMatch, Community } from '../../types/profile';

interface SidebarProps {
  recommendedMatches: RecommendedMatch[];
  activeCommunities: Community[];
}

export function Sidebar({ recommendedMatches, activeCommunities }: SidebarProps) {
  return (
    <div className="space-y-8">
      {/* Recommended Matches */}
      <div className="bg-white rounded-xl shadow-sm p-6">
        <div className="flex items-center gap-2 mb-4">
          <Sparkles className="w-5 h-5 text-emerald-500" />
          <h3 className="text-lg font-semibold">Recommended Matches</h3>
        </div>
        <div className="space-y-4">
          {recommendedMatches.map((match) => (
            <div key={match.id} className="flex items-center gap-4">
              <img
                src={match.avatar}
                alt={match.name}
                className="w-12 h-12 rounded-full object-cover"
              />
              <div className="flex-1 min-w-0">
                <h4 className="font-medium truncate">{match.name}</h4>
                <p className="text-sm text-gray-500 truncate">{match.role}</p>
              </div>
              <span className="text-sm font-medium text-emerald-500">
                {match.matchPercentage}% Match
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Active Communities */}
      <div className="bg-white rounded-xl shadow-sm p-6">
        <div className="flex items-center gap-2 mb-4">
          <Users className="w-5 h-5 text-emerald-500" />
          <h3 className="text-lg font-semibold">Active Communities</h3>
        </div>
        <div className="space-y-4">
          {activeCommunities.map((community) => (
            <div key={community.id} className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-lg bg-emerald-100 flex items-center justify-center">
                <span className="text-2xl">{community.icon}</span>
              </div>
              <div className="flex-1 min-w-0">
                <h4 className="font-medium truncate">{community.name}</h4>
                <p className="text-sm text-gray-500">
                  {community.memberCount.toLocaleString()} members
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}