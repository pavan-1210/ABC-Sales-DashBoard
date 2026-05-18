import { NextResponse } from 'next/server';
import { loadSales } from '@/lib/data-loader';
import { calculateKPIs } from '@/lib/calculations';

export async function GET() {
  try {
    const sales = await loadSales();
    const kpis = calculateKPIs(sales);
    return NextResponse.json(kpis);
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
