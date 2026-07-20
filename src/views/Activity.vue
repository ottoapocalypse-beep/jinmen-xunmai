<script setup lang="ts">
import { activities } from '@/data/activities'
import NavIcon from '@/components/NavIcon.vue'

function getLaneId(tags: string[]): string {
  if (tags.some(t => ['设计', '视觉', '创作', '微电影'].includes(t))) return 'design'
  if (tags.some(t => ['视频', 'B站', '影像'].includes(t))) return 'media'
  if (tags.some(t => ['采访', '调研', '预约', '校史馆'].includes(t))) return 'interview'
  if (tags.some(t => ['推送', '宣传', '集结'].includes(t))) return 'promotion'
  return 'team'
}

const laneColors: Record<string, string> = {
  design: '#8B5CF6', media: '#3B82F6', interview: '#10B981',
  promotion: '#F59E0B', team: '#EC4899',
}

const laneLabels: Record<string, string> = {
  design: '设计创作', media: '影像视频', interview: '采访调研',
  promotion: '宣传推送', team: '团队动态',
}

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
      <div v-for="act in sorted" :key="act.id" class="tl-item" :class="{ active: act.active }">
        <div class="tl-left">
          <div class="tl-dot" :style="{ background: laneColors[getLaneId(act.tags)] }" />
          <div class="tl-line" />
        </div>
        <div class="tl-card">
          <div class="tl-meta">
            <time class="tl-date">{{ act.date }}</time>
            <span v-if="act.active" class="tl-badge">进行中</span>
            <span class="tl-cat" :style="{ color: laneColors[getLaneId(act.tags)] }">{{ laneLabels[getLaneId(act.tags)] }}</span>
          </div>
          <h3 class="tl-title">{{ act.title }}</h3>
          <p class="tl-summary">{{ act.summary }}</p>
          <div class="tl-tags">
            <span v-for="tag in act.tags" :key="tag" class="tag">{{ tag }}</span>
          </div>
          <a v-if="act.link" :href="act.link" target="_blank" rel="noopener noreferrer" class="tl-link">阅读原文 →</a>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.activity-page { max-width: 800px; margin: 0 auto; }

.timeline { display: flex; flex-direction: column; }

.tl-item { display: flex; gap: var(--space-md); position: relative; }

.tl-left { display: flex; flex-direction: column; align-items: center; width: 20px; flex-shrink: 0; padding-top: 4px; align-self: stretch; }

.tl-dot { width: 12px; height: 12px; border-radius: 50%; flex-shrink: 0; z-index: 2; position: relative; }

.tl-item.active .tl-dot { box-shadow: 0 0 0 3px color-mix(in srgb, var(--color-primary) 20%, transparent); }

.tl-line { flex: 1 1 0; width: 2px; min-height: 0; background: linear-gradient(180deg, var(--color-border) 0%, transparent 100%); }

.tl-item:last-child .tl-line { display: none; }

.tl-card { flex: 1; padding-bottom: var(--space-lg); min-width: 0; }

.tl-meta { display: flex; align-items: center; gap: var(--space-sm); flex-wrap: wrap; margin-bottom: var(--space-xs); }

.tl-date { font-family: var(--font-sans); font-size: 0.8rem; color: var(--color-text-light); font-weight: 500; }

.tl-item.active .tl-date { font-weight: 600; }

.tl-badge { display: inline-block; padding: 0 7px; font-family: var(--font-sans); font-size: 0.6rem; font-weight: 600; background: #c0392b; color: #fff; border-radius: 3px; line-height: 1.6; }

.tl-cat { font-family: var(--font-sans); font-size: 0.65rem; font-weight: 500; margin-left: auto; opacity: 0.8; }

.tl-title { font-size: 1rem; color: var(--color-primary-dark); margin-bottom: var(--space-xs); line-height: 1.4; }

.tl-item.active .tl-title { color: #c0392b; }

.tl-summary { font-family: var(--font-sans); font-size: 0.85rem; color: var(--color-text-secondary); line-height: 1.7; }

.tl-tags { display: flex; flex-wrap: wrap; gap: 4px; margin-top: var(--space-sm); }

.tl-tags .tag { font-size: 0.65rem; padding: 1px 7px; }

.tl-link { display: inline-block; margin-top: var(--space-sm); font-family: var(--font-sans); font-size: 0.8rem; color: var(--color-gold-dark); text-decoration: none; font-weight: 500; transition: color var(--transition-fast); }

.tl-link:hover { color: var(--color-gold); text-decoration: underline; }

.empty-state { text-align: center; padding: var(--space-3xl) var(--space-lg); }

.empty-icon { margin-bottom: var(--space-md); color: var(--color-text-light); opacity: 0.4; }

.empty-text { font-family: var(--font-sans); font-size: 1rem; color: var(--color-text-secondary); }

@media (max-width: 640px) {
  .activity-page { max-width: 100%; }
  .tl-left { width: 16px; }
  .tl-dot { width: 10px; height: 10px; }
  .tl-title { font-size: 0.95rem; }
  .tl-summary { font-size: 0.8rem; }
}
</style>