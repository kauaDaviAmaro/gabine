<script setup lang="ts">
import { ref, watch, defineProps, defineEmits, type Ref, onMounted } from 'vue';
import type { Product } from '@/models/Products';
import CategoryService from '@/services/CategoryService';
import type { Category } from '@/models/Category';

const { isEditing, product } = defineProps({
  isEditing: {
    type: Boolean,
    required: true,
  },
  product: {
    type: Object as () => Product | null,
    required: false,
  },
});

const emit = defineEmits(['save', 'close']);

const modalProduct = ref<Product>({
  id: '',
  name: '',
  description: '',
  price: 0,
  stockQuantity: 0,
  imageUrl: '',
  quantity: 0,
  category: '',
});

watch(
  () => product,
  (newProduct) => {
    modalProduct.value = newProduct
      ? { ...newProduct }
      : {
        id: '',
        name: '',
        description: '',
        price: 0,
        stockQuantity: 0,
        imageUrl: '',
        quantity: 0,
        category: '',
      };
  },
  { immediate: true }
);

const save = () => {
  if (modalProduct.value.name.trim() === '') return;
  emit('save', modalProduct.value, document.getElementById('imageInput') as HTMLInputElement);
};

const category: Ref<Array<Category>> = ref([]);

const getCategories = async (): Promise<void> => {
  const response = await CategoryService.getCategories();
  category.value = response.data;
}

const imagem: Ref<File | null> = ref(null); // Ref para armazenar o arquivo da imagem
const imagePreview: Ref<string | null> = ref(null); // Ref para armazenar a URL de pré-visualização

const handleImageUpload = (event: Event) => {
  const file = (event.target as HTMLInputElement).files?.[0] || null;
  if (file) {
    imagem.value = file;
    imagePreview.value = URL.createObjectURL(file); // Gera URL para pré-visualização
    modalProduct.value.imageUrl = file.name; // Opcional: define o nome do arquivo como URL
  } else {
    imagePreview.value = null;
  }
};


onMounted(getCategories);
</script>

<template>
  <div class="modal">
    <div class="modal-content">
      <h2>{{ isEditing ? 'Edit Product' : 'Add Product' }}</h2>
      <form @submit.prevent="save">
        <div class="row">
          <div class="col">
            <label for="name">Name</label>
            <input id="name" v-model="modalProduct.name" required />
          </div>
          <div class="col">
            <label for="price">Price</label>
            <input id="price" v-model.number="modalProduct.price" type="number" required />
          </div>
        </div>

        <div class="row">
          <div class="col">
            <label for="category">Category</label>
            <select id="category" v-model="modalProduct.category" required>
              <option value="">Select</option>
              <option v-for="c in category" :key="c.id" :value="c.id">{{ c.name }}</option>
            </select>
          </div>
          <div class="col">
            <label for="stockQuantity">Stock Quantity</label>
            <input id="stockQuantity" v-model.number="modalProduct.stockQuantity" type="number" />
          </div>
        </div>

        <div class="row">
          <div class="col">
            <label for="description">Description</label>
            <textarea id="description" v-model="modalProduct.description"></textarea>
          </div>
        </div>

        <div class="row">
          <div class="col">
            <label for="fileInput">Upload Image</label>
            <div class="custom-file-upload">
              <label for="fileInput" class="custom-button">Choose Image</label>
              <input id="fileInput" type="file" class="hidden-file-input" @change="handleImageUpload"
                accept="image/*" />
            </div>
            <div v-if="imagePreview" class="image-preview">
              <img :src="imagePreview" alt="Image Preview" />
            </div>
          </div>
        </div>


        <div class="actions">
          <button type="submit">Save</button>
          <button type="button" @click="$emit('close')">Cancel</button>
        </div>
      </form>
    </div>
  </div>
</template>

<style scoped>
.row {
  margin-bottom: 10px;
  display: flex;
  gap: 10px;
}

.col {
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 5px;
}

h2 {
  padding-bottom: 5px;
  font-size: 24px;
  line-height: normal;
  border-bottom: 1px solid #ccc;
  margin-bottom: 20px;
}

input:not([type="file"]),
select,
textarea {
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 5px;
  background-color: #fff;
}

textarea {
  resize: vertical;
  min-height: 100px;
}

.modal {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
}

.modal-content {
  background: white;
  padding: 20px;
  border-radius: 5px;
  max-width: 90%;
  width: 45%;
}

.actions {
  display: flex;
  justify-content: space-between;
  margin-top: 20px;
}

.actions button {
  padding: 10px 20px;
  border-radius: 5px;
  cursor: pointer;
}

.actions button:first-child {
  background: #2ecc71;
  color: white;
}

.actions button:last-child {
  background: #e74c3c;
  color: white;
}

.custom-button {
  display: inline-block;
  padding: 10px 20px;
  background-color: #3498db;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  text-align: center;
  font-size: 16px;
}

.custom-button:hover {
  background-color: #2980b9;
}

.hidden-file-input {
  opacity: 0;
  position: absolute;
  width: 0;
  height: 0;
  z-index: -1;
}

.image-preview {
  margin-top: 10px;
  display: flex;
  justify-content: center;
}

.image-preview img {
  max-width: 100%;
  max-height: 150px;
  border: 1px solid #ccc;
  border-radius: 5px;
}
</style>
