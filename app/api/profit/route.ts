import { NextResponse } from 'next/server';
import { loadSales, loadProducts } from '@/lib/data-loader';
import { aggregateSalesByProduct } from '@/lib/calculations';

export async function GET() {
  try {
    const sales = await loadSales();
    const products = await loadProducts();

    const productProfits = aggregateSalesByProduct(sales);

    const profitByCategory = productProfits.map(pp => {
      const product = products.find(p => p.id === pp.productId);
      return {
        category: product?.category || 'Unknown',
        revenue: pp.revenue,
        profit: pp.profit,
      };
    }).reduce((acc, curr) => {
      if (!acc[curr.category]) {
        acc[curr.category] = { category: curr.category, revenue: 0, profit: 0 };
      }
      acc[curr.category].revenue += curr.revenue;
      acc[curr.category].profit += curr.profit;
      return acc;
    }, {} as Record<string, any>);

    return NextResponse.json({
      categoryAnalysis: Object.values(profitByCategory),
      totalProfit: sales.reduce((sum, s) => sum + s.profit, 0),
      totalRevenue: sales.reduce((sum, s) => sum + s.revenue, 0),
    });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
