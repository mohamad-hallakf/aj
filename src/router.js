import { createRouter, createWebHistory } from 'vue-router';
import Home from './pages/Home.vue';
import Products from './pages/Products.vue';

const routes = [
  { path: '', name: 'Home', component: Home },
  { path: '/products', name: 'Products', component: Products },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
  scrollBehavior(to) {
    if (to.hash) {
      let hash = to.hash;
      const element = document.getElementById(hash.replace('#', ''));
      if (element) {
        setTimeout(() => {
        element.scrollIntoView({ behavior: 'smooth' });  
          
        }, 200);
      }
      return {
        selector: to.hash,
        behavior: 'smooth',  
      };
    }
    return { x: 0, y: 0 };  
  },
});

export default router;
