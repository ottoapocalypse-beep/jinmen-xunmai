<script setup lang="ts">
import { computed } from 'vue'
import { icons } from '@/data/icons'

const props = defineProps<{
  name: keyof typeof icons
  size?: number
}>()

const icon = computed(() => icons[props.name])
</script>

<template>
  <svg
    v-if="icon"
    :viewBox="icon.viewBox"
    :width="size ?? 22"
    :height="size ?? 22"
    fill="none"
    stroke="currentColor"
    stroke-width="1.5"
    stroke-linecap="round"
    stroke-linejoin="round"
    class="nav-svg-icon"
  >
    <path v-for="(d, i) in icon.paths" :key="i" :d="d" />
  </svg>
</template>

<style scoped>
.nav-svg-icon {
  flex-shrink: 0;
  display: block;
  transition: stroke var(--transition-fast);
}
</style>
