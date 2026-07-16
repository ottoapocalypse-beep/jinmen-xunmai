<script setup lang="ts">
import { siteConfig, navItems } from '@/data/site'
import NavIcon from '@/components/NavIcon.vue'
</script>

<template>
  <div class="home-page">
    <!-- Hero 区域 -->
    <section class="hero">
      <div class="hero-logo">
        <img src="/logo.jpg" alt="津门寻脉队徽" class="hero-logo-img" />
      </div>
      <div class="hero-badge">{{ siteConfig.titleEn }}</div>
      <h1 class="hero-title">{{ siteConfig.title }}</h1>
      <p class="hero-subtitle">{{ siteConfig.subtitle }}</p>
      <p class="hero-desc">{{ siteConfig.description }}</p>
      <div class="hero-actions">
        <router-link to="/about" class="btn btn-primary">了解实践 →</router-link>
        <router-link to="/activity" class="btn btn-outline">最新动态 →</router-link>
      </div>
    </section>

    <!-- 快速导航卡片 -->
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
  max-width: var(--content-max-width);
  margin: 0 auto;
}

/* ---- Hero ---- */
.hero {
  text-align: center;
  padding: var(--space-3xl) 0 var(--space-2xl);
}

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
  box-shadow: var(--shadow-lg);
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
  background: var(--color-gold-subtle);
  color: var(--color-gold-dark);
  border: 1px solid var(--color-gold-light);
  margin-bottom: var(--space-lg);
}

.hero-title {
  font-size: 2.8rem;
  color: var(--color-primary-dark);
  margin-bottom: var(--space-md);
  letter-spacing: 0.02em;
}

.hero-subtitle {
  font-family: var(--font-sans);
  font-size: 1.1rem;
  color: var(--color-text-secondary);
  margin-bottom: var(--space-lg);
}

.hero-desc {
  font-family: var(--font-sans);
  font-size: 0.95rem;
  color: var(--color-text-secondary);
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

/* ---- Quick Nav ---- */
.quick-nav {
  padding: var(--space-2xl) 0;
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

@media (max-width: 768px) {
  .hero-title {
    font-size: 1.8rem;
  }

  .hero-subtitle {
    font-size: 1rem;
  }

  .quick-grid {
    grid-template-columns: repeat(auto-fill, minmax(130px, 1fr));
  }
}
</style>
