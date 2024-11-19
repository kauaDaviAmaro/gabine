<script setup lang="ts">
import { ref } from 'vue';

const { steps } = defineProps({
  steps: Number
});

const emit = defineEmits(['submit'])

const currentStep = ref(1);

const validateForm = (form) => {
  let isValid = true;

  const inputs = form.querySelectorAll('.needs-validation');
  inputs.forEach(input => {
    const parentElement = input.parentElement as any;
    if (!input.checkValidity()) {
      input.classList.remove('valid');
      input.classList.add('invalid');
      isValid = false;
    } else {
      input.classList.add('valid');
      input.classList.remove('invalid');
    }
  });

  return isValid;
}

const nextStep = async (steps: number) => {
  const form = document.querySelector(`#step-${currentStep.value}>form`);
  if (!validateForm(form)) {
    return;
  }

  if (currentStep.value < steps) {
    currentStep.value++;
    return;
  }

  emit('submit');
}
</script>

<template>
  <slot name="progress">
    <div class="progress">
      {{ currentStep }} / {{ steps }} steps
      <div class="progress-bar-wrapper">
        <div class="progress-bar" :style="`width: ${(currentStep) / steps * 100}%`"></div>
      </div>
    </div>
  </slot>
  <div v-for="(step, index) in steps" :key="index" :id="`step-${index + 1}`" v-show="index === currentStep - 1">
    <form @submit.prevent="nextStep(steps)" novalidate>
      <slot :name="`step-${index + 1}`"></slot>
      <slot name="buttons">
        <div class="buttons">
          <button class="back" v-if="currentStep > 1" type="button" @click="currentStep--">Back</button>
          <button v-if="currentStep < steps" type="submit">Next</button>
          <button v-else type="submit">Submit</button>
        </div>
      </slot>
    </form>
  </div>
</template>

<style scoped>
.progress {
  margin: 20px 0;
}

.progress-bar-wrapper {
  background-color: #f5f5f5;
  border-radius: 10px;
  padding: 3px;
}

.progress-bar {
  background: repeating-linear-gradient(-120deg, #736f6f 0, #736f6f 25px, #fff 0, #fff 30px);
  background-size: 50px 50px;
  animation: barberpole 10s infinite linear;
  height: 20px;
  border-radius: 10px;
}

form {
  min-height: 300px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}

@keyframes barberpole {
  0% {
    background-position: 0% 0;
  }

  100% {
    background-position: 200% 0;
  }
}

button {
  background-color: black;
  border: none;
  color: white;
  padding: 10px 20px;
  text-align: center;
  text-decoration: none;
  display: inline-block;
  font-size: 16px;
  margin: 4px 2px;
  cursor: pointer;
  border-radius: 5px;
  transition: background-color 0.3s ease-in-out;

  &:hover{
    border: 1px solid black;
    background-color: rgb(75, 75, 75);
  }
}

.back {
  border: 1px solid black;
  background-color: #FFFF;
  color: black;

  &:hover{
    background-color: rgb(25, 25, 25);
    color: #FFFF;
  }
}
</style>
