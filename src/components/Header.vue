<template>
    <header class="header" id="header">
        <nav class="nav container">
            <router-link to="/" class="nav__logo">
                <img src="../assets/img/logo.png" alt="" width="75">

            </router-link>

            <div class="nav__menu" id="nav-menu">
                <ul class="nav__list">
                    <li class="nav__item">
                        <router-link :to="{ name: 'Home', hash: '#home' }" class="nav__link active-link">{{ $t('nav.home') }}</router-link>
                    </li>
                  
                    <li class="nav__item">
                        <router-link :to="{ name: 'Home', hash: '#categories' }" class="nav__link">{{ $t('nav.categories') }}</router-link>
                    </li>
                    <li class="nav__item">
                        <router-link :to="{ name: 'Home', hash: '#products' }" class="nav__link">{{ $t('nav.products') }}</router-link>
                    </li>

                      <li class="nav__item">
                        <router-link :to="{ name: 'Home', hash: '#locations' }" class="nav__link">{{ $t('nav.locations') }}</router-link>
                    </li>
                </ul>

                <div class="nav__close" id="nav-close">
                    <i class='bx bx-x'></i>
                </div>
            </div>

            <div class="nav__btns">
                <!-- Language Switcher -->
                <LanguageSwitcher />
                
                <!-- Theme change button -->
                <i class='bx bx-moon change-theme' id="theme-button"></i>

                <div class="nav__shop" id="cart-shop">
                    <i class='bx bx-shopping-bag'></i>
                </div>

                <div class="nav__toggle" id="nav-toggle">
                    <i class='bx bx-menu'></i>
                </div>
            </div>
        </nav>
    </header>

</template>

<script setup>
import { ref, onMounted, nextTick } from 'vue';
import LanguageSwitcher from './LanguageSwitcher.vue';

onMounted(() => { })

</script>

<style scoped></style>
