<script setup lang="ts">
import { computed } from 'vue'
import { activities } from '@/data/activities'

/**
 * 泳道定义：每个泳道包含名称、图标、颜色和活动列表
 */
interface Lane {
  id: string
  label: string
  icon: string
  color: string
  items: typeof activities
}

/** 根据标签判断活动归属泳道 */
function getLaneId(tags: string[]): string {
  if (tags.some(t => ['设计', '视觉', '创作', '微电影'].includes(t))) return 'design'
  if (tags.some(t => ['视频', 'B站', '影像'].includes(t))) return 'media'
  if (tags.some(t => ['采访', '调研', '预约', '校史馆'].includes(t))) return 'interview'
  if (tags.some(t => ['推送', '宣传', '集结'].includes(t))) return 'promotion'
  return 'team'
}

/** 泳道配置 */
const laneConfigs: Record<string, { label: string; icon: string; color: string }> = {
  design:    { label: '设计创作', icon: '🎨', color: '#8B5CF6' },
  media:     { label: '影像视频', icon: '🎬', color: '#3B82F6' },
  interview: { label: '采访调研', icon: '🎙️', color: '#10B981' },
  promotion: { label: '宣传推送', icon: '📢', color: '#F59E0B' },
  team:      { label: '团队动态', icon: '👥', color: '#EC4899' },
}

/** 按泳道分组 */
const lanes = computed<Lane[]>(() => {
  const groups: Record<string, typeof activities> = { design: [], media: [], interview: [], promotion: [], team: [] }
  for (const act of activities) {
    const laneId = getLaneId(act.tags)
    groups[laneId].push(act)
  }
  return Object.entries(laneConfigs).map(([id, cfg]) => ({
    id,
    ...cfg,
    items: groups[id].sort((a, b) => a.date.localeCompare(b.date)),
  }))
})
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

    <!-- ====== 泳道视图 ====== -->
    <div v-else class="swimlane-container">
      <div class="swimlane-scroll">
        <div class="swimlane-track">
          <div
            v-for="lane in lanes"
            :key="lane.id"
            class="lane"
          >
            <!-- 泳道表头 -->
            <div class="lane-header" :style="{ '--lane-color': lane.color }">
              <span class="lane-icon">{{ lane.icon }}</span>
              <span class="lane-label">{{ lane.label }}</span>
              <span class="lane-count">{{ lane.items.length }}</span>
            </div>

            <!-- 泳道内容 -->
            <div class="lane-body">
              <div
                v-for="act in lane.items"
                :key="act.id"
                class="lane-card"
                :class="{ active: act.active }"
                :style="{ '--lane-color': lane.color }"
              >
                <div class="lane-card-head">
                  <time class="lane-date">{{ act.date }}</time>
                  <span v-if="act.active" class="lane-badge">进行中</span>
                </div>
                <h3 class="lane-title">{{ act.title }}</h3>
                <p class="lane-summary">{{ act.summary }}</p>
                <div class="lane-tags">
                  <span v-for="tag in act.tags" :key="tag" class="tag" :class="{ active: act.active }">{{ tag }}</span>
                </div>
                <a
                  v-if="act.link"
                  :href="act.link"
                  target="_blank"
                  rel="noopener noreferrer"
                  class="lane-link"
                >
                  阅读原文 →
                </a>
              </div>

              <!-- 泳道空状态 -->
              <div v-if="lane.items.length === 0" class="lane-empty">
                暂无记录
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- 滚动提示（移动端） -->
      <div class="scroll-hint">
        ← 左右滑动查看并行进度 →
      </div>
    </div>
  </div>
</template>

<style scoped>
.activity-page {
  max-width: 1100px;
  margin: 0 auto;
}

/* ======== 泳道容器 ======== */
.swimlane-container {
  position: relative;
}

.swimlane-scroll {
  overflow-x: auto;
  padding-bottom: var(--space-md);
  scroll-snap-type: x proximity;
  -webkit-overflow-scrolling: touch;
}

.swimlane-track {
  display: flex;
  gap: var(--space-md);
  min-width: min-content;
  padding: var(--space-xs) 0;
}

/* ======== 单个泳道 ======== */
.lane {
  flex: 0 0 280px;
  scroll-snap-align: start;
  display: flex;
  flex-direction: column;
  border-radius: var(--radius-lg);
  background: var(--color-bg-card);
  box-shadow: var(--shadow-sm);
  overflow: hidden;
  transition: box-shadow var(--transition-normal);
}

.lane:hover {
  box-shadow: var(--shadow-md);
}

/* ======== 泳道表头 ======== */
.lane-header {
  display: flex;
  align-items: center;
  gap: var(--space-sm);
  padding: var(--space-md) var(--space-lg);
  background: linear-gradient(135deg, var(--lane-color), color-mix(in srgb, var(--lane-color) 80%, #000));
  color: #fff;
  font-family: var(--font-sans);
  font-weight: 600;
  font-size: 0.9rem;
}

.lane-icon {
  font-size: 1.1rem;
  line-height: 1;
}

.lane-count {
  margin-left: auto;
  background: rgba(255, 255, 255, 0.25);
  padding: 0 8px;
  border-radius: 10px;
  font-size: 0.7rem;
  font-weight: 500;
}

/* ======== 泳道内容 ======== */
.lane-body {
  padding: var(--space-sm);
  display: flex;
  flex-direction: column;
  gap: var(--space-sm);
  flex: 1;
}

/* ======== 泳道卡片 ======== */
.lane-card {
  padding: var(--space-md);
  border-radius: var(--radius-md);
  background: var(--color-bg);
  border-left: 3px solid var(--lane-color);
  transition: transform var(--transition-fast), box-shadow var(--transition-fast);
}

.lane-card.active {
  background: linear-gradient(135deg, color-mix(in srgb, var(--lane-color) 8%, transparent), transparent);
  border-left-color: var(--lane-color);
}

.lane-card:hover {
  transform: translateX(2px);
  box-shadow: var(--shadow-sm);
}

.lane-card-head {
  display: flex;
  align-items: center;
  gap: var(--space-sm);
  margin-bottom: var(--space-xs);
}

.lane-date {
  font-family: var(--font-sans);
  font-size: 0.75rem;
  color: var(--color-text-light);
  font-weight: 500;
  letter-spacing: 0.02em;
}

.lane-card.active .lane-date {
  font-weight: 600;
}

.lane-badge {
  display: inline-block;
  padding: 0 7px;
  font-family: var(--font-sans);
  font-size: 0.6rem;
  font-weight: 600;
  background: var(--lane-color);
  color: #fff;
  border-radius: 3px;
  letter-spacing: 0.02em;
  line-height: 1.6;
}

.lane-title {
  font-size: 0.95rem;
  color: var(--color-primary-dark);
  margin-bottom: var(--space-xs);
  line-height: 1.4;
}

.lane-card.active .lane-title {
  color: var(--lane-color);
}

.lane-summary {
  font-family: var(--font-sans);
  font-size: 0.8rem;
  color: var(--color-text-secondary);
  line-height: 1.6;
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

.lane-tags {
  display: flex;
  flex-wrap: wrap;
  gap: 4px;
  margin-top: var(--space-sm);
}

.lane-tags .tag {
  font-size: 0.65rem;
  padding: 1px 7px;
}

.lane-tags .tag.active {
  background: color-mix(in srgb, var(--lane-color) 15%, transparent) !important;
  color: var(--lane-color) !important;
  border-color: color-mix(in srgb, var(--lane-color) 30%, transparent) !important;
}

.lane-link {
  display: inline-block;
  margin-top: var(--space-sm);
  font-family: var(--font-sans);
  font-size: 0.75rem;
  color: var(--lane-color);
  text-decoration: none;
  font-weight: 500;
  transition: opacity var(--transition-fast);
}

.lane-link:hover {
  opacity: 0.7;
  text-decoration: underline;
}

/* ======== 空状态 ======== */
.lane-empty {
  text-align: center;
  padding: var(--space-xl) var(--space-md);
  font-family: var(--font-sans);
  font-size: 0.8rem;
  color: var(--color-text-light);
}

/* ======== 滚动提示 ======== */
.scroll-hint {
  display: none;
  text-align: center;
  font-family: var(--font-sans);
  font-size: 0.7rem;
  color: var(--color-text-light);
  padding-top: var(--space-sm);
  letter-spacing: 0.1em;
  animation: fadeHint 3s ease-in-out infinite;
}

@keyframes fadeHint {
  0%, 100% { opacity: 0.3; }
  50% { opacity: 0.8; }
}

/* ======== 空状态（全局） ======== */
.empty-state {
  text-align: center;
  padding: var(--space-3xl) var(--space-lg);
}

.empty-icon {
  font-size: 3rem;
  margin-bottom: var(--space-md);
}

.empty-text {
  font-family: var(--font-sans);
  font-size: 1rem;
  color: var(--color-text-secondary);
}

/* ======== 响应式 ======== */
@media (max-width: 768px) {
  .swimlane-scroll {
    margin: 0 calc(-1 * var(--space-md));
    padding-left: var(--space-md);
    padding-right: var(--space-md);
  }

  .lane {
    flex: 0 0 260px;
  }

  .scroll-hint {
    display: block;
  }

  .lane-title {
    font-size: 0.9rem;
  }
}

@media (min-width: 769px) {
  .swimlane-track {
    justify-content: center;
  }

  .lane {
    flex: 0 0 calc((100% / 5) - var(--space-md));
    min-width: 180px;
    max-width: 280px;
  }

  .scroll-hint {
    display: none;
  }
}
</style>
