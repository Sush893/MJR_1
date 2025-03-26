import { supabase } from '../supabase';

export class ConnectionService {
  static async sendConnectionRequest(requesterId: string, receiverId: string) {
    try {
      const { data, error } = await supabase
        .from('connections')
        .insert({
          requester_id: requesterId,
          receiver_id: receiverId,
          status: 'pending'
        })
        .select()
        .single();

      if (error) throw error;
      return { connection: data, error: null };
    } catch (error) {
      console.error('Error sending connection request:', error);
      return { connection: null, error };
    }
  }

  static async updateConnectionStatus(
    requesterId: string,
    receiverId: string,
    status: 'accepted' | 'declined'
  ) {
    try {
      const { data, error } = await supabase
        .from('connections')
        .update({ status })
        .match({ requester_id: requesterId, receiver_id: receiverId })
        .select()
        .single();

      if (error) throw error;
      return { connection: data, error: null };
    } catch (error) {
      console.error('Error updating connection status:', error);
      return { connection: null, error };
    }
  }

  static async getConnections(userId: string) {
    try {
      const { data, error } = await supabase
        .from('connections')
        .select(`
          *,
          requester:requester_id (
            id,
            email,
            full_name,
            avatar_url
          ),
          receiver:receiver_id (
            id,
            email,
            full_name,
            avatar_url
          )
        `)
        .or(`requester_id.eq.${userId},receiver_id.eq.${userId}`)
        .order('created_at', { ascending: false });

      if (error) throw error;
      return { connections: data, error: null };
    } catch (error) {
      console.error('Error fetching connections:', error);
      return { connections: null, error };
    }
  }
}