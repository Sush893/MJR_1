import { useEffect } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { AnalyticsService } from '../lib/analytics/AnalyticsService';

export function useAnalytics() {
  const { user } = useAuth();

  useEffect(() => {
    if (user) {
      // Track session start
      AnalyticsService.trackEvent(user.id, 'session_start');

      // Track session end on unmount
      return () => {
        AnalyticsService.trackEvent(user.id, 'session_end');
      };
    }
  }, [user]);

  const trackEvent = async (eventType: Parameters<typeof AnalyticsService.trackEvent>[1], eventData?: any) => {
    if (user) {
      return AnalyticsService.trackEvent(user.id, eventType, eventData);
    }
  };

  return { trackEvent };
}