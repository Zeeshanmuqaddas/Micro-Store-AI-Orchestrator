import React, { useMemo, useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { agents, getAgentMetrics, llmPerformanceData } from '../data';
import { Bot, Activity, BrainCircuit, Box, Search, MessagesSquare, BarChart as BarChartIcon, Server, Cpu, X, Terminal, ShieldAlert } from 'lucide-react';
import { AreaChart, Area, XAxis, YAxis, Tooltip, ResponsiveContainer, ScatterChart, Scatter, CartesianGrid, ZAxis, Cell } from 'recharts';
import { AgentInfo } from '../types';

const FAKE_TASKS: Record<string, string[]> = {
  'Orchestrator Layer': ['Receiving business events', 'Routing task to RPA bot', 'Enforcing BPMN SLAs', 'Logging decision for audit', 'Idle'],
  'Multi-Model Gateway': ['Evaluating task types', 'Comparing OpenAI vs Gemini cost', 'Routing to Claude for reasoning', 'Normalizing response schema', 'Waiting for external LLM inference'],
  'AI / ML Agent Layer': ['Predicting SKU stock demand', 'Generating personalized discounts', 'Performing sentiment analysis', 'Clustering customer embeddings', 'Idle'],
  'RPA Execution Layer': ['Generating invoices', 'Updating ERP/CRM systems', 'Sending purchase orders', 'Logging compliance transactions', 'Idle'],
  'SIFT DFIR Orchestrator': ['Forming investigation hypothesis', 'Validating cross-source findings', 'Generating technical timeline', 'Enforcing evidence integrity', 'Idle'],
  'SIFT Forensics Layer': ['Analyzing process tree execution', 'Detecting persistence mechanisms', 'Extracting MFT timeline', 'Correlating PCAP with Sysmon logs', 'Idle'],
};

const LOG_MESSAGES = [
  "Initialized agent runtime.",
  "Connected to database successfully.",
  "Fetching remote configuration...",
  "Starting task execution.",
  "Model inference in progress (latency: ~250ms).",
  "Received valid JSON payload.",
  "Warning: Rate limit approaching for active endpoint.",
  "Payload processed and stored.",
  "System health check: OK.",
  "Syncing metadata to shared memory.",
  "Task completed successfully. Yielding execution.",
  "Attempting reconnect to primary message bus..."
];

export function AgentStatusDashboard() {
  const [liveAgents, setLiveAgents] = useState(agents);
  const [selectedAgentForLogs, setSelectedAgentForLogs] = useState<AgentInfo | null>(null);
  const [agentLogs, setAgentLogs] = useState<string[]>([]);
  
  // Real-time state simulation
  useEffect(() => {
    const interval = setInterval(() => {
      setLiveAgents(prev => prev.map(agent => {
        if (Math.random() > 0.6) {
          const tasks = FAKE_TASKS[agent.role] || ['Running background task...'];
          const randomTask = tasks[Math.floor(Math.random() * tasks.length)] || 'Running background task...';
          const isIdle = randomTask.includes('Idle') || randomTask.includes('Wait');
          return {
            ...agent,
            status: isIdle ? 'idle' : 'running',
            currentTask: randomTask,
            lastActive: isIdle ? agent.lastActive : 'Just now'
          };
        }
        return agent;
      }));
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  // Simulate streaming logs for the selected agent
  useEffect(() => {
    if (selectedAgentForLogs) {
      setAgentLogs([`[System] Connected to log stream for agent: ${selectedAgentForLogs.name}`]);
      
      const logInterval = setInterval(() => {
        const randomLog = LOG_MESSAGES[Math.floor(Math.random() * LOG_MESSAGES.length)];
        const timestamp = new Date().toISOString().substring(11, 19);
        setAgentLogs(prev => {
          const newLogs = [...prev, `[${timestamp}] ${randomLog}`];
          return newLogs.slice(-20); // Keep last 20 logs
        });
      }, 1500);
      
      return () => clearInterval(logInterval);
    } else {
      setAgentLogs([]);
    }
  }, [selectedAgentForLogs]);

  const getIcon = (role: string) => {
    switch(role) {
      case 'Orchestrator Layer': return <BrainCircuit className="w-5 h-5 text-indigo-500" />;
      case 'Multi-Model Gateway': return <Server className="w-5 h-5 text-purple-500" />;
      case 'AI / ML Agent Layer': return <Bot className="w-5 h-5 text-blue-500" />;
      case 'RPA Execution Layer': return <Cpu className="w-5 h-5 text-emerald-500" />;
      case 'SIFT DFIR Orchestrator': return <ShieldAlert className="w-5 h-5 text-rose-500" />;
      case 'SIFT Forensics Layer': return <Search className="w-5 h-5 text-amber-500" />;
      default: return <Box className="w-5 h-5 text-gray-500" />;
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight text-gray-900">UiPath Maestro OS v3.0</h1>
        <p className="text-gray-500 mt-1">Multi-agent control plane across Automation Cloud, Vertex AI, and external LLMs</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
        {liveAgents.map(agent => {
          const metrics = useMemo(() => getAgentMetrics(agent.id), [agent.id]);
          
          return (
          <Card key={agent.id} className={`overflow-hidden border-t-4 ${agent.status === 'running' ? 'border-t-emerald-500' : 'border-t-gray-300'} flex flex-col`}>
            <CardHeader className="pb-4">
              <div className="flex justify-between items-start">
                <div className="flex items-center space-x-3">
                  <div className="p-2 bg-gray-50 rounded-lg ring-1 ring-gray-100">
                    {getIcon(agent.role)}
                  </div>
                  <div>
                    <CardTitle className="text-lg">{agent.name}</CardTitle>
                    <p className="text-xs text-gray-500 font-medium mt-0.5">{agent.role}</p>
                  </div>
                </div>
                <span className={`inline-flex items-center rounded-full px-2 py-1 text-xs font-medium ring-1 ring-inset ${
                  agent.status === 'running' ? 'bg-emerald-50 text-emerald-700 ring-emerald-600/20' :
                  agent.status === 'idle' ? 'bg-gray-50 text-gray-600 ring-gray-500/10' :
                  'bg-red-50 text-red-700 ring-red-600/10'
                }`}>
                  {agent.status === 'running' ? (
                    <span className="flex items-center">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 mr-1.5 animate-pulse"></span>
                      Active
                    </span>
                  ) : (
                    <span className="capitalize">{agent.status}</span>
                  )}
                </span>
              </div>
            </CardHeader>
            <CardContent className="flex-1 flex flex-col">
              <div className="space-y-4 flex-1 flex flex-col">
                <div className="bg-gray-50 p-3 rounded-lg text-sm">
                  <div className="flex justify-between mb-1">
                    <span className="text-gray-500 font-medium">Model:</span>
                    <span className="text-gray-900 font-mono text-xs">{agent.model}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-500 font-medium">Last Active:</span>
                    <span className="text-gray-900 font-medium">{agent.lastActive}</span>
                  </div>
                </div>
                
                {agent.currentTask && (
                  <div className={`border p-3 rounded-lg ${agent.status === 'running' ? 'border-indigo-100 bg-indigo-50/50' : 'border-gray-200 bg-gray-50/50'}`}>
                    <p className={`text-xs font-semibold uppercase tracking-wider mb-1 flex items-center ${agent.status === 'running' ? 'text-indigo-500' : 'text-gray-500'}`}>
                      <Server className="w-3 h-3 mr-1" /> Current Task
                    </p>
                    <p className={`text-sm font-medium ${agent.status === 'running' ? 'text-indigo-900' : 'text-gray-600'}`}>{agent.currentTask}</p>
                  </div>
                )}
                
                <div className="flex-1 min-h-[120px] mt-2 border border-gray-100 rounded-lg p-3 relative">
                  <div className="absolute top-2 left-3 right-3 flex justify-between text-[10px] font-semibold uppercase text-gray-400 z-10">
                    <span>Performance (1H)</span>
                    <div className="flex space-x-3">
                      <span className="flex items-center"><span className="w-2 h-2 rounded-full bg-indigo-500 mr-1"></span>Tokens</span>
                      <span className="flex items-center"><span className="w-2 h-2 rounded-full bg-emerald-500 mr-1"></span>Latency</span>
                    </div>
                  </div>
                  <div className="h-full w-full pt-4">
                    <ResponsiveContainer width="100%" height="100%">
                      <AreaChart data={metrics} margin={{ top: 5, right: 0, bottom: 0, left: 0 }}>
                        <defs>
                          <linearGradient id={`colorTokens-${agent.id}`} x1="0" y1="0" x2="0" y2="1">
                            <stop offset="5%" stopColor="#6366f1" stopOpacity={0.3}/>
                            <stop offset="95%" stopColor="#6366f1" stopOpacity={0}/>
                          </linearGradient>
                          <linearGradient id={`colorLatency-${agent.id}`} x1="0" y1="0" x2="0" y2="1">
                            <stop offset="5%" stopColor="#10b981" stopOpacity={0.3}/>
                            <stop offset="95%" stopColor="#10b981" stopOpacity={0}/>
                          </linearGradient>
                        </defs>
                        <XAxis dataKey="time" hide />
                        <Tooltip 
                          contentStyle={{ fontSize: '12px', borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
                          labelStyle={{ color: '#6b7280', fontWeight: 'bold' }}
                          itemStyle={{ padding: 0 }}
                        />
                        <Area type="monotone" dataKey="tokens" stroke="#6366f1" fillOpacity={1} fill={`url(#colorTokens-${agent.id})`} strokeWidth={2} />
                        <Area type="monotone" dataKey="latency" name="latency (ms)" stroke="#10b981" fillOpacity={1} fill={`url(#colorLatency-${agent.id})`} strokeWidth={2} />
                      </AreaChart>
                    </ResponsiveContainer>
                  </div>
                </div>

                <div className="flex space-x-2 pt-2 mt-auto">
                  <button 
                    onClick={() => setSelectedAgentForLogs(agent)}
                    className="flex-1 bg-white border border-gray-200 text-gray-700 text-sm py-1.5 rounded-md hover:bg-gray-50 transition-colors font-medium flex justify-center items-center"
                  >
                    <Terminal className="w-4 h-4 mr-1.5" />
                    Logs
                  </button>
                  <button className="flex-1 bg-white border border-gray-200 text-gray-700 text-sm py-1.5 rounded-md hover:bg-gray-50 transition-colors font-medium">Config</button>
                </div>
              </div>
            </CardContent>
          </Card>
          );
        })}
      </div>

      <div className="pt-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between border-b border-gray-100 pb-4">
            <div>
              <CardTitle className="flex items-center">
                <Cpu className="w-5 h-5 mr-2 text-indigo-500" />
                LLM Provider Performance
              </CardTitle>
              <p className="text-sm text-gray-500 mt-1">Average response latency vs Token throughput across network</p>
            </div>
            <div className="flex space-x-4 text-xs font-medium bg-gray-50 px-3 py-1.5 rounded-lg border border-gray-100">
              <span className="flex items-center"><span className="w-2.5 h-2.5 rounded-full bg-indigo-500 mr-2"></span>Google</span>
              <span className="flex items-center"><span className="w-2.5 h-2.5 rounded-full bg-emerald-500 mr-2"></span>OpenAI</span>
              <span className="flex items-center"><span className="w-2.5 h-2.5 rounded-full bg-orange-400 mr-2"></span>Anthropic</span>
              <span className="flex items-center"><span className="w-2.5 h-2.5 rounded-full bg-purple-500 mr-2"></span>Mistral</span>
            </div>
          </CardHeader>
          <CardContent className="pt-6">
            <div className="h-[300px] w-full">
              <ResponsiveContainer width="100%" height="100%">
                <ScatterChart margin={{ top: 20, right: 20, bottom: 20, left: 20 }}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f3f4f6" />
                  <XAxis 
                    type="number" 
                    dataKey="latency" 
                    name="Latency" 
                    unit="ms" 
                    stroke="#6b7280" 
                    fontSize={12} 
                    tickLine={false} 
                    axisLine={false}
                  />
                  <YAxis 
                    type="number" 
                    dataKey="tokens" 
                    name="Throughput" 
                    unit=" tok/s" 
                    stroke="#6b7280" 
                    fontSize={12} 
                    tickLine={false} 
                    axisLine={false}
                  />
                  <ZAxis type="category" dataKey="model" name="Model" />
                  <Tooltip 
                    cursor={{ strokeDasharray: '3 3' }} 
                    contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
                  />
                  <Scatter name="LLMs" data={llmPerformanceData}>
                    {llmPerformanceData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.fill} />
                    ))}
                  </Scatter>
                </ScatterChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Activity Logs Modal */}
      {selectedAgentForLogs && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-gray-900/50 backdrop-blur-sm p-4">
          <div className="bg-gray-900 rounded-xl shadow-2xl max-w-2xl w-full flex flex-col border border-gray-700 overflow-hidden h-[500px]">
            <div className="flex justify-between items-center px-4 py-3 border-b border-gray-800 bg-gray-900/80 backdrop-blur-md">
              <div className="flex items-center space-x-2">
                <Terminal className="w-5 h-5 text-emerald-400" />
                <h3 className="text-emerald-400 font-mono text-sm font-semibold tracking-wide">
                  {selectedAgentForLogs.name} :: Logs
                </h3>
              </div>
              <button
                onClick={() => setSelectedAgentForLogs(null)}
                className="text-gray-500 hover:text-white transition-colors"
                aria-label="Close"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            
            <div className="flex-1 p-4 overflow-y-auto font-mono text-xs text-gray-300 leading-relaxed bg-black scrollbar-thin scrollbar-thumb-gray-700 scrollbar-track-transparent">
              {agentLogs.map((log, index) => {
                const isError = log.toLowerCase().includes('error');
                const isWarning = log.toLowerCase().includes('warning');
                const isSuccess = log.toLowerCase().includes('success') || log.toLowerCase().includes('ok');
                
                return (
                  <div key={index} className="mb-2 break-all flex">
                    <span className="text-gray-600 mr-3 shrink-0">➜</span>
                    <span className={`
                      ${isError ? 'text-rose-400' : ''}
                      ${isWarning ? 'text-amber-400' : ''}
                      ${isSuccess ? 'text-emerald-400' : ''}
                    `}>
                      {log}
                    </span>
                  </div>
                )
              })}
              {/* Fake typing cursor */}
              <div className="flex mt-2 animate-pulse">
                <span className="text-gray-600 mr-3">➜</span>
                <span className="w-2.5 h-3.5 bg-emerald-500 rounded-sm"></span>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
