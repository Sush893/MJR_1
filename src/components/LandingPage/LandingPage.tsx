import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { SignInModal } from './SignInModal';
import { Hero } from './Hero';
import { Features } from './Features';
import { Testimonials } from './Testimonials';
import { Navbar } from './Navbar';
import { Footer } from './Footer';
import { DebugPanel } from '../common/DebugPanel';

export function LandingPage() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800">
      <Navbar onSignInClick={() => setIsModalOpen(true)} />
      
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        <Hero onGetStarted={() => setIsModalOpen(true)} />
        <Features />
        <Testimonials />
        <Footer />
      </motion.div>

      <SignInModal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)}
        onSignIn={() => {}}
      />
      
      {/* Debug panel for development - only shown in development mode */}
      {process.env.NODE_ENV === 'development' && <DebugPanel />}
    </div>
  );
}