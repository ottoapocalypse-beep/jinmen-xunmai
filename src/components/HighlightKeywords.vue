<script setup lang="ts">
import { computed } from 'vue'
import { useRouter } from 'vue-router'
import { keywords } from '@/data/keywords'

const props = defineProps<{
  /** 要扫描的文本 */
  text: string
}>()

const router = useRouter()

/** 构建正则：所有关键词的 terms 合并，按长度降序以避免短词优先匹配 */
const keywordPattern = computed(() => {
  const allTerms = keywords.flatMap(k => k.terms)
  // 按长度降序排列，优先匹配长词
  allTerms.sort((a, b) => b.length - a.length)
  // 转义正则特殊字符
  const escaped = allTerms.map(t => t.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'))
  return new RegExp(`(${escaped.join('|')})`, 'g')
})

/** 查找关键词对应的目标 */
function findEntry(matched: string): { search: string; category?: string } | undefined {
  return keywords.find(k => k.terms.includes(matched))
}

function handleClick(matched: string) {
  const entry = findEntry(matched)
  if (entry) {
    router.push({
      path: '/archive',
      query: { search: entry.search, ...(entry.category ? { category: entry.category } : {}) },
    })
  }
}

/** 将文本分割为普通片段和关键词片段 */
const segments = computed(() => {
  const parts: { text: string; isKeyword: boolean }[] = []
  let lastIndex = 0
  const matches = props.text.matchAll(keywordPattern.value)
  for (const match of matches) {
    const idx = match.index!
    if (idx > lastIndex) {
      parts.push({ text: props.text.slice(lastIndex, idx), isKeyword: false })
    }
    parts.push({ text: match[0], isKeyword: true })
    lastIndex = idx + match[0].length
  }
  if (lastIndex < props.text.length) {
    parts.push({ text: props.text.slice(lastIndex), isKeyword: false })
  }
  return parts
})
</script>

<template>
  <span class="kw-wrapper">
    <template v-for="(seg, i) in segments" :key="i">
      <span v-if="!seg.isKeyword">{{ seg.text }}</span>
      <a
        v-else
        class="kw-link"
        href="#"
        :title="`在档案库中搜索「${seg.text}」`"
        @click.prevent="handleClick(seg.text)"
      >{{ seg.text }}</a>
    </template>
  </span>
</template>

<style scoped>
.kw-link {
  color: var(--color-primary);
  text-decoration: none;
  border-bottom: 1px dashed color-mix(in srgb, var(--color-primary) 40%, transparent);
  cursor: pointer;
  transition: color var(--transition-fast), border-color var(--transition-fast);
}

.kw-link:hover {
  color: var(--color-primary-light);
  border-bottom-color: var(--color-primary-light);
}
</style>