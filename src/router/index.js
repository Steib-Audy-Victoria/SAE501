import HomeView from '../views/HomeView.vue'
import { createRouter, createWebHistory } from 'vue-router'

import { authGuard } from '../utils/routeGuards.js';

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    {
      path: '/about',
      name: 'about',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('../views/AboutView.vue')
    },

    {
      path: '/montres',
      name: 'montres',
      component: () => import('../views/MontresView.vue')
    },
    {
      path: '/montre/:id',
      name: 'montre',
      component: () => import('../views/MontreView.vue')
    },
    {
      path: '/connexion',
      name: 'connexion',
      component: () => import('../views/ConnexionView.vue')
    },
    {
      path: '/ajout',
      name: 'ajout',
      component: () => import('../views/Montre/AjoutView.vue'),
      beforeEnter: authGuard,
    },
    {
      path: '/deconnection',
      name: 'deconnection',
      component: () => import('../views/DeconnectionView.vue'),
      beforeEnter: authGuard,
    }
  ]
})

export default router