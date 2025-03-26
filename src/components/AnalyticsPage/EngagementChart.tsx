import React, { useState } from 'react';
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend
} from 'recharts';

const generateData = () => {
  const data = [];
  const now = new Date();
  
  for (let i = 30; i >= 0; i--) {
    const date = new Date(now);
    date.setDate(date.getDate() - i);
    
    data.push({
      date: date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' }),
      profileViews: Math.floor(Math.random() * 100) + 50,
      connections: Math.floor(Math.random() * 30) + 10,
      engagement: Math.floor(Math.random() * 80) + 20,
      blogViews: Math.floor(Math.random() * 150) + 30,
      pitchInteractions: Math.floor(Math.random() * 40) + 15,
    });
  }
  
  return data;
};

const metrics = [
  { key: 'profileViews', color: '#10B981', name: 'Profile Views' },
  { key: 'connections', color: '#6366F1', name: 'Connections' },
  { key: 'engagement', color: '#F59E0B', name: 'Engagement' },
  { key: 'blogViews', color: '#EC4899', name: 'Blog Views' },
  { key: 'pitchInteractions', color: '#8B5CF6', name: 'Pitch Interactions' }
] as const;

type Metric = typeof metrics[number]['key'];

export function EngagementChart() {
  const [data] = useState(generateData);
  const [activeMetrics, setActiveMetrics] = useState<Metric[]>(['profileViews', 'blogViews']);

  const toggleMetric = (metric: Metric) => {
    setActiveMetrics(current =>
      current.includes(metric)
        ? current.filter(m => m !== metric)
        : [...current, metric]
    );
  };

  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-8">
      <h3 className="text-2xl font-bold mb-6 dark:text-gray-200">Engagement Analytics</h3>
      
      <div className="h-[400px] mb-6">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={data} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
            <defs>
              {metrics.map(({ key, color }) => (
                <linearGradient key={key} id={`gradient-${key}`} x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor={color} stopOpacity={0.8}/>
                  <stop offset="95%" stopColor={color} stopOpacity={0}/>
                </linearGradient>
              ))}
            </defs>
            
            <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
            <XAxis
              dataKey="date"
              tick={{ fill: '#9CA3AF' }}
              tickLine={{ stroke: '#4B5563' }}
              axisLine={{ stroke: '#4B5563' }}
            />
            <YAxis
              tick={{ fill: '#9CA3AF' }}
              tickLine={{ stroke: '#4B5563' }}
              axisLine={{ stroke: '#4B5563' }}
              width={40}
            />
            <Tooltip
              contentStyle={{
                backgroundColor: '#1F2937',
                border: 'none',
                borderRadius: '8px',
                color: '#E5E7EB',
              }}
            />
            <Legend />
            
            {metrics.map(({ key, color, name }) => (
              activeMetrics.includes(key) && (
                <Area
                  key={key}
                  type="monotone"
                  dataKey={key}
                  name={name}
                  stroke={color}
                  fillOpacity={1}
                  fill={`url(#gradient-${key})`}
                />
              )
            ))}
          </AreaChart>
        </ResponsiveContainer>
      </div>

      <div className="flex flex-wrap gap-4">
        {metrics.map(({ key, name }) => (
          <button
            key={key}
            onClick={() => toggleMetric(key)}
            className={`px-6 py-2.5 rounded-full transition-all duration-200 font-medium
              ${activeMetrics.includes(key)
                ? 'bg-primary-500 dark:bg-primary-600 text-white hover:bg-primary-600 dark:hover:bg-primary-500'
                : 'bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600'
              }`}
          >
            {name}
          </button>
        ))}
      </div>
    </div>
  );
}