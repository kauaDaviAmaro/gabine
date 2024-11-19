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

const saveProduct = async (product: Product, image: HTMLInputElement) => {
  product.CategoryId = product.category;
  const action = isEditing.value ? ProductService.updateProduct : ProductService.createProduct;
  const response = await action(product);
  product.id = response.data.id;
  await ProductService.uploadProductImage(product.id, image);
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
  <div class="container">
    <div class="tabs">
      <RouterLink to="/admin/products">Products</RouterLink>
      <RouterLink to="/admin/categories">Categories</RouterLink>
    </div>
    <div class="header">
      <h1>Products</h1>
      <button @click="openAddModal">Add Product</button>
    </div>
    <ProductList :products="products" @edit="openEditModal" @delete="deleteProduct" />
    <ProductModal v-if="modalVisible" :isEditing="isEditing" :product="currentProduct" @close="modalVisible = false"
      @save="saveProduct" />
  </div>
</template>

<style scoped>
.tabs {
  display: flex;
  gap: 10px;
  margin-bottom: 20px;
}

.tabs a {
  text-decoration: none;
  color: #333;
  padding: 10px;
  border-radius: 4px;
  background-color: #f7f7f7;

  &:hover{
    border: 1px solid black;
  }
}

.tabs a.router-link-active {
  background-color: #0077cc;
  color: #fff;

  &:hover{
    background-color: #7cbff0;
  }
}

h1 {
  font-size: 36px;
  line-height: normal;
  margin-bottom: 20px;
}

.header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 20px;
}

button {
  padding: 10px 20px;
  background-color: #0077cc;
  color: #fff;
  border: none;
  border-radius: 4px;
  cursor: pointer;

  &:hover{
    background-color: #7cbff0;
  }
}

.container {
  padding: 20px;
}
</style>