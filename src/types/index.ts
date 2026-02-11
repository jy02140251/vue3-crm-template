/**
 * TypeScript Type Definitions for CRM Template.
 *
 * Centralized interfaces and types used across
 * components, stores, and API modules.
 */

/** Customer entity */
export interface Customer {
  id: string;
  name: string;
  email: string;
  company: string;
  phone?: string;
  status: 'active' | 'inactive' | 'lead';
  totalSpent?: number;
  address?: string;
  notes?: string;
  createdAt: string;
  updatedAt: string;
}

/** Dashboard aggregated statistics */
export interface DashboardStats {
  totalCustomers: number;
  activeCustomers: number;
  totalRevenue: number;
  newThisMonth: number;
}

/** Customer list filter options */
export interface CustomerFilter {
  search?: string;
  status?: string;
  sortBy?: 'name' | 'createdAt' | 'totalSpent';
  sortOrder?: 'asc' | 'desc';
  page?: number;
  perPage?: number;
}

/** API pagination response */
export interface PaginatedResponse<T> {
  items: T[];
  total: number;
  page: number;
  perPage: number;
  totalPages: number;
}

/** Customer activity log entry */
export interface ActivityEntry {
  id: string;
  customerId: string;
  type: 'note' | 'email' | 'call' | 'meeting' | 'deal';
  description: string;
  createdAt: string;
  createdBy: string;
}