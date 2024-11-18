<script lang="ts" setup>
import { ref } from 'vue';

defineProps(['title', 'items']);

const isDropdownVisible = ref(false);
const activeSubDropdown = ref(null);

const showDropdown = () => {
  isDropdownVisible.value = true;
}

const hideDropdown = () => {
  isDropdownVisible.value = false;
  activeSubDropdown.value = null;
}

const showSubDropdown = (index: number) => {
  activeSubDropdown.value = index;
}
</script>

<template>
  <div class="dropdown-wrapper" @mouseover="showDropdown" @mouseleave="hideDropdown">
    <a class="dropbtn" href="#">
      {{ title }}
      <img src="../assets/images/icons/arrow-down.webp" alt="arrow">
    </a>
    <div class="dropdown" v-show="isDropdownVisible">
      <a class="dropbtn" v-for="(item, index) in items" :key="index" @mouseover="showSubDropdown(index)">
        {{ item.label }}
        <img v-if="item.subItems" src="../assets/images/icons/arrow-right.webp" alt="arrow">
      </a>
      <div class="dropdown subdropdown" v-show="activeSubDropdown !== null">
        <a v-for="(subItem, subIndex) in items[activeSubDropdown].subItems" :key="subIndex" href="#">{{ subItem }}</a>
      </div>
    </div>
  </div>
</template>