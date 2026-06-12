import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { inventoryData } from '../data';
import { BarChart as BarChartIcon, TrendingDown, TrendingUp, AlertTriangle } from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

export function InventoryPricing() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight text-gray-900">Optimization Center</h1>
        <p className="text-gray-500 mt-1">Autonomous pricing and inventory forecasting</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        <Card className="col-span-1 shadow-sm border-indigo-100">
          <CardHeader className="bg-indigo-50/30 border-b border-indigo-50">
            <CardTitle className="flex items-center text-indigo-900">
              <TrendingUp className="w-5 h-5 mr-2 text-indigo-500" />
              Dynamic Price Adjustments
            </CardTitle>
          </CardHeader>
          <CardContent className="pt-6 space-y-6">
            <div className="flex justify-between items-center bg-gray-50 p-4 rounded-xl border border-gray-100">
              <div>
                <p className="font-semibold text-gray-900">Ergonomic Mouse</p>
                <p className="text-xs text-gray-500 mt-1">Competitor matched</p>
              </div>
              <div className="text-right">
                <p className="text-sm font-medium line-through text-gray-400">$49.99</p>
                <p className="text-lg font-bold text-rose-600 flex items-center justify-end">
                  <TrendingDown className="w-4 h-4 mr-1" /> $44.99
                </p>
              </div>
            </div>
            
            <div className="flex justify-between items-center bg-gray-50 p-4 rounded-xl border border-gray-100">
              <div>
                <p className="font-semibold text-gray-900">Mechanical Keyboard</p>
                <p className="text-xs text-gray-500 mt-1">High demand surge</p>
              </div>
              <div className="text-right">
                <p className="text-sm font-medium line-through text-gray-400">$129.99</p>
                <p className="text-lg font-bold text-emerald-600 flex items-center justify-end">
                  <TrendingUp className="w-4 h-4 mr-1" /> $139.99
                </p>
              </div>
            </div>

            <button className="w-full mt-2 border-2 border-dashed border-indigo-200 text-indigo-600 font-medium py-2 rounded-lg hover:bg-indigo-50 transition-colors">
              Approve All Pending Changes
            </button>
          </CardContent>
        </Card>

        <Card className="col-span-1 lg:col-span-2 shadow-sm">
          <CardHeader className="flex flex-row items-center justify-between border-b border-gray-100 pb-4">
            <CardTitle>Inventory Demand Forecast (Next 5 Weeks)</CardTitle>
            <span className="inline-flex items-center rounded-md bg-purple-50 px-2 py-1 text-xs font-medium text-purple-700 ring-1 ring-inset ring-purple-600/20">
              Vertex AI Forecast
            </span>
          </CardHeader>
          <CardContent className="pt-6">
            <div className="h-[280px] w-full">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={inventoryData} margin={{ top: 5, right: 0, bottom: 5, left: 0 }}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f3f4f6" />
                  <XAxis dataKey="name" stroke="#6b7280" fontSize={12} tickLine={false} axisLine={false} />
                  <YAxis stroke="#6b7280" fontSize={12} tickLine={false} axisLine={false} />
                  <Tooltip 
                    contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
                    cursor={{ fill: '#f3f4f6' }}
                  />
                  <Legend iconType="circle" wrapperStyle={{ fontSize: '12px' }}/>
                  <Bar dataKey="value" name="Projected Sales" fill="#4f46e5" radius={[4, 4, 0, 0]} maxBarSize={40} />
                  <Bar dataKey="secondaryValue" name="Current Stock" fill="#93c5fd" radius={[4, 4, 0, 0]} maxBarSize={40} />
                </BarChart>
              </ResponsiveContainer>
            </div>
            
            <div className="mt-4 flex items-center p-4 bg-amber-50 rounded-lg border border-amber-200 text-amber-800">
              <AlertTriangle className="w-5 h-5 mr-3 text-amber-600 flex-shrink-0" />
              <div className="text-sm">
                <p className="font-semibold text-amber-900">Stockout Warning</p>
                <p>Current stock levels for Top Sellers will be depleted by Week 3 based on current trajectory. Ordering recommended in next 48 hours.</p>
              </div>
            </div>
          </CardContent>
        </Card>

      </div>
    </div>
  );
}
