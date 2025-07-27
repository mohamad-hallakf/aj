<template>
    <main class="main">
        <!--==================== HOME ====================-->
        <section class="home" id="home">
            <div dir="ltr" class="home__container container grid">
                <div class="home__img-bg wavy-circle">
                    <img src="../assets/img/home.png" alt="" class="home__img ">
                </div>
                <div class="home__social">
                    <a :href="facbookPage" target="_blank" class="home__social-link">
                        {{ $t('common.facebook') }}
                    </a>
                    <a :href="whatsappPage" target="_blank" class="home__social-link">
                        {{ $t('common.whatsapp') }}
                    </a>
                    <a :href="instaPage" target="_blank" class="home__social-link">
                        {{ $t('common.instagram') }}
                    </a>
                </div>
                <div class="home__data">
                    <h1 class="home__title">{{ $t('home.title') }}</h1>
                    <p class="home__description">
                        {{ $t('home.description') }}
                    </p>
                        <router-link to="/products">
                            <a href="#" class="button home__button">
                                                          {{ $t('home.discover') }}

                            </a>
                        </router-link>
                       
                </div>
            </div>
        </section>
        <!--==================== products ====================-->
        <section class="new section container" id="products">
            <h2 class="section__title">
                {{ $t('home.newProducts') }}
            </h2>
            <div class="new__container">
                <div class="swiper new-swiper">
                          <div class="swiper-button-next-p">
                            <i class='bx bx-right-arrow-alt'></i>
                        </div>
                        <div class="swiper-button-prev-p">
                            <i class='bx bx-left-arrow-alt'></i>
                        </div>
                    <div class="swiper-wrapper">
                        
                        <ProductCard v-for="product in products?.slice(0,5)" :key="product.id" :product="product"
                            @product-click="openProductModal" />
                    </div>
                </div>
            </div>
        </section>
        <!--==================== categories ====================-->
        <section class="categories section container" id="categories">
            <h2 class="section__title">
                {{ $t('home.categories') }}
            </h2>
            <div class="categories__container grid">
                <CategoryCard v-for="category in categories" :key="category.id" :category="category" />
            </div>
        </section>
        <!--==================== Locations ====================-->
        <section dir="rtl" class="story section container " id="locations">
            <h2 class="section__title">
                {{ $t('home.locations') }}
            </h2>
            <div class="locations-buttons">
                <button data-location="1" type="button" class="button location-btn active button--small">{{ $t('home.saifAldollah') }}</button>
                <button data-location="2" type="button" class="button location-btn  button--small">{{ $t('home.alTelall') }}</button>
            </div>
            <div data-id="1" class="story__container grid  location-div">
                <div class="story__data">
                    <h2 class="section__title story__section-title">
                        {{ $t('home.loc1') }}
                    </h2>
                    <h1 class="story__title">
                        {{ $t('home.loc1_title') }}
                    </h1>
                    <p class="story__description">
                        {{ $t('home.loc1_subtitle') }}
                    </p>
                    <a href="https://maps.app.goo.gl/cD68sdTdjzksECYQ6" target="_blank"  class="button button--small show-map">{{ $t('home.showOnMap') }}</a>
                </div>
                <div class="story__images ">
                    <img src="../assets/img/loc1.png" alt="" class="story__img">
                    <div class="story__square"></div>
                </div>
            </div>
            <div data-id="2" class="story__container grid   location-div" style="display: none;">
                <div class="story__data">
                    <h2 class="section__title story__section-title">
                        {{ $t('home.loc2') }}
                    </h2>
                    <h1 class="story__title">
                        {{ $t('home.loc2_title') }}
                    </h1>
                    <p class="story__description">
                        {{ $t('home.loc2_subtitle') }}
                    </p>
                    <a href="https://maps.app.goo.gl/Qu1STCYBbW2QysKMA" target="_blank" class="button button--small show-map">{{ $t('home.showOnMap') }}</a>
                </div>
                <div class="story__images ">
                    <img src="../assets/img/loc2.png" alt="" class="story__img">
                    <div class="story__square"></div>
                </div>
            </div>
        </section>
        <ProductGallery ref="product-gallery" />
    </main>
</template>
<script setup>
import { computed, onMounted, useTemplateRef } from 'vue';
// import products from "@/data/products.json";
import ProductCard from "@/components/ProductCard.vue";
import ProductGallery from "@/components/ProductGallery.vue";
import categories from '@/data/categories.json';
import CategoryCard from '@/components/CategoryCard.vue';
import { useProductsStore } from '@/stores/products';

const productsStore = useProductsStore();
const products = computed(() => productsStore.products);
const facbookPage = import.meta.env.VITE_SOCIAL_FACEBOOK;
const instaPage = import.meta.env.VITE_SOCIAL_INSTAGRAM;
const whatsappPage = import.meta.env.VITE_SOCIAL_WHATSAPP;
const productGallery = useTemplateRef('product-gallery')
function openProductModal(product) {
    productGallery.value.openProductModal(product);
}
onMounted(() => {

    productsStore.fetchProducts()
    const locationButtons = document.querySelectorAll('.location-btn');
    const locations = document.querySelectorAll('.location-div');
    locationButtons.forEach(button => {
        button.addEventListener('click', () => {
            // Toggle active class on buttons
            locationButtons.forEach(btn => btn.classList.remove('active'));
            button.classList.add('active');
            // Show/Hide locations with animation
            let buttonLocationId = button.getAttribute('data-location');
            locations.forEach(location => {
                let locationId = location.getAttribute('data-id');
                console.log(locationId, buttonLocationId);
                if (buttonLocationId === locationId) {
                    location.style.display = 'grid';
                    location.style.opacity = 0;
                    setTimeout(() => {
                        location.style.opacity = 1;
                        location.style.transition = 'opacity 0.5s ease-in-out';
                    }, 10);
                } else {
                    location.style.opacity = 0;
                    setTimeout(() => {
                        location.style.display = 'none';
                    }, 500);
                }
            });
        });
    });
    new Swiper(".new-swiper", {
        spaceBetween: 24,
        loop: 'true',
             navigation: {
                        nextEl: '.swiper-button-next-p',
                        prevEl: '.swiper-button-prev-p',
                    },
        breakpoints: {
            576: {
                slidesPerView: 2,
            },
            768: {
                slidesPerView: 3,
            },
            1024: {
                slidesPerView: 4,
            },
        },
    });
});
</script>
<style></style>