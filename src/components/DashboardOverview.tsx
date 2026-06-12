import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { agents, keyMetrics, revenueData, productOpportunities } from '../data';
import { ArrowUpRight, ArrowDownRight, Activity, TrendingUp, Package, AlertCircle } from 'lucide-react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { CostEstimationWidget } from './CostEstimationWidget';

export function DashboardOverview() {
  const runningAgents = agents.filter(a => a.status === 'running').length;

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-gray-900">CEO Overview</h1>
          <p className="text-gray-500 mt-1">Autonomous orchestration platform status</p>
        </div>
        <div className="flex items-center space-x-2 bg-indigo-50 px-4 py-2 rounded-full border border-indigo-100">
          <span className="relative flex h-3 w-3">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-indigo-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-3 w-3 bg-indigo-500"></span>
          </span>
          <span className="text-sm font-medium text-indigo-700">{runningAgents} Agents Active</span>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {keyMetrics.map((metric, i) => (
          <Card key={i}>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-gray-500">{metric.label}</CardTitle>
              {i === 0 ? <TrendingUp className="h-4 w-4 text-gray-400" /> : 
               i === 1 ? <Package className="h-4 w-4 text-gray-400" /> :
               i === 2 ? <Activity className="h-4 w-4 text-gray-400" /> :
               <AlertCircle className="h-4 w-4 text-gray-400" />}
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-gray-900">{metric.value}</div>
              <p className={`text-xs mt-1 flex items-center font-medium ${metric.isPositive ? 'text-emerald-600' : 'text-red-600'}`}>
                {metric.isPositive ? <ArrowUpRight className="h-3 w-3 mr-1" /> : <ArrowDownRight className="h-3 w-3 mr-1" />}
                {metric.change} from last period
              </p>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card className="col-span-1 lg:col-span-2">
          <CardHeader className="flex items-center justify-between flex-row">
            <CardTitle>Daily Revenue & Sales Trends</CardTitle>
            <div className="flex space-x-4 text-xs font-medium bg-gray-50 px-3 py-1.5 rounded-lg border border-gray-100">
              <span className="flex items-center"><span className="w-2.5 h-2.5 rounded-full bg-indigo-600 mr-2"></span>Revenue ($)</span>
              <span className="flex items-center"><span className="w-2.5 h-2.5 rounded-full bg-emerald-500 mr-2"></span>Sales Count</span>
            </div>
          </CardHeader>
          <CardContent>
            <div className="h-[300px] w-full">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={revenueData} margin={{ top: 5, right: 20, bottom: 5, left: 0 }}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e5e7eb" />
                  <XAxis dataKey="name" stroke="#6b7280" fontSize={12} tickLine={false} axisLine={false} />
                  <YAxis yAxisId="left" stroke="#6b7280" fontSize={12} tickLine={false} axisLine={false} tickFormatter={(value) => `$${value}`} />
                  <YAxis yAxisId="right" orientation="right" stroke="#6b7280" fontSize={12} tickLine={false} axisLine={false} />
                  <Tooltip 
                    contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
                    itemStyle={{ padding: 0 }}
                  />
                  <Line yAxisId="left" name="Revenue" type="monotone" dataKey="value" stroke="#4f46e5" strokeWidth={3} dot={{ r: 4, strokeWidth: 2 }} activeDot={{ r: 6 }} />
                  <Line yAxisId="right" name="Sales Count" type="monotone" dataKey="secondaryValue" stroke="#10b981" strokeWidth={3} dot={{ r: 4, strokeWidth: 2 }} activeDot={{ r: 6 }} />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        <Card className="col-span-1 border-indigo-100 shadow-sm border-2">
          <CardHeader className="bg-indigo-50/50 border-b border-indigo-100/50 pb-4">
            <CardTitle className="text-indigo-900 flex items-center">
              <TrendingUp className="w-5 h-5 mr-2 text-indigo-500" />
              Agent Top Recommendations
            </CardTitle>
          </CardHeader>
          <CardContent className="pt-4 space-y-4">
            {productOpportunities.filter(p => p.status === 'recommended').map(product => (
              <div key={product.id} className="group relative rounded-xl border border-gray-200 bg-white p-4 hover:border-indigo-300 transition-all hover:shadow-sm">
                <div className="flex justify-between items-start mb-2">
                  <h4 className="font-semibold text-gray-900 line-clamp-1">{product.name}</h4>
                  <span className="inline-flex items-center rounded-md bg-emerald-50 px-2 py-1 text-xs font-medium text-emerald-700 ring-1 ring-inset ring-emerald-600/20">
                    {product.demandScore} Dem
                  </span>
                </div>
                <div className="flex justify-between text-sm text-gray-500">
                  <span>Margin: ~{product.estimatedMargin}%</span>
                  <button className="text-indigo-600 font-medium hover:text-indigo-700 group-hover:underline">Action</button>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <CostEstimationWidget />
      </div>
    </div>
  );
}
