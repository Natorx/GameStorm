import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path:'/',
      component:() => import('@/pages/home.vue')
    },
    {
      path:'/games',
      component:() => import('@/pages/games.vue')
    }
  ],
})

export default router
