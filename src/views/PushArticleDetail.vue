<script setup lang="ts">
import { useRoute, useRouter } from 'vue-router'
import { pushArticles } from '@/data/pushArticles'
import NavIcon from '@/components/NavIcon.vue'

const route = useRoute()
const router = useRouter()
const article = pushArticles.find(a => a.id === route.params.id)

/** 分块图路径（注意：文件编号与文章编号相反） */
function chunkUrl(index: number): string {
  const id = article!.id
  // push-1 实际对应 push-2 的图，push-2 对应 push-1 的图
  const fileId = id === 'push-1' ? '2' : '1'
  return `/jinmen-xunmai/push/push-${fileId}_${index}.jpg`
}
</script>

<template>
  <div class="detail-page">
    <button class="back-btn" @click="router.push('/push-articles')">← 返回列表</button>

    <div v-if="!article" class="empty-state">
      <div class="empty-icon"><NavIcon name="empty" :size="48" /></div>
      <div class="empty-text">文章不存在</div>
    </div>

    <article v-else class="detail-article">
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

      <!-- 正文：分块加载 -->
      <div class="detail-body">
        <figure v-for="(i, idx) in article.chunks" :key="i" class="detail-chunk">
          <img
            :src="chunkUrl(i)"
            :alt="`${article.title} - 第${i}部分`"
            loading="lazy"
            decoding="async"
            :fetchpriority="idx < 3 ? 'high' : 'low'"
            width="1080"
            height="800"
            class="chunk-img"
          />
        </figure>
      </div>

      <!-- 文末 -->
      <footer class="detail-footer">
        <a :href="article.link" target="_blank" rel="noopener noreferrer" class="detail-original">
          阅读全文 →
        </a>
        <p class="detail-tip">在微信公众号中阅读完整文章</p>
      </footer>
    </article>
  </div>
</template>

<style scoped>
.detail-page { max-width: 800px; margin: 0 auto; }

.back-btn {
  display: inline-block;
  padding: var(--space-sm) var(--space-md);
  font-family: var(--font-sans);
  font-size: 0.8rem;
  color: var(--color-text-secondary);
  background: var(--color-bg-card);
  border: 1px solid var(--color-border);
  border-radius: var(--radius-md);
  cursor: pointer;
  transition: all var(--transition-fast);
  margin-bottom: var(--space-lg);
}

.back-btn:hover { color: var(--color-primary); border-color: var(--color-primary); }

/* ===== 文章头部 ===== */
.detail-article {
  background: var(--color-bg-card);
  border-radius: var(--radius-lg);
  box-shadow: var(--shadow-sm);
  overflow: hidden;
}

.detail-header { padding: var(--space-xl); }

.detail-meta { display: flex; align-items: center; gap: var(--space-sm); flex-wrap: wrap; margin-bottom: var(--space-sm); }
.detail-date { font-family: var(--font-sans); font-size: 0.8rem; color: var(--color-text-light); font-weight: 500; }
.detail-tags { display: flex; gap: 4px; }
.detail-tags .tag { font-size: 0.65rem; padding: 1px 7px; }

.detail-title { font-size: 1.3rem; color: var(--color-primary-dark); margin-bottom: var(--space-sm); line-height: 1.4; }
.detail-summary { font-family: var(--font-sans); font-size: 0.85rem; color: var(--color-text-secondary); line-height: 1.7; }

/* ===== 正文分块 ===== */
.detail-body { padding: 0 var(--space-lg); line-height: 0; }

.detail-chunk {
  margin: 0;
  padding: 0;
  display: block;
  line-height: 0;
  content-visibility: auto;
  contain-intrinsic-size: 1px 800px;
}

.chunk-img {
  width: 100%;
  height: auto;
  display: block;
  border: none;
  outline: none;
}

/* ===== 文末 ===== */
.detail-footer {
  padding: var(--space-xl);
  text-align: center;
  border-top: 1px solid var(--color-border-light);
  margin-top: var(--space-md);
}

.detail-original {
  display: inline-block;
  padding: var(--space-sm) var(--space-xl);
  font-family: var(--font-sans);
  font-size: 0.9rem;
  color: #fff;
  background: var(--color-primary);
  border-radius: var(--radius-md);
  text-decoration: none;
  font-weight: 500;
  transition: background var(--transition-fast);
}

.detail-original:hover { background: var(--color-primary-light); }

.detail-tip {
  margin-top: var(--space-sm);
  font-family: var(--font-sans);
  font-size: 0.7rem;
  color: var(--color-text-light);
}

/* ===== 空状态 ===== */
.empty-state { text-align: center; padding: var(--space-3xl) var(--space-lg); }
.empty-icon { margin-bottom: var(--space-md); color: var(--color-text-light); opacity: 0.4; }
.empty-text { font-family: var(--font-sans); font-size: 1rem; color: var(--color-text-secondary); }

@media (max-width: 640px) {
  .detail-header { padding: var(--space-md); }
  .detail-body { padding: 0 var(--space-md); }
  .detail-title { font-size: 1.1rem; }
  .detail-footer { padding: var(--space-md); }
}
</style>