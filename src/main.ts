/**
 * Vue 3 CRM Application Entry Point.
 *
 * Creates the Vue app instance, registers plugins
 * (Router, Pinia), and mounts to the DOM.
 */

import { createApp } from 'vue';
import { createPinia } from 'pinia';
import App from './App.vue';
import router from './router';

// Create Vue application
const app = createApp(App);

// Register plugins
const pinia = createPinia();
app.use(pinia);
app.use(router);

// Mount application
app.mount('#app');

console.log('[CRM] Application initialized');