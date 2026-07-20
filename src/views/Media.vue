<script setup lang="ts">
import { mediaItems } from '@/data/media'
import NavIcon from '@/components/NavIcon.vue'

/** 根据 bilibiliId 构造跳转链接 */
function bilibiliPageUrl(id: string): string {
  return `https://www.bilibili.com/video/${id}/`
}

/** 视频类型对应的中文字符串 */
function typeLabel(type: string): string {
  const map: Record<string, string> = { documentary: '纪录片', 'short-video': '短视频', vlog: 'Vlog', interview: '访谈' }
  return map[type] ?? type
}

/** 视频类型对应的图标名 */
function typeIcon(type: string): string {
  const map: Record<string, string> = { documentary: 'media', 'short-video': 'music', vlog: 'video', interview: 'oralHistory' }
  return map[type] ?? 'media'
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
      <div class="card-grid">
        <div
          v-for="item in mediaItems"
          :key="item.id"
          class="media-card"
        >
          <!-- 视频封面区 -->
          <div class="media-cover" :class="{ 'is-featured': item === mediaItems[0] }">
            <NavIcon :name="typeIcon(item.type) as any" :size="item === mediaItems[0] ? 48 : 32" class="media-type-icon" />
            <div class="media-cover-badge">{{ typeLabel(item.type) }}</div>
            <!-- 播放按钮 -->
            <a
              v-if="item.bilibiliId"
              :href="bilibiliPageUrl(item.bilibiliId)"
              target="_blank"
              rel="noopener noreferrer"
              class="play-btn"
              @click.stop
            >
              <svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor">
                <polygon points="8,5 19,12 8,19" />
              </svg>
              <span class="play-btn-label">在B站观看</span>
            </a>
          </div>

          <!-- 视频信息区 -->
          <div class="media-info">
            <div class="media-meta">
              <time class="media-date">{{ item.date }}</time>
              <span v-if="item.duration" class="media-duration">{{ item.duration }}</span>
            </div>
            <h3 class="media-title">{{ item.title }}</h3>
            <p class="media-desc">{{ item.description }}</p>
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

/* ======== 视频卡片网格 ======== */
.card-grid {
  display: grid;
  grid-template-columns: 1fr;
  gap: var(--space-lg);
}

/* ======== 单张卡片 ======== */
.media-card {
  display: flex;
  gap: var(--space-lg);
  padding: var(--space-lg);
  background: var(--color-bg-card);
  border-radius: var(--radius-lg);
  box-shadow: var(--shadow-md);
  transition: box-shadow var(--transition-normal);
  border: 1px solid var(--color-border-light);
}

.media-card:hover {
  box-shadow: var(--shadow-lg);
}

/* ======== 封面区 ======== */
.media-cover {
  flex-shrink: 0;
  width: 240px;
  min-height: 150px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: var(--space-sm);
  background: linear-gradient(135deg, var(--color-bg-dark) 0%, #1a2744 100%);
  border-radius: var(--radius-md);
  position: relative;
  overflow: hidden;
}

.media-cover::before {
  content: '';
  position: absolute;
  inset: 0;
  background:
    radial-gradient(ellipse at 30% 50%, rgba(201,168,76,0.08) 0%, transparent 70%),
    repeating-linear-gradient(0deg, transparent, transparent 20px, rgba(255,255,255,0.02) 20px, rgba(255,255,255,0.02) 21px);
  pointer-events: none;
}

.media-cover.is-featured {
  width: 320px;
  min-height: 200px;
}

.media-type-icon {
  color: var(--color-gold);
  opacity: 0.5;
  z-index: 1;
}

.media-cover-badge {
  font-family: var(--font-sans);
  font-size: 0.65rem;
  color: rgba(255,255,255,0.5);
  letter-spacing: 0.08em;
  text-transform: uppercase;
  z-index: 1;
}

.play-btn {
  display: flex;
  align-items: center;
  gap: var(--space-xs);
  padding: 6px 14px;
  background: var(--color-gold);
  color: var(--color-text-on-gold);
  border-radius: 20px;
  font-family: var(--font-sans);
  font-size: 0.8rem;
  font-weight: 500;
  text-decoration: none;
  z-index: 1;
  transition: transform var(--transition-fast), box-shadow var(--transition-fast);
  margin-top: var(--space-sm);
}

.play-btn:hover {
  transform: scale(1.05);
  box-shadow: 0 0 20px rgba(201,168,76,0.4);
}

.play-btn-label {
  white-space: nowrap;
}

/* ======== 信息区 ======== */
.media-info {
  flex: 1;
  min-width: 0;
  display: flex;
  flex-direction: column;
  justify-content: center;
}

.media-meta {
  display: flex;
  align-items: center;
  gap: var(--space-sm);
  margin-bottom: var(--space-xs);
}

.media-date {
  font-family: var(--font-sans);
  font-size: 0.8rem;
  color: var(--color-text-light);
  font-weight: 500;
}

.media-duration {
  font-family: var(--font-sans);
  font-size: 0.75rem;
  color: var(--color-text-light);
  padding: 0 6px;
  border: 1px solid var(--color-border);
  border-radius: 3px;
}

.media-title {
  font-size: 1.1rem;
  font-weight: 600;
  color: var(--color-primary-dark);
  margin-bottom: var(--space-sm);
  line-height: 1.4;
}

.media-desc {
  font-family: var(--font-sans);
  font-size: 0.85rem;
  color: var(--color-text-secondary);
  line-height: 1.7;
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

/* ======== 响应式 ======== */
@media (max-width: 768px) {
  .media-card {
    flex-direction: column;
  }

  .media-cover,
  .media-cover.is-featured {
    width: 100%;
    min-height: 160px;
  }

  .media-title {
    font-size: 1rem;
  }
}
</style>
