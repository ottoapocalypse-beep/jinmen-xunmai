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

    <div v-else class="timeline">
      <div
        v-for="act in activities"
        :key="act.id"
        class="timeline-item"
        :class="{ active: act.active }"
      >
        <!-- 时间轴左侧：日期 + 节点 -->
        <div class="timeline-left">
          <div class="timeline-node" :class="{ active: act.active }">
            <span v-if="act.active" class="timeline-pulse" />
          </div>
          <div class="timeline-line" />
        </div>

        <!-- 时间轴右侧：内容卡片 -->
        <div class="timeline-card" :class="{ active: act.active }">
          <div class="timeline-meta">
            <time class="timeline-date">{{ act.date }}</time>
            <span v-if="act.active" class="timeline-badge">进行中</span>
            <div class="timeline-tags">
              <span v-for="tag in act.tags" :key="tag" class="tag" :class="{ 'tag-active': act.active }">{{ tag }}</span>
            </div>
          </div>
          <h3 class="timeline-title" :class="{ active: act.active }">{{ act.title }}</h3>
          <p class="timeline-summary">{{ act.summary }}</p>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.activity-page {
  max-width: 800px;
  margin: 0 auto;
}

/* ======== 时间轴容器 ======== */
.timeline {
  display: flex;
  flex-direction: column;
  gap: 0;
  position: relative;
}

/* ======== 每一项 ======== */
.timeline-item {
  display: flex;
  gap: var(--space-lg);
  position: relative;
}

/* ======== 左侧：日期 + 节点 + 连线 ======== */
.timeline-left {
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 30px;
  flex-shrink: 0;
  padding-top: 6px;
}

.timeline-node {
  width: 14px;
  height: 14px;
  border-radius: 50%;
  background: var(--color-border);
  border: 2px solid var(--color-bg);
  position: relative;
  z-index: 2;
  flex-shrink: 0;
  transition: all var(--transition-normal);
}

.timeline-node.active {
  background: #c0392b;
  border-color: #c0392b;
  box-shadow: 0 0 0 3px rgba(192, 57, 43, 0.2);
}

/* 进行中的脉冲动画 */
.timeline-pulse {
  position: absolute;
  inset: -4px;
  border-radius: 50%;
  border: 2px solid rgba(192, 57, 43, 0.3);
  animation: pulse 2s ease-in-out infinite;
}

@keyframes pulse {
  0% { transform: scale(1); opacity: 0.6; }
  50% { transform: scale(1.6); opacity: 0; }
  100% { transform: scale(1); opacity: 0.6; }
}

/* 连接线 */
.timeline-line {
  flex: 1;
  width: 2px;
  background: linear-gradient(180deg, var(--color-border) 0%, transparent 100%);
  min-height: 20px;
}

.timeline-item:last-child .timeline-line {
  display: none;
}

/* ======== 右侧：内容卡片 ======== */
.timeline-card {
  flex: 1;
  padding-bottom: var(--space-xl);
  transition: all var(--transition-normal);
}

.timeline-card.active {
  padding: var(--space-md) var(--space-md) var(--space-md) 0;
}

.timeline-meta {
  display: flex;
  align-items: center;
  gap: var(--space-sm);
  flex-wrap: wrap;
  margin-bottom: var(--space-xs);
}

.timeline-date {
  font-family: var(--font-sans);
  font-size: 0.8rem;
  color: var(--color-text-light);
  font-weight: 500;
}

.timeline-card.active .timeline-date {
  color: #c0392b;
  font-weight: 600;
}

.timeline-badge {
  display: inline-block;
  padding: 0 8px;
  font-family: var(--font-sans);
  font-size: 0.65rem;
  font-weight: 600;
  background: #c0392b;
  color: #fff;
  letter-spacing: 0.05em;
}

.timeline-tags {
  display: flex;
  gap: var(--space-xs);
}

/* 进行中的标签也变红 */
.tag-active {
  background: rgba(192, 57, 43, 0.08) !important;
  color: #c0392b !important;
  border-color: rgba(192, 57, 43, 0.2) !important;
}

.timeline-title {
  font-size: 1.05rem;
  color: var(--color-primary-dark);
  margin-bottom: var(--space-xs);
  transition: color var(--transition-fast);
}

.timeline-title.active {
  color: #c0392b;
}

.timeline-summary {
  font-family: var(--font-sans);
  font-size: 0.85rem;
  color: var(--color-text-secondary);
  line-height: 1.7;
}

.timeline-card.active .timeline-summary {
  color: var(--color-text);
}

/* ======== 空状态 ======== */
@media (max-width: 768px) {
  .timeline-item {
    gap: var(--space-md);
  }

  .timeline-left {
    width: 24px;
  }

  .timeline-title {
    font-size: 0.95rem;
  }
}
</style>
