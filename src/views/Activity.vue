<script setup lang="ts">
import { computed } from 'vue'
import { activities } from '@/data/activities'

/** 按日期分组（降序），同一天的活动聚合在一起 */
interface DayGroup {
  date: string
  hasActive: boolean
  items: typeof activities
}

const dayGroups = computed<DayGroup[]>(() => {
  const map = new Map<string, typeof activities>()
  // 按日期降序排列
  const sorted = [...activities].sort((a, b) => b.date.localeCompare(a.date))
  for (const act of sorted) {
    const group = map.get(act.date) || []
    group.push(act)
    map.set(act.date, group)
  }
  const groups: DayGroup[] = []
  for (const [date, items] of map) {
    groups.push({
      date,
      hasActive: items.some(i => i.active),
      items,
    })
  }
  return groups
})

function formatDate(dateStr: string): { month: string; day: string; weekday: string } {
  const d = new Date(dateStr)
  const month = `${d.getMonth() + 1}`
  const day = `${d.getDate()}`
  const weekdays = ['日', '一', '二', '三', '四', '五', '六']
  const weekday = weekdays[d.getDay()]
  return { month, day, weekday }
}
</script>

<template>
  <div class="activity-page">
    <div class="page-header">
      <h1>实践动态</h1>
      <div class="page-title-en">Updates</div>
      <p>实时记录津门寻脉小队的实践足迹</p>
    </div>

    <div v-if="dayGroups.length === 0" class="empty-state">
      <div class="empty-icon">📝</div>
      <div class="empty-text">暂无内容，敬请期待</div>
    </div>

    <div v-else class="timeline">
      <div
        v-for="group in dayGroups"
        :key="group.date"
        class="timeline-day"
        :class="{ 'has-active': group.hasActive }"
      >
        <!-- 时间轴左侧：日期标 + 连线 -->
        <div class="timeline-left">
          <div class="timeline-date-label" :class="{ active: group.hasActive }">
            <span class="date-month">{{ formatDate(group.date).month }}</span>
            <span class="date-sep">/</span>
            <span class="date-day">{{ formatDate(group.date).day }}</span>
            <span class="date-weekday">周{{ formatDate(group.date).weekday }}</span>
          </div>
          <div class="timeline-line" />
        </div>

        <!-- 时间轴右侧：当日活动卡片列表 -->
        <div class="timeline-cards">
          <div
            v-for="act in group.items"
            :key="act.id"
            class="timeline-card"
            :class="{ active: act.active }"
          >
            <div class="card-head">
              <div class="card-tags">
                <span v-if="act.active" class="badge-active">进行中</span>
                <span v-for="tag in act.tags" :key="tag" class="tag" :class="{ 'tag-active': act.active }">{{ tag }}</span>
              </div>
            </div>
            <h3 class="card-title" :class="{ active: act.active }">{{ act.title }}</h3>
            <p class="card-summary">{{ act.summary }}</p>
            <a
              v-if="act.link"
              :href="act.link"
              target="_blank"
              rel="noopener noreferrer"
              class="card-link"
            >
              阅读原文 →
            </a>
          </div>
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

/* ======== 每一天 ======== */
.timeline-day {
  display: flex;
  gap: var(--space-lg);
  position: relative;
}

/* ======== 左侧：日期标签 + 连线 ======== */
.timeline-left {
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 72px;
  flex-shrink: 0;
  padding-top: 4px;
}

.timeline-date-label {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0;
  padding: 6px 10px;
  border-radius: var(--radius-sm);
  background: var(--color-bg-card);
  border: 1px solid var(--color-border);
  font-family: var(--font-sans);
  line-height: 1.1;
  z-index: 2;
  transition: all var(--transition-fast);
}

.timeline-date-label.active {
  border-color: #c0392b;
  background: rgba(192, 57, 43, 0.06);
}

.date-month {
  font-size: 0.65rem;
  color: var(--color-text-light);
  font-weight: 500;
}

.date-sep {
  display: none;
}

.date-day {
  font-size: 1.3rem;
  font-weight: 700;
  color: var(--color-primary-dark);
  line-height: 1.2;
}

.timeline-date-label.active .date-day {
  color: #c0392b;
}

.date-weekday {
  font-size: 0.6rem;
  color: var(--color-text-light);
  margin-top: 2px;
}

/* 连接线 */
.timeline-line {
  flex: 1;
  width: 2px;
  background: linear-gradient(180deg, var(--color-border) 0%, transparent 100%);
  min-height: 24px;
  margin-top: 4px;
}

.timeline-day:last-child .timeline-line {
  display: none;
}

.timeline-day.has-active .timeline-line {
  background: linear-gradient(180deg, rgba(192, 57, 43, 0.3) 0%, transparent 100%);
}

/* ======== 右侧：活动卡片列表 ======== */
.timeline-cards {
  flex: 1;
  padding-bottom: var(--space-xl);
  display: flex;
  flex-direction: column;
  gap: var(--space-sm);
}

.timeline-card {
  padding: var(--space-md);
  background: var(--color-bg-card);
  border-radius: var(--radius-md);
  border: 1px solid var(--color-border-light);
  transition: all var(--transition-fast);
}

.timeline-card.active {
  border-color: rgba(192, 57, 43, 0.15);
  background: rgba(192, 57, 43, 0.03);
  box-shadow: 0 2px 8px rgba(192, 57, 43, 0.06);
}

.card-head {
  margin-bottom: var(--space-xs);
}

.card-tags {
  display: flex;
  align-items: center;
  gap: var(--space-xs);
  flex-wrap: wrap;
}

.badge-active {
  display: inline-block;
  padding: 1px 8px;
  font-family: var(--font-sans);
  font-size: 0.6rem;
  font-weight: 600;
  background: #c0392b;
  color: #fff;
  letter-spacing: 0.05em;
  border-radius: 2px;
}

.tag-active {
  background: rgba(192, 57, 43, 0.08) !important;
  color: #c0392b !important;
  border-color: rgba(192, 57, 43, 0.2) !important;
}

.card-title {
  font-size: 1rem;
  color: var(--color-primary-dark);
  margin-bottom: var(--space-xs);
  line-height: 1.4;
  transition: color var(--transition-fast);
}

.card-title.active {
  color: #c0392b;
}

.card-summary {
  font-family: var(--font-sans);
  font-size: 0.83rem;
  color: var(--color-text-secondary);
  line-height: 1.7;
  margin-bottom: var(--space-sm);
}

.timeline-card.active .card-summary {
  color: var(--color-text);
}

/* ======== 原文链接 ======== */
.card-link {
  font-family: var(--font-sans);
  font-size: 0.78rem;
  color: var(--color-gold-dark);
  text-decoration: none;
  font-weight: 500;
  transition: color var(--transition-fast);
}

.card-link:hover {
  color: var(--color-gold);
  text-decoration: underline;
}

/* ======== 空状态 ======== */
@media (max-width: 768px) {
  .timeline-day {
    gap: var(--space-md);
  }

  .timeline-left {
    width: 56px;
  }

  .date-day {
    font-size: 1.1rem;
  }

  .card-title {
    font-size: 0.92rem;
  }
}
</style>
