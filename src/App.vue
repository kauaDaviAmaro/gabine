<script setup lang="ts">
import { RouterLink, RouterView } from 'vue-router';
import Alert from '@/components/Alert.vue';
import Loading from './components/Loading.vue';
</script>

<template>
  <Loading />
  <Alert />
  <RouterView />
</template>
