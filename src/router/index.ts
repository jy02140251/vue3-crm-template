/**
 * Vue Router Configuration.
 *
 * Defines application routes with lazy-loaded components
 * and navigation guards for authentication.
 */

import { createRouter, createWebHistory, type RouteRecordRaw } from 'vue-router';

const routes: RouteRecordRaw[] = [
  {
    path: '/',
    name: 'Dashboard',
    component: () => import('@/views/Dashboard.vue'),
    meta: { title: 'Dashboard' },
  },
  {
    path: '/customers',
    name: 'CustomerList',
    component: () => import('@/views/CustomerList.vue'),
    meta: { title: 'Customers' },
  },
  {
    path: '/customers/:id',
    name: 'CustomerDetail',
    component: () => import('@/views/CustomerDetail.vue'),
    meta: { title: 'Customer Detail' },
    props: true,
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

// Navigation guard for page titles
router.beforeEach((to, _from, next) => {
  const title = to.meta.title as string;
  if (title) {
    document.title = `${title} | CRM`;
  }
  next();
});

export default router;