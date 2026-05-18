"use client";

import React, { useState, useEffect } from 'react';
import ProfitChart from '@/components/charts/ProfitChart';
import MetricCard from '@/components/ui/MetricCard';

export default function ProfitReportPage() {
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      setLoading(true);
      const res = await fetch('/api/profit');
      const result = await res.json();
      setData(result);
      setLoading(false);
    }
    fetchData();
  }, []);

  if (loading) return <div className="flex items-center justify-center h-screen">Loading...</div>;

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-slate-900">Profit Analysis</h1>
        <p className="text-slate-500">Detailed analysis of profit margins and category performance.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <MetricCard
          title="Total Net Profit"
          value={`$${data.totalProfit.toLocaleString()}`}
          change="+8.2%"
          isPositive={true}
          description="Net earnings after all expenses"
        />
        <MetricCard
          title="Overall Revenue"
          value={`$${data.totalRevenue.toLocaleString()}`}
          change="+10.1%"
          isPositive={true}
          description="Gross sales volume"
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <ProfitChart data={data.categoryAnalysis} />
        <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
          <h3 className="text-lg font-bold text-slate-900 mb-4">Category Breakdown</h3>
          <div className="space-y-4">
            {data.categoryAnalysis.map((cat: any) => (
              <div key={cat.category} className="flex items-center justify-between p-3 rounded-lg bg-slate-50">
                <span className="font-medium text-slate-700">{cat.category}</span>
                <div className="text-right">
                  <div className="font-bold text-slate-900">${cat.profit.toLocaleString()}</div>
                  <div className="text-xs text-slate-500">
                    Margin: {((cat.profit / cat.revenue) * 100).toFixed(1)}%
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
