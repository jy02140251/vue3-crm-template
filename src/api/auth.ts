import { ref } from "vue";
import type { LoginRequest, LoginResponse, User } from "@/types";

const API_BASE = import.meta.env.VITE_API_BASE_URL || "/api";

export async function login(credentials: LoginRequest): Promise<LoginResponse> {
  const response = await fetch(`${API_BASE}/auth/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(credentials),
  });
  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.message || "Login failed");
  }
  return response.json();
}

export async function logout(): Promise<void> {
  const token = localStorage.getItem("access_token");
  await fetch(`${API_BASE}/auth/logout`, {
    method: "POST",
    headers: { Authorization: `Bearer ${token}` },
  });
  localStorage.removeItem("access_token");
  localStorage.removeItem("refresh_token");
}

export async function refreshToken(): Promise<string> {
  const refresh = localStorage.getItem("refresh_token");
  const response = await fetch(`${API_BASE}/auth/refresh`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ refresh_token: refresh }),
  });
  if (!response.ok) throw new Error("Token refresh failed");
  const data = await response.json();
  localStorage.setItem("access_token", data.access_token);
  return data.access_token;
}

export async function getCurrentUser(): Promise<User> {
  const token = localStorage.getItem("access_token");
  const response = await fetch(`${API_BASE}/auth/me`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  if (!response.ok) throw new Error("Failed to fetch user");
  return response.json();
}

export function getAuthHeaders(): Record<string, string> {
  const token = localStorage.getItem("access_token");
  return token ? { Authorization: `Bearer ${token}` } : {};
}