<script setup lang="ts">
import { ref, watch, defineProps, defineEmits } from 'vue';
import type { Category } from '@/models/Category';

const { isEditing, category } = defineProps({
  isEditing: {
    type: Boolean,
    required: true,
  },
  category: {
    type: Object as () => Category | null,
    required: false,
  },
});

const emit = defineEmits(['save', 'close']);

const modalCategory = ref<Category>({
  id: '',
  name: '',
  description: '',
});

watch(
  () => category,
  (newCategory) => {
    modalCategory.value = newCategory
      ? { ...newCategory }
      : {
          id: '',
          name: '',
          description: '',
        };
  },
  { immediate: true }
);

const save = () => {
  if (modalCategory.value.name.trim() === '') return;
  emit('save', modalCategory.value);
};
</script>

<template>
  <div class="modal">
    <div class="modal-content">
      <h2>{{ isEditing ? 'Edit Category' : 'Add Category' }}</h2>
      <form @submit.prevent="save">
        <div class="row">
          <div class="col">
            <label for="name">Name</label>
            <input id="name" v-model="modalCategory.name" required />
          </div>
        </div>

        <div class="row">
          <div class="col">
            <label for="description">Description</label>
            <textarea id="description" v-model="modalCategory.description" required></textarea>
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

input,
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
</style>
