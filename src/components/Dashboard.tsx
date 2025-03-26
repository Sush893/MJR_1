import React, { useState } from 'react';
import { Sidebar } from './Sidebar';
import { Header } from './Header';
import { DashboardContent } from './DashboardContent';
import { ProjectsPage } from './ProjectsPage';
import { ConnectionsPage } from './ConnectionsPage/ConnectionsPage';
import { ProfilePage } from './ProfilePage/ProfilePage';
import { PitchesPage } from './PitchesPage/PitchesPage';
import { EventsPage } from './EventsPage/EventsPage';
import { AnalyticsPage } from './AnalyticsPage/AnalyticsPage';
import { AccountSettings } from './AccountSettings/AccountSettings';

export function Dashboard() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState<'dashboard' | 'projects' | 'connections' | 'profile' | 'pitches' | 'events' | 'analytics' | 'settings'>('dashboard');

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors">
      <Sidebar 
        isOpen={isSidebarOpen} 
        onClose={() => setIsSidebarOpen(false)} 
        onNavigate={(page) => setCurrentPage(page)}
        currentPage={currentPage}
      />
      <div className={`transition-all duration-300 ${isSidebarOpen ? 'ml-64' : 'ml-0'}`}>
        <Header onMenuClick={() => setIsSidebarOpen(!isSidebarOpen)} />
        <main className="pt-20">
          {currentPage === 'dashboard' && <DashboardContent />}
          {currentPage === 'projects' && <ProjectsPage />}
          {currentPage === 'connections' && <ConnectionsPage />}
          {currentPage === 'profile' && <ProfilePage />}
          {currentPage === 'pitches' && <PitchesPage />}
          {currentPage === 'events' && <EventsPage />}
          {currentPage === 'analytics' && <AnalyticsPage />}
          {currentPage === 'settings' && <AccountSettings />}
        </main>
      </div>
    </div>
  );
}