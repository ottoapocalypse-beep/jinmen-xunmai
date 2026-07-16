<script setup lang="ts">
import { computed } from 'vue'
import { useRoute } from 'vue-router'
import { siteConfig, navItems } from '@/data/site'

const emit = defineEmits<{ toggle: [] }>()
const route = useRoute()

const currentTitle = computed(() => {
  const item = navItems.find((n: { path: string; label: string }) => {
    if (n.path === '/') return route.path === '/'
    return route.path.startsWith(n.path)
  })
  return item?.label ?? siteConfig.title
})
</script>

<template>
  <header class="app-topbar">
    <button class="topbar-hamburger" @click="emit('toggle')" aria-label="Toggle menu">
      ☰
    </button>
    <span class="topbar-title">{{ currentTitle }}</span>
  </header>
</template>
