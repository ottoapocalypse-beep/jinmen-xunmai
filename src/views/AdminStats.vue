<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { activities } from '@/data/activities'
import { mediaItems } from '@/data/media'
import { archiveItems } from '@/data/archive'
import { oralHistoryItems } from '@/data/oralHistory'
import { mapPoints } from '@/data/map'
import { culturalProducts } from '@/data/culturalProducts'
import { pushArticles } from '@/data/pushArticles'
import { siteConfig } from '@/data/site'

const router = useRouter()

// 简单访问鉴权：URL hash 参数需匹配
const accessKey = 'jmxm2026'
const authed = ref(false)
const keyInput = ref('')

function checkAccess() {
  const hash = window.location.hash
  const params = new URLSearchParams(hash.includes('?') ? hash.split('?')[1] : '')
  if (params.get('key') === accessKey) {
    authed.value = true
    // 清除 URL 中的 key
    const cleanHash = hash.split('?')[0]
    history.replaceState(null, '', cleanHash)
  }
}

function submitKey() {
  if (keyInput.value === accessKey) {
    authed.value = true
  }
}

onMounted(checkAccess)

const repoData = ref<any>(null)
const localVisits = ref(0)
const loadError = ref('')
const buildDate = new Date().toISOString().split('T')[0]

onMounted(async () => {
  // 本地访问计数
  let count = parseInt(localStorage.getItem('jmxm_visits') || '0', 10)
  count++
  localStorage.setItem('jmxm_visits', String(count))
  localVisits.value = count

  // 获取 GitHub 仓库信息
  try {
    const res = await fetch('https://api.github.com/repos/ottoapocalypse-beep/jinmen-xunmai')
    if (res.ok) {
      repoData.value = await res.json()
    } else {
      loadError.value = `GitHub API 返回 ${res.status}`
    }
  } catch (e: any) {
    loadError.value = e.message
  }
})

const contentStats = [
  { label: '实践动态', count: activities.length },
  { label: '影像资料', count: mediaItems.length },
  { label: '数字档案', count: archiveItems.length },
  { label: '口述史条目', count: oralHistoryItems.length },
  { label: '地图点位', count: mapPoints.length },
  { label: '文创产品', count: culturalProducts.length },
  { label: '推送文章', count: pushArticles.length },
]
</script>

<template>
  <div class="admin-page">
    <!-- 访问鉴权 -->
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

    <!-- 管理内容 -->
    <template v-else>
    <div class="page-header">
      <h1>⚙️ 站点管理</h1>
      <div class="page-title-en">Admin Panel</div>
      <p>此页面无公开入口，仅管理员可见</p>
    </div>

    <!-- GitHub 仓库信息 -->
    <section class="section">
      <h2 class="section-title">GitHub 仓库</h2>
      <div v-if="repoData" class="stats-grid">
        <div class="stat-card">
          <span class="stat-value">{{ repoData.stargazers_count }}</span>
          <span class="stat-label">Star</span>
        </div>
        <div class="stat-card">
          <span class="stat-value">{{ repoData.forks_count }}</span>
          <span class="stat-label">Fork</span>
        </div>
        <div class="stat-card">
          <span class="stat-value">{{ repoData.open_issues_count }}</span>
          <span class="stat-label">Issues</span>
        </div>
        <div class="stat-card">
          <span class="stat-value">{{ repoData.subscribers_count }}</span>
          <span class="stat-label">Watchers</span>
        </div>
        <div class="stat-card">
          <span class="stat-value">{{ repoData.size }} KB</span>
          <span class="stat-label">仓库大小</span>
        </div>
        <div class="stat-card">
          <span class="stat-value">{{ new Date(repoData.updated_at).toLocaleDateString('zh-CN') }}</span>
          <span class="stat-label">最后更新</span>
        </div>
      </div>
      <div v-else-if="loadError" class="info-text error">加载失败：{{ loadError }}</div>
      <div v-else class="info-text">加载中…</div>
    </section>

    <!-- 内容统计 -->
    <section class="section">
      <h2 class="section-title">内容统计</h2>
      <div class="stats-grid">
        <div v-for="s in contentStats" :key="s.label" class="stat-card">
          <span class="stat-value">{{ s.count }}</span>
          <span class="stat-label">{{ s.label }}</span>
        </div>
      </div>
    </section>

    <!-- 本地访问 -->
    <section class="section">
      <h2 class="section-title">访问信息</h2>
      <div class="stats-grid">
        <div class="stat-card">
          <span class="stat-value">{{ localVisits }}</span>
          <span class="stat-label">本机访问次数</span>
        </div>
        <div class="stat-card">
          <span class="stat-value">{{ buildDate }}</span>
          <span class="stat-label">构建时间</span>
        </div>
      </div>
      <p class="info-text" style="margin-top: var(--space-md);">
        注：本机访问次数仅记录当前浏览器的访问量，非全局统计。
        全局访问量需接入外部统计服务。
      </p>
    </section>

    <!-- 站点信息 -->
    <section class="section">
      <h2 class="section-title">站点信息</h2>
      <div class="info-card">
        <p><strong>站点名称：</strong>{{ siteConfig.title }}</p>
        <p><strong>团队：</strong>{{ siteConfig.teamFull }}</p>
        <p><strong>年份：</strong>{{ siteConfig.year }}</p>
        <p><strong>框架：</strong>Vue 3 + TypeScript + Vite</p>
        <p><strong>部署：</strong>GitHub Pages + Actions</p>
        <p><strong>仓库：</strong>
          <a :href="`https://github.com/ottoapocalypse-beep/jinmen-xunmai`" target="_blank" rel="noopener noreferrer">
            ottoapocalypse-beep/jinmen-xunmai
          </a>
        </p>
      </div>
    </section>
  </template>
  </div>
</template>

<style scoped>
.admin-page { max-width: 800px; margin: 0 auto; }

/* ===== 鉴权门 ===== */
.auth-gate {
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 60vh;
}

.auth-box {
  text-align: center;
  padding: var(--space-2xl);
  background: var(--color-bg-card);
  border-radius: var(--radius-lg);
  box-shadow: var(--shadow-md);
  max-width: 360px;
  width: 100%;
}

.auth-title {
  font-size: 1.3rem;
  color: var(--color-primary-dark);
  margin-bottom: var(--space-sm);
}

.auth-desc {
  font-family: var(--font-sans);
  font-size: 0.85rem;
  color: var(--color-text-secondary);
  margin-bottom: var(--space-lg);
}

.auth-input {
  width: 100%;
  padding: var(--space-sm) var(--space-md);
  border: 1px solid var(--color-border);
  border-radius: var(--radius-md);
  font-family: var(--font-sans);
  font-size: 0.9rem;
  text-align: center;
  outline: none;
  transition: border-color var(--transition-fast);
  box-sizing: border-box;
}

.auth-input:focus { border-color: var(--color-gold); }

.auth-btn {
  margin-top: var(--space-md);
  padding: var(--space-sm) var(--space-xl);
  font-family: var(--font-sans);
  font-size: 0.85rem;
  font-weight: 500;
  background: var(--color-primary);
  color: #fff;
  border: none;
  border-radius: var(--radius-md);
  cursor: pointer;
  transition: background var(--transition-fast);
}

.auth-btn:hover { background: var(--color-primary-light); }

.section { margin-bottom: var(--space-2xl); }

.section-title {
  font-size: 1.1rem;
  color: var(--color-primary-dark);
  margin-bottom: var(--space-md);
  padding-left: var(--space-md);
  border-left: 3px solid var(--color-gold);
}

.stats-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(130px, 1fr));
  gap: var(--space-sm);
}

.stat-card {
  background: var(--color-bg-card);
  border-radius: var(--radius-md);
  padding: var(--space-md);
  text-align: center;
  box-shadow: var(--shadow-sm);
}

.stat-value {
  display: block;
  font-size: 1.5rem;
  font-weight: 700;
  color: var(--color-primary);
  font-variant-numeric: tabular-nums;
}

.stat-label {
  display: block;
  font-family: var(--font-sans);
  font-size: 0.7rem;
  color: var(--color-text-light);
  margin-top: 2px;
}

.info-card {
  background: var(--color-bg-card);
  border-radius: var(--radius-md);
  padding: var(--space-lg);
  box-shadow: var(--shadow-sm);
  font-family: var(--font-sans);
  font-size: 0.85rem;
  line-height: 2;
  color: var(--color-text-secondary);
}

.info-card a { color: var(--color-primary); text-decoration: none; }
.info-card a:hover { text-decoration: underline; }
.info-card strong { color: var(--color-text); }

.info-text {
  font-family: var(--font-sans);
  font-size: 0.8rem;
  color: var(--color-text-light);
}

.info-text.error { color: #c0392b; }

@media (max-width: 640px) {
  .stats-grid { grid-template-columns: repeat(3, 1fr); }
  .stat-value { font-size: 1.2rem; }
}
</style>