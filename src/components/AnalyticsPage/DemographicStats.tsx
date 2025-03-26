import React from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip } from 'recharts';
import { useTheme } from '../../contexts/ThemeContext';

const data = [
  { name: 'AI Startups', value: 35 },
  { name: 'EdTech', value: 25 },
  { name: 'FinTech', value: 20 },
  { name: 'HealthTech', value: 15 },
  { name: 'Others', value: 5 },
];

const COLORS = {
  light: ['#10B981', '#6366F1', '#F59E0B', '#EC4899', '#8B5CF6'],
  dark: ['#059669', '#4F46E5', '#D97706', '#DB2777', '#7C3AED']
};

export function DemographicStats() {
  const { theme } = useTheme();
  const colors = COLORS[theme];

  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-6">
      <h3 className="text-xl font-bold mb-6 dark:text-gray-200">Community Engagement</h3>
      
      <div className="h-[300px]">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={data}
              cx="50%"
              cy="50%"
              innerRadius={60}
              outerRadius={80}
              paddingAngle={5}
              dataKey="value"
              label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
              labelLine={false}
            >
              {data.map((entry, index) => (
                <Cell 
                  key={`cell-${index}`} 
                  fill={colors[index % colors.length]}
                  className="transition-colors duration-200"
                />
              ))}
            </Pie>
            <Tooltip
              contentStyle={{
                backgroundColor: theme === 'dark' ? '#1F2937' : '#FFFFFF',
                border: 'none',
                borderRadius: '8px',
                color: theme === 'dark' ? '#E5E7EB' : '#1F2937',
              }}
            />
            <Legend 
              formatter={(value) => (
                <span className={theme === 'dark' ? 'text-gray-200' : 'text-gray-800'}>
                  {value}
                </span>
              )}
            />
          </PieChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}