<template>
  <div class="login-page">
    <div class="login-card">
      <div class="login-header">
        <h1>CRM Pro</h1>
        <p>Sign in to your account</p>
      </div>

      <form @submit.prevent="handleSubmit" class="login-form">
        <div class="form-group">
          <label for="email">Email</label>
          <input
            id="email"
            v-model="form.email"
            type="email"
            placeholder="your@email.com"
            required
            :disabled="loading"
          />
        </div>

        <div class="form-group">
          <label for="password">Password</label>
          <input
            id="password"
            v-model="form.password"
            type="password"
            placeholder="Enter your password"
            required
            :disabled="loading"
          />
        </div>

        <div class="form-options">
          <label class="remember-me">
            <input type="checkbox" v-model="form.rememberMe" />
            Remember me
          </label>
          <a href="#" class="forgot-link">Forgot password?</a>
        </div>

        <div v-if="errorMessage" class="error-alert">
          {{ errorMessage }}
        </div>

        <button type="submit" class="submit-btn" :disabled="loading">
          {{ loading ? "Signing in..." : "Sign In" }}
        </button>
      </form>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive } from "vue";
import { useRouter } from "vue-router";
import { useAuthStore } from "@/stores/auth";

const router = useRouter();
const authStore = useAuthStore();

const form = reactive({
  email: "",
  password: "",
  rememberMe: false,
});

const loading = ref(false);
const errorMessage = ref("");

async function handleSubmit() {
  loading.value = true;
  errorMessage.value = "";
  try {
    await authStore.login(form.email, form.password);
    router.push("/");
  } catch (e: any) {
    errorMessage.value = e.message || "Invalid email or password";
  } finally {
    loading.value = false;
  }
}
</script>