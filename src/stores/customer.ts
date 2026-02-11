/**
 * Customer Pinia Store.
 *
 * Manages customer data state, CRUD operations,
 * and search/filter functionality.
 */

import { defineStore } from 'pinia';
import { ref, computed } from 'vue';
import { customerApi } from '@/api/customer';
import type { Customer, CustomerFilter, DashboardStats } from '@/types';

export const useCustomerStore = defineStore('customer', () => {
  // State
  const customers = ref<Customer[]>([]);
  const currentCustomer = ref<Customer | null>(null);
  const isLoading = ref(false);
  const error = ref<string | null>(null);
  const searchQuery = ref('');
  const statusFilter = ref<string>('all');

  // Getters
  const filteredCustomers = computed(() => {
    let result = customers.value;

    // Search filter
    if (searchQuery.value) {
      const query = searchQuery.value.toLowerCase();
      result = result.filter(
        (c) =>
          c.name.toLowerCase().includes(query) ||
          c.email.toLowerCase().includes(query) ||
          c.company.toLowerCase().includes(query)
      );
    }

    // Status filter
    if (statusFilter.value !== 'all') {
      result = result.filter((c) => c.status === statusFilter.value);
    }

    return result;
  });

  const dashboardStats = computed<DashboardStats>(() => {
    const total = customers.value.length;
    const active = customers.value.filter((c) => c.status === 'active').length;
    const totalRevenue = customers.value.reduce((sum, c) => sum + (c.totalSpent || 0), 0);
    const newThisMonth = customers.value.filter((c) => {
      const created = new Date(c.createdAt);
      const now = new Date();
      return created.getMonth() === now.getMonth() && created.getFullYear() === now.getFullYear();
    }).length;

    return { totalCustomers: total, activeCustomers: active, totalRevenue, newThisMonth };
  });

  // Actions
  async function fetchCustomers(): Promise<void> {
    isLoading.value = true;
    error.value = null;
    try {
      customers.value = await customerApi.getAll();
    } catch (e: any) {
      error.value = e.message || 'Failed to fetch customers';
    } finally {
      isLoading.value = false;
    }
  }

  async function fetchCustomerById(id: string): Promise<void> {
    isLoading.value = true;
    error.value = null;
    try {
      currentCustomer.value = await customerApi.getById(id);
    } catch (e: any) {
      error.value = e.message || 'Failed to fetch customer';
    } finally {
      isLoading.value = false;
    }
  }

  async function createCustomer(data: Partial<Customer>): Promise<Customer | null> {
    isLoading.value = true;
    error.value = null;
    try {
      const newCustomer = await customerApi.create(data);
      customers.value.push(newCustomer);
      return newCustomer;
    } catch (e: any) {
      error.value = e.message || 'Failed to create customer';
      return null;
    } finally {
      isLoading.value = false;
    }
  }

  async function updateCustomer(id: string, data: Partial<Customer>): Promise<boolean> {
    isLoading.value = true;
    error.value = null;
    try {
      const updated = await customerApi.update(id, data);
      const index = customers.value.findIndex((c) => c.id === id);
      if (index >= 0) {
        customers.value[index] = updated;
      }
      if (currentCustomer.value?.id === id) {
        currentCustomer.value = updated;
      }
      return true;
    } catch (e: any) {
      error.value = e.message || 'Failed to update customer';
      return false;
    } finally {
      isLoading.value = false;
    }
  }

  async function deleteCustomer(id: string): Promise<boolean> {
    isLoading.value = true;
    error.value = null;
    try {
      await customerApi.delete(id);
      customers.value = customers.value.filter((c) => c.id !== id);
      return true;
    } catch (e: any) {
      error.value = e.message || 'Failed to delete customer';
      return false;
    } finally {
      isLoading.value = false;
    }
  }

  function setSearchQuery(query: string): void {
    searchQuery.value = query;
  }

  function setStatusFilter(status: string): void {
    statusFilter.value = status;
  }

  return {
    // State
    customers,
    currentCustomer,
    isLoading,
    error,
    searchQuery,
    statusFilter,
    // Getters
    filteredCustomers,
    dashboardStats,
    // Actions
    fetchCustomers,
    fetchCustomerById,
    createCustomer,
    updateCustomer,
    deleteCustomer,
    setSearchQuery,
    setStatusFilter,
  };
});