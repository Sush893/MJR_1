import React from 'react';
import { EngagementChart } from './EngagementChart';
import { BlogStats } from './BlogStats';
import { DemographicStats } from './DemographicStats';
import { InsightsSidebar } from './InsightsSidebar';

export function AnalyticsPage() {
  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-8 dark:text-gray-200">Analytics Dashboard</h1>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-8">
          {/* Main Content */}
          <EngagementChart />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <BlogStats />
            <DemographicStats />
          </div>
        </div>

        {/* Sidebar */}
        <div className="lg:col-span-1">
          <InsightsSidebar />
        </div>
      </div>
    </div>
  );
}