<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'

const mapContainer = ref<HTMLElement | null>(null)
let map: L.Map | null = null

async function initMap() {
  const L = (await import('leaflet')).default
  await import('leaflet/dist/leaflet.css')

  if (!mapContainer.value) return

  // 使用预拼接的 zoom4 瓦片底图 (2816×2816, 仅本部校区, 细节更丰富)
  map = L.map(mapContainer.value, {
    crs: L.CRS.Simple,
    zoomControl: true,
    attributionControl: false,
  })

  const bounds = L.latLngBounds([0, 0], [2816, 2816])
  const overlay = L.imageOverlay('/jinmen-xunmai/campus_map.jpg', bounds)
  overlay.addTo(map)
  map.fitBounds(bounds)
  map.setMaxBounds(bounds)
}

onMounted(() => { initMap() })
onUnmounted(() => { map?.remove() })
</script>

<template>
  <div class="map-page">
    <div class="page-header">
      <h1>生活地图</h1>
      <div class="page-title-en">Campus Map</div>
      <p>官方瓦片 · 本部校区</p>
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
:deep(.leaflet-container) { font-family: var(--font-sans); }
@media (max-width: 768px) {
  .leaflet-map { height: 360px; }
}
</style>
