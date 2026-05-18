export interface Sale {
  id: string;
  date: string;
  productId: string;
  quantity: number;
  unitPrice: number;
  revenue: number;
  cost: number;
  profit: number;
}

export interface Product {
  id: string;
  name: string;
  category: string;
  costPrice: number;
  sellingPrice: number;
}

export interface KPI {
  totalSales: number;
  totalProfit: number;
  growthRate: number;
  profitMargin: number;
  period: string;
}
