/**
 * Customer API Client.
 *
 * Axios-based HTTP client for customer CRUD operations.
 * Communicates with the backend REST API.
 */

import axios, { type AxiosInstance } from 'axios';
import type { Customer } from '@/types';

/** Create a configured Axios instance */
const apiClient: AxiosInstance = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL || '/api',
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor for auth token
apiClient.interceptors.request.use((config) => {
  const token = localStorage.getItem('auth_token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Response interceptor for error handling
apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem('auth_token');
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

/**
 * Customer API methods for CRUD operations.
 */
export const customerApi = {
  /**
   * Fetch all customers.
   */
  async getAll(): Promise<Customer[]> {
    // For demo: return mock data if API unavailable
    try {
      const { data } = await apiClient.get<Customer[]>('/customers');
      return data;
    } catch {
      return getMockCustomers();
    }
  },

  /**
   * Fetch a single customer by ID.
   */
  async getById(id: string): Promise<Customer> {
    try {
      const { data } = await apiClient.get<Customer>(`/customers/${id}`);
      return data;
    } catch {
      const mock = getMockCustomers().find((c) => c.id === id);
      if (!mock) throw new Error('Customer not found');
      return mock;
    }
  },

  /**
   * Create a new customer.
   */
  async create(customer: Partial<Customer>): Promise<Customer> {
    const { data } = await apiClient.post<Customer>('/customers', customer);
    return data;
  },

  /**
   * Update an existing customer.
   */
  async update(id: string, customer: Partial<Customer>): Promise<Customer> {
    const { data } = await apiClient.put<Customer>(`/customers/${id}`, customer);
    return data;
  },

  /**
   * Delete a customer.
   */
  async delete(id: string): Promise<void> {
    await apiClient.delete(`/customers/${id}`);
  },
};

/** Mock customer data for development */
function getMockCustomers(): Customer[] {
  return [
    {
      id: '1',
      name: 'Alice Johnson',
      email: 'alice@techcorp.com',
      company: 'TechCorp Inc.',
      phone: '+1-555-0101',
      status: 'active',
      totalSpent: 45200,
      address: '123 Tech Blvd, San Francisco, CA',
      notes: 'Enterprise client, interested in premium plan.',
      createdAt: '2024-01-15T10:00:00Z',
      updatedAt: '2024-12-01T14:30:00Z',
    },
    {
      id: '2',
      name: 'Bob Martinez',
      email: 'bob@designstudio.io',
      company: 'Design Studio',
      phone: '+1-555-0102',
      status: 'active',
      totalSpent: 28900,
      address: '456 Creative Ave, New York, NY',
      notes: 'Renewed contract for 2025.',
      createdAt: '2024-03-22T09:00:00Z',
      updatedAt: '2024-11-15T11:00:00Z',
    },
    {
      id: '3',
      name: 'Carol Chen',
      email: 'carol@startup.co',
      company: 'Startup Co',
      phone: '+1-555-0103',
      status: 'lead',
      totalSpent: 0,
      address: '789 Innovation Dr, Austin, TX',
      notes: 'Initial contact via conference. Schedule demo.',
      createdAt: '2025-01-05T16:00:00Z',
      updatedAt: '2025-01-05T16:00:00Z',
    },
    {
      id: '4',
      name: 'David Kim',
      email: 'david@enterprise.com',
      company: 'Enterprise Solutions',
      phone: '+1-555-0104',
      status: 'inactive',
      totalSpent: 12400,
      address: '321 Business Park, Chicago, IL',
      notes: 'Contract expired. Follow up for renewal.',
      createdAt: '2023-08-10T08:00:00Z',
      updatedAt: '2024-08-10T08:00:00Z',
    },
    {
      id: '5',
      name: 'Emily Davis',
      email: 'emily@globalretail.com',
      company: 'Global Retail',
      phone: '+1-555-0105',
      status: 'active',
      totalSpent: 67800,
      address: '555 Commerce St, Seattle, WA',
      notes: 'Top-tier client. VIP support.',
      createdAt: '2023-05-20T12:00:00Z',
      updatedAt: '2025-01-20T09:00:00Z',
    },
  ];
}