<script setup lang="ts">
import { ref, computed } from 'vue'
import { archiveItems } from '@/data/archive'

const searchQuery = ref('')
const activeCategory = ref<string>('all')

const categories = [
  { key: 'all', label: '全部' },
  { key: 'photo', label: '老照片' },
  { key: 'manuscript', label: '手稿' },
  { key: 'document', label: '文件' },
  { key: 'other', label: '其他' },
]

const filteredItems = computed(() => {
  return archiveItems.filter((item: { title: string; description: string; category: string }) => {
    const matchCategory = activeCategory.value === 'all' || item.category === activeCategory.value
    const matchSearch = !searchQuery.value
      || item.title.includes(searchQuery.value)
      || item.description.includes(searchQuery.value)
    return matchCategory && matchSearch
  })
})
</script>

<template>
  <div class="archive-page">
    <div class="page-header">
      <h1>数字档案库</h1>
      <div class="page-title-en">Digital Archive</div>
      <p>老照片、手稿、历史文件等数字化资料</p>
    </div>

    <!-- 搜索与筛选 -->
    <div class="archive-tools">
      <div class="search-box">
        <input
          v-model="searchQuery"
          type="text"
          placeholder="搜索档案标题或描述…"
        />
      </div>
      <div class="category-tabs">
        <button
          v-for="cat in categories"
          :key="cat.key"
          class="category-tab"
          :class="{ active: activeCategory === cat.key }"
          @click="activeCategory = cat.key"
        >
          {{ cat.label }}
        </button>
      </div>
    </div>

    <div v-if="filteredItems.length === 0" class="empty-state">
      <div class="empty-icon">📚</div>
      <div class="empty-text">暂无匹配的档案资料</div>
    </div>

    <div v-else class="card-grid">
      <div v-for="item in filteredItems" :key="item.id" class="floating-card">
        <div class="card-title">{{ item.title }}</div>
        <div class="card-subtitle">
          <span class="tag">{{ ({ photo: '老照片', manuscript: '手稿', document: '文件', other: '其他' } as Record<string, string>)[item.category] }}</span>
          <span v-if="item.date" style="margin-left: 8px">{{ item.date }}</span>
        </div>
        <div class="card-body">{{ item.description }}</div>
        <div v-if="item.source" class="card-source">来源：{{ item.source }}</div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.archive-page {
  max-width: var(--content-max-width);
  margin: 0 auto;
}

.archive-tools {
  display: flex;
  gap: var(--space-md);
  margin-bottom: var(--space-xl);
  flex-wrap: wrap;
  align-items: center;
}

.category-tabs {
  display: flex;
  gap: var(--space-xs);
  flex-wrap: wrap;
}

.category-tab {
  padding: 4px 14px;
  border-radius: 20px;
  font-family: var(--font-sans);
  font-size: 0.85rem;
  border: 1px solid var(--color-border);
  background: var(--color-bg-card);
  color: var(--color-text-secondary);
  cursor: pointer;
  transition: all var(--transition-fast);
}

.category-tab:hover {
  border-color: var(--color-gold);
  color: var(--color-gold-dark);
}

.category-tab.active {
  background: var(--color-gold);
  color: var(--color-text-on-gold);
  border-color: var(--color-gold);
}

.card-source {
  font-family: var(--font-sans);
  font-size: 0.8rem;
  color: var(--color-text-light);
  margin-top: var(--space-sm);
  padding-top: var(--space-sm);
  border-top: 1px solid var(--color-border-light);
}
</style>
