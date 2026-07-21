<script setup lang="ts">
import { useRouter } from 'vue-router'
import { pushArticles } from '@/data/pushArticles'
import NavIcon from '@/components/NavIcon.vue'

const router = useRouter()
const sorted = [...pushArticles].sort((a, b) => b.date.localeCompare(a.date))
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
      <div
        v-for="item in sorted" :key="item.id"
        class="push-card floating-card"
        @click="router.push(`/push-articles/${item.id}`)"
      >
        <div class="push-meta">
          <time class="push-date">{{ item.date }}</time>
          <div class="push-tags">
            <span v-for="tag in item.tags" :key="tag" class="tag">{{ tag }}</span>
          </div>
          <span class="push-chunks">{{ item.chunks }} 张图</span>
        </div>
        <h2 class="push-title">{{ item.title }}</h2>
        <p class="push-summary">{{ item.summary }}</p>
        <span class="push-enter">阅读全文 →</span>
      </div>
    </div>
  </div>
</template>

<style scoped>
.push-page { max-width: 800px; margin: 0 auto; }
.push-list { display: flex; flex-direction: column; gap: var(--space-md); }

.push-card {
  padding: var(--space-lg);
  cursor: pointer;
  transition: transform var(--transition-fast), box-shadow var(--transition-fast);
}

.push-card:hover { transform: translateY(-2px); box-shadow: var(--shadow-lg); }

.push-meta { display: flex; align-items: center; gap: var(--space-sm); flex-wrap: wrap; margin-bottom: var(--space-sm); }
.push-date { font-family: var(--font-sans); font-size: 0.8rem; color: var(--color-text-light); font-weight: 500; }
.push-tags { display: flex; gap: 4px; }
.push-tags .tag { font-size: 0.65rem; padding: 1px 7px; }
.push-chunks { margin-left: auto; font-family: var(--font-sans); font-size: 0.65rem; color: var(--color-text-light); }

.push-title { font-size: 1.1rem; color: var(--color-primary-dark); margin-bottom: var(--space-xs); line-height: 1.4; }
.push-summary { font-family: var(--font-sans); font-size: 0.85rem; color: var(--color-text-secondary); line-height: 1.7; margin-bottom: var(--space-sm); }
.push-enter { font-family: var(--font-sans); font-size: 0.8rem; color: var(--color-gold-dark); font-weight: 500; }
.push-card:hover .push-enter { color: var(--color-gold); text-decoration: underline; }

.empty-state { text-align: center; padding: var(--space-3xl) var(--space-lg); }
.empty-icon { margin-bottom: var(--space-md); color: var(--color-text-light); opacity: 0.4; }
.empty-text { font-family: var(--font-sans); font-size: 1rem; color: var(--color-text-secondary); }

@media (max-width: 640px) { .push-title { font-size: 1rem; } }
</style>