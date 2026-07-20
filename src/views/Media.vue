<script setup lang="ts">
import { mediaItems } from '@/data/media'
import { siteConfig } from '@/data/site'
import NavIcon from '@/components/NavIcon.vue'

/** 根据 bilibiliId 构造可播放的嵌入 URL */
function bilibiliEmbedUrl(id: string): string {
  // 支持 av 号 和 BV 号
  if (id.startsWith('BV')) {
    return `https://player.bilibili.com/player.html?bvid=${id}&autoplay=0&highQuality=1`
  }
  if (id.startsWith('av')) {
    return `https://player.bilibili.com/player.html?aid=${id.slice(2)}&autoplay=0&highQuality=1`
  }
  return id
}

/** 根据 bilibiliId 构造跳转链接 */
function bilibiliPageUrl(id: string): string {
  return `https://www.bilibili.com/video/${id}/`
}
</script>

<template>
  <div class="media-page">
    <div class="page-header">
      <h1>影像志</h1>
      <div class="page-title-en">Media</div>
      <p>纪录片、科普短视频与实践vlog</p>
    </div>

    <div v-if="mediaItems.length === 0" class="empty-state">
      <div class="empty-icon">
        <NavIcon name="media" :size="48" />
      </div>
      <div class="empty-text">视频内容正在制作中，敬请期待</div>
    </div>

    <div v-else class="media-content">
      <!-- 精选展映：第一个视频作为主播放器 -->
      <div v-if="mediaItems[0]?.bilibiliId" class="featured-player">
        <div class="player-wrapper">
          <iframe
            :src="bilibiliEmbedUrl(mediaItems[0].bilibiliId!)"
            :title="mediaItems[0].title"
            allowfullscreen
            allow="autoplay; fullscreen"
            loading="lazy"
          />
        </div>
        <div class="featured-info">
          <h2 class="featured-title">{{ mediaItems[0].title }}</h2>
          <span class="featured-date">{{ mediaItems[0].date }}</span>
          <span class="tag">{{ ({ documentary: '纪录片', 'short-video': '短视频', vlog: 'Vlog', interview: '访谈' } as Record<string, string>)[mediaItems[0].type] }}</span>
          <span v-if="mediaItems[0].duration" class="featured-duration">{{ mediaItems[0].duration }}</span>
          <p class="featured-desc">{{ mediaItems[0].description }}</p>
        </div>
      </div>

      <!-- 全部视频列表 -->
      <div class="card-grid">
        <a
          v-for="item in mediaItems"
          :key="item.id"
          :href="item.bilibiliId ? bilibiliPageUrl(item.bilibiliId) : item.externalLink || '#'"
          target="_blank"
          rel="noopener noreferrer"
          class="media-card"
        >
          <div class="media-cover">
            {{ item.type === 'documentary' ? '🎥' : item.type === 'short-video' ? '📱' : item.type === 'vlog' ? '📹' : '🎙️' }}
            <span class="media-play-hint">▶</span>
          </div>
          <div class="media-info">
            <div class="media-title">{{ item.title }}</div>
            <div class="media-meta">
              <span class="tag">{{ ({ documentary: '纪录片', 'short-video': '短视频', vlog: 'Vlog', interview: '访谈' } as Record<string, string>)[item.type] }}</span>
              <span v-if="item.duration" class="media-duration">{{ item.duration }}</span>
            </div>
            <p class="media-desc">{{ item.description }}</p>
          </div>
        </a>
      </div>
    </div>
  </div>
</template>

<style scoped>
.media-page {
  max-width: var(--content-max-width);
  margin: 0 auto;
}

/* ======== 精选展映 ======== */
.featured-player {
  margin-bottom: var(--space-2xl);
  background: var(--color-bg-alt);
  border-radius: var(--radius-lg);
  overflow: hidden;
  box-shadow: var(--shadow-md);
}

.player-wrapper {
  position: relative;
  width: 100%;
  padding-top: 56.25%; /* 16:9 */
  background: #000;
}

.player-wrapper iframe {
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  border: none;
}

.featured-info {
  padding: var(--space-lg);
}

.featured-title {
  font-size: 1.15rem;
  color: var(--color-primary-dark);
  margin-bottom: var(--space-sm);
}

.featured-date,
.featured-duration {
  display: inline-block;
  font-family: var(--font-sans);
  font-size: 0.8rem;
  color: var(--color-text-light);
  margin-right: var(--space-sm);
}

.featured-desc {
  font-family: var(--font-sans);
  font-size: 0.85rem;
  color: var(--color-text-secondary);
  line-height: 1.7;
  margin-top: var(--space-sm);
}

/* ======== 视频列表 ======== */
.card-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(320px, 1fr));
  gap: var(--space-md);
}

.media-card {
  display: flex;
  gap: var(--space-md);
  padding: var(--space-md);
  background: var(--color-bg-card);
  border-radius: var(--radius-md);
  box-shadow: var(--shadow-sm);
  text-decoration: none;
  color: inherit;
  transition: transform var(--transition-fast), box-shadow var(--transition-fast);
}

.media-card:hover {
  transform: translateY(-2px);
  box-shadow: var(--shadow-lg);
}

.media-cover {
  flex-shrink: 0;
  width: 80px;
  height: 80px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: var(--color-gold-subtle);
  border-radius: var(--radius-sm);
  position: relative;
}

.media-type-icon {
  color: var(--color-gold-dark);
  opacity: 0.6;
}

.media-play-hint {
  position: absolute;
  bottom: 4px;
  right: 4px;
  width: 24px;
  height: 24px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: var(--color-gold);
  color: #fff;
  border-radius: 50%;
  font-size: 0.7rem;
  opacity: 0;
  transition: opacity var(--transition-fast);
}

.media-card:hover .media-play-hint {
  opacity: 1;
}

.media-info {
  flex: 1;
  min-width: 0;
}

.media-title {
  font-size: 0.95rem;
  font-weight: 600;
  color: var(--color-primary-dark);
  margin-bottom: var(--space-xs);
  line-height: 1.4;
}

.media-meta {
  display: flex;
  align-items: center;
  gap: var(--space-sm);
  margin-bottom: var(--space-xs);
}

.media-duration {
  font-family: var(--font-sans);
  font-size: 0.75rem;
  color: var(--color-text-light);
}

.media-desc {
  font-family: var(--font-sans);
  font-size: 0.8rem;
  color: var(--color-text-secondary);
  line-height: 1.5;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

@media (max-width: 640px) {
  .card-grid {
    grid-template-columns: 1fr;
  }

  .media-card {
    flex-direction: column;
  }

  .media-cover {
    width: 100%;
    height: 120px;
  }
}
</style>
