import { LocalStorage } from '../storage/localStorage';
import { Event } from '../../types/event';

export const EventAPI = {
  getAllEvents: () => {
    const events = LocalStorage.getEvents();
    return Promise.resolve({ data: events });
  },
  
  createEvent: (data: Omit<Event, 'id' | 'attendees'>) => {
    const event: Event = {
      id: Date.now().toString(),
      ...data,
      attendees: []
    };
    
    LocalStorage.addEvent(event);
    return Promise.resolve({ data: event });
  },
  
  attendEvent: (eventId: string, userId: string, status: 'attending' | 'maybe' | 'declined') => {
    const events = LocalStorage.getEvents();
    const updatedEvents = events.map(event => {
      if (event.id === eventId) {
        const existingAttendeeIndex = event.attendees.findIndex(a => a.id === userId);
        if (existingAttendeeIndex >= 0) {
          event.attendees[existingAttendeeIndex].status = status;
        }
      }
      return event;
    });
    
    LocalStorage.setEvents(updatedEvents);
    return Promise.resolve({ data: { success: true } });
  }
};