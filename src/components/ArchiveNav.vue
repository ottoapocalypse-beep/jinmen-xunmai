<script setup lang="ts">
import { useRoute } from 'vue-router'
import { siteConfig, navItems } from '@/data/site'
import NavIcon from '@/components/NavIcon.vue'

defineProps<{ open: boolean }>()
const emit = defineEmits<{ close: [] }>()
const route = useRoute()

function isActive(path: string) {
  if (path === '/') return route.path === '/'
  return route.path.startsWith(path)
}
</script>

<template>
  <nav class="archive-nav" :class="{ open }">
    <div class="nav-header">
      <div class="nav-logo">
        <img src="/logo.jpg" alt="津门寻脉队徽" />
      </div>
      <div class="nav-title">{{ siteConfig.title }}</div>
      <div class="nav-title-en">{{ siteConfig.titleEn }}</div>
    </div>

    <div class="nav-list">
      <router-link
        v-for="item in navItems"
        :key="item.path"
        :to="item.path"
        class="nav-item"
        :class="{ active: isActive(item.path) }"
        @click="emit('close')"
      >
        <NavIcon :name="item.icon" class="nav-icon" />
        <span class="nav-label">
          <span>{{ item.label }}</span>
          <span class="nav-label-en">{{ item.labelEn }}</span>
        </span>
      </router-link>
    </div>

    <div class="nav-footer">
      © {{ siteConfig.year }} {{ siteConfig.teamShort }}
    </div>
  </nav>
</template>
