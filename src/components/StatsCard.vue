<!--
  StatsCard Component
  
  Reusable statistics card displaying a metric
  with icon, value, and optional trend indicator.
-->

<template>
  <div class="stats-card">
    <div class="stats-icon" :style="{ backgroundColor: color + '15', color: color }">
      <span v-html="icon"></span>
    </div>
    <div class="stats-content">
      <span class="stats-title">{{ title }}</span>
      <span class="stats-value">{{ displayValue }}</span>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue';

interface Props {
  /** Card title */
  title: string;
  /** Metric value (number or formatted string) */
  value: string | number;
  /** Icon HTML entity or emoji */
  icon?: string;
  /** Accent color for the icon */
  color?: string;
}

const props = withDefaults(defineProps<Props>(), {
  icon: '&#x1F4CA;',
  color: '#3b82f6',
});

const displayValue = computed(() => {
  if (typeof props.value === 'number') {
    return props.value.toLocaleString();
  }
  return props.value;
});
</script>

<style scoped>
.stats-card {
  background: white;
  border-radius: 12px;
  padding: 20px;
  display: flex;
  align-items: center;
  gap: 16px;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
  transition: transform 0.2s, box-shadow 0.2s;
}

.stats-card:hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
}

.stats-icon {
  width: 48px;
  height: 48px;
  border-radius: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 22px;
  flex-shrink: 0;
}

.stats-content {
  display: flex;
  flex-direction: column;
}

.stats-title {
  font-size: 13px;
  color: #6b7280;
  font-weight: 500;
}

.stats-value {
  font-size: 24px;
  font-weight: 700;
  color: #111827;
  margin-top: 2px;
}
</style>