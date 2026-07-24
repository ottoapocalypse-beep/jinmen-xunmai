import { createRouter, createWebHashHistory } from 'vue-router'

/** 每条路由的滚动位置缓存 */
const scrollCache = new Map<string, { top: number }>()

const router = createRouter({
  history: createWebHashHistory(),
  scrollBehavior(to, from, savedPosition) {
    // 保存当前页面的滚动位置
    if (from.name) {
      scrollCache.set(from.name as string, { top: window.scrollY })
    }

    // 浏览器前进/后退 → 恢复浏览器保存的位置
    if (savedPosition) {
      return savedPosition
    }

    // 有缓存 → 恢复上次的位置（侧栏点击回到同一页面时）
    if (to.name && scrollCache.has(to.name as string)) {
      return scrollCache.get(to.name as string)!
    }

    // 首次访问 → 滚动到顶部
    return { top: 0 }
  },
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
      path: '/panorama',
      name: 'panorama',
      component: () => import('@/views/Panorama.vue'),
      meta: { title: '720°全景', titleEn: 'VR Panorama' },
    },
    {
      path: '/contact',
      name: 'contact',
      component: () => import('@/views/Contact.vue'),
      meta: { title: '联系我们', titleEn: 'Contact' },
    },
    {
      path: '/push-articles',
      name: 'pushArticles',
      component: () => import('@/views/PushArticles.vue'),
      meta: { title: '推送文集', titleEn: 'Articles' },
    },
    {
      path: '/push-articles/:id',
      name: 'pushArticleDetail',
      component: () => import('@/views/PushArticleDetail.vue'),
      meta: { title: '文章详情', titleEn: 'Article' },
    },
    {
      path: '/admin',
      name: 'admin',
      component: () => import('@/views/AdminStats.vue'),
      meta: { title: '站点管理', titleEn: 'Admin' },
    },
    {
      path: '/progress',
      name: 'progress',
      component: () => import('@/views/ProgressBoard.vue'),
      meta: { title: '采访进度', titleEn: 'Progress' },
    },
    {
      path: '/graph',
      name: 'graph',
      component: () => import('@/views/Graph3D.vue'),
      meta: { title: '3D知识图谱', titleEn: '3D Graph' },
    },
  ],
})

export default router
