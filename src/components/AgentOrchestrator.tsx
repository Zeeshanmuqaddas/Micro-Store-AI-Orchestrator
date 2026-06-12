import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { agents } from '../data';
import { Activity, BrainCircuit, Box, Server, Cpu, Play, Square, RefreshCcw, Network, ShieldAlert } from 'lucide-react';
import { AgentInfo } from '../types';

export function AgentOrchestrator() {
  const [liveAgents, setLiveAgents] = useState(agents);

  // Real-time state simulation
  useEffect(() => {
    const interval = setInterval(() => {
      setLiveAgents(prev => prev.map(agent => {
        if (Math.random() > 0.7) {
          return {
            ...agent,
            status: agent.status === 'idle' ? 'running' : 'idle',
          };
        }
        return agent;
      }));
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  const getSystemIcon = (role: string) => {
    if (role.includes('Orchestrator') || role.includes('Controller')) return <BrainCircuit className="w-6 h-6 text-indigo-500" />;
    if (role.includes('Gateway')) return <Network className="w-6 h-6 text-purple-500" />;
    if (role.includes('AI') || role.includes('ML')) return <Server className="w-6 h-6 text-blue-500" />;
    if (role.includes('RPA')) return <Cpu className="w-6 h-6 text-amber-500" />;
    if (role.includes('SIFT')) return <ShieldAlert className="w-6 h-6 text-rose-500" />;
    return <Box className="w-6 h-6 text-gray-500" />;
  };

  const activeCount = liveAgents.filter(a => a.status === 'running').length;
  const idleCount = liveAgents.filter(a => a.status === 'idle').length;

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight text-gray-900">Maestro Workflow Orchestrator</h1>
        <p className="text-gray-500 mt-1">Live visualization of UiPath Maestro workflow execution grid</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <Card className="bg-indigo-50 border-indigo-100">
          <CardContent className="p-4 flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="p-2 bg-indigo-100 rounded-lg">
                <Network className="w-5 h-5 text-indigo-600" />
              </div>
              <div>
                <p className="text-sm font-medium text-indigo-900">Total Nodes</p>
                <p className="text-2xl font-bold text-indigo-700">{liveAgents.length}</p>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card className="bg-emerald-50 border-emerald-100">
          <CardContent className="p-4 flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="p-2 bg-emerald-100 rounded-lg">
                <Play className="w-5 h-5 text-emerald-600" />
              </div>
              <div>
                <p className="text-sm font-medium text-emerald-900">Active Executions</p>
                <p className="text-2xl font-bold text-emerald-700">{activeCount}</p>
              </div>
            </div>
            <div className="flex space-x-1">
              <span className="relative flex h-3 w-3">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-3 w-3 bg-emerald-500"></span>
              </span>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-slate-50 border-slate-200">
          <CardContent className="p-4 flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="p-2 bg-slate-200 rounded-lg">
                <Square className="w-5 h-5 text-slate-600" />
              </div>
              <div>
                <p className="text-sm font-medium text-slate-900">Idle / Awaiting Triggers</p>
                <p className="text-2xl font-bold text-slate-700">{idleCount}</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader className="border-b border-gray-100 bg-white">
          <div className="flex items-center justify-between">
            <CardTitle className="text-lg flex items-center text-gray-900">
              <Activity className="w-5 h-5 mr-2 text-blue-500" />
              Agentic Node Grid
            </CardTitle>
            <button className="flex items-center text-sm text-gray-500 hover:text-gray-900 transition-colors">
              <RefreshCcw className="w-4 h-4 mr-1" /> Sync State
            </button>
          </div>
        </CardHeader>
        <CardContent className="p-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {liveAgents.map((agent) => (
              <div 
                key={agent.id} 
                className={`relative overflow-hidden rounded-xl border p-4 transition-all duration-300 ${
                  agent.status === 'running' 
                    ? 'bg-white border-emerald-200 shadow-[0_0_15px_rgba(16,185,129,0.1)]' 
                    : 'bg-gray-50 border-gray-200 grayscale-[0.5]'
                }`}
              >
                {/* Status Indicator Bar */}
                <div className={`absolute top-0 left-0 w-full h-1 ${agent.status === 'running' ? 'bg-emerald-500' : 'bg-gray-300'}`} />
                
                <div className="flex justify-between items-start mb-3 mt-1">
                  <div className={`p-2 rounded-lg ${agent.status === 'running' ? 'bg-indigo-50 border border-indigo-100' : 'bg-gray-100 border border-gray-200'}`}>
                    {getSystemIcon(agent.role)}
                  </div>
                  <div className={`px-2 py-0.5 rounded-full border text-[10px] font-bold uppercase tracking-wider ${
                    agent.status === 'running' 
                      ? 'bg-emerald-50 border-emerald-200 text-emerald-700' 
                      : 'bg-gray-100 border-gray-200 text-gray-500'
                  }`}>
                    {agent.status}
                  </div>
                </div>
                
                <div>
                  <h3 className="text-sm font-bold text-gray-900 mb-0.5 leading-tight">{agent.name}</h3>
                  <p className="text-xs text-gray-500 font-medium mb-3">{agent.role}</p>
                  
                  <div className={`text-xs p-2 rounded border mt-auto ${
                    agent.status === 'running' 
                      ? 'bg-emerald-50/50 border-emerald-100 text-emerald-800 font-medium' 
                      : 'bg-gray-100/50 border-gray-200 text-gray-400'
                  }`}>
                    <span className="block text-[10px] uppercase tracking-wider text-gray-400 mb-0.5">Model / Engine</span>
                    {agent.model}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
