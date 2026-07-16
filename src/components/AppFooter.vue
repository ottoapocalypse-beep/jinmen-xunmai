<script setup lang="ts">
import { siteConfig } from '@/data/site'
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
        <span class="social-chip">微信公众号</span>
        <span class="social-chip">B站</span>
        <span class="social-chip">抖音</span>
        <span class="social-chip">快手</span>
        <span class="social-chip">小红书</span>
      </div>
    </div>
  </footer>
</template>

<style scoped>
.app-footer {
  margin-top: auto;
  padding: var(--space-xl) var(--space-lg) var(--space-lg);
  border-top: 1px solid rgba(201, 168, 76, 0.1);
  background: transparent;
}

.footer-info {
  color: rgba(232, 220, 200, 0.5);
}

.footer-social {
  color: rgba(232, 220, 200, 0.5);
}

.footer-social-label {
  color: rgba(232, 220, 200, 0.4);
}

.social-chip {
  background: rgba(201, 168, 76, 0.08);
  color: var(--color-gold-light);
  border: 1px solid rgba(201, 168, 76, 0.2);
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
}

@media (max-width: 768px) {
  .footer-inner {
    flex-direction: column;
    text-align: center;
  }
}
</style>
