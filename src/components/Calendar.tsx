import React from 'react';

const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
const currentDate = new Date();

export function Calendar() {
  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-[0_4px_20px_rgba(0,0,0,0.1)] dark:shadow-gray-900/10 p-6">
      <h3 className="text-xl font-bold mb-4 dark:text-white">Events & Webinars</h3>
      <div className="bg-primary-600 dark:bg-primary-700 text-white p-2 rounded-t-lg">
        <h4 className="text-center">September</h4>
      </div>
      <div className="grid grid-cols-7 gap-1 text-center text-sm">
        {days.map(day => (
          <div key={day} className="py-2 font-medium dark:text-gray-300">{day}</div>
        ))}
        {Array.from({ length: 35 }, (_, i) => {
          const day = i + 1;
          const isToday = day === currentDate.getDate();
          return (
            <div
              key={i}
              className={`py-2 ${
                isToday 
                  ? 'bg-primary-500 dark:bg-primary-600 text-white rounded-full' 
                  : ''
              } hover:bg-primary-100 dark:hover:bg-primary-900/30 cursor-pointer transition-colors dark:text-gray-300`}
            >
              {day <= 30 ? day : ''}
            </div>
          );
        })}
      </div>
      <div className="flex gap-2 mt-4">
        {['Focus', 'Get Help', 'Review', 'Learn More'].map((btn) => (
          <button
            key={btn}
            className="px-3 py-1.5 bg-primary-500 dark:bg-primary-600 text-white text-sm rounded-full hover:bg-primary-600 dark:hover:bg-primary-500 transition-colors"
          >
            {btn}
          </button>
        ))}
      </div>
    </div>
  );
}