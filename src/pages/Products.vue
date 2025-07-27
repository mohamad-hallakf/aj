<template>
  <div class="container   products-page">
    <div class="row mb-sm-3 mb-4 g-2 align-items-end">
      <div class="col-md-4 mb-sm-0 mb-3">
        <label class="form-label mb-1">{{ $t('products.search') }}</label>
        <input v-model="search" type="text" class="form-control" :placeholder="$t('products.searchPlaceholder')">
      </div>
      <div class="col-md-4 mb-sm-0 mb-3">
        <label class="form-label mb-1">{{ $t('products.category') }}</label>
        <select v-model="selectedCategory" class="form-select">
          <option value="">{{ $t('products.allCategories') }}</option>
          <option v-for="cat in categories" :key="cat.id" :value="cat.name">{{ cat.name }}</option>
        </select>
      </div>
      <div class="col-md-4 mb-sm-0 mb-3">
        <label class="form-label mb-1">{{ $t('products.priceRange') }}</label>
        <div class="d-flex align-items-center">
          <input v-model.number="minPrice" type="number" class="form-control me-2" :placeholder="$t('products.min')" min="0">
          <span class="mx-1">-</span>
          <input v-model.number="maxPrice" type="number" class="form-control ms-2" :placeholder="$t('products.max')" min="0">
        </div>
      </div>
    </div>

    <div class="row g-4">
      <div v-for="product in paginatedProducts" :key="product.id" class="col-12 col-sm-6 col-md-4 col-lg-3">
        <ProductCard :product="product" @product-click="openProductModal" />
      </div>
    </div>

    <nav v-if="totalPages > 1" class="mt-4">
      <ul class="pagination justify-content-center">
        <li class="page-item" :class="{ disabled: currentPage === 1 }">
          <button class="page-link" @click="goToPage(currentPage - 1)" :disabled="currentPage === 1">{{ $t('products.previous') }}</button>
        </li>
        <li v-for="page in totalPages" :key="page" class="page-item" :class="{ active: currentPage === page }">
          <button class="page-link" @click="goToPage(page)">{{ page }}</button>
        </li>
        <li class="page-item" :class="{ disabled: currentPage === totalPages }">
          <button class="page-link" @click="goToPage(currentPage + 1)"
            :disabled="currentPage === totalPages">{{ $t('products.next') }}</button>
        </li>
      </ul>
    </nav>
    <ProductGallery ref="product-gallery" />

  </div>
</template>

<script setup>
import { ref, computed, useTemplateRef, onMounted, watch } from 'vue';
import categoriesData from '@/data/categories.json';
import ProductCard from '@/components/ProductCard.vue';
import ProductGallery from "@/components/ProductGallery.vue";
import { useRoute } from 'vue-router'
import { useProductsStore } from '@/stores/products';

const productsStore = useProductsStore();
const products = computed(() => productsStore.products);

const route = useRoute()
const productGallery = useTemplateRef('product-gallery')

function openProductModal(product) {
  productGallery.value.openProductModal(product);
}

const categories = ref(categoriesData);
const search = ref(route.query.search ?? '');
const selectedCategory = ref(route.query.categoryId ?? '');
const minPrice = ref('');
const maxPrice = ref('');
const currentPage = ref(1);
const pageSize = 8;


const filteredProducts = computed(() => {
  return products.value.filter(product => {

    const matchesSearch = product.name.toLowerCase().includes(search.value.toLowerCase()) ||  product.name.toLowerCase().includes(search.value.toLowerCase()) ;
    const matchesCategory = !selectedCategory.value || product.category == selectedCategory.value;
    const matchesMin = !minPrice.value || product.price >= minPrice.value;
    const matchesMax = !maxPrice.value || product.price <= maxPrice.value;
    return matchesSearch && matchesCategory && matchesMin && matchesMax;
  });
});

const totalPages = computed(() => Math.ceil(filteredProducts.value.length / pageSize));

const paginatedProducts = computed(() => {
  const start = (currentPage.value - 1) * pageSize;
  return filteredProducts.value.slice(start, start + pageSize);
});

function goToPage(page) {
  if (page >= 1 && page <= totalPages.value) {
    currentPage.value = page;
    scrollTop()
  }
}

function scrollTop() {
setTimeout(() => {
  window.scrollTo({ top: 0, behavior: 'smooth' });
  
}, 100);
}
watch(
  () => route.query.search,
  (newSearch, oldSearch) => {
    search.value = newSearch
  }
)
onMounted(() => {
  scrollTop()
})
</script>

<style scoped>
.card-img-top {
  object-fit: cover;
  height: 180px;
}
</style>
