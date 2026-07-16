<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'

/** 轮播项：bg 可为 CSS 渐变/图片 URL，也可用 picsum 占位 */
export interface CarouselSlide {
  bg: string
  /** 可选：给该图片的简短描述（用于 aria-label） */
  label?: string
}

const props = withDefaults(
  defineProps<{
    slides: CarouselSlide[]
    interval?: number
  }>(),
  { interval: 5000 },
)

const current = ref(0)
let timer: ReturnType<typeof setInterval> | null = null

function start() {
  stop()
  timer = setInterval(() => {
    current.value = (current.value + 1) % props.slides.length
  }, props.interval)
}

function stop() {
  if (timer) {
    clearInterval(timer)
    timer = null
  }
}

onMounted(() => {
  if (props.slides.length > 1) start()
})

onUnmounted(() => stop())
</script>

<template>
  <div
    class="carousel"
    role="region"
    aria-label="背景轮播"
    @mouseenter="stop"
    @mouseleave="start"
  >
    <!-- 每一帧背景 -->
    <div
      v-for="(slide, i) in slides"
      :key="i"
      class="carousel-slide"
      :class="{ active: i === current }"
      :style="{ backgroundImage: slide.bg }"
      :aria-label="slide.label"
    />

    <!-- 渐变遮罩（上暗下亮过渡） -->
    <div class="carousel-overlay" />

    <!-- 指示器圆点 -->
    <div v-if="slides.length > 1" class="carousel-dots">
      <button
        v-for="(_, i) in slides"
        :key="i"
        class="carousel-dot"
        :class="{ active: i === current }"
        :aria-label="`切换到第 ${i + 1} 张`"
        @click="current = i; start()"
      />
    </div>

    <!-- 插槽：承载 Hero 内容 -->
    <div class="carousel-content">
      <slot />
    </div>
  </div>
</template>

<style scoped>
.carousel {
  position: relative;
  width: 100%;
  min-height: 520px;
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
}

/* 每一帧 */
.carousel-slide {
  position: absolute;
  inset: 0;
  background-size: cover;
  background-position: center;
  opacity: 0;
  transition: opacity 1.2s ease;
  will-change: opacity;
}

.carousel-slide.active {
  opacity: 1;
}

/* 渐变遮罩：从深蓝渐变到透明，让底部与浅色内容衔接 */
.carousel-overlay {
  position: absolute;
  inset: 0;
  background: linear-gradient(
    180deg,
    rgba(2, 45, 92, 0.7) 0%,
    rgba(2, 45, 92, 0.35) 50%,
    rgba(248, 246, 241, 0.95) 100%
  );
  pointer-events: none;
}

/* 内容层 */
.carousel-content {
  position: relative;
  z-index: 2;
  width: 100%;
  max-width: var(--content-max-width);
  padding: var(--space-3xl) var(--space-xl);
  text-align: center;
}

/* 圆点指示器 */
.carousel-dots {
  position: absolute;
  bottom: 60px;
  left: 50%;
  transform: translateX(-50%);
  display: flex;
  gap: 8px;
  z-index: 3;
}

.carousel-dot {
  width: 10px;
  height: 10px;
  border-radius: 50%;
  border: 2px solid rgba(255, 255, 255, 0.5);
  background: transparent;
  cursor: pointer;
  transition: all 0.3s ease;
  padding: 0;
}

.carousel-dot.active {
  background: var(--color-gold);
  border-color: var(--color-gold);
  transform: scale(1.2);
}

@media (max-width: 768px) {
  .carousel {
    min-height: 400px;
  }

  .carousel-content {
    padding: var(--space-2xl) var(--space-md);
  }

  .carousel-dots {
    bottom: 50px;
  }
}
</style>
