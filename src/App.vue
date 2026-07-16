<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'
import AppSidebar from '@/components/AppSidebar.vue'
import AppTopbar from '@/components/AppTopbar.vue'
import AppFooter from '@/components/AppFooter.vue'

const sidebarOpen = ref(false)

function toggleSidebar() {
  sidebarOpen.value = !sidebarOpen.value
  updateScrollLock(sidebarOpen.value)
}

function closeSidebar() {
  sidebarOpen.value = false
  updateScrollLock(false)
}

function updateScrollLock(locked: boolean) {
  if (locked) {
    document.body.classList.add('sidebar-open')
  } else {
    document.body.classList.remove('sidebar-open')
  }
}

let mql: MediaQueryList | null = null
function handleResize(e: MediaQueryListEvent | MediaQueryList) {
  if (!e.matches) {
    sidebarOpen.value = false
    updateScrollLock(false)
  }
}

onMounted(() => {
  mql = window.matchMedia('(max-width: 768px)')
  mql.addEventListener('change', handleResize as EventListener)
})

onUnmounted(() => {
  mql?.removeEventListener('change', handleResize as EventListener)
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
