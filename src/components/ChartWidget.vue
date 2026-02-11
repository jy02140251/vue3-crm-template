<template>
  <div class="chart-widget" :class="`chart-${type}`">
    <div class="chart-header">
      <h3 class="chart-title">{{ title }}</h3>
      <div class="chart-actions" v-if="periods">
        <button
          v-for="p in periods"
          :key="p"
          :class="{ active: selectedPeriod === p }"
          @click="selectPeriod(p)"
          class="period-btn"
        >
          {{ p }}
        </button>
      </div>
    </div>

    <div class="chart-body">
      <div v-if="loading" class="chart-loading">Loading...</div>
      <div v-else-if="type === 'bar'" class="bar-chart">
        <div
          v-for="(item, idx) in data"
          :key="idx"
          class="bar-item"
        >
          <div class="bar-label">{{ item.label }}</div>
          <div class="bar-track">
            <div
              class="bar-fill"
              :style="{ width: getBarWidth(item.value) + '%', backgroundColor: color }"
            />
          </div>
          <div class="bar-value">{{ formatValue(item.value) }}</div>
        </div>
      </div>

      <div v-else-if="type === 'line'" class="line-chart">
        <svg :viewBox="`0 0 ${data.length * 60} 200`" class="line-svg">
          <polyline
            :points="linePoints"
            fill="none"
            :stroke="color"
            stroke-width="2"
            stroke-linejoin="round"
          />
          <circle
            v-for="(point, idx) in svgPoints"
            :key="idx"
            :cx="point.x"
            :cy="point.y"
            r="4"
            :fill="color"
          />
        </svg>
        <div class="line-labels">
          <span v-for="item in data" :key="item.label">{{ item.label }}</span>
        </div>
      </div>
    </div>

    <div class="chart-footer" v-if="$slots.footer">
      <slot name="footer" />
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from "vue";

interface DataPoint {
  label: string;
  value: number;
}

const props = withDefaults(defineProps<{
  title: string;
  type?: "bar" | "line";
  data: DataPoint[];
  color?: string;
  periods?: string[];
  loading?: boolean;
  valuePrefix?: string;
}>(), {
  type: "bar",
  color: "#4F46E5",
  loading: false,
  valuePrefix: "",
});

const emit = defineEmits<{ periodChange: [period: string] }>();
const selectedPeriod = ref(props.periods?.[0] || "");

const maxValue = computed(() => Math.max(...props.data.map((d) => d.value), 1));

function getBarWidth(value: number): number {
  return (value / maxValue.value) * 100;
}

function formatValue(value: number): string {
  if (value >= 1_000_000) return `${props.valuePrefix}${(value / 1_000_000).toFixed(1)}M`;
  if (value >= 1_000) return `${props.valuePrefix}${(value / 1_000).toFixed(1)}K`;
  return `${props.valuePrefix}${value}`;
}

const svgPoints = computed(() => {
  const step = 60;
  return props.data.map((d, i) => ({
    x: i * step + 30,
    y: 180 - (d.value / maxValue.value) * 160,
  }));
});

const linePoints = computed(() => svgPoints.value.map((p) => `${p.x},${p.y}`).join(" "));

function selectPeriod(period: string) {
  selectedPeriod.value = period;
  emit("periodChange", period);
}
</script>