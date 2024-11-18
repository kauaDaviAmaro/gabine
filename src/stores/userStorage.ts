import type { User } from "@/models/User";
import { defineStore } from "pinia";
import { ref } from "vue";

const useUserStorage = defineStore('user', () => {
  const user = ref<User | null>(null);

  const getUser = () => {
    return JSON.parse(localStorage.getItem('USER') ?? '{}');
  }

  const setUser = (user: User) => {
    localStorage.setItem('USER', JSON.stringify(user));
  }

  return {
    getUser,
    setUser,
    user
  }
});

export default useUserStorage;
