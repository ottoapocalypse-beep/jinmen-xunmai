<script setup lang="ts">
import { siteConfig, navItems } from '@/data/site'
import NavIcon from '@/components/NavIcon.vue'
import HeroCarousel from '@/components/HeroCarousel.vue'
import type { CarouselSlide } from '@/components/HeroCarousel.vue'

/** 占位轮播图 — 用 picsum.photos 生成与主题相关的随机图片 */
const heroSlides: CarouselSlide[] = [
  {
    bg: 'url(https://picsum.photos/seed/jinmen-campus/1400/700)',
    label: '校园风貌',
  },
  {
    bg: 'url(https://picsum.photos/seed/jinmen-archive/1400/700)',
    label: '档案史料',
  },
  {
    bg: 'url(https://picsum.photos/seed/jinmen-interview/1400/700)',
    label: '访谈纪实',
  },
]
</script>

<template>
  <div class="home-page">
    <!-- ====== 上半：深色轮播背景 ====== -->
    <HeroCarousel :slides="heroSlides" :interval="6000">
      <!-- 所有 Hero 内容作为插槽传入 -->
      <div class="hero-logo">
        <img src="/logo.jpg" alt="津门寻脉队徽" class="hero-logo-img" />
      </div>
      <div class="hero-badge">{{ siteConfig.titleEn }}</div>
      <h1 class="hero-title">{{ siteConfig.title }}</h1>
      <p class="hero-subtitle">{{ siteConfig.subtitle }}</p>
      <p class="hero-desc">{{ siteConfig.description }}</p>
      <div class="hero-actions">
        <router-link to="/about" class="btn btn-hero btn-hero-primary">了解实践 →</router-link>
        <router-link to="/activity" class="btn btn-hero btn-hero-outline">最新动态 →</router-link>
      </div>
    </HeroCarousel>

    <!-- ====== 下半：浅色内容区 ====== -->
    <section class="quick-nav">
      <h2 class="section-title">探索更多</h2>
      <div class="quick-grid">
        <router-link
          v-for="item in navItems.filter((n: { path: string }) => n.path !== '/')"
          :key="item.path"
          :to="item.path"
          class="quick-card floating-card animate-on-scroll"
        >
          <NavIcon :name="item.icon" :size="32" class="quick-icon" />
          <span class="quick-label">{{ item.label }}</span>
          <span class="quick-label-en">{{ item.labelEn }}</span>
        </router-link>
      </div>
    </section>
  </div>
</template>

<style scoped>
.home-page {
  /* 让 HeroCarousel 可以全宽，quick-nav 受容器限制 */
}

/* ==================== 上半：Hero 内容（在轮播上方） ==================== */
.hero-logo {
  margin-bottom: var(--space-lg);
  display: flex;
  justify-content: center;
}

.hero-logo-img {
  width: 96px;
  height: 96px;
  border-radius: 50%;
  object-fit: cover;
  box-shadow: 0 0 20px rgba(0, 0, 0, 0.3);
  border: 3px solid var(--color-gold);
}

.hero-badge {
  display: inline-block;
  padding: 4px 16px;
  border-radius: 20px;
  font-family: var(--font-sans);
  font-size: 0.8rem;
  font-weight: 600;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  background: rgba(201, 168, 76, 0.2);
  color: var(--color-gold-light);
  border: 1px solid rgba(201, 168, 76, 0.4);
  backdrop-filter: blur(4px);
  -webkit-backdrop-filter: blur(4px);
  margin-bottom: var(--space-lg);
}

.hero-title {
  font-size: 2.8rem;
  color: #ffffff;
  margin-bottom: var(--space-md);
  letter-spacing: 0.02em;
  text-shadow: 0 2px 8px rgba(0, 0, 0, 0.2);
}

.hero-subtitle {
  font-family: var(--font-sans);
  font-size: 1.1rem;
  color: rgba(255, 255, 255, 0.85);
  margin-bottom: var(--space-lg);
  text-shadow: 0 1px 4px rgba(0, 0, 0, 0.15);
}

.hero-desc {
  font-family: var(--font-sans);
  font-size: 0.95rem;
  color: rgba(255, 255, 255, 0.7);
  max-width: 640px;
  margin: 0 auto var(--space-xl);
  line-height: 1.8;
}

.hero-actions {
  display: flex;
  gap: var(--space-md);
  justify-content: center;
  flex-wrap: wrap;
}

/* Hero 专用按钮（深色背景上使用） */
.btn-hero {
  display: inline-flex;
  align-items: center;
  gap: var(--space-sm);
  padding: 10px 28px;
  border-radius: var(--radius-sm);
  font-family: var(--font-sans);
  font-size: 0.95rem;
  font-weight: 500;
  transition: all var(--transition-fast);
  cursor: pointer;
  text-decoration: none;
}

.btn-hero-primary {
  background: var(--color-gold);
  color: var(--color-text-on-gold);
  border: 1px solid var(--color-gold);
}

.btn-hero-primary:hover {
  background: var(--color-gold-dark);
  border-color: var(--color-gold-dark);
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(168, 136, 46, 0.4);
}

.btn-hero-outline {
  background: transparent;
  border: 1px solid rgba(255, 255, 255, 0.6);
  color: #ffffff;
}

.btn-hero-outline:hover {
  background: rgba(255, 255, 255, 0.1);
  border-color: #ffffff;
  transform: translateY(-2px);
}

/* ==================== 下半：快速导航（浅色） ==================== */
.quick-nav {
  max-width: var(--content-max-width);
  margin: 0 auto;
  padding: var(--space-2xl) var(--space-xl);
}

.section-title {
  text-align: center;
  font-size: 1.5rem;
  color: var(--color-primary-dark);
  margin-bottom: var(--space-xl);
  position: relative;
}

.section-title::after {
  content: '';
  display: block;
  width: 60px;
  height: 3px;
  background: var(--color-gold);
  margin: var(--space-sm) auto 0;
  border-radius: 2px;
}

.quick-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(160px, 1fr));
  gap: var(--space-md);
}

.quick-card {
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  padding: var(--space-xl) var(--space-md);
  text-decoration: none;
  color: var(--color-text);
}

.quick-icon {
  color: var(--color-gold);
  margin-bottom: var(--space-sm);
}

.quick-label {
  font-family: var(--font-serif);
  font-size: 0.95rem;
  font-weight: 600;
  color: var(--color-primary-dark);
}

.quick-label-en {
  font-family: var(--font-sans);
  font-size: 0.7rem;
  color: var(--color-text-light);
  text-transform: uppercase;
  letter-spacing: 0.05em;
}

.quick-card:hover .quick-label {
  color: var(--color-gold-dark);
}

/* ==================== 响应式 ==================== */
@media (max-width: 768px) {
  .hero-title {
    font-size: 1.8rem;
  }

  .hero-subtitle {
    font-size: 1rem;
  }

  .quick-nav {
    padding: var(--space-xl) var(--space-md);
  }

  .quick-grid {
    grid-template-columns: repeat(auto-fill, minmax(130px, 1fr));
  }
}
</style>
