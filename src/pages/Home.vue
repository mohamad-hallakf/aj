<template>
    <main class="main">
        <!--==================== HOME ====================-->
        <section class="home" id="home">
            <div class="home__container container grid">
                <div class="home__img-bg wavy-circle">
                    <img src="../assets/img/home.png" alt="" class="home__img ">
                </div>
                <div class="home__social">
                    <a href="https://www.facebook.com/" target="_blank" class="home__social-link">
                        {{ $t('common.facebook') }}
                    </a>
                    <a href="https://twitter.com/" target="_blank" class="home__social-link">
                        {{ $t('common.whatsapp') }}
                    </a>
                    <a href="https://www.instagram.com/" target="_blank" class="home__social-link">
                        {{ $t('common.instagram') }}
                    </a>
                </div>
                <div class="home__data">
                    <h1 class="home__title">{{ $t('home.title') }}</h1>
                    <p class="home__description">
                        {{ $t('home.description') }}
                    </p>
                    <div class="home__btns">
                        <router-link to="/products">
                            <a href="#" class="button button--small">
                                {{ $t('home.discover') }}
                            </a>
                        </router-link>
                        <button class="button home__button">
                            {{ $t('home.contactWhatsapp') }}
                            <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" fill="currentColor"
                                viewBox="0 0 22 22">
                                <path fill-rule="evenodd"
                                    d="M18.403 5.633A8.92 8.92 0 0 0 12.053 3c-4.948 0-8.976 4.027-8.978 8.977 0 1.582.413 3.126 1.198 4.488L3 21.116l4.759-1.249a9 9 0 0 0 4.29 1.093h.004c4.947 0 8.975-4.027 8.977-8.977a8.93 8.93 0 0 0-2.627-6.35m-6.35 13.812h-.003a7.45 7.45 0 0 1-3.798-1.041l-.272-.162-2.824.741.753-2.753-.177-.282a7.45 7.45 0 0 1-1.141-3.971c.002-4.114 3.349-7.461 7.465-7.461a7.41 7.41 0 0 1 5.275 2.188 7.42 7.42 0 0 1 2.183 5.279c-.002 4.114-3.349 7.462-7.461 7.462m4.093-5.589c-.225-.113-1.327-.655-1.533-.73s-.354-.112-.504.112-.58.729-.711.879-.262.168-.486.056-.947-.349-1.804-1.113c-.667-.595-1.117-1.329-1.248-1.554s-.014-.346.099-.458c.101-.1.224-.262.336-.393s.149-.224.224-.374.038-.281-.019-.393c-.056-.113-.505-1.217-.692-1.666-.181-.435-.366-.377-.504-.383a10 10 0 0 0-.429-.008.83.83 0 0 0-.599.28c-.206.225-.785.767-.785 1.871s.804 2.171.916 2.321 1.582 2.415 3.832 3.387c.536.231.954.369 1.279.473.537.171 1.026.146 1.413.089.431-.064 1.327-.542 1.514-1.066s.187-.973.131-1.067-.207-.151-.43-.263"
                                    clip-rule="evenodd"></path>
                            </svg>
                        </button>
                    </div>
                </div>
            </div>
        </section>
        <!--==================== products ====================-->
        <section class="new section container" id="products">
            <h2 class="section__title">
                {{ $t('home.newArrivals') }}
            </h2>
            <div class="new__container">
                <div class="swiper new-swiper">
                    <div class="swiper-wrapper">
                        <ProductCard v-for="product in products" :key="product.id" :product="product"
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
                        {{ $t('home.inspirationalWatch') }}
                    </h1>
                    <p class="story__description">
                        {{ $t('home.watchDescription') }}
                    </p>
                    <a href="#" class="button button--small">{{ $t('home.discover') }}</a>
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
                        {{ $t('home.inspirationalWatch') }}
                    </h1>
                    <p class="story__description">
                        {{ $t('home.watchDescription') }}
                    </p>
                    <a href="#" class="button button--small">{{ $t('home.discover') }}</a>
                </div>
                <div class="story__images ">
                    <img src="../assets/img/loc1.png" alt="" class="story__img">
                    <div class="story__square"></div>
                </div>
            </div>
        </section>
        <ProductGallery ref="product-gallery" />
    </main>
</template>
<script setup>
import { ref, onMounted, useTemplateRef } from 'vue';
import products from "@/data/products.json";
import ProductCard from "@/components/ProductCard.vue";
import ProductGallery from "@/components/ProductGallery.vue";
import categories from '@/data/categories.json';
import CategoryCard from '@/components/CategoryCard.vue';
const productGallery = useTemplateRef('product-gallery')
function openProductModal(product) {
    productGallery.value.openProductModal(product);
}
onMounted(() => {
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