import React, { useState } from 'react';
import { OnboardingData } from '../OnboardingFlow';

interface Props {
  data: OnboardingData;
  onNext: (data: Partial<OnboardingData>) => void;
}

export function PersonalInfo({ data, onNext }: Props) {
  const [firstName, setFirstName] = useState(data.firstName);
  const [lastName, setLastName] = useState(data.lastName);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onNext({ firstName, lastName });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div>
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
          First Name
        </label>
        <input
          type="text"
          value={firstName}
          onChange={(e) => setFirstName(e.target.value)}
          className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-primary-500"
          required
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
          Last Name
        </label>
        <input
          type="text"
          value={lastName}
          onChange={(e) => setLastName(e.target.value)}
          className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-primary-500"
          required
        />
      </div>

      <button
        type="submit"
        className="w-full py-3 bg-primary-500 text-white rounded-lg hover:bg-primary-600 transition-colors"
      >
        Continue
      </button>
    </form>
  );
}