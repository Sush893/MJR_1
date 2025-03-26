import React from 'react';
import { motion } from 'framer-motion';
import { Facebook, Twitter, Instagram, Linkedin } from 'lucide-react';

export function Footer() {
  return (
    <footer className="bg-white dark:bg-gray-800 border-t border-gray-200 dark:border-gray-700">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <div className="flex items-center gap-2 mb-4">
              <span className="text-2xl font-bold text-primary-500">$</span>
              <span className="text-xl font-bold text-gray-900 dark:text-white">
                Co-Founder Connect
              </span>
            </div>
            <p className="text-gray-600 dark:text-gray-300 mb-4">
              Building successful startups through meaningful connections.
            </p>
            <div className="flex gap-4">
              {[Facebook, Twitter, Instagram, Linkedin].map((Icon, index) => (
                <a
                  key={index}
                  href="#"
                  className="text-gray-400 hover:text-primary-500 transition-colors"
                >
                  <Icon className="w-5 h-5" />
                </a>
              ))}
            </div>
          </div>

          <div>
            <h3 className="font-semibold text-gray-900 dark:text-white mb-4">Product</h3>
            <ul className="space-y-2">
              {['Features', 'Pricing', 'Success Stories', 'Resources'].map((item) => (
                <li key={item}>
                  <a href="#" className="text-gray-600 dark:text-gray-300 hover:text-primary-500 dark:hover:text-primary-400">
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="font-semibold text-gray-900 dark:text-white mb-4">Company</h3>
            <ul className="space-y-2">
              {['About Us', 'Careers', 'Blog', 'Press'].map((item) => (
                <li key={item}>
                  <a href="#" className="text-gray-600 dark:text-gray-300 hover:text-primary-500 dark:hover:text-primary-400">
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="font-semibold text-gray-900 dark:text-white mb-4">Support</h3>
            <ul className="space-y-2">
              {['Help Center', 'Contact Us', 'Privacy Policy', 'Terms of Service'].map((item) => (
                <li key={item}>
                  <a href="#" className="text-gray-600 dark:text-gray-300 hover:text-primary-500 dark:hover:text-primary-400">
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-gray-200 dark:border-gray-700 text-center text-gray-600 dark:text-gray-300">
          © {new Date().getFullYear()} Co-Founder Connect. All rights reserved.
        </div>
      </div>
    </footer>
  );
}