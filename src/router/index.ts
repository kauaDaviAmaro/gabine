import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import LoginView from '@/views/LoginView.vue';
import RegisterView from '@/views/RegisterView.vue';
import authRoutes from './authRoutes';
import UserProfile from '@/views/UserProfile.vue';

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
        requiresAuthentication: true
      }
    }
  ],
});

router.beforeEach(authRoutes);

export default router;
