import { createRouter, createWebHashHistory, RouteRecordRaw } from 'vue-router'
import Layout from '../views/layout.vue'

import music from './music'
import other from './other'

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
      ...other,
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
