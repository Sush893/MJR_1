/**
 * Main Application Component
 * 
 * Serves as the root component of the application, handling:
 * - Authentication state management through AuthProvider
 * - Theme management through ThemeProvider
 * - Conditional rendering based on auth state
 * 
 * Flow:
 * 1. Shows loading spinner while initializing
 * 2. Displays landing page for unauthenticated users
 * 3. Shows onboarding flow for new users
 * 4. Renders dashboard for authenticated & onboarded users
 */

import React from 'react';
import { LandingPage } from './components/LandingPage/LandingPage';
import { Dashboard } from './components/Dashboard';
import { OnboardingFlow } from './components/Onboarding/OnboardingFlow';
import { ThemeProvider } from './contexts/ThemeContext';
import { AuthProvider, useAuth } from './contexts/AuthContext';
import { LoadingSpinner } from './components/common/LoadingSpinner';

function AppContent() {
  const { user, profile, loading } = useAuth();

  // Show loading spinner while checking auth state
  if (loading) {
    return <LoadingSpinner />;
  }

  // Show landing page for unauthenticated users
  if (!user) {
    return <LandingPage />;
  }

  // Show onboarding flow for new users
  if (!profile?.onboarding_completed) {
    return <OnboardingFlow />;
  }

  // Show main dashboard for authenticated & onboarded users
  return <Dashboard />;
}

export default function App() {
  return (
    <AuthProvider>
      <ThemeProvider>
        <AppContent />
      </ThemeProvider>
    </AuthProvider>
  );
}