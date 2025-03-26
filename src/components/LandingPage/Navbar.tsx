import React from 'react';
import { motion } from 'framer-motion';
import { ThemeToggle } from '../ThemeToggle';

interface NavbarProps {
  onSignInClick: () => void;
}

export function Navbar({ onSignInClick }: NavbarProps) {
  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5 }}
      className="fixed top-0 left-0 right-0 bg-white/80 dark:bg-gray-900/80 backdrop-blur-lg z-50 border-b border-gray-200 dark:border-gray-700"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center gap-2">
            <span className="text-2xl font-bold text-primary-500">$</span>
            <span className="text-xl font-bold text-gray-900 dark:text-white">
              Co-Founder Connect
            </span>
          </div>

          <div className="hidden md:flex items-center gap-8">
            <a href="#features" className="text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white transition-colors">
              Features
            </a>
            <a href="#testimonials" className="text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white transition-colors">
              Testimonials
            </a>
            <a href="#pricing" className="text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white transition-colors">
              Pricing
            </a>
          </div>

          <div className="flex items-center gap-4">
            <ThemeToggle />
            <button
              onClick={onSignInClick}
              className="px-6 py-2 bg-primary-500 text-white rounded-full hover:bg-primary-600 transition-colors"
            >
              Sign In
            </button>
          </div>
        </div>
      </div>
    </motion.nav>
  );
}