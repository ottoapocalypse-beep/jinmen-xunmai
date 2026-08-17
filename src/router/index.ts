import { createRouter, createWebHashHistory } from 'vue-router'
import Home from '@/views/Home.vue'
import About from '@/views/About.vue'
import Activity from '@/views/Activity.vue'
import Media from '@/views/Media.vue'
import Archive from '@/views/Archive.vue'
import MapView from '@/views/Map.vue'
import CulturalProducts from '@/views/CulturalProducts.vue'
import Panorama from '@/views/Panorama.vue'
import Contact from '@/views/Contact.vue'
import PushArticles from '@/views/PushArticles.vue'
import PushArticleDetail from '@/views/PushArticleDetail.vue'
import AdminStats from '@/views/AdminStats.vue'
import ProgressBoard from '@/views/ProgressBoard.vue'
import ArchiveDetail from '@/views/ArchiveDetail.vue'

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
      component: Home,
      meta: { title: '首页', titleEn: 'Home' },
    },
    {
      path: '/about',
      name: 'about',
      component: About,
      meta: { title: '关于实践', titleEn: 'About' },
    },
    {
      path: '/activity',
      name: 'activity',
      component: Activity,
      meta: { title: '实践动态', titleEn: 'Updates' },
    },
    {
      path: '/media',
      name: 'media',
      component: Media,
      meta: { title: '影像志', titleEn: 'Media' },
    },
    {
      path: '/archive',
      name: 'archive',
      component: Archive,
      meta: { title: '数字档案库', titleEn: 'Archive' },
    },
    {
      path: '/oral-history',
      name: 'oralHistory',
      redirect: '/archive',
    },
    {
      path: '/map',
      name: 'map',
      component: MapView,
      meta: { title: '生活地图', titleEn: 'Campus Map' },
    },
    {
      path: '/cultural-products',
      name: 'culturalProducts',
      component: CulturalProducts,
      meta: { title: '文创展示', titleEn: 'Cultural Products' },
    },
    {
      path: '/panorama',
      name: 'panorama',
      component: Panorama,
      meta: { title: '720°全景', titleEn: 'VR Panorama' },
    },
    {
      path: '/contact',
      name: 'contact',
      component: Contact,
      meta: { title: '联系我们', titleEn: 'Contact' },
    },
    {
      path: '/push-articles',
      name: 'pushArticles',
      component: PushArticles,
      meta: { title: '推送文集', titleEn: 'Articles' },
    },
    {
      path: '/push-articles/:id',
      name: 'pushArticleDetail',
      component: PushArticleDetail,
      meta: { title: '文章详情', titleEn: 'Article' },
    },
    {
      path: '/admin',
      name: 'admin',
      component: AdminStats,
      meta: { title: '站点管理', titleEn: 'Admin' },
    },
    {
      path: '/progress',
      name: 'progress',
      component: ProgressBoard,
      meta: { title: '采访进度', titleEn: 'Progress' },
    },
    {
      path: '/archive/:id',
      name: 'archiveDetail',
      component: ArchiveDetail,
      meta: { title: '档案详情', titleEn: 'Archive Detail' },
    },
  ],
})

export default router
