<script setup lang="ts">
import { onMounted, reactive, ref } from 'vue';
import { RouterLink } from 'vue-router';
import eye from '@/assets/images/icons/eye.webp';
import eyeSlash from '@/assets/images/icons/eye-slash.webp';
import api from '@/api';
import type { AxiosResponse } from 'axios';
import router from '@/router';
import { useAlertStore } from '@/stores/alertStore';
import { useLoadingStore } from '@/stores/loadingStore';

const remember = ref(false);
const showPassword = ref(false);

const togglePassword = () => {
  showPassword.value = !showPassword.value;
}

const validateForm = (e: Event) => {
  let isValid = true;

  const inputs = e.target.querySelectorAll('.needs-validation');
  inputs.forEach(input => {
    if (!input.checkValidity()) {
      (input.parentElement as HTMLElement).classList.remove('valid');
      (input.parentElement as HTMLElement).classList.add('invalid');
      isValid = false;
    } else {
      (input.parentElement as HTMLElement).classList.add('valid');
      (input.parentElement as HTMLElement).classList.remove('invalid');
    }
  });

  return isValid;
}

type SignInParametersType = { email: string; password: string; };

const userLogin: SignInParametersType = reactive({
  email: '',
  password: ''
})

const sendLogin = async (e: Event) => {
  if (!validateForm(e)) {
    return;
  }

  if (remember.value) {
    localStorage.setItem('email', userLogin.email);
    localStorage.setItem('password', userLogin.password);
  }

  const loading = useLoadingStore();
  const alert = useAlertStore();

  try {
    loading.setLoading(true);
    const signInResult = await api.post<string, AxiosResponse<string>, SignInParametersType>('Auth/signIn', userLogin);

    window.localStorage.setItem("AUTH_TOKEN", signInResult.data);

    const userData = await api.get<string, AxiosResponse<string>, string>('Users');

    window.localStorage.setItem("USER", JSON.stringify(userData.data));

    loading.setLoading(false);

    alert.showAlert('Login successful', 'success');

    router.push({ name: 'home' });
  } catch (error) {
    loading.setLoading(false);

    alert.showAlert('Email or password is incorrect', 'error');
  }
}

onMounted(() => {
  const email = localStorage.getItem('email');
  const password = localStorage.getItem('password');

  userLogin.email = email || '';
  userLogin.password = password || '';

  if (email && password) {
    remember.value = true;
  } else {
    localStorage.removeItem('email');
    localStorage.removeItem('password');
  }
})
</script>

<template>
  <div class="container">
    <div class="image">
      <h1>
        <div>Gabini</div>
        <div>Headset</div>
        <div>Store</div>
      </h1>
      <img src="../assets/images/login/Fone.webp" alt="headset" class="headset" aria-hidden="true">
      <img src="../assets/images/login/Logo.webp" alt="Brand Logo" class="brand" aria-hidden="true">
    </div>
    <div class="login">
      <h1>
        Wellcome
      </h1>
      <p>
        Sign in your account:
      </p>
      <form novalidate @submit.prevent="sendLogin">
        <div class="input-group">
          <img src="../assets/images/icons/Mail.webp" alt="mail">
          <input class="needs-validation" type="string" placeholder="Email Address or Username" required
            title="Please enter your email or username" v-model="userLogin.email">
        </div>
        <div class="input-group">
          <img src="../assets/images/icons/Lock.webp" alt="lock">
          <input class="needs-validation" :type="showPassword ? 'text' : 'password'" placeholder="Password"
            title="Please enter your password" v-model="userLogin.password" required pattern=".{2,}">
          <img class="eye" :src="showPassword ? eyeSlash : eye" alt="eye" aria-hidden="true" @click="togglePassword">
        </div>

        <div class="remember">
          <input type="checkbox" name="remember" id="remember" v-model="remember">
          <label for="remember">Remember me</label>
        </div>

        <div class="forgot">
          <a href="#">Forgot password?</a>
        </div>

        <button type="submit">
          Sign in
        </button>

        <span>Don't have an account?
          <RouterLink to="/signup">Sign up</RouterLink>
        </span>
      </form>
    </div>
  </div>
</template>

<style scoped>
.container {
  display: flex;
}

.image {
  position: relative;
  background-color: #F2F2F2;
  height: 100vh;
  width: 60%;
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
  left: 0;
  padding: 4rem 0 0 2rem;
}

.image .headset {
  position: absolute;
  bottom: 0;
  right: 0;
  width: 80%;
}

.login {
  width: 400px;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  justify-content: center;
}

.login h1 {
  font-size: 26px;
}

.login p {
  font-size: 18px;
}

.login .input-group {
  position: relative;
  display: flex;
  align-items: center;
  margin: 20px 0;

  border: 1px solid #EEEEEE;
  border-radius: 10px;
  height: 60px;
  padding: 0 0 0 20px;
}

.login .input-group input {
  border-radius: 10px;
  width: 100%;
  height: 100%;
  outline: none;
  border: none;
  padding-left: 10px;
}

.login .remember {
  display: flex;
  align-items: center;
  gap: 10px;
  user-select: none;
}

.login .forgot {
  margin-bottom: 15px;
}

.login .remember input {
  background-color: #ECECEC
}

.login button[type="submit"] {
  margin-bottom: 10px;
  padding: 0;
  display: block;
  background-color: black;
  height: 50px;
  width: 100%;
  color: white;
  text-align: center;
  border-radius: 10px;
}

.login .input-group .eye {
  position: absolute;
  right: 20px;
  cursor: pointer;
  width: 20px;
  user-select: none;
}

.login a {
  text-decoration: none;
  color: #6358DC;
}

.login a:hover {
  text-decoration: underline;
}
</style>
