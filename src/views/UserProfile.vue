<script setup lang="ts">
import api from '@/api';
import Navbar from '@/components/Navbar.vue';
import { useAlertStore } from '@/stores/alertStore';
import { useLoadingStore } from '@/stores/loadingStore';
import type { AxiosResponse } from 'axios';
import { onBeforeMount, onMounted, reactive, ref } from 'vue';
import eye from '@/assets/images/icons/eye.webp';
import eyeSlash from '@/assets/images/icons/eye-slash.webp';
import AddressEdit from '@/components/AddressEdit.vue';

const backendUrl = import.meta.env.VITE_BACKEND_URL?.replace(/\/api$/, '');


const showPassword = ref(false);
const showConfirmPassword = ref(false);

const togglePassword = () => {
  showPassword.value = !showPassword.value;
}

const toggleConfirmPassword = () => {
  showConfirmPassword.value = !showConfirmPassword.value;
}

const validateForm = (e: Event) => {
  let isValid = true;

  const inputs = e.target.querySelectorAll('.needs-validation');
  inputs.forEach(input => {
    if (!input.checkValidity()) {
      (input as HTMLElement).classList.add('invalid');
      isValid = false;
    } else {
      (input as HTMLElement).classList.remove('invalid');
    }
  });

  return isValid;
}

const edit = ref(false)

const user = ref({
  name: "",
  userName: "",
  email: "",
  phone: "",
  birthDate: "",
  gender: 0,
  cpf: "",
  maritalStatus: 0,
  scholarship: 0,
  profilePicture: null
});

const password = ref('');
const confirmPassword = ref('');

const submitChangeUser = async (e) => {
  if (!validateForm(e)) {
    return;
  }
  const loading = useLoadingStore();
  const alert = useAlertStore();

  try {
    loading.setLoading(true);

    const editResult = await api.put('users', user.value);

    user.value = editResult.data;

    window.localStorage.setItem("USER", JSON.stringify(user.value));
    alert.showAlert('User edited successfully', 'success');

    loading.setLoading(false);
  } catch (error) {
    console.log(error);

    loading.setLoading(false);

    alert.showAlert('Error while editing', 'error');
  }
}

const submitChangePassword = async (e) => {
  if (!validateForm(e) || password.value !== confirmPassword.value) {
    return;
  }

  const loading = useLoadingStore();
  const alert = useAlertStore();

  try {
    loading.setLoading(true);

    api.put('users/password', {
      password: password.value
    });

    password.value = '';
    confirmPassword.value = '';

    alert.showAlert('Password changed successfully', 'success');

    loading.setLoading(false);

    edit.value = false
  } catch (error) {
    console.log(error);

    loading.setLoading(false);

    alert.showAlert('Error while editing', 'error');
  }
}

const toggleEdit = async () => {
  edit.value = !edit.value

  if (!edit.value) {
    const alert = useAlertStore();

    try {

      const editResult = await api.get('users');

      user.value = editResult.data;

    } catch (error) {
      alert.showAlert('Error while editing', 'error');
    }
    password.value = '';
    confirmPassword.value = '';
  }
}

const addresses = ref([]);

const getAddresses = async () => {
  try {
    const response: AxiosResponse = await api.get('/Address');
    addresses.value = response.data;
    addresses.value[0].isDefault = true;
  } catch (error) {
    console.error(error);
  }
}

const profilePicture = ref('');

const onFileChange = (event: Event) => {
  const input = event.target as HTMLInputElement;
  const file = input.files?.[0];
  if (file) {
    const reader = new FileReader();
    reader.onload = () => {
      profilePicture.value = reader.result as string;
    };
    reader.readAsDataURL(file);

    sendProfilePicture();
  }
};

const sendProfilePicture = async () => {
  const loading = useLoadingStore();
  const alert = useAlertStore();

  try {
    loading.setLoading(true);

    const profilePictureInput = document.getElementById('profilePictureInput') as HTMLInputElement;

    const formData = new FormData();
    formData.append('profilePicture', profilePictureInput.files![0]);

    const imageUrl = await api.post('users/profilePicture', formData, { headers: { 'Content-Type': 'multipart/form-data' } });

    user.value.profilePicture = imageUrl.data;

    alert.showAlert('Profile picture changed successfully', 'success');

    loading.setLoading(false);
  } catch (error) {
    loading.setLoading(false);

    alert.showAlert('Error while editing', 'error');
  }
}

const triggerFileInput = () => {
  const input = document.getElementById('profilePictureInput') as HTMLInputElement;
  if (input) input.click();
};

onBeforeMount(async () => {
  const loading = useLoadingStore();
  const alert = useAlertStore();

  try {
    loading.setLoading(true);

    const editResult = await api.get('users');

    user.value = editResult.data;

    getAddresses();
    loading.setLoading(false);
  } catch (error) {
    loading.setLoading(false);

    alert.showAlert('Error while editing', 'error');
  }
})
</script>

<template>
  <Navbar />

  <div class="gradient"></div>

  <div class="edit">
    <div class="profile">
      <div class="image">
        <img :src="profilePicture === '' ? `${backendUrl}/${user.profilePicture}` : profilePicture" alt="Profile">
        <div class="editBtn" @click="triggerFileInput">
          Picture
        </div>
        <input id="profilePictureInput" type="file" accept="image/*" @change="onFileChange" style="display: none" />
      </div>
      <div class="wrap-email-name">
        <span class="name">{{ user.name }}</span>
        <span class="email">{{ user.email }}</span>
      </div>
    </div>

    <button class="edit-button" @click="toggleEdit">
      {{ edit ? 'Cancel' : 'Edit' }}
    </button>
  </div>

  <form @submit.prevent="submitChangeUser" novalidate>
    <h1>Personal Information</h1>
    <div class="row">
      <div class="col">
        <label for="name">Name</label>
        <input class="needs-validation" type="text" id="name" name="name" v-model="user.name" required
          :disabled="!edit">
      </div>
      <div class="col">
        <label for="email">Email</label>
        <input class="needs-validation" type="email" id="email" name="email" v-model="user.email" required
          :disabled="!edit">
      </div>
    </div>

    <div class="row">
      <div class="col">
        <label for="phone">Phone</label>
        <input class="needs-validation" type="text" id="phone" name="phone" v-model="user.phone" required
          :disabled="!edit" minlength="13"
          @input="user.phone = user.phone.replace(/[^0-9]/g, '').replace(/(\d{2})(\d{5})(\d{4})/g, '($1) $2-$3').substring(0, 15)">
      </div>
      <div class="col">
        <label for="birth-date">Birth Date</label>
        <input class="needs-validation" type="date" id="birth-date" name="birth-date" v-model="user.birthDate" required
          :disabled="!edit">
      </div>
    </div>

    <div class="row">
      <div class="col">
        <label for="cpf">CPF</label>
        <input class="needs-validation" type="text" id="cpf" name="cpf" v-model="user.cpf" required :disabled="!edit"
          minlength="14"
          @input="user.cpf = user.cpf.replace(/[^0-9]/g, '').replace(/(\d{3})(\d{3})(\d{3})(\d{2})/g, '$1.$2.$3-$4').substring(0, 14)">
      </div>
      <div class="col">
        <label for="marital-status">Marital Status</label>
        <select class="needs-validation" id="marital-status" name="marital-status" v-model="user.maritalStatus" required
          :disabled="!edit">
          <option value="">Selecione</option>
          <option value="0">Single</option>
          <option value="1">Married</option>
          <option value="2">Divorced</option>
        </select>
      </div>
    </div>

    <div class="row">
      <div class="col">
        <label for="gender">Gender</label>
        <select class="needs-validation" id="gender" name="gender" v-model="user.gender" required :disabled="!edit">
          <option value="">Selecione</option>
          <option value="0">Male</option>
          <option value="1">Female</option>
          <option value="2">Other</option>
        </select>
      </div>
      <div class="col">
        <label for="scholarship">Scholarship </label>
        <select class="needs-validation" id="scholarship" name="scholarship" v-model="user.scholarship" required
          :disabled="!edit">
          <option value="">Selecione</option>
          <option value="0">None</option>
          <option value="1">Bachelor</option>
          <option value="2">Master</option>
        </select>
      </div>
    </div>

    <button type="submit" :disabled="!edit">Save</button>
  </form>

  <form class="changePassworld" @submit.prevent="submitChangePassword" novalidate>
    <h1>Change Password</h1>
    <div class="row">
      <div class="col">
        <div class="input-group">
          <input class="needs-validation" :type="showPassword ? 'text' : 'password'" placeholder="Password"
            title="Please enter your password" v-model="password" required pattern=".{2,}" :disabled="!edit">
          <img class="eye" :src="showPassword ? eyeSlash : eye" alt="eye" aria-hidden="true" @click="togglePassword">
        </div>
      </div>
      <div class="col">
        <div class="input-group">
          <input class="needs-validation" :type="showConfirmPassword ? 'text' : 'password'"
            placeholder="Confirm Password" title="Please confirm your password" v-model="confirmPassword" required
            pattern=".{2,}" :disabled="!edit" :class="password !== confirmPassword ? 'invalid' : ''">
          <img class="eye" :src="showConfirmPassword ? eyeSlash : eye" alt="eye" aria-hidden="true"
            @click="toggleConfirmPassword">
        </div>
      </div>
    </div>
    <button type="submit" :disabled="!edit">Save</button>
  </form>

  <AddressEdit @addressDeleted="getAddresses" :addresses="addresses" :edit="edit" />
</template>

<style scoped>
.input-group .eye {
  position: absolute;
  right: 20px;
  cursor: pointer;
  width: 20px;
  user-select: none;
}

.input-group {
  position: relative;
  display: flex;
  align-items: center;
  margin-bottom: 1rem;
}

.gradient {
  height: 94px;
  background: linear-gradient(to right, #011421, #738187, #E4EEEE);
  margin: 2rem 5rem;
  border-radius: 40px;
}

.edit {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin: 2rem 5rem 4rem 5rem;
}

.edit-button {
  background-color: #E12237;
  color: var(--white-50);
  border: none;
  padding: 0.5rem 1rem;
  border-radius: 5px;
  cursor: pointer;
  transition: transform 0.3s ease-in-out;
}

.edit-button:hover {
  transform: scale(1.05);
}

.profile {
  display: flex;
  align-items: center;
}

.image {
  text-align: center;
  margin-right: 1rem;
  width: 90px;
  height: 90px;
  object-fit: cover;
}

.editBtn {
  border: 1px solid gray;
  padding: 0.5rem 1rem;
  border-radius: 5px;
  cursor: pointer;
  transition: transform 0.3s ease-in-out;
}

.image img {
  width: 100%;
  border-radius: 50%;
  height: 100%;
  object-fit: cover;
}

.wrap-email-name {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: center;
  font-size: 18px;
}

.name {
  font-weight: bold;
}


form {
  margin: 0 5rem;
}

form h1 {
  margin-bottom: 20px;
  font-size: 20px;
  line-height: normal;
}

form .row {
  width: 100%;
  display: flex;
  gap: 1rem;
  margin-bottom: 1rem;
}

form .col {
  width: 100%;
  display: flex;
  flex-direction: column;
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

form button:disabled {
  background-color: #ccc;
}

.changePassworld {
  padding: 2rem 0;
  border-top: 1px solid #ccc;
  margin-top: 5rem;
}
</style>
