<template>
  <div>
    <div class="product-detail">
      <div class="product-image">
        <img :src="product.imageUrl" :alt="product.name" />
      </div>
      <div class="product-info">
        <h2>{{ product.name }}</h2>
        <p>{{ product.description }}</p>
        <p class="price">$ {{ product.price }}</p>
        <p v-if="product.stock > 0">In stock</p>
        <p v-else>Out of stock</p>
        <button @click="addToCart(product)">Add to cart</button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
// import { useRoute } from 'vue-router'
// import { useProductStore } from '@/stores/product'
// import type { Product } from '@/models/Products'

// const route = useRoute()
// const productStore = useProductStore()
// const product = productStore.getProductById(route.params.id as string) as Product

// function addToCart(product: Product) {
//   productStore.addToCart(product)
// }
</script>

<style scoped>
.product-detail {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.product-image {
  width: 50%;
}

.product-info {
  width: 50%;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
}

.price {
  font-size: 1.5rem;
  font-weight: bold;
  margin-top: 1rem;
}

button {
  margin-top: 1rem;
  padding: 0.5rem 1rem;
  background-color: #1177ff;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
}
</style>
