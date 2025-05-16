import React, { useState, useEffect } from 'react';
import { PitchesHeader } from './PitchesHeader';
import { PitchesGrid } from './PitchesGrid';
import { PitchEditor } from './PitchEditor';
import { PitchModal } from './PitchModal';
import { BackendPitch } from '../../types/pitch';
import { PitchAPI } from '../../lib/api/pitch';
import { useAuth } from '../../contexts/AuthContext';
import { LoadingSpinner } from '../common/LoadingSpinner';

export function PitchesPage() {
  const { user } = useAuth();
  const [pitches, setPitches] = useState<BackendPitch[]>([]);
  const [isEditing, setIsEditing] = useState(false);
  const [selectedPitch, setSelectedPitch] = useState<BackendPitch | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (user?.id) {
      loadPitches();
    }
  }, [user?.id]);

  const loadPitches = async () => {
    if (!user?.id) return;
    
    try {
      const { pitches: userPitches } = await PitchAPI.getAllPitches(user.id);
      setPitches(userPitches);
    } catch (err) {
      console.error('Error loading pitches:', err);
      setError('Failed to load pitches');
    } finally {
      setLoading(false);
    }
  };

  const handleSavePitch = async (formData: FormData) => {
    if (!user?.id) return;
    
    try {
      formData.append('user_id', user.id);
      const { pitch } = await PitchAPI.createPitch(formData);
      setPitches(prev => [...prev, pitch]);
      setIsEditing(false);
    } catch (err) {
      console.error('Error creating pitch:', err);
      setError('Failed to create pitch');
    }
  };

  const handleDeletePitch = async (pitchId: string) => {
    if (!user?.id) return;
    
    try {
      await PitchAPI.deletePitch(user.id, pitchId);
      setPitches(prev => prev.filter(p => p.id !== pitchId));
      setSelectedPitch(null);
    } catch (err) {
      console.error('Error deleting pitch:', err);
      setError('Failed to delete pitch');
    }
  };

  const handleUpdatePitch = async (pitchId: string, data: {
    title?: string;
    description?: string;
    media_type?: 'image' | 'video';
    media_url?: string;
    tags?: string[];
  }) => {
    if (!user?.id) return;
    
    try {
      const { pitch: updatedPitch } = await PitchAPI.updatePitch(user.id, pitchId, data);
      setPitches(prev => prev.map(p => p.id === pitchId ? updatedPitch : p));
      setSelectedPitch(null);
    } catch (err) {
      console.error('Error updating pitch:', err);
      setError('Failed to update pitch');
    }
  };

  if (!user) return <div className="p-8 text-center">Please log in to view your pitches</div>;
  if (loading) return <LoadingSpinner />;
  if (error) return <div className="p-8 text-center text-red-500">{error}</div>;

  return (
    <div className="p-8">
      <PitchesHeader onCreatePitch={() => setIsEditing(true)} />
      <PitchesGrid 
        pitches={pitches} 
        onViewPitch={setSelectedPitch}
      />

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
          onDelete={() => handleDeletePitch(selectedPitch.id)}
          onUpdate={(data) => handleUpdatePitch(selectedPitch.id, data)}
        />
      )}
    </div>
  );
}