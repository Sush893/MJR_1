import React from 'react';
import { PlusCircle } from 'lucide-react';

interface PitchesHeaderProps {
  onCreatePitch: () => void;
}

export function PitchesHeader({ onCreatePitch }: PitchesHeaderProps) {
  return (
    <div className="mb-8 flex justify-between items-center">
      <h1 className="text-2xl font-bold dark:text-white">Pitches</h1>
      <button
        onClick={onCreatePitch}
        className="flex items-center gap-2 px-6 py-2 bg-primary-500 dark:bg-primary-600 text-white rounded-full hover:bg-primary-600 dark:hover:bg-primary-500 transition-colors"
      >
        <PlusCircle className="w-5 h-5" />
        Create Pitch
      </button>
    </div>
  );
}