import React from 'react';
import { PitchCard } from './PitchCard';
import { BackendPitch } from '../../types/pitch';

interface PitchesGridProps {
  pitches: BackendPitch[];
  onViewPitch: (pitch: BackendPitch) => void;
}

export function PitchesGrid({ pitches, onViewPitch }: PitchesGridProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      {pitches.map((pitch) => (
        <PitchCard
          key={pitch.id}
          pitch={pitch}
          onView={onViewPitch}
        />
      ))}
    </div>
  );
}