"use client";

import React, { useState, useEffect } from 'react';
import DataTable from '@/components/ui/DataTable';
import ProductChart from '@/components/charts/ProductChart';
import { Sale } from '@/types';

export default function SalesReportPage() {
  const [sales, setSales] = useState<Sale[]>([]);
  const [filteredSales, setFilteredSales] = useState<Sale[]>([]);
  const [category, setCategory] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      setLoading(true);
      const res = await fetch('/api/sales');
      const data = await res.json();
      setSales(data);
      setFilteredSales(data);
      setLoading(false);
    }
    fetchData();
  }, []);

  useEffect(() => {
    async function filterData() {
      const params = new URLSearchParams();
      if (category) params.set('category', category);

      const res = await fetch(`/api/sales?${params.toString()}`);
      const data = await res.json();
      setFilteredSales(data);
    }
    filterData();
  }, [category]);

  const columns = [
    { header: 'Date', accessor: 'date' as any },
    { header: 'Product ID', accessor: 'productId' as any },
    { header: 'Qty', accessor: 'quantity' as any },
    { header: 'Unit Price', accessor: 'unitPrice' as any },
    { header: 'Revenue', accessor: 'revenue' as any },
    { header: 'Profit', accessor: 'profit' as any },
  ];

  if (loading) return <div className="flex items-center justify-center h-screen">Loading...</div>;

  return (
    <div className="space-y-8">
      <div className="flex justify-between items-end">
        <div>
          <h1 className="text-3xl font-bold text-slate-900">Sales Reports</h1>
          <p className="text-slate-500">Detailed transaction analysis and product performance.</p>
        </div>
        <div className="flex gap-4">
          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="px-4 py-2 rounded-lg border border-slate-200 bg-white text-slate-700 outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="">All Categories</option>
            <option value="Electronics">Electronics</option>
            <option value="Furniture">Furniture</option>
          </select>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
          <DataTable columns={columns} data={filteredSales} />
        </div>
        <div className="lg:col-span-1">
          <ProductChart data={Object.values(filteredSales.reduce((acc: any, sale) => {
            if (!acc[sale.productId]) acc[sale.productId] = { productId: sale.productId, revenue: 0, profit: 0 };
            acc[sale.productId].revenue += sale.revenue;
            acc[sale.productId].profit += sale.profit;
            return acc;
          }, {}))}
          />

        </div>
      </div>
    </div>
  );
}
