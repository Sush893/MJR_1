import { LocalStorage } from '../storage/localStorage';
import { Connection } from '../../types/connection';

export const ConnectionAPI = {
  getAllConnections: () => {
    const connections = LocalStorage.getConnections();
    return Promise.resolve({ data: connections });
  },
  
  sendConnectionRequest: (receiverId: string) => {
    const user = LocalStorage.getUser();
    if (!user) {
      return Promise.reject(new Error('User not authenticated'));
    }
    
    const connection = {
      id: Date.now().toString(),
      requesterId: user.id,
      receiverId,
      status: 'pending',
      createdAt: new Date().toISOString()
    };
    
    LocalStorage.addConnection(connection);
    return Promise.resolve({ data: connection });
  },
  
  updateConnectionStatus: (connectionId: string, status: 'accepted' | 'declined') => {
    LocalStorage.updateConnectionStatus(connectionId, status);
    return Promise.resolve({ data: { success: true } });
  }
};