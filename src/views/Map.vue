<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'
import L from 'leaflet'
import 'leaflet/dist/leaflet.css'

const mapContainer = ref<HTMLElement | null>(null)
let map: L.Map | null = null

onMounted(() => {
  if (!mapContainer.value) return

  // 创建 Leaflet 地图
  map = L.map(mapContainer.value, {
    crs: L.CRS.Simple,
    zoomControl: true,
    attributionControl: false,
    minZoom: -3,
    maxZoom: 1,
    zoomSnap: 0.5,
    maxBoundsViscosity: 1,
  })

  // zoom4 校园地图 (3072×3072)
  const MAP_SIZE = 3072
  const imageBounds: L.LatLngBoundsExpression = [[0, 0], [MAP_SIZE, MAP_SIZE]]
  const overlay = L.imageOverlay('/jinmen-xunmai/campus_map.jpg', imageBounds)
  overlay.addTo(map)
  map.fitBounds(imageBounds)
  map.setMaxBounds(imageBounds)

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

:deep(.leaflet-container) {
  font-family: var(--font-sans);
}

@media (max-width: 768px) {
  .leaflet-map {
    height: 360px;
  }
}
</style>
