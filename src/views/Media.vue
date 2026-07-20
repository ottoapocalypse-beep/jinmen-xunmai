<script setup lang="ts">
import { ref } from 'vue'
import { mediaItems } from '@/data/media'
import { siteConfig } from '@/data/site'
import NavIcon from '@/components/NavIcon.vue'

/** 记录每个视频是否已点击加载 */
const loaded = ref<Record<string, boolean>>({})

function loadVideo(id: string) {
  loaded.value[id] = true
}

/** 根据 bilibiliId 构造可播放的嵌入 URL（点击后才加载） */
function bilibiliEmbedUrl(id: string): string {
  // highQuality=1 最高画质，autoplay=1 点击后自动播放
  if (id.startsWith('BV')) {
    return `https://player.bilibili.com/player.html?bvid=${id}&autoplay=1&highQuality=1&danmaku=0`
  }
  if (id.startsWith('av')) {
    return `https://player.bilibili.com/player.html?aid=${id.slice(2)}&autoplay=1&highQuality=1&danmaku=0`
  }
  return id
}

/** 根据 bilibiliId 构造跳转链接 */
function bilibiliPageUrl(id: string): string {
  return `https://www.bilibili.com/video/${id}/`
}

/** 视频类型标签映射 */
function typeLabel(t: string): string {
  const map: Record<string, string> = { documentary: '纪录片', 'short-video': '短视频', vlog: 'Vlog', interview: '访谈' }
  return map[t] || t
}

/** 视频类型图标映射 */
function typeIcon(t: string): string {
  const map: Record<string, string> = { documentary: 'media', 'short-video': 'music', vlog: 'video', interview: 'oralHistory' }
  return map[t] || 'media'
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
      <!-- 精选展映：点击加载播放器 -->
      <div
        v-for="(item, idx) in mediaItems"
        :key="item.id"
        class="video-block"
        :class="{ featured: idx === 0 }"
      >
        <!-- 点击前：自定义视频卡片 -->
        <div v-if="!loaded[item.id]" class="video-poster" @click="loadVideo(item.id)">
          <div class="poster-bg">
            <NavIcon :name="typeIcon(item.type)" :size="idx === 0 ? 56 : 36" class="poster-icon" />
          </div>
          <div class="poster-overlay">
            <div class="poster-play">
              <svg viewBox="0 0 24 24" width="48" height="48" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
                <circle cx="12" cy="12" r="10" />
                <polygon points="10,8 16,12 10,16" fill="currentColor" stroke="none" />
              </svg>
            </div>
            <span class="poster-hint">点击播放 · B站源</span>
          </div>
        </div>

        <!-- 点击后：B站播放器 -->
        <div v-else class="player-wrapper" :class="{ featured: idx === 0 }">
          <iframe
            :src="bilibiliEmbedUrl(item.bilibiliId!)"
            :title="item.title"
            allow="autoplay; fullscreen"
          />
        </div>

        <!-- 视频信息 -->
        <div class="video-info" :class="{ featured: idx === 0 }">
          <h2 :class="['video-title', { large: idx === 0 }]">{{ item.title }}</h2>
          <div class="video-meta">
            <span class="video-date">{{ item.date }}</span>
            <span class="tag">{{ typeLabel(item.type) }}</span>
            <span v-if="item.duration" class="video-duration">{{ item.duration }}</span>
          </div>
          <p class="video-desc">{{ item.description }}</p>
          <a
            :href="bilibiliPageUrl(item.bilibiliId!)"
            target="_blank"
            rel="noopener noreferrer"
            class="video-external"
          >
            在 B站 打开 →
          </a>
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

/* ======== 视频块 ======== */
.video-block {
  margin-bottom: var(--space-2xl);
  background: var(--color-bg-card);
  border-radius: var(--radius-lg);
  overflow: hidden;
  box-shadow: var(--shadow-sm);
  transition: box-shadow var(--transition-normal);
}

.video-block:hover {
  box-shadow: var(--shadow-md);
}

.video-block.featured {
  box-shadow: var(--shadow-md);
}

/* ======== 视频海报（点击加载前） ======== */
.video-poster {
  position: relative;
  width: 100%;
  padding-top: 56.25%;
  background: linear-gradient(135deg, var(--color-bg-dark) 0%, var(--color-primary) 100%);
  cursor: pointer;
  overflow: hidden;
}

.poster-bg {
  position: absolute;
  inset: 0;
  display: flex;
  align-items: center;
  justify-content: center;
}

.poster-icon {
  color: rgba(255, 255, 255, 0.15);
}

.poster-overlay {
  position: absolute;
  inset: 0;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: var(--space-sm);
  background: rgba(0, 0, 0, 0.25);
  transition: background var(--transition-fast);
}

.video-poster:hover .poster-overlay {
  background: rgba(0, 0, 0, 0.4);
}

.poster-play {
  color: #fff;
  opacity: 0.85;
  transition: transform var(--transition-fast), opacity var(--transition-fast);
}

.video-poster:hover .poster-play {
  transform: scale(1.1);
  opacity: 1;
}

.poster-hint {
  font-family: var(--font-sans);
  font-size: 0.75rem;
  color: rgba(255, 255, 255, 0.7);
  letter-spacing: 0.05em;
}

/* ======== 播放器（点击后） ======== */
.player-wrapper {
  position: relative;
  width: 100%;
  padding-top: 56.25%;
  background: #000;
}

.player-wrapper.featured {
  padding-top: 56.25%;
}

.player-wrapper iframe {
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  border: none;
}

/* ======== 视频信息 ======== */
.video-info {
  padding: var(--space-lg);
}

.video-info.featured {
  padding: var(--space-lg);
}

.video-title {
  font-size: 1rem;
  color: var(--color-primary-dark);
  margin-bottom: var(--space-xs);
  line-height: 1.4;
}

.video-title.large {
  font-size: 1.2rem;
}

.video-meta {
  display: flex;
  align-items: center;
  gap: var(--space-sm);
  flex-wrap: wrap;
  margin-bottom: var(--space-sm);
}

.video-date {
  font-family: var(--font-sans);
  font-size: 0.8rem;
  color: var(--color-text-light);
  font-weight: 500;
}

.video-duration {
  font-family: var(--font-sans);
  font-size: 0.75rem;
  color: var(--color-text-light);
}

.video-desc {
  font-family: var(--font-sans);
  font-size: 0.85rem;
  color: var(--color-text-secondary);
  line-height: 1.7;
  margin-top: var(--space-sm);
}

.video-external {
  display: inline-block;
  margin-top: var(--space-sm);
  font-family: var(--font-sans);
  font-size: 0.8rem;
  color: var(--color-gold-dark);
  text-decoration: none;
  font-weight: 500;
  transition: color var(--transition-fast);
}

.video-external:hover {
  color: var(--color-gold);
  text-decoration: underline;
}

/* ======== 空状态 ======== */
.empty-state {
  text-align: center;
  padding: var(--space-3xl) var(--space-lg);
}

.empty-icon {
  margin-bottom: var(--space-md);
  color: var(--color-text-light);
  opacity: 0.4;
}

.empty-text {
  font-family: var(--font-sans);
  font-size: 1rem;
  color: var(--color-text-secondary);
}

@media (max-width: 640px) {
  .video-title.large {
    font-size: 1rem;
  }
}
</style>
