import { defineStore } from 'pinia';
import { computed, ref, watch } from 'vue';
import type { Product } from '@/models/Products';

const CART_STORAGE_KEY = 'cartItems';

const useCartStorage = defineStore('cart', () => {
  const cartItems = ref<Product[]>(JSON.parse(localStorage.getItem(CART_STORAGE_KEY) || '[]'));

  const saveToLocalStorage = () => {
    localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(cartItems.value));
  };

  watch(cartItems, saveToLocalStorage, { deep: true });

  const addToCart = (product: Product) => {
    cartItems.value.push(product);
    saveToLocalStorage();
  };

  const removeFromCart = (productId: string) => {
    cartItems.value = cartItems.value.filter(item => item.id !== productId);
    saveToLocalStorage();
  };

  const clearCart = () => {
    cartItems.value = [];
    saveToLocalStorage();
  };

  const quantity = computed(() => {
    return cartItems.value.reduce((total, item) => total + (item.quantity ?? 1), 0);
  });

  const isEmpty = computed(() => {
    return cartItems.value.length === 0;
  });

  const increaseQuantity = (productId: string) => {
    const item = cartItems.value.find(item => item.id === productId);
    if (item && item.stockQuantity && (item.quantity ?? 1) < item.stockQuantity) {
      item.quantity = (item.quantity ?? 1) + 1;
      saveToLocalStorage();
    }
  };

  const decreaseQuantity = (productId: string) => {
    const item = cartItems.value.find(item => item.id === productId);
    if (item && item.quantity && item.quantity > 1) {
      item.quantity = item.quantity - 1;
      saveToLocalStorage();
    }
  };

  const isInCart = (productId: string) => {
    return cartItems.value.some(item => item.id === productId);
  };

  const getItens = (): Product[] => {
    return cartItems.value;
  };

  return {
    getItens,
    addToCart,
    removeFromCart,
    quantity,
    isEmpty,
    isInCart,
    clearCart,
    increaseQuantity,
    decreaseQuantity
  };
});

export default useCartStorage;

