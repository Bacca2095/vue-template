import { useTitle } from '@vueuse/core'
import { createRouter, createWebHistory } from 'vue-router'

import AppLayout from '@/layouts/AppLayout.vue'
import AuthLayout from '@/layouts/AuthLayout.vue'
import DefaultLayout from '@/layouts/DefaultLayout.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: () => import('@/views/HomeView.vue'),
      meta: {
        layout: AppLayout,
        title: 'Home',
      },
    },
    {
      path: '/auth/sign-in',
      name: 'sign-in',
      component: () => import('@/views/auth/SignInView.vue'),
      meta: {
        layout: AuthLayout,
        title: 'Sign In',
      },
    },
    {
      path: '/auth/sign-up',
      name: 'sign-up',
      component: () => import('@/views/auth/SignUpView.vue'),
      meta: {
        layout: AuthLayout,
        title: 'Sign Up',
      },
    },
    {
      path: '/:pathMatch(.*)*',
      name: 'not-found',
      component: () => import('@/views/NotFoundView.vue'),
      meta: {
        layout: DefaultLayout,
        title: 'Not Found',
      },
    },
  ],
})

router.beforeEach((to, _from, next) => {
  if (to.meta && to.meta.title) {
    useTitle(to.meta.title as string)
  }
  next()
})

export default router
