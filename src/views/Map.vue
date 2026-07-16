<script setup lang="ts">
import { mapPoints } from '@/data/map'
</script>

<template>
  <div class="map-page">
    <div class="page-header">
      <h1>生活地图</h1>
      <div class="page-title-en">Campus Map</div>
      <p>今昔对比 · 校园足迹</p>
    </div>

    <div v-if="mapPoints.length === 0" class="empty-state">
      <div class="empty-icon">🗺️</div>
      <div class="empty-text">地图内容整理中，敬请期待</div>
    </div>

    <div v-else class="card-grid">
      <div v-for="point in mapPoints" :key="point.id" class="floating-card">
        <h2 class="card-title">{{ point.name }}</h2>
        <div class="card-body">
          <p>{{ point.description }}</p>
          <p v-if="point.location" class="map-location">{{ point.location }}</p>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.map-page {
  max-width: var(--content-max-width);
  margin: 0 auto;
}

.map-location {
  margin-top: var(--space-sm);
  font-size: 0.85rem;
  color: var(--color-text-light);
}
</style>
