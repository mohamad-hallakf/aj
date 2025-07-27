<script setup>
import MainHeader from './components/Header.vue'
import MainFooter from './components/Footer.vue'
import QuickAction from './components/QuickAction.vue'
import Cart from './components/Cart.vue'
import { useProductsStore } from '@/stores/products';

const productsStore = useProductsStore();

</script>

<template>
  <main>
    <MainHeader />
    <QuickAction />
    <router-view />
    <Cart />
    <MainFooter />
    <div  v-if="productsStore.isLoading"  class="loader-overlay">
      <div class="loader"></div>
    </div>
  </main>
</template>

<style>
@import '@/assets/css/swiper-bundle.min.css';
@import '@/assets/css/styles.css';
</style>
