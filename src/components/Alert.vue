<template>
    <transition name="fade">
        <div v-if="alertStore.visible" :class="['alert', alertStore.type]">
            <p>{{ alertStore.message }}</p>
            <span @click="closeAlert">X</span>
        </div>
    </transition>
</template>

<script setup lang="ts">
import { useAlertStore } from '@/stores/alertStore';

const alertStore = useAlertStore();

const closeAlert = () => {
    alertStore.hideAlert();
};
</script>

<style>
.alert {
    display: flex;
    align-items: center;
    position: fixed;
    top: 0;
    right: 0;
    padding: 1em;
    margin: 1em;
    border-radius: 6px;
    z-index: 999;
}

.alert span {
    padding: 10px;
    cursor: pointer;
}

.alert.success {
    background-color: #dff0d8;
    color: #3c763d;
}

.alert.error {
    background-color: #f2dede;
    color: #a94442;
}

.alert.warning {
    background-color: #fcf8e3;
    color: #8a6d3b;
}

.fade-enter-active,
.fade-leave-active {
    transition: opacity 0.5s;
}

.fade-enter,
.fade-leave-to {
    opacity: 0;
}
</style>
