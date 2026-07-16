<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { siteConfig, navItems } from '@/data/site'
import NavIcon from '@/components/NavIcon.vue'

const entered = ref(false)
onMounted(() => { setTimeout(() => { entered.value = true }, 100) })
</script>

<template>
  <div class="archive-entry">
    <div class="entry-insignia" :class="{ entered }">
      <div class="entry-logo">
        <img src="/logo.jpg" alt="津门寻脉队徽" />
      </div>
      <h1 class="entry-title">{{ siteConfig.title }}</h1>
      <p class="entry-subtitle">{{ siteConfig.subtitle }}</p>
      <p class="entry-desc">{{ siteConfig.description }}</p>
      <div class="entry-actions">
        <router-link to="/about" class="entry-btn entry-btn-primary">进入档案馆 →</router-link>
        <router-link to="/activity" class="entry-btn entry-btn-outline">最新动态</router-link>
      </div>
    </div>
    <div class="entry-portals" :class="{ entered }">
      <div class="portal-line" />
      <div class="portal-grid">
        <router-link v-for="item in navItems.filter(n => n.path !== '/')" :key="item.path" :to="item.path" class="portal-item">
          <NavIcon :name="item.icon" :size="20" class="portal-icon" />
          <span class="portal-label">{{ item.label }}</span>
        </router-link>
      </div>
    </div>
  </div>
</template>

<style scoped>
.archive-entry { min-height: calc(100vh - 128px); display: flex; flex-direction: column; justify-content: center; align-items: center; position: relative; }
.entry-insignia { text-align: center; max-width: 600px; opacity: 0; transform: translateY(30px); transition: all 1s cubic-bezier(0.22,1,0.36,1); }
.entry-insignia.entered { opacity: 1; transform: translateY(0); }
.entry-logo { width: 80px; height: 80px; border-radius: 50%; overflow: hidden; margin: 0 auto var(--space-lg); border: 2px solid rgba(201,168,76,0.3); box-shadow: 0 0 30px rgba(201,168,76,0.1); transition: all var(--transition-slow); }
.entry-logo:hover { border-color: var(--color-gold); box-shadow: 0 0 40px rgba(201,168,76,0.2); }
.entry-logo img { width: 100%; height: 100%; object-fit: cover; }
.entry-title { font-size: 2.2rem; color: var(--color-gold-light); margin-bottom: var(--space-sm); letter-spacing: 0.04em; }
.entry-subtitle { font-family: var(--font-sans); font-size: 0.95rem; color: rgba(224,213,197,0.5); margin-bottom: var(--space-lg); }
.entry-desc { font-family: var(--font-sans); font-size: 0.85rem; color: rgba(224,213,197,0.35); line-height: 1.8; margin-bottom: var(--space-xl); }
.entry-actions { display: flex; gap: var(--space-md); justify-content: center; flex-wrap: wrap; }
.entry-btn { display: inline-flex; align-items: center; gap: var(--space-sm); padding: 10px 28px; font-family: var(--font-sans); font-size: 0.9rem; transition: all var(--transition-normal); text-decoration: none; }
.entry-btn-primary { background: var(--color-gold); color: var(--color-text-on-gold); }
.entry-btn-primary:hover { background: var(--color-gold-dark); transform: translateY(-1px); box-shadow: 0 4px 12px rgba(201,168,76,0.2); }
.entry-btn-outline { border: 1px solid rgba(232,213,163,0.25); color: rgba(232,213,163,0.6); }
.entry-btn-outline:hover { border-color: var(--color-gold-light); color: var(--color-gold-light); }
.entry-portals { position: absolute; bottom: var(--space-3xl); width: 100%; max-width: 600px; opacity: 0; transform: translateY(20px); transition: all 0.8s ease 0.4s; }
.entry-portals.entered { opacity: 1; transform: translateY(0); }
.portal-line { height: 1px; background: linear-gradient(90deg, transparent, rgba(201,168,76,0.2), transparent); margin-bottom: var(--space-lg); }
.portal-grid { display: flex; flex-wrap: wrap; justify-content: center; gap: var(--space-sm); }
.portal-item { display: flex; align-items: center; gap: 4px; padding: 4px 12px; font-family: var(--font-sans); font-size: 0.75rem; color: rgba(224,213,197,0.3); text-decoration: none; transition: all var(--transition-fast); border: 1px solid transparent; }
.portal-item:hover { color: var(--color-gold-light); border-color: rgba(201,168,76,0.15); }
.portal-icon { opacity: 0.5; }
.portal-item:hover .portal-icon { opacity: 1; }
@media (max-width: 768px) {
  .archive-entry { min-height: calc(100vh - 96px); }
  .entry-title { font-size: 1.6rem; }
  .entry-desc { font-size: 0.8rem; }
  .entry-portals { bottom: var(--space-xl); }
}
</style>
