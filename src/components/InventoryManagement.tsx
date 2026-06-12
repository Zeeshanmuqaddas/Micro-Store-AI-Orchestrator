import React, { useState, useMemo } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Box, ArrowUpDown, ArrowUp, ArrowDown } from 'lucide-react';
import { inventoryListData } from '../data';
import { InventoryItem } from '../types';

export function InventoryManagement() {
  const [data, setData] = useState([...inventoryListData]);
  const [sortKey, setSortKey] = useState<keyof InventoryItem>('name');
  const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('asc');

  const handleSort = (key: keyof InventoryItem) => {
    if (sortKey === key) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    } else {
      setSortKey(key);
      setSortDirection('asc');
    }
  };

  const sortedData = useMemo(() => {
    return [...data].sort((a, b) => {
      if (a[sortKey] < b[sortKey]) return sortDirection === 'asc' ? -1 : 1;
      if (a[sortKey] > b[sortKey]) return sortDirection === 'asc' ? 1 : -1;
      return 0;
    });
  }, [data, sortKey, sortDirection]);

  const StatusBadge = ({ status }: { status: InventoryItem['status'] }) => {
    switch (status) {
      case 'In Stock': return <span className="px-2.5 py-1 text-xs font-semibold rounded-full bg-emerald-100 text-emerald-800 border border-emerald-200">In Stock</span>;
      case 'Low Stock': return <span className="px-2.5 py-1 text-xs font-semibold rounded-full bg-amber-100 text-amber-800 border border-amber-200">Low Stock</span>;
      case 'Out of Stock': return <span className="px-2.5 py-1 text-xs font-semibold rounded-full bg-rose-100 text-rose-800 border border-rose-200">Out of Stock</span>;
      case 'Overstocked': return <span className="px-2.5 py-1 text-xs font-semibold rounded-full bg-blue-100 text-blue-800 border border-blue-200">Overstocked</span>;
    }
  };

  const SortIcon = ({ column }: { column: keyof InventoryItem }) => {
    if (sortKey !== column) return <ArrowUpDown className="w-4 h-4 ml-1 text-gray-400" />;
    return sortDirection === 'asc' ? <ArrowUp className="w-4 h-4 ml-1 text-indigo-500" /> : <ArrowDown className="w-4 h-4 ml-1 text-indigo-500" />;
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight text-gray-900">Inventory Management</h1>
        <p className="text-gray-500 mt-1">Real-time stock levels and unit pricing</p>
      </div>

      <Card>
        <CardHeader className="border-b border-gray-100 pb-4 bg-white rounded-t-xl">
          <CardTitle className="flex items-center text-gray-900">
            <Box className="w-5 h-5 mr-2 text-indigo-500" />
            Product Stock
          </CardTitle>
        </CardHeader>
        <CardContent className="p-0">
          <div className="overflow-x-auto text-gray-900">
            <table className="w-full text-sm text-left">
              <thead className="text-xs text-gray-500 uppercase bg-gray-50 border-b border-gray-100">
                <tr>
                  <th className="px-6 py-4 cursor-pointer hover:bg-gray-100 transition-colors" onClick={() => handleSort('name')}>
                    <div className="flex items-center">Product Name <SortIcon column="name" /></div>
                  </th>
                  <th className="px-6 py-4 cursor-pointer hover:bg-gray-100 transition-colors" onClick={() => handleSort('sku')}>
                    <div className="flex items-center">SKU <SortIcon column="sku" /></div>
                  </th>
                  <th className="px-6 py-4 cursor-pointer hover:bg-gray-100 transition-colors" onClick={() => handleSort('stockLevel')}>
                    <div className="flex items-center justify-end">Stock Level <SortIcon column="stockLevel" /></div>
                  </th>
                  <th className="px-6 py-4 cursor-pointer hover:bg-gray-100 transition-colors" onClick={() => handleSort('unitPrice')}>
                    <div className="flex items-center justify-end">Unit Price <SortIcon column="unitPrice" /></div>
                  </th>
                  <th className="px-6 py-4 cursor-pointer hover:bg-gray-100 transition-colors" onClick={() => handleSort('status')}>
                    <div className="flex items-center">Status <SortIcon column="status" /></div>
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {sortedData.map((item) => (
                  <tr key={item.id} className="hover:bg-gray-50 transition-colors bg-white">
                    <td className="px-6 py-4 font-medium text-gray-900">{item.name}</td>
                    <td className="px-6 py-4 font-mono text-gray-500">{item.sku}</td>
                    <td className="px-6 py-4 text-right font-medium text-gray-900">
                      {item.stockLevel}
                    </td>
                    <td className="px-6 py-4 text-right font-medium text-gray-900">
                      ${item.unitPrice.toFixed(2)}
                    </td>
                    <td className="px-6 py-4">
                      <StatusBadge status={item.status} />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
