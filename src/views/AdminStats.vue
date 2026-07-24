<script setup lang="ts">
import { ref, onMounted, computed } from 'vue'
import { activities } from '@/data/activities'
import { mediaItems } from '@/data/media'
import { archiveItems } from '@/data/archive'
import { oralHistoryItems } from '@/data/oralHistory'
import { mapPoints } from '@/data/map'
import { culturalProducts } from '@/data/culturalProducts'
import { pushArticles } from '@/data/pushArticles'
import { siteConfig } from '@/data/site'
import router from '@/router'

// ──── 访问鉴权 ────
const accessKey = 'jmxm2026'
const authed = ref(false)
const keyInput = ref('')

function checkAccess() {
  const hash = window.location.hash
  const params = new URLSearchParams(hash.includes('?') ? hash.split('?')[1] : '')
  if (params.get('key') === accessKey) {
    authed.value = true
    const cleanHash = hash.split('?')[0]
    history.replaceState(null, '', cleanHash)
  }
}

function submitKey() {
  if (keyInput.value === accessKey) authed.value = true
}

// ──── 构建信息 ────
const buildDate = new Date().toISOString().split('T')[0]

// ──── 内容模块 ────
const modules = computed(() => [
  { label: '实践动态', icon: '📰', count: activities.length, data: activities, key: 'title', empty: activities.length === 0 },
  { label: '影像资料', icon: '🎬', count: mediaItems.length, data: mediaItems, key: 'title', empty: mediaItems.length === 0 },
  { label: '数字档案', icon: '📄', count: archiveItems.length, data: archiveItems, key: 'title', empty: archiveItems.length === 0 },
  { label: '口述史条目', icon: '🎙️', count: oralHistoryItems.length, data: oralHistoryItems, key: 'title', empty: oralHistoryItems.length === 0 },
  { label: '地图点位', icon: '📍', count: mapPoints.length, data: mapPoints, key: 'name', empty: mapPoints.length === 0 },
  { label: '文创产品', icon: '🎨', count: culturalProducts.length, data: culturalProducts, key: 'name', empty: culturalProducts.length === 0 },
  { label: '推送文章', icon: '📝', count: pushArticles.length, data: pushArticles, key: 'title', empty: pushArticles.length === 0 },
])

const totalModules = computed(() => modules.value.length)
const filledModules = computed(() => modules.value.filter(m => !m.empty).length)

// ──── GitHub ────
const repoData = ref<any>(null)
const actionsData = ref<any>(null)
const loadError = ref('')

// ──── 路由一览 ────
interface RouteInfo {
  path: string
  name: string
  title: string
  titleEn: string
}

const routeList = computed<RouteInfo[]>(() => {
  return router.getRoutes()
    .filter(r => r.name && typeof r.name === 'string')
    .map(r => ({
      path: r.path,
      name: r.name as string,
      title: (r.meta?.title as string) || r.name as string,
      titleEn: (r.meta?.titleEn as string) || '',
    }))
    .sort((a, b) => {
      const order = ['home', 'about', 'activity', 'media', 'archive', 'oralHistory', 'map', 'culturalProducts', 'panorama', 'pushArticles', 'pushArticleDetail', 'contact', 'admin']
      return order.indexOf(a.name) - order.indexOf(b.name)
    })
})

// ──── 图片资源统计 ────
const imageStats = computed(() => {
  const pushTotal = pushArticles.reduce((sum, a) => sum + a.chunks, 0)
  return { pushTotal }
})

// ──── 页面内容概览（展开/收起） ────
const expandedSections = ref<Record<string, boolean>>({})
function copyRepoUrl() {
  navigator.clipboard.writeText('https://github.com/ottoapocalypse-beep/jinmen-xunmai')
}

function toggleSection(key: string) {
  expandedSections.value[key] = !expandedSections.value[key]
}

// ──── 初始化 ────
onMounted(async () => {
  checkAccess()

  // GitHub 仓库 + Actions 信息
  try {
    const [repoRes, actionsRes] = await Promise.all([
      fetch('https://api.github.com/repos/ottoapocalypse-beep/jinmen-xunmai'),
      fetch('https://api.github.com/repos/ottoapocalypse-beep/jinmen-xunmai/actions/runs?per_page=1&status=completed'),
    ])
    if (repoRes.ok) repoData.value = await repoRes.json()
    else loadError.value = `GitHub API 返回 ${repoRes.status}`
    if (actionsRes.ok) {
      const json = await actionsRes.json()
      actionsData.value = json
    }
  } catch (e: any) {
    loadError.value = e.message
  }
})
</script>

<template>
  <div class="admin-page">
    <!-- ════ 鉴权 ════ -->
    <div v-if="!authed" class="auth-gate">
      <div class="auth-box">
        <h1 class="auth-title">⚙️ 管理面板</h1>
        <p class="auth-desc">请输入访问密钥</p>
        <input
          v-model="keyInput"
          type="password"
          class="auth-input"
          placeholder="输入密钥"
          @keyup.enter="submitKey"
        />
        <button class="auth-btn" @click="submitKey">确认</button>
      </div>
    </div>

    <!-- ════ 管理内容 ════ -->
    <template v-else>
      <div class="page-header">
        <h1>⚙️ 站点管理</h1>
        <div class="page-title-en">Admin Panel</div>
        <p>此页面无公开入口，仅管理员可见</p>
      </div>

      <!-- ──── 1. GitHub 仓库 & Actions ──── -->
      <section class="section">
        <h2 class="section-title">📦 GitHub 仓库 & 部署状态</h2>
        <div v-if="repoData" class="stats-grid">
          <div class="stat-card">
            <span class="stat-value">{{ repoData.stargazers_count }}</span>
            <span class="stat-label">⭐ Star</span>
          </div>
          <div class="stat-card">
            <span class="stat-value">{{ repoData.forks_count }}</span>
            <span class="stat-label">🍴 Fork</span>
          </div>
          <div class="stat-card">
            <span class="stat-value">{{ repoData.open_issues_count }}</span>
            <span class="stat-label">❗ Issues</span>
          </div>
          <div class="stat-card">
            <span class="stat-value">{{ repoData.subscribers_count }}</span>
            <span class="stat-label">👁️ Watchers</span>
          </div>
          <div class="stat-card">
            <span class="stat-value">{{ (repoData.size / 1024).toFixed(1) }} MB</span>
            <span class="stat-label">📦 仓库大小</span>
          </div>
          <div class="stat-card">
            <span class="stat-value">{{ new Date(repoData.updated_at).toLocaleDateString('zh-CN') }}</span>
            <span class="stat-label">🔄 最后更新</span>
          </div>
        </div>

        <!-- Actions 最近一次部署 -->
        <div v-if="actionsData?.workflow_runs?.length" class="actions-info">
          <div class="actions-head">最近一次 GitHub Actions 部署</div>
          <div class="actions-row">
            <span class="actions-label">状态</span>
            <span :class="['actions-badge', actionsData.workflow_runs[0].conclusion]">
              {{ actionsData.workflow_runs[0].conclusion === 'success' ? '✅ 成功' : '❌ 失败' }}
            </span>
          </div>
          <div class="actions-row">
            <span class="actions-label">分支</span>
            <span>{{ actionsData.workflow_runs[0].head_branch }}</span>
          </div>
          <div class="actions-row">
            <span class="actions-label">提交</span>
            <span class="actions-commit">{{ actionsData.workflow_runs[0].head_commit?.message?.slice(0, 60) }}</span>
          </div>
          <div class="actions-row">
            <span class="actions-label">时间</span>
            <span>{{ new Date(actionsData.workflow_runs[0].updated_at).toLocaleString('zh-CN') }}</span>
          </div>
          <div class="actions-row">
            <span class="actions-label">耗时</span>
            <span>{{ Math.round(actionsData.workflow_runs[0].run_duration_ms / 1000) }}秒</span>
          </div>
          <a :href="actionsData.workflow_runs[0].html_url" target="_blank" rel="noopener noreferrer" class="actions-link">
            查看详情 →
          </a>
        </div>

        <div v-else-if="loadError" class="info-text error">加载失败：{{ loadError }}</div>
        <div v-else class="info-text">加载中…</div>
      </section>

      <!-- ──── 2. 内容完整性检查 ──── -->
      <section class="section">
        <h2 class="section-title">🔍 内容完整性检查</h2>
        <div class="completeness-list">
          <div v-for="m in modules" :key="m.label" :class="['completeness-row', { empty: m.empty }]">
            <span class="completeness-icon">{{ m.empty ? '🔴' : '🟢' }}</span>
            <span class="completeness-label">{{ m.icon }} {{ m.label }}</span>
            <span class="completeness-count">{{ m.count }} 条</span>
            <span v-if="m.empty" class="completeness-tag">待填充</span>
          </div>
        </div>
        <div class="completeness-summary">
          📊 已填充 {{ filledModules }}/{{ totalModules }} 个模块
        </div>
      </section>

      <!-- ──── 3. 路由一览 ──── -->
      <section class="section">
        <h2 class="section-title">🧭 路由一览</h2>
        <div class="route-table">
          <div v-for="r in routeList" :key="r.path" :class="['route-row', { 'route-admin': r.name === 'admin' }]">
            <span class="route-path">{{ r.path || '/' }}</span>
            <span class="route-title">{{ r.title }}</span>
            <span class="route-en">{{ r.titleEn }}</span>
            <span class="route-name">{{ r.name }}</span>
          </div>
        </div>
      </section>

      <!-- ──── 4. 图片资源统计 ──── -->
      <section class="section">
        <h2 class="section-title">🖼️ 图片资源统计</h2>
        <div class="stats-grid">
          <div class="stat-card">
            <span class="stat-value">{{ imageStats.pushTotal }}</span>
            <span class="stat-label">推送文章切图</span>
          </div>
          <div class="stat-card">
            <span class="stat-value">{{ pushArticles.length }}</span>
            <span class="stat-label">推送文章数</span>
          </div>
        </div>
      </section>

      <!-- ──── 5. 各模块内容概览 ──── -->
      <section class="section">
        <h2 class="section-title">📋 内容概览</h2>
        <div v-for="m in modules" :key="m.label" class="overview-module">
          <div class="overview-header" @click="toggleSection(m.label)">
            <span class="overview-toggle">{{ expandedSections[m.label] ? '▼' : '▶' }}</span>
            <span class="overview-icon">{{ m.icon }}</span>
            <span class="overview-label">{{ m.label }}</span>
            <span class="overview-count">{{ m.count }} 条</span>
            <span v-if="m.empty" class="completeness-tag">待填充</span>
          </div>
          <div v-if="expandedSections[m.label] && !m.empty" class="overview-body">
            <div v-for="(item, idx) in (m.data as any[]).slice(0, 5)" :key="idx" class="overview-item">
              <span class="overview-idx">#{{ idx + 1 }}</span>
              <span class="overview-text">{{ item[m.key] || '(无标题)' }}</span>
            </div>
            <div v-if="m.count > 5" class="overview-more">… 还有 {{ m.count - 5 }} 条</div>
          </div>
          <div v-if="expandedSections[m.label] && m.empty" class="overview-body">
            <div class="overview-empty">暂无数据，等待填充</div>
          </div>
        </div>
      </section>

      <!-- ──── 6. 站点信息 ──── -->
      <section class="section">
        <h2 class="section-title">ℹ️ 站点信息</h2>
        <div class="info-card">
          <p><strong>站点名称：</strong>{{ siteConfig.title }}</p>
          <p><strong>团队：</strong>{{ siteConfig.teamFull }}</p>
          <p><strong>年份：</strong>{{ siteConfig.year }}</p>
          <p><strong>框架：</strong>Vue 3 + TypeScript + Vite</p>
          <p><strong>部署：</strong>GitHub Pages + Actions</p>
          <p><strong>构建时间：</strong>{{ buildDate }}</p>
          <p><strong>仓库：</strong>
            <a href="https://github.com/ottoapocalypse-beep/jinmen-xunmai" target="_blank" rel="noopener noreferrer">
              ottoapocalypse-beep/jinmen-xunmai
            </a>
          </p>
        </div>
        <button class="copy-btn" @click="copyRepoUrl">
          📋 复制仓库地址
        </button>
      </section>

      <!-- ──── 快捷入口 ──── -->
      <section class="section">
        <h2 class="section-title">🔗 快捷入口</h2>
        <div class="quick-links">
          <a href="#/progress" class="quick-link">
            <span class="ql-icon">📋</span>
            <span class="ql-text">采访进度看板</span>
            <span class="ql-arrow">→</span>
          </a>
          <a href="#/admin" class="quick-link">
            <span class="ql-icon">⚙️</span>
            <span class="ql-text">管理面板（当前）</span>
            <span class="ql-arrow">→</span>
          </a>
        </div>
      </section>

      <!-- ──── 8. 站点地图 ──── -->
      <section class="section">
        <h2 class="section-title">🗺️ 站点地图</h2>
        <div class="sitemap-tree">
          <div class="tree-node root">📂 jinmen-xunmai</div>
          <div v-for="r in routeList.filter(r => r.name !== 'admin' && r.name !== 'pushArticleDetail')" :key="r.path" class="tree-node page">
            <span class="tree-pipe">├──</span>
            <span class="tree-icon">{{ r.path === '/' ? '🏠' : '📄' }}</span>
            <span class="tree-label">{{ r.title }}</span>
            <span class="tree-path">{{ r.path }}</span>
          </div>
          <div class="tree-node page">
            <span class="tree-pipe">├──</span>
            <span class="tree-icon">📝</span>
            <span class="tree-label">文章详情</span>
            <span class="tree-path">/push-articles/:id</span>
          </div>
          <div class="tree-node page admin-node">
            <span class="tree-pipe">└──</span>
            <span class="tree-icon">⚙️</span>
            <span class="tree-label">站点管理</span>
            <span class="tree-path">/admin（隐藏）</span>
          </div>
        </div>
      </section>
    </template>
  </div>
</template>

<style scoped>
.admin-page { max-width: 820px; margin: 0 auto; padding: 0 var(--space-md); }

/* ===== 鉴权门 ===== */
.auth-gate {
  display: flex; align-items: center; justify-content: center; min-height: 60vh;
}
.auth-box {
  text-align: center; padding: var(--space-2xl);
  background: var(--color-bg-card); border-radius: var(--radius-lg);
  box-shadow: var(--shadow-md); max-width: 360px; width: 100%;
}
.auth-title { font-size: 1.3rem; color: var(--color-primary-dark); margin-bottom: var(--space-sm); }
.auth-desc { font-family: var(--font-sans); font-size: 0.85rem; color: var(--color-text-secondary); margin-bottom: var(--space-lg); }
.auth-input {
  width: 100%; padding: var(--space-sm) var(--space-md);
  border: 1px solid var(--color-border); border-radius: var(--radius-md);
  font-family: var(--font-sans); font-size: 0.9rem; text-align: center;
  outline: none; transition: border-color var(--transition-fast); box-sizing: border-box;
}
.auth-input:focus { border-color: var(--color-gold); }
.auth-btn {
  margin-top: var(--space-md); width: 100%; padding: var(--space-sm) var(--space-md);
  background: var(--color-primary); color: #fff; border: none;
  border-radius: var(--radius-md); font-size: 0.9rem; cursor: pointer;
  transition: opacity var(--transition-fast);
}
.auth-btn:hover { opacity: 0.85; }

/* ===== 通用 ===== */
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

.stats-grid {
  display: grid; grid-template-columns: repeat(auto-fill, minmax(130px, 1fr));
  gap: var(--space-sm);
}
.stat-card {
  background: var(--color-bg-card); border-radius: var(--radius-md);
  padding: var(--space-md); text-align: center; box-shadow: var(--shadow-sm);
}
.stat-value { display: block; font-size: 1.3rem; font-weight: 700; color: var(--color-primary); }
.stat-label { display: block; font-size: 0.75rem; color: var(--color-text-secondary); margin-top: var(--space-xs); }

.info-text { font-family: var(--font-sans); font-size: 0.85rem; color: var(--color-text-secondary); }
.info-text.error { color: var(--color-danger); }

/* ===== Actions ===== */
.actions-info {
  margin-top: var(--space-md); background: var(--color-bg-card);
  border-radius: var(--radius-md); padding: var(--space-md); box-shadow: var(--shadow-sm);
}
.actions-head { font-weight: 600; margin-bottom: var(--space-sm); color: var(--color-primary-dark); }
.actions-row {
  display: flex; gap: var(--space-sm); margin-bottom: var(--space-xs);
  font-family: var(--font-sans); font-size: 0.85rem;
}
.actions-label { color: var(--color-text-secondary); min-width: 48px; }
.actions-badge {
  padding: 1px 8px; border-radius: var(--radius-sm); font-weight: 600; font-size: 0.8rem;
}
.actions-badge.success { background: #dcfce7; color: #166534; }
.actions-badge.failure { background: #fce4ec; color: #b71c1c; }
.actions-commit { max-width: 300px; overflow: hidden; text-overflow: ellipsis; white-space: nowrap; display: inline-block; }
.actions-link { display: inline-block; margin-top: var(--space-sm); font-size: 0.85rem; color: var(--color-primary); }

/* ===== 内容完整性 ===== */
.completeness-list { background: var(--color-bg-card); border-radius: var(--radius-md); overflow: hidden; box-shadow: var(--shadow-sm); }
.completeness-row {
  display: flex; align-items: center; gap: var(--space-sm);
  padding: var(--space-sm) var(--space-md);
  border-bottom: 1px solid var(--color-border);
  font-family: var(--font-sans); font-size: 0.9rem;
}
.completeness-row:last-child { border-bottom: none; }
.completeness-row.empty { background: rgba(220, 38, 38, 0.04); }
.completeness-icon { width: 20px; text-align: center; }
.completeness-label { flex: 1; }
.completeness-count { color: var(--color-text-secondary); font-size: 0.8rem; min-width: 40px; text-align: right; }
.completeness-tag {
  font-size: 0.7rem; padding: 1px 8px; border-radius: var(--radius-sm);
  background: #fce4ec; color: #b71c1c; font-weight: 600;
}
.completeness-summary { margin-top: var(--space-sm); font-family: var(--font-sans); font-size: 0.85rem; color: var(--color-text-secondary); }

/* ===== 路由 ===== */
.route-table { background: var(--color-bg-card); border-radius: var(--radius-md); overflow: hidden; box-shadow: var(--shadow-sm); }
.route-row {
  display: flex; align-items: center; gap: var(--space-sm);
  padding: var(--space-xs) var(--space-md);
  border-bottom: 1px solid var(--color-border);
  font-family: var(--font-sans); font-size: 0.85rem;
}
.route-row:last-child { border-bottom: none; }
.route-admin { opacity: 0.5; }
.route-path { font-family: monospace; min-width: 140px; color: var(--color-primary); }
.route-title { flex: 1; }
.route-en { color: var(--color-text-secondary); font-size: 0.75rem; min-width: 80px; }
.route-name { color: var(--color-text-secondary); font-size: 0.75rem; font-family: monospace; min-width: 80px; text-align: right; }

/* ===== 内容概览 ===== */
.overview-module {
  background: var(--color-bg-card); border-radius: var(--radius-md);
  margin-bottom: var(--space-sm); overflow: hidden; box-shadow: var(--shadow-sm);
}
.overview-header {
  display: flex; align-items: center; gap: var(--space-sm);
  padding: var(--space-sm) var(--space-md); cursor: pointer;
  font-family: var(--font-sans); font-size: 0.9rem;
  transition: background var(--transition-fast); user-select: none;
}
.overview-header:hover { background: rgba(0,0,0,0.02); }
.overview-toggle { width: 16px; color: var(--color-text-secondary); font-size: 0.7rem; }
.overview-icon { width: 20px; text-align: center; }
.overview-label { flex: 1; font-weight: 500; }
.overview-count { color: var(--color-text-secondary); font-size: 0.8rem; }
.overview-body { border-top: 1px solid var(--color-border); padding: var(--space-sm) var(--space-md); }
.overview-item {
  padding: var(--space-xs) 0; font-family: var(--font-sans); font-size: 0.85rem;
  display: flex; gap: var(--space-sm);
}
.overview-idx { color: var(--color-text-secondary); font-size: 0.75rem; min-width: 24px; }
.overview-text { flex: 1; overflow: hidden; text-overflow: ellipsis; white-space: nowrap; }
.overview-more { font-family: var(--font-sans); font-size: 0.8rem; color: var(--color-text-secondary); padding: var(--space-xs) 0; }
.overview-empty { font-family: var(--font-sans); font-size: 0.85rem; color: var(--color-text-secondary); padding: var(--space-xs) 0; }

/* ===== 站点信息 ===== */
.info-card {
  background: var(--color-bg-card); border-radius: var(--radius-md);
  padding: var(--space-md) var(--space-lg); box-shadow: var(--shadow-sm);
}
.info-card p { font-family: var(--font-sans); font-size: 0.85rem; margin-bottom: var(--space-xs); }
.info-card a { color: var(--color-primary); text-decoration: underline; }

.copy-btn {
  margin-top: var(--space-sm); padding: var(--space-xs) var(--space-md);
  background: var(--color-bg-card); border: 1px solid var(--color-border);
  border-radius: var(--radius-md); font-family: var(--font-sans); font-size: 0.85rem;
  cursor: pointer; transition: all var(--transition-fast);
}
.copy-btn:hover { border-color: var(--color-gold); color: var(--color-gold); }

/* ===== 站点地图 ===== */
.sitemap-tree {
  background: var(--color-bg-card); border-radius: var(--radius-md);
  padding: var(--space-md) var(--space-lg); box-shadow: var(--shadow-sm);
  font-family: var(--font-sans);
}
.tree-node { font-size: 0.85rem; padding: var(--space-xs) 0; }
.tree-node.root { font-weight: 700; color: var(--color-primary-dark); margin-bottom: var(--space-xs); }
.tree-node.page { padding-left: var(--space-lg); }
.tree-pipe { color: var(--color-text-secondary); margin-right: var(--space-xs); }
.tree-icon { margin-right: var(--space-xs); }
.tree-label { margin-right: var(--space-sm); }
.tree-path { color: var(--color-text-secondary); font-size: 0.8rem; font-family: monospace; }
.admin-node { opacity: 0.5; }

/* ===== 快捷入口 ===== */
.quick-links { display: flex; flex-direction: column; gap: var(--space-sm); }
.quick-link {
  display: flex; align-items: center; gap: var(--space-sm);
  padding: var(--space-md); background: var(--color-bg-card);
  border-radius: var(--radius-md); box-shadow: var(--shadow-sm);
  text-decoration: none; color: inherit;
  transition: all var(--transition-fast);
}
.quick-link:hover { box-shadow: var(--shadow-md); transform: translateX(4px); }
.ql-icon { font-size: 1.2rem; }
.ql-text { flex: 1; font-weight: 500; }
.ql-arrow { color: var(--color-text-secondary); font-size: 1.1rem; }
</style>
