export interface Connection {
  id: string;
  name: string;
  role: string;
  location: string;
  avatar: string;
  bio: string;
  expertise: string[];
  skills: string[];
  experience: {
    company: string;
    position: string;
    duration: string;
  }[];
  education: {
    institution: string;
    degree: string;
    year: string;
  }[];
  sharedInterests: string[];
}

export type ConnectionRole = 'Co-Founder' | 'Mentor' | 'Investor';
export type ExpertiseField = 'EdTech' | 'FinTech' | 'HealthTech' | 'AI/ML' | 'Blockchain' | 'E-commerce';