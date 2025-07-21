<script setup>
import MainHeader from './components/Header.vue'
import MainFooter from './components/Footer.vue'
import QuickAction from './components/QuickAction.vue'
import Cart from './components/Cart.vue'


</script>

<template>
  <main>
    <MainHeader />
    <QuickAction />
    <router-view />
    <Cart />
    <MainFooter />
  </main>
</template>

<style>
@import '@/assets/css/swiper-bundle.min.css';
@import '@/assets/css/styles.css';
</style>
