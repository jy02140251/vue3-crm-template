<template>
  <aside class="side-nav" :class="{ collapsed: isCollapsed }">
    <div class="nav-header">
      <h2 v-if="!isCollapsed" class="brand">CRM Pro</h2>
      <button class="toggle-btn" @click="toggleCollapse">
        {{ isCollapsed ? '→' : '←' }}
      </button>
    </div>

    <nav class="nav-menu">
      <router-link
        v-for="item in menuItems"
        :key="item.path"
        :to="item.path"
        class="nav-item"
        :class="{ active: isActive(item.path) }"
      >
        <span class="nav-icon">{{ item.icon }}</span>
        <span v-if="!isCollapsed" class="nav-label">{{ item.label }}</span>
        <span v-if="!isCollapsed && item.badge" class="nav-badge">{{ item.badge }}</span>
      </router-link>
    </nav>

    <div class="nav-footer" v-if="!isCollapsed">
      <div class="user-info">
        <div class="user-avatar">{{ userInitials }}</div>
        <div class="user-details">
          <div class="user-name">{{ userName }}</div>
          <div class="user-role">{{ userRole }}</div>
        </div>
      </div>
      <button class="logout-btn" @click="$emit('logout')">Logout</button>
    </div>
  </aside>
</template>

<script setup lang="ts">
import { ref, computed } from "vue";
import { useRoute } from "vue-router";

interface MenuItem {
  path: string;
  label: string;
  icon: string;
  badge?: number;
}

const props = withDefaults(defineProps<{
  userName?: string;
  userRole?: string;
}>(), {
  userName: "User",
  userRole: "Admin",
});

defineEmits<{ logout: [] }>();

const route = useRoute();
const isCollapsed = ref(false);

const menuItems: MenuItem[] = [
  { path: "/", label: "Dashboard", icon: "📊" },
  { path: "/customers", label: "Customers", icon: "👥" },
  { path: "/deals", label: "Deals", icon: "💰" },
  { path: "/tasks", label: "Tasks", icon: "✅", badge: 3 },
  { path: "/reports", label: "Reports", icon: "📈" },
  { path: "/settings", label: "Settings", icon: "⚙️" },
];

const userInitials = computed(() =>
  props.userName.split(" ").map((n) => n[0]).join("").toUpperCase().slice(0, 2)
);

function isActive(path: string): boolean {
  return route.path === path;
}

function toggleCollapse() {
  isCollapsed.value = !isCollapsed.value;
}
</script>