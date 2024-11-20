<script setup lang="ts">
import type { Product } from '@/models/Products';
import useCartStorage from '@/stores/CartStorage';

const urlImage = import.meta.env.VITE_BACKEND_URL?.replace(/\/api$/, '');

defineProps({
  product: {
    type: Object as () => Product,
    required: true
  }
})

const cart = useCartStorage();
</script>

<template>
  <div :to="`/products/${product.id}`" class="productCard">
    <div class="title">
      {{ product.name }}
    </div>
    <div class="img">
      <img :src="urlImage + product.imageUrl" :alt="product.name">
    </div>
    <div class="description">
      {{ product.description }}
    </div>
    <div class="price">
      <span class="symbol">$</span>
      <span class="priceNumber">{{ product.price }}</span>
    </div>
    <div class="addToCart">
      <button v-if="!cart.isInCart(product.id)" @click="cart.addToCart(product)">
        ADD TO CART
        <img src="../assets/images/icons/cart.webp" alt="cart" />
      </button>
      <button @click="cart.removeFromCart(product.id)" v-else>
        IN CART
        <img src="../assets/images/icons/cart.webp" alt="cart" />
      </button>
    </div>
  </div>
</template>

<style scoped>
.productCard {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px;
  border-radius: 20px;

  & .img img {
    width: 400px;
    height: 400px;
    object-fit: contain;
    border-radius: 20px;
    margin-bottom: 20px;
  }

  & .title {
    font-size: 36px;
    font-weight: 600;
    margin-bottom: 10px;
  }

  & .price {
    display: flex;
    gap: 5px;
    align-items: start;
    font-size: 40px;
    font-weight: 600;
    margin-bottom: 20px;
  }

  & .symbol {
    font-size: 20px;
  }


}

.description {
  color: var(--black-200);
  font-size: 18px;
  margin-bottom: 20px;
}
</style>
