<script lang="ts" setup>
import ProductList from '@/components/ProductList.vue';
import type { Product } from '@/models/Products';
import { onMounted, ref, type Ref } from 'vue';
import ProductService from '@/services/ProductService';
import debounce from '@/utils/debounce';
import CategoryService from '@/services/CategoryService';
import type { Category } from '@/models/Category';
import Navbar from '@/components/Navbar.vue';

const search: Ref<string> = ref('');
const category: Ref<Array<Category>> = ref([]);
const products: Ref<Array<Product>> = ref([]);

const selectedCategory: Ref<string> = ref('');

const getProducts = async (): Promise<void> => {
  const response = await ProductService.getProducts(search.value, selectedCategory.value);
  products.value = response.data;
}

const getCategories = async (): Promise<void> => {
  const response = await CategoryService.getCategories();
  category.value = response.data;
}

const debouncedGetProducts = debounce(getProducts, 500);

onMounted(async (): Promise<void> => {
  await getCategories();
  await getProducts();
})
</script>
<template>
  <Navbar />
  <div class="container">
    <div class="sidebar">
      <h1>Category</h1>
      <label>
        <input type="radio" v-model="selectedCategory" value="" @change="debouncedGetProducts">
        All
      </label>
      <label v-for="category in category" :key="category.id">
        <input type="radio" v-model="selectedCategory" :value="category.id" @change="debouncedGetProducts">
        {{ category.name }}
      </label>
    </div>

    <div class="products">
      <input type="search" v-model="search" @input="debouncedGetProducts" placeholder="Search...">

      <ProductList :products="products" />
    </div>
  </div>
</template>

<style scoped>
.container {
  display: flex;
  margin: 20px;
}

.sidebar {
  display: flex;
  flex-direction: column;
  padding: 0 20px;
  width: 20vw;
}

.sidebar label {
  font-size: 20px;
  margin-bottom: 5px;
}

.sidebar h1 {
  min-width: 20vw;
  font-size: 24px;
  margin-bottom: 10px;
}

.products input {
  padding: 10px;
  width: 100%;
  border-radius: 5px;
  border: 1px solid #738187;
  margin-bottom: 10px;
  font-size: 16px;
}

.products {
  border-radius: 10px;
  width: 100%;
  padding: 20px;
  margin: 0 auto;
  text-align: center
}
</style>