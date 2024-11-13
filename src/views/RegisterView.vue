<script setup lang="ts">
import api from '@/api';
import MultistepForm from '@/components/MultistepForm.vue';
import { useAlertStore } from '@/stores/alertStore';
import { useLoadingStore } from '@/stores/loadingStore';
import type { AxiosResponse } from 'axios';
import { onBeforeUnmount, ref } from 'vue';
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
  profilePicture: BinaryData;
}

const userSignUp: SignUpParametersType = {
  name: '',
  userName: '',
  email: '',
  phone: '',
  birthDate: '',
  gender: -99,
  cpf: '',
  maritalStatus: -99,
  scholarship: -99,
  password: '',
  profilePicture: new Blob()
}

const webcamRef = ref<HTMLVideoElement | null>(null);
const stream = ref<MediaStream | null>(null);
const canvasRef = ref<HTMLCanvasElement | null>(null);

const startWebcam = async () => {
  try {
    stream.value = await navigator.mediaDevices.getUserMedia({ video: true });
    if (webcamRef.value && stream.value) {
      webcamRef.value.srcObject = stream.value;
    }
  } catch (error) {
    console.warn("Câmera não encontrada, usando vídeo simulado.");
    if (webcamRef.value) {
      webcamRef.value.src = "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4"; // Caminho para um vídeo local
      webcamRef.value.loop = true;
      webcamRef.value.play();
    }
  }
};

const captureImage = () => {
  if (webcamRef.value && canvasRef.value) {
    const canvas = canvasRef.value;
    const context = canvas.getContext("2d");

    if (context) {
      // Define o tamanho do canvas para coincidir com o vídeo
      canvas.width = webcamRef.value.videoWidth;
      canvas.height = webcamRef.value.videoHeight;

      // Desenha o quadro atual do vídeo no canvas
      context.drawImage(webcamRef.value, 0, 0, canvas.width, canvas.height);

      // Converte o conteúdo do canvas para Blob e salva a imagem
      canvas.toBlob((blob) => {
        if (blob) {
          saveImage(blob);
        }
      }, "image/png");
    }
  }
};

const stopWebcam = () => {
  if (stream.value) {
    stream.value.getTracks().forEach((track) => track.stop());
    stream.value = null;
  }
  if (webcamRef.value) {
    webcamRef.value.srcObject = null;
  }
  webcamRef.value = null;
};

onBeforeUnmount(() => {
  stopWebcam();
});

const submit = () => {
  const loading = useLoadingStore();
  const alert = useAlertStore();

  try {
    loading.setLoading(true);

    const signUpResult = api.post('users', userSignUp);

    alert.showAlert('User registered successfully', 'success');

    loading.setLoading(false);

    router.push({ name: 'signin' });

  } catch (error) {
    loading.setLoading(false);

    console.log(error);

    alert.showAlert('Error while signing up', 'error');
  }
}
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
        Wellcome
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
                  <option>Select</option>
                  <option :value="0">None</option>
                  <option :value="1">Bachelor</option>
                  <option :value="2">Master</option>
                </select>
              </div>
              <div class="col">
                <label for="phone">Phone</label>
                <input type="text" name="phone" id="phone" v-model="userSignUp.phone" placeholder="(xx) xxxxx-xxxx"
                  required class="needs-validation">
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
                  <option value="">Select</option>
                  <option :value="0">Male</option>
                  <option :value="1">Female</option>
                  <option :value="2">Other</option>
                </select>
              </div>
            </div>
            <div class="row">
              <div class="col">
                <label for="cpf">CPF</label>
                <input type="text" name="cpf" id="cpf" v-model="userSignUp.cpf" placeholder="xxx.xxx.xxx-xx" required
                  class="needs-validation">
              </div>
              <div class="col">
                <label for="marital-status">Marital Status</label>
                <select name="marital-status" id="marital-status" v-model="userSignUp.maritalStatus" required
                  class="needs-validation">
                  <option value="">Select</option>
                  <option :value="0">Single</option>
                  <option :value="1">Married</option>
                  <option :value="2">Divorced</option>
                  <option :value="3">Widowed</option>
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
          <div class="webcam-container">
            <!-- <video ref="webcamRef" autoplay playsinline>
              Camera
            </video> -->
            <img src="../assets/images/image.png" alt="">
            <canvas ref="canvasRef" style="display: none;"></canvas>
            <div class="btns">
              <div class="btn start" @click="startWebcam">Iniciar Webcam</div>
              <div class="btn capture" @click="captureImage">Capturar Imagem</div>
              <div class="btn stop" @click="stopWebcam">Parar Webcam</div>
            </div>
          </div>
        </template>
      </MultistepForm>
    </div>
  </div>
</template>

<style scoped>
.webcam-container {
  display: flex;
  justify-content: center;
  align-items: center;
  margin-bottom: 80px;
}

video {
  margin: 3rem 0;
  border: 2px solid #4CAF50;
  border-radius: 50%;
  width: 200px;
  height: 200px;
  object-fit: cover;
}

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
  display: flex;
  flex-direction: row;
}

.col {
  display: flex;
  flex-direction: column;
}

.col input,
.col select {
  margin: 0.5rem 0;
  padding: 0.5rem 1rem;
  border-radius: 5px;
  border: 1px solid #E4EEEE;
  outline: none;
  background-color: var(--white-50);
}

.webcam-container {
  display: flex;
  flex-direction: column;
}
</style>
