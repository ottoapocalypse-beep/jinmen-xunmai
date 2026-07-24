<script setup lang="ts">
import { activities } from '@/data/activities'
import NavIcon from '@/components/NavIcon.vue'

function getLaneId(tags: string[]): string {
  if (tags.some(t => ['设计', '视觉', '创作', '微电影'].includes(t))) return 'design'
  if (tags.some(t => ['视频', 'B站', '影像'].includes(t))) return 'media'
  if (tags.some(t => ['采访', '调研', '预约', '校史馆', '口述史'].includes(t))) return 'interview'
  if (tags.some(t => ['推送', '宣传', '集结'].includes(t))) return 'promotion'
  if (tags.some(t => ['开发', '网站', '档案馆', '3D', '管理', '特效'].includes(t))) return 'dev'
  return 'team'
}

const laneColors: Record<string, string> = {
  design: '#8B5CF6', media: '#3B82F6', interview: '#10B981',
  promotion: '#F59E0B', dev: '#EC4899', team: '#6B7280',
}

// 按日期倒序排列
const sorted = [...activities].sort((a, b) => b.date.localeCompare(a.date))
</script>

<template>
  <div class="activity-page">
    <div class="page-header">
      <h1>实践动态</h1>
      <div class="page-title-en">Updates</div>
      <p>实时记录津门寻脉小队的实践足迹</p>
    </div>

    <div v-if="sorted.length === 0" class="empty-state">
      <div class="empty-icon"><NavIcon name="empty" :size="48" /></div>
      <div class="empty-text">暂无内容，敬请期待</div>
    </div>

    <div v-else class="timeline">
      <!-- 中央轴线 -->
      <div class="tl-axis" />

      <div
        v-for="(act, idx) in sorted"
        :key="act.id"
        :class="['tl-item', { active: act.active, left: idx % 2 === 0, right: idx % 2 !== 0 }]"
      >
        <!-- 左侧卡片 -->
        <div v-if="idx % 2 === 0" class="tl-card tl-card-left">
          <div class="tl-card-inner">
            <div class="tl-meta">
              <time class="tl-date">{{ act.date }}</time>
              <span v-if="act.active" class="tl-badge">进行中</span>
            </div>
            <h3 class="tl-title">{{ act.title }}</h3>
            <p class="tl-summary">{{ act.summary }}</p>
            <div class="tl-tags">
              <span v-for="tag in act.tags" :key="tag" :class="['tl-tag', getLaneId(act.tags)]">{{ tag }}</span>
            </div>
            <a v-if="act.link" :href="act.link" target="_blank" rel="noopener noreferrer" class="tl-link">
              阅读原文 →
            </a>
          </div>
        </div>

        <!-- 中心圆点 -->
        <div class="tl-center">
          <div class="tl-dot" :style="{ background: laneColors[getLaneId(act.tags)] }">
            <div v-if="act.active" class="tl-pulse" />
          </div>
        </div>

        <!-- 右侧卡片 -->
        <div v-if="idx % 2 !== 0" class="tl-card tl-card-right">
          <div class="tl-card-inner">
            <div class="tl-meta">
              <time class="tl-date">{{ act.date }}</time>
              <span v-if="act.active" class="tl-badge">进行中</span>
            </div>
            <h3 class="tl-title">{{ act.title }}</h3>
            <p class="tl-summary">{{ act.summary }}</p>
            <div class="tl-tags">
              <span v-for="tag in act.tags" :key="tag" :class="['tl-tag', getLaneId(act.tags)]">{{ tag }}</span>
            </div>
            <a v-if="act.link" :href="act.link" target="_blank" rel="noopener noreferrer" class="tl-link">
              阅读原文 →
            </a>
          </div>
        </div>
      </div>

      <!-- 底部结束标记 -->
      <div class="tl-end">
        <div class="tl-dot tl-dot-end" />
      </div>
    </div>
  </div>
</template>

<style scoped>
.activity-page {
  max-width: 900px;
  margin: 0 auto;
}

/* ===== 时间轴容器 ===== */
.timeline {
  position: relative;
  padding: var(--space-lg) 0;
}

/* ===== 中央轴线 ===== */
.tl-axis {
  position: absolute;
  left: 50%;
  top: 0;
  bottom: 0;
  width: 2px;
  transform: translateX(-50%);
  background: linear-gradient(
    180deg,
    transparent 0%,
    var(--color-border) 40px,
    var(--color-border) calc(100% - 24px),
    transparent 100%
  );
}

/* ===== 条目 ===== */
.tl-item {
  display: flex;
  align-items: flex-start;
  margin-bottom: var(--space-lg);
  position: relative;
}

/* ===== 中心圆点 ===== */
.tl-center {
  position: absolute;
  left: 50%;
  transform: translateX(-50%);
  z-index: 2;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding-top: 6px;
}

.tl-dot {
  width: 14px;
  height: 14px;
  border-radius: 50%;
  border: 3px solid var(--color-bg);
  box-shadow: 0 0 0 2px var(--color-border);
  position: relative;
}

.tl-item.active .tl-dot {
  box-shadow: 0 0 0 4px color-mix(in srgb, var(--color-primary) 25%, transparent);
}

/* ===== 脉冲动画（进行中） ===== */
.tl-pulse {
  position: absolute;
  top: 50%;
  left: 50%;
  width: 100%;
  height: 100%;
  border-radius: 50%;
  transform: translate(-50%, -50%) scale(1);
  background: inherit;
  opacity: 0.4;
  animation: tl-pulse 2s ease-in-out infinite;
}

@keyframes tl-pulse {
  0%, 100% { transform: translate(-50%, -50%) scale(1); opacity: 0.4; }
  50% { transform: translate(-50%, -50%) scale(2.2); opacity: 0; }
}

/* ===== 卡片 ===== */
.tl-card {
  width: calc(50% - 32px);
}

.tl-card-left {
  padding-right: 40px;
  text-align: right;
}

.tl-card-right {
  padding-left: 40px;
  margin-left: auto;
  text-align: left;
}

.tl-card-inner {
  background: var(--color-bg-card);
  border-radius: var(--radius-lg);
  padding: var(--space-md) var(--space-lg);
  box-shadow: var(--shadow-sm);
  border: 1px solid var(--color-border-light);
  transition: all var(--transition-normal);
  position: relative;
}

.tl-card-inner:hover {
  box-shadow: var(--shadow-md);
  transform: translateY(-2px);
}

/* 卡片的连接线 */
.tl-card-left .tl-card-inner::after {
  content: '';
  position: absolute;
  right: -10px;
  top: 14px;
  width: 10px;
  height: 2px;
  background: var(--color-border);
}

.tl-card-right .tl-card-inner::after {
  content: '';
  position: absolute;
  left: -10px;
  top: 14px;
  width: 10px;
  height: 2px;
  background: var(--color-border);
}

/* ===== 卡片内容 ===== */
.tl-meta {
  display: flex;
  align-items: center;
  gap: var(--space-sm);
  flex-wrap: wrap;
  margin-bottom: var(--space-xs);
}

.tl-card-left .tl-meta {
  justify-content: flex-end;
}

.tl-date {
  font-family: var(--font-sans);
  font-size: 0.8rem;
  color: var(--color-text-light);
  font-weight: 500;
  white-space: nowrap;
}

.tl-item.active .tl-date {
  font-weight: 600;
  color: #c0392b;
}

.tl-badge {
  display: inline-block;
  padding: 0 7px;
  font-family: var(--font-sans);
  font-size: 0.6rem;
  font-weight: 600;
  background: #c0392b;
  color: #fff;
  border-radius: 3px;
  line-height: 1.6;
  animation: tl-blink 1.5s ease-in-out infinite;
}

@keyframes tl-blink {
  0%, 100% { opacity: 1; }
  50% { opacity: 0.6; }
}

.tl-title {
  font-size: 1rem;
  color: var(--color-primary-dark);
  margin-bottom: var(--space-xs);
  line-height: 1.4;
}

.tl-item.active .tl-title {
  color: #c0392b;
}

.tl-summary {
  font-family: var(--font-sans);
  font-size: 0.85rem;
  color: var(--color-text-secondary);
  line-height: 1.7;
}

/* ===== 标签 ===== */
.tl-tags {
  display: flex;
  flex-wrap: wrap;
  gap: 4px;
  margin-top: var(--space-sm);
}

.tl-card-left .tl-tags {
  justify-content: flex-end;
}

.tl-tag {
  font-size: 0.65rem;
  padding: 1px 7px;
  border-radius: 3px;
  font-weight: 500;
  border: 1px solid var(--color-border);
  color: var(--color-text-secondary);
  background: var(--color-bg);
}

.tl-link {
  display: inline-block;
  margin-top: var(--space-sm);
  font-family: var(--font-sans);
  font-size: 0.8rem;
  color: var(--color-gold-dark);
  text-decoration: none;
  font-weight: 500;
  transition: color var(--transition-fast);
}

.tl-link:hover {
  color: var(--color-gold);
  text-decoration: underline;
}

/* ===== 底部结束 ===== */
.tl-end {
  display: flex;
  justify-content: center;
  padding-top: var(--space-sm);
}

.tl-dot-end {
  width: 10px;
  height: 10px;
  background: var(--color-border);
  border: none;
  box-shadow: none;
}

/* ===== 空状态 ===== */
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

/* ===== 移动端 ===== */
@media (max-width: 768px) {
  .tl-axis {
    left: 20px;
  }

  .tl-center {
    left: 20px;
  }

  .tl-card {
    width: calc(100% - 52px);
  }

  .tl-card-left {
    padding-right: 0;
    margin-left: 52px;
    text-align: left;
  }

  .tl-card-right {
    padding-left: 0;
    margin-left: 52px;
    text-align: left;
  }

  .tl-card-left .tl-meta,
  .tl-card-left .tl-tags {
    justify-content: flex-start;
  }

  .tl-card-left .tl-card-inner::after,
  .tl-card-right .tl-card-inner::after {
    left: -10px;
    right: auto;
  }

  .tl-title {
    font-size: 0.95rem;
  }

  .tl-summary {
    font-size: 0.8rem;
  }
}
</style>
