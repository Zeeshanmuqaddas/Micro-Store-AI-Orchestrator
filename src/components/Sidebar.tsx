import React from 'react';
import { LayoutDashboard, BrainCircuit, Box, Activity, Megaphone, Users, Settings, LogOut, Archive, Network, ShieldCheck, BarChart2 } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';

interface SidebarProps {
  currentView: string;
  onViewChange: (view: string) => void;
}

export function Sidebar({ currentView, onViewChange }: SidebarProps) {
  const { logout } = useAuth();
  const navigation = [
    { name: 'CEO Overview', id: 'overview', icon: LayoutDashboard },
    { name: 'Workflow Orchestrator', id: 'orchestrator', icon: Network },
    { name: 'Agent Fleet', id: 'agents', icon: BrainCircuit },
    { name: 'Performance Analytics', id: 'analytics', icon: BarChart2 },
    { name: 'Product Intel', id: 'products', icon: Box },
    { name: 'Optimization', id: 'optimization', icon: Activity },
    { name: 'Inventory', id: 'inventory', icon: Archive },
    { name: 'Marketing', id: 'marketing', icon: Megaphone },
    { name: 'Protocol SIFT (IR)', id: 'sift', icon: ShieldCheck },
    { name: 'Customers', id: 'customers', icon: Users },
  ];

  return (
    <div className="flex h-screen w-64 flex-col bg-gray-900 text-gray-100 font-sans border-r border-gray-800">
      <div className="p-6">
        <div className="flex items-center space-x-3 mb-8">
          <div className="bg-indigo-500 p-2 rounded-lg">
            <BrainCircuit className="h-6 w-6 text-white" />
          </div>
          <div>
            <h2 className="text-xl font-bold tracking-tight text-white leading-tight">Maestro OS v3.0</h2>
            <p className="text-[10px] text-indigo-300 font-medium tracking-widest uppercase">UiPath Orchestrator</p>
          </div>
        </div>
        
        <nav className="space-y-1">
          {navigation.map((item) => {
            const isActive = currentView === item.id;
            return (
              <button
                key={item.name}
                onClick={() => onViewChange(item.id)}
                className={`w-full flex items-center space-x-3 px-3 py-2.5 rounded-lg transition-colors ${
                  isActive 
                    ? 'bg-indigo-600/20 text-indigo-400 font-medium' 
                    : 'text-gray-400 hover:bg-gray-800 hover:text-gray-200'
                }`}
              >
                <item.icon className={`h-5 w-5 ${isActive ? 'text-indigo-400' : 'text-gray-400'}`} />
                <span>{item.name}</span>
              </button>
            );
          })}
        </nav>
      </div>
      
      <div className="mt-auto p-6 border-t border-gray-800 space-y-2">
        <button className="w-full flex items-center space-x-3 px-3 py-2.5 text-gray-400 hover:bg-gray-800 hover:text-gray-200 rounded-lg transition-colors">
          <Settings className="h-5 w-5" />
          <span>System Settings</span>
        </button>
        <button 
          onClick={logout}
          className="w-full flex items-center space-x-3 px-3 py-2.5 text-rose-400 hover:bg-gray-800 hover:text-rose-300 rounded-lg transition-colors"
        >
          <LogOut className="h-5 w-5" />
          <span>Log Out</span>
        </button>
      </div>
    </div>
  );
}
