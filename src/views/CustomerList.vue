<!--
  CustomerList View
  
  Displays a searchable and filterable table of all customers
  with add, edit, and delete actions.
-->

<template>
  <div class="customer-list">
    <header class="page-header">
      <h1>Customers</h1>
      <button class="btn btn-primary" @click="showAddModal = true">
        + Add Customer
      </button>
    </header>

    <!-- Filters -->
    <div class="filters-bar">
      <input
        v-model="searchInput"
        type="text"
        placeholder="Search by name, email, or company..."
        class="search-input"
        @input="handleSearch"
      />
      <select v-model="selectedStatus" class="status-select" @change="handleStatusFilter">
        <option value="all">All Status</option>
        <option value="active">Active</option>
        <option value="inactive">Inactive</option>
        <option value="lead">Lead</option>
      </select>
    </div>

    <!-- Loading State -->
    <div v-if="store.isLoading" class="loading">Loading customers...</div>

    <!-- Customer Table -->
    <div v-else class="table-container">
      <table class="data-table">
        <thead>
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Company</th>
            <th>Phone</th>
            <th>Status</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="customer in store.filteredCustomers" :key="customer.id">
            <td>
              <router-link :to="`/customers/${customer.id}`" class="customer-link">
                {{ customer.name }}
              </router-link>
            </td>
            <td>{{ customer.email }}</td>
            <td>{{ customer.company }}</td>
            <td>{{ customer.phone || '-' }}</td>
            <td>
              <span :class="['status-badge', `status-${customer.status}`]">
                {{ customer.status }}
              </span>
            </td>
            <td>
              <div class="actions">
                <router-link :to="`/customers/${customer.id}`" class="action-btn">
                  View
                </router-link>
                <button class="action-btn action-delete" @click="handleDelete(customer.id)">
                  Delete
                </button>
              </div>
            </td>
          </tr>
        </tbody>
      </table>

      <div v-if="store.filteredCustomers.length === 0" class="empty-state">
        <p>No customers found matching your criteria.</p>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { useCustomerStore } from '@/stores/customer';

const store = useCustomerStore();
const searchInput = ref('');
const selectedStatus = ref('all');
const showAddModal = ref(false);

function handleSearch(): void {
  store.setSearchQuery(searchInput.value);
}

function handleStatusFilter(): void {
  store.setStatusFilter(selectedStatus.value);
}

async function handleDelete(id: string): Promise<void> {
  if (confirm('Are you sure you want to delete this customer?')) {
    await store.deleteCustomer(id);
  }
}

onMounted(() => {
  if (store.customers.length === 0) {
    store.fetchCustomers();
  }
});
</script>

<style scoped>
.customer-list {
  max-width: 1200px;
}

.page-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 24px;
}

.page-header h1 {
  font-size: 28px;
  font-weight: 700;
}

.btn {
  padding: 10px 20px;
  border: none;
  border-radius: 8px;
  font-size: 14px;
  font-weight: 600;
  cursor: pointer;
  transition: background 0.2s;
}

.btn-primary {
  background: #3b82f6;
  color: white;
}

.btn-primary:hover {
  background: #2563eb;
}

.filters-bar {
  display: flex;
  gap: 12px;
  margin-bottom: 20px;
}

.search-input {
  flex: 1;
  padding: 10px 16px;
  border: 1px solid #d1d5db;
  border-radius: 8px;
  font-size: 14px;
  outline: none;
}

.search-input:focus {
  border-color: #3b82f6;
  box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.1);
}

.status-select {
  padding: 10px 16px;
  border: 1px solid #d1d5db;
  border-radius: 8px;
  font-size: 14px;
  background: white;
  cursor: pointer;
}

.table-container {
  background: white;
  border-radius: 12px;
  overflow: hidden;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
}

.data-table {
  width: 100%;
  border-collapse: collapse;
}

.data-table th,
.data-table td {
  padding: 12px 16px;
  text-align: left;
  border-bottom: 1px solid #e5e7eb;
}

.data-table th {
  font-weight: 600;
  font-size: 13px;
  color: #6b7280;
  text-transform: uppercase;
  background: #f9fafb;
}

.customer-link {
  color: #3b82f6;
  text-decoration: none;
  font-weight: 500;
}

.status-badge {
  padding: 4px 10px;
  border-radius: 20px;
  font-size: 12px;
  font-weight: 600;
}

.status-active { background: #d1fae5; color: #065f46; }
.status-inactive { background: #fee2e2; color: #991b1b; }
.status-lead { background: #dbeafe; color: #1e40af; }

.actions {
  display: flex;
  gap: 8px;
}

.action-btn {
  padding: 4px 12px;
  border: 1px solid #d1d5db;
  border-radius: 6px;
  background: white;
  font-size: 13px;
  cursor: pointer;
  text-decoration: none;
  color: #374151;
}

.action-delete {
  color: #dc2626;
  border-color: #fca5a5;
}

.empty-state {
  padding: 40px;
  text-align: center;
  color: #6b7280;
}

.loading {
  text-align: center;
  padding: 40px;
  color: #6b7280;
}
</style>