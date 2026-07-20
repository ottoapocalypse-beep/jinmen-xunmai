<script setup lang="ts">
import { teamMembers } from '@/data/team'
import HighlightKeywords from '@/components/HighlightKeywords.vue'

const p1 = '本次社会实践以\u201C寻根溯源\u00B7传承薪火\u201D为主题，依托北京科技大学校史馆官方指导下的满井溯源实践团整体框架，由津门寻脉小队赴天津大学开展为期两周的校史溯源活动。'
const p2 = '作为新中国第一所钢铁工业高等学府，北科大\u201C因钢而生、依钢而兴\u201D。1952年全国高校院系调整中，天津大学（原北洋大学）的冶金、采矿等相关学科整建制调入北京钢铁工业学院。本小队将奔赴天津大学，围绕矿冶学科发展脉络、院系调整划转细节、学术传承谱系等核心问题开展系统性溯源。'
const p3 = '建校初期的亲历者已进入耄耋之年，\u201C活历史\u201D正面临消逝风险。本次实践旨在抢在记忆消散之前，抢救性挖掘口述史料与实物档案，填补院系调整细节与普通建设者故事的空白。实践成果将直接服务于雄安新校区校史馆的建设。'
</script>

<template>
  <div class="about-page">
    <div class="page-header">
      <h1>关于实践</h1>
      <div class="page-title-en">About</div>
      <p>了解津门寻脉小队的实践背景与团队成员</p>
    </div>

    <!-- 实践背景 -->
    <section class="section">
      <div class="floating-card animate-on-scroll">
        <h2 class="card-title">实践背景</h2>
        <div class="card-body">
          <p><HighlightKeywords :text="p1" /></p>
          <br />
          <p><HighlightKeywords :text="p2" /></p>
          <br />
          <p><HighlightKeywords :text="p3" /></p>
        </div>
      </div>
    </section>

    <!-- 实践方法 -->
    <section class="section">
      <h2 class="section-title">实践方法</h2>
      <div class="method-grid">
        <div class="method-item floating-card animate-on-scroll">
          <span class="method-num">①</span>
          <h3>校史溯源法</h3>
          <p>赴天津大学查阅档案、考察校史馆</p>
        </div>
        <div class="method-item floating-card animate-on-scroll">
          <span class="method-num">②</span>
          <h3>深度访谈法</h3>
          <p>采访建校初期亲历者，采用生命故事访谈法</p>
        </div>
        <div class="method-item floating-card animate-on-scroll">
          <span class="method-num">③</span>
          <h3>数字化采集法</h3>
          <p>高清扫描老照片、手稿、教材等实物，建立数字档案库</p>
        </div>
        <div class="method-item floating-card animate-on-scroll">
          <span class="method-num">④</span>
          <h3>共创工作法</h3>
          <p>与老校友共同整理旧物，形成"记忆卡片"等展陈素材</p>
        </div>
        <div class="method-item floating-card animate-on-scroll">
          <span class="method-num">⑤</span>
          <h3>影像记录法</h3>
          <p>全程跟拍制作纪录片微电影，形成立体化史料收集与传播体系</p>
        </div>
      </div>
    </section>

    <!-- 团队成员 -->
    <section class="section">
      <h2 class="section-title">团队成员</h2>
      <div class="member-grid">
        <div v-for="member in teamMembers" :key="member.id" class="member-card floating-card animate-on-scroll">
          <div class="member-avatar">{{ member.name[0] }}</div>
          <div class="member-info">
            <h3 class="member-name">{{ member.name }}</h3>
            <span class="member-role tag">{{ member.role }}</span>
            <p v-if="member.description" class="member-desc">{{ member.description }}</p>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<style scoped>
.about-page {
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

.card-body {
  font-family: var(--font-sans);
  line-height: 1.8;
  color: var(--color-text);
}

/* Methods */
.method-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
  gap: var(--space-md);
}

.method-item {
  text-align: center;
}

.method-num {
  font-size: 1.5rem;
  color: var(--color-gold);
  display: block;
  margin-bottom: var(--space-sm);
}

.method-item h3 {
  font-size: 1.05rem;
  margin-bottom: var(--space-sm);
}

.method-item p {
  font-family: var(--font-sans);
  font-size: 0.85rem;
  color: var(--color-text-secondary);
}

/* Members */
.member-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(220px, 1fr));
  gap: var(--space-md);
}

.member-card {
  display: flex;
  align-items: center;
  gap: var(--space-md);
  padding: var(--space-lg);
}

.member-avatar {
  width: 48px;
  height: 48px;
  border-radius: 50%;
  background: var(--color-primary-subtle);
  color: var(--color-primary);
  display: flex;
  align-items: center;
  justify-content: center;
  font-family: var(--font-serif);
  font-size: 1.2rem;
  font-weight: 700;
  flex-shrink: 0;
}

.member-info {
  flex: 1;
  min-width: 0;
}

.member-name {
  font-size: 1rem;
  margin-bottom: 2px;
}

.member-role {
  margin-bottom: var(--space-xs);
}

.member-desc {
  font-family: var(--font-sans);
  font-size: 0.8rem;
  color: var(--color-text-secondary);
  margin-top: var(--space-xs);
}
</style>
