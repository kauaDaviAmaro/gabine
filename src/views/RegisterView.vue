<script setup lang="ts">
import api from '@/api';
import MultistepForm from '@/components/MultistepForm.vue';
import { useAlertStore } from '@/stores/alertStore';
import { useLoadingStore } from '@/stores/loadingStore';
import type { AxiosResponse } from 'axios';
import { onBeforeUnmount, ref, type Ref } from 'vue';
import eye from '@/assets/images/icons/eye.webp';
import eyeSlash from '@/assets/images/icons/eye-slash.webp';
import router from '@/router';

const showPassword = ref(false);
const showConfirmPassword = ref(false);

const togglePassword = () => {
  showPassword.value = !showPassword.value;
}

const toggleConfirmPassword = () => {
  showConfirmPassword.value = !showConfirmPassword.value;
}


const password = ref('');
const confirmPassword = ref('');

type SignUpParametersType = {
  name: string;
  userName: string;
  email: string;
  phone: string;
  birthDate: string;
  gender: number;
  cpf: string;
  maritalStatus: number;
  scholarship: number;
  password: string;
  profilePicture: string;
}

const userSignUp: SignUpParametersType = {
  name: '',
  userName: '',
  email: '',
  phone: '',
  birthDate: '',
  gender: 0,
  cpf: '',
  maritalStatus: 0,
  scholarship: 0,
  password: '',
  profilePicture: ''
}

const phone: Ref<string> = ref('');
const cpf: Ref<string> = ref('');
const profilePicture: Ref<string> = ref('');
const fileInput = ref(null);

const submit = async () => {
  const loading = useLoadingStore();
  const alert = useAlertStore();

  try {
    loading.setLoading(true);

    userSignUp.phone = phone.value;
    userSignUp.cpf = cpf.value;

    await api.post('users', userSignUp);

    const token = await api.post('Auth/signIn', {
      email: userSignUp.email,
      password: userSignUp.password
    });

    localStorage.setItem('AUTH_TOKEN', token.data);

    const formData = new FormData();

    const profilePictureInput = document.getElementById('profilePictureInput') as HTMLInputElement;

    if (!profilePictureInput.files?.length) {
      const image = await (await fetch(`https://placehold.co/200/736f6f/FFFFFF?text=${userSignUp.name[0]}`)).blob();
      formData.append('profilePicture', new File([image], `profilePicture.svg`));
    } else {
      formData.append('profilePicture', profilePictureInput.files![0]);
    }

    await api.post('users/profilePicture', formData, { headers: { 'Content-Type': 'multipart/form-data' } });

    alert.showAlert('User registered successfully', 'success');

    loading.setLoading(false);

    router.push({ name: 'signin' });
  } catch (error) {
    loading.setLoading(false);

    console.log(error);

    alert.showAlert('Error while signing up', 'error');
  }
}
const onFileChange = (event: Event) => {
  const input = event.target as HTMLInputElement;
  const file = input.files?.[0];
  if (file) {
    const reader = new FileReader();
    reader.onload = () => {
      profilePicture.value = reader.result as string;
    };
    reader.readAsDataURL(file);
  }
};

const triggerFileInput = () => {
  const input = document.getElementById('profilePictureInput') as HTMLInputElement;
  if (input) input.click();
};
</script>

<template>
  <div class="container">
    <div class="image">
      <h1>
        <div>Gabini</div>
        <div>Headset</div>
        <div>Store</div>
      </h1>
      <img src="../assets/images/register/headphone_pink.webp" alt="headset" class="headset" aria-hidden="true">
      <RouterLink to="/">
        <img src="../assets/images/login/Logo.webp" alt="Brand Logo" class="brand" aria-hidden="true">
      </RouterLink>
    </div>
    <div class="register">
      <h1>
        Welcome
      </h1>
      <p>
        Sign up for GABINI Headset's store and tune up your life!
      </p>
      <MultistepForm @submit="submit" :steps="4">
        <template #step-1>
          <div class="step">
            <h1>Informações pessoais</h1>
            <div class="row">
              <div class="col">
                <label for="name">Name</label>
                <input type="text" name="name" id="name" v-model="userSignUp.name" placeholder="John Doe" required
                  class="needs-validation">
              </div>
              <div class="col">
                <label for="userName">User Name</label>
                <input type="text" name="userName" id="userName" v-model="userSignUp.userName" placeholder="johndoe"
                  required class="needs-validation">
              </div>
            </div>
            <div class="row">
              <div class="col">
                <label for="scholarship">Scholarship</label>
                <select name="scholarship" id="scholarship" v-model="userSignUp.scholarship" required
                  class="needs-validation">
                  <option value="0" disabled selected hidden>Select your scholarship</option>
                  <option :value="1">None</option>
                  <option :value="2">Bachelor</option>
                  <option :value="3">Master</option>
                </select>
              </div>
              <div class="col">
                <label for="phone">Phone</label>
                <input type="text" name="phone" id="phone" v-model="phone" placeholder="(xx) xxxxx-xxxx" required
                  class="needs-validation"
                  @input="phone = phone.replace(/[^0-9]/g, '').replace(/(\d{2})(\d{5})(\d{4})/g, '($1) $2-$3').substring(0, 15)">
              </div>
            </div>
            <div class="row">
              <div class="col">
                <label for="email">Email</label>
                <input type="email" name="email" id="email" v-model="userSignUp.email" placeholder="johndoe@example.com"
                  required class="needs-validation" pattern="^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$">
              </div>
            </div>
          </div>
        </template>
        <template #step-2>
          <div class="step">
            <h1>Personal information</h1>
            <div class="row">
              <div class="col">
                <label for="birthDate">Birth Date</label>
                <input type="date" name="birthDate" id="birthDate" v-model="userSignUp.birthDate"
                  placeholder="DD/MM/YYYY" required pattern="^\d{2}\/\d{2}\/\d{4}$" class="needs-validation">
              </div>
              <div class="col">
                <label for="gender">Gender</label>
                <select name="gender" id="gender" v-model="userSignUp.gender" required class="needs-validation">
                  <option value="0" disabled selected hidden>Select your gender</option>
                  <option :value="1">Male</option>
                  <option :value="2">Female</option>
                  <option :value="3">Other</option>
                </select>
              </div>
            </div>
            <div class="row">
              <div class="col">
                <label for="cpf">CPF</label>
                <input type="text" name="cpf" id="cpf" v-model="cpf" placeholder="xxx.xxx.xxx-xx" required
                  class="needs-validation"
                  @input="cpf = cpf.replace(/[^0-9]/g, '').replace(/(\d{3})(\d{3})(\d{3})(\d{2})/g, '$1.$2.$3-$4').substring(0, 14)">
              </div>
              <div class="col">
                <label for="marital-status">Marital Status</label>
                <select name="marital-status" id="marital-status" v-model="userSignUp.maritalStatus" required
                  class="needs-validation">
                  <option value="0" disabled selected hidden>Select social status</option>
                  <option :value="1">Single</option>
                  <option :value="2">Married</option>
                  <option :value="3">Divorced</option>
                  <option :value="4">Widowed</option>
                </select>
              </div>
            </div>
          </div>
        </template>
        <template #step-3>
          <div class="step">
            <h1>Security</h1>
            <div class="row">
              <div class="col">
                <div class="input-group">
                  <input class="needs-validation" :type="showPassword ? 'text' : 'password'" placeholder="Password"
                    title="Please enter your password" v-model="userSignUp.password" required pattern=".{2,}">
                  <img class="eye" :src="showPassword ? eyeSlash : eye" alt="eye" aria-hidden="true"
                    @click="togglePassword">
                </div>
              </div>
            </div>
            <div class="row">
              <div class="col">
                <div class="input-group">
                  <input class="needs-validation" :type="showConfirmPassword ? 'text' : 'password'"
                    placeholder="Confirm Password" title="Please confirm your password" v-model="confirmPassword"
                    required pattern=".{2,}" :class="userSignUp.password !== confirmPassword ? 'invalid' : ''">
                  <img class="eye" :src="showConfirmPassword ? eyeSlash : eye" alt="eye" aria-hidden="true"
                    @click="toggleConfirmPassword">
                </div>
              </div>
            </div>
          </div>
        </template>
        <template #step-4>
          <div class="step">
            <h1>Profile Picture</h1>
            <div class="profilePicture">
              <img
                :src="profilePicture ? profilePicture : `https://placehold.co/200/1E1E1E/FFFFFF?text=${userSignUp.name[0]}`"
                alt="Profile" />
              <div class="edit" @click="triggerFileInput">
                Editar
              </div>
            </div>
            <input id="profilePictureInput" type="file" accept="image/*" @change="onFileChange" style="display: none" />
          </div>
        </template>
      </MultistepForm>
    </div>
  </div>
</template>

<style scoped>
.btns {
  justify-content: center;
  display: flex;
  gap: 10px;
}

.btn.start {
  background-color: #4CAF50;
}

.btn.capture {
  background-color: #FF9800;
}

.btn.stop {
  background-color: #F44336;
}

.btn {
  padding: 10px;
  border-radius: 5px;
  border: 1px solid #738187;
  color: #fff;
  cursor: pointer;
  margin: 10px 0;
}

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


.step .row .col {
  width: 100%;
}

.step .row {
  display: flex;
  gap: 20px;
}

.step input {
  width: 100%;
  margin-bottom: 10px
}

.step h1 {
  font-size: 20px;
  line-height: normal;
  margin: 10px 0;
}

.container {
  display: flex;
}

.image {
  position: relative;
  background-color: #F2F2F2;
  height: 100vh;
  width: 50%;
}

.image .brand {
  position: absolute;
  padding: 20px;
  top: 0;
  left: 0;
}

.image h1 {
  text-transform: uppercase;
  position: absolute;
  top: 0;
  right: 0;
  padding: 4rem;
  z-index: 2;
}

.image .headset {
  position: absolute;
  bottom: 20px;
  left: 20px;
  width: 60%;
}

.register {
  margin: 0 auto;
  width: 50%;
  padding: 2rem
}

.row {
  margin: 1rem 0;
  display: flex;
  flex-direction: row;
}

.col {
  display: flex;
  flex-direction: column;
}

.col input,
.col select {
  height: 40px;
  margin: 0.5rem 0;
  padding: 0.5rem 1rem;
  border-radius: 10px;
  border: 1px solid #EEEEEE;
  outline: none;
  background-color: var(--white-50);
}

.profilePicture {
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
}

.profilePicture img {
  width: 200px;
  height: 200px;
  border-radius: 50%;
  object-fit: cover;
}

.edit {
  margin-top: 10px;
  cursor: pointer;
  color: #007bff;
  text-decoration: underline;
}
</style>
