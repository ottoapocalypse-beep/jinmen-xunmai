<script setup lang="ts">
import { ref, reactive, onMounted, onUnmounted } from 'vue'
import { useRouter } from 'vue-router'
import { nodes as rawNodes, edges, nodeColors } from '@/data/knowledgeGraph'

const router = useRouter()
const hovered = ref<string | null>(null)
const dragging = ref<string | null>(null)
const containerRef = ref<HTMLElement | null>(null)
const dims = ref({ w: 800, h: 500 })
const settled = ref(false)

/* ---- 物理引擎：节点位置 & 速度 ---- */
const pos = reactive<Record<string, { x: number; y: number }>>({})
const vel: Record<string, { x: number; y: number }> = {}

rawNodes.forEach(n => {
  // 随机初始位置（避免全部重叠在中心）
  pos[n.id] = { x: 0.15 + Math.random() * 0.7, y: 0.15 + Math.random() * 0.7 }
  vel[n.id] = { x: 0, y: 0 }
})

function px(n: { x: number; y: number }) {
  return { x: n.x * dims.value.w, y: n.y * dims.value.h }
}

/* ---- 力模拟 ---- */
const REP = 600    // 排斥力
const ATT = 0.003  // 弹簧系数
const REST = 0.14  // 弹簧自然长度
const CTR = 0.003  // 向心力
const DAMP = 0.88  // 阻尼

let animId = 0

function tick() {
  const n = rawNodes.length
  if (n === 0) { settled.value = true; return }
  let ke = 0 // 总动能

  for (let a = 0; a < n; a++) {
    const idA = rawNodes[a].id
    const pA = pos[idA]
    let fx = 0, fy = 0

    // ① 节点间排斥
    for (let b = 0; b < n; b++) {
      if (a === b) continue
      const pB = pos[rawNodes[b].id]
      const dx = pA.x - pB.x
      const dy = pA.y - pB.y
      const d = Math.max(Math.sqrt(dx * dx + dy * dy), 0.01)
      const f = REP / (d * d * n)
      fx += (dx / d) * f
      fy += (dy / d) * f
    }

    // ② 边弹簧力
    for (const edge of edges) {
      let other = edge.source === idA ? edge.target : edge.target === idA ? edge.source : null
      if (!other) continue
      const pB = pos[other]
      const dx = pB.x - pA.x
      const dy = pB.y - pA.y
      const d = Math.max(Math.sqrt(dx * dx + dy * dy), 0.01)
      const f = ATT * (d - REST)
      fx += (dx / d) * f
      fy += (dy / d) * f
    }

    // ③ 向心力
    fx += (0.5 - pA.x) * CTR
    fy += (0.5 - pA.y) * CTR

    // 更新速度 & 位置
    const v = vel[idA]
    if (dragging.value !== idA) {
      v.x = (v.x + fx) * DAMP
      v.y = (v.y + fy) * DAMP
    } else {
      v.x = 0; v.y = 0
    }
    ke += v.x * v.x + v.y * v.y

    if (dragging.value !== idA) {
      pA.x += v.x
      pA.y += v.y
    }
    pA.x = Math.max(0.03, Math.min(0.97, pA.x))
    pA.y = Math.max(0.03, Math.min(0.97, pA.y))
  }

  settled.value = ke < 0.005 * n
  if (!settled.value || dragging.value) {
    animId = requestAnimationFrame(tick)
  }
}

function start() {
  settled.value = false
  cancelAnimationFrame(animId)
  animId = requestAnimationFrame(tick)
}

/* ---- 连线 ---- */
function edgePath(e: { source: string; target: string }) {
  const s = pos[e.source], t = pos[e.target]
  if (!s || !t) return ''
  const p1 = px(s), p2 = px(t)
  const dx = p2.x - p1.x, dy = p2.y - p1.y
  const cx1 = p1.x + dx * 0.4, cy1 = p1.y + dy * 0.1
  const cx2 = p1.x + dx * 0.6, cy2 = p1.y + dy * 0.9
  return `M${p1.x},${p1.y} C${cx1},${cy1} ${cx2},${cy2} ${p2.x},${p2.y}`
}

function edgeMid(e: { source: string; target: string }) {
  const s = pos[e.source], t = pos[e.target]
  if (!s || !t) return { x: 0, y: 0 }
  const p1 = px(s), p2 = px(t)
  return { x: (p1.x + p2.x) / 2, y: (p1.y + p2.y) / 2 - 8 }
}

function isConnected(id: string) {
  if (!hovered.value || hovered.value === id) return true
  return edges.some(e => (e.source === hovered.value && e.target === id) || (e.target === hovered.value && e.source === id))
}

function onClick(id: string) {
  if (dragging.value) return
  const n = rawNodes.find(x => x.id === id)
  if (!n) return
  if (n.link) router.push(n.link)
  else if (n.search) router.push({ path: '/archive', query: { search: n.search } })
}

/* ---- 拖拽 ---- */
let dsx = 0, dsy = 0
function onPD(e: PointerEvent, id: string) {
  dragging.value = id; settled.value = false
  dsx = e.clientX; dsy = e.clientY
  containerRef.value?.setPointerCapture(e.pointerId)
  start()
}
function onPM(e: PointerEvent) {
  if (!dragging.value) return
  const p = pos[dragging.value]; if (!p) return
  p.x += (e.clientX - dsx) / dims.value.w
  p.y += (e.clientY - dsy) / dims.value.h
  dsx = e.clientX; dsy = e.clientY
  vel[dragging.value] = { x: 0, y: 0 }
}
function onPU() { dragging.value = null }

onMounted(() => {
  function resize() {
    if (containerRef.value) dims.value = { w: containerRef.value.clientWidth, h: containerRef.value.clientHeight }
  }
  resize()
  window.addEventListener('resize', resize)
  setTimeout(start, 200)
})

onUnmounted(() => {
  cancelAnimationFrame(animId)
  window.removeEventListener('resize', () => {})
})
</script>

<template>
  <section class="g-section">
    <h2 class="g-title">校史知识图谱</h2>
    <p class="g-subtitle">力导向布局 · 节点自动排列</p>

    <div ref="containerRef" class="g-container" @pointermove="onPM" @pointerup="onPU" @pointercancel="onPU">
      <svg :viewBox="`0 0 ${dims.w} ${dims.h}`" class="g-svg">
        <defs>
          <filter id="gg">
            <feGaussianBlur stdDeviation="3" result="b" />
            <feMerge><feMergeNode in="b" /><feMergeNode in="SourceGraphic" /></feMerge>
          </filter>
        </defs>

        <!-- 连线 -->
        <g>
          <path v-for="e in edges" :key="`e-${e.source}-${e.target}`"
            :d="edgePath(e)"
            :class="['g-edge', { dim: hovered && !isConnected(e.source) && !isConnected(e.target) }]"
          />
          <text v-for="e in edges.filter(x => x.label)" :key="`l-${e.source}-${e.target}`"
            :x="edgeMid(e).x" :y="edgeMid(e).y"
            text-anchor="middle" class="g-edge-label"
          >{{ e.label }}</text>
        </g>

        <!-- 节点 -->
        <g v-for="n in rawNodes" :key="n.id">
          <circle v-if="hovered === n.id"
            :cx="px(pos[n.id]).x" :cy="px(pos[n.id]).y" r="30"
            :fill="nodeColors[n.type]" opacity="0.1" filter="url(#gg)"
            class="g-glow"
          />
          <circle
            :cx="px(pos[n.id]).x" :cy="px(pos[n.id]).y"
            :r="hovered === n.id ? 22 : 18"
            :fill="hovered && !isConnected(n.id) ? nodeColors[n.type] + '44' : nodeColors[n.type]"
            :stroke="hovered === n.id ? '#fff' : 'transparent'"
            :stroke-width="hovered === n.id ? 2.5 : 0"
            class="g-dot"
            :style="{ cursor: dragging === n.id ? 'grabbing' : 'pointer' }"
            @pointerdown="onPD($event, n.id)"
            @pointerenter="hovered = n.id"
            @pointerleave="hovered = null"
            @click="onClick(n.id)"
          />
          <text
            :x="px(pos[n.id]).x" :y="px(pos[n.id]).y + 1"
            text-anchor="middle" dominant-baseline="middle"
            class="g-label"
            :class="{ dim: hovered && !isConnected(n.id) }"
            :style="{ pointerEvents: 'none' }"
          >{{ n.label.replace('\\n', ' ') }}</text>
        </g>
      </svg>

      <div class="g-hint">
        <span v-for="(c, k) in nodeColors" :key="k" class="hint-chip">
          <span class="hint-dot" :style="{ background: c }" />
          {{ { team: '团队', institution: '机构', event: '事件', person: '人物', location: '地点', concept: '概念' }[k] || k }}
        </span>
        <span class="hint-sep">|</span>
        {{ settled ? '✓ 已稳定' : '◌ 排列中…' }}
        拖拽 · 悬停 · 点击
      </div>
    </div>
  </section>
</template>

<style scoped>
.g-section { max-width: 900px; margin: var(--space-2xl) auto; padding: 0 var(--space-lg); }
.g-title { font-size: 1.3rem; color: var(--color-primary-dark); text-align: center; margin-bottom: var(--space-xs); }
.g-subtitle { font-family: var(--font-sans); font-size: 0.85rem; color: var(--color-text-secondary); text-align: center; margin-bottom: var(--space-lg); }
.g-container { position: relative; width: 100%; height: 500px; background: var(--color-bg-alt); border-radius: var(--radius-lg); overflow: hidden; touch-action: none; }
.g-svg { width: 100%; height: 100%; }
.g-edge { fill: none; stroke: var(--color-border); stroke-width: 1.5; transition: opacity .3s; }
.g-edge.dim { opacity: 0.06; }
.g-edge-label { font-family: var(--font-sans); font-size: 0.55rem; fill: var(--color-text-light); pointer-events: none; user-select: none; }
.g-dot { transition: r .2s, fill .2s, stroke .1s; cursor: pointer; }
.g-glow { pointer-events: none; animation: breathe 2s ease-in-out infinite; }
@keyframes breathe { 0%,100% { opacity: 0.08; r: 30; } 50% { opacity: 0.16; r: 34; } }
.g-label { font-family: var(--font-sans); font-size: 0.65rem; font-weight: 600; fill: #fff; pointer-events: none; user-select: none; transition: opacity .2s; }
.g-label.dim { opacity: 0.2; }
.g-hint { position: absolute; bottom: var(--space-sm); left: 50%; transform: translateX(-50%); display: flex; align-items: center; gap: var(--space-sm); font-family: var(--font-sans); font-size: 0.6rem; color: var(--color-text-light); background: rgba(255,255,255,0.85); padding: 3px 14px; border-radius: 14px; white-space: nowrap; }
.hint-dot { display: inline-block; width: 7px; height: 7px; border-radius: 50%; margin-right: 2px; }
.hint-chip { display: inline-flex; align-items: center; gap: 2px; }
.hint-sep { color: var(--color-border); }
</style>