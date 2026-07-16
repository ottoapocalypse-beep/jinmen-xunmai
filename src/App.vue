<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'
import { useRoute } from 'vue-router'
import ArchiveNav from '@/components/ArchiveNav.vue'
import { navItems } from '@/data/site'

const route = useRoute()
const navOpen = ref(false)
const mx = ref(50)
const my = ref(50)

function toggleNav() { navOpen.value = !navOpen.value; lockScroll(navOpen.value) }
function closeNav() { navOpen.value = false; lockScroll(false) }
function lockScroll(v: boolean) {
  if (v) document.body.classList.add('nav-open')
  else document.body.classList.remove('nav-open')
}

function onMouseMove(e: MouseEvent) {
  mx.value = (e.clientX / window.innerWidth) * 100
  my.value = (e.clientY / window.innerHeight) * 100
}

let mql: MediaQueryList | null = null
function handleResize(e: MediaQueryListEvent | MediaQueryList) {
  if (!e.matches) { navOpen.value = false; lockScroll(false) }
}

onMounted(() => {
  mql = window.matchMedia('(max-width: 768px)')
  mql.addEventListener('change', handleResize as EventListener)
  window.addEventListener('mousemove', onMouseMove)
})
onUnmounted(() => {
  mql?.removeEventListener('change', handleResize as EventListener)
  window.removeEventListener('mousemove', onMouseMove)
})
</script>

<template>
  <!-- 场景光晕（跟随鼠标） -->
  <div
    class="ambient-spotlight"
    :style="{ '--mx': mx + '%', '--my': my + '%' }"
  />

  <!-- 移动端顶栏 -->
  <div class="mobile-topbar">
    <button @click="toggleNav" aria-label="打开导航">☰</button>
    <span>{{ navItems.find(n => route.path.startsWith(n.path))?.label || '满井溯源' }}</span>
  </div>

  <!-- 导航遮罩 -->
  <div class="nav-overlay" :class="{ open: navOpen }" @click="closeNav" />

  <!-- 导航面板 -->
  <ArchiveNav :open="navOpen" @close="closeNav" />

  <!-- 主内容 -->
  <main class="app-main">
    <div class="main-content">
      <router-view v-slot="{ Component }">
        <transition name="page" mode="out-in">
          <component :is="Component" />
        </transition>
      </router-view>
    </div>
  </main>
</template>

<style scoped>
.mobile-topbar {
  display: none;
}
@media (max-width: 768px) {
  .mobile-topbar {
    display: flex;
    align-items: center;
    gap: var(--space-md);
    height: 48px;
    padding: 0 var(--space-md);
    background: var(--color-bg);
    border-bottom: 1px solid rgba(201, 168, 76, 0.08);
    position: sticky;
    top: 0;
    z-index: 30;
  }
  .mobile-topbar button {
    font-size: 1.2rem;
    color: var(--color-gold-light);
  }
  .mobile-topbar span {
    font-family: var(--font-display);
    font-size: 0.9rem;
    color: var(--color-gold-light);
  }
}
</style>
