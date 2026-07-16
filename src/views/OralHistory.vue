<script setup lang="ts">
import { ref } from 'vue'
import { oralHistoryItems } from '@/data/oralHistory'

const searchQuery = ref('')
</script>

<template>
  <div class="oral-page">
    <div class="page-header">
      <h1>口述史</h1>
      <div class="page-title-en">Oral History</div>
      <p>校友访谈实录 · 声音切片 · 生命故事</p>
    </div>

    <!-- 搜索 -->
    <div v-if="oralHistoryItems.length > 0" class="archive-tools">
      <div class="search-box">
        <input
          v-model="searchQuery"
          type="text"
          placeholder="搜索访谈标题、受访人…"
        />
      </div>
    </div>

    <div v-if="oralHistoryItems.length === 0" class="empty-state">
      <div class="empty-icon">🎙️</div>
      <div class="empty-text">口述史资料整理中，敬请期待</div>
    </div>

    <div v-else class="oral-list">
      <div
        v-for="item in oralHistoryItems"
        :key="item.id"
        class="oral-item floating-card animate-on-scroll"
      >
        <h2 class="oral-title">{{ item.title }}</h2>
        <div class="oral-meta">
          <span class="tag">受访人：{{ item.interviewee }}</span>
          <span class="tag" style="margin-left: 8px">{{ item.date }}</span>
        </div>
        <p class="oral-summary">{{ item.summary }}</p>
        <div class="oral-tags">
          <span v-for="tag in item.tags" :key="tag" class="tag">{{ tag }}</span>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.oral-page {
  max-width: var(--content-max-width);
  margin: 0 auto;
}

.archive-tools {
  margin-bottom: var(--space-xl);
}

.oral-list {
  display: flex;
  flex-direction: column;
  gap: var(--space-lg);
}

.oral-title {
  font-size: 1.15rem;
  margin-bottom: var(--space-sm);
}

.oral-meta {
  margin-bottom: var(--space-md);
}

.oral-summary {
  font-family: var(--font-sans);
  font-size: 0.9rem;
  color: var(--color-text-secondary);
  line-height: 1.7;
  margin-bottom: var(--space-sm);
}

.oral-tags {
  display: flex;
  gap: var(--space-xs);
  flex-wrap: wrap;
}
</style>
