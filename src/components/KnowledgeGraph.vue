<script setup lang="ts">
import { ref, reactive, onMounted, onUnmounted } from 'vue'
import { useRouter } from 'vue-router'
import { nodes as rawNodes, edges, nodeColors } from '@/data/knowledgeGraph'

const router = useRouter()
const hovered = ref<string | null>(null)
const dragging = ref<string | null>(null)
const containerRef = ref<HTMLElement | null>(null)
const dims = ref({ w: 800, h: 500 })

const pos = reactive<Record<string, { x: number; y: number }>>({})
rawNodes.forEach(n => { pos[n.id] = { x: n.x, y: n.y } })

function px(n: { x: number; y: number }) {
  return { x: (n.x / 100) * dims.value.w, y: (n.y / 100) * dims.value.h }
}

function edgePath(e: { source: string; target: string }) {
  const s = pos[e.source], t = pos[e.target]
  if (!s || !t) return ''
  const p1 = px(s), p2 = px(t)
  return `M${p1.x},${p1.y} L${p2.x},${p2.y}`
}

function edgeMid(e: { source: string; target: string }) {
  const s = pos[e.source], t = pos[e.target]
  if (!s || !t) return { x: 0, y: 0 }
  const p1 = px(s), p2 = px(t)
  return { x: (p1.x + p2.x) / 2, y: (p1.y + p2.y) / 2 - 6 }
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

function updateDims() {
  if (containerRef.value) dims.value = { w: containerRef.value.clientWidth, h: containerRef.value.clientHeight }
}

// Drag
let dsx = 0, dsy = 0, nsx = 0, nsy = 0
function onPD(e: PointerEvent, id: string) {
  dragging.value = id
  const p = pos[id]; if (!p) return
  const pt = px(p)
  dsx = e.clientX; dsy = e.clientY; nsx = pt.x; nsy = pt.y
  containerRef.value?.setPointerCapture(e.pointerId)
}
function onPM(e: PointerEvent) {
  if (!dragging.value) return
  const p = pos[dragging.value]; if (!p) return
  const x = ((nsx + e.clientX - dsx) / dims.value.w) * 100
  const y = ((nsy + e.clientY - dsy) / dims.value.h) * 100
  p.x = Math.max(3, Math.min(97, x))
  p.y = Math.max(3, Math.min(97, y))
}
function onPU() { dragging.value = null }

onMounted(() => { updateDims(); window.addEventListener('resize', updateDims) })
onUnmounted(() => window.removeEventListener('resize', updateDims))
</script>

<template>
  <section class="g-section">
    <h2 class="g-title">📌 方案A · 优化SVG图谱</h2>
    <p class="g-subtitle">矩形节点 + 连线置于底层 + 悬停高亮</p>
    <div ref="containerRef" class="g-container" @pointermove="onPM" @pointerup="onPU" @pointercancel="onPU">
      <svg :viewBox="`0 0 ${dims.w} ${dims.h}`" class="g-svg">
        <!-- 连线（底层） -->
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
          <rect
            :x="px(pos[n.id]).x - 60" :y="px(pos[n.id]).y - 18"
            width="120" height="36" rx="8"
            :fill="hovered && !isConnected(n.id) ? nodeColors[n.type] + '33' : nodeColors[n.type]"
            :stroke="hovered === n.id ? '#fff' : 'transparent'"
            :stroke-width="hovered === n.id ? 2 : 0"
            class="g-node-rect"
            :style="{ cursor: dragging === n.id ? 'grabbing' : 'pointer' }"
            @pointerdown="onPD($event, n.id)"
            @pointerenter="hovered = n.id"
            @pointerleave="hovered = null"
            @click="onClick(n.id)"
          />
          <text
            :x="px(pos[n.id]).x" :y="px(pos[n.id]).y + 4"
            text-anchor="middle" dominant-baseline="middle"
            class="g-node-text"
            :class="{ dim: hovered && !isConnected(n.id) }"
            :style="{ pointerEvents: 'none' }"
          >{{ n.label }}</text>
          <!-- 连接指示光晕 -->
          <rect v-if="hovered === n.id"
            :x="px(pos[n.id]).x - 66" :y="px(pos[n.id]).y - 24"
            width="132" height="48" rx="12"
            :fill="nodeColors[n.type]" opacity="0.12"
            class="g-glow"
          />
        </g>
      </svg>
      <div class="g-hint">🖱 拖拽移动 · 悬停关联 · 点击跳转</div>
    </div>
  </section>
</template>

<style scoped>
.g-section { max-width: 900px; margin: var(--space-2xl) auto; padding: 0 var(--space-lg); }
.g-title { font-size: 1.1rem; color: var(--color-primary-dark); margin-bottom: var(--space-xs); }
.g-subtitle { font-family: var(--font-sans); font-size: 0.8rem; color: var(--color-text-secondary); margin-bottom: var(--space-md); }
.g-container { position: relative; width: 100%; height: 500px; background: var(--color-bg-alt); border-radius: var(--radius-lg); overflow: hidden; touch-action: none; }
.g-svg { width: 100%; height: 100%; }
.g-edge { fill: none; stroke: var(--color-border); stroke-width: 1.5; transition: opacity .2s; }
.g-edge.dim { opacity: 0.06; }
.g-edge-label { font-family: var(--font-sans); font-size: 0.55rem; fill: var(--color-text-light); pointer-events: none; user-select: none; }
.g-node-rect { transition: fill .2s, stroke .1s; cursor: pointer; }
.g-node-text { font-family: var(--font-sans); font-size: 0.7rem; font-weight: 600; fill: #fff; pointer-events: none; user-select: none; transition: opacity .2s; }
.g-node-text.dim { opacity: 0.2; }
.g-glow { pointer-events: none; animation: pulse 2s ease-in-out infinite; }
@keyframes pulse { 0%,100% { opacity: 0.08; } 50% { opacity: 0.16; } }
.g-hint { position: absolute; bottom: var(--space-sm); left: 50%; transform: translateX(-50%); font-family: var(--font-sans); font-size: 0.6rem; color: var(--color-text-light); background: rgba(255,255,255,0.85); padding: 2px 12px; border-radius: 12px; white-space: nowrap; }
</style>