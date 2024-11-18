<script setup lang="ts">
import { ref, onMounted } from 'vue';
import type { Product } from '@/models/Products';
import ProductService from '@/services/ProductService';
import ProductList from '@/components/admin/ProductList.vue';
import ProductModal from '@/components/admin/ProductModal.vue';

const products = ref<Product[]>([]);
const modalVisible = ref(false);
const isEditing = ref(false);
const currentProduct = ref<Product | null>(null);

const fetchProducts = async () => {
  const response = await ProductService.getProducts();
  products.value = response.data;
};

const openAddModal = () => {
  isEditing.value = false;
  currentProduct.value = null;
  modalVisible.value = true;
};

const openEditModal = (product: Product) => {
  isEditing.value = true;
  currentProduct.value = { ...product };
  modalVisible.value = true;
};

const saveProduct = async (product: Product,) => {
  product.CategoryId = product.category;
  const action = isEditing.value ? ProductService.updateProduct : ProductService.createProduct;
  await action(product);
  await ProductService.uploadProductImage(product.id, product.imageUrl);
  modalVisible.value = false;
  fetchProducts();
};

const deleteProduct = async (productId: string) => {
  await ProductService.deleteProduct(productId);
  fetchProducts();
};

onMounted(fetchProducts);
</script>

<template>
  <div>
    <h1>Admin Products</h1>
    <button @click="openAddModal">Add Product</button>
    <ProductList :products="products" @edit="openEditModal" @delete="deleteProduct" />
    <ProductModal v-if="modalVisible" :isEditing="isEditing" :product="currentProduct" @close="modalVisible = false"
      @save="saveProduct" />
  </div>
</template>
