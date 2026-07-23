<script setup lang="ts">
import { ref, onMounted, onUnmounted, watch } from 'vue'
import { useRouter } from 'vue-router'
import * as d3 from 'd3'
import { nodes as nodeData, edges as edgeData, nodeColors } from '@/data/knowledgeGraph'

const router = useRouter()
const containerRef = ref<HTMLElement | null>(null)
const hoveredId = ref<string | null>(null)
const dims = ref({ w: 800, h: 520 })

let simulation: d3.Simulation<d3.SimulationNodeDatum, undefined> | null = null
let particleInterval: number | null = null

function updateDims() {
  if (containerRef.value) {
    dims.value = { w: containerRef.value.clientWidth, h: containerRef.value.clientHeight }
  }
}

onMounted(() => {
  updateDims()
  window.addEventListener('resize', updateDims)
  initGraph()
})

onUnmounted(() => {
  window.removeEventListener('resize', updateDims)
  if (simulation) simulation.stop()
  if (particleInterval) cancelAnimationFrame(particleInterval)
})

watch(dims, () => {
  if (simulation) {
    simulation.force('center', d3.forceCenter(dims.value.w / 2, dims.value.h / 2))
    simulation.alpha(0.3).restart()
  }
  // 更新 SVG 尺寸
  const svg = containerRef.value?.querySelector('.graph-svg')
  if (svg) {
    svg.setAttribute('width', String(dims.value.w))
    svg.setAttribute('height', String(dims.value.h))
  }
})

function initGraph() {
  if (!containerRef.value) return

  const w = dims.value.w
  const h = dims.value.h

  // 准备 D3 数据（深拷贝）
  const nodes = nodeData.map((n: any) => ({ ...n, x: (n.x / 100) * w, y: (n.y / 100) * h }))
  const links = edgeData.map((e: any) => ({
    source: e.source,
    target: e.target,
    label: e.label,
  }))

  // 创建 SVG
  const svg = d3.select(containerRef.value)
    .append('svg')
    .attr('width', w)
    .attr('height', h)
    .attr('class', 'graph-svg')
    .style('touch-action', 'none')
    .style('cursor', 'grab')

  // 缩放容器组 —— 所有元素都放在这个组里，由 zoom 统一变换
  const zoomGroup = svg.append('g').attr('class', 'zoom-group')

  // 背景矩形 —— 让空白区域也能拖拽平移
  zoomGroup.append('rect')
    .attr('class', 'zoom-bg')
    .attr('x', -w * 2)
    .attr('y', -h * 2)
    .attr('width', w * 4)
    .attr('height', h * 4)
    .attr('fill', 'transparent')
    .style('pointer-events', 'all')

  // ---- 定义滤镜 ----
  const defs = svg.append('defs')
  defs.append('filter').attr('id', 'glow-d3')
    .append('feDropShadow').attr('dx', 0).attr('dy', 0).attr('stdDeviation', 4).attr('flood-opacity', 0.5)

  // 箭头标记
  defs.append('marker')
    .attr('id', 'arrow-d3')
    .attr('viewBox', '0 -5 10 10')
    .attr('refX', 28)
    .attr('refY', 0)
    .attr('markerWidth', 6)
    .attr('markerHeight', 6)
    .attr('orient', 'auto')
    .append('path')
    .attr('d', 'M0 -5L10 0L0 5')
    .attr('fill', 'var(--color-border)')

  // ---- 连线 ----
  const linkGroup = zoomGroup.append('g').attr('class', 'links')
  const linkPaths = linkGroup.selectAll('path')
    .data(links)
    .join('path')
    .attr('class', 'link-line')
    .attr('marker-end', 'url(#arrow-d3)')

  // 连线标签
  const linkLabelGroup = zoomGroup.append('g').attr('class', 'link-labels')
  const linkLabels = linkLabelGroup.selectAll('text')
    .data(links.filter((l: any) => l.label))
    .join('text')
    .attr('class', 'link-label')
    .attr('text-anchor', 'middle')
    .attr('dy', -6)
    .text((d: any) => d.label!)

  // ---- 粒子连线 ----
  const particleGroup = zoomGroup.append('g').attr('class', 'particles')

  // 为每条边创建粒子
  const particles: { element: d3.Selection<SVGCircleElement, unknown, null, undefined>; progress: number; speed: number }[] = []
  links.forEach(() => {
    const p = particleGroup.append('circle')
      .attr('r', 2.5)
      .attr('fill', '#c9a84c')
      .attr('opacity', 0.7)
    particles.push({
      element: p,
      progress: Math.random(),
      speed: 0.002 + Math.random() * 0.003,
    })
  })

  // 粒子动画
  function animateParticles() {
    particles.forEach((p, i) => {
      p.progress += p.speed
      if (p.progress > 1) p.progress = 0
      const link = links[i]
      const s = typeof link.source === 'object' ? link.source : nodes.find(n => n.id === link.source)
      const t = typeof link.target === 'object' ? link.target : nodes.find(n => n.id === link.target)
      if (s && t && 'x' in s && 'y' in t) {
        const x = (s as any).x + ((t as any).x - (s as any).x) * p.progress
        const y = (s as any).y + ((t as any).y - (s as any).y) * p.progress
        p.element.attr('cx', x).attr('cy', y)
      }
    })
    particleInterval = requestAnimationFrame(animateParticles)
  }
  animateParticles()

  // ---- 节点 ----
  const nodeGroup = zoomGroup.append('g').attr('class', 'nodes')

  // 计算每个节点的半径：基于最长行字数
  function nodeRadius(d: typeof nodes[0]): number {
    const lines = d.label.split('\\n')
    const maxLen = Math.max(...lines.map((l: any) => (l as string).length))
    return Math.max(18, Math.min(38, 12 + maxLen * 4.5))
  }

  function nodeFontSize(d: typeof nodes[0]): number {
    const lines = d.label.split('\\n')
    const maxLen = Math.max(...lines.map((l: any) => (l as string).length))
    if (maxLen <= 3) return 0.75
    if (maxLen <= 5) return 0.65
    return 0.55
  }

  const nodeCircles = nodeGroup.selectAll('circle')
    .data(nodes)
    .join('circle')
    .attr('r', (d: any) => nodeRadius(d))
    .attr('fill', (d: any) => nodeColors[d.type])
    .attr('opacity', 0.9)
    .attr('stroke', '#fff')
    .attr('stroke-width', 2)
    .style('cursor', 'pointer')

  // 节点光晕（hover 时显示）
  const nodeGlow = nodeGroup.selectAll('circle.glow')
    .data(nodes)
    .join('circle')
    .attr('class', 'glow')
    .attr('r', (d: any) => nodeRadius(d) + 8)
    .attr('fill', (d: any) => nodeColors[d.type])
    .attr('opacity', 0)
    .attr('pointer-events', 'none')

  // 节点标签
  const nodeLabels = nodeGroup.selectAll('text')
    .data(nodes)
    .join('text')
    .attr('class', 'node-label-d3')
    .attr('text-anchor', 'middle')
    .attr('dominant-baseline', 'middle')
    .style('pointer-events', 'none')
    .style('user-select', 'none')
    .style('font-size', (d: any) => `${nodeFontSize(d)}rem`)
    .style('font-weight', '600')
    .text((d: any) => d.label)

  // 处理换行标签 + 文字描边使其在节点内清晰
  nodeLabels.each(function (d: any) {
    const el = d3.select(this as SVGElement)
    const lines = d.label.split('\\n')
    if (lines.length > 1) {
      el.text('')
      const lineH = nodeFontSize(d) <= 0.6 ? 10 : 12
      lines.forEach((line: string, i: number) => {
        el.append('tspan')
          .attr('x', 0)
          .attr('dy', i === 0 ? 0 : lineH)
          .text(line)
      })
    }
  })

  // ---- 交互 ----
  nodeCircles
    .on('mouseenter', function (_: any, d: any) {
      hoveredId.value = d.id
      nodeCircles.attr('opacity', (n: any) => !hoveredId.value || hoveredId.value === n.id || isConnected(n.id, hoveredId.value!) ? 0.9 : 0.15)
      nodeLabels.attr('opacity', (n: any) => !hoveredId.value || hoveredId.value === n.id || isConnected(n.id, hoveredId.value!) ? 1 : 0.15)
      nodeGlow.attr('opacity', (n: any) => n.id === d.id ? 0.15 : 0)
      linkPaths.attr('opacity', (l: any) => !hoveredId.value || l.source === hoveredId.value || l.target === hoveredId.value || 
        (typeof l.source === 'object' && l.source.id === hoveredId.value) ||
        (typeof l.target === 'object' && l.target.id === hoveredId.value) ? 1 : 0.08)
        .attr('stroke', (l: any) => hoveredId.value && (l.source === hoveredId.value || l.target === hoveredId.value || 
          (typeof l.source === 'object' && l.source.id === hoveredId.value) ||
          (typeof l.target === 'object' && l.target.id === hoveredId.value)) ? nodeColors[nodes.find((n: any) => n.id === hoveredId.value)?.type || 'concept'] : null)
      linkLabels.attr('opacity', (l: any) => !hoveredId.value || 
        l.source === hoveredId.value || l.target === hoveredId.value ||
        (typeof l.source === 'object' && l.source.id === hoveredId.value) ||
        (typeof l.target === 'object' && l.target.id === hoveredId.value) ? 1 : 0.08)
    })
    .on('mouseleave', () => {
      hoveredId.value = null
      nodeCircles.attr('opacity', 0.9)
      nodeLabels.attr('opacity', 1)
      nodeGlow.attr('opacity', 0)
      linkPaths.attr('opacity', 1).attr('stroke', null)
      linkLabels.attr('opacity', 1)
    })
    .on('click', (_: any, d: any) => {
      if (d.link) router.push(d.link)
      else if (d.search) router.push({ path: '/archive', query: { search: d.search } })
    })

  // ---- 力导向模拟 ----
  simulation = d3.forceSimulation(nodes as any)
    .force('link', d3.forceLink(links).id((d: any) => d.id).distance(80).strength(0.3))
    .force('charge', d3.forceManyBody().strength(-200))
    .force('center', d3.forceCenter(w / 2, h / 2))
    .force('collide', d3.forceCollide().radius((d: any) => nodeRadius(d) + 8))
    .alphaDecay(0.05)
    .on('tick', () => {
      // 更新连线路径
      linkPaths.attr('d', (d: any) => {
        if (!d.source || !d.target) return ''
        const s = d.source
        const t = d.target
        const dx = t.x - s.x
        const dy = t.y - s.y
        const cx1 = s.x + dx * 0.4
        const cy1 = s.y + dy * 0.1
        const cx2 = s.x + dx * 0.6
        const cy2 = s.y + dy * 0.9
        return `M${s.x},${s.y} C${cx1},${cy1} ${cx2},${cy2} ${t.x},${t.y}`
      })

      // 更新连线标签位置
      linkLabels.attr('x', (d: any) => (d.source.x + d.target.x) / 2)
        .attr('y', (d: any) => (d.source.y + d.target.y) / 2)

      // 更新节点位置
      nodeCircles.attr('cx', (d: any) => d.x).attr('cy', (d: any) => d.y)
      nodeGlow.attr('cx', (d: any) => d.x).attr('cy', (d: any) => d.y)
      nodeLabels.attr('x', (d: any) => d.x).attr('y', (d: any) => d.y)
    })

  // ---- 缩放 & 平移（背景拖拽 / 手机双指） ----
  let zoomTransform = d3.zoomIdentity

  const zoom = d3.zoom<SVGSVGElement, unknown>()
    .scaleExtent([0.3, 3])
    .filter((event: any) => !event.button) // 仅左键和触摸拖拽
    .on('zoom', (event: any) => {
      zoomTransform = event.transform
      zoomGroup.attr('transform', zoomTransform.toString())
      // 拖拽时切换光标
      svg.style('cursor', event.sourceEvent?.type === 'mousemove' ? 'grabbing' : 'grab')
    })

  svg.call(zoom)

  // ---- 拖拽节点（坐标已适配缩放） ----
  const drag = d3.drag<SVGCircleElement, any>()
    .on('start', (event: any, d: any) => {
      if (!event.active) simulation?.alphaTarget(0.3).restart()
      d.fx = d.x
      d.fy = d.y
    })
    .on('drag', (event: any, d: any) => {
      d.fx = (event.x - zoomTransform.x) / zoomTransform.k
      d.fy = (event.y - zoomTransform.y) / zoomTransform.k
    })
    .on('end', (event: any, d: any) => {
      if (!event.active) simulation?.alphaTarget(0)
      d.fx = null
      d.fy = null
    })

  nodeCircles.call(drag as any)
}

function isConnected(nodeId: string, targetId: string): boolean {
  return edgeData.some(e =>
    (e.source === targetId && e.target === nodeId) ||
    (e.target === targetId && e.source === nodeId)
  )
}
</script>

<template>
  <section class="graph-section">
    <h2 class="graph-title">校史知识图谱</h2>
    <p class="graph-subtitle">拖拽背景平移 · 双指缩放 · 拖拽节点 · 悬停查看关联 · 点击跳转</p>

    <div ref="containerRef" class="graph-container">
      <div class="graph-hint">
        <span class="hint-dot" style="background: #3B82F6" /> 机构
        <span class="hint-dot" style="background: #F59E0B" /> 事件
        <span class="hint-dot" style="background: #10B981" /> 人物
        <span class="hint-dot" style="background: #8B5CF6" /> 地点
        <span class="hint-dot" style="background: #6B7280" /> 概念
        <span class="hint-sep">|</span>
        <span class="hint-dot" style="background: #c9a84c" /> 粒子流动
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

.graph-container :deep(.graph-svg) {
  width: 100%;
  height: 100%;
}

.graph-container :deep(.link-line) {
  fill: none;
  stroke: var(--color-border);
  stroke-width: 1.5;
  transition: stroke var(--transition-fast), opacity var(--transition-fast);
}

.graph-container :deep(.link-label) {
  font-family: var(--font-sans);
  font-size: 0.6rem;
  font-weight: 700;
  fill: var(--color-text-secondary);
  pointer-events: none;
  user-select: none;
  transition: opacity var(--transition-fast);
}

.graph-container :deep(.node-label-d3) {
  font-family: var(--font-sans);
  font-weight: 700;
  fill: #fff;
  cursor: pointer;
  transition: opacity var(--transition-fast);
  paint-order: stroke;
  stroke: rgba(0,0,0,0.3);
  stroke-width: 2px;
  stroke-linecap: round;
  stroke-linejoin: round;
}

.graph-container :deep(.glow) {
  transition: opacity var(--transition-fast);
  pointer-events: none;
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
  pointer-events: none;
  z-index: 10;
}

.hint-dot {
  display: inline-block;
  width: 8px;
  height: 8px;
  border-radius: 50%;
  flex-shrink: 0;
}

.hint-sep { color: var(--color-border); }

@media (max-width: 640px) {
  .graph-container { height: 400px; }
  .graph-hint { font-size: 0.55rem; gap: 4px; padding: 2px 10px; }
}
</style>