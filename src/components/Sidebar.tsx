import React from 'react';
import { User, LayoutDashboard, Users, FolderKanban, MessageSquare, Calendar, BarChart2, Settings, HelpCircle, X } from 'lucide-react';

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
  onNavigate: (page: 'dashboard' | 'projects' | 'connections' | 'profile' | 'pitches' | 'events' | 'analytics' | 'settings') => void;
  currentPage: string;
}

const navItems = [
  { icon: User, text: 'Profile', page: 'profile' },
  { icon: LayoutDashboard, text: 'Dashboard', page: 'dashboard' },
  { icon: Users, text: 'Connections', page: 'connections' },
  { icon: FolderKanban, text: 'Projects', page: 'projects' },
  { icon: MessageSquare, text: 'Pitches', page: 'pitches' },
  { icon: Calendar, text: 'Events', page: 'events' },
  { icon: BarChart2, text: 'Analytics', page: 'analytics' },
  { icon: Settings, text: 'Account Settings', page: 'settings' },
  { icon: HelpCircle, text: 'Help & Support' },
] as const;

export function Sidebar({ isOpen, onClose, onNavigate, currentPage }: SidebarProps) {
  return (
    <>
      {isOpen && (
        <div 
          className="fixed inset-0 bg-black/20 dark:bg-black/40 z-20 lg:hidden"
          onClick={onClose}
        />
      )}
      
      <div className={`fixed left-0 top-0 h-full w-64 bg-primary-600 dark:bg-gray-800 text-white p-4 z-30 transform transition-transform duration-300 ${
        isOpen ? 'translate-x-0' : '-translate-x-full'
      }`}>
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-3">
            <span className="text-2xl">$</span>
            <h1 className="text-xl font-bold">Co-Founder Connect</h1>
          </div>
          <button 
            onClick={onClose}
            className="p-2 hover:bg-primary-700 dark:hover:bg-gray-700 rounded-full transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>
        
        <nav className="space-y-1">
          {navItems.map((item, index) => (
            <button
              key={index}
              className={`flex items-center gap-3 w-full p-3 hover:bg-primary-700 dark:hover:bg-gray-700 rounded-2xl transition-all duration-200 ease-in-out
                ${item.page && currentPage === item.page ? 'bg-primary-700 dark:bg-gray-700' : ''}`}
              onClick={() => item.page && onNavigate(item.page)}
            >
              <item.icon className="w-5 h-5" />
              <span className="font-medium">{item.text}</span>
            </button>
          ))}
        </nav>
      </div>
    </>
  );
}