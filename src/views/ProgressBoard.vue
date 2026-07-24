<script setup lang="ts">
import { ref, computed } from 'vue'
import {
  professorEntries,
  teamTasks,
  teamMembers,
  contactStatusColors,
  taskStatusColors,
} from '@/data/taskAssignments'

const filterMode = ref<'all' | 'contacted' | 'unreached' | 'done'>('all')
const expandedProf = ref<number | null>(null)

const filtered = computed(() => {
  let list = professorEntries
  if (filterMode.value === 'contacted') list = list.filter(p => p.contactStatus === '已联系好')
  else if (filterMode.value === 'unreached') list = list.filter(p => p.contactStatus === '未联系上')
  else if (filterMode.value === 'done') list = list.filter(p => p.tasks.every(t => t.status === '已完成'))
  return list
})

function toggleProf(id: number) {
  expandedProf.value = expandedProf.value === id ? null : id
}

function statusIcon(status: string): string {
  const map: Record<string, string> = {
    '已完成': '✅', '审核中': '🔍', '进行中': '🔄', '未完成': '⏳', '未开始': '⬜',
  }
  return map[status] || '⬜'
}

// 统计
const stats = computed(() => {
  const total = professorEntries.length
  const contacted = professorEntries.filter(p => p.contactStatus === '已联系好').length
  const unreached = professorEntries.filter(p => p.contactStatus === '未联系上').length
  const rejected = professorEntries.filter(p => p.contactStatus === '不同意').length
  const interviewed = professorEntries.filter(p => p.tasks.some(t => t.name === '采访' && t.status === '已完成')).length
  const tasksDone = teamTasks.filter(t => t.status === '已完成').length
  const tasksTotal = teamTasks.length
  return { total, contacted, unreached, rejected, interviewed, tasksDone, tasksTotal }
})
</script>

<template>
  <div class="progress-page">
    <div class="page-header">
      <h1>📋 采访进度看板</h1>
      <div class="page-title-en">Interview Progress Board</div>
      <p>基于社会实践任务分配表实时更新 · 仅供团队内部参考</p>
    </div>

    <!-- ──── 概览统计 ──── -->
    <section class="section">
      <h2 class="section-title">📊 总体概览</h2>
      <div class="stats-grid">
        <div class="stat-card">
          <span class="stat-value">{{ stats.total }}</span>
          <span class="stat-label">🎯 目标教授</span>
        </div>
        <div class="stat-card contacted">
          <span class="stat-value">{{ stats.contacted }}</span>
          <span class="stat-label">✅ 已联系好</span>
        </div>
        <div class="stat-card unreached">
          <span class="stat-value">{{ stats.unreached }}</span>
          <span class="stat-label">📞 未联系上</span>
        </div>
        <div class="stat-card rejected">
          <span class="stat-value">{{ stats.rejected }}</span>
          <span class="stat-label">❌ 已拒绝</span>
        </div>
        <div class="stat-card interviewed">
          <span class="stat-value">{{ stats.interviewed }}</span>
          <span class="stat-label">🎤 已完成采访</span>
        </div>
        <div class="stat-card progress">
          <span class="stat-value">{{ stats.tasksDone }}/{{ stats.tasksTotal }}</span>
          <span class="stat-label">📝 团队任务完成</span>
        </div>
      </div>
    </section>

    <!-- ──── 教授进度卡 ──── -->
    <section class="section">
      <div class="section-header">
        <h2 class="section-title">👨‍🏫 教授采访进度</h2>
        <div class="filter-bar">
          <button :class="['filter-btn', { active: filterMode === 'all' }]" @click="filterMode = 'all'">全部</button>
          <button :class="['filter-btn', { active: filterMode === 'contacted' }]" @click="filterMode = 'contacted'">已联系好</button>
          <button :class="['filter-btn', { active: filterMode === 'unreached' }]" @click="filterMode = 'unreached'">未联系上</button>
          <button :class="['filter-btn', { active: filterMode === 'done' }]" @click="filterMode = 'done'">已完成</button>
        </div>
      </div>

      <div v-for="prof in filtered" :key="prof.id" class="prof-card" @click="toggleProf(prof.id)">
        <!-- 卡片头 -->
        <div class="prof-header">
          <span class="prof-id">#{{ prof.id }}</span>
          <span class="prof-name">{{ prof.name }}</span>
          <span
            v-if="prof.contactStatus"
            :style="{ background: contactStatusColors[prof.contactStatus] || '#9CA3AF' }"
            class="prof-badge"
          >{{ prof.contactStatus }}</span>
          <span v-if="prof.interviewTime" class="prof-time">📅 {{ prof.interviewTime }}</span>
          <span v-if="prof.interviewPlace" class="prof-place">📍 {{ prof.interviewPlace }}</span>
          <span class="prof-toggle">{{ expandedProf === prof.id ? '▲' : '▼' }}</span>
        </div>

        <!-- 备注 -->
        <div v-if="prof.note" class="prof-note">📌 {{ prof.note }}</div>

        <!-- 展开：任务列表 -->
        <div v-if="expandedProf === prof.id" class="prof-tasks">
          <div v-for="t in prof.tasks" :key="t.name" class="task-row" :class="{ empty: !t.status && !t.assignee }">
            <span class="task-icon">{{ statusIcon(t.status) }}</span>
            <span class="task-name">{{ t.name }}</span>
            <span v-if="t.status" :style="{ color: taskStatusColors[t.status] || '#9CA3AF' }" class="task-status">{{ t.status }}</span>
            <span v-if="t.assignee" class="task-assignee">{{ t.assignee }}</span>
          </div>
        </div>
      </div>
      <div v-if="filtered.length === 0" class="empty-state">没有符合条件的教授</div>
    </section>

    <!-- ──── 团队任务总览 ──── -->
    <section class="section">
      <h2 class="section-title">📝 团队任务完成情况</h2>
      <div class="task-summary-grid">
        <div v-for="t in teamTasks" :key="t.name" class="task-summary-row">
          <span class="ts-icon">{{ statusIcon(t.status) }}</span>
          <span class="ts-name">{{ t.name }}</span>
          <span :style="{ color: taskStatusColors[t.status] || '#9CA3AF' }" class="ts-status">{{ t.status }}</span>
          <span class="ts-assignee">{{ t.assignee }}</span>
        </div>
      </div>
    </section>

    <!-- ──── 成员任务分布 ──── -->
    <section class="section">
      <h2 class="section-title">👥 成员任务分布</h2>
      <div class="member-grid">
        <div v-for="member in teamMembers" :key="member" class="member-card">
          <div class="member-name">{{ member }}</div>
          <div class="member-tasks">
            <div
              v-for="t in teamTasks.filter(t => t.assignee.includes(member) || t.assignee === member)"
              :key="t.name"
              class="member-task"
            >
              <span class="mt-icon">{{ statusIcon(t.status) }}</span>
              <span class="mt-name">{{ t.name }}</span>
            </div>
            <div v-if="teamTasks.filter(t => t.assignee.includes(member) || t.assignee === member).length === 0" class="member-empty">
              暂无独立任务
            </div>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<style scoped>
.progress-page { max-width: 900px; margin: 0 auto; padding: 0 var(--space-md); }

.page-header { margin-bottom: var(--space-xl); }
.page-header h1 { font-size: 1.4rem; color: var(--color-primary-dark); }
.page-title-en { font-family: var(--font-sans); font-size: 0.8rem; color: var(--color-text-secondary); letter-spacing: 1px; }
.page-header p { font-family: var(--font-sans); font-size: 0.85rem; color: var(--color-text-secondary); margin-top: var(--space-xs); }

.section { margin-bottom: var(--space-2xl); }
.section-title {
  font-size: 1.1rem; color: var(--color-primary-dark);
  border-bottom: 1px solid var(--color-border); padding-bottom: var(--space-xs);
  margin-bottom: var(--space-md);
}

.section-header {
  display: flex; align-items: center; justify-content: space-between;
  flex-wrap: wrap; gap: var(--space-sm); margin-bottom: var(--space-md);
}
.section-header .section-title { margin-bottom: 0; border-bottom: none; padding-bottom: 0; }

/* ===== 统计 ===== */
.stats-grid {
  display: grid; grid-template-columns: repeat(auto-fill, minmax(130px, 1fr));
  gap: var(--space-sm); margin-bottom: var(--space-md);
}
.stat-card {
  background: var(--color-bg-card); border-radius: var(--radius-md);
  padding: var(--space-md); text-align: center; box-shadow: var(--shadow-sm);
}
.stat-value { display: block; font-size: 1.3rem; font-weight: 700; color: var(--color-primary); }
.stat-label { display: block; font-size: 0.75rem; color: var(--color-text-secondary); margin-top: var(--space-xs); }
.stat-card.contacted .stat-value { color: #10B981; }
.stat-card.unreached .stat-value { color: #F59E0B; }
.stat-card.rejected .stat-value { color: #EF4444; }
.stat-card.interviewed .stat-value { color: #3B82F6; }
.stat-card.progress .stat-value { color: #8B5CF6; }

/* ===== 筛选 ===== */
.filter-bar { display: flex; gap: var(--space-xs); }
.filter-btn {
  padding: var(--space-xs) var(--space-sm); font-family: var(--font-sans);
  font-size: 0.8rem; border: 1px solid var(--color-border);
  border-radius: var(--radius-sm); background: var(--color-bg-card);
  cursor: pointer; transition: all var(--transition-fast);
}
.filter-btn.active {
  background: var(--color-primary); color: #fff; border-color: var(--color-primary);
}
.filter-btn:hover:not(.active) { border-color: var(--color-gold); }

/* ===== 教授卡片 ===== */
.prof-card {
  background: var(--color-bg-card); border-radius: var(--radius-md);
  margin-bottom: var(--space-sm); box-shadow: var(--shadow-sm);
  overflow: hidden; cursor: pointer; transition: box-shadow var(--transition-fast);
}
.prof-card:hover { box-shadow: var(--shadow-md); }

.prof-header {
  display: flex; align-items: center; gap: var(--space-sm);
  padding: var(--space-sm) var(--space-md); flex-wrap: wrap;
}
.prof-id { color: var(--color-text-secondary); font-size: 0.8rem; min-width: 28px; font-family: monospace; }
.prof-name { font-weight: 600; flex: 1; }
.prof-badge {
  font-size: 0.7rem; padding: 1px 8px; border-radius: var(--radius-sm);
  color: #fff; font-weight: 600;
}
.prof-time { font-family: var(--font-sans); font-size: 0.8rem; color: var(--color-text-secondary); }
.prof-place { font-family: var(--font-sans); font-size: 0.8rem; color: var(--color-text-secondary); }
.prof-toggle { color: var(--color-text-secondary); font-size: 0.7rem; }
.prof-note {
  padding: 0 var(--space-md) var(--space-sm); font-family: var(--font-sans);
  font-size: 0.8rem; color: var(--color-text-secondary);
}

/* ===== 任务列表 ===== */
.prof-tasks { border-top: 1px solid var(--color-border); }
.task-row {
  display: flex; align-items: center; gap: var(--space-sm);
  padding: var(--space-xs) var(--space-md);
  font-family: var(--font-sans); font-size: 0.85rem;
}
.task-row.empty { opacity: 0.3; }
.task-icon { width: 20px; text-align: center; font-size: 0.8rem; }
.task-name { flex: 1; }
.task-status { font-weight: 500; min-width: 60px; font-size: 0.8rem; }
.task-assignee { color: var(--color-text-secondary); font-size: 0.8rem; text-align: right; }

.empty-state { font-family: var(--font-sans); font-size: 0.85rem; color: var(--color-text-secondary); text-align: center; padding: var(--space-xl); }

/* ===== 团队任务总览 ===== */
.task-summary-grid {
  background: var(--color-bg-card); border-radius: var(--radius-md);
  overflow: hidden; box-shadow: var(--shadow-sm);
}
.task-summary-row {
  display: flex; align-items: center; gap: var(--space-sm);
  padding: var(--space-xs) var(--space-md);
  border-bottom: 1px solid var(--color-border);
  font-family: var(--font-sans); font-size: 0.85rem;
}
.task-summary-row:last-child { border-bottom: none; }
.ts-icon { width: 20px; text-align: center; font-size: 0.8rem; }
.ts-name { flex: 1; }
.ts-status { font-weight: 500; min-width: 60px; font-size: 0.8rem; }
.ts-assignee { color: var(--color-text-secondary); font-size: 0.8rem; min-width: 80px; text-align: right; }

/* ===== 成员分布 ===== */
.member-grid {
  display: grid; grid-template-columns: repeat(auto-fill, minmax(240px, 1fr));
  gap: var(--space-sm);
}
.member-card {
  background: var(--color-bg-card); border-radius: var(--radius-md);
  padding: var(--space-md); box-shadow: var(--shadow-sm);
}
.member-name { font-weight: 600; margin-bottom: var(--space-sm); color: var(--color-primary-dark); }
.member-task {
  display: flex; align-items: center; gap: var(--space-xs);
  padding: var(--space-xs) 0; font-family: var(--font-sans); font-size: 0.8rem;
}
.mt-icon { font-size: 0.75rem; width: 16px; text-align: center; }
.mt-name { flex: 1; }
.member-empty { font-family: var(--font-sans); font-size: 0.8rem; color: var(--color-text-secondary); }
</style>
