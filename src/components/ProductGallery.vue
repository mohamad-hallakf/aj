<template>
    <!-- Product Gallery Modal -->
    <div class="modal fade" :id="modalId" tabindex="-1" aria-labelledby="modalLabel" aria-hidden="true">
        <div class="modal-dialog modal-dialog-centered">
            <div class="modal-content">
                <div class="modal-body  gallery-modal" v-if="selectedProduct">
                    <button type="button" class="gallery-close-btn" data-bs-dismiss="modal"
                        aria-label="Close">&times;</button>

                    <div class="text-center mb-4">
                        <h3 class="fw-bold text-center">{{ selectedProduct.name }}

                        </h3>
                        <span class="badge bg-warning text-dark fs-5">${{ selectedProduct.price }}</span>

                    </div>

                    <div class="swiper-container home-product-swiper">
                        <div class="swiper-button-next">
                            <i class='bx bx-right-arrow-alt'></i>
                        </div>
                        <div class="swiper-button-prev">
                            <i class='bx bx-left-arrow-alt'></i>
                        </div>
                        <div class="swiper-wrapper">
                            <div class="swiper-slide" v-for="(img, idx) in selectedProduct.gallery" :key="idx">
                                <img :src="img" :alt="selectedProduct.name"
                                    style="width:100%;border-radius:10px;" />
                            </div>
                        </div>
                        <div class="swiper-pagination"></div>
                    </div>
                    <div class="text-center mt-3 mb-3">
                        <button @click="addToCart" class="button  py-2">ADD TO CART</button>

                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
import { ref, onMounted, nextTick } from 'vue';
import { useCartStore } from '../stores/cart';
import { inject } from 'vue';
const toast = inject('toast');
const cartStore = useCartStore();
const selectedProduct = ref(null);
const modalId = 'product-gallery-modal';
let swiperInstance = null;

function addToCart() {
    cartStore.addItem(selectedProduct.value,toast)
}
 
function openProductModal(product) {
    selectedProduct.value = product;
    nextTick(() => {
        const modal = new window.bootstrap.Modal(document.getElementById(modalId));
        modal.show();
        setTimeout(() => {
            if (window.Swiper) {
                if (swiperInstance) swiperInstance.destroy(true, true);
                swiperInstance = new window.Swiper('.home-product-swiper', {
                    navigation: {
                        nextEl: '.swiper-button-next',
                        prevEl: '.swiper-button-prev',
                    },
                    slidesPerView: 1,
                    loop: 'true',
                    pagination: {
                        el: ".swiper-pagination",
                    },
                });
            }
        }, 100);
    });
}

defineExpose({
  openProductModal
});

</script>