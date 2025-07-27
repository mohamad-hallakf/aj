<template>
  <router-link :to="{ name: 'Products', query: { categoryId: category.name } }">
    <article class="categories__card">
      <img :src="getImage(category.img)" :alt="category.name" class="categories__img">
      <h3 class="categories__title">{{ category.name }}</h3>
    </article>
  </router-link>
</template>

<script setup>
const props = defineProps({
  category: {
    type: Object,
    required: true
  }
})

function getImage(fileName) {
  return new URL(`../assets/img/${fileName}`, import.meta.url).href
}
</script>

<style scoped></style>
