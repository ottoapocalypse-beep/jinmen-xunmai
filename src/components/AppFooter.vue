<script setup lang="ts">
import { siteConfig } from '@/data/site'

const socialLinks = [
  { name: '微信公众号', link: siteConfig.socialLinks.wechat },
  { name: 'B站', link: siteConfig.socialLinks.bilibili },
  { name: '抖音', link: siteConfig.socialLinks.douyin },
  { name: '快手', link: siteConfig.socialLinks.kuaishou },
  { name: '小红书', link: siteConfig.socialLinks.xiaohongshu },
]
</script>

<template>
  <footer class="app-footer">
    <div class="footer-inner">
      <div class="footer-info">
        <span class="footer-name">{{ siteConfig.teamFull }}</span>
        <span class="footer-sep">·</span>
        <span class="footer-year">© {{ siteConfig.year }}</span>
      </div>
      <div class="footer-social">
        <span class="footer-social-label">关注我们：</span>
        <a
          v-for="s in socialLinks"
          :key="s.name"
          :href="s.link"
          target="_blank"
          rel="noopener noreferrer"
          class="social-chip"
        >{{ s.name }}</a>
      </div>
    </div>
  </footer>
</template>

<style scoped>
.app-footer {
  margin-top: auto;
  padding: var(--space-xl) var(--space-lg) var(--space-lg);
  border-top: 1px solid var(--color-border-light);
  background: var(--color-bg-alt);
}

.footer-inner {
  max-width: var(--content-max-width);
  margin: 0 auto;
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;
  gap: var(--space-md);
}

.footer-info {
  font-family: var(--font-sans);
  font-size: 0.85rem;
  color: var(--color-text-secondary);
}

.footer-name {
  font-weight: 500;
}

.footer-sep {
  margin: 0 var(--space-sm);
}

.footer-social {
  display: flex;
  align-items: center;
  gap: var(--space-sm);
  flex-wrap: wrap;
  font-family: var(--font-sans);
  font-size: 0.8rem;
  color: var(--color-text-secondary);
}

.footer-social-label {
  color: var(--color-text-light);
}

.social-chip {
  padding: 2px 10px;
  border-radius: 12px;
  background: var(--color-gold-subtle);
  color: var(--color-gold-dark);
  border: 1px solid var(--color-gold-light);
  font-size: 0.75rem;
  text-decoration: none;
  cursor: pointer;
  transition: background var(--transition-fast), color var(--transition-fast);
}

.social-chip:hover {
  background: var(--color-gold);
  color: var(--color-text-on-gold);
}

@media (max-width: 768px) {
  .footer-inner {
    flex-direction: column;
    text-align: center;
  }
}
</style>
