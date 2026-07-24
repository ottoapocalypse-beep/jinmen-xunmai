<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'
import AppSidebar from '@/components/AppSidebar.vue'
import AppTopbar from '@/components/AppTopbar.vue'
import AppFooter from '@/components/AppFooter.vue'
import { initMouseGlow, initTilt } from '@/utils/effects'

const sidebarOpen = ref(false)

function toggleSidebar() {
  sidebarOpen.value = !sidebarOpen.value
  document.body.classList.toggle('sidebar-open', sidebarOpen.value)
}

function closeSidebar() {
  sidebarOpen.value = false
  document.body.classList.remove('sidebar-open')
}

let mql: MediaQueryList | null = null
function handleResize(e: MediaQueryListEvent | MediaQueryList) {
  if (!e.matches) {
    sidebarOpen.value = false
    document.body.classList.remove('sidebar-open')
  }
}

let cleanupGlow: (() => void) | null = null
let cleanupTilt: (() => void) | null = null

onMounted(() => {
  mql = window.matchMedia('(max-width: 768px)')
  mql.addEventListener('change', handleResize as EventListener)

  // 特效初始化
  cleanupGlow = initMouseGlow(document.body)
  // 延迟初始化 tilt 让 DOM 渲染完成
  setTimeout(() => { const c = initTilt(); if (c) cleanupTilt = c }, 300)
})

onUnmounted(() => {
  mql?.removeEventListener('change', handleResize as EventListener)
  cleanupGlow?.()
  cleanupTilt?.()
})
</script>

<template>
  <div class="app-layout">
    <AppSidebar :open="sidebarOpen" @close="closeSidebar" />
    <div class="sidebar-overlay" :class="{ open: sidebarOpen }" @click="closeSidebar" />
    <AppTopbar @toggle="toggleSidebar" />

    <main class="app-main">
      <div class="main-content">
        <router-view v-slot="{ Component }">
          <transition name="page" mode="out-in">
            <component :is="Component" />
          </transition>
        </router-view>
      </div>
      <AppFooter />
    </main>
  </div>
</template>
