import { Event } from '../../types/event';
import api from '../api/client';

interface CreateEventData {
  creator_id: string;
  title: string;
  description?: string;
  type?: string;
  date: string;
  startTime?: string;
  endTime?: string;
  location: {
    type?: string;
    url?: string;
    address?: string;
    coordinates?: {
      lat: number;
      lng: number;
    };
  };
}

export class EventService {
  static async createEvent(event: CreateEventData) {
    try {
      const response = await api.post('/createEvent', {
        creator_id: event.creator_id,
        title: event.title,
        description: event.description,
        event_type: event.type,
        date: event.date,
        start_time: event.startTime,
        end_time: event.endTime,
        location_type: event.location.type,
        location_url: event.location.url,
        location_address: event.location.address,
        location_coordinates: event.location.coordinates
          ? `(${event.location.coordinates.lat},${event.location.coordinates.lng})`
          : null
      });

      return { event: response.data.event, error: null };
    } catch (error) {
      console.error('Error creating event:', error);
      return { event: null, error };
    }
  }

  static async getEvents(userId: string, date?: string) {
    try {
      const url = date
        ? `/events/${userId}?date=${date}`
        : `/events/${userId}`;

      const response = await api.get(url);
      return { events: response.data.events, error: null };
    } catch (error) {
      console.error('Error fetching events:', error);
      return { events: null, error };
    }
  }

  static async updateEvent(eventId: string, userId: string, updates: Partial<CreateEventData>) {
    try {
      const response = await api.put(`/events/${userId}/${eventId}`, {
        title: updates.title,
        description: updates.description,
        event_type: updates.type,
        date: updates.date,
        start_time: updates.startTime,
        end_time: updates.endTime,
        location_type: updates.location?.type,
        location_url: updates.location?.url,
        location_address: updates.location?.address,
        location_coordinates: updates.location?.coordinates
          ? `(${updates.location.coordinates.lat},${updates.location.coordinates.lng})`
          : undefined
      });

      return { event: response.data.event, error: null };
    } catch (error) {
      console.error('Error updating event:', error);
      return { event: null, error };
    }
  }

  static async deleteEvent(eventId: string, userId: string) {
    try {
      await api.delete(`/events/${userId}/${eventId}`);
      return { success: true, error: null };
    } catch (error) {
      console.error('Error deleting event:', error);
      return { success: false, error };
    }
  }

  static async attendEvent(eventId: string, userId: string, status: 'attending' | 'maybe' | 'declined') {
    try {
      const response = await api.post(`/events/${eventId}/attend`, {
        user_id: userId,
        status
      });

      return { attendance: response.data.attendance, error: null };
    } catch (error) {
      console.error('Error updating event attendance:', error);
      return { attendance: null, error };
    }
  }
}