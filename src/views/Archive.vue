<script setup lang="ts">
import { ref, computed, onMounted, onUnmounted } from 'vue'
import { useRoute } from 'vue-router'
import { archiveItems } from '@/data/archive'
import { nodes as kgNodes, edges as kgEdges, nodeColors } from '@/data/knowledgeGraph'
import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'

const route = useRoute()

// ──── 列表模式 ────
const searchQuery = ref('')
const activeCategory = ref<string>('all')

const categories = [
  { key: 'all', label: '全部' },
  { key: 'institution', label: '机构' },
  { key: 'event', label: '事件' },
  { key: 'person', label: '人物' },
  { key: 'concept', label: '概念' },
  { key: 'document', label: '文件' },
  { key: 'photo', label: '老照片' },
  { key: 'manuscript', label: '手稿' },
  { key: 'other', label: '其他' },
]

onMounted(() => {
  if (route.query.search) searchQuery.value = route.query.search as string
  if (route.query.category && categories.some(c => c.key === route.query.category)) {
    activeCategory.value = route.query.category as string
  }
})

const filteredItems = computed(() => {
  return archiveItems.filter(item => {
    const matchCategory = activeCategory.value === 'all' || item.category === activeCategory.value
    const matchSearch = !searchQuery.value
      || item.title.includes(searchQuery.value)
      || item.description.includes(searchQuery.value)
    return matchCategory && matchSearch
  })
})

// ──── 图谱模式 ────
const viewMode = ref<'list' | 'graph'>('list')
const containerRef = ref<HTMLElement | null>(null)
const selectedNode = ref<{ id: string; label: string; type: string } | null>(null)
const detailInfo = ref<{ label: string; type: string; id: string; related: string[] } | null>(null)

// 图谱关联 → 数据库条目映射
const nodeToArchive: Record<string, { title: string; link: string }[]> = {
  tju: [{ title: '天津大学校史（百度百科）', link: 'https://baike.baidu.com/item/%E5%A4%A9%E6%B4%A5%E5%A4%A7%E5%AD%A6' }],
  ustb: [{ title: '北京科技大学校史（百度百科）', link: 'https://baike.baidu.com/item/%E5%8C%97%E4%BA%AC%E7%A7%91%E6%8A%80%E5%A4%A7%E5%AD%A6' }],
  adjustment: [{ title: '1952年院系调整（百度百科）', link: 'https://baike.baidu.com/item/1952%E5%B9%B4%E9%99%A2%E7%B3%BB%E8%B0%83%E6%95%B4' }],
  jinmen: [{ title: '关于实践 →', link: '#/about' }],
  push: [{ title: '推送文集 →', link: '#/push-articles' }],
  archive: [{ title: '本页', link: '' }],
  museum: [{ title: '本页', link: '' }],
  casting: [{ title: '铸造学科（百度百科）', link: 'https://baike.baidu.com/item/%E9%93%B8%E9%80%A0' }],
  metallurgy: [{ title: '冶金工程（百度百科）', link: 'https://baike.baidu.com/item/%E5%86%B6%E9%87%91%E5%B7%A5%E7%A8%8B' }],
}

// Three.js 相关
let scene: THREE.Scene | null = null
let camera: THREE.PerspectiveCamera | null = null
let renderer: THREE.WebGLRenderer | null = null
let controls: OrbitControls | null = null
let animId: number | null = null
let nodeMeshes: THREE.Mesh[] = []
let edgeLines: THREE.Line[] = []

function getColor(type: string): number {
  return new THREE.Color(nodeColors[type] || '#6B7280').getHex()
}

function initGraph() {
  if (!containerRef.value) return
  const rect = containerRef.value.getBoundingClientRect()
  const w = rect.width
  const h = Math.max(450, rect.height || 500)

  scene = new THREE.Scene()
  scene.background = new THREE.Color(0x1a1a2e)

  camera = new THREE.PerspectiveCamera(45, w / h, 1, 2000)
  camera.position.set(280, 180, 360)
  camera.lookAt(0, 0, 0)

  renderer = new THREE.WebGLRenderer({ antialias: true })
  renderer.setSize(w, h)
  renderer.setPixelRatio(Math.min(devicePixelRatio, 2))
  containerRef.value.appendChild(renderer.domElement)

  controls = new OrbitControls(camera, renderer.domElement)
  controls.enableDamping = true
  controls.dampingFactor = 0.08
  controls.autoRotate = true
  controls.autoRotateSpeed = 0.6
  controls.minDistance = 100
  controls.maxDistance = 700
  controls.target.set(0, 0, 0)

  const ambient = new THREE.AmbientLight(0x404060, 0.6)
  scene.add(ambient)
  const dir = new THREE.DirectionalLight(0xffffff, 1.2)
  dir.position.set(200, 400, 300)
  scene.add(dir)

  // 星空
  const starsGeo = new THREE.BufferGeometry()
  const starPos = new Float32Array(3000)
  for (let i = 0; i < 3000; i++) starPos[i] = (Math.random() - 0.5) * 2000
  starsGeo.setAttribute('position', new THREE.BufferAttribute(starPos, 3))
  scene.add(new THREE.Points(starsGeo, new THREE.PointsMaterial({ color: 0xffffff, size: 0.6, transparent: true, opacity: 0.5 })))

  // 节点
  const count = kgNodes.length
  const radius = 170
  const positions: THREE.Vector3[] = []

  kgNodes.forEach((d, i) => {
    const phi = Math.acos(1 - 2 * (i + 0.5) / count)
    const theta = Math.PI * (1 + Math.sqrt(5)) * i
    const x = radius * Math.sin(phi) * Math.cos(theta)
    const y = radius * Math.sin(phi) * Math.sin(theta) * 0.6
    const z = radius * Math.cos(phi)
    positions.push(new THREE.Vector3(x, y, z))

    const color = getColor(d.type)
    const mat = new THREE.MeshPhysicalMaterial({
      color, metalness: 0.1, roughness: 0.3,
      emissive: color, emissiveIntensity: 0.08,
    })
    const sphere = new THREE.Mesh(new THREE.SphereGeometry(7, 20, 20), mat)
    sphere.position.set(x, y, z)
    sphere.userData = { id: d.id, label: d.label.replace('\\n', ' '), type: d.type }
    scene!.add(sphere)
    nodeMeshes.push(sphere)

    // 标签
    const canvas = document.createElement('canvas')
    canvas.width = 220; canvas.height = 100
    const ctx = canvas.getContext('2d')!
    ctx.fillStyle = 'rgba(0,0,0,0.55)'
    ctx.beginPath(); ctx.roundRect(6, 12, 208, 76, 10); ctx.fill()
    ctx.textAlign = 'center'; ctx.textBaseline = 'middle'
    ctx.fillStyle = '#fff'; ctx.font = 'bold 24px "Noto Serif SC", serif'
    const lines = d.label.split('\\n')
    lines.forEach((line, i) => ctx.fillText(line, 110, 50 + (i - (lines.length - 1) / 2) * 30))
    const tex = new THREE.CanvasTexture(canvas)
    tex.minFilter = THREE.LinearFilter
    const spriteMat = new THREE.SpriteMaterial({ map: tex, transparent: true, depthWrite: false })
    const sprite = new THREE.Sprite(spriteMat)
    sprite.scale.set(70, 32, 1)
    sprite.position.set(x, y - 16, z)
    scene!.add(sprite)
  })

  // 连线
  kgEdges.forEach(e => {
    const si = kgNodes.findIndex(n => n.id === e.source)
    const ti = kgNodes.findIndex(n => n.id === e.target)
    if (si < 0 || ti < 0) return
    const p1 = positions[si], p2 = positions[ti]
    if (!p1 || !p2) return
    const line = new THREE.Line(
      new THREE.BufferGeometry().setFromPoints([p1, p2]),
      new THREE.LineBasicMaterial({ color: 0xffffff, transparent: true, opacity: 0.12 })
    )
    scene!.add(line)
    edgeLines.push(line)
  })

  // 动画
  function animate() {
    animId = requestAnimationFrame(animate)
    controls!.update()
    renderer!.render(scene!, camera!)
  }
  animate()

  // 点击
  const raycaster = new THREE.Raycaster()
  const pointer = new THREE.Vector2()
  renderer.domElement.addEventListener('click', (event) => {
    const r = renderer!.domElement.getBoundingClientRect()
    pointer.x = ((event.clientX - r.left) / r.width) * 2 - 1
    pointer.y = -((event.clientY - r.top) / r.height) * 2 + 1
    raycaster.setFromCamera(pointer, camera!)
    const hits = raycaster.intersectObjects(nodeMeshes)
    if (hits.length > 0) {
      const data = hits[0].object.userData as { id: string; label: string; type: string }
      selectedNode.value = data
      controls!.autoRotate = false
      // 高亮
      nodeMeshes.forEach(m => {
        (m.material as THREE.MeshPhysicalMaterial).emissiveIntensity = m.userData.id === data.id ? 0.6 : 0.05
      })
      // 查关联
      const related: string[] = []
      kgEdges.forEach(e => {
        if (e.source === data.id) { const n = kgNodes.find(n => n.id === e.target); if (n) related.push(n.label.replace('\\n', ' ')) }
        if (e.target === data.id) { const n = kgNodes.find(n => n.id === e.source); if (n) related.push(n.label.replace('\\n', ' ')) }
      })
      detailInfo.value = { label: data.label, type: data.type, id: data.id, related }
    } else {
      selectedNode.value = null
      detailInfo.value = null
      nodeMeshes.forEach(m => { (m.material as THREE.MeshPhysicalMaterial).emissiveIntensity = 0.05 })
      controls!.autoRotate = true
    }
  })

  // 响应式
  const ro = new ResizeObserver(() => {
    const r2 = containerRef.value!.getBoundingClientRect()
    const nw = r2.width, nh = r2.height
    camera!.aspect = nw / nh
    camera!.updateProjectionMatrix()
    renderer!.setSize(nw, nh)
  })
  ro.observe(containerRef.value)
}

function cleanupGraph() {
  if (animId) cancelAnimationFrame(animId)
  controls?.dispose()
  renderer?.dispose()
  scene?.clear()
  if (renderer && containerRef.value) containerRef.value.removeChild(renderer.domElement)
  nodeMeshes = []; edgeLines = []
}

function switchMode(mode: 'list' | 'graph') {
  viewMode.value = mode
  if (mode === 'graph') {
    setTimeout(() => initGraph(), 50)
  } else {
    cleanupGraph()
    selectedNode.value = null
    detailInfo.value = null
  }
}

onUnmounted(() => cleanupGraph())

function resumeRotate() { if (controls) controls.autoRotate = true }

const typeLabel: Record<string, string> = {
  team: '团队', institution: '机构', event: '事件',
  person: '人物', location: '地点', concept: '概念',
}
const typeColor: Record<string, string> = nodeColors
</script>

<template>
  <div class="archive-page">
    <div class="page-header">
      <h1>数字档案库</h1>
      <div class="page-title-en">Digital Archive</div>
      <p>校史知识图谱 · 老照片 · 手稿 · 历史文件</p>
    </div>

    <!-- 视图切换 -->
    <div class="view-toggle">
      <button :class="['toggle-btn', { active: viewMode === 'list' }]" @click="switchMode('list')">
        📋 列表
      </button>
      <button :class="['toggle-btn', { active: viewMode === 'graph' }]" @click="switchMode('graph')">
        🌐 知识图谱
      </button>
    </div>

    <!-- ════ 列表模式 ════ -->
    <template v-if="viewMode === 'list'">
      <div class="archive-tools">
        <div class="search-box">
          <input v-model="searchQuery" type="text" placeholder="搜索档案标题或描述…" />
        </div>
        <div class="category-tabs">
          <button v-for="cat in categories" :key="cat.key"
            :class="['category-tab', { active: activeCategory === cat.key }]"
            @click="activeCategory = cat.key">
            {{ cat.label }}
          </button>
        </div>
      </div>

      <div v-if="filteredItems.length === 0" class="empty-state">
        <div class="empty-icon">📄</div>
        <div class="empty-text">暂无匹配的档案资料</div>
        <div class="empty-hint">切换到「知识图谱」模式浏览校史知识网络</div>
      </div>

      <div v-else class="card-grid">
        <div v-for="item in filteredItems" :key="item.id" class="floating-card">
          <div class="card-title">{{ item.title }}</div>
          <div class="card-subtitle">
            <span class="tag">{{ ({ photo: '老照片', manuscript: '手稿', document: '文件', other: '其他', person: '人物', event: '事件', institution: '机构', concept: '概念' } as any)[item.category] }}</span>
            <span v-if="item.date" class="card-date">{{ item.date }}</span>
          </div>
          <div class="card-body">{{ item.description }}</div>
          <div v-if="item.source" class="card-source">来源：{{ item.source }}</div>
        </div>
      </div>
    </template>

    <!-- ════ 图谱模式 ════ -->
    <template v-else>
      <div ref="containerRef" class="graph-container" />

      <!-- 节点详情 -->
      <Transition name="slide-up">
        <div v-if="detailInfo" class="detail-panel">
          <button class="detail-close" @click="detailInfo = null; selectedNode = null; resumeRotate()">&times;</button>

          <div class="detail-type" :style="{ color: typeColor[detailInfo.type] || '#6B7280' }">
            {{ typeLabel[detailInfo.type] || detailInfo.type }}
          </div>
          <div class="detail-title">{{ detailInfo.label }}</div>
          <div class="detail-id">ID: {{ detailInfo.id }}</div>

          <div v-if="detailInfo.related.length" class="detail-section">
            <div class="detail-section-title">关联节点</div>
            <div class="detail-tags">
              <span v-for="r in detailInfo.related" :key="r" class="detail-tag">{{ r }}</span>
            </div>
          </div>

          <div class="detail-section">
            <div class="detail-section-title">数据库条目</div>
            <div v-if="nodeToArchive[detailInfo.id]" class="detail-links">
              <a v-for="(item, i) in nodeToArchive[detailInfo.id]" :key="i"
                :href="item.link" target="_blank" rel="noopener noreferrer"
                class="detail-link">
                {{ item.title }}
              </a>
            </div>
            <div v-else-if="detailInfo.type === 'person'" class="detail-links">
              <a :href="`https://baike.baidu.com/item/${encodeURIComponent(detailInfo.label)}`"
                target="_blank" rel="noopener noreferrer" class="detail-link">
                百度百科：{{ detailInfo.label }}
              </a>
              <a href="#/progress" class="detail-link internal">
                采访进度看板 →
              </a>
            </div>
            <div v-else class="detail-links">
              <a :href="`https://baike.baidu.com/item/${encodeURIComponent(detailInfo.label)}`"
                target="_blank" rel="noopener noreferrer" class="detail-link">
                百度百科：{{ detailInfo.label }}
              </a>
            </div>
          </div>
        </div>
      </Transition>

      <div class="graph-hint">
        拖拽旋转 · 滚轮缩放 · 点击节点查看详情
      </div>
    </template>
  </div>
</template>

<style scoped>
.archive-page { max-width: var(--content-max-width); margin: 0 auto; }

/* ===== 视图切换 ===== */
.view-toggle {
  display: flex; gap: var(--space-sm); margin-bottom: var(--space-lg);
}
.toggle-btn {
  padding: var(--space-xs) var(--space-lg);
  border-radius: var(--radius-md);
  font-family: var(--font-sans); font-size: 0.9rem;
  border: 1px solid var(--color-border);
  background: var(--color-bg-card); cursor: pointer;
  transition: all var(--transition-fast);
}
.toggle-btn.active {
  background: var(--color-gold); color: var(--color-text-on-gold);
  border-color: var(--color-gold);
}
.toggle-btn:hover:not(.active) { border-color: var(--color-gold); }

/* ===== 列表模式 ===== */
.archive-tools {
  display: flex; gap: var(--space-md); margin-bottom: var(--space-xl);
  flex-wrap: wrap; align-items: center;
}
.category-tabs { display: flex; gap: var(--space-xs); flex-wrap: wrap; }
.category-tab {
  padding: 4px 14px; border-radius: 20px;
  font-family: var(--font-sans); font-size: 0.85rem;
  border: 1px solid var(--color-border);
  background: var(--color-bg-card); color: var(--color-text-secondary);
  cursor: pointer; transition: all var(--transition-fast);
}
.category-tab:hover { border-color: var(--color-gold); color: var(--color-gold-dark); }
.category-tab.active { background: var(--color-gold); color: var(--color-text-on-gold); border-color: var(--color-gold); }

.card-date { margin-left: 8px; color: var(--color-text-secondary); font-size: 0.85rem; }
.card-source { margin-top: var(--space-sm); font-family: var(--font-sans); font-size: 0.8rem; color: var(--color-text-secondary); }

.empty-state { text-align: center; padding: var(--space-3xl); color: var(--color-text-light); }
.empty-icon { font-size: 2.5rem; margin-bottom: var(--space-sm); }
.empty-text { font-family: var(--font-sans); font-size: 0.95rem; }
.empty-hint { font-family: var(--font-sans); font-size: 0.8rem; color: var(--color-text-secondary); margin-top: var(--space-sm); }

/* ===== 图谱模式 ===== */
.graph-container {
  width: 100%; height: 500px; border-radius: var(--radius-lg);
  overflow: hidden; background: #1a1a2e; position: relative;
}

.graph-hint {
  text-align: center; font-family: var(--font-sans);
  font-size: 0.8rem; color: var(--color-text-secondary);
  margin-top: var(--space-md);
}

/* ===== 详情面板 ===== */
.detail-panel {
  margin-top: var(--space-lg);
  background: var(--color-bg-card);
  border-radius: var(--radius-lg);
  padding: var(--space-lg);
  position: relative;
  box-shadow: var(--shadow-md);
  border: 1px solid var(--color-border-light);
}

.detail-close {
  position: absolute; top: var(--space-sm); right: var(--space-sm);
  background: none; border: none; font-size: 1.3rem;
  cursor: pointer; color: var(--color-text-secondary); padding: var(--space-xs);
}

.detail-type {
  font-family: var(--font-sans); font-size: 0.7rem;
  text-transform: uppercase; letter-spacing: 2px;
  margin-bottom: var(--space-xs);
}

.detail-title {
  font-size: 1.3rem; font-weight: 700;
  color: var(--color-primary-dark); margin-bottom: var(--space-xs);
}

.detail-id {
  font-family: monospace; font-size: 0.75rem;
  color: var(--color-text-secondary); margin-bottom: var(--space-md);
}

.detail-section { margin-bottom: var(--space-md); }
.detail-section-title {
  font-weight: 600; font-size: 0.9rem;
  color: var(--color-primary-dark); margin-bottom: var(--space-sm);
}

.detail-tags { display: flex; gap: var(--space-xs); flex-wrap: wrap; }
.detail-tag {
  padding: 2px 10px; border-radius: var(--radius-sm);
  background: var(--color-bg-alt); font-family: var(--font-sans);
  font-size: 0.8rem; color: var(--color-text-secondary);
}

.detail-links { display: flex; flex-direction: column; gap: var(--space-xs); }
.detail-link {
  font-family: var(--font-sans); font-size: 0.85rem;
  color: var(--color-gold-dark); text-decoration: underline;
  transition: opacity var(--transition-fast);
}
.detail-link:hover { opacity: 0.7; }
.detail-link.internal { color: var(--color-primary); }

/* ===== 动画 ===== */
.slide-up-enter-active, .slide-up-leave-active {
  transition: all 0.3s ease;
}
.slide-up-enter-from, .slide-up-leave-to {
  opacity: 0; transform: translateY(20px);
}
</style>
