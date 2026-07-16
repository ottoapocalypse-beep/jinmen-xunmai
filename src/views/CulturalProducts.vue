<script setup lang="ts">
import { culturalProducts } from '@/data/culturalProducts'
</script>

<template>
  <div class="cultural-page">
    <div class="page-header">
      <h1>文创展示</h1>
      <div class="page-title-en">Cultural Products</div>
      <p>勋章 · 卡片 · 书签 · 更多创意</p>
    </div>

    <div v-if="culturalProducts.length === 0" class="empty-state">
      <div class="empty-icon">🎁</div>
      <div class="empty-text">文创产品设计中，敬请期待</div>
    </div>

    <div v-else class="card-grid">
      <div v-for="item in culturalProducts" :key="item.id" class="floating-card">
        <h2 class="card-title">{{ item.name }}</h2>
        <div class="card-subtitle">
            <span class="tag">{{ ({ badge: '勋章', postcard: '明信片', bookmark: '书签', other: '其他' } as Record<string, string>)[item.category] }}</span>
        </div>
        <div class="card-body">{{ item.description }}</div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.cultural-page {
  max-width: var(--content-max-width);
  margin: 0 auto;
}
</style>
