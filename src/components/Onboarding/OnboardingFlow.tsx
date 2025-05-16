import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { RoleSelection } from './steps/RoleSelection';
import { PersonalInfo } from './steps/PersonalInfo';
import { Interests } from './steps/Interests';
import { Projects } from './steps/Projects';
import { Communities } from './steps/Communities';
import { useAuth } from '../../contexts/AuthContext';
import { LocalStorage } from '../../lib/storage/localStorage';
import { ProfileAPI } from '../../lib/api/profile.ts'; // Make sure this import path is correct
import { DebugPanel } from '../common/DebugPanel';

export interface OnboardingData {
  role: string;
  roleDetails: Record<string, any>;
  firstName: string;
  lastName: string;
  interests: string[];
  activeProjects: any[];
  communities: string[];
}

const steps = [
  {
    title: 'Choose Your Role',
    component: RoleSelection,
  },
  {
    title: 'Personal Information',
    component: PersonalInfo,
  },
  {
    title: 'Your Interests',
    component: Interests,
  },
  {
    title: 'Active Projects',
    component: Projects,
  },
  {
    title: 'Join Communities',
    component: Communities,
  },
];

export function OnboardingFlow() {
  const [step, setStep] = useState(0);
  const [data, setData] = useState<OnboardingData>({
    role: '',
    roleDetails: {},
    firstName: '',
    lastName: '',
    interests: [],
    activeProjects: [],
    communities: []
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { user, completeOnboarding } = useAuth();

  const handleNext = async (stepData: Partial<OnboardingData>) => {
    const updatedData = { ...data, ...stepData };
    setData(updatedData);

    if (step === steps.length - 1 && user) {
      setIsSubmitting(true);
      setError(null);
      
      try {
        console.log('📝 [Onboarding] Submitting final onboarding data');
        const profileData = {
          userId: user.id, // Make sure this matches your user object structure
          first_name: updatedData.firstName,
          last_name: updatedData.lastName,
          role: updatedData.role,
          role_details: updatedData.roleDetails,
          interests: updatedData.interests,
          active_projects: updatedData.activeProjects,
          communities: updatedData.communities,
          onboarding_completed: true
        };

        // First try to update existing profile
        try {
          console.log('📝 [Onboarding] Attempting to update existing profile');
          await ProfileAPI.updateProfile(profileData);
          console.log('✅ [Onboarding] Profile updated successfully');
        } catch (error) {
          // Type assertion for the error
          const updateError = error as { response?: { status?: number } };
          
          // If profile doesn't exist, create it
          if (updateError.response?.status === 404) {
            console.log('📝 [Onboarding] No existing profile found, creating new profile');
            await ProfileAPI.createProfile(profileData);
            console.log('✅ [Onboarding] Profile created successfully');
          } else {
            console.error('❌ [Onboarding] Profile update error:', updateError);
            throw updateError;
          }
        }

        // Update local storage and auth context
        console.log('📝 [Onboarding] Updating local profile data');
        const currentProfile = LocalStorage.getProfile() || {};
        LocalStorage.setProfile({
          ...currentProfile,
          ...profileData,
          onboarding_completed: true
        });
        
        // Use AuthContext method to update state
        console.log('📝 [Onboarding] Marking onboarding as completed in AuthContext');
        completeOnboarding();
        console.log('✅ [Onboarding] Onboarding completed successfully');

        // Redirect or reload - wait a moment to make sure storage updates are processed
        setTimeout(() => {
          window.location.href = '/';
        }, 500);
      } catch (err) {
        console.error('❌ [Onboarding] Profile save error:', err);
        setError('Failed to save profile. Please try again.');
      } finally {
        setIsSubmitting(false);
      }
    } else {
      setStep(step + 1);
    }
  };

  const CurrentStep = steps[step].component;

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex items-center justify-center p-4">
      <div className="w-full max-w-2xl">
        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl overflow-hidden">
          {/* Progress Bar */}
          <div className="w-full h-2 bg-gray-100 dark:bg-gray-700">
            <div 
              className="h-full bg-primary-500 transition-all duration-300"
              style={{ width: `${((step + 1) / steps.length) * 100}%` }}
            />
          </div>

          <div className="p-8">
            {error && (
              <div className="mb-4 p-3 bg-red-100 text-red-700 rounded">
                {error}
              </div>
            )}

            <AnimatePresence mode="wait">
              <motion.div
                key={step}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.3 }}
              >
                <h2 className="text-2xl font-bold mb-6 dark:text-white">
                  {steps[step].title}
                </h2>

                <CurrentStep
                  data={data}
                  onNext={handleNext}
                />
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>
      
      {/* Debug panel for development - only shown in development mode */}
      {process.env.NODE_ENV === 'development' && <DebugPanel />}
    </div>
  );
}