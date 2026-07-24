<script setup lang="ts">
import { computed } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { archiveItems } from '@/data/archive'
import NavIcon from '@/components/NavIcon.vue'

const route = useRoute()
const router = useRouter()

const article = computed(() => archiveItems.find(i => i.id === route.params.id))

const categoryLabel: Record<string, string> = {
  institution: '机构', event: '事件', person: '人物',
  concept: '概念', document: '文件', photo: '老照片',
  manuscript: '手稿', other: '其他',
}

const categoryIcon: Record<string, string> = {
  institution: '🏛', event: '📅', person: '👤',
  concept: '📖', document: '📄', photo: '🖼',
  manuscript: '✍️', other: '📎',
}

// 渲染 content 中的 Markdown 级别标题
function renderContent(text: string): string {
  return text
    .replace(/^### (.*$)/gm, '<h3>$1</h3>')
    .replace(/^## (.*$)/gm, '<h2>$1</h2>')
    .replace(/^# (.*$)/gm, '<h1>$1</h1>')
    .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
    .replace(/^- (.*$)/gm, '<li>$1</li>')
    .replace(/(<li>.*<\/li>\n?)+/g, '<ul>$&</ul>')
    .replace(/\n\n/g, '</p><p>')
    .replace(/^(.+)$/gm, (match) => {
      if (match.startsWith('<')) return match
      return match
    })
}
</script>

<template>
  <div class="detail-page">
    <button class="back-btn" @click="router.push('/archive')">
      ← 返回档案库
    </button>

    <div v-if="!article" class="empty-state">
      <div class="empty-icon"><NavIcon name="empty" :size="48" /></div>
      <div class="empty-text">档案条目不存在</div>
    </div>

    <article v-else class="detail-article">
      <header class="detail-header">
        <div class="detail-meta">
          <span class="detail-category">{{ categoryIcon[article.category] }} {{ categoryLabel[article.category] || article.category }}</span>
          <span v-if="article.date" class="detail-date">{{ article.date }}</span>
        </div>
        <h1 class="detail-title">{{ article.title }}</h1>
        <p class="detail-summary">{{ article.description }}</p>
        <div v-if="article.source" class="detail-source">来源：{{ article.source }}</div>
      </header>

      <div v-if="article.content" class="detail-body">
        <div class="detail-content" v-html="renderContent(article.content)" />
      </div>
      <div v-else class="detail-body-empty">
        <p>本条档案的完整正文正在完善中。</p>
      </div>

      <footer class="detail-footer">
        <button class="back-btn" @click="router.push('/archive')">← 返回档案库</button>
      </footer>
    </article>
  </div>
</template>

<style scoped>
.detail-page {
  max-width: 800px;
  margin: 0 auto;
  padding: 0 var(--space-md);
}

.back-btn {
  display: inline-block;
  margin-bottom: var(--space-lg);
  padding: var(--space-xs) var(--space-md);
  background: var(--color-bg-card);
  border: 1px solid var(--color-border);
  border-radius: var(--radius-md);
  font-family: var(--font-sans);
  font-size: 0.85rem;
  color: var(--color-text-secondary);
  cursor: pointer;
  transition: all var(--transition-fast);
}

.back-btn:hover {
  border-color: var(--color-gold);
  color: var(--color-gold-dark);
}

/* ===== 空状态 ===== */
.empty-state {
  text-align: center;
  padding: var(--space-3xl);
  color: var(--color-text-light);
}

.empty-icon {
  font-size: 2.5rem;
  margin-bottom: var(--space-md);
}

.empty-text {
  font-family: var(--font-sans);
  font-size: 0.95rem;
}

/* ===== 文章 ===== */
.detail-article {
  background: var(--color-bg-card);
  border-radius: var(--radius-lg);
  box-shadow: var(--shadow-md);
  overflow: hidden;
  margin-bottom: var(--space-xl);
}

.detail-header {
  padding: var(--space-xl) var(--space-lg);
  border-bottom: 1px solid var(--color-border-light);
}

.detail-meta {
  display: flex;
  align-items: center;
  gap: var(--space-sm);
  margin-bottom: var(--space-md);
}

.detail-category {
  font-family: var(--font-sans);
  font-size: 0.8rem;
  color: var(--color-gold-dark);
  font-weight: 600;
}

.detail-date {
  font-family: var(--font-sans);
  font-size: 0.8rem;
  color: var(--color-text-secondary);
}

.detail-title {
  font-size: 1.5rem;
  color: var(--color-primary-dark);
  line-height: 1.3;
  margin-bottom: var(--space-sm);
}

.detail-summary {
  font-family: var(--font-sans);
  font-size: 0.95rem;
  color: var(--color-text-secondary);
  line-height: 1.7;
}

.detail-source {
  margin-top: var(--space-sm);
  font-family: var(--font-sans);
  font-size: 0.8rem;
  color: var(--color-text-light);
}

/* ===== 正文 ===== */
.detail-body {
  padding: var(--space-lg);
  font-family: var(--font-sans);
  font-size: 0.95rem;
  line-height: 1.9;
  color: var(--color-text);
}

.detail-body :deep(h2) {
  font-size: 1.2rem;
  color: var(--color-primary-dark);
  margin-top: var(--space-xl);
  margin-bottom: var(--space-md);
  padding-bottom: var(--space-xs);
  border-bottom: 1px solid var(--color-border-light);
}

.detail-body :deep(h3) {
  font-size: 1.05rem;
  color: var(--color-primary);
  margin-top: var(--space-lg);
  margin-bottom: var(--space-sm);
}

.detail-body :deep(p) {
  margin-bottom: var(--space-md);
  text-indent: 2em;
}

.detail-body :deep(p:first-of-type) {
  text-indent: 0;
}

.detail-body :deep(ul) {
  margin: var(--space-sm) 0 var(--space-md) var(--space-lg);
  list-style: disc;
}

.detail-body :deep(li) {
  margin-bottom: var(--space-xs);
}

.detail-body :deep(strong) {
  color: var(--color-primary-dark);
}

.detail-body :deep(code) {
  font-family: monospace;
  background: var(--color-bg-alt);
  padding: 1px 6px;
  border-radius: 3px;
  font-size: 0.85em;
}

.detail-body :deep(pre) {
  background: var(--color-bg-alt);
  padding: var(--space-md);
  border-radius: var(--radius-md);
  overflow-x: auto;
  font-size: 0.85rem;
  line-height: 1.5;
  margin: var(--space-md) 0;
  border: 1px solid var(--color-border);
}

.detail-body :deep(table) {
  width: 100%;
  border-collapse: collapse;
  margin: var(--space-md) 0;
  font-size: 0.85rem;
}

.detail-body :deep(th), .detail-body :deep(td) {
  border: 1px solid var(--color-border);
  padding: var(--space-xs) var(--space-sm);
  text-align: left;
}

.detail-body :deep(th) {
  background: var(--color-bg-alt);
  font-weight: 600;
}

.detail-body-empty {
  padding: var(--space-xl);
  text-align: center;
  font-family: var(--font-sans);
  color: var(--color-text-secondary);
}

.detail-footer {
  padding: var(--space-md) var(--space-lg);
  border-top: 1px solid var(--color-border-light);
}

@media (max-width: 768px) {
  .detail-header { padding: var(--space-lg) var(--space-md); }
  .detail-body { padding: var(--space-md); }
  .detail-title { font-size: 1.2rem; }
}
</style>
