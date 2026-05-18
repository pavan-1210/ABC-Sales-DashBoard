import { Sale, KPI } from '@/types';

export function calculateKPIs(sales: Sale[]): KPI {
  const totalSales = sales.reduce((sum, sale) => sum + sale.revenue, 0);
  const totalProfit = sales.reduce((sum, sale) => sum + sale.profit, 0);
  const profitMargin = totalSales > 0 ? (totalProfit / totalSales) * 100 : 0;

  // Growth rate: Compare last 30 days vs previous 30 days
  const now = new Date();
  const thirtyDaysAgo = new Date();
  thirtyDaysAgo.setDate(now.getDate() - 30);

  const sixtyDaysAgo = new Date();
  sixtyDaysAgo.setDate(now.getDate() - 60);

  const currentPeriodSales = sales
    .filter(sale => {
      const date = new Date(sale.date);
      return date >= thirtyDaysAgo && date <= now;
    })
    .reduce((sum, sale) => sum + sale.revenue, 0);

  const previousPeriodSales = sales
    .filter(sale => {
      const date = new Date(sale.date);
      return date >= sixtyDaysAgo && date < thirtyDaysAgo;
    })
    .reduce((sum, sale) => sum + sale.revenue, 0);

  const growthRate = previousPeriodSales > 0
    ? ((currentPeriodSales - previousPeriodSales) / previousPeriodSales) * 100
    : 0;

  return {
    totalSales,
    totalProfit,
    growthRate,
    profitMargin,
    period: 'Last 30 Days',
  };
}

export function aggregateSalesByDate(sales: Sale[]) {
  const aggregated: Record<string, number> = {};

  sales.forEach(sale => {
    aggregated[sale.date] = (aggregated[sale.date] || 0) + sale.revenue;
  });

  return Object.entries(aggregated)
    .map(([date, revenue]) => ({ date, revenue }))
    .sort((a, b) => a.date.localeCompare(b.date));
}

export function aggregateSalesByProduct(sales: Sale[]) {
  const aggregated: Record<string, { name: string, revenue: number, profit: number }> = {};

  sales.forEach(sale => {
    // We'd usually need products list here, but we can just use productId if we don't have the map
    // For now, we'll return IDs and the frontend can map or we can enhance this function.
    const id = sale.productId;
    if (!aggregated[id]) {
      aggregated[id] = { name: id, revenue: 0, profit: 0 };
    }
    aggregated[id].revenue += sale.revenue;
    aggregated[id].profit += sale.profit;
  });

  return Object.entries(aggregated).map(([id, data]) => ({
    productId: id,
    ...data
  }));
}
