import { NextResponse } from 'next/server';
import { loadSales, loadProducts } from '@/lib/data-loader';

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const category = searchParams.get('category');
    const startDate = searchParams.get('startDate');
    const endDate = searchParams.get('endDate');

    const sales = await loadSales();
    const products = await loadProducts();

    let filteredSales = sales;

    if (category) {
      const productIdsInCategory = products
        .filter(p => p.category === category)
        .map(p => p.id);
      filteredSales = filteredSales.filter(s => productIdsInCategory.includes(s.productId));
    }

    if (startDate) {
      filteredSales = filteredSales.filter(s => s.date >= startDate);
    }

    if (endDate) {
      filteredSales = filteredSales.filter(s => s.date <= endDate);
    }

    return NextResponse.json(filteredSales);
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
