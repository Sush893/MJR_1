import { supabase } from '../supabase';

export type EventType = 
  | 'profile_view'
  | 'connection_request'
  | 'post_interaction'
  | 'project_interaction'
  | 'session_start'
  | 'session_end'
  | 'feature_usage';

export class AnalyticsService {
  static async trackEvent(userId: string, eventType: EventType, eventData: any = {}) {
    try {
      const { error } = await supabase
        .from('analytics_events')
        .insert({
          user_id: userId,
          event_type: eventType,
          event_data: eventData
        });

      if (error) throw error;
      return { error: null };
    } catch (error) {
      console.error('Error tracking event:', error);
      return { error };
    }
  }

  static async getEvents(userId: string, eventType?: EventType) {
    try {
      let query = supabase
        .from('analytics_events')
        .select('*')
        .eq('user_id', userId)
        .order('created_at', { ascending: false });

      if (eventType) {
        query = query.eq('event_type', eventType);
      }

      const { data, error } = await query;
      if (error) throw error;
      return { events: data, error: null };
    } catch (error) {
      console.error('Error fetching events:', error);
      return { events: null, error };
    }
  }
}