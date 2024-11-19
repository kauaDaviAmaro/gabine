<script setup lang="ts">
import type { Product } from '@/models/Products';
import { defineProps, defineEmits } from 'vue';

defineProps({
  products: {
    type: Array as () => Product[],
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
        <th>Price</th>
        <th>Category</th>
        <th style="width: 20%;">Actions</th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="product in products" :key="product.id">
        <td>{{ product.name }}</td>
        <td>{{ product.price }}</td>
        <td>{{ product.category.name }}</td>
        <td class="actions">
          <button @click="$emit('edit', product)">Edit</button>
          <button @click="$emit('delete', product.id)">Delete</button>
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
  background-color: #EEEEEE;
  color: black;
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