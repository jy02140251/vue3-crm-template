<!--
  App.vue - Root Application Component
  
  Provides the main layout with navigation sidebar
  and router-view for page content.
-->

<template>
  <div id="crm-app" class="app-container">
    <!-- Sidebar Navigation -->
    <aside class="sidebar">
      <div class="sidebar-header">
        <h1 class="logo">CRM</h1>
        <span class="logo-subtitle">Customer Manager</span>
      </div>
      
      <nav class="sidebar-nav">
        <router-link to="/" class="nav-item" active-class="nav-active">
          <span class="nav-icon">&#x1F4CA;</span>
          <span class="nav-text">Dashboard</span>
        </router-link>
        <router-link to="/customers" class="nav-item" active-class="nav-active">
          <span class="nav-icon">&#x1F465;</span>
          <span class="nav-text">Customers</span>
        </router-link>
      </nav>
    </aside>

    <!-- Main Content -->
    <main class="main-content">
      <router-view v-slot="{ Component }">
        <transition name="fade" mode="out-in">
          <component :is="Component" />
        </transition>
      </router-view>
    </main>
  </div>
</template>

<script setup lang="ts">
// Root component - layout only, no logic needed
</script>

<style>
/* Global Styles */
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

body {
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
  background: #f0f2f5;
  color: #1f2937;
}

.app-container {
  display: flex;
  min-height: 100vh;
}

/* Sidebar */
.sidebar {
  width: 240px;
  background: #1e293b;
  color: #e2e8f0;
  display: flex;
  flex-direction: column;
  position: fixed;
  height: 100vh;
}

.sidebar-header {
  padding: 24px 20px;
  border-bottom: 1px solid #334155;
}

.logo {
  font-size: 24px;
  font-weight: 700;
  color: #3b82f6;
}

.logo-subtitle {
  font-size: 12px;
  color: #94a3b8;
}

.sidebar-nav {
  padding: 16px 0;
  flex: 1;
}

.nav-item {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 12px 20px;
  color: #cbd5e1;
  text-decoration: none;
  transition: all 0.2s;
  font-size: 14px;
}

.nav-item:hover {
  background: #334155;
  color: #ffffff;
}

.nav-active {
  background: #1e40af;
  color: #ffffff;
}

.nav-icon {
  font-size: 18px;
}

/* Main Content */
.main-content {
  flex: 1;
  margin-left: 240px;
  padding: 24px;
}

/* Transitions */
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.2s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>