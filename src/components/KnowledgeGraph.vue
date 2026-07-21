<script setup lang="ts">
import { ref, reactive, onMounted, onUnmounted } from 'vue'
import { useRouter } from 'vue-router'
import { nodes as initialNodes, edges, nodeColors } from '@/data/knowledgeGraph'

const router = useRouter()
const hoveredNode = ref<string | null>(null)
const dragging = ref<string | null>(null)
const containerRef = ref<HTMLElement | null>(null)
const dims = ref({ w: 800, h: 600 })

/** 节点运行时坐标（允许拖拽修改） */
const nodePositions = reactive<Record<string, { x: number; y: number }>>({})

// 初始化节点位置
initialNodes.forEach(n => { nodePositions[n.id] = { x: n.x, y: n.y } })

function updateDims() {
  if (containerRef.value) {
    dims.value = {
      w: containerRef.value.clientWidth,
      h: containerRef.value.clientHeight,
    }
  }
}

function px(node: { x: number; y: number }) {
  return {
    x: (node.x / 100) * dims.value.w,
    y: (node.y / 100) * dims.value.h,
  }
}

function edgePath(edge: { source: string; target: string }): string {
  const s = nodePositions[edge.source]
  const t = nodePositions[edge.target]
  if (!s || !t) return ''
  const p1 = px(s)
  const p2 = px(t)
  const dx = p2.x - p1.x
  const dy = p2.y - p1.y
  const cx1 = p1.x + dx * 0.4
  const cy1 = p1.y + dy * 0.1
  const cx2 = p1.x + dx * 0.6
  const cy2 = p1.y + dy * 0.9
  return `M${p1.x},${p1.y} C${cx1},${cy1} ${cx2},${cy2} ${p2.x},${p2.y}`
}

function edgeLabelPos(edge: { source: string; target: string }) {
  const s = nodePositions[edge.source]
  const t = nodePositions[edge.target]
  if (!s || !t) return { x: 0, y: 0 }
  return {
    x: (px(s).x + px(t).x) / 2,
    y: (px(s).y + px(t).y) / 2 - 8,
  }
}

function isConnected(nodeId: string): boolean {
  if (!hoveredNode.value || hoveredNode.value === nodeId) return true
  return edges.some(e =>
    (e.source === hoveredNode.value && e.target === nodeId) ||
    (e.target === hoveredNode.value && e.source === nodeId)
  )
}

function handleNodeClick(nodeId: string) {
  if (dragging.value) return
  const node = initialNodes.find(n => n.id === nodeId)
  if (!node) return
  if (node.link) router.push(node.link)
  else if (node.search) router.push({ path: '/archive', query: { search: node.search } })
}

/* ===== 拖拽 ===== */
let dragStartX = 0, dragStartY = 0
let nodeStartX = 0, nodeStartY = 0

function onPointerDown(e: PointerEvent, nodeId: string) {
  dragging.value = nodeId
  const pos = nodePositions[nodeId]
  if (!pos) return
  const p = px(pos)
  dragStartX = e.clientX
  dragStartY = e.clientY
  nodeStartX = p.x
  nodeStartY = p.y
  const el = containerRef.value
  if (el) el.setPointerCapture(e.pointerId)
}

function onPointerMove(e: PointerEvent) {
  if (!dragging.value) return
  const nodeId = dragging.value
  const pos = nodePositions[nodeId]
  if (!pos) return
  const dx = e.clientX - dragStartX
  const dy = e.clientY - dragStartY
  let newX = ((nodeStartX + dx) / dims.value.w) * 100
  let newY = ((nodeStartY + dy) / dims.value.h) * 100
  // 限制边界
  newX = Math.max(3, Math.min(97, newX))
  newY = Math.max(3, Math.min(97, newY))
  pos.x = newX
  pos.y = newY
}

function onPointerUp() {
  dragging.value = null
}

onMounted(() => {
  updateDims()
  window.addEventListener('resize', updateDims)
})

onUnmounted(() => {
  window.removeEventListener('resize', updateDims)
})
</script>

<template>
  <section class="graph-section">
    <h2 class="graph-title">校史知识图谱</h2>
    <p class="graph-subtitle">探索人物、机构与事件之间的关联</p>

    <div ref="containerRef" class="graph-container" @pointermove="onPointerMove" @pointerup="onPointerUp" @pointercancel="onPointerUp">
      <svg
        :viewBox="`0 0 ${dims.w} ${dims.h}`"
        class="graph-svg"
      >
        <!-- 滤镜：节点光晕 -->
        <defs>
          <filter id="glow" x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur stdDeviation="4" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
          <filter id="glow-heavy" x="-100%" y="-100%" width="300%" height="300%">
            <feGaussianBlur stdDeviation="8" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>

        <!-- 连线 -->
        <g class="edges">
          <template v-for="edge in edges" :key="`${edge.source}-${edge.target}`">
            <path
              :d="edgePath(edge)"
              class="edge-line"
              :class="{
                dimmed: hoveredNode && !isConnected(edge.source) && !isConnected(edge.target)
              }"
            />
            <text
              v-if="edge.label"
              :x="edgeLabelPos(edge).x"
              :y="edgeLabelPos(edge).y"
              class="edge-label"
              text-anchor="middle"
            >{{ edge.label }}</text>
          </template>
        </g>

        <!-- 节点 -->
        <g class="nodes">
          <template v-for="node in initialNodes" :key="node.id">
            <circle
              v-if="hoveredNode === node.id"
              :cx="px(nodePositions[node.id]).x"
              :cy="px(nodePositions[node.id]).y"
              :r="28"
              :fill="nodeColors[node.type]"
              opacity="0.15"
              filter="url(#glow-heavy)"
              class="node-glow-ring"
            />
            <!-- 拖拽热区（透明大圆，方便抓取） -->
            <circle
              :cx="px(nodePositions[node.id]).x"
              :cy="px(nodePositions[node.id]).y"
              r="28"
              fill="transparent"
              class="node-drag-area"
              :style="{ cursor: dragging === node.id ? 'grabbing' : 'grab' }"
              @pointerdown="onPointerDown($event, node.id)"
              @pointerenter="hoveredNode = node.id"
              @pointerleave="hoveredNode = null"
            />
            <!-- 节点背景圆 -->
            <circle
              :cx="px(nodePositions[node.id]).x"
              :cy="px(nodePositions[node.id]).y"
              :r="hoveredNode === node.id ? 24 : 20"
              :fill="nodeColors[node.type]"
              :opacity="hoveredNode && !isConnected(node.id) ? 0.2 : 0.9"
              :filter="hoveredNode === node.id ? 'url(#glow)' : undefined"
              class="node-circle"
              :style="{ pointerEvents: 'none' }"
              @click="handleNodeClick(node.id)"
            />
            <!-- 节点文字 -->
            <text
              :x="px(nodePositions[node.id]).x"
              :y="px(nodePositions[node.id]).y + 1"
              text-anchor="middle"
              dominant-baseline="middle"
              class="node-label"
              :class="{ dimmed: hoveredNode && !isConnected(node.id) }"
              :style="{ pointerEvents: 'none' }"
            >
              <tspan
                v-for="(line, li) in node.label.split('\\n')"
                :key="li"
                :x="px(nodePositions[node.id]).x"
                :dy="li === 0 ? 0 : 12"
              >{{ line }}</tspan>
            </text>
          </template>
        </g>
      </svg>

      <!-- 互动提示 -->
      <div class="graph-hint">
        <span class="hint-dot" style="background: #3B82F6" /> 机构
        <span class="hint-dot" style="background: #F59E0B" /> 事件
        <span class="hint-dot" style="background: #10B981" /> 人物
        <span class="hint-dot" style="background: #8B5CF6" /> 地点
        <span class="hint-dot" style="background: #6B7280" /> 概念
        <span class="hint-sep">|</span>
        拖拽节点 · 悬停查看关联 · 点击跳转
      </div>
    </div>
  </section>
</template>

<style scoped>
.graph-section {
  max-width: 900px;
  margin: var(--space-3xl) auto;
  padding: 0 var(--space-lg);
}

.graph-title {
  font-size: 1.3rem;
  color: var(--color-primary-dark);
  text-align: center;
  margin-bottom: var(--space-xs);
}

.graph-subtitle {
  font-family: var(--font-sans);
  font-size: 0.85rem;
  color: var(--color-text-secondary);
  text-align: center;
  margin-bottom: var(--space-lg);
}

.graph-container {
  position: relative;
  width: 100%;
  height: 520px;
  background: var(--color-bg-alt);
  border-radius: var(--radius-lg);
  overflow: hidden;
}

.graph-svg {
  width: 100%;
  height: 100%;
  cursor: default;
  touch-action: none;
}

/* ===== 拖拽热区 ===== */
.node-drag-area {
  transition: none;
}

/* ===== 连线 ===== */
.edge-line {
  fill: none;
  stroke: var(--color-border);
  stroke-width: 1.5;
  transition: stroke var(--transition-fast), opacity var(--transition-fast);
}

.edge-line.dimmed {
  opacity: 0.08;
}

.edge-label {
  font-family: var(--font-sans);
  font-size: 0.6rem;
  fill: var(--color-text-light);
  pointer-events: none;
  user-select: none;
}

/* ===== 节点 ===== */
.node-circle {
  cursor: pointer;
  transition: r var(--transition-fast), opacity var(--transition-fast);
}

.node-glow-ring {
  pointer-events: none;
  animation: pulse-ring 2s ease-in-out infinite;
}

@keyframes pulse-ring {
  0%, 100% { opacity: 0.1; r: 28; }
  50% { opacity: 0.2; r: 32; }
}

.node-label {
  font-family: var(--font-sans);
  font-size: 0.65rem;
  font-weight: 600;
  fill: #fff;
  cursor: pointer;
  pointer-events: none;
  user-select: none;
  transition: opacity var(--transition-fast);
}

.node-label.dimmed {
  opacity: 0.2;
}

/* ===== 图例 ===== */
.graph-hint {
  position: absolute;
  bottom: var(--space-md);
  left: 50%;
  transform: translateX(-50%);
  display: flex;
  align-items: center;
  gap: var(--space-sm);
  font-family: var(--font-sans);
  font-size: 0.65rem;
  color: var(--color-text-light);
  background: rgba(255,255,255,0.85);
  padding: var(--space-xs) var(--space-md);
  border-radius: 20px;
  white-space: nowrap;
}

.hint-dot {
  display: inline-block;
  width: 8px;
  height: 8px;
  border-radius: 50%;
}

.hint-sep {
  color: var(--color-border);
}

@media (max-width: 640px) {
  .graph-container { height: 400px; }
  .node-label { font-size: 0.55rem; }
  .graph-hint { font-size: 0.55rem; gap: 4px; padding: 2px 10px; }
}
</style>