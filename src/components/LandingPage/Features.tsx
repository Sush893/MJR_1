import React from 'react';
import { motion } from 'framer-motion';
import { Users, Rocket, Target, Zap, MessageSquare, BarChart2 } from 'lucide-react';

const features = [
  {
    icon: Users,
    title: 'Smart Matching',
    description: 'Find co-founders who complement your skills and share your vision using our AI-powered matching system.'
  },
  {
    icon: Rocket,
    title: 'Launch Together',
    description: 'Take your idea from concept to launch with collaborative tools and expert guidance.'
  },
  {
    icon: Target,
    title: 'Goal Tracking',
    description: 'Set milestones, track progress, and celebrate achievements with your team.'
  },
  {
    icon: MessageSquare,
    title: 'Community Support',
    description: 'Connect with mentors and peers who can provide valuable insights and feedback.'
  },
  {
    icon: BarChart2,
    title: 'Growth Analytics',
    description: 'Monitor your project\'s performance and make data-driven decisions.'
  },
  {
    icon: Zap,
    title: 'Quick Start',
    description: 'Get your project off the ground quickly with ready-to-use templates and resources.'
  }
];

export function Features() {
  return (
    <div className="py-24 bg-white dark:bg-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-4xl font-bold text-gray-900 dark:text-white mb-4"
          >
            Everything You Need to Succeed
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-xl text-gray-600 dark:text-gray-300"
          >
            Powerful tools and features to help you build your dream team and launch your startup
          </motion.p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="bg-gray-50 dark:bg-gray-700 rounded-xl p-8 hover:shadow-lg transition-shadow"
            >
              <feature.icon className="w-12 h-12 text-primary-500 mb-6" />
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
                {feature.title}
              </h3>
              <p className="text-gray-600 dark:text-gray-300">
                {feature.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}