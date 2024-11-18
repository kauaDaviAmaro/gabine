<script setup lang="ts">
import type { Product } from '@/models/Products';
import ProductCard from './ProductCard.vue';

const props = defineProps({
  products: {
    type: Array<Product>,
    required: true
  }
})

const isProductsEmpty = (): boolean => props.products.length === 0;
</script>
<template>
  <div class="product-list" v-if="!isProductsEmpty()">
    <ProductCard v-for="product in products" :key="product.id" :product="product" />
  </div>
  <div class="no-products" v-else>
    No products found
  </div>
</template>

<style scoped>
.product-list {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-evenly;
  gap: 40px;
}

.product-list > * {
  flex: 1 0 300px;
}

.no-products {
  font-size: 24px;
  margin-top: 40px;
  text-align: center;
}
</style>