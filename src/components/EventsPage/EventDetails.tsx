import React from 'react';
import { MapPin, Clock, Users, ExternalLink } from 'lucide-react';
import { Event } from '../../types/event';
import { EventTypeIcon } from './EventTypeIcon';

interface EventDetailsProps {
  event: Event;
}

export function EventDetails({ event }: EventDetailsProps) {
  const getEventTypeColor = (type: Event['type']) => {
    switch (type) {
      case 'pitch':
        return 'bg-blue-900/30 text-blue-200';
      case 'meeting':
        return 'bg-purple-900/30 text-purple-200';
      case 'social':
        return 'bg-primary-900/30 text-primary-200';
    }
  };

  const handleActionClick = () => {
    if (event.location.type === 'online') {
      window.open(event.location.url, '_blank');
    } else {
      const mapsUrl = `https://www.google.com/maps/search/?api=1&query=${event.location.coordinates?.lat},${event.location.coordinates?.lng}`;
      window.open(mapsUrl, '_blank');
    }
  };

  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-6">
      <div className="mb-6">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-2xl font-bold dark:text-gray-200">{event.title}</h2>
          <span className={`px-3 py-1 rounded-full text-sm font-medium flex items-center gap-2 ${getEventTypeColor(event.type)}`}>
            <EventTypeIcon type={event.type} className="w-4 h-4" />
            {event.type.charAt(0).toUpperCase() + event.type.slice(1)}
          </span>
        </div>

        <div className="space-y-3 text-gray-600 dark:text-gray-300">
          <div className="flex items-center gap-2">
            <Clock className="w-5 h-5" />
            <span>{event.date} • {event.startTime} - {event.endTime}</span>
          </div>
          <div className="flex items-center gap-2">
            <MapPin className="w-5 h-5" />
            <span>
              {event.location.type === 'online' ? 'Virtual Event' : event.location.address}
            </span>
          </div>
        </div>
      </div>

      <div className="mb-6">
        <h3 className="text-lg font-semibold mb-3 flex items-center gap-2 dark:text-gray-200">
          <Users className="w-5 h-5" />
          Attendees ({event.attendees.length})
        </h3>
        <div className="flex flex-wrap gap-4">
          {event.attendees.map(attendee => (
            <div key={attendee.id} className="flex items-center gap-3">
              <img
                src={attendee.avatar}
                alt={attendee.name}
                className="w-10 h-10 rounded-full object-cover"
              />
              <div>
                <p className="font-medium dark:text-gray-200">{attendee.name}</p>
                <p className="text-sm text-gray-500 dark:text-gray-400">{attendee.role}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="mb-6">
        <h3 className="text-lg font-semibold mb-3 dark:text-gray-200">About the Event</h3>
        <p className="text-gray-600 dark:text-gray-300 leading-relaxed">{event.description}</p>
      </div>

      <button
        onClick={handleActionClick}
        className="w-full px-6 py-3 bg-primary-500 dark:bg-primary-600 text-white rounded-full hover:bg-primary-600 dark:hover:bg-primary-500 transition-colors flex items-center justify-center gap-2"
      >
        <ExternalLink className="w-5 h-5" />
        {event.location.type === 'online' ? 'Join Meeting' : 'Get Directions'}
      </button>
    </div>
  );
}