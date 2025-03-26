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

export function AnalyticsChart() {
  const [data] = useState(generateData);
  const [activeMetrics, setActiveMetrics] = useState<Metric[]>(['profileViews']);

  const toggleMetric = (metric: Metric) => {
    setActiveMetrics(current =>
      current.includes(metric)
        ? current.filter(m => m !== metric)
        : [...current, metric]
    );
  };

  return (
    <div className="bg-white rounded-xl shadow-[0_4px_20px_rgba(0,0,0,0.1)] p-8">
      <h3 className="text-2xl font-bold mb-6">Engagement Analytics</h3>
      
      <div className="h-64 mb-6">
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
                backgroundColor: 'white',
                border: 'none',
                borderRadius: '8px',
                boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)',
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
        {metrics.map(({ key, color, name }) => (
          <button
            key={key}
            onClick={() => toggleMetric(key)}
            className={`px-6 py-2.5 rounded-full transition-all duration-200 font-medium
              ${activeMetrics.includes(key)
                ? 'bg-emerald-500 text-white hover:bg-emerald-600'
                : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }`}
          >
            {name}
          </button>
        ))}
      </div>
    </div>
  );
}