import { createRouter, createWebHashHistory, RouteRecordRaw } from 'vue-router'
import Layout from '../views/Layout.vue'

import music from './music'

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    redirect: '/epoch/pages'
  },
  {
    path: '/epoch',
    name: 'Layout',
    component: Layout,
    children: [
      ...music,
      {
        path: '/epoch',
        redirect: '/epoch/singerList'
      }
    ]
  }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router
