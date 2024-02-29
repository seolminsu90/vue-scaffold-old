import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/login',
      name: 'login-view',
      component: () => import('@/views/LoginView.vue')
    },
    {
      path: '/',
      name: 'intro',
      component: () => import('@/views/LayoutView.vue'),
      children: [
        {
          path: '',
          name: 'dashboard',
          component: () => import('@/views/HomeView.vue')
        },
        {
          path: '/form-sample',
          name: 'form-sample',
          component: () => import('@/views/sample/FormSample.vue')
        },
        {
          path: '/text-sample',
          name: 'text-sample',
          component: () => import('@/views/sample/TextSample.vue')
        },
        {
          path: '/button-sample',
          name: 'button-sample',
          component: () => import('@/views/sample/ButtonSample.vue')
        },
        {
          path: '/table-sample',
          name: 'table-sample',
          component: () => import('@/views/sample/TableSample.vue')
        }
      ]
    }
  ]
})

export default router
