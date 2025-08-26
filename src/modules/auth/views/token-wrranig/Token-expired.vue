<template>
  <div class="token-expired-page">
    <a-result
      status="403"
      title="Token Expired"
      sub-title="Your session has expired. Please login again to continue."
    >
      <template #extra>
        <a-button type="primary" @click="goToLogin">Go to Login</a-button>
      </template>
    </a-result>
  </div>
</template>

<script setup lang="ts">
import { useRouter } from 'vue-router';
const router = useRouter();

function goToLogin() {
  // เคลียร์ token และ session
  localStorage.removeItem('token');
  sessionStorage.removeItem('user');

  // redirect ไปยังหน้า login
  router.replace('/login');
}
</script>

<style scoped>
.token-expired-page {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
}
</style>
