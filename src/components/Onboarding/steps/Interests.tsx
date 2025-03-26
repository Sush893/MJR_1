import React, { useState } from 'react';
import { OnboardingData } from '../OnboardingFlow';

interface Props {
  data: OnboardingData;
  onNext: (data: Partial<OnboardingData>) => void;
}

const availableInterests = [
  'AgriTech',
  'EdTech',
  'FinTech',
  'HealthTech',
  'AI/ML',
  'Blockchain',
  'E-commerce',
  'SaaS',
  'IoT',
  'CleanTech',
  'BioTech',
  'SpaceTech'
];

export function Interests({ data, onNext }: Props) {
  const [selectedInterests, setSelectedInterests] = useState<string[]>(data.interests);

  const toggleInterest = (interest: string) => {
    setSelectedInterests(prev =>
      prev.includes(interest)
        ? prev.filter(i => i !== interest)
        : [...prev, interest]
    );
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onNext({ interests: selectedInterests });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <p className="text-gray-600 dark:text-gray-400">
        Select the areas that interest you most. This helps us personalize your experience.
      </p>

      <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
        {availableInterests.map((interest) => (
          <button
            key={interest}
            type="button"
            onClick={() => toggleInterest(interest)}
            className={`p-3 rounded-lg text-sm font-medium transition-colors
              ${selectedInterests.includes(interest)
                ? 'bg-primary-500 text-white'
                : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600'
              }`}
          >
            {interest}
          </button>
        ))}
      </div>

      <button
        type="submit"
        disabled={selectedInterests.length === 0}
        className="w-full py-3 bg-primary-500 text-white rounded-lg hover:bg-primary-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
      >
        Continue
      </button>
    </form>
  );
}