<script setup lang="ts">
import { computed } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { pushArticles } from '@/data/pushArticles'

const route = useRoute()
const router = useRouter()
const article = computed(() => pushArticles.find(a => a.id === route.params.id))

/** 将图片竖向切分为若干块，构建"章节" */
const sections = computed(() => {
  if (!article.value) return []
  // 这里用 image 作为整篇文章的唯一截图，
  // 前端将其重复渲染为多个 section 块，视觉上像分章阅读
  return [
    { part: 1, label: '' }, // 整张图就是一个内容块
  ]
})

function goBack() {
  router.push('/push-articles')
}
</script>

<template>
  <div class="detail-page">
    <!-- 加载中 -->
    <div v-if="!article" class="empty-state">
      <p>文章不存在</p>
      <button class="back-btn" @click="goBack">← 返回列表</button>
    </div>

    <template v-else>
      <!-- 返回 -->
      <button class="back-link" @click="goBack">← 返回推送列表</button>

      <!-- 文章头部 -->
      <header class="detail-header">
        <div class="detail-meta">
          <time class="detail-date">{{ article.date }}</time>
          <div class="detail-tags">
            <span v-for="tag in article.tags" :key="tag" class="tag">{{ tag }}</span>
          </div>
        </div>
        <h1 class="detail-title">{{ article.title }}</h1>
        <p class="detail-summary">{{ article.summary }}</p>
      </header>

      <!-- 文章正文：将截图作为内容渲染 -->
      <div class="detail-content">
        <div class="content-block" v-for="sec in sections" :key="sec.part">
          <img
            :src="article.image"
            :alt="article.title"
            class="content-image"
            loading="lazy"
          />
        </div>
      </div>

      <!-- 文末 -->
      <footer class="detail-footer">
        <a :href="article.link" target="_blank" rel="noopener noreferrer" class="read-full">
          阅读全文 →
        </a>
        <p class="footer-note">以上内容为公众号文章截图，点击"阅读全文"跳转原文</p>
      </footer>
    </template>
  </div>
</template>

<style scoped>
.detail-page {
  max-width: 720px;
  margin: 0 auto;
}

.back-link {
  display: inline-block;
  padding: 0;
  font-family: var(--font-sans);
  font-size: 0.85rem;
  color: var(--color-text-light);
  background: none;
  border: none;
  cursor: pointer;
  margin-bottom: var(--space-lg);
  transition: color var(--transition-fast);
}

.back-link:hover { color: var(--color-primary); }

/* ===== 文章头部 ===== */
.detail-header {
  margin-bottom: var(--space-xl);
  padding-bottom: var(--space-lg);
  border-bottom: 1px solid var(--color-border);
}

.detail-meta {
  display: flex;
  align-items: center;
  gap: var(--space-sm);
  flex-wrap: wrap;
  margin-bottom: var(--space-md);
}

.detail-date { font-family: var(--font-sans); font-size: 0.85rem; color: var(--color-text-light); font-weight: 500; }

.detail-tags { display: flex; gap: 4px; }
.detail-tags .tag { font-size: 0.65rem; padding: 1px 7px; }

.detail-title {
  font-size: 1.4rem;
  color: var(--color-primary-dark);
  line-height: 1.4;
  margin-bottom: var(--space-sm);
}

.detail-summary {
  font-family: var(--font-sans);
  font-size: 0.9rem;
  color: var(--color-text-secondary);
  line-height: 1.8;
}

/* ===== 文章正文 ===== */
.detail-content {
  display: flex;
  flex-direction: column;
  gap: 0;
}

.content-block {
  line-height: 0;
}

.content-image {
  width: 100%;
  height: auto;
  display: block;
  border-radius: var(--radius-md);
  box-shadow: var(--shadow-sm);
}

/* ===== 文末 ===== */
.detail-footer {
  margin-top: var(--space-xl);
  padding-top: var(--space-lg);
  border-top: 1px solid var(--color-border);
  text-align: center;
}

.read-full {
  display: inline-block;
  padding: var(--space-sm) var(--space-xl);
  font-family: var(--font-sans);
  font-size: 0.9rem;
  font-weight: 600;
  color: #fff;
  background: var(--color-primary);
  border-radius: var(--radius-md);
  text-decoration: none;
  transition: background var(--transition-fast);
}

.read-full:hover {
  background: var(--color-primary-light);
}

.footer-note {
  font-family: var(--font-sans);
  font-size: 0.75rem;
  color: var(--color-text-light);
  margin-top: var(--space-md);
}

/* ===== 空状态 ===== */
.empty-state { text-align: center; padding: var(--space-3xl) var(--space-lg); }

.back-btn {
  margin-top: var(--space-md);
  padding: var(--space-sm) var(--space-lg);
  font-family: var(--font-sans);
  font-size: 0.85rem;
  background: var(--color-bg-card);
  border: 1px solid var(--color-border);
  border-radius: var(--radius-md);
  cursor: pointer;
  transition: all var(--transition-fast);
}

.back-btn:hover { border-color: var(--color-gold); color: var(--color-gold-dark); }

@media (max-width: 640px) {
  .detail-title { font-size: 1.15rem; }
  .detail-page { max-width: 100%; }
}
</style>