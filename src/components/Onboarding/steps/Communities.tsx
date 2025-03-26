import React, { useState } from 'react';
import { OnboardingData } from '../OnboardingFlow';

interface Props {
  data: OnboardingData;
  onNext: (data: Partial<OnboardingData>) => void;
}

const availableCommunities = [
  {
    id: 'startup-founders',
    name: 'Startup Founders',
    members: 1234,
    description: 'Connect with fellow entrepreneurs and share experiences'
  },
  {
    id: 'tech-innovators',
    name: 'Tech Innovators',
    members: 892,
    description: 'Discuss cutting-edge technology and innovation'
  },
  {
    id: 'agritech-hub',
    name: 'AgriTech Hub',
    members: 456,
    description: 'Revolutionizing agriculture through technology'
  },
  {
    id: 'edtech-pioneers',
    name: 'EdTech Pioneers',
    members: 789,
    description: 'Shaping the future of education'
  },
  {
    id: 'fintech-network',
    name: 'FinTech Network',
    members: 567,
    description: 'Innovation in financial technology'
  },
  {
    id: 'healthtech-connect',
    name: 'HealthTech Connect',
    members: 678,
    description: 'Advancing healthcare through technology'
  }
];

export function Communities({ data, onNext }: Props) {
  const [selectedCommunities, setSelectedCommunities] = useState<string[]>(data.communities);

  const toggleCommunity = (communityId: string) => {
    setSelectedCommunities(prev =>
      prev.includes(communityId)
        ? prev.filter(id => id !== communityId)
        : [...prev, communityId]
    );
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onNext({ communities: selectedCommunities });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <p className="text-gray-600 dark:text-gray-400">
        Join communities to connect with like-minded entrepreneurs and stay updated with the latest in your field.
      </p>

      <div className="grid gap-4">
        {availableCommunities.map((community) => (
          <button
            key={community.id}
            type="button"
            onClick={() => toggleCommunity(community.id)}
            className={`p-4 rounded-xl text-left transition-all ${
              selectedCommunities.includes(community.id)
                ? 'bg-primary-50 dark:bg-primary-900/30 ring-2 ring-primary-500'
                : 'bg-gray-50 dark:bg-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600'
            }`}
          >
            <div className="flex justify-between items-start mb-2">
              <h3 className="font-medium dark:text-white">{community.name}</h3>
              <span className="text-sm text-gray-500 dark:text-gray-400">
                {community.members.toLocaleString()} members
              </span>
            </div>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              {community.description}
            </p>
          </button>
        ))}
      </div>

      <button
        type="submit"
        className="w-full py-3 bg-primary-500 text-white rounded-lg hover:bg-primary-600 transition-colors"
      >
        Complete Setup
      </button>
    </form>
  );
}