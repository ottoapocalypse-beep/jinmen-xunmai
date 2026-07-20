<script setup lang="ts">
import { siteConfig } from '@/data/site'

import NavIcon from '@/components/NavIcon.vue'

const platforms = [
  { name: '微信公众号', icon: 'wechat', account: siteConfig.social.wechat, link: siteConfig.socialLinks.wechat },
  { name: 'B站', icon: 'video', account: siteConfig.social.bilibili, link: siteConfig.socialLinks.bilibili },
  { name: '抖音', icon: 'music', account: siteConfig.social.douyin, link: siteConfig.socialLinks.douyin },
  { name: '快手', icon: 'music', account: siteConfig.social.kuaishou, link: siteConfig.socialLinks.kuaishou },
  { name: '小红书', icon: 'book', account: siteConfig.social.xiaohongshu, link: siteConfig.socialLinks.xiaohongshu },
]
</script>

<template>
  <div class="contact-page">
    <div class="page-header">
      <h1>联系我们</h1>
      <div class="page-title-en">Contact</div>
      <p>关注我们的社交媒体，获取最新动态</p>
    </div>

    <!-- 社交媒体 -->
    <section class="section">
      <h2 class="section-title">关注我们</h2>
      <div class="platform-grid">
        <a
          v-for="p in platforms"
          :key="p.name"
          :href="p.link"
          target="_blank"
          rel="noopener noreferrer"
          class="platform-card floating-card animate-on-scroll"
        >
          <NavIcon :name="(p.icon as any)" :size="28" class="platform-icon" />
          <div class="platform-info">
            <h3 class="platform-name">{{ p.name }}</h3>
            <span class="platform-account">{{ p.account }}</span>
          </div>
        </a>
      </div>
    </section>

    <!-- 联系信息 -->
    <section class="section">
      <h2 class="section-title">联系团队</h2>
      <div class="floating-card">
        <p class="contact-text">
          如果您对我们的实践感兴趣，或有相关史料线索提供，欢迎通过各平台私信联系我们。
        </p>
        <p class="contact-text" style="margin-top: var(--space-md);">
          团队名称：{{ siteConfig.teamFull }}<br />
          所属单位：{{ siteConfig.university }}
        </p>
      </div>
    </section>
  </div>
</template>

<style scoped>
.contact-page {
  max-width: var(--content-max-width);
  margin: 0 auto;
}

.section {
  margin-bottom: var(--space-2xl);
}

.section-title {
  font-size: 1.3rem;
  color: var(--color-primary-dark);
  margin-bottom: var(--space-lg);
  padding-left: var(--space-md);
  border-left: 3px solid var(--color-gold);
}

.platform-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(240px, 1fr));
  gap: var(--space-md);
}

.platform-card {
  display: flex;
  align-items: center;
  gap: var(--space-md);
  padding: var(--space-lg);
  text-decoration: none;
  color: inherit;
  cursor: pointer;
  transition: transform var(--transition-fast), box-shadow var(--transition-fast);
}

.platform-card:hover {
  transform: translateY(-2px);
  box-shadow: var(--shadow-lg);
}

.platform-icon {
  color: var(--color-gold-dark);
  flex-shrink: 0;
}

.platform-info {
  flex: 1;
}

.platform-name {
  font-size: 1.05rem;
  margin-bottom: 2px;
}

.platform-account {
  font-family: var(--font-sans);
  font-size: 0.85rem;
  color: var(--color-text-secondary);
}

.contact-text {
  font-family: var(--font-sans);
  font-size: 0.95rem;
  line-height: 1.8;
  color: var(--color-text);
}
</style>
