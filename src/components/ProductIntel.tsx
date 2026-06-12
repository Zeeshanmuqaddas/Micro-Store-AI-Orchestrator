import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { productOpportunities } from '../data';
import { Search, Sparkles, Filter, MoreHorizontal, Box, BrainCircuit } from 'lucide-react';

export function ProductIntel() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-gray-900">Product Intelligence</h1>
          <p className="text-gray-500 mt-1">AI-driven market discovery and competitor analysis</p>
        </div>
        <button className="flex items-center space-x-2 bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-lg font-medium transition-colors shadow-sm">
          <Sparkles className="w-4 h-4 mr-2" />
          Run Deep Scan
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        <div className="lg:col-span-3">
          <Card className="h-full">
            <CardHeader className="flex flex-row items-center justify-between border-b border-gray-100 pb-4">
              <CardTitle>Discovery Pipeline</CardTitle>
              <div className="flex space-x-2">
                <button className="p-2 border border-gray-200 rounded-md hover:bg-gray-50 text-gray-500"><Search className="w-4 h-4" /></button>
                <button className="p-2 border border-gray-200 rounded-md hover:bg-gray-50 text-gray-500"><Filter className="w-4 h-4" /></button>
              </div>
            </CardHeader>
            <CardContent className="p-0">
              <div className="overflow-x-auto">
                <table className="w-full text-sm text-left">
                  <thead className="bg-gray-50/50 text-gray-500 text-xs uppercase tracking-wider">
                    <tr>
                      <th className="px-6 py-4 font-medium border-b border-gray-100">Product Name</th>
                      <th className="px-6 py-4 font-medium border-b border-gray-100">Category</th>
                      <th className="px-6 py-4 font-medium border-b border-gray-100">Demand</th>
                      <th className="px-6 py-4 font-medium border-b border-gray-100">Competition</th>
                      <th className="px-6 py-4 font-medium border-b border-gray-100">Est. Margin</th>
                      <th className="px-6 py-4 font-medium border-b border-gray-100">Status</th>
                      <th className="px-6 py-4 font-medium border-b border-gray-100"></th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-100">
                    {productOpportunities.map((product) => (
                      <tr key={product.id} className="hover:bg-gray-50/50 transition-colors">
                        <td className="px-6 py-4 font-medium text-gray-900">{product.name}</td>
                        <td className="px-6 py-4 text-gray-500">{product.category}</td>
                        <td className="px-6 py-4">
                          <div className="flex items-center">
                            <div className="w-full bg-gray-200 rounded-full h-1.5 mr-2 max-w-[60px]">
                              <div className="bg-indigo-500 h-1.5 rounded-full" style={{ width: `${product.demandScore}%` }}></div>
                            </div>
                            <span className="text-gray-900">{product.demandScore}</span>
                          </div>
                        </td>
                        <td className="px-6 py-4">
                          <div className="flex items-center">
                            <div className="w-full bg-gray-200 rounded-full h-1.5 mr-2 max-w-[60px]">
                              <div className={`h-1.5 rounded-full ${product.competitionScore > 70 ? 'bg-rose-500' : product.competitionScore > 40 ? 'bg-amber-500' : 'bg-emerald-500'}`} style={{ width: `${product.competitionScore}%` }}></div>
                            </div>
                            <span className="text-gray-900">{product.competitionScore}</span>
                          </div>
                        </td>
                        <td className="px-6 py-4 text-emerald-600 font-medium">~{product.estimatedMargin}%</td>
                        <td className="px-6 py-4">
                          <span className={`inline-flex px-2 py-1 rounded-md text-[11px] font-semibold uppercase tracking-wider ${
                            product.status === 'recommended' ? 'bg-indigo-50 text-indigo-700 ring-1 ring-inset ring-indigo-600/10' : 'bg-gray-100 text-gray-600 ring-1 ring-inset ring-gray-500/10'
                          }`}>
                            {product.status}
                          </span>
                        </td>
                        <td className="px-6 py-4 text-right">
                          <button className="text-gray-400 hover:text-gray-600"><MoreHorizontal className="w-5 h-5" /></button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="space-y-6">
          <Card>
            <CardHeader className="pb-3 border-b border-gray-100">
              <CardTitle className="text-sm">Competitor Alerts (Last 24h)</CardTitle>
            </CardHeader>
            <CardContent className="pt-4 space-y-4">
              <div className="flex space-x-3 text-sm">
                <div className="bg-rose-100 text-rose-700 p-1.5 rounded animate-pulse h-fit"><Sparkles className="w-4 h-4" /></div>
                <div>
                  <p className="font-medium text-gray-900">Price Drop Detected</p>
                  <p className="text-gray-500 text-xs mt-0.5">Competitor 'TechHaven' lowered price on Ergo Mouse by 15%.</p>
                </div>
              </div>
              <div className="flex space-x-3 text-sm">
                <div className="bg-amber-100 text-amber-700 p-1.5 rounded h-fit"><Box className="w-4 h-4" /></div>
                <div>
                  <p className="font-medium text-gray-900">Low Stock Signal</p>
                  <p className="text-gray-500 text-xs mt-0.5">Market inventory for 'Travel Backpacks' is trending low.</p>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card className="bg-indigo-600 text-white border-none shadow-md">
            <CardContent className="pt-6">
              <BrainCircuit className="w-8 h-8 text-indigo-300 mb-4" />
              <h3 className="font-semibold text-lg mb-2">Agent Insight</h3>
              <p className="text-indigo-100 text-sm leading-relaxed mb-4">
                Based on rising social sentiment, I recommend immediately sourcing <strong>Smart Home Plant Monitors</strong>.
                Competitor penetration is low and margins are highly favorable (+55%).
              </p>
              <button className="w-full bg-white text-indigo-700 rounded-md py-2 text-sm font-semibold hover:bg-slate-50 transition-colors shadow-sm">
                Initiate Sourcing
              </button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
