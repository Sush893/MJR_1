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

interface OnboardingData {
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
  const { user } = useAuth();

  const handleNext = async (stepData: Partial<OnboardingData>) => {
    const updatedData = { ...data, ...stepData };
    setData(updatedData);

    if (step === steps.length - 1 && user) {
      setIsSubmitting(true);
      setError(null);
      
      try {
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
          await ProfileAPI.updateProfile(profileData);
        } catch (updateError) {
          // If profile doesn't exist, create it
          if (updateError.response?.status === 404) {
            await ProfileAPI.createProfile(profileData);
          } else {
            throw updateError;
          }
        }

        // Update local storage
        const currentProfile = LocalStorage.getProfile() || {};
        LocalStorage.setProfile({
          ...currentProfile,
          ...profileData,
          onboarding_completed: true
        });

        // Redirect or reload
        window.location.reload();
      } catch (err) {
        console.error('Profile save error:', err);
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
                  isSubmitting={isSubmitting}
                />
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>
    </div>
  );
}