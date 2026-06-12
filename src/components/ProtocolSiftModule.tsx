import React, { useState, useEffect, useRef } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { ShieldCheck, ShieldAlert, FileSearch, Database, Activity, GitBranch, Key, CheckCircle, Terminal, AlertTriangle, RefreshCcw, Search, Eye } from 'lucide-react';

export function ProtocolSiftModule() {
  const [posture] = useState('active');
  const [logs, setLogs] = useState<string[]>([
    "[10:23:41] [Orchestrator Agent] Initialized Task: Triage TR-3994 Lateral Movement",
    "[10:23:44] [Disk Analysis Agent] Executing extract_mft_timeline() on SRV-APP-01",
    "[10:24:01] [Disk Analysis Agent] Timeline extracted. Found anomalous Execution: C:\\Windows\\Temp\\svchost.exe",
    "[10:24:15] [Memory Analysis Agent] Executing memory_process_tree() for PID 4822",
    "[10:24:30] [Memory Analysis Agent] Warning: detect_injected_dlls() failed to converge. Attempting re-analysis."
  ]);
  const [loopIteration, setLoopIteration] = useState(1);
  const logContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const mockEvents = [
      "[10:25:02] [Correlation Agent] Cross-source validation: Disk vs Memory findings diverge. Triggering self-correction...",
      "[10:25:05] [Orchestrator Agent] Generated new hypothesis: Hollowed process masquerading as svchost.exe",
      "[10:25:12] [Network Analysis Agent] Executing analyze_pcap() for endpoint SRV-APP-01 (port 443)",
      "[10:25:28] [Network Analysis Agent] Beaconing detected to IP 185.22.41.9 every 60s",
      "[10:25:40] [Correlation Agent] Validation success: Network C2 traffic correlates with memory injection footprint.",
      "[10:25:45] [Reporting Agent] Confidence Score updated to 94%. Generating Analyst Notes.",
    ];

    let i = 0;
    const interval = setInterval(() => {
      if (i < mockEvents.length) {
        setLogs(prev => [...prev, mockEvents[i]]);
        if (mockEvents[i].includes("Triggering self-correction")) setLoopIteration(prev => prev + 1);
        i++;
      } else {
        clearInterval(interval);
      }
    }, 3500);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (logContainerRef.current) {
      logContainerRef.current.scrollTop = logContainerRef.current.scrollHeight;
    }
  }, [logs]);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight text-gray-900">Protocol SIFT v2.0</h1>
        <p className="text-gray-500 mt-1">Enterprise Autonomous Incident Response & Digital Forensics</p>
      </div>

      {/* Top Status & Metrics Grid */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="border-indigo-100 bg-indigo-50">
          <CardContent className="p-4 flex flex-col items-center text-center justify-center h-full">
            <Eye className="w-6 h-6 text-indigo-600 mb-2" />
            <h3 className="font-bold text-indigo-900 text-sm">Evidence State</h3>
            <p className="text-xs text-indigo-700 font-medium px-2 py-1 bg-indigo-100 rounded-full mt-2">READ-ONLY VERIFIED</p>
          </CardContent>
        </Card>

        <Card className="border-rose-100 bg-rose-50">
          <CardContent className="p-4 flex flex-col items-center text-center justify-center h-full">
            <RefreshCcw className={`w-6 h-6 text-rose-600 mb-2 ${loopIteration > 1 ? 'animate-spin' : ''}`} />
            <h3 className="font-bold text-rose-900 text-sm">Self-Correction Loop</h3>
            <p className="text-xs text-rose-700 font-medium px-2 py-1 bg-rose-100 rounded-full mt-2">ITERATION {loopIteration}/10</p>
          </CardContent>
        </Card>

        <Card className="border-amber-100 bg-amber-50">
          <CardContent className="p-4 flex flex-col items-center text-center justify-center h-full">
            <ShieldAlert className="w-6 h-6 text-amber-600 mb-2" />
            <h3 className="font-bold text-amber-900 text-sm">Confidence Score</h3>
            <p className="text-xs text-amber-700 font-medium px-2 py-1 bg-amber-100 rounded-full mt-2">
              {loopIteration > 1 ? '94%' : '65%'} - CONVERGING
            </p>
          </CardContent>
        </Card>

        <Card className="border-emerald-100 bg-emerald-50">
          <CardContent className="p-4 flex flex-col items-center text-center justify-center h-full">
            <CheckCircle className="w-6 h-6 text-emerald-600 mb-2" />
            <h3 className="font-bold text-emerald-900 text-sm">Hallucination Risk</h3>
            <p className="text-xs text-emerald-700 font-medium px-2 py-1 bg-emerald-100 rounded-full mt-2 border border-emerald-200">MITIGATED via CORRELATION</p>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
        
        {/* Left Column: Report & Lifecycle */}
        <div className="xl:col-span-1 space-y-6">
          <Card>
            <CardHeader className="border-b bg-gray-50 py-3">
              <CardTitle className="text-sm font-bold flex items-center text-gray-900 text-transform uppercase tracking-wider">
                <FileSearch className="w-4 h-4 mr-2 text-blue-600" />
                Latest Findings Summary
              </CardTitle>
            </CardHeader>
            <CardContent className="p-4">
               <div className="space-y-4">
                  <div>
                    <h4 className="text-xs font-bold text-gray-500 uppercase">Case Reference</h4>
                    <p className="text-sm font-semibold text-gray-900 mt-0.5">TR-3994 (Lateral Movement)</p>
                  </div>
                  <div>
                    <h4 className="text-xs font-bold text-gray-500 uppercase">Executive Summary</h4>
                    <p className="text-sm text-gray-700 mt-1">
                      Identified unauthorized credential access via LSASS dumping. Actor deployed a hollowed process disguised as <code className="bg-gray-100 px-1 rounded text-rose-600">svchost.exe</code> to maintain persistence and established C2 beaconing.
                    </p>
                  </div>
                  <div>
                    <h4 className="text-xs font-bold text-gray-500 uppercase mb-2">Indicators of Compromise</h4>
                    <ul className="text-xs space-y-2">
                      <li className="flex items-center justify-between p-2 rounded bg-rose-50 border border-rose-100">
                        <span className="font-mono text-rose-700">185.22.41.9</span>
                        <span className="text-[10px] uppercase font-bold text-rose-500">C2 Server</span>
                      </li>
                      <li className="flex items-center justify-between p-2 rounded bg-amber-50 border border-amber-100">
                        <span className="font-mono text-amber-700">C:\Windows\Temp\svchost.exe</span>
                        <span className="text-[10px] uppercase font-bold text-amber-500">Malicious Image</span>
                      </li>
                    </ul>
                  </div>
               </div>
            </CardContent>
          </Card>
        </div>

        {/* Right Column: Execution Traces & Logging */}
        <div className="xl:col-span-2 space-y-6">
          
          <Card className="flex flex-col h-full border-gray-800 bg-gray-900 shadow-xl overflow-hidden">
            <CardHeader className="border-b border-gray-700 bg-gray-950 py-2.5 px-4 flex-row items-center justify-between">
              <div className="flex items-center space-x-2">
                <Terminal className="w-4 h-4 text-emerald-400" />
                <span className="text-xs font-mono font-bold text-emerald-400 uppercase tracking-widest">Protocol SIFT — Forensic Execution Log</span>
              </div>
              <div className="flex space-x-1.5 flex-shrink-0">
                <div className="w-3 h-3 rounded-full bg-rose-500/80"></div>
                <div className="w-3 h-3 rounded-full bg-amber-500/80"></div>
                <div className="w-3 h-3 rounded-full bg-emerald-500/80"></div>
              </div>
            </CardHeader>
            <CardContent className="p-0 flex-1 relative">
              <div 
                ref={logContainerRef}
                className="absolute inset-0 p-4 overflow-y-auto space-y-1.5 font-mono text-xs sm:text-sm custom-scrollbar"
                style={{ scrollbarWidth: 'thin', scrollbarColor: '#4B5563 #111827' }}
              >
                {logs.map((log, index) => {
                  let colorClass = "text-emerald-400/90";
                  if (log.includes("[Warning]") || log.includes("diverge")) colorClass = "text-amber-400";
                  if (log.includes("failed") || log.includes("Triggering self-correction") || log.includes("Malicious")) colorClass = "text-rose-400";
                  if (log.includes("[Orchestrator Agent]")) colorClass = "text-blue-400";
                  if (log.includes("[Correlation Agent]")) colorClass = "text-purple-400";

                  return (
                    <div key={index} className={`break-words ${colorClass}`} style={{ animation: 'fadeIn 0.3s ease-out forwards' }}>
                      {log}
                    </div>
                  );
                })}
              </div>
            </CardContent>
          </Card>

        </div>
      </div>
    </div>
  );
}
