<template>
  <article class="new__card swiper-slide" @click="emitProductClick">
    <span class="new__tag" v-if="product.category">{{ product.category }}</span>
    <img v-if="product.gallery"     loading="lazy"  :src="product.gallery[0]?? '/src/assets/img/logo.png'" :alt="product.name" class="new__img" />
    <div class="new__data">
      <h3 class="new__title">{{ product.name }}</h3>
      <span class="new__price">${{ product.price }}</span>
    </div>
  </article>
</template>

<script setup>
const props = defineProps({
  product: {
    type: Object,
    required: true
  }
})
const emit = defineEmits(['product-click'])

 

function emitProductClick() {
  emit('product-click', props.product)
}
</script>

<style scoped></style>
