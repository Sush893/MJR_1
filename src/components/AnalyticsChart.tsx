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

interface AnalyticsData {
  connections: any[];
  projects: any[];
  pitches: any[];
  events: any[];
}

interface AnalyticsChartProps {
  data?: AnalyticsData | null;
}

const generateDefaultData = () => {
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
    });
  }
  
  return data;
};

const metrics = [
  { key: 'profileViews', color: '#10B981', name: 'Profile Views' },
  { key: 'connections', color: '#6366F1', name: 'Connections' },
  { key: 'engagement', color: '#F59E0B', name: 'Engagement' }
] as const;

type Metric = typeof metrics[number]['key'];

export function AnalyticsChart({ data }: AnalyticsChartProps) {
  const [activeMetrics, setActiveMetrics] = useState<Metric[]>(['profileViews']);
  const [defaultData] = useState(generateDefaultData);

  const toggleMetric = (metric: Metric) => {
    setActiveMetrics(current =>
      current.includes(metric)
        ? current.filter(m => m !== metric)
        : [...current, metric]
    );
  };

  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg">
      <h3 className="text-lg font-semibold mb-4 dark:text-white">Analytics Overview</h3>
      <div className="h-[300px]">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={defaultData}>
            <defs>
              {metrics.map(({ key, color }) => (
                <linearGradient key={key} id={`gradient-${key}`} x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor={color} stopOpacity={0.8}/>
                  <stop offset="95%" stopColor={color} stopOpacity={0}/>
                </linearGradient>
              ))}
            </defs>
            
            <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" />
            <XAxis 
              dataKey="date"
              tick={{ fontSize: 12 }}
              tickLine={false}
              axisLine={false}
            />
            <YAxis 
              tick={{ fontSize: 12 }}
              tickLine={false}
              axisLine={false}
              width={40}
            />
            <Tooltip 
              contentStyle={{ 
                backgroundColor: 'rgba(255, 255, 255, 0.8)',
                border: 'none',
                borderRadius: '8px',
                boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)'
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

      <div className="flex flex-wrap gap-4 mt-4">
        {metrics.map(({ key, name }) => (
          <button
            key={key}
            onClick={() => toggleMetric(key)}
            className={`px-4 py-2 rounded-lg transition-all duration-200 text-sm font-medium
              ${activeMetrics.includes(key)
                ? 'bg-emerald-500 text-white hover:bg-emerald-600'
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