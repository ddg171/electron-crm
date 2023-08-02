import { createRouter, createWebHistory } from 'vue-router';
import IndexView from './pages/index.vue';
import UserView from "./pages/users.vue"

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'index',
      component: IndexView,
    },
    {
      path: '/users',
      name: 'users',
      component:UserView
    },
  ],
});

export default router;