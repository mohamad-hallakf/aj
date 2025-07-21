<template>
  <div class="cart" id="cart">
    <i class='bx bx-x cart__close' id="cart-close"></i>

    <h2 class="cart__title-center">{{ $t('cart.myCart') }}</h2>

    <div class="cart__container">
      <article class="cart__card" v-for="item in cartItems" :key="item.id">
        <div class="cart__box">
          <img :src="getImage(item.img)" alt="" class="cart__img">
        </div>

        <div class="cart__details">
          <h3 class="cart__title">{{ item.name }}</h3>
          <span class="cart__price">${{ item.price }}</span>

          <div class="cart__amount">
            <div class="cart__amount-content">
              <span class="cart__amount-box" @click="decreaseQuantity(item.id)">
                <i class='bx bx-minus'></i>
              </span>

              <span class="cart__amount-number">{{ item.quantity }}</span>

              <span class="cart__amount-box" @click="increaseQuantity(item.id)">
                <i class='bx bx-plus'></i>
              </span>
            </div>

            <i class='bx bx-trash-alt cart__amount-trash' @click="removeFromCart(item.id)"></i>
          </div>
        </div>
      </article>
    </div>


    <div class="d-flex justify-content-center flex-column" v-if="cartItems.length">
      <hr>
      <div class="cart__prices">
        <span class="cart__prices-item">{{ cartStore.totalItems }} {{ $t('cart.items') }}</span>
        <span class="cart__prices-total">{{ cartStore.totalCost }}</span>
      </div>

      <button @click="checkout()" type="button" class="button checkout-button w-100">{{ $t('cart.checkout') }}</button>
    </div>

    <div v-else class="d-flex justify-content-center flex-column align-items-center h-100">
      <img class="empty-cart" src="/src/assets/img/empty-cart.png" alt="">
      <div class="cart-text">{{ $t('cart.noItems') }}</div>
    </div>
  </div>
  <CheckoutForm />

</template>

<script setup>
import { computed ,onMounted} from 'vue';
import { useCartStore } from '../stores/cart';

import CheckoutForm from "./CheckoutForm.vue"
function getImage(fileName) {
  return new URL(`../assets/img/${fileName}`, import.meta.url).href
}
const cartStore = useCartStore();
const cartItems = computed(() => cartStore.items);

function increaseQuantity(itemId) {
  cartStore.incrementQuantity(itemId);
}
function removeFromCart(itemId) {
  cartStore.removeItem(itemId);
}
function checkout() {
  checkoutModal.show()
}

function decreaseQuantity(itemId) {
  cartStore.decrementQuantity(itemId);
}

let checkoutModal = null;

onMounted(() => {
  checkoutModal = new window.bootstrap.Modal(document.getElementById("checkoutModal"));
});
</script>

<style scoped>
ul {
  list-style-type: none;
  padding: 0;
}

li {
  margin-bottom: 0.5rem;
}

.empty-cart {
  width: 150px;
}
</style>
