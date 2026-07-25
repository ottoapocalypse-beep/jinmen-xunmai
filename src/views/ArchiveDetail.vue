<script setup lang="ts">
import { computed, ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { archiveItems } from '@/data/archive'
import NavIcon from '@/components/NavIcon.vue'

const route = useRoute()
const router = useRouter()

const article = computed(() => archiveItems.find(i => i.id === route.params.id))
const modalImg = ref<string | null>(null)
function openModal(img: string) { modalImg.value = img }

const categoryLabel: Record<string, string> = {
  institution: '机构', event: '事件', person: '人物',
  concept: '概念', document: '文件', photo: '老照片',
  'manuscript-ustb': '手稿·北科', 'manuscript-tju': '手稿·天大', manuscript: '手稿', other: '其他',
}

const categoryIcon: Record<string, string> = {
  institution: '🏛', event: '📅', person: '👤',
  concept: '📖', document: '📄', photo: '🖼',
  'manuscript-ustb': '🏛', 'manuscript-tju': '🏛', manuscript: '✍️', other: '📎',
}

// 标题 → ID 映射（用于 [[关联条目]] 跳转）
const titleToId: Record<string, string> = {}
archiveItems.forEach(item => {
  // 去掉 —— 后缀，方便匹配 [[条目名]]
  const key = item.title.replace(/[———].*$/, '').replace(/[（(].*[）)]$/, '').trim()
  titleToId[key] = item.id
  titleToId[item.title] = item.id
})

// 渲染 content 中的 Markdown 级别标题 + [[关联条目]] 跳转
function renderContent(text: string): string {
  let html = text
  // 先处理 [[关联条目]] → 链接
  html = html.replace(/\[\[(.+?)\]\]/g, (_, name: string) => {
    // 精确匹配
    let id = titleToId[name.trim()]
    if (!id) {
      // 模糊匹配：取标题前几个字
      const key = Object.keys(titleToId).find(k => k.includes(name.trim()))
      if (key) id = titleToId[key]
    }
    if (id) {
      return `<a href="#/archive/${id}" class="archive-link">${name}</a>`
    }
    // 没匹配到则保留原文
    return `<span class="archive-link-missing">${name}</span>`
  })
  // Markdown 图片 ![alt](src)
  html = html.replace(/!\[(.*?)\]\((.*?)\)/g, '<img src="$2" alt="$1" class="photo-ocr-img" loading="lazy" />')
  // Markdown 块引用 > text
  html = html.replace(/^> (.*$)/gm, '<blockquote>$1</blockquote>')
  // Markdown 样式
  html = html
    .replace(/^### (.*$)/gm, '<h3>$1</h3>')
    .replace(/^## (.*$)/gm, '<h2>$1</h2>')
    .replace(/^# (.*$)/gm, '<h1>$1</h1>')
    .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
    .replace(/^- (.*$)/gm, '<li>$1</li>')
    .replace(/(<li>.*<\/li>\n?)+/g, '<ul>$&</ul>')
    .replace(/\n\n/g, '</p><p>')
  // 剩余行包裹 p
  html = html.replace(/^(.+)$/gm, (match) => {
    if (match.startsWith('<')) return match
    return `<p>${match}</p>`
  })
  return html
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

      <!-- 老照片图片展示 -->
      <div v-if="article.category === 'photo' && article.images && article.images.length" class="photo-gallery">
        <h3 class="gallery-title">📷 校史照片</h3>
        <div class="gallery-grid">
          <div v-for="(img, idx) in article.images" :key="idx" class="gallery-item">
            <img :src="img" :alt="`${article.title} - ${idx + 1}`" class="gallery-img" loading="lazy" @click="openModal(img)" />
          </div>
        </div>
        <!-- 图片查看模态框 -->
        <div v-if="modalImg" class="modal-overlay" @click="modalImg = null">
          <img :src="modalImg" class="modal-img" @click.stop />
          <button class="modal-close" @click="modalImg = null">✕</button>
        </div>
      </div>

      <div v-if="article.content" class="detail-body">
        <div class="detail-content" v-html="renderContent(article.content)" />
      </div>
      <div v-else-if="article.category !== 'photo'" class="detail-body-empty">
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

.detail-body :deep(.photo-ocr-img) {
  display: block;
  max-width: 100%;
  height: auto;
  margin: var(--space-md) auto;
  border-radius: var(--radius-md);
  box-shadow: var(--shadow-sm);
  border: 1px solid var(--color-border);
}

.detail-body :deep(blockquote) {
  margin: var(--space-sm) 0 var(--space-md) var(--space-md);
  padding: var(--space-xs) var(--space-sm);
  border-left: 3px solid var(--color-gold);
  background: var(--color-bg-alt);
  border-radius: 0 var(--radius-sm) var(--radius-sm) 0;
  font-size: 0.85rem;
  color: var(--color-text-secondary);
  line-height: 1.6;
  text-indent: 0;
}

.detail-body :deep(.archive-link) {
  color: var(--color-gold-dark);
  text-decoration: underline;
  font-weight: 600;
  transition: opacity var(--transition-fast);
}
.detail-body :deep(.archive-link:hover) {
  opacity: 0.7;
}
.detail-body :deep(.archive-link-missing) {
  color: var(--color-text-light);
  cursor: default;
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

/* ===== 老照片画廊 ===== */
.photo-gallery {
  padding: var(--space-lg);
  border-bottom: 1px solid var(--color-border-light);
}

.gallery-title {
  font-size: 1rem;
  color: var(--color-primary-dark);
  margin-bottom: var(--space-md);
}

.gallery-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(180px, 1fr));
  gap: var(--space-sm);
}

.gallery-item {
  border-radius: var(--radius-sm);
  overflow: hidden;
  cursor: pointer;
  transition: transform var(--transition-fast);
  aspect-ratio: 4/3;
}

.gallery-item:hover {
  transform: scale(1.03);
}

.gallery-img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  display: block;
}

/* ===== 图片模态框 ===== */
.modal-overlay {
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.85);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
  padding: var(--space-md);
  cursor: pointer;
}

.modal-img {
  max-width: 95vw;
  max-height: 90vh;
  object-fit: contain;
  border-radius: var(--radius-md);
  box-shadow: 0 8px 40px rgba(0,0,0,0.5);
  cursor: default;
}

.modal-close {
  position: fixed;
  top: var(--space-md);
  right: var(--space-md);
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

.modal-close:hover {
  background: rgba(255,255,255,0.3);
}

@media (max-width: 768px) {
  .detail-header { padding: var(--space-lg) var(--space-md); }
  .detail-body { padding: var(--space-md); }
  .detail-title { font-size: 1.2rem; }
}
</style>
