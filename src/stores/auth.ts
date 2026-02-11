import { defineStore } from "pinia";
import { ref, computed } from "vue";
import { login as apiLogin, logout as apiLogout, getCurrentUser } from "@/api/auth";
import type { User } from "@/types";

export const useAuthStore = defineStore("auth", () => {
  const user = ref<User | null>(null);
  const token = ref<string | null>(localStorage.getItem("access_token"));
  const loading = ref(false);
  const error = ref<string | null>(null);

  const isAuthenticated = computed(() => !!token.value);
  const isAdmin = computed(() => user.value?.role === "admin");
  const userName = computed(() => user.value?.name || "Guest");

  async function login(email: string, password: string) {
    loading.value = true;
    error.value = null;
    try {
      const response = await apiLogin({ email, password });
      token.value = response.access_token;
      localStorage.setItem("access_token", response.access_token);
      if (response.refresh_token) {
        localStorage.setItem("refresh_token", response.refresh_token);
      }
      user.value = response.user;
    } catch (e: any) {
      error.value = e.message || "Login failed";
      throw e;
    } finally {
      loading.value = false;
    }
  }

  async function logout() {
    try {
      await apiLogout();
    } finally {
      user.value = null;
      token.value = null;
      localStorage.removeItem("access_token");
      localStorage.removeItem("refresh_token");
    }
  }

  async function fetchUser() {
    if (!token.value) return;
    try {
      user.value = await getCurrentUser();
    } catch {
      await logout();
    }
  }

  function hasPermission(permission: string): boolean {
    if (!user.value) return false;
    if (user.value.role === "admin") return true;
    return user.value.permissions?.includes(permission) ?? false;
  }

  return {
    user, token, loading, error,
    isAuthenticated, isAdmin, userName,
    login, logout, fetchUser, hasPermission,
  };
});