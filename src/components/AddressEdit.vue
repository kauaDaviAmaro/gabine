<script setup lang="ts">
import api from '@/api';
import { useAlertStore } from '@/stores/alertStore';
import { useLoadingStore } from '@/stores/loadingStore';
import { ref } from 'vue';

const addresses: any = ref([]);

const props = defineProps({
  addresses: {
    type: Array,
    required: true
  },
  edit: {
    type: Boolean,
    required: true
  }
})

const emit = defineEmits(['addressDeleted']);

const deleteAddress = async (id: number) => {
  try {
    useLoadingStore().setLoading(true);
    await api.delete(`/Address?id=${id}`);

    emit('addressDeleted');
    useAlertStore().showAlert('Address deleted successfully', 'success');
    useLoadingStore().setLoading(false);
  } catch (error) {
    useAlertStore().showAlert('Error while deleting address', 'error');
    useLoadingStore().setLoading(false);
  }
}

const submit = async (address: any) => {
  try {
    useLoadingStore().setLoading(true);
    await api.put(`/Address?id=${address.id}`, address);

    useLoadingStore().setLoading(false);

    useAlertStore().showAlert('Address updated successfully', 'success');
  } catch (error) {
    useAlertStore().showAlert('Error while updating address', 'error');
    useLoadingStore().setLoading(false);
    console.log(error);

  }
}
</script>

<template>
  <div v-for="address in props.addresses" :key="address.id">
    <form @submit.prevent="submit(address)">
      <h3>Address</h3>
      <div class="row">
        <div class="col">
          <label for="neighborhood">Neighborhood</label>
          <input type="text" name="neighborhood" id="neighborhood" v-model="address.neighborhood"
            placeholder="Neighborhood" required class="needs-validation" :disabled="!edit">
        </div>
      </div>
      <div class="row">
        <div class="col">
          <label for="street">Street</label>
          <input type="text" name="street" id="street" v-model="address.street" placeholder="Street" required
            class="needs-validation" :disabled="!edit">
        </div>
        <div class="col">
          <label for="number">Number</label>
          <input type="text" name="number" id="number" v-model="address.number" placeholder="Number" required
            class="needs-validation" @input="address.number = address.number.replace(/\D/g, '')" :disabled="!edit">
        </div>
      </div>
      <div class="row">
        <div class="col">
          <label for="city">City</label>
          <input type="text" name="city" id="city" v-model="address.city" placeholder="City" required
            class="needs-validation" :disabled="!edit">
        </div>
        <div class="col">
          <label for="state">State</label>
          <input type="text" name="state" id="state" v-model="address.state" placeholder="State" required
            class="needs-validation" :disabled="!edit">
        </div>
      </div>
      <div class="row">
        <div class="col">
          <div class="col">
            <label for="zip-code">Zip code</label>
            <input type="text" name="zip-code" id="zip-code" v-model="address.zipCode" placeholder="Zip code" required
              class="needs-validation" @input="address.zipCode = address.zipCode.replace(/\D/g, '').substr(0, 8)"
              :disabled="!edit">
          </div>
        </div>
      </div>

      <button type="submit" :disabled="!edit">Save</button>
      <button type="button" class="delete" @click="deleteAddress(address.id)" :disabled="!edit">Delete</button>
    </form>
  </div>
</template>

<style scoped>
form {
  padding: 2rem 0;
  border-top: 1px solid #ccc;
  margin: 5rem 5rem;
}

form .col {
  display: flex;
  flex-direction: column;
}

form .row {
  display: flex;
  gap: 20px;
  margin-bottom: 10px;
}

form input,
.col {
  width: 100%;
}

form .col input,
form .col select {
  width: 100%;
  height: 40px;
  border-radius: 5px;
  border: 1px solid #ccc;
  padding: 0 10px;
  outline: none;
  background-color: var(--white-50);
}

form .col select:disabled,
form .col input:disabled {
  background-color: #FAFAFA;
}

form .col label {
  margin-bottom: 5px;
}

form button {
  float: right;
  background-color: #4182f9;
  color: var(--white-50);
  border: none;
  padding: 0.5rem 2rem;
  border-radius: 5px;
  cursor: pointer;
  transition: transform 0.3s ease-in-out;
}

.delete {
  background-color: #f44336;
  margin-right: 10px;
}

form button:disabled {
  background-color: #ccc;
}

h3 {
  margin-bottom: 10px;
  line-height: normal;
  font-size: 20px;
}
</style>
