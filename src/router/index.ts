import { createRouter, createWebHistory } from 'vue-router';
import HomeView from '../views/HomeView.vue';
import LoginView from '@/views/LoginView.vue';
import RegisterView from '@/views/RegisterView.vue';
import authRoutes from './authRoutes';
import UserProfile from '@/views/UserProfile.vue';
import ProductsView from '@/views/ProductsView.vue';
import CartView from '@/views/CartView.vue';
import ProductDetailView from '@/views/ProductDetailView.vue';
import AdminProductsView from '@/views/AdminProductsView.vue';


const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView,
    },
    {
      path: '/signup',
      name: 'signup',
      component: RegisterView,
    },
    {
      path: '/signin',
      name: 'signin',
      component: LoginView,
    },
    {
      path: '/profile',
      name: 'profile',
      component: UserProfile,
      meta: {
        requiresAuthentication: true,
      },
    },
    {
      path: '/products',
      name: 'products',
      component: ProductsView,
    },
    {
      path: '/products/:id',
      name: 'product',
      component: ProductDetailView,
    },
    {
      path: '/cart',
      name: 'cart',
      component: CartView,
      meta: {
        requiresAuthentication: true,
      }
    },
    {
      path: '/admin/products',
      name: 'adminProducts',
      component: AdminProductsView,
    }
  ],
});

router.beforeEach(authRoutes);

export default router;
