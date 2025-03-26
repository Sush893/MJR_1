export type EventType = 'pitch' | 'meeting' | 'social';

export interface Event {
  id: string;
  title: string;
  type: EventType;
  date: string;
  startTime: string;
  endTime: string;
  description: string;
  location: {
    type: 'online' | 'physical';
    url?: string;
    address?: string;
    coordinates?: {
      lat: number;
      lng: number;
    };
  };
  attendees: {
    id: string;
    name: string;
    role: string;
    avatar: string;
  }[];
}