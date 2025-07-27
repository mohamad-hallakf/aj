import { createApp } from 'vue';
import { createPinia } from 'pinia';
import App from './App.vue';
import router from './router';
import i18n from './i18n';
import '@/assets/js/swiper-bundle.min.js';
import '@/assets/js/main.js';
import '@/assets/css/rtl.css';
import Toast from './plugins/toast';
import piniaPluginPersistedstate from 'pinia-plugin-persistedstate';
const pinia = createPinia();
pinia.use(piniaPluginPersistedstate);
const app = createApp(App);

app.use(pinia);
app.use(router);
app.use(i18n);

app.use(Toast, {
  duration: 3000,
});

// main.js or a directives file
const clickOutside = {
  beforeMount(el, binding) {
    el.clickOutsideEvent = function(event) {
      if (!(el === event.target || el.contains(event.target))) {
        binding.value(event);
      }
    };
    document.addEventListener('click', el.clickOutsideEvent);
  },
  unmounted(el) {
    document.removeEventListener('click', el.clickOutsideEvent);
  }
};

app.directive('click-outside', clickOutside);
app.mount('#app');

// Register service worker for PWA
if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker
      .register('/sw.js')
      .then((registration) => {
        console.log(
          'ServiceWorker registration successful with scope: ',
          registration.scope
        );
      })
      .catch((error) => {
        console.log('ServiceWorker registration failed: ', error);
      });
  });
}
