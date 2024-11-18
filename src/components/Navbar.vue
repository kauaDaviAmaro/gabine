<script setup lang="ts">
import api from '@/api';
import type { AxiosResponse } from 'axios';
import { onMounted, ref } from 'vue';
import { RouterLink } from 'vue-router';
import AddressModal from './AddressModal..vue';
import useCartStorage from '@/stores/CartStorage';

const cart = useCartStorage();

const backendUrl = import.meta.env.VITE_BACKEND_URL?.replace(/\/api$/, '');

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

const showAddressModal = ref(false);

onMounted(() => {
  const dropbuttons = document.querySelectorAll(".dropbtn");

  dropbuttons.forEach((dropbtn) => {
    const dropdown = dropbtn.nextElementSibling;

    if (!dropdown) return;

    const showDropdown = () => dropdown.classList.add("show");
    const hideDropdown = () => dropdown.classList.remove("show");

    dropbtn.addEventListener("mouseover", showDropdown);
    dropbtn.addEventListener("mouseleave", () => {
      setTimeout(() => {
        if (!dropdown.matches(':hover')) hideDropdown();
      }, 400);
    });

    dropdown.addEventListener("mouseover", showDropdown);
    dropdown.addEventListener("mouseleave", hideDropdown);
  });

  if (localStorage.getItem('AUTH_TOKEN') !== null) {
    user.value = JSON.parse(localStorage.getItem('USER') || '{}');

    getAddresses();
  }
});
</script>

<template>
  <nav class="navbar">
    <div class="brand">
      <img src="../assets/images/Logo.webp" alt="Logo da Gabini">
    </div>
    <div class="links">
      <RouterLink to="/">
        Home
      </RouterLink>
      <RouterLink to="/products">
        SALE
      </RouterLink>
      <a href="#">
        BUNDLE & SAVE
      </a>
      <div class="dropdown-wrapper">
        <a class="dropbtn" href="#">
          SHOP BY CATEGORY
          <img src="../assets/images/icons/arrow-down.webp" alt="arrow">
        </a>
        <div class="dropdown">
          <a class="dropbtn">
            ITEM 1
            <img src="../assets/images/icons/arrow-right.webp" alt="arrow">
          </a>
          <div class="dropdown subdropdown">
            <a href="#">ITEM 5</a>
            <a href="#">ITEM 6</a>
          </div>
          <a href="#">ITEM 2</a>
          <a href="#">ITEM 3</a>
          <a href="#">ITEM 4</a>
        </div>
      </div>
      <a href="#">
        SUPPORT
      </a>
    </div>
    <div class="login-register" v-if="!isLoggedIn">
      <RouterLink to="/signin" id="signin">
        SIGN IN
      </RouterLink>
      <RouterLink to="/signup" id="signup">
        SIGN UP FOR FREE
      </RouterLink>
    </div>
    <div class="profileArea" v-else>
      <div class="profile">
        <div class="links">
          <div class="dropdown-wrapper">
            <a href="#" class="dropbtn profileDropbtn">
              <span class="profileImageWrapper">
                <img class="profileImage" :src="`${backendUrl}/${user.profilePicture}`"
                  alt="" style="height: 50px;width: 50px;object-fit: cover;">
                {{ user.name }}
              </span>
              <img src="../assets/images/icons/arrow-down.webp" alt="arrow">
            </a>
            <div class="dropdown profileDropdown">
              <div class="info">
                <img :src="`${backendUrl}/${user.profilePicture}`" style="height: 50px;width: 50px;object-fit: cover  ;" alt="">
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
                  <div class="address-info" @click="addresses.map(address => address.isDefault = false); address.isDefault = true">
                    <span v-if="address.isDefault" class="default">
                      <img src="../assets/images/icons/check.png" alt="check">
                    </span>
                    <span>{{ address.street }}</span>
                  </div>
                </div>
                <a @click="showAddressModal = true" class="add-address">+ Add Address</a>
              </div>
              <a @click="logout" class="logout">
                <img src="../assets/images/icons/signOut.png" alt="sign out">
                Logout
              </a>
            </div>
          </div>
        </div>
      </div>
      <div class="cart-button">
        <RouterLink to="/cart" class="cart-link">
          <img src="../assets/images/icons/cart-regular-24.png" alt="cart" />
          <span class="cart-quantity" v-if="!cart.isEmpty">
            {{ cart.quantity }}
          </span>
        </RouterLink>
      </div>
    </div>
  </nav>

  <AddressModal v-if="showAddressModal" @close="showAddressModal = false" @addressAdded="getAddresses" />
</template>

<style>
.profileArea {
  display: flex;
  align-items: center;
  gap: 16px;
}

.cart-link {
  position: relative;
}

.cart-link .cart-quantity {
  position: absolute;
  top: 0px;
  right: 0px;
  width: 20px;
  height: 20px;
  border-radius: 50%;
  background-color: var(--blue);
  color: var(--white);
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 12px;
}

.navbar {
  z-index: 999999;
  position: sticky;
  top: 0;
  display: flex;
  justify-content: space-evenly;
  align-items: center;
  padding: 36px 0;
  border-bottom: 1px solid var(--white-600);
  font-size: 14px;
  background-color: var(--white-50);

  & a {
    padding: 0 16px;
    text-decoration: none;
    text-transform: uppercase;
    color: black;

    transition: transform 0.3s ease-in-out, color 0.3s ease-in-out;

    &:hover {
      color: var(--blue);
      transform: scale(1.015);
    }
  }

  & .brand {
    & img {
      width: 135px;
    }
  }

  & .links {
    position: relative;
    display: flex;

    & a {
      display: flex;
      align-items: center;
    }

    & .dropdown {
      z-index: 22;
      background-color: var(--white);
      position: absolute;
      margin: 10px 0;
      padding: 24px;

      width: 159px;
      border: 1px solid var(--white-600);

      box-shadow: rgba(0, 0, 0, 0.199) 0px 5px 15px;

      display: none;

      &.show {
        display: block;
      }

      & a {
        padding: 5px 0;
      }

      & .subdropdown {
        margin-top: 0;
        top: 0;
        left: 70%;
      }
    }
  }

  & .login-register {
    font-weight: 600;

    & #signin {
      border-right: 1px solid var(--white-600);
    }

    & #signup {
      color: var(--blue);
    }
  }
}

.profileDropbtn {
  width: 300px;
  border-radius: 10px;
  height: 60px;
  background-color: #f7f7f7;

  display: flex;
  align-items: center;
  justify-content: space-between;

  & img {
    border-radius: 50%;
    width: 30px;
  }

  & .profileImageWrapper {
    color: black;
    font-weight: bold;
    display: flex;
    gap: 10px;
    align-items: center;
    justify-content: space-between
  }
}

.profileDropdown {
  background-color: white;
  width: 100% !important;

  & .info {
    display: flex;
    gap: 10px;
    align-items: center;
    padding-bottom: 10px;

    border-bottom: 1px solid var(--white-600);
  }

  & img {
    border-radius: 50%;
  }

  & .user-info span {
    color: #777777;
  }

  & h3 {
    font-size: 18px;
    line-height: normal;
  }
}

.settings,
.logout,
.addresses h3 {
  display: flex;
  align-items: center;
  gap: 10px;
  font-size: 18px;
  font-weight: bold;
  height: 60px;
  border-radius: 5px;
  padding: 5px !important;
  text-transform: capitalize !important;
}

.logout {
  border-top: 1px solid var(--white-600);
  cursor: pointer;
}

.settings:hover {
  background-color: #f7f7f7;
}

.address {
  position: relative;
  font-size: 18px;
  padding-left: 40px;
  height: 40px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.default {
  position: absolute;
  left: 0;
}

.add-address {
  padding-left: 40px;
  height: 40px;
  cursor: pointer;
}


@media screen and (max-width: 768px) {
  .navbar .links {
    display: none;
  }
}
</style>
