<script lang="ts">
import api from '@/api';
import type { AxiosResponse } from 'axios';
import { onMounted, ref } from 'vue';

const isLoggedIn = ref(localStorage.getItem('AUTH_TOKEN') !== null);
const user = ref({});

const addresses = ref([]);

const logout = () => {
  localStorage.removeItem('AUTH_TOKEN');
  localStorage.removeItem('USER');
  isLoggedIn.value = false;

  window.location.reload();
}

const getAddresses = async () => {
  try {
    const response: AxiosResponse = await api.get('/Address');
    addresses.value = response.data;
    addresses.value[0].isDefault = true;
  } catch (error) {
    console.error(error);
  }
}

onMounted(() => {
  getAddresses();
})
</script>

<template>
  <div class="profile">
    <div class="links">
      <div class="dropdown-wrapper">
        <a href="#" class="dropbtn profileDropbtn">
          <span class="profileImageWrapper">
            <img class="profileImage" :src="`https://picsum.photos/50`" alt="">
            {{ user.name }}
          </span>
          <img src="../assets/images/icons/arrow-down.webp" alt="arrow">
        </a>
        <div class="dropdown profileDropdown">
          <div class="info">
            <img :src="`https://picsum.photos/50`" alt="">
            <div class="user-info">
              <h3>{{ user.name }}</h3>
              <span>{{ user.email }}</span>
            </div>
          </div>
          <RouterLink to="/profile" class="settings">
            <img src="../assets/images/icons/settings.png" alt=""> Settings
          </RouterLink>
          <div class="addresses">
            <h3><img src="../assets/images/icons/address.png" alt="address">Addresses</h3>
            <div class="address" v-for="address in addresses" :key="address.id">
              <div class="address-info"
                @click="addresses.map(address => address.isDefault = false); address.isDefault = true">
                <span v-if="address.isDefault" class="default">
                  <img src="../assets/images/icons/check.png" alt="check">
                </span>
                <span>{{ address.street }}</span>
              </div>
            </div>
            <a @click="$emit('showAddressModal')" class="add-address">+ Add Address</a>
          </div>
          <a @click="logout" class="logout">
            <img src="../assets/images/icons/signOut.png" alt="sign out">
            Logout
          </a>
        </div>
      </div>
    </div>
  </div>
</template>