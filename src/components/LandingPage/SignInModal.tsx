import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Mail, Lock, AlertCircle, User } from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';
import axios from 'axios';

interface SignInModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSignIn: () => void;
  message?: string;
}

export function SignInModal({ isOpen, onClose, onSignIn, message }: SignInModalProps) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [fullName, setFullName] = useState('');
  const [isSignUp, setIsSignUp] = useState(false); // Changed from string to boolean
  const [localError, setLocalError] = useState('');


  // const handleSubmit = async (e: React.FormEvent) => {
  //   e.preventDefault();
  //   setLocalError('');
    
  //   try {
  //     if (isSignUp) {
  //       const response = await axios.post("http://localhost:3000/api/signup", {
  //         email, 
  //         password, 
  //         fullName
  //       });
        
  //       console.log('SignUp successful', response.data);
        
  //       // Store user data in localStorage on the client side
  //       if (response.data.token) {
  //         localStorage.setItem('token', response.data.token);
  //         console.log('Token saved to localStorage:', response.data.token);
          
  //         // Check if user object exists in response
  //         if (response.data.user) {
  //           localStorage.setItem('user', JSON.stringify(response.data.user));
  //           console.log('User saved to localStorage:', response.data.user);
  //         } else {
  //           // If backend doesn't send user object directly, create minimal user object
  //           const userData = { email, fullName };
  //           localStorage.setItem('user', JSON.stringify(userData));
  //           console.log('Created minimal user data in localStorage:', userData);
  //         }
  //       } else {
  //         console.warn('No token received from signup endpoint');
  //       }
        
  //       onClose();
  //       onSignIn();
  //     } else {
  //       const response = await axios.post("http://localhost:3000/api/signin", {
  //         email, 
  //         password
  //       });
        
  //       console.log('Login Successful', response.data);
        
  //       // Store user data in localStorage on the client side
  //       if (response.data.token) {
  //         localStorage.setItem('token', response.data.token);
  //         console.log('Token saved to localStorage:', response.data.token);
          
  //         if (response.data.user) {
  //           localStorage.setItem('user', JSON.stringify(response.data.user));
  //           console.log('User saved to localStorage:', response.data.user);
  //         }
  //       } else {
  //         console.warn('No token received from signin endpoint');
  //       }
        
  //       onClose();
  //       onSignIn();
  //     }
  //   } catch (err) {
  //     console.error('Authentication error:', err);
  //     if (axios.isAxiosError(err) && err.response) {
  //       setLocalError(err.response.data.error || 'Authentication failed');
  //     } else {
  //       setLocalError('Network error. Please try again later.');
  //     }
  //   }
  // };

  // const toggleSignUp = () => {
  //   setIsSignUp(!isSignUp);
  //   setEmail('');
  //   setPassword('');
  //   setFullName('');
  //   setLocalError('');
  // };

  const { signIn, signUp, error, loading } = useAuth();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLocalError('');
    
    try {
      if (isSignUp) {
        // Use the signUp method from your AuthContext
        await signUp(email, password, fullName);
        console.log('SignUp successful');
      } else {
        // Use the signIn method from your AuthContext
        await signIn(email, password);
        console.log('Login Successful');
      }
      
      // If we get here without errors being set in the context, 
      // the operation was successful
      if (!error) {
        onClose();
        onSignIn();
      }
    } catch (err) {
      console.error('Authentication error:', err);
      setLocalError(err instanceof Error ? err.message : 'Authentication failed');
    }
  };

  const toggleSignUp = () => {
    setIsSignUp(!isSignUp);
    setEmail('');
    setPassword('');
    setFullName('');
    setLocalError('');
  };
  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 bg-black/50 backdrop-blur-sm"
            onClick={onClose}
          />
          
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            className="relative bg-white dark:bg-gray-800 rounded-2xl shadow-xl w-full max-w-md p-8 m-4"
          >
            <button
              onClick={onClose}
              className="absolute top-4 right-4 p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-full transition-colors"
            >
              <X className="w-5 h-5 text-gray-500 dark:text-gray-400" />
            </button>

            <div className="text-center mb-8">
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
                {isSignUp ? 'Create Account' : 'Welcome Back'}
              </h2>
              <p className="text-gray-600 dark:text-gray-300">
                {message || (isSignUp ? 'Join our community of entrepreneurs' : 'Sign in to continue building your startup')}
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              {(error || localError) && (
                <div className="flex items-center gap-2 text-sm text-red-500 bg-red-50 dark:bg-red-900/20 p-3 rounded-lg">
                  <AlertCircle className="w-4 h-4" />
                  {error || localError}
                </div>
              )}

              {isSignUp && (
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Full Name
                  </label>
                  <div className="relative">
                    <User className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                    <input
                      type="text"
                      value={fullName}
                      onChange={(e) => setFullName(e.target.value)}
                      className="w-full pl-10 pr-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-primary-500 dark:focus:ring-primary-400 transition-all"
                      placeholder="Enter your full name"
                      required={isSignUp}
                    />
                  </div>
                </div>
              )}

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Email
                </label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full pl-10 pr-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-primary-500 dark:focus:ring-primary-400 transition-all"
                    placeholder="Enter your email"
                    required
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Password
                </label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full pl-10 pr-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-primary-500 dark:focus:ring-primary-400 transition-all"
                    placeholder="Enter your password"
                    required
                  />
                </div>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full py-3 bg-primary-500 text-white rounded-lg hover:bg-primary-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {loading ? 'Loading...' : (isSignUp ? 'Sign Up' : 'Sign In')}
              </button>

              <div className="text-center">
                <p className="text-sm text-gray-600 dark:text-gray-300">
                  {isSignUp ? 'Already have an account?' : "Don't have an account?"}{' '}
                  <button
                    type="button"
                    onClick={toggleSignUp}
                    className="text-primary-500 hover:text-primary-600 dark:hover:text-primary-400"
                  >
                    {isSignUp ? 'Sign in' : 'Sign up'}
                  </button>
                </p>
              </div>
            </form>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}