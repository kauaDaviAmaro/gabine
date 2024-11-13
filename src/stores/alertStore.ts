import { defineStore } from 'pinia';

export const useAlertStore = defineStore('alert', {
  state: () => ({
    message: '',
    type: '',
    visible: false,
    timeout: 5000,
  }),
  actions: {
    timeout: 5000,
    showAlert(message: string, type: string = 'success', timeout: number = 5000) {
      this.message = message;
      this.type = type;
      this.visible = true;

      this.startTimeout(timeout);
    },
    hideAlert() {
      this.visible = false;
      this.message = '';
      this.type = '';
    },
    startTimeout(timeout: number) {
      setTimeout(() => {
        this.hideAlert();
      }, timeout);
    },
    
  },
});
