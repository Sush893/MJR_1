import React from 'react';
import { Presentation, Users, Calendar } from 'lucide-react';
import { EventType } from '../../types/event';

interface EventTypeIconProps {
  type: EventType;
  className?: string;
}

export function EventTypeIcon({ type, className = "w-5 h-5" }: EventTypeIconProps) {
  switch (type) {
    case 'pitch':
      return <Presentation className={className} />;
    case 'meeting':
      return <Calendar className={className} />;
    case 'social':
      return <Users className={className} />;
  }
}