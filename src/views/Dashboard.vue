<!--
  Dashboard View
  
  Displays key CRM metrics in statistics cards
  and a recent customers table.
-->

<template>
  <div class="dashboard">
    <header class="page-header">
      <h1>Dashboard</h1>
      <p class="page-subtitle">Overview of your CRM metrics</p>
    </header>

    <!-- Stats Cards -->
    <div class="stats-grid">
      <StatsCard
        title="Total Customers"
        :value="stats.totalCustomers"
        icon="&#x1F465;"
        color="#3b82f6"
      />
      <StatsCard
        title="Active Customers"
        :value="stats.activeCustomers"
        icon="&#x2705;"
        color="#10b981"
      />
      <StatsCard
        title="Revenue"
        :value="formatCurrency(stats.totalRevenue)"
        icon="&#x1F4B0;"
        color="#f59e0b"
      />
      <StatsCard
        title="New This Month"
        :value="stats.newThisMonth"
        icon="&#x1F195;"
        color="#8b5cf6"
      />
    </div>

    <!-- Recent Customers -->
    <section class="recent-section">
      <h2>Recent Customers</h2>
      <div class="table-container">
        <table class="data-table">
          <thead>
            <tr>
              <th>Name</th>
              <th>Email</th>
              <th>Company</th>
              <th>Status</th>
              <th>Total Spent</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="customer in recentCustomers" :key="customer.id">
              <td>
                <router-link :to="`/customers/${customer.id}`" class="customer-link">
                  {{ customer.name }}
                </router-link>
              </td>
              <td>{{ customer.email }}</td>
              <td>{{ customer.company }}</td>
              <td>
                <span :class="['status-badge', `status-${customer.status}`]">
                  {{ customer.status }}
                </span>
              </td>
              <td>{{ formatCurrency(customer.totalSpent || 0) }}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
import { computed, onMounted } from 'vue';
import { useCustomerStore } from '@/stores/customer';
import StatsCard from '@/components/StatsCard.vue';

const store = useCustomerStore();

const stats = computed(() => store.dashboardStats);

const recentCustomers = computed(() =>
  [...store.customers]
    .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
    .slice(0, 5)
);

function formatCurrency(value: number): string {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 0,
  }).format(value);
}

onMounted(() => {
  store.fetchCustomers();
});
</script>

<style scoped>
.dashboard {
  max-width: 1200px;
}

.page-header {
  margin-bottom: 24px;
}

.page-header h1 {
  font-size: 28px;
  font-weight: 700;
}

.page-subtitle {
  color: #6b7280;
  margin-top: 4px;
}

.stats-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));
  gap: 16px;
  margin-bottom: 32px;
}

.recent-section {
  background: white;
  border-radius: 12px;
  padding: 24px;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
}

.recent-section h2 {
  font-size: 18px;
  margin-bottom: 16px;
}

.table-container {
  overflow-x: auto;
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
}

.customer-link {
  color: #3b82f6;
  text-decoration: none;
  font-weight: 500;
}

.customer-link:hover {
  text-decoration: underline;
}

.status-badge {
  padding: 4px 10px;
  border-radius: 20px;
  font-size: 12px;
  font-weight: 600;
  text-transform: capitalize;
}

.status-active {
  background: #d1fae5;
  color: #065f46;
}

.status-inactive {
  background: #fee2e2;
  color: #991b1b;
}

.status-lead {
  background: #dbeafe;
  color: #1e40af;
}
</style>