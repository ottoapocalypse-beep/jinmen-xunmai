<script setup lang="ts">
import { mediaItems } from '@/data/media'
</script>

<template>
  <div class="media-page">
    <div class="page-header">
      <h1>影像志</h1>
      <div class="page-title-en">Media</div>
      <p>纪录片、科普短视频与实践vlog</p>
    </div>

    <div v-if="mediaItems.length === 0" class="empty-state">
      <div class="empty-icon">🎬</div>
      <div class="empty-text">视频内容正在制作中，敬请期待</div>
    </div>

    <div v-else class="card-grid">
      <div v-for="item in mediaItems" :key="item.id" class="media-card">
        <div class="media-cover">
          {{ item.type === 'documentary' ? '🎥' : item.type === 'short-video' ? '📱' : item.type === 'vlog' ? '📹' : '🎙️' }}
        </div>
        <div class="media-info">
          <div class="media-title">{{ item.title }}</div>
          <div class="media-meta">
            <span class="tag">{{ ({ documentary: '纪录片', 'short-video': '短视频', vlog: 'Vlog', interview: '访谈' } as Record<string, string>)[item.type] }}</span>
            <span v-if="item.duration" style="margin-left: 8px">{{ item.duration }}</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.media-page {
  max-width: var(--content-max-width);
  margin: 0 auto;
}
</style>
