<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'
import { useRouter } from 'vue-router'
import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'
import { nodes as nodeData, edges as edgeData, nodeColors } from '@/data/knowledgeGraph'

const router = useRouter()
const containerRef = ref<HTMLElement | null>(null)
const tooltipPos = ref({ x: 0, y: 0 })
const tooltipText = ref('')
const tooltipVisible = ref(false)

let scene: THREE.Scene
let camera: THREE.PerspectiveCamera
let renderer: THREE.WebGLRenderer
let controls: OrbitControls
let frameId: number
let raycaster: THREE.Raycaster
let mouse: THREE.Vector2
let nodeMeshes: THREE.Mesh[] = []
let linkLines: THREE.Line[] = []
let particleUpdates: (() => void)[] = []

function initThree() {
  if (!containerRef.value) return

  const w = containerRef.value.clientWidth
  const h = containerRef.value.clientHeight

  scene = new THREE.Scene()
  scene.background = new THREE.Color(0xf5f0e8)

  camera = new THREE.PerspectiveCamera(45, w / h, 0.1, 1000)
  camera.position.set(0, 2, 24)
  camera.lookAt(0, 0, 0)

  renderer = new THREE.WebGLRenderer({ antialias: true })
  renderer.setSize(w, h)
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
  renderer.shadowMap.enabled = true
  containerRef.value.appendChild(renderer.domElement)

  controls = new OrbitControls(camera, renderer.domElement)
  controls.enableDamping = true
  controls.dampingFactor = 0.08
  controls.minDistance = 8
  controls.maxDistance = 50
  controls.autoRotate = true
  controls.autoRotateSpeed = 0.6

  // 灯光
  scene.add(new THREE.AmbientLight(0xffffff, 0.5))
  const dl = new THREE.DirectionalLight(0xffffff, 0.8)
  dl.position.set(5, 10, 7)
  scene.add(dl)
  const fl = new THREE.DirectionalLight(0xffd4a0, 0.3)
  fl.position.set(-5, 0, 5)
  scene.add(fl)

  raycaster = new THREE.Raycaster()
  mouse = new THREE.Vector2()

  buildGraph(w, h)

  renderer.domElement.addEventListener('pointermove', onPointerMove)
  renderer.domElement.addEventListener('click', onClick)
  window.addEventListener('resize', onResize)

  animate()
}

function buildGraph(w: number, h: number) {
  const s = Math.min(w, h) / 18 // scale factor

  // Map 2D coords to 3D
  const nodes = nodeData.map((n, i) => ({
    ...n,
    x: ((n.x / 100) * w - w / 2) / s,
    y: (-(n.y / 100) * h + h / 2) / s,
    z: (i % 5 - 2) * 1.8,
  }))

  const links = edgeData.map(e => ({
    source: nodes.find(n => n.id === e.source)!,
    target: nodes.find(n => n.id === e.target)!,
    label: e.label,
  })).filter(l => l.source && l.target)

  // ── Links ──
  links.forEach(link => {
    const p = [
      new THREE.Vector3(link.source.x, link.source.y, link.source.z),
      new THREE.Vector3(link.target.x, link.target.y, link.target.z),
    ]
    const geo = new THREE.BufferGeometry().setFromPoints(p)
    const mat = new THREE.LineBasicMaterial({
      color: 0xc9a84c, transparent: true, opacity: 0.3,
    })
    const line = new THREE.Line(geo, mat)
    scene.add(line)
    linkLines.push(line)

    // ── Particles on link ──
    const count = 2
    const pos = new Float32Array(count * 3)
    const pGeo = new THREE.BufferGeometry()
    pGeo.setAttribute('position', new THREE.BufferAttribute(pos, 3))
    const pMat = new THREE.PointsMaterial({
      color: 0xc9a84c, size: 0.25, transparent: true, opacity: 0.6,
    })
    const points = new THREE.Points(pGeo, pMat)
    scene.add(points)

    const prog = Array.from({ length: count }, () => Math.random())
    const spd = Array.from({ length: count }, () => 0.003 + Math.random() * 0.005)

    particleUpdates.push(() => {
      const a = points.geometry.attributes.position.array as Float32Array
      for (let i = 0; i < count; i++) {
        prog[i] += spd[i]
        if (prog[i] > 1) prog[i] = 0
        const t = prog[i]
        a[i * 3] = link.source.x + (link.target.x - link.source.x) * t
        a[i * 3 + 1] = link.source.y + (link.target.y - link.source.y) * t
        a[i * 3 + 2] = link.source.z + (link.target.z - link.source.z) * t
      }
      points.geometry.attributes.position.needsUpdate = true
    })
  })

  // ── Nodes ──
  nodes.forEach(n => {
    const color = parseInt(nodeColors[n.type]?.replace('#', '') || '6B7280', 16)
    const r = n.label.length > 8 ? 0.7 : n.label.length > 4 ? 0.9 : 1.1
    const geo = new THREE.SphereGeometry(r, 32, 32)
    const mat = new THREE.MeshPhongMaterial({
      color, emissive: color, emissiveIntensity: 0.15, transparent: true, opacity: 0.92,
    })
    const mesh = new THREE.Mesh(geo, mat)
    mesh.position.set(n.x, n.y, n.z)
    mesh.userData = { id: n.id, link: n.link, search: n.search, label: n.label }
    scene.add(mesh)
    nodeMeshes.push(mesh)

    // ── Label sprite ──
    const canvas = document.createElement('canvas')
    canvas.width = 512
    canvas.height = 96
    const ctx = canvas.getContext('2d')!
    ctx.font = 'bold 32px "Noto Serif SC", "Microsoft YaHei", serif'
    ctx.textAlign = 'center'
    ctx.textBaseline = 'middle'

    const label = n.label.replace('\\n', '\n')
    const lines = label.split('\n')
    const lineH = 38
    const startY = (canvas.height - lines.length * lineH) / 2 + lineH / 2

    lines.forEach((line, i) => {
      const y = startY + i * lineH
      ctx.strokeStyle = 'rgba(0,0,0,0.35)'
      ctx.lineWidth = 4
      ctx.strokeText(line, 256, y)
      ctx.fillStyle = '#ffffff'
      ctx.fillText(line, 256, y)
    })

    const tex = new THREE.CanvasTexture(canvas)
    tex.needsUpdate = true
    const sm = new THREE.SpriteMaterial({ map: tex, transparent: true, depthTest: false })
    const sprite = new THREE.Sprite(sm)
    sprite.position.set(n.x, n.y - r - 0.9, n.z)
    sprite.scale.set(5, 5 * (canvas.height / canvas.width), 1)
    scene.add(sprite)
  })
}

function onPointerMove(e: PointerEvent) {
  if (!renderer) return
  const rect = renderer.domElement.getBoundingClientRect()
  mouse.x = ((e.clientX - rect.left) / rect.width) * 2 - 1
  mouse.y = -((e.clientY - rect.top) / rect.height) * 2 + 1

  raycaster.setFromCamera(mouse, camera)
  const hits = raycaster.intersectObjects(nodeMeshes)

  nodeMeshes.forEach(m => {
    const mat = m.material as THREE.MeshPhongMaterial
    mat.emissiveIntensity = 0.15
    mat.opacity = 0.92
  })
  linkLines.forEach(l => { (l.material as THREE.LineBasicMaterial).opacity = 0.3 })

  if (hits.length > 0) {
    const d = hits[0].object.userData as any
    tooltipText.value = d.label
    tooltipPos.value = { x: e.clientX, y: e.clientY - 40 }
    tooltipVisible.value = true
    renderer.domElement.style.cursor = 'pointer'

    const hitId = d.id
    nodeMeshes.forEach(m => {
      if (m.userData.id === hitId) {
        const mat = m.material as THREE.MeshPhongMaterial
        mat.emissiveIntensity = 0.6
        mat.opacity = 1
      }
    })
  } else {
    tooltipVisible.value = false
    renderer.domElement.style.cursor = 'grab'
  }
}

function onClick() {
  if (!renderer) return
  raycaster.setFromCamera(mouse, camera)
  const hits = raycaster.intersectObjects(nodeMeshes)
  if (hits.length > 0) {
    const d = hits[0].object.userData as any
    if (d.link) router.push(d.link)
    else if (d.search) router.push({ path: '/archive', query: { search: d.search } })
  }
}

function onResize() {
  if (!containerRef.value || !renderer) return
  const w = containerRef.value.clientWidth
  const h = containerRef.value.clientHeight
  camera.aspect = w / h
  camera.updateProjectionMatrix()
  renderer.setSize(w, h)
}

function animate() {
  frameId = requestAnimationFrame(animate)
  controls.update()
  particleUpdates.forEach(fn => fn())
  renderer.render(scene, camera)
}

onMounted(() => { if (containerRef.value) initThree() })
onUnmounted(() => {
  cancelAnimationFrame(frameId)
  controls?.dispose()
  renderer?.dispose()
  renderer?.domElement?.remove()
  window.removeEventListener('resize', onResize)
})
</script>

<template>
  <section class="graph-section-3d">
    <h2 class="graph-title">校史知识图谱</h2>
    <p class="graph-subtitle">拖拽旋转 · 滚轮缩放 · 自动旋转 · 悬停查看 · 点击跳转</p>

    <div ref="containerRef" class="graph-container-3d">
      <div class="graph-legend">
        <span class="legend-dot" style="background: #EC4899" /> 团队
        <span class="legend-dot" style="background: #3B82F6" /> 机构
        <span class="legend-dot" style="background: #F59E0B" /> 事件
        <span class="legend-dot" style="background: #10B981" /> 人物
        <span class="legend-dot" style="background: #8B5CF6" /> 地点
        <span class="legend-dot" style="background: #6B7280" /> 概念
        | <span class="legend-dot" style="background: #c9a84c" /> 粒子流
        | <span class="legend-dot" style="background: transparent; border: 2px solid #c9a84c;" /> 自动旋转
      </div>
    </div>

    <transition name="fade">
      <div v-if="tooltipVisible" class="graph-tooltip" :style="{ left: tooltipPos.x + 'px', top: tooltipPos.y + 'px' }">
        {{ tooltipText }}
      </div>
    </transition>
  </section>
</template>

<style scoped>
.graph-section-3d {
  max-width: 960px;
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
.graph-container-3d {
  position: relative;
  width: 100%;
  height: 560px;
  background: #f5f0e8;
  background-image:
    radial-gradient(circle at 20% 50%, rgba(201,168,76,0.06) 0%, transparent 50%),
    radial-gradient(circle at 80% 50%, rgba(59,130,246,0.06) 0%, transparent 50%);
  border-radius: var(--radius-lg);
  border: 1px solid var(--color-border-light);
  overflow: hidden;
  touch-action: none;
  cursor: grab;
}
.graph-container-3d:active { cursor: grabbing; }
.graph-container-3d :deep(canvas) { display: block; width: 100% !important; height: 100% !important; }

.graph-legend {
  position: absolute;
  bottom: var(--space-md);
  left: 50%;
  transform: translateX(-50%);
  display: flex;
  align-items: center;
  gap: var(--space-sm);
  font-family: var(--font-sans);
  font-size: 0.75rem;
  color: var(--color-text-secondary);
  background: rgba(255,255,255,0.88);
  padding: var(--space-xs) var(--space-md);
  border-radius: var(--radius-pill);
  box-shadow: var(--shadow-sm);
  backdrop-filter: blur(4px);
  white-space: nowrap;
  flex-wrap: wrap;
  justify-content: center;
}
.legend-dot {
  display: inline-block; width: 10px; height: 10px;
  border-radius: 50%; vertical-align: middle;
}

.graph-tooltip {
  position: fixed;
  background: rgba(0,0,0,0.75);
  color: #fff;
  font-family: var(--font-sans);
  font-size: 0.8rem;
  padding: 4px 12px;
  border-radius: var(--radius-pill);
  pointer-events: none;
  z-index: 1000;
  white-space: nowrap;
  transform: translateX(-50%);
}
.fade-enter-active, .fade-leave-active { transition: opacity 0.15s; }
.fade-enter-from, .fade-leave-to { opacity: 0; }

@media (max-width: 768px) {
  .graph-container-3d { height: 400px; }
}
</style>
