import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Bell, ThumbsUp, TrendingUp, Users, MessageSquare } from 'lucide-react';

interface Notification {
  id: string;
  icon: typeof Bell;
  color: string;
  message: string;
  time: string;
}

const notifications: Notification[] = [
  {
    id: '1',
    icon: ThumbsUp,
    color: 'text-blue-500',
    message: 'Sarah Chen liked your latest blog post',
    time: '2 minutes ago'
  },
  {
    id: '2',
    icon: TrendingUp,
    color: 'text-green-500',
    message: 'Your pitch reached 100 views! 🎉',
    time: '1 hour ago'
  },
  {
    id: '3',
    icon: Users,
    color: 'text-purple-500',
    message: 'New connection request from Alex Kumar',
    time: '3 hours ago'
  },
  {
    id: '4',
    icon: MessageSquare,
    color: 'text-yellow-500',
    message: 'Michael commented on your project',
    time: '5 hours ago'
  }
];

interface NotificationsDropdownProps {
  isOpen: boolean;
  onClose: () => void;
}

export function NotificationsDropdown({ isOpen, onClose }: NotificationsDropdownProps) {
  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <div 
            className="fixed inset-0 z-40"
            onClick={onClose}
          />
          <motion.div
            initial={{ opacity: 0, y: -20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -20, scale: 0.95 }}
            transition={{ duration: 0.2 }}
            className="absolute top-16 right-0 w-96 bg-white dark:bg-gray-800 rounded-xl shadow-lg z-50 overflow-hidden"
          >
            <div className="p-4 border-b border-gray-100 dark:border-gray-700">
              <h3 className="text-lg font-semibold dark:text-white">Notifications</h3>
            </div>
            
            <div className="max-h-[400px] overflow-y-auto">
              {notifications.map((notification) => (
                <motion.div
                  key={notification.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.2 }}
                  className="p-4 hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors cursor-pointer border-b border-gray-100 dark:border-gray-700 last:border-0"
                >
                  <div className="flex items-start gap-3">
                    <div className={`p-2 rounded-full bg-gray-100 dark:bg-gray-700 ${notification.color}`}>
                      <notification.icon className="w-4 h-4" />
                    </div>
                    <div>
                      <p className="text-gray-800 dark:text-gray-200">{notification.message}</p>
                      <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">{notification.time}</p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
            
            <div className="p-4 border-t border-gray-100 dark:border-gray-700 text-center">
              <button className="text-primary-500 dark:text-primary-400 hover:text-primary-600 dark:hover:text-primary-300 text-sm font-medium">
                View All Notifications
              </button>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}