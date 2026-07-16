<script setup lang="ts">
</script>

<template>
  <div class="panorama-page">
    <div class="page-header">
      <h1>720°全景</h1>
      <div class="page-title-en">VR Panorama</div>
      <p>北京科技大学校史馆 · 沉浸式全景漫游</p>
    </div>

    <div class="panorama-wrapper">
      <iframe
        src="https://www.720yun.com/vr/5d2jkr4uOy1"
        allowfullscreen
        allow="autoplay; fullscreen; web-share; xr-spatial-tracking"
        loading="lazy"
        referrerpolicy="no-referrer-when-downgrade"
        title="北京科技大学校史馆全景">
      </iframe>
    </div>
    <p class="panorama-credit">全景来源：北京科技大学校史馆</p>
  </div>
</template>

<style scoped>
.panorama-page {
  max-width: var(--content-max-width);
  margin: 0 auto;
}

.panorama-wrapper {
  position: relative;
  width: 100%;
  height: 0;
  padding-bottom: 66.67%; /* 3:2 比例，全景图更适合偏方一些 */
  background: var(--color-bg-alt);
  overflow: hidden;
  box-shadow: var(--shadow-md);
}

.panorama-wrapper iframe {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  border: none;
}

.panorama-credit {
  margin-top: var(--space-sm);
  font-family: var(--font-sans);
  font-size: 0.8rem;
  color: var(--color-text-light);
  text-align: right;
}
</style>
