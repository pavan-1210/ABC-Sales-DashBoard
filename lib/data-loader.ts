import fs from 'fs';
import path from 'path';
import Papa from 'papaparse';
import { Product, Sale } from '@/types';

const DATA_DIR = path.join(process.cwd(), 'data');

export async function loadProducts(): Promise<Product[]> {
  const filePath = path.join(DATA_DIR, 'products.json');
  const content = fs.readFileSync(filePath, 'utf8');
  return JSON.parse(content);
}

export async function loadSales(): Promise<Sale[]> {
  const filePath = path.join(DATA_DIR, 'sales_data.csv');
  const csvContent = fs.readFileSync(filePath, 'utf8');

  const parsed = Papa.parse(csvContent, {
    header: true,
    dynamicTyping: true,
    skipEmptyLines: true,
  });

  const products = await loadProducts();

  return parsed.data.map((row: any, index: number) => {
    const product = products.find(p => p.id === row.productId);
    if (!product) {
      throw new Error(`Product with ID ${row.productId} not found for sale at index ${index}`);
    }

    const quantity = row.quantity;
    const unitPrice = product.sellingPrice;
    const revenue = quantity * unitPrice;
    const cost = quantity * product.costPrice;
    const profit = revenue - cost;

    return {
      id: `sale-${index}`,
      date: row.date,
      productId: row.productId,
      quantity,
      unitPrice,
      revenue,
      cost,
      profit,
    };
  });
}
