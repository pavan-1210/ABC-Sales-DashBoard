import MetricCard from '@/components/ui/MetricCard';
import RevenueChart from '@/components/charts/RevenueChart';
import { loadSales } from '@/lib/data-loader';
import { calculateKPIs, aggregateSalesByDate } from '@/lib/calculations';

export default async function DashboardPage() {
  const sales = await loadSales();
  const kpis = calculateKPIs(sales);
  const trendData = aggregateSalesByDate(sales);

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-slate-900">Executive Dashboard</h1>
        <p className="text-slate-500">Company performance overview and real-time metrics.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <MetricCard
          title="Total Revenue"
          value={`$${kpis.totalSales.toLocaleString()}`}
          change={`${kpis.growthRate.toFixed(1)}%`}
          isPositive={kpis.growthRate >= 0}
          description="Across all product categories"
        />
        <MetricCard
          title="Net Profit"
          value={`$${kpis.totalProfit.toLocaleString()}`}
          change="+12.5%"
          isPositive={true}
          description="Actual profit after costs"
        />
        <MetricCard
          title="Profit Margin"
          value={`${kpis.profitMargin.toFixed(1)}%`}
          change="+2.1%"
          isPositive={true}
          description="Average margin across sales"
        />
        <MetricCard
          title="Active Products"
          value="7"
          change="0%"
          isPositive={true}
          description="Total SKU catalog size"
        />
      </div>

      <div className="grid grid-cols-1 gap-6">
        <RevenueChart data={trendData} />
      </div>
    </div>
  );
}
