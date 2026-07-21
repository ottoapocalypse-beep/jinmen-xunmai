<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { nodes, edges, nodeColors } from '@/data/knowledgeGraph'

const router = useRouter()
const hoveredNode = ref<string | null>(null)

/** 从百分比坐标转为实际像素（基于容器尺寸） */
const containerRef = ref<HTMLElement | null>(null)
const dims = ref({ w: 800, h: 600 })

function updateDims() {
  if (containerRef.value) {
    dims.value = {
      w: containerRef.value.clientWidth,
      h: containerRef.value.clientHeight,
    }
  }
}

/** 将百分比坐标转为像素 */
function px(node: { x: number; y: number }) {
  return {
    x: (node.x / 100) * dims.value.w,
    y: (node.y / 100) * dims.value.h,
  }
}

/** 计算连线路径（贝塞尔曲线） */
function edgePath(edge: { source: string; target: string }): string {
  const s = nodes.find(n => n.id === edge.source)
  const t = nodes.find(n => n.id === edge.target)
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

/** 计算连线标签位置（中点偏上） */
function edgeLabelPos(edge: { source: string; target: string }) {
  const s = nodes.find(n => n.id === edge.source)
  const t = nodes.find(n => n.id === edge.target)
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

function handleNodeClick(node: typeof nodes[0]) {
  if (node.link) {
    router.push(node.link)
  } else if (node.search) {
    router.push({ path: '/archive', query: { search: node.search } })
  }
}

</script>

<template>
  <section class="graph-section">
    <h2 class="graph-title">校史知识图谱</h2>
    <p class="graph-subtitle">探索人物、机构与事件之间的关联</p>

    <div ref="containerRef" class="graph-container">
      <svg
        :viewBox="`0 0 ${dims.w} ${dims.h}`"
        class="graph-svg"
        @mouseenter="updateDims"
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

        <!-- 连线 -->
        <g class="nodes">
          <template v-for="node in nodes" :key="node.id">
            <!-- 连接高亮光晕 -->
            <circle
              v-if="hoveredNode === node.id"
              :cx="px(node).x"
              :cy="px(node).y"
              :r="28"
              :fill="nodeColors[node.type]"
              opacity="0.15"
              filter="url(#glow-heavy)"
              class="node-glow-ring"
            />
            <!-- 节点背景圆 -->
            <circle
              :cx="px(node).x"
              :cy="px(node).y"
              :r="hoveredNode === node.id ? 24 : 20"
              :fill="nodeColors[node.type]"
              :opacity="hoveredNode && !isConnected(node.id) ? 0.2 : 0.9"
              :filter="hoveredNode === node.id ? 'url(#glow)' : undefined"
              class="node-circle"
              @mouseenter="hoveredNode = node.id"
              @mouseleave="hoveredNode = null"
              @click="handleNodeClick(node)"
            />
            <!-- 节点文字 -->
            <text
              :x="px(node).x"
              :y="px(node).y + 1"
              text-anchor="middle"
              dominant-baseline="middle"
              class="node-label"
              :class="{ dimmed: hoveredNode && !isConnected(node.id) }"
              @mouseenter="hoveredNode = node.id"
              @mouseleave="hoveredNode = null"
              @click="handleNodeClick(node)"
            >
              <!-- 处理换行（如 "北京钢铁\n工业学院"） -->
              <tspan
                v-for="(line, li) in node.label.split('\\n')"
                :key="li"
                :x="px(node).x"
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
        悬停查看关联 · 点击跳转
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