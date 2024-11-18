<script setup lang="ts">
import api from '@/api';
import { useAlertStore } from '@/stores/alertStore';
import { useLoadingStore } from '@/stores/loadingStore';
import axios from 'axios';
import { ref } from 'vue';

const address = ref({
  street: '',
  number: '',
  neighborhood: '',
  city: '',
  state: '',
  cep: '',
  zipCode: '',
});

const emit = defineEmits(['addressAdded', 'close']);

const submit = async () => {

  try {
    useLoadingStore().setLoading(true);

    await api.post('address', address.value);

    useLoadingStore().setLoading(false);

    useAlertStore().showAlert('Address created successfully', 'success');

    emit('addressAdded');
    emit('close');
  } catch (error) {
    useLoadingStore().setLoading(false);

    useAlertStore().showAlert('Error while creating address', 'error');
  }
}

const buscarEnderecoPorCep = async () => {
  if (address.value.zipCode.length === 9) {
    try {
      const response = await axios.get(`https://viacep.com.br/ws/${address.value.zipCode}/json/`);
      if (response.data && !response.data.erro) {
        address.value.street = response.data.logradouro;
        address.value.neighborhood = response.data.bairro;
        address.value.city = response.data.localidade;
        address.value.state = response.data.uf;
      } else {
        useAlertStore().showAlert('CEP not found', 'error');
      }
    } catch (error) {
      useAlertStore().showAlert('Error fetching address', 'error');
    }
  }
}
</script>

<template>
  <div class="modal">
    <form @submit.prevent="submit">
      <h1>
        Address data
      </h1>
      <div class="row">
        <div class="col">
          <label for="neighborhood">Neighborhood</label>
          <input type="text" name="neighborhood" id="neighborhood" v-model="address.neighborhood"
            placeholder="Neighborhood" required class="needs-validation">
        </div>
      </div>
      <div class="row">
        <div class="col">
          <label for="street">Street</label>
          <input type="text" name="street" id="street" v-model="address.street" placeholder="Street" required
            class="needs-validation">
        </div>
        <div class="col">
          <label for="number">Number</label>
          <input type="text" name="number" id="number" v-model="address.number" placeholder="Number" required
            class="needs-validation" @input="address.number = address.number.replace(/\D/g, '')">
        </div>
      </div>
      <div class="row">
        <div class="col">
          <label for="city">City</label>
          <input type="text" name="city" id="city" v-model="address.city" placeholder="City" required
            class="needs-validation">
        </div>
        <div class="col">
          <label for="state">State</label>
          <input type="text" name="state" id="state" v-model="address.state" placeholder="State" required
            class="needs-validation">
        </div>
      </div>
      <div class="row">
        <div class="col">
          <div class="col">
            <label for="zip-code">CEP</label>
            <input type="text" name="zip-code" id="zip-code" v-model="address.zipCode" placeholder="01001-000" required
              class="needs-validation" @blur="buscarEnderecoPorCep"
              @input="address.zipCode = address.zipCode.replace(/\D/g, '').replace(/(\d{5})(\d{3})/g, '$1-$2').substr(0, 9)">
          </div>
        </div>
      </div>
      <div class="buttons">
        <button type="button" class="cancel" @click="$emit('close')">Cancel</button>
        <button type="submit">Submit</button>
      </div>
    </form>

  </div>
</template>

<style scoped>
.modal {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 9999;
}

.modal form {
  background-color: #fff;
  padding: 25px;
  border-radius: 10px;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.3);
  width: 50%;
}

form .col {
  display: flex;
  flex-direction: column;
}

form .row {
  display: flex;
  gap: 20px
}

form input,
.col {
  width: 100%;
}

form input,
form select {
  padding: 10px;
  margin-bottom: 10px;
  border-radius: 5px;
  border: 1px solid #ccc;
  font-size: 16px;
}

.modal h1 {
  margin-bottom: 10px;
  font-size: 18px;
  line-height: normal;
}

button {
  padding: 10px 20px;
  background-color: #007BFF;
  color: #fff;
  border: none;
  border-radius: 5px;
  font-size: 16px;
  cursor: pointer;
  transition: background-color 0.3s ease;
}

.buttons {
  display: flex;
  gap: 20px;
  justify-content: end;
  margin-top: 20px;
}

.cancel {
  background-color: #F94141;
}
</style>
