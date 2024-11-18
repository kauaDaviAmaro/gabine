<script lang="ts" setup>
import CartCard from '@/components/CartCard.vue';
import Navbar from '@/components/Navbar.vue';
import type { Product } from '@/models/Products';
import useCartStorage from '@/stores/CartStorage';
import { computed, type Ref } from 'vue';

const cart = useCartStorage();

const products: Ref<Product[]> = computed(() => cart.getItens());
</script>
<template>
  <Navbar />
  <div class="container">
    <div class="products">
      <h1>Your cart</h1>
      <div v-if="products.length > 0">
        <div v-for="product in products" :key="product.id">
          <CartCard :product="product" @remove-from-cart="cart.removeFromCart(product.id)" />
        </div>
      </div>
      <div class="no-products" v-else>
        Your cart is empty
      </div>
    </div>
    <div class="subtotal" v-if="products.length > 0">
      <h2>Subtotal: ${{ products.reduce((total, product) => total + product.price * (product.quantity || 1),
        0).toFixed(2)
        }}</h2>
      <button>
        Checkout<img src="../assets/images/icons/arrow-right-white.webp" alt="checkout" />
      </button>
    </div>
  </div>
</template>

<style scoped>
.container {
  margin: 20px 5rem;
  display: flex;
}

.products {
  width: 100%;
  background-color: #fff;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.2);
  border-radius: 10px;
  padding: 20px;
}

.products h1 {
  font-size: 30px;
  border-bottom: 1px solid #ccc;
}

.subtotal {
  flex-basis: 30%;
  background-color: #fff;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.2);
  border-radius: 10px;
  padding: 20px;
  margin-left: 20px;
  height: fit-content
}

.subtotal h2 {
  font-size: 30px;
}


.subtotal button {
  float: right;
}

.no-products {
  font-size: 24px;
  margin: 40px 0;
  text-align: center;
}
</style>
