<script setup lang="ts">
import { solutions } from '@/data/site'
</script>

<template>
  <section id="solutions" class="section">
    <div class="container">
      <div v-reveal class="section-head">
        <div class="eyebrow">Industry Solutions</div>
        <h2 class="section-title">深耕垂直领域，解决行业痛点</h2>
        <p class="section-desc">成熟的业务系统打底，再叠加 AI 能力，让管理更省力、决策更有据。</p>
      </div>

      <div class="grid">
        <article v-for="(s, i) in solutions" :key="s.no" v-reveal="i * 100" class="sol card">
          <div class="no">{{ s.no }}</div>
          <h3>{{ s.title }}</h3>
          <p class="desc">{{ s.desc }}</p>
          <ul>
            <li v-for="it in s.items" :key="it">{{ it }}</li>
          </ul>
          <div class="ai">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M13 2 4 14h7l-1 8 9-12h-7l1-8Z" /></svg>
            AI 加持：{{ s.ai }}
          </div>
        </article>
      </div>
    </div>
  </section>
</template>

<style scoped>
.grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 20px;
}

.sol {
  padding: 32px 28px;
  display: flex;
  flex-direction: column;
  transition: border-color 0.3s;
}

.sol:hover {
  border-color: var(--border-strong);
}

.no {
  font-family: var(--mono);
  font-size: 48px;
  font-weight: 800;
  line-height: 1;
  color: transparent;
  -webkit-text-stroke: 1px rgba(92, 200, 255, 0.45);
  margin-bottom: 20px;
}

h3 {
  font-size: 22px;
}

.desc {
  margin-top: 8px;
  color: var(--text-2);
  font-size: 15px;
}

ul {
  margin: 22px 0;
  display: grid;
  gap: 2px;
}

li {
  padding: 10px 0;
  font-size: 15px;
  border-bottom: 1px solid var(--border);
  display: flex;
  justify-content: space-between;
}

li::after {
  content: '→';
  color: var(--text-3);
}

.ai {
  margin-top: auto;
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 10px 14px;
  border-radius: 10px;
  font-size: 13px;
  color: var(--coin);
  background: rgba(255, 181, 71, 0.07);
  border: 1px solid rgba(255, 181, 71, 0.2);
}

@media (max-width: 960px) {
  .grid {
    grid-template-columns: 1fr;
  }
}
</style>
