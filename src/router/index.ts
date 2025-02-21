import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/home-view.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env['BASE_URL']),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView,
    },
    {
      path: '/about',
      name: 'about',
      component: () => import('../views/about-view.vue'),
    },
    {
      path: '/settings',
      name: 'settings',
      component: () => import('../views/settings-view.vue')
    }
  ],
})

export default router
