import { Event } from '../types/event';

export const events: Event[] = [
  // Pitch Events
  {
    id: '1',
    title: 'EdTech Innovation Pitch Night',
    type: 'pitch',
    date: '2025-01-15',
    startTime: '18:00',
    endTime: '20:00',
    description: 'Join us for an evening of innovative EdTech pitches from emerging startups. Network with founders, investors, and education professionals while discovering the future of learning technology. Five selected startups will present their solutions addressing challenges in modern education.',
    location: {
      type: 'physical',
      address: '123 Startup Ave, San Francisco, CA 94105',
      coordinates: {
        lat: 37.7749,
        lng: -122.4194
      }
    },
    attendees: [
      {
        id: '1',
        name: 'Sarah Chen',
        role: 'EdTech Founder',
        avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=150'
      },
      {
        id: '2',
        name: 'Michael Rodriguez',
        role: 'Angel Investor',
        avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&q=80&w=150'
      }
    ]
  },
  {
    id: '2',
    title: 'FinTech Solutions Showcase',
    type: 'pitch',
    date: '2025-02-12',
    startTime: '17:30',
    endTime: '19:30',
    description: 'An exclusive evening featuring innovative FinTech solutions. Selected startups will present their cutting-edge financial technology solutions to a panel of industry experts and potential investors.',
    location: {
      type: 'physical',
      address: '456 Finance District, New York, NY 10005',
      coordinates: {
        lat: 40.7128,
        lng: -74.0060
      }
    },
    attendees: [
      {
        id: '3',
        name: 'Emma Thompson',
        role: 'VC Partner',
        avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&q=80&w=150'
      },
      {
        id: '4',
        name: 'David Park',
        role: 'Financial Advisor',
        avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80&w=150'
      }
    ]
  },

  // Meeting Events
  {
    id: '3',
    title: 'Co-Founder Strategy Meeting',
    type: 'meeting',
    date: '2025-01-22',
    startTime: '14:00',
    endTime: '15:30',
    description: 'Virtual meeting to discuss potential collaboration opportunities and align on business strategy for Q1 2025. We\'ll be focusing on market expansion plans and technical roadmap.',
    location: {
      type: 'online',
      url: 'https://meet.google.com/abc-defg-hij'
    },
    attendees: [
      {
        id: '5',
        name: 'Alex Kumar',
        role: 'Tech Co-Founder',
        avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=150'
      },
      {
        id: '6',
        name: 'Lisa Chen',
        role: 'Business Development',
        avatar: 'https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?auto=format&fit=crop&q=80&w=150'
      }
    ]
  },
  {
    id: '4',
    title: 'Product Development Sync',
    type: 'meeting',
    date: '2025-02-05',
    startTime: '10:00',
    endTime: '11:30',
    description: 'Bi-weekly sync meeting to discuss product development progress, technical challenges, and upcoming milestones. Open to potential technical co-founders and advisors.',
    location: {
      type: 'online',
      url: 'https://zoom.us/j/123456789'
    },
    attendees: [
      {
        id: '7',
        name: 'James Wilson',
        role: 'Product Manager',
        avatar: 'https://images.unsplash.com/photo-1519345182560-3f2917c472ef?auto=format&fit=crop&q=80&w=150'
      },
      {
        id: '8',
        name: 'Maria Garcia',
        role: 'Tech Lead',
        avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=150'
      }
    ]
  },

  // Social Events
  {
    id: '5',
    title: 'Startup Networking Mixer',
    type: 'social',
    date: '2025-01-30',
    startTime: '19:00',
    endTime: '22:00',
    description: 'Monthly networking event for startup founders, investors, and tech professionals. Enjoy refreshments while building meaningful connections in the startup ecosystem. This month\'s theme focuses on sustainable technology and green initiatives.',
    location: {
      type: 'physical',
      address: '789 Innovation Blvd, San Francisco, CA 94107',
      coordinates: {
        lat: 37.7833,
        lng: -122.4167
      }
    },
    attendees: [
      {
        id: '9',
        name: 'Ryan Chang',
        role: 'Startup Founder',
        avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&q=80&w=150'
      },
      {
        id: '10',
        name: 'Sophie Anderson',
        role: 'Angel Investor',
        avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&q=80&w=150'
      }
    ]
  },
  {
    id: '6',
    title: 'Tech Founders Breakfast Club',
    type: 'social',
    date: '2025-02-20',
    startTime: '08:30',
    endTime: '10:30',
    description: 'Start your day with fellow tech founders over breakfast and meaningful conversations. This month\'s discussion topic: "Navigating the AI Revolution in Startups". Continental breakfast will be served.',
    location: {
      type: 'physical',
      address: '321 Tech Row, Austin, TX 78701',
      coordinates: {
        lat: 30.2672,
        lng: -97.7431
      }
    },
    attendees: [
      {
        id: '11',
        name: 'Tom Johnson',
        role: 'Serial Entrepreneur',
        avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80&w=150'
      },
      {
        id: '12',
        name: 'Nina Patel',
        role: 'Tech Founder',
        avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=150'
      }
    ]
  }
];