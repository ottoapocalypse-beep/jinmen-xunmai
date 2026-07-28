<script setup lang="ts">
import { ref } from 'vue'
import { culturalProducts } from '@/data/culturalProducts'

const modalImg = ref<string | null>(null)
const activeCategory = ref<string>('all')

const categoryIcons: Record<string, string> = {
  badge: '🏅',
  mascot: '🧸',
  emoji: '😊',
  product: '🎨',
}

const categories = [
  { key: 'all', label: '全部' },
  { key: 'badge', label: '队徽' },
  { key: 'mascot', label: '吉祥物' },
  { key: 'emoji', label: '表情包' },
  { key: 'product', label: '文创产品' },
]

const filteredProducts = culturalProducts.filter(p =>
  activeCategory.value === 'all' || p.category === activeCategory.value
)

function openModal(img: string) { modalImg.value = img }
</script>

<template>
  <div class="cultural-page">
    <div class="page-header">
      <h1>文创展示</h1>
      <div class="page-title-en">Cultural Products</div>
      <p>队徽 · 吉祥物 · 表情包 · 文创产品</p>
    </div>

    <!-- 分类切换 -->
    <div class="category-tabs">
      <button v-for="cat in categories" :key="cat.key"
        :class="['category-tab', { active: activeCategory === cat.key }]"
        @click="activeCategory = cat.key">
        {{ cat.label }}
      </button>
    </div>

    <!-- 展示区域 -->
    <div v-for="item in filteredProducts" :key="item.id" class="product-section">
      <div class="section-header">
        <h2>{{ categoryIcons[item.category] }} {{ item.name }}</h2>
        <p class="section-desc">{{ item.description }}</p>
      </div>

      <!-- 图片网格 -->
      <div v-if="item.category === 'badge'" class="badge-grid">
        <div v-for="(img, idx) in item.images" :key="idx" class="badge-item" @click="openModal(img)">
          <img :src="img" :alt="`${item.name} - ${idx + 1}`" class="badge-img" />
        </div>
      </div>

      <div v-else class="gallery-grid">
        <div v-for="(img, idx) in item.images" :key="idx" class="gallery-item" @click="openModal(img)">
          <img :src="img" :alt="`${item.name} - ${idx + 1}`" class="gallery-img" loading="lazy" />
          <div class="gallery-overlay">
            <span class="gallery-index">{{ idx + 1 }}/{{ item.images.length }}</span>
          </div>
        </div>
      </div>
    </div>

    <!-- 空状态 -->
    <div v-if="filteredProducts.length === 0" class="empty-state">
      <div class="empty-icon">🎨</div>
      <div class="empty-text">该分类暂无内容</div>
    </div>

    <!-- 图片查看模态框 -->
    <div v-if="modalImg" class="modal-overlay" @click="modalImg = null">
      <img :src="modalImg" class="modal-img" @click.stop />
      <button class="modal-close" @click="modalImg = null">✕</button>
    </div>
  </div>
</template>

<style scoped>
.cultural-page {
  max-width: var(--content-max-width);
  margin: 0 auto;
}

/* 分类切换 */
.category-tabs {
  display: flex;
  gap: var(--space-xs);
  margin-bottom: var(--space-lg);
  flex-wrap: wrap;
}

.category-tab {
  padding: var(--space-xs) var(--space-md);
  background: var(--color-bg-card);
  border: 1px solid var(--color-border);
  border-radius: var(--radius-md);
  font-family: var(--font-sans);
  font-size: 0.85rem;
  color: var(--color-text-secondary);
  cursor: pointer;
  transition: all var(--transition-fast);
}

.category-tab:hover {
  border-color: var(--color-gold);
  color: var(--color-gold-dark);
}

.category-tab.active {
  background: var(--color-gold);
  color: #fff;
  border-color: var(--color-gold);
}

/* 分区 */
.product-section {
  margin-bottom: var(--space-xl);
}

.section-header {
  margin-bottom: var(--space-md);
}

.section-header h2 {
  font-size: 1.3rem;
  color: var(--color-primary-dark);
  margin-bottom: var(--space-xs);
}

.section-desc {
  font-family: var(--font-sans);
  font-size: 0.9rem;
  color: var(--color-text-secondary);
  line-height: 1.6;
}

/* 队徽专用 - 居中大图 */
.badge-grid {
  display: flex;
  justify-content: center;
  align-items: center;
}

.badge-item {
  max-width: 400px;
  border-radius: var(--radius-lg);
  overflow: hidden;
  cursor: pointer;
  transition: transform var(--transition-fast);
  box-shadow: var(--shadow-md);
}

.badge-item:hover {
  transform: scale(1.02);
}

.badge-img {
  width: 100%;
  height: auto;
  display: block;
}

/* 图文网格 */
.gallery-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(220px, 1fr));
  gap: var(--space-sm);
}

.gallery-item {
  position: relative;
  border-radius: var(--radius-md);
  overflow: hidden;
  cursor: pointer;
  transition: transform var(--transition-fast);
  box-shadow: var(--shadow-sm);
  aspect-ratio: 1;
}

.gallery-item:hover {
  transform: scale(1.03);
}

.gallery-img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  display: block;
}

.gallery-overlay {
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  padding: var(--space-xs);
  background: linear-gradient(transparent, rgba(0,0,0,0.5));
  color: #fff;
  font-size: 0.75rem;
  font-family: var(--font-sans);
  text-align: right;
}

/* 模态框 */
.modal-overlay {
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.85);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
  padding: var(--space-md);
  cursor: pointer;
}

.modal-img {
  max-width: 90vw;
  max-height: 90vh;
  object-fit: contain;
  border-radius: var(--radius-md);
  cursor: default;
}

.modal-close {
  position: fixed;
  top: var(--space-md);
  right: var(--space-md);
  width: 40px;
  height: 40px;
  border-radius: 50%;
  border: none;
  background: rgba(255,255,255,0.15);
  color: #fff;
  font-size: 1.2rem;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: background var(--transition-fast);
}

.modal-close:hover {
  background: rgba(255,255,255,0.3);
}

/* 空状态 */
.empty-state {
  text-align: center;
  padding: var(--space-3xl);
  color: var(--color-text-light);
}

.empty-icon {
  font-size: 2.5rem;
  margin-bottom: var(--space-md);
}

.empty-text {
  font-family: var(--font-sans);
  font-size: 0.95rem;
}

@media (max-width: 768px) {
  .gallery-grid {
    grid-template-columns: repeat(auto-fill, minmax(150px, 1fr));
  }
}
</style>
