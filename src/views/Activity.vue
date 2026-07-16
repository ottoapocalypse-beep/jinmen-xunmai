<script setup lang="ts">
import { activities } from '@/data/activities'
</script>

<template>
  <div class="activity-page">
    <div class="page-header">
      <h1>实践动态</h1>
      <div class="page-title-en">Updates</div>
      <p>实时记录津门寻脉小队的实践足迹</p>
    </div>

    <div v-if="activities.length === 0" class="empty-state">
      <div class="empty-icon">📝</div>
      <div class="empty-text">暂无内容，敬请期待</div>
    </div>

    <div v-else class="activity-list">
      <article
        v-for="act in activities"
        :key="act.id"
        class="activity-item floating-card animate-on-scroll"
      >
        <div class="activity-meta">
          <time class="activity-date">{{ act.date }}</time>
          <div class="activity-tags">
            <span v-for="tag in act.tags" :key="tag" class="tag">{{ tag }}</span>
          </div>
        </div>
        <h2 class="activity-title">{{ act.title }}</h2>
        <p class="activity-summary">{{ act.summary }}</p>
      </article>
    </div>
  </div>
</template>

<style scoped>
.activity-page {
  max-width: var(--content-max-width);
  margin: 0 auto;
}

.activity-list {
  display: flex;
  flex-direction: column;
  gap: var(--space-lg);
}

.activity-item {
  cursor: default;
}

.activity-meta {
  display: flex;
  align-items: center;
  gap: var(--space-md);
  margin-bottom: var(--space-sm);
}

.activity-date {
  font-family: var(--font-sans);
  font-size: 0.85rem;
  color: var(--color-text-light);
}

.activity-tags {
  display: flex;
  gap: var(--space-xs);
}

.activity-title {
  font-size: 1.2rem;
  margin-bottom: var(--space-sm);
}

.activity-summary {
  font-family: var(--font-sans);
  font-size: 0.9rem;
  color: var(--color-text-secondary);
  line-height: 1.7;
}
</style>
