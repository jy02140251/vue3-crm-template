<!--
  CustomerDetail View
  
  Displays detailed customer information including
  contact details, activity timeline, and notes.
-->

<template>
  <div class="customer-detail">
    <!-- Back Button -->
    <router-link to="/customers" class="back-link">
      &larr; Back to Customers
    </router-link>

    <div v-if="store.isLoading" class="loading">Loading customer details...</div>

    <template v-else-if="customer">
      <!-- Header -->
      <header class="detail-header">
        <div class="customer-info">
          <div class="avatar">{{ customer.name.charAt(0).toUpperCase() }}</div>
          <div>
            <h1>{{ customer.name }}</h1>
            <p class="company">{{ customer.company }}</p>
          </div>
        </div>
        <span :class="['status-badge', `status-${customer.status}`]">
          {{ customer.status }}
        </span>
      </header>

      <!-- Content Grid -->
      <div class="detail-grid">
        <!-- Contact Information -->
        <section class="detail-card">
          <h2>Contact Information</h2>
          <div class="info-list">
            <div class="info-item">
              <span class="info-label">Email</span>
              <span class="info-value">{{ customer.email }}</span>
            </div>
            <div class="info-item">
              <span class="info-label">Phone</span>
              <span class="info-value">{{ customer.phone || 'Not provided' }}</span>
            </div>
            <div class="info-item">
              <span class="info-label">Company</span>
              <span class="info-value">{{ customer.company }}</span>
            </div>
            <div class="info-item">
              <span class="info-label">Address</span>
              <span class="info-value">{{ customer.address || 'Not provided' }}</span>
            </div>
          </div>
        </section>

        <!-- Financial Summary -->
        <section class="detail-card">
          <h2>Financial Summary</h2>
          <div class="info-list">
            <div class="info-item">
              <span class="info-label">Total Spent</span>
              <span class="info-value highlight">{{ formatCurrency(customer.totalSpent || 0) }}</span>
            </div>
            <div class="info-item">
              <span class="info-label">Customer Since</span>
              <span class="info-value">{{ formatDate(customer.createdAt) }}</span>
            </div>
            <div class="info-item">
              <span class="info-label">Last Updated</span>
              <span class="info-value">{{ formatDate(customer.updatedAt) }}</span>
            </div>
          </div>
        </section>

        <!-- Notes -->
        <section class="detail-card full-width">
          <h2>Notes</h2>
          <p class="notes-text">{{ customer.notes || 'No notes added yet.' }}</p>
        </section>
      </div>
    </template>

    <div v-else class="error-state">
      <p>Customer not found.</p>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, onMounted } from 'vue';
import { useRoute } from 'vue-router';
import { useCustomerStore } from '@/stores/customer';

const route = useRoute();
const store = useCustomerStore();

const customer = computed(() => store.currentCustomer);

function formatCurrency(value: number): string {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 0,
  }).format(value);
}

function formatDate(dateStr: string): string {
  return new Date(dateStr).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
}

onMounted(() => {
  const id = route.params.id as string;
  store.fetchCustomerById(id);
});
</script>

<style scoped>
.customer-detail {
  max-width: 1000px;
}

.back-link {
  color: #3b82f6;
  text-decoration: none;
  font-size: 14px;
  display: inline-block;
  margin-bottom: 16px;
}

.back-link:hover {
  text-decoration: underline;
}

.detail-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  background: white;
  padding: 24px;
  border-radius: 12px;
  margin-bottom: 20px;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
}

.customer-info {
  display: flex;
  align-items: center;
  gap: 16px;
}

.avatar {
  width: 56px;
  height: 56px;
  border-radius: 50%;
  background: #3b82f6;
  color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 24px;
  font-weight: 700;
}

.detail-header h1 {
  font-size: 24px;
  font-weight: 700;
}

.company {
  color: #6b7280;
  font-size: 14px;
}

.status-badge {
  padding: 6px 14px;
  border-radius: 20px;
  font-size: 13px;
  font-weight: 600;
}

.status-active { background: #d1fae5; color: #065f46; }
.status-inactive { background: #fee2e2; color: #991b1b; }
.status-lead { background: #dbeafe; color: #1e40af; }

.detail-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 20px;
}

.detail-card {
  background: white;
  border-radius: 12px;
  padding: 24px;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
}

.full-width {
  grid-column: 1 / -1;
}

.detail-card h2 {
  font-size: 16px;
  font-weight: 600;
  margin-bottom: 16px;
  color: #374151;
}

.info-list {
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.info-item {
  display: flex;
  justify-content: space-between;
  padding-bottom: 8px;
  border-bottom: 1px solid #f3f4f6;
}

.info-label {
  font-size: 14px;
  color: #6b7280;
}

.info-value {
  font-size: 14px;
  font-weight: 500;
}

.highlight {
  color: #059669;
  font-size: 18px;
  font-weight: 700;
}

.notes-text {
  color: #4b5563;
  line-height: 1.6;
}

.loading, .error-state {
  text-align: center;
  padding: 40px;
  color: #6b7280;
}
</style>