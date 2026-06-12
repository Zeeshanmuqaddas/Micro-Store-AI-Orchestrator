import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { DollarSign, Cpu, Database, Server, Zap, ArrowRight, Activity, TrendingUp } from 'lucide-react';

export function CostEstimationWidget() {
  const [tokensInfo, setTokensInfo] = useState({ input: 1245000, output: 432000, latency: 124 });
  const [costs, setCosts] = useState({
    vertex: 14.50,
    bigQuery: 8.20,
    cloudRun: 4.10,
    total: 26.80
  });

  // Simulate real-time token/cost increments
  useEffect(() => {
    const interval = setInterval(() => {
      setTokensInfo(prev => ({
        input: prev.input + Math.floor(Math.random() * 500) + 100,
        output: prev.output + Math.floor(Math.random() * 100) + 20,
        latency: 120 + Math.floor(Math.random() * 30) - 15
      }));
      setCosts(prev => ({
        vertex: prev.vertex + Math.random() * 0.05,
        bigQuery: prev.bigQuery + Math.random() * 0.02,
        cloudRun: prev.cloudRun + Math.random() * 0.01,
        total: prev.total + Math.random() * 0.08
      }));
    }, 2500);
    return () => clearInterval(interval);
  }, []);

  return (
    <Card className="col-span-1 lg:col-span-3 border-gray-200">
      <CardHeader className="border-b border-gray-100 bg-gray-50/50 pb-4">
        <div className="flex items-center justify-between">
          <CardTitle className="flex items-center text-gray-900">
            <DollarSign className="w-5 h-5 mr-2 text-emerald-600" />
            Operational Efficiency & Cost Estimation
          </CardTitle>
          <div className="flex items-center space-x-2 text-xs font-semibold text-emerald-700 bg-emerald-50 px-2.5 py-1 rounded-full border border-emerald-200">
            <span className="relative flex h-2 w-2 mr-1">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
            </span>
            Real-time tracking active
          </div>
        </div>
      </CardHeader>
      <CardContent className="p-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          
          {/* LLM Token Usage Section */}
          <div>
            <h3 className="text-sm font-semibold text-gray-900 mb-4 uppercase tracking-wider flex items-center">
              <Cpu className="w-4 h-4 mr-2 text-indigo-500" />
              Multi-LLM Inference Metrics
            </h3>
            <div className="space-y-4">
              <div className="bg-white border rounded-xl p-4 shadow-sm">
                <div className="flex justify-between items-center mb-1">
                  <span className="text-sm font-medium text-gray-500">Total Output Tokens</span>
                  <div className="flex space-x-2">
                    <span className="text-xs font-bold text-indigo-600 bg-indigo-50 px-2 py-0.5 rounded-full">Gemini</span>
                    <span className="text-xs font-bold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-full">GPT-4o</span>
                    <span className="text-xs font-bold text-orange-600 bg-orange-50 px-2 py-0.5 rounded-full">Claude</span>
                  </div>
                </div>
                <div className="text-2xl font-bold text-gray-900 font-mono mt-2">
                  {(tokensInfo.output).toLocaleString()}
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-gray-50 border rounded-xl p-4">
                  <span className="text-xs font-medium text-gray-500 block mb-1">Input Tokens</span>
                  <span className="text-lg font-bold text-gray-900 font-mono">{(tokensInfo.input / 1000).toFixed(1)}k</span>
                </div>
                <div className="bg-gray-50 border rounded-xl p-4">
                  <span className="text-xs font-medium text-gray-500 block mb-1">P95 Latency</span>
                  <span className="text-lg font-bold text-gray-900 font-mono">{tokensInfo.latency}ms</span>
                </div>
              </div>
            </div>
          </div>

          {/* GCP & UiPath Cost Section */}
          <div>
            <h3 className="text-sm font-semibold text-gray-900 mb-4 uppercase tracking-wider flex items-center">
              <Server className="w-4 h-4 mr-2 text-emerald-500" />
              Estimated Infrastructure Costs (Last 24h)
            </h3>
            <div className="space-y-3">
              <div className="flex items-center justify-between p-3 rounded-lg hover:bg-gray-50 transition-colors border border-transparent hover:border-gray-100">
                <div className="flex items-center">
                  <div className="w-8 h-8 rounded-full bg-orange-100 flex items-center justify-center mr-3">
                    <Activity className="w-4 h-4 text-orange-600" />
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-gray-900">UiPath Automation Cloud</p>
                    <p className="text-xs text-gray-500">RPA Bot Execution & Maestro</p>
                  </div>
                </div>
                <span className="text-sm font-bold text-gray-900 font-mono">${(costs.cloudRun * 1.5).toFixed(2)}</span>
              </div>
              
              <div className="flex items-center justify-between p-3 rounded-lg hover:bg-gray-50 transition-colors border border-transparent hover:border-gray-100">
                <div className="flex items-center">
                  <div className="w-8 h-8 rounded-full bg-indigo-100 flex items-center justify-center mr-3">
                    <Zap className="w-4 h-4 text-indigo-600" />
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-gray-900">Vertex AI & External LLMs</p>
                    <p className="text-xs text-gray-500">Gateway Routing Inference</p>
                  </div>
                </div>
                <span className="text-sm font-bold text-gray-900 font-mono">${costs.vertex.toFixed(2)}</span>
              </div>

              <div className="flex items-center justify-between p-3 rounded-lg hover:bg-gray-50 transition-colors border border-transparent hover:border-gray-100">
                <div className="flex items-center">
                  <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center mr-3">
                    <Database className="w-4 h-4 text-blue-600" />
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-gray-900">BigQuery</p>
                    <p className="text-xs text-gray-500">Analytics queries</p>
                  </div>
                </div>
                <span className="text-sm font-bold text-gray-900 font-mono">${costs.bigQuery.toFixed(2)}</span>
              </div>

              <div className="pt-3 mt-1 border-t border-gray-100 flex items-center justify-between px-3">
                <span className="text-sm font-bold text-gray-900">Total Run Rate</span>
                <div className="flex items-center text-emerald-600 font-bold text-lg font-mono">
                  ${(costs.total + costs.cloudRun * 1.5).toFixed(2)}
                </div>
              </div>
            </div>
          </div>

        </div>
      </CardContent>
    </Card>
  );
}
