<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'
import L from 'leaflet'
import 'leaflet/dist/leaflet.css'
import { archiveItems } from '@/data/archive'

const mapContainer = ref<HTMLElement | null>(null)
let map: L.Map | null = null

// ---- 瓦片映射 ----
// 我们的瓦片: zoom3 (最高清晰度), x=8-16, y=20-28 (9×9 网格)
// Leaflet CRS.Simple: 瓦片(0,0) 映射到我们的 (8,20)
const TILE_SIZE = 256
const X_OFFSET = 8
const Y_OFFSET = 20
const TILES_X = 9  // x=8..16
const TILES_Y = 9  // y=20..28
const MAP_PX_W = TILES_X * TILE_SIZE  // 2304
const MAP_PX_H = TILES_Y * TILE_SIZE  // 2304

// ---- 今昔对比点位 ----
const comparisonPoints = [
  {
    id: 'cmp-library',
    name: '图书馆',
    desc: '校园的知识中心，见证了无数学子的成长。',
    pixelX: 1100, pixelY: 1000,
    archiveId: null,
  },
  {
    id: 'cmp-metallurgy',
    name: '冶金生态楼',
    desc: '材料学科的核心楼宇，传承自北京钢铁学院的冶金基因。',
    pixelX: 1400, pixelY: 800,
    archiveId: 'arch-inst-6',
  },
  {
    id: 'cmp-museum',
    name: '校史馆',
    desc: '承载北科大建校70余年历史的校史馆。',
    pixelX: 800, pixelY: 1100,
    archiveId: 'arch-inst-7',
  },
  {
    id: 'cmp-tech',
    name: '科技楼',
    desc: '学校科研创新的重要基地。',
    pixelX: 1300, pixelY: 1300,
    archiveId: null,
  },
  {
    id: 'cmp-gym',
    name: '运动场',
    desc: '体育工作长盛不衰，女篮多次获得全国冠军。',
    pixelX: 900, pixelY: 1600,
    archiveId: null,
  },
  {
    id: 'cmp-garden',
    name: '五环广场',
    desc: '校园文化活动的中心地带。',
    pixelX: 1100, pixelY: 1400,
    archiveId: null,
  },
  {
    id: 'cmp-dining',
    name: '鸿博园餐厅',
    desc: '师生日常就餐的主要食堂之一。',
    pixelX: 700, pixelY: 1300,
    archiveId: null,
  },
  {
    id: 'cmp-manjing',
    name: '满井村旧址',
    desc: '北京科技大学所在地，原为京师八景之一"蓟门烟树"所在。建校初期师生在此艰苦创业。',
    pixelX: 1600, pixelY: 700,
    archiveId: 'arch-concept-4',
  },
]

function getArchiveTitle(id: string | null): string {
  if (!id) return ''
  const item = archiveItems.find(i => i.id === id)
  return item ? item.title : ''
}

onMounted(() => {
  if (!mapContainer.value) return

  // 创建 Leaflet 地图 (CRS.Simple = 像素坐标系)
  map = L.map(mapContainer.value, {
    crs: L.CRS.Simple,
    minZoom: -1,
    maxZoom: 1,
    zoom: 0,
    zoomControl: true,
    attributionControl: false,
  })

  // 地图边界 (像素)
  const bounds: L.LatLngBoundsExpression = [[0, 0], [MAP_PX_H, MAP_PX_W]]
  map.fitBounds(bounds)

  // 自定义瓦片图层
  class CampusTileLayer extends L.GridLayer {
    createTile(coords: L.Coords, done: L.DoneCallback) {
      const ourX = coords.x + X_OFFSET
      const ourY = coords.y + Y_OFFSET
      const src = `/jinmen-xunmai/map-tiles/zoom3/${ourX}_${ourY}.jpg`
      const tile = document.createElement('img')
      tile.src = src
      tile.alt = ''
      tile.setAttribute('role', 'presentation')
      tile.onload = () => { done(undefined, tile) }
      tile.onerror = () => { done(undefined, tile) }
      return tile
    }
  }

  const tileLayer = new CampusTileLayer({
    tileSize: TILE_SIZE,
    minZoom: -1,
    maxZoom: 1,
  })
  map.addLayer(tileLayer)

  // 添加今昔对比标记
  comparisonPoints.forEach(p => {
    const latlng: L.LatLngTuple = [p.pixelY, p.pixelX]

    const icon = L.divIcon({
      className: 'cmp-marker',
      html: `<div class="cmp-marker-inner">
        <span class="cmp-marker-icon">📍</span>
        <span class="cmp-marker-label">${p.name}</span>
      </div>`,
      iconSize: [120, 36],
      iconAnchor: [60, 36],
    })

    const marker = L.marker(latlng, { icon })
    marker.bindPopup(`
      <div class="cmp-popup">
        <h3>${p.name}</h3>
        <p>${p.desc}</p>
        ${p.archiveId ? `<p class="cmp-link">📖 <a href="#/archive/${p.archiveId}">查看档案：${getArchiveTitle(p.archiveId)}</a></p>` : ''}
        <p class="cmp-hint">📍 当前位置</p>
      </div>
    `)
    marker.addTo(map!)
  })

  // 适应标记视图
  setTimeout(() => map!.invalidateSize(), 100)
})

onUnmounted(() => {
  map?.remove()
  map = null
})
</script>

<template>
  <div class="map-page">
    <div class="page-header">
      <h1>生活地图</h1>
      <div class="page-title-en">Campus Map</div>
      <p>今昔对比 · 校园足迹</p>
    </div>

    <div ref="mapContainer" class="leaflet-map"></div>

    <div class="map-legend">
      <h3>📍 今昔对比点位</h3>
      <div class="legend-grid">
        <div v-for="p in comparisonPoints" :key="p.id" class="legend-item">
          <span class="legend-dot">📍</span>
          <div class="legend-info">
            <strong>{{ p.name }}</strong>
            <p>{{ p.desc }}</p>
            <a v-if="p.archiveId" :href="'#/archive/' + p.archiveId" class="legend-link">查看档案 →</a>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.map-page {
  max-width: var(--content-max-width);
  margin: 0 auto;
}

.leaflet-map {
  width: 100%;
  height: 560px;
  border-radius: var(--radius-lg);
  overflow: hidden;
  box-shadow: var(--shadow-md);
  border: 1px solid var(--color-border);
  background: #1a1a2e;
}

/* 标记样式 */
:deep(.cmp-marker) {
  background: none !important;
  border: none !important;
}

:deep(.cmp-marker-inner) {
  display: flex;
  align-items: center;
  gap: 4px;
  background: rgba(0,0,0,0.7);
  color: #fff;
  padding: 4px 10px;
  border-radius: 20px;
  font-size: 0.8rem;
  white-space: nowrap;
  backdrop-filter: blur(4px);
  border: 1px solid rgba(255,255,255,0.2);
  transition: transform var(--transition-fast);
  cursor: pointer;
}

:deep(.cmp-marker-inner:hover) {
  transform: scale(1.05);
}

:deep(.cmp-marker-icon) {
  font-size: 1rem;
}

:deep(.cmp-marker-label) {
  font-family: var(--font-sans);
  font-weight: 600;
}

/* 弹出框样式 */
:deep(.cmp-popup) {
  font-family: var(--font-sans);
  max-width: 260px;
}

:deep(.cmp-popup h3) {
  margin: 0 0 6px;
  color: var(--color-primary-dark);
  font-size: 1rem;
}

:deep(.cmp-popup p) {
  margin: 4px 0;
  font-size: 0.85rem;
  color: var(--color-text-secondary);
  line-height: 1.5;
}

:deep(.cmp-popup .cmp-link) {
  margin-top: 6px;
}

:deep(.cmp-popup .cmp-link a) {
  color: var(--color-gold-dark);
  text-decoration: underline;
  font-weight: 600;
}

:deep(.cmp-popup .cmp-hint) {
  font-size: 0.75rem;
  color: var(--color-text-light);
  margin-top: 4px;
}

/* 图例 */
.map-legend {
  margin-top: var(--space-lg);
  padding: var(--space-lg);
  background: var(--color-bg-card);
  border-radius: var(--radius-lg);
  box-shadow: var(--shadow-sm);
  border: 1px solid var(--color-border-light);
}

.map-legend h3 {
  font-size: 1rem;
  color: var(--color-primary-dark);
  margin-bottom: var(--space-md);
}

.legend-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
  gap: var(--space-sm);
}

.legend-item {
  display: flex;
  gap: var(--space-sm);
  padding: var(--space-sm);
  border-radius: var(--radius-sm);
  transition: background var(--transition-fast);
}

.legend-item:hover {
  background: var(--color-bg-alt);
}

.legend-dot {
  font-size: 1.2rem;
  flex-shrink: 0;
  margin-top: 2px;
}

.legend-info strong {
  display: block;
  font-size: 0.9rem;
  color: var(--color-primary);
  margin-bottom: 2px;
}

.legend-info p {
  font-size: 0.8rem;
  color: var(--color-text-secondary);
  line-height: 1.5;
  margin: 0 0 4px;
}

.legend-link {
  font-size: 0.8rem;
  color: var(--color-gold-dark);
  text-decoration: none;
  font-weight: 600;
}

.legend-link:hover {
  text-decoration: underline;
}

:deep(.leaflet-container) {
  font-family: var(--font-sans);
}

:deep(.leaflet-popup-content-wrapper) {
  border-radius: var(--radius-md);
  box-shadow: var(--shadow-lg);
}

:deep(.leaflet-popup-content) {
  margin: 12px 16px;
  min-width: 200px;
}

@media (max-width: 768px) {
  .leaflet-map {
    height: 360px;
  }
  .legend-grid {
    grid-template-columns: 1fr;
  }
}
</style>
