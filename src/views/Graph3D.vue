<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'
import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'
import { nodes as nodeData, edges as edgeData, nodeColors } from '@/data/knowledgeGraph'
const containerRef = ref<HTMLElement | null>(null)
const selectedId = ref<string | null>(null)
const infoPanel = ref<{ id: string; label: string; type: string } | null>(null)

let scene: THREE.Scene | null = null
let camera: THREE.PerspectiveCamera | null = null
let renderer: THREE.WebGLRenderer | null = null
let controls: OrbitControls | null = null
let animId: number | null = null
let nodeMeshes: THREE.Mesh[] = []
let edgeLines: THREE.Line[] = []
let labels: THREE.Sprite[] = []

function getColor(type: string): number {
  const map: Record<string, string> = nodeColors
  return new THREE.Color(map[type] || '#6B7280').getHex()
}

// 创建文本标签精灵
function makeLabel(text: string): THREE.Sprite {
  const canvas = document.createElement('canvas')
  const ctx = canvas.getContext('2d')!
  canvas.width = 256
  canvas.height = 128
  ctx.clearRect(0, 0, 256, 128)

  // 背景
  ctx.fillStyle = 'rgba(0,0,0,0.5)'
  ctx.beginPath()
  ctx.roundRect(8, 20, 240, 88, 12)
  ctx.fill()

  // 文字
  const lines = text.split('\\n')
  ctx.textAlign = 'center'
  ctx.textBaseline = 'middle'
  ctx.fillStyle = '#fff'
  lines.forEach((line, i) => {
    ctx.font = 'bold 28px "Noto Serif SC", serif'
    ctx.fillText(line, 128, 64 + (i - (lines.length - 1) / 2) * 34)
  })

  const tex = new THREE.CanvasTexture(canvas)
  tex.minFilter = THREE.LinearFilter
  const mat = new THREE.SpriteMaterial({ map: tex, transparent: true, depthWrite: false })
  const sprite = new THREE.Sprite(mat)
  sprite.scale.set(80, 40, 1)
  return sprite
}

onMounted(() => {
  if (!containerRef.value) return

  const rect = containerRef.value.getBoundingClientRect()
  const w = rect.width
  const h = rect.height

  // 场景
  scene = new THREE.Scene()
  scene.background = new THREE.Color(0x1a1a2e)

  // 相机
  camera = new THREE.PerspectiveCamera(45, w / h, 1, 2000)
  camera.position.set(300, 200, 400)
  camera.lookAt(0, 0, 0)

  // 渲染器
  renderer = new THREE.WebGLRenderer({ antialias: true })
  renderer.setSize(w, h)
  renderer.setPixelRatio(Math.min(devicePixelRatio, 2))
  renderer.shadowMap.enabled = false
  containerRef.value.appendChild(renderer.domElement)

  // 控制器
  controls = new OrbitControls(camera, renderer.domElement)
  controls.enableDamping = true
  controls.dampingFactor = 0.08
  controls.autoRotate = true
  controls.autoRotateSpeed = 0.8
  controls.minDistance = 100
  controls.maxDistance = 800
  controls.target.set(0, 0, 0)

  // 环境光
  const ambientLight = new THREE.AmbientLight(0x404060, 0.6)
  scene.add(ambientLight)
  const dirLight = new THREE.DirectionalLight(0xffffff, 1.2)
  dirLight.position.set(200, 400, 300)
  scene.add(dirLight)
  const backLight = new THREE.DirectionalLight(0x8888ff, 0.3)
  backLight.position.set(-200, -100, -300)
  scene.add(backLight)

  // 星空背景
  const starsGeo = new THREE.BufferGeometry()
  const starCount = 2000
  const starPos = new Float32Array(starCount * 3)
  for (let i = 0; i < starCount * 3; i++) starPos[i] = (Math.random() - 0.5) * 2000
  starsGeo.setAttribute('position', new THREE.BufferAttribute(starPos, 3))
  const starMat = new THREE.PointsMaterial({ color: 0xffffff, size: 0.8, transparent: true, opacity: 0.6 })
  const stars = new THREE.Points(starsGeo, starMat)
  scene.add(stars)

  // 放置节点在 3D 球面上
  const count = nodeData.length
  const radius = 180
  const positions: THREE.Vector3[] = []

  nodeData.forEach((d, i) => {
    // 用斐波那契球面均匀分布
    const phi = Math.acos(1 - 2 * (i + 0.5) / count)
    const theta = Math.PI * (1 + Math.sqrt(5)) * i
    const x = radius * Math.sin(phi) * Math.cos(theta)
    const y = radius * Math.sin(phi) * Math.sin(theta) * 0.6 // 压扁一点
    const z = radius * Math.cos(phi)
    positions.push(new THREE.Vector3(x, y, z))

    // 节点球体
    const color = getColor(d.type)
    const sphereMat = new THREE.MeshPhysicalMaterial({
      color, metalness: 0.1, roughness: 0.3,
      emissive: color, emissiveIntensity: 0.08,
    })
    const sphere = new THREE.Mesh(new THREE.SphereGeometry(8, 24, 24), sphereMat)
    sphere.position.set(x, y, z)
    sphere.userData = { id: d.id, label: d.label, type: d.type }
    scene!.add(sphere)
    nodeMeshes.push(sphere)

    // 光晕
    const glowMat = new THREE.MeshBasicMaterial({
      color, transparent: true, opacity: 0.1,
    })
    const glow = new THREE.Mesh(new THREE.SphereGeometry(14, 16, 16), glowMat)
    glow.position.set(x, y, z)
    scene!.add(glow)

    // 标签精灵
    const sprite = makeLabel(d.label)
    sprite.position.set(x, y - 18, z)
    scene!.add(sprite)
    labels.push(sprite)
  })

  // 连线
  edgeData.forEach(e => {
    const srcNode = nodeData.find(n => n.id === e.source)
    const tgtNode = nodeData.find(n => n.id === e.target)
    if (!srcNode || !tgtNode) return
    const si = nodeData.indexOf(srcNode)
    const ti = nodeData.indexOf(tgtNode)
    if (si < 0 || ti < 0) return
    const p1 = positions[si]
    const p2 = positions[ti]
    if (!p1 || !p2) return

    const points: THREE.Vector3[] = [p1, p2]
    const geo = new THREE.BufferGeometry().setFromPoints(points)
    const mat = new THREE.LineBasicMaterial({
      color: 0xffffff, transparent: true, opacity: 0.15,
    })
    const line = new THREE.Line(geo, mat)
    scene!.add(line)
    edgeLines.push(line)
  })

  // 动画循环
  function animate() {
    animId = requestAnimationFrame(animate)
    controls!.update()
    renderer!.render(scene!, camera!)
  }
  animate()

  // 点击拾取
  const raycaster = new THREE.Raycaster()
  const pointer = new THREE.Vector2()
  renderer.domElement.addEventListener('click', (event) => {
    const rect2 = renderer!.domElement.getBoundingClientRect()
    pointer.x = ((event.clientX - rect2.left) / rect2.width) * 2 - 1
    pointer.y = -((event.clientY - rect2.top) / rect2.height) * 2 + 1
    raycaster.setFromCamera(pointer, camera!)
    const intersects = raycaster.intersectObjects(nodeMeshes)
    if (intersects.length > 0) {
      const obj = intersects[0].object
      const data = obj.userData as { id: string; label: string; type: string }
      selectedId.value = data.id
      infoPanel.value = data
      // 高亮选中节点
      nodeMeshes.forEach(m => {
        const mat = m.material as THREE.MeshPhysicalMaterial
        mat.emissiveIntensity = m.userData.id === data.id ? 0.6 : 0.08
      })
      controls!.autoRotate = false
    } else {
      selectedId.value = null
      infoPanel.value = null
      nodeMeshes.forEach(m => {
        const mat = m.material as THREE.MeshPhysicalMaterial
        mat.emissiveIntensity = 0.08
      })
      controls!.autoRotate = true
    }
  })
})

onUnmounted(() => {
  if (animId) cancelAnimationFrame(animId)
  controls?.dispose()
  renderer?.dispose()
  scene?.clear()
  if (renderer && containerRef.value) {
    containerRef.value.removeChild(renderer.domElement)
  }
  nodeMeshes = []
  edgeLines = []
  labels = []
})

function resumeRotate() {
  if (controls) controls.autoRotate = true
}
</script>

<template>
  <div class="three-graph-page">
    <div class="page-header">
      <h1>🌐 校史知识图谱 · 3D</h1>
      <p class="page-subtitle">拖拽旋转 · 滚轮缩放 · 点击节点查看详情 · 自动旋转中</p>
    </div>

    <div ref="containerRef" class="three-container" />

    <!-- 信息面板 -->
    <Transition name="slide">
      <div v-if="infoPanel" class="info-panel">
        <button class="info-close" @click="infoPanel = null; resumeRotate()">&times;</button>
        <div class="info-type">{{ infoPanel.type }}</div>
        <div class="info-label">{{ infoPanel.label.replace('\\n', ' ') }}</div>
        <div class="info-id">{{ infoPanel.id }}</div>
        <div v-if="infoPanel.id === 'jinmen'" class="info-link">
          前往 <a href="#/about">关于实践 →</a>
        </div>
        <div v-if="infoPanel.id === 'archive'" class="info-link">
          前往 <a href="#/archive">数字档案库 →</a>
        </div>
        <div v-if="infoPanel.id === 'push'" class="info-link">
          前往 <a href="#/push-articles">推送文集 →</a>
        </div>
      </div>
    </Transition>
  </div>
</template>

<style scoped>
.three-graph-page {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 var(--space-md);
  min-height: 80vh;
  display: flex;
  flex-direction: column;
}

.page-header {
  margin-bottom: var(--space-md);
  flex-shrink: 0;
}

.page-header h1 {
  font-size: 1.4rem;
  color: var(--color-primary-dark);
}

.page-subtitle {
  font-family: var(--font-sans);
  font-size: 0.85rem;
  color: var(--color-text-secondary);
  margin-top: var(--space-xs);
}

.three-container {
  flex: 1;
  min-height: 500px;
  border-radius: var(--radius-lg);
  overflow: hidden;
  background: #1a1a2e;
  position: relative;
}

/* 信息面板 */
.info-panel {
  position: fixed;
  bottom: var(--space-lg);
  left: 50%;
  transform: translateX(-50%);
  background: rgba(0, 0, 0, 0.85);
  backdrop-filter: blur(12px);
  color: #fff;
  padding: var(--space-md) var(--space-lg);
  border-radius: var(--radius-lg);
  min-width: 240px;
  max-width: 360px;
  text-align: center;
  z-index: 100;
  border: 1px solid rgba(255,255,255,0.1);
}

.info-close {
  position: absolute;
  top: var(--space-xs);
  right: var(--space-sm);
  background: none;
  border: none;
  color: rgba(255,255,255,0.5);
  font-size: 1.2rem;
  cursor: pointer;
  padding: var(--space-xs);
}

.info-type {
  font-family: var(--font-sans);
  font-size: 0.7rem;
  text-transform: uppercase;
  letter-spacing: 2px;
  color: var(--color-gold);
  margin-bottom: var(--space-xs);
}

.info-label {
  font-size: 1.1rem;
  font-weight: 700;
  margin-bottom: var(--space-xs);
}

.info-id {
  font-family: monospace;
  font-size: 0.75rem;
  color: rgba(255,255,255,0.4);
  margin-bottom: var(--space-sm);
}

.info-link {
  font-family: var(--font-sans);
  font-size: 0.85rem;
}

.info-link a {
  color: var(--color-gold);
  text-decoration: underline;
}

/* 进出动画 */
.slide-enter-active, .slide-leave-active {
  transition: all 0.3s ease;
}
.slide-enter-from, .slide-leave-to {
  opacity: 0;
  transform: translateX(-50%) translateY(20px);
}
</style>
