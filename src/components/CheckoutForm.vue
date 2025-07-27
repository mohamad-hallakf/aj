<template>
  <div class="modal fade" id="checkoutModal" tabindex="-1">
    <div class="modal-dialog modal-md modal-dialog-centered">
      <div class="modal-content">
        <form id="msform">
          <!-- progressbar -->
          <ul id="progressbar">
            <li v-for="(step, index) in steps" :key="index" :class="{ active: currentStepIndex >= index }">
              {{ $t(step.title) }}
            </li>
          </ul>

          <!-- fieldsets -->
          <fieldset v-if="currentStepIndex === 0" key="step1">
            <h2 class="fs-title">{{ $t('checkout.personalDetails') }}</h2>
            <input type="text" v-model="formData.name" :placeholder="$t('checkout.firstName')" />
            <input type="text" v-model="formData.address" :placeholder="$t('checkout.address')" />
            <input type="button" @click="nextStep" class="next action-button" :value="$t('checkout.next')" />
          </fieldset>

          <fieldset v-if="currentStepIndex === 1" key="step2">
            <h2 class="fs-title">{{ $t('checkout.cartProducts') }}</h2>
            <div>
              <div class="cart__prices">
                <span>{{ $t('checkout.priceQuantity') }}</span>
                <span>{{ $t('checkout.product') }}</span>

              </div>
              <div v-for="item in cartStore.items" :key="item.id" class="cart__prices">
                <span>{{ item.price * item.quantity }}</span>
                <span>...............</span>

                <span> ({{ item.quantity }}) {{ item.name }} </span>

              </div>
              <hr>
              <div class="cart__prices">
                <span>{{ cartStore.totalItems }} {{ $t('cart.items') }}</span>
                <span>{{ cartStore.totalCost }} {{ $t('checkout.total') }}</span>
              </div>
            </div>

            <input type="button" @click="prevStep" class="previous action-button-previous"
              :value="$t('checkout.previous')" />
            <input type="button" @click="nextStep" class="next action-button" :value="$t('checkout.next')" />
          </fieldset>

          <fieldset v-if="currentStepIndex === 2" key="step3">

            <h2 class="fs-title">{{ $t('checkout.checkoutComplete') }}</h2>
            <div class="form-check">
              <input v-model="isCheckedDelivery" class="form-check-input" type="checkbox" value="" id="myCheckbox">

              <label class="form-check-label" for="myCheckbox">
                {{ $t('checkout.needDelivery') }} </label>

            </div>
            <input type="button" @click="prevStep" class="previous action-button-previous"
              :value="$t('checkout.previous')" />
            <input type="submit" @click.prevent="submitForm" class="submit action-button"
              :value="$t('checkout.submit')" />
          </fieldset>
        </form>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, reactive, onMounted } from 'vue'
import { useCartStore } from '../stores/cart';
const cartStore = useCartStore();
const isCheckedDelivery = ref(false);
let checkoutModal = null;
onMounted(() => {
  checkoutModal = new window.bootstrap.Modal(document.getElementById("checkoutModal"));
});
// Form steps configuration
const steps = [
  { title: 'checkout.personalDetails' },
  { title: 'checkout.cartProducts' },
  { title: 'checkout.checkoutComplete' }
]

// Form data model
const formData = reactive({
  name: '',
  address: '',
})

// Current step tracking
const currentStepIndex = ref(0)

// Navigation functions
const nextStep = () => {

  if (currentStepIndex.value < steps.length - 1) {
    currentStepIndex.value += 1
  }
}

const prevStep = () => {

  if (currentStepIndex.value > 0) {
    currentStepIndex.value--
  }


}

// Form submission
const submitForm = () => {


  let message = "اسم الزبون \t " + formData.name + " \n العنوان \t  " + formData.address + "\n";
  message += isCheckedDelivery.value ? " اضافة خدمة التوصيل \n" : "";
  message += "الموديل\t \السعر\n -------\t \t-----\n";

  cartStore.items.forEach(item => {
    message += `${item.name + "(" + item.id + ")"}\t \t${item.price * item.quantity}\n`;
  });

  message += "إجمالي \t " + cartStore.totalCost + "\n العدد   \t " + cartStore.totalItems;

  const whatsappNumber = import.meta.env.VITE_WHATSAPP_NUMBER;

  const encodedMessage = encodeURIComponent(message);

  cartStore.clearCart()
  checkoutModal.hide()
  window.open(`https://wa.me/${whatsappNumber}?text=${encodedMessage}`, '_blank');
}
</script>

<style scoped></style>