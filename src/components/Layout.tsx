import React, { useState } from 'react';
import { Sidebar } from './Sidebar';
import { DashboardOverview } from './DashboardOverview';
import { AgentStatusDashboard } from './AgentStatusDashboard';
import { AgentOrchestrator } from './AgentOrchestrator';
import { ProductIntel } from './ProductIntel';
import { InventoryPricing } from './InventoryPricing';
import { InventoryManagement } from './InventoryManagement';
import { MarketingModule } from './MarketingModule';
import { ProtocolSiftModule } from './ProtocolSiftModule';
import { NotificationOverlay } from './NotificationOverlay';
import { SecurityPosture } from './SecurityPosture';
import { useAuth } from '../contexts/AuthContext';
import { Bell, Search, User } from 'lucide-react';

export function Layout() {
  const [currentView, setCurrentView] = useState('overview');
  const { user } = useAuth();

  const renderView = () => {
    switch(currentView) {
      case 'overview': return <DashboardOverview />;
      case 'orchestrator': return <AgentOrchestrator />;
      case 'agents': return <AgentStatusDashboard />;
      case 'products': return <ProductIntel />;
      case 'optimization': return <InventoryPricing />;
      case 'inventory': return <InventoryManagement />;
      case 'marketing': return <MarketingModule />;
      case 'sift': return <ProtocolSiftModule />;
      case 'customers': return <div className="text-gray-500 flex items-center justify-center h-64 border-2 border-dashed border-gray-200 rounded-xl">Customer Intelligence Module (Analyzing Sentiment...)</div>;
      default: return <DashboardOverview />;
    }
  };

  return (
    <div className="flex h-screen bg-gray-50/50">
      <Sidebar currentView={currentView} onViewChange={setCurrentView} />
      
      <div className="flex-1 flex flex-col overflow-hidden">
        <header className="h-16 flex items-center justify-between px-8 bg-white border-b border-gray-200">
          <div className="flex flex-1 items-center">
            <div className="relative w-64">
              <Search className="absolute text-gray-400 left-3 top-1/2 -translate-y-1/2 h-4 w-4" />
              <input 
                type="text" 
                placeholder="Ask Master Agent..." 
                className="w-full pl-9 pr-4 py-2 bg-gray-100 border-transparent rounded-md text-sm focus:bg-white focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 outline-none transition-all"
              />
            </div>
          </div>
          <div className="flex items-center space-x-4">
            <button className="relative p-2 text-gray-400 hover:text-gray-600 transition-colors">
              <Bell className="h-5 w-5" />
              <span className="absolute top-1.5 right-1.5 h-2 w-2 rounded-full bg-rose-500 border-2 border-white"></span>
            </button>
            <div className="h-8 w-8 flex-shrink-0 rounded-full bg-indigo-100 flex items-center justify-center text-indigo-700 font-bold border border-indigo-200">
              <User className="w-4 h-4" />
            </div>
            <span className="text-sm font-medium text-gray-700 hidden md:block select-none">{user}</span>
          </div>
        </header>

        <SecurityPosture />

        <main className="flex-1 overflow-y-auto p-8">
          <div className="max-w-7xl mx-auto">
            {renderView()}
          </div>
        </main>
      </div>

      <NotificationOverlay />
    </div>
  );
}
