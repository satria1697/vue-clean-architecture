import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'

const routes: Array<RouteRecordRaw> = [
  {
    name: 'main-layout',
    path: '',
    component: () => import('../layout/HomeLayout.vue'),
    children: [
      {
        name: 'home',
        path: '',
        component: () => import('../delivery/HomePage.vue')
      }
    ]
  }
]

const router = createRouter({
  routes,
  history: createWebHistory()
})

export default router
