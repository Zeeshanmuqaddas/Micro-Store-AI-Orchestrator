import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { LineChart, Line, AreaChart, Area, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts';
import { BarChart2, Zap, Clock, Box, TrendingUp } from 'lucide-react';

export function AnalyticsDashboard() {
  const [data, setData] = useState(() => {
    const initialData = [];
    let now = new Date();
    for (let i = 20; i >= 0; i--) {
      initialData.push({
        time: new Date(now.getTime() - i * 5000).toLocaleTimeString([], { hour12: false, minute: '2-digit', second: '2-digit' }),
        efficiency: Math.floor(Math.random() * 20) + 75,
        velocity: Math.floor(Math.random() * 15) + 30,
        turnover: Math.random() * 2 + 3,
      });
    }
    return initialData;
  });

  useEffect(() => {
    const interval = setInterval(() => {
      setData((prevData) => {
        const newData = [...prevData.slice(1)];
        newData.push({
          time: new Date().toLocaleTimeString([], { hour12: false, minute: '2-digit', second: '2-digit' }),
          efficiency: Math.min(100, Math.max(60, prevData[prevData.length - 1].efficiency + (Math.random() * 10 - 5))),
          velocity: Math.max(10, prevData[prevData.length - 1].velocity + (Math.random() * 8 - 4)),
          turnover: Math.max(1, prevData[prevData.length - 1].turnover + (Math.random() * 0.4 - 0.2)),
        });
        return newData;
      });
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  const latestData = data[data.length - 1];

  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div>
        <h1 className="text-3xl font-bold tracking-tight text-gray-900">Performance Analytics</h1>
        <p className="text-gray-500 mt-1">Real-time telemetry and key performance indicators</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="border-indigo-100 bg-indigo-50/50">
          <CardContent className="p-6">
            <div className="flex items-center space-x-3 mb-4">
              <div className="bg-indigo-100 p-2 rounded-lg text-indigo-600">
                <Zap className="w-6 h-6" />
              </div>
              <div>
                <p className="text-sm font-medium text-indigo-900">Agent Efficiency Score</p>
                <h3 className="text-3xl font-bold text-indigo-700">{latestData.efficiency.toFixed(1)}%</h3>
              </div>
            </div>
            <div className="h-[60px]">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={data}>
                  <defs>
                    <linearGradient id="colorEfficiency" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#4f46e5" stopOpacity={0.3}/>
                      <stop offset="95%" stopColor="#4f46e5" stopOpacity={0}/>
                    </linearGradient>
                  </defs>
                  <Area type="monotone" dataKey="efficiency" stroke="#4f46e5" fillOpacity={1} fill="url(#colorEfficiency)" isAnimationActive={false} />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        <Card className="border-emerald-100 bg-emerald-50/50">
          <CardContent className="p-6">
            <div className="flex items-center space-x-3 mb-4">
              <div className="bg-emerald-100 p-2 rounded-lg text-emerald-600">
                <TrendingUp className="w-6 h-6" />
              </div>
              <div>
                <p className="text-sm font-medium text-emerald-900">Sales Velocity (Orders/hr)</p>
                <h3 className="text-3xl font-bold text-emerald-700">{latestData.velocity.toFixed(0)}</h3>
              </div>
            </div>
            <div className="h-[60px]">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={data}>
                  <Bar dataKey="velocity" fill="#10b981" radius={[2, 2, 0, 0]} isAnimationActive={false} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        <Card className="border-amber-100 bg-amber-50/50">
          <CardContent className="p-6">
            <div className="flex items-center space-x-3 mb-4">
              <div className="bg-amber-100 p-2 rounded-lg text-amber-600">
                <Box className="w-6 h-6" />
              </div>
              <div>
                <p className="text-sm font-medium text-amber-900">Inventory Turnover Rate</p>
                <h3 className="text-3xl font-bold text-amber-700">{latestData.turnover.toFixed(2)}x</h3>
              </div>
            </div>
            <div className="h-[60px]">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={data}>
                  <Line type="stepAfter" dataKey="turnover" stroke="#d97706" strokeWidth={2} dot={false} isAnimationActive={false} />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader className="bg-white border-b border-gray-100">
            <CardTitle className="text-base flex items-center text-gray-900">
              <BarChart2 className="w-5 h-5 mr-2 text-indigo-500" />
              Agent Efficiency vs Sales Velocity
            </CardTitle>
          </CardHeader>
          <CardContent className="p-6">
            <div className="h-[300px] w-full mt-2">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={data} margin={{ top: 5, right: 30, left: 0, bottom: 5 }}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f3f4f6" />
                  <XAxis dataKey="time" stroke="#9ca3af" fontSize={12} tickLine={false} axisLine={false} minTickGap={30} />
                  <YAxis yAxisId="left" stroke="#4f46e5" fontSize={12} tickLine={false} axisLine={false} domain={['auto', 'auto']} />
                  <YAxis yAxisId="right" orientation="right" stroke="#10b981" fontSize={12} tickLine={false} axisLine={false} domain={['auto', 'auto']} />
                  <Tooltip 
                    contentStyle={{ borderRadius: '8px', border: '1px solid #e5e7eb', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
                    itemStyle={{ padding: 0 }}
                  />
                  <Legend wrapperStyle={{ paddingTop: '20px' }} iconType="circle" />
                  <Line yAxisId="left" type="monotone" name="Efficiency (%)" dataKey="efficiency" stroke="#4f46e5" strokeWidth={3} dot={false} activeDot={{ r: 6 }} isAnimationActive={false} />
                  <Line yAxisId="right" type="monotone" name="Sales Velocity" dataKey="velocity" stroke="#10b981" strokeWidth={3} dot={false} activeDot={{ r: 6 }} isAnimationActive={false} />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="bg-white border-b border-gray-100">
            <CardTitle className="text-base flex items-center text-gray-900">
              <Clock className="w-5 h-5 mr-2 text-amber-500" />
              Real-time Inventory Turnover Stability
            </CardTitle>
          </CardHeader>
          <CardContent className="p-6">
            <div className="h-[300px] w-full mt-2">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={data} margin={{ top: 5, right: 0, left: 0, bottom: 5 }}>
                  <defs>
                    <linearGradient id="colorTurnover" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#f59e0b" stopOpacity={0.3}/>
                      <stop offset="95%" stopColor="#f59e0b" stopOpacity={0}/>
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f3f4f6" />
                  <XAxis dataKey="time" stroke="#9ca3af" fontSize={12} tickLine={false} axisLine={false} minTickGap={30} />
                  <YAxis stroke="#9ca3af" fontSize={12} tickLine={false} axisLine={false} domain={['dataMin - 1', 'dataMax + 1']} />
                  <Tooltip 
                    contentStyle={{ borderRadius: '8px', border: '1px solid #e5e7eb', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
                  />
                  <Area type="monotone" name="Inventory Turnover Rate" dataKey="turnover" stroke="#f59e0b" strokeWidth={3} fillOpacity={1} fill="url(#colorTurnover)" isAnimationActive={false} />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
