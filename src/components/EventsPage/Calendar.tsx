import React from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { Event } from '../../types/event';
import { EventTypeIcon } from './EventTypeIcon';

interface CalendarProps {
  events: Event[];
  selectedDate: string | null;
  onSelectDate: (date: string) => void;
}

export function Calendar({ events, selectedDate, onSelectDate }: CalendarProps) {
  const [currentDate, setCurrentDate] = React.useState(new Date());

  const daysInMonth = new Date(
    currentDate.getFullYear(),
    currentDate.getMonth() + 1,
    0
  ).getDate();

  const firstDayOfMonth = new Date(
    currentDate.getFullYear(),
    currentDate.getMonth(),
    1
  ).getDay();

  const monthYear = currentDate.toLocaleString('default', {
    month: 'long',
    year: 'numeric'
  });

  const previousMonth = () => {
    setCurrentDate(new Date(currentDate.setMonth(currentDate.getMonth() - 1)));
  };

  const nextMonth = () => {
    setCurrentDate(new Date(currentDate.setMonth(currentDate.getMonth() + 1)));
  };

  const getEventsForDate = (day: number) => {
    const date = new Date(
      currentDate.getFullYear(),
      currentDate.getMonth(),
      day
    ).toISOString().split('T')[0];
    return events.filter(event => event.date === date);
  };

  const getEventTypeColor = (type: Event['type'], isDark: boolean = false) => {
    switch (type) {
      case 'pitch':
        return isDark ? 'bg-blue-900/30 text-blue-200' : 'bg-blue-100 text-blue-700';
      case 'meeting':
        return isDark ? 'bg-purple-900/30 text-purple-200' : 'bg-purple-100 text-purple-700';
      case 'social':
        return isDark ? 'bg-primary-900/30 text-primary-200' : 'bg-primary-100 text-primary-700';
    }
  };

  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-6">
      <div className="flex items-center justify-between mb-6">
        <button
          onClick={previousMonth}
          className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-full transition-colors"
        >
          <ChevronLeft className="w-5 h-5 dark:text-gray-300" />
        </button>
        <h2 className="text-xl font-bold dark:text-gray-200">{monthYear}</h2>
        <button
          onClick={nextMonth}
          className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-full transition-colors"
        >
          <ChevronRight className="w-5 h-5 dark:text-gray-300" />
        </button>
      </div>

      <div className="grid grid-cols-7 gap-1 text-center mb-2">
        {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(day => (
          <div key={day} className="font-medium text-gray-500 dark:text-gray-400 text-sm py-2">
            {day}
          </div>
        ))}
      </div>

      <div className="grid grid-cols-7 gap-1">
        {Array.from({ length: firstDayOfMonth }).map((_, index) => (
          <div key={`empty-${index}`} className="h-24" />
        ))}

        {Array.from({ length: daysInMonth }).map((_, index) => {
          const day = index + 1;
          const date = new Date(
            currentDate.getFullYear(),
            currentDate.getMonth(),
            day
          ).toISOString().split('T')[0];
          const dayEvents = getEventsForDate(day);
          const isSelected = date === selectedDate;

          return (
            <button
              key={day}
              onClick={() => onSelectDate(date)}
              className={`h-24 p-2 border border-gray-100 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors relative ${
                isSelected ? 'ring-2 ring-primary-500 dark:ring-primary-400' : ''
              }`}
            >
              <span className="text-sm dark:text-gray-300">{day}</span>
              {dayEvents.length > 0 && (
                <div className="absolute bottom-2 left-2 right-2">
                  {dayEvents.map(event => (
                    <div
                      key={event.id}
                      className={`text-xs truncate rounded px-1 py-0.5 mb-1 flex items-center gap-1 ${getEventTypeColor(event.type, true)}`}
                    >
                      <EventTypeIcon type={event.type} className="w-3 h-3" />
                      {event.title}
                    </div>
                  ))}
                </div>
              )}
            </button>
          );
        })}
      </div>
    </div>
  );
}