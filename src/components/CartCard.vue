<script setup lang="ts">
import useCartStorage from '@/stores/CartStorage';
const urlImage = import.meta.env.VITE_BACKEND_URL?.replace(/\/api$/, '');

defineProps(['product']);
const emit = defineEmits(['remove-from-cart']);

const cart = useCartStorage();

const removeFromCart = (id: string) => {
  cart.removeFromCart(id);
  emit('remove-from-cart', id);
};
</script>

<template>
  <div class="cartCard">
    <img :src="urlImage + product.imageUrl" :alt="product.name" />
    <div class="info">
      <h3>{{ product.name }}</h3>
      <div class="price">
        ${{ product.price }}
      </div>
      <div class="quantity">
        <button @click="cart.decreaseQuantity(product.id)" :disabled="(product.quantity || 0) <= 1">-</button>
        <div class="display">
          x{{ product.quantity || 1 }}
        </div>
        <button @click="cart.increaseQuantity(product.id)" :disabled="product.quantity >= product.stockQuantity">+</button>
      </div>
    </div>
    <button @click="removeFromCart(product.id)">Remove</button>
  </div>
</template>

<style scoped>
.cartCard {
  display: flex;
  align-items: center;
  padding: 16px;
  border-bottom: 1px solid var(--white-600);
}

.cartCard h3 {
  font-size: 32px;
}

.cartCard img {
  width: 300px;
  height: 300px;
  object-fit: contain;
  margin-right: 16px;
}

.cartCard .info {
  flex: 1;
}

.cartCard .price {
  font-weight: bold;
  font-size: 23px;
  margin-bottom: 8px;
}

.cartCard .info h3 {
  margin-bottom: 8px;
}

.cartCard button {
  background-color: var(--blue);
  color: var(--white);
  border: none;
  padding: 8px 16px;
  border-radius: 4px;
  cursor: pointer;
}

.cartCard .info p button {
  background-color: transparent;
  border: 1px solid var(--blue);
  color: var(--blue);
  padding: 4px 8px;
  border-radius: 4px;
  cursor: pointer;
  margin: 0 4px;
}

.cartCard  button:disabled {
  cursor: not-allowed;
  opacity: 0.6;
}

.quantity {
  display: flex;
  align-items: center;
}

.quantity .display {
  margin: 0 8px;
}
</style>
