import { LocalStorage } from '../storage/localStorage';

export const AnalyticsAPI = {
  trackEvent: (eventType: string, eventData: any = {}) => {
    const event = {
      type: eventType,
      data: eventData,
      timestamp: new Date().toISOString()
    };
    
    LocalStorage.addAnalyticsEvent(event);
    return Promise.resolve({ data: event });
  },
  
  getEvents: (startDate?: Date, endDate?: Date) => {
    let events = LocalStorage.getAnalytics();
    
    if (startDate) {
      events = events.filter(event => new Date(event.timestamp) >= startDate);
    }
    
    if (endDate) {
      events = events.filter(event => new Date(event.timestamp) <= endDate);
    }
    
    return Promise.resolve({ data: events });
  }
};