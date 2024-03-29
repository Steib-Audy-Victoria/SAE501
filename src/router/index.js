import HomeView from '../views/HomeView.vue'
import { createRouter, createWebHistory } from 'vue-router'

import { authGuard } from '../utils/connexion';

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
      path: '/listeMontres',
      name: 'listeMontres',
      component: () => import('../views/ListeMontresView.vue'),
    },
    {
      path: '/montres',
      name: 'montres',
      component: () => import('../views/MontresView.vue'),
      beforeEnter: authGuard 
    },
    {
      path: '/montre/:id',
      name: 'montre',
      component: () => import('../views/MontreView.vue'),
      beforeEnter: authGuard
    },
    {
      path: '/montre2/:id',
      name: 'montre2',
      component: () => import('../views/Montre2View.vue'),
      beforeEnter: authGuard
    },
    {
      path: '/ajout',
      name: 'ajout',
      component: () => import('../views/AjoutMontreView.vue'),
      beforeEnter: authGuard,
    },
    {
      path: '/connexion',
      name: 'connexion',
      component: () => import('../views/ConnexionView.vue')
    },
    {
      path: '/deconnection',
      name: 'deconnection',
      component: () => import('../views/DeconnectionView.vue'),
      beforeEnter: authGuard,
    },
    {
      path: '/panier',
      name: 'panier',
      component: () => import('../views/PanierUtilisateurView.vue'),
      beforeEnter: authGuard,
    },

    // TEST
    {
      path: '/three',
      name: 'three',
      component: () => import('../components/ThreeJS.vue'),
    },

  ]
})

export default router