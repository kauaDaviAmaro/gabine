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
        <th>Actions</th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="product in products" :key="product.id">
        <td>{{ product.name }}</td>
        <td>{{ product.price }}</td>
        <td>{{ product.category }}</td>
        <td>
          <button @click="$emit('edit', product)">Edit</button>
          <button @click="$emit('delete', product.id)">Delete</button>
        </td>
      </tr>
    </tbody>
  </table>
</template>
