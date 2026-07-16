import { createRouter, createWebHashHistory } from 'vue-router'

const router = createRouter({
  history: createWebHashHistory(),
  routes: [
    {
      path: '/',
      name: 'home',
      component: () => import('@/views/Home.vue'),
      meta: { title: '首页', titleEn: 'Home' },
    },
    {
      path: '/about',
      name: 'about',
      component: () => import('@/views/About.vue'),
      meta: { title: '关于实践', titleEn: 'About' },
    },
    {
      path: '/activity',
      name: 'activity',
      component: () => import('@/views/Activity.vue'),
      meta: { title: '实践动态', titleEn: 'Updates' },
    },
    {
      path: '/media',
      name: 'media',
      component: () => import('@/views/Media.vue'),
      meta: { title: '影像志', titleEn: 'Media' },
    },
    {
      path: '/archive',
      name: 'archive',
      component: () => import('@/views/Archive.vue'),
      meta: { title: '数字档案库', titleEn: 'Archive' },
    },
    {
      path: '/oral-history',
      name: 'oralHistory',
      component: () => import('@/views/OralHistory.vue'),
      meta: { title: '口述史', titleEn: 'Oral History' },
    },
    {
      path: '/map',
      name: 'map',
      component: () => import('@/views/Map.vue'),
      meta: { title: '生活地图', titleEn: 'Campus Map' },
    },
    {
      path: '/cultural-products',
      name: 'culturalProducts',
      component: () => import('@/views/CulturalProducts.vue'),
      meta: { title: '文创展示', titleEn: 'Cultural Products' },
    },
    {
      path: '/contact',
      name: 'contact',
      component: () => import('@/views/Contact.vue'),
      meta: { title: '联系我们', titleEn: 'Contact' },
    },
  ],
})

export default router
