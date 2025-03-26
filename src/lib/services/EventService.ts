import { supabase } from '../supabase';
import { Event } from '../../types/event';

export class EventService {
  static async createEvent(event: Omit<Event, 'id' | 'attendees'>) {
    try {
      const { data, error } = await supabase
        .from('events')
        .insert({
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
        })
        .select()
        .single();

      if (error) throw error;
      return { event: data, error: null };
    } catch (error) {
      console.error('Error creating event:', error);
      return { event: null, error };
    }
  }

  static async getEvents(date?: string) {
    try {
      let query = supabase
        .from('events')
        .select(`
          *,
          creator:creator_id (
            id,
            email,
            full_name,
            avatar_url
          ),
          attendees:event_attendees(
            user:user_id (
              id,
              email,
              full_name,
              avatar_url
            ),
            status
          )
        `)
        .order('date', { ascending: true });

      if (date) {
        query = query.eq('date', date);
      }

      const { data, error } = await query;

      if (error) throw error;
      return { events: data, error: null };
    } catch (error) {
      console.error('Error fetching events:', error);
      return { events: null, error };
    }
  }

  static async attendEvent(eventId: string, userId: string, status: 'attending' | 'maybe' | 'declined') {
    try {
      const { data, error } = await supabase
        .from('event_attendees')
        .upsert({
          event_id: eventId,
          user_id: userId,
          status
        })
        .select()
        .single();

      if (error) throw error;
      return { attendance: data, error: null };
    } catch (error) {
      console.error('Error updating event attendance:', error);
      return { attendance: null, error };
    }
  }
}