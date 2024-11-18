<script setup lang="ts">
import { ref, onMounted } from 'vue';
import type { Category } from '@/models/Category';
import CategoryService from '@/services/CategoryService';
import CategoryList from '@/components/admin/CategoryList.vue';
import CategoryModal from '@/components/admin/CategoryModal.vue';

const categories = ref<Category[]>([]);
const modalVisible = ref(false);
const isEditing = ref(false);
const currentCategory = ref<Category | null>(null);

const fetchCategories = async () => {
  const response = await CategoryService.getCategories();
  categories.value = response.data;
};

const openAddModal = () => {
  isEditing.value = false;
  currentCategory.value = null;
  modalVisible.value = true;
};

const openEditModal = (category: Category) => {
  isEditing.value = true;
  currentCategory.value = { ...category };
  modalVisible.value = true;
};

const saveCategory = async (category: Category) => {
  const action = isEditing.value
    ? CategoryService.updateCategory
    : CategoryService.createCategory;

  await action(category);
  modalVisible.value = false;
  fetchCategories();
};

const deleteCategory = async (categoryId: string) => {
  await CategoryService.deleteCategory(categoryId);
  fetchCategories();
};

onMounted(fetchCategories);
</script>

<template>
  <div class="container">
    <div class="tabs">
    <RouterLink to="/admin/products">Products</RouterLink>
    <RouterLink to="/admin/categories">Categories</RouterLink>
  </div>
    <div class="header">
      <h1>Categories</h1>
      <button @click="openAddModal">Add Category</button>
    </div>
    <CategoryList :categories="categories" @edit="openEditModal" @delete="deleteCategory" />
    <CategoryModal
      v-if="modalVisible"
      :isEditing="isEditing"
      :category="currentCategory"
      @close="modalVisible = false"
      @save="saveCategory"
    />
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
}

.tabs a.router-link-active {
  background-color: #0077cc;
  color: #fff;
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
}

.container {
  padding: 20px;
}
</style>
