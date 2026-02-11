import { getAuthHeaders } from "./auth";

const API_BASE = import.meta.env.VITE_API_BASE_URL || "/api";

export interface DashboardStats {
  totalCustomers: number;
  activeDeals: number;
  revenue: number;
  conversionRate: number;
  newCustomersThisMonth: number;
  revenueGrowth: number;
}

export interface ChartDataPoint {
  label: string;
  value: number;
}

export interface SalesFunnel {
  stage: string;
  count: number;
  percentage: number;
}

export async function getDashboardStats(): Promise<DashboardStats> {
  const response = await fetch(`${API_BASE}/analytics/dashboard`, {
    headers: getAuthHeaders(),
  });
  if (!response.ok) throw new Error("Failed to fetch dashboard stats");
  return response.json();
}

export async function getRevenueChart(
  period: "week" | "month" | "quarter" | "year" = "month"
): Promise<ChartDataPoint[]> {
  const response = await fetch(`${API_BASE}/analytics/revenue?period=${period}`, {
    headers: getAuthHeaders(),
  });
  if (!response.ok) throw new Error("Failed to fetch revenue data");
  return response.json();
}

export async function getSalesFunnel(): Promise<SalesFunnel[]> {
  const response = await fetch(`${API_BASE}/analytics/funnel`, {
    headers: getAuthHeaders(),
  });
  if (!response.ok) throw new Error("Failed to fetch funnel data");
  return response.json();
}

export async function getCustomerGrowth(months: number = 12): Promise<ChartDataPoint[]> {
  const response = await fetch(`${API_BASE}/analytics/customer-growth?months=${months}`, {
    headers: getAuthHeaders(),
  });
  if (!response.ok) throw new Error("Failed to fetch growth data");
  return response.json();
}