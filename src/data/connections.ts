import { Connection } from '../types/connection';

export const connections: Connection[] = [
  {
    id: '1',
    name: 'Sarah Chen',
    role: 'Co-Founder',
    location: 'San Francisco, CA',
    avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=150',
    bio: 'Serial entrepreneur with 15+ years of experience in EdTech. Founded and sold two successful startups.',
    expertise: ['EdTech', 'AI/ML'],
    skills: ['Product Strategy', 'Team Building', 'Fundraising'],
    experience: [
      {
        company: 'EduTech Solutions',
        position: 'Founder & CEO',
        duration: '2018-Present'
      },
      {
        company: 'Google Education',
        position: 'Product Lead',
        duration: '2015-2018'
      }
    ],
    education: [
      {
        institution: 'Stanford University',
        degree: 'MBA',
        year: '2015'
      }
    ],
    sharedInterests: ['EdTech', 'AI Startups']
  },
  {
    id: '2',
    name: 'Michael Rodriguez',
    role: 'Co-Founder',
    location: 'New York, NY',
    avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&q=80&w=150',
    bio: 'Tech entrepreneur focused on FinTech innovation. Previously founded a successful payment processing startup.',
    expertise: ['FinTech', 'Blockchain'],
    skills: ['Financial Systems', 'Blockchain Development', 'Strategic Planning'],
    experience: [
      {
        company: 'FinPay Solutions',
        position: 'Co-founder & CTO',
        duration: '2019-Present'
      }
    ],
    education: [
      {
        institution: 'MIT',
        degree: 'MS Computer Science',
        year: '2018'
      }
    ],
    sharedInterests: ['FinTech', 'Blockchain']
  },
  {
    id: '3',
    name: 'David Park',
    role: 'Co-Founder',
    location: 'Seoul, South Korea',
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80&w=150',
    bio: 'AI researcher turned entrepreneur. Passionate about applying machine learning to solve real-world problems.',
    expertise: ['AI/ML', 'EdTech'],
    skills: ['Machine Learning', 'Product Development', 'Team Leadership'],
    experience: [
      {
        company: 'AI Education Labs',
        position: 'Co-founder & CTO',
        duration: '2020-Present'
      }
    ],
    education: [
      {
        institution: 'KAIST',
        degree: 'PhD in AI',
        year: '2019'
      }
    ],
    sharedInterests: ['AI Startups', 'EdTech']
  },
  {
    id: '4',
    name: 'Emma Thompson',
    role: 'Mentor',
    location: 'London, UK',
    avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&q=80&w=150',
    bio: 'Serial entrepreneur and startup advisor. Helped scale multiple EdTech companies from seed to Series B.',
    expertise: ['EdTech', 'E-commerce'],
    skills: ['Growth Strategy', 'Fundraising', 'Market Expansion'],
    experience: [
      {
        company: 'EdTech Ventures',
        position: 'CEO',
        duration: '2017-Present'
      }
    ],
    education: [
      {
        institution: 'Oxford University',
        degree: 'MBA',
        year: '2015'
      }
    ],
    sharedInterests: ['EdTech', 'E-commerce']
  },
  {
    id: '5',
    name: 'Alex Kumar',
    role: 'Investor',
    location: 'Singapore',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=150',
    bio: 'VC partner focusing on EdTech and FinTech investments in Southeast Asia.',
    expertise: ['FinTech', 'EdTech'],
    skills: ['Investment Strategy', 'Due Diligence', 'Board Management'],
    experience: [
      {
        company: 'SEA Ventures',
        position: 'Partner',
        duration: '2019-Present'
      }
    ],
    education: [
      {
        institution: 'INSEAD',
        degree: 'MBA',
        year: '2016'
      }
    ],
    sharedInterests: ['EdTech', 'FinTech']
  },
  {
    id: '6',
    name: 'Lisa Chen',
    role: 'Co-Founder',
    location: 'Toronto, Canada',
    avatar: 'https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?auto=format&fit=crop&q=80&w=150',
    bio: 'EdTech innovator with a focus on personalized learning and AI integration.',
    expertise: ['EdTech', 'AI/ML'],
    skills: ['Educational Design', 'AI Implementation', 'Product Strategy'],
    experience: [
      {
        company: 'Learn AI',
        position: 'Co-founder & CEO',
        duration: '2021-Present'
      }
    ],
    education: [
      {
        institution: 'University of Toronto',
        degree: 'MSc in Computer Science',
        year: '2020'
      }
    ],
    sharedInterests: ['EdTech', 'AI Startups']
  }
];