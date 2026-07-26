<script setup lang="ts">
</script>

<template>
  <div class="map-page">
    <div class="page-header">
      <h1>生活地图</h1>
      <div class="page-title-en">Campus Map</div>
      <p>校园GIS · 数字孪生</p>
    </div>

    <div class="map-wrapper">
      <iframe
        src="https://map.ustb.edu.cn/2d/"
        class="map-iframe"
        title="北京科技大学校园地图"
        allowfullscreen
        loading="lazy"
        referrerpolicy="no-referrer"
      />
    </div>

    <div class="map-footer">
      <p>数据来源：<a href="https://map.ustb.edu.cn/2d/" target="_blank" rel="noopener">北京科技大学智慧校园GIS可视化平台</a></p>
    </div>
  </div>
</template>

<style scoped>
.map-page {
  max-width: var(--content-max-width);
  margin: 0 auto;
}

.map-wrapper {
  width: 100%;
  height: 600px;
  border-radius: var(--radius-lg);
  overflow: hidden;
  box-shadow: var(--shadow-md);
  border: 1px solid var(--color-border);
  background: #1a1a2e;
}

.map-iframe {
  width: 100%;
  height: 100%;
  border: none;
}

.map-footer {
  margin-top: var(--space-sm);
  text-align: center;
}

.map-footer p {
  font-family: var(--font-sans);
  font-size: 0.8rem;
  color: var(--color-text-light);
}

.map-footer a {
  color: var(--color-gold-dark);
  text-decoration: none;
}

.map-footer a:hover {
  text-decoration: underline;
}

@media (max-width: 768px) {
  .map-wrapper {
    height: 400px;
  }
}
</style>
