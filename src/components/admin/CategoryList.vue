<script setup lang="ts">
import type { Category } from '@/models/Category';
import { defineProps, defineEmits } from 'vue';

defineProps({
  categories: {
    type: Array as () => Category[],
    required: true,
  },
});

defineEmits(['edit', 'delete']);
</script>

<template>
  <table>
    <thead>
      <tr>
        <th>Name</th>
        <th>Description</th>
        <th style="width: 20%;">Actions</th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="category in categories" :key="category.id">
        <td>{{ category.name }}</td>
        <td>{{ category.description }}</td>
        <td class="actions">
          <button @click="$emit('edit', category)">Edit</button>
          <button @click="$emit('delete', category.id)">Delete</button>
        </td>
      </tr>
    </tbody>
  </table>
</template>

<style scoped>
table {
  width: 100%;
  border-collapse: collapse;
}

th,
td {
  padding: 8px;
  text-align: left;
  border-bottom: 1px solid #ddd;
}

th {
  background-color: #4CAF50;
  color: white;
}

tr:hover {
  background-color: #f5f5f5;
}

button {
  background-color: #4CAF50;
  color: white;
  padding: 8px 16px;
  border: none;
  cursor: pointer;
}

button:hover {
  background-color: #45a049;
}

.actions {
  display: flex;
  gap: 8px;
  align-items: center;
}
</style>
