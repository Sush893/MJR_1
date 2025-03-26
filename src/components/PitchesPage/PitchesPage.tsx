import React, { useState, useEffect } from 'react';
import { PitchesHeader } from './PitchesHeader';
import { PitchesGrid } from './PitchesGrid';
import { PitchEditor } from './PitchEditor';
import { PitchModal } from './PitchModal';
import { Pitch } from '../../types/pitch';
import { PitchAPI } from '../../lib/api/pitch';
import { useAuth } from '../../contexts/AuthContext';
import { LoadingSpinner } from '../common/LoadingSpinner';

export function PitchesPage() {
  const { user } = useAuth();
  const [pitches, setPitches] = useState<Pitch[]>([]);
  const [isEditing, setIsEditing] = useState(false);
  const [selectedPitch, setSelectedPitch] = useState<Pitch | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    loadPitches();
  }, []);

  const loadPitches = async () => {
    try {
      const { data } = await PitchAPI.getAllPitches();
      setPitches(data);
    } catch (err) {
      console.error('Error loading pitches:', err);
      setError('Failed to load pitches');
    } finally {
      setLoading(false);
    }
  };

  const handleSavePitch = async (formData: FormData) => {
    try {
      await PitchAPI.createPitch(formData);
      await loadPitches();
      setIsEditing(false);
    } catch (err) {
      console.error('Error creating pitch:', err);
      setError('Failed to create pitch');
    }
  };

  const handleLikePitch = async (pitchId: string) => {
    try {
      await PitchAPI.likePitch(pitchId);
      await loadPitches();
    } catch (err) {
      console.error('Error liking pitch:', err);
      setError('Failed to like pitch');
    }
  };

  if (loading) return <LoadingSpinner />;
  if (error) return <div className="p-8 text-center text-red-500">{error}</div>;

  return (
    <div className="p-8">
      <PitchesHeader onCreatePitch={() => setIsEditing(true)} />
      <PitchesGrid pitches={pitches} onViewPitch={setSelectedPitch} />

      {isEditing && (
        <PitchEditor
          onSave={handleSavePitch}
          onClose={() => setIsEditing(false)}
        />
      )}

      {selectedPitch && (
        <PitchModal
          pitch={selectedPitch}
          onClose={() => setSelectedPitch(null)}
          onLike={() => handleLikePitch(selectedPitch.id)}
        />
      )}
    </div>
  );
}