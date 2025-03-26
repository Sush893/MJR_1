import React, { useState } from 'react';
import { Calendar } from './Calendar';
import { EventDetails } from './EventDetails';
import { events } from '../../data/events';

export function EventsPage() {
  const [selectedDate, setSelectedDate] = useState<string | null>(null);
  const selectedEvents = selectedDate
    ? events.filter(event => event.date === selectedDate)
    : [];

  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-8">Events & Meetups</h1>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
          <Calendar
            events={events}
            selectedDate={selectedDate}
            onSelectDate={setSelectedDate}
          />
        </div>
        
        <div className="space-y-6">
          {selectedEvents.map(event => (
            <EventDetails key={event.id} event={event} />
          ))}
          {selectedDate && selectedEvents.length === 0 && (
            <div className="bg-white rounded-xl shadow-sm p-6 text-center text-gray-500">
              No events scheduled for this date
            </div>
          )}
          {!selectedDate && (
            <div className="bg-white rounded-xl shadow-sm p-6 text-center text-gray-500">
              Select a date to view events
            </div>
          )}
        </div>
      </div>
    </div>
  );
}