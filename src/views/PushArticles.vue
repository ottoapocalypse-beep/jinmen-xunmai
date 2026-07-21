<script setup lang="ts">
import { ref } from 'vue'
import { pushArticles } from '@/data/pushArticles'
import NavIcon from '@/components/NavIcon.vue'

const sorted = [...pushArticles].sort((a, b) => b.date.localeCompare(a.date))
const fullscreenImg = ref<string | null>(null)
</script>

<template>
  <div class="push-page">
    <div class="page-header">
      <h1>推送文集</h1>
      <div class="page-title-en">Articles</div>
      <p>微信公众号系列推送 · 记录实践每一步</p>
    </div>

    <div v-if="sorted.length === 0" class="empty-state">
      <div class="empty-icon"><NavIcon name="empty" :size="48" /></div>
      <div class="empty-text">暂无推送内容</div>
    </div>

    <div v-else class="push-list">
      <article v-for="item in sorted" :key="item.id" class="push-article">
        <!-- 文章头部 -->
        <div class="push-header">
          <div class="push-meta">
            <time class="push-date">{{ item.date }}</time>
            <div class="push-tags">
              <span v-for="tag in item.tags" :key="tag" class="tag">{{ tag }}</span>
            </div>
          </div>
          <h2 class="push-title">{{ item.title }}</h2>
          <p class="push-summary">{{ item.summary }}</p>
        </div>

        <!-- 文章正文（截图） -->
        <div class="push-body">
          <img
            :src="item.image"
            :alt="item.title"
            class="push-image"
            loading="lazy"
            @click="fullscreenImg = item.image"
          />
        </div>

        <!-- 文章底部 -->
        <div class="push-footer">
          <a :href="item.link" target="_blank" rel="noopener noreferrer" class="push-original">
            查看原文 →
          </a>
          <span class="push-hint">点击图片可放大</span>
        </div>
      </article>
    </div>

    <!-- 全屏查看 -->
    <div v-if="fullscreenImg" class="fullscreen-overlay" @click="fullscreenImg = null">
      <button class="fullscreen-close" @click="fullscreenImg = null">✕</button>
      <img :src="fullscreenImg" class="fullscreen-image" alt="文章截图" />
    </div>
  </div>
</template>

<style scoped>
.push-page {
  max-width: 800px;
  margin: 0 auto;
}

.push-list {
  display: flex;
  flex-direction: column;
  gap: var(--space-2xl);
}

/* ===== 单篇文章 ===== */
.push-article {
  background: var(--color-bg-card);
  border-radius: var(--radius-lg);
  box-shadow: var(--shadow-sm);
  overflow: hidden;
  transition: box-shadow var(--transition-normal);
}

.push-article:hover {
  box-shadow: var(--shadow-md);
}

.push-header {
  padding: var(--space-lg) var(--space-lg) 0;
}

.push-meta {
  display: flex;
  align-items: center;
  gap: var(--space-sm);
  flex-wrap: wrap;
  margin-bottom: var(--space-sm);
}

.push-date {
  font-family: var(--font-sans);
  font-size: 0.8rem;
  color: var(--color-text-light);
  font-weight: 500;
}

.push-tags { display: flex; gap: 4px; }
.push-tags .tag { font-size: 0.65rem; padding: 1px 7px; }

.push-title {
  font-size: 1.15rem;
  color: var(--color-primary-dark);
  margin-bottom: var(--space-xs);
  line-height: 1.4;
}

.push-summary {
  font-family: var(--font-sans);
  font-size: 0.85rem;
  color: var(--color-text-secondary);
  line-height: 1.7;
  margin-bottom: var(--space-md);
}

/* ===== 文章正文截图 ===== */
.push-body {
  padding: 0 var(--space-lg);
  cursor: zoom-in;
}

.push-image {
  width: 100%;
  height: auto;
  border-radius: var(--radius-md);
  box-shadow: var(--shadow-sm);
  transition: opacity var(--transition-fast);
  display: block;
}

.push-image:hover {
  opacity: 0.95;
}

/* ===== 文章底部 ===== */
.push-footer {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: var(--space-md) var(--space-lg) var(--space-lg);
}

.push-original {
  font-family: var(--font-sans);
  font-size: 0.85rem;
  color: var(--color-gold-dark);
  text-decoration: none;
  font-weight: 500;
  transition: color var(--transition-fast);
}

.push-original:hover { color: var(--color-gold); text-decoration: underline; }

.push-hint {
  font-family: var(--font-sans);
  font-size: 0.7rem;
  color: var(--color-text-light);
}

/* ===== 全屏查看 ===== */
.fullscreen-overlay {
  position: fixed;
  inset: 0;
  z-index: 9999;
  background: rgba(0,0,0,0.92);
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: zoom-out;
  padding: var(--space-lg);
  overflow-y: auto;
}

.fullscreen-close {
  position: fixed;
  top: var(--space-lg);
  right: var(--space-lg);
  width: 40px;
  height: 40px;
  border-radius: 50%;
  border: none;
  background: rgba(255,255,255,0.15);
  color: #fff;
  font-size: 1.2rem;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: background var(--transition-fast);
}

.fullscreen-close:hover { background: rgba(255,255,255,0.3); }

.fullscreen-image {
  max-width: 100%;
  max-height: 95vh;
  object-fit: contain;
  border-radius: var(--radius-md);
}

/* ===== 空状态 ===== */
.empty-state { text-align: center; padding: var(--space-3xl) var(--space-lg); }
.empty-icon { margin-bottom: var(--space-md); color: var(--color-text-light); opacity: 0.4; }
.empty-text { font-family: var(--font-sans); font-size: 1rem; color: var(--color-text-secondary); }

@media (max-width: 640px) {
  .push-title { font-size: 1rem; }
  .push-body { padding: 0 var(--space-md); }
  .push-footer { flex-direction: column; gap: var(--space-sm); align-items: flex-start; }
}
</style>