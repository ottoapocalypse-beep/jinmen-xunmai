<script setup lang="ts">
import { useRoute } from 'vue-router'
import { siteConfig, navItems } from '@/data/site'

defineProps<{ open: boolean }>()
const emit = defineEmits<{ close: [] }>()
const route = useRoute()

function isActive(path: string) {
  if (path === '/') return route.path === '/'
  return route.path.startsWith(path)
}
</script>

<template>
  <aside class="app-sidebar" :class="{ open }">
    <div class="sidebar-header">
      <div class="sidebar-logo">🏛️</div>
      <div class="sidebar-title">{{ siteConfig.title }}</div>
      <div class="sidebar-subtitle">{{ siteConfig.titleEn }}</div>
    </div>

    <nav class="sidebar-nav">
      <router-link
        v-for="item in navItems"
        :key="item.path"
        :to="item.path"
        class="nav-item"
        :class="{ active: isActive(item.path) }"
        @click="emit('close')"
      >
        <span class="nav-icon">{{ item.icon }}</span>
        <span class="nav-label">
          <span>{{ item.label }}</span>
          <span class="nav-label-en">{{ item.labelEn }}</span>
        </span>
      </router-link>
    </nav>

    <div class="sidebar-footer">
      © {{ siteConfig.year }} {{ siteConfig.teamShort }}
    </div>
  </aside>
</template>
