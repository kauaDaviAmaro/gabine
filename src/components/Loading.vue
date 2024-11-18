<script setup lang="ts">
import { useLoadingStore } from '@/stores/loadingStore';

const loadingStore = useLoadingStore();
</script>

<template>
  <div v-if="loadingStore.loading" class="loading">
    <div class="loading__spinner"></div>
    <div class="loading__text">Loading...</div>
  </div>
</template>

<style scoped>
.loading {
  z-index: 9999;
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background-color: rgba(255, 255, 255, 0.315);
}

.loading__spinner {
  border: 2px solid #f3f3f3;
  border-radius: 50%;
  border-top: 2px solid #3498db;
  width: 50px;
  height: 50px;
  animation: spin 2s linear infinite;
}

@keyframes spin {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}

.loading__text {
  margin-left: 10px;
}
</style>
