<script setup lang="ts">
import { mediaItems } from '@/data/media'
</script>

<template>
  <div class="media-page">
    <div class="page-header">
      <h1>影像志</h1>
      <div class="page-title-en">Media</div>
      <p>纪录片、科普短视频、实践vlog · 720°全景</p>
    </div>

    <!-- 720° 全景 -->
    <section class="panorama-section">
      <h2 class="section-title">天津大学校史馆 · 720°全景</h2>
      <div class="panorama-container">
        <iframe
          src="https://www.720yun.com/vr/5d2jkr4uOy1"
          frameborder="0"
          allowfullscreen
          allow="fullscreen; webkit-xr; xr-spatial-tracking"
          loading="lazy"
          title="天津大学校史馆全景">
        </iframe>
      </div>
      <p class="panorama-credit">全景来源：北京科技大学校史馆</p>
    </section>

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

.panorama-section {
  margin-bottom: var(--space-2xl);
}

.section-title {
  font-size: 1.15rem;
  color: var(--color-primary-dark);
  margin-bottom: var(--space-md);
  padding-left: var(--space-md);
  border-left: 3px solid var(--color-gold);
}

.panorama-container {
  position: relative;
  width: 100%;
  padding-bottom: 56.25%; /* 16:9 */
  background: var(--color-bg-alt);
  border-radius: var(--radius-md);
  overflow: hidden;
  box-shadow: var(--shadow-md);
}

.panorama-container iframe {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  border: none;
}

.panorama-credit {
  margin-top: var(--space-sm);
  font-family: var(--font-sans);
  font-size: 0.8rem;
  color: var(--color-text-light);
  text-align: right;
}
</style>
