import { createRouter, createWebHistory } from 'vue-router'

const routes = [
  { path: '/', redirect: '/index/centerbox/studymode' },
  {
    path: '/',
    name: 'home',
    component: () => import('@/views/Home.vue'),
    children: [
      {
        path: '/index',
        name: 'index',
        component: () => import('@/views/index/index.vue'),
        children: [
          {
            path: '/index/centerbox',
            name: 'centerbox',
            component: () => import('@/views/centerviews/centerbox.vue'),
            children: [
              {
                path: '/index/centerbox/studymode',
                name: 'study',
                component: () => import('@/views/centerviews/study.vue'),
              },
              {
                path: '/index/centerbox/reslovemode',
                name: 'reslove',
                component: () => import('@/views/centerviews/reslove.vue'),
              },
            ],
          },
        ],
      },
    ],
  },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

export default router
