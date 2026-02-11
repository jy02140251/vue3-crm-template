<template>
  <div class="data-table">
    <div class="table-toolbar" v-if="searchable || $slots.toolbar">
      <div class="search-box" v-if="searchable">
        <input
          v-model="searchQuery"
          type="text"
          :placeholder="searchPlaceholder"
          class="search-input"
          @input="onSearch"
        />
      </div>
      <slot name="toolbar" />
    </div>

    <div class="table-container">
      <table>
        <thead>
          <tr>
            <th
              v-for="col in columns"
              :key="col.key"
              :class="{ sortable: col.sortable }"
              :style="{ width: col.width }"
              @click="col.sortable && toggleSort(col.key)"
            >
              {{ col.label }}
              <span v-if="col.sortable && sortKey === col.key" class="sort-icon">
                {{ sortOrder === 'asc' ? '▲' : '▼' }}
              </span>
            </th>
            <th v-if="$slots.actions">Actions</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(row, index) in displayedData" :key="row.id || index">
            <td v-for="col in columns" :key="col.key">
              <slot :name="`cell-${col.key}`" :row="row" :value="row[col.key]">
                {{ formatCell(row[col.key], col) }}
              </slot>
            </td>
            <td v-if="$slots.actions">
              <slot name="actions" :row="row" />
            </td>
          </tr>
          <tr v-if="displayedData.length === 0">
            <td :colspan="columns.length + ($slots.actions ? 1 : 0)" class="empty-state">
              {{ emptyMessage }}
            </td>
          </tr>
        </tbody>
      </table>
    </div>

    <div class="table-footer" v-if="paginated">
      <span class="page-info">
        Showing {{ startIndex + 1 }}-{{ endIndex }} of {{ filteredData.length }}
      </span>
      <div class="pagination">
        <button @click="currentPage--" :disabled="currentPage <= 1">Prev</button>
        <span>Page {{ currentPage }} of {{ totalPages }}</span>
        <button @click="currentPage++" :disabled="currentPage >= totalPages">Next</button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, watch } from "vue";

interface Column {
  key: string;
  label: string;
  sortable?: boolean;
  width?: string;
  format?: (value: any) => string;
}

const props = withDefaults(defineProps<{
  columns: Column[];
  data: any[];
  searchable?: boolean;
  searchPlaceholder?: string;
  paginated?: boolean;
  pageSize?: number;
  emptyMessage?: string;
}>(), {
  searchable: false,
  searchPlaceholder: "Search...",
  paginated: true,
  pageSize: 10,
  emptyMessage: "No data available",
});

const searchQuery = ref("");
const sortKey = ref("");
const sortOrder = ref<"asc" | "desc">("asc");
const currentPage = ref(1);

const filteredData = computed(() => {
  let result = [...props.data];
  if (searchQuery.value) {
    const q = searchQuery.value.toLowerCase();
    result = result.filter((row) =>
      Object.values(row).some((val) => String(val).toLowerCase().includes(q))
    );
  }
  if (sortKey.value) {
    result.sort((a, b) => {
      const aVal = a[sortKey.value], bVal = b[sortKey.value];
      const cmp = aVal < bVal ? -1 : aVal > bVal ? 1 : 0;
      return sortOrder.value === "asc" ? cmp : -cmp;
    });
  }
  return result;
});

const totalPages = computed(() => Math.ceil(filteredData.value.length / props.pageSize));
const startIndex = computed(() => (currentPage.value - 1) * props.pageSize);
const endIndex = computed(() => Math.min(startIndex.value + props.pageSize, filteredData.value.length));
const displayedData = computed(() =>
  props.paginated ? filteredData.value.slice(startIndex.value, endIndex.value) : filteredData.value
);

function toggleSort(key: string) {
  if (sortKey.value === key) {
    sortOrder.value = sortOrder.value === "asc" ? "desc" : "asc";
  } else {
    sortKey.value = key;
    sortOrder.value = "asc";
  }
}

function onSearch() {
  currentPage.value = 1;
}

function formatCell(value: any, col: Column) {
  if (col.format) return col.format(value);
  return value ?? "-";
}

watch(() => props.data, () => { currentPage.value = 1; });
</script>