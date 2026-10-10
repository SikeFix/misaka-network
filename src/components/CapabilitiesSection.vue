<script setup lang="ts">
import { capabilities } from '@/data/site'
</script>

<template>
  <section id="capabilities" class="section">
    <div class="container">
      <div v-reveal class="section-head">
        <div class="eyebrow">Core Capabilities</div>
        <h2 class="section-title">三类核心能力，<span class="text-volt">一张网</span>协同运转</h2>
        <p class="section-desc">算力、智能与交付彼此连接——单点能力可以独立落地，组合起来就是完整的数字化底座。</p>
      </div>

      <div class="grid">
        <article v-for="(c, i) in capabilities" :key="c.code" v-reveal="i * 100" class="cap card">
          <div class="cap-top">
            <div class="icon" aria-hidden="true">
              <svg v-if="c.icon === 'grid'" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6">
                <circle cx="5" cy="5" r="2" /><circle cx="19" cy="5" r="2" /><circle cx="12" cy="12" r="2.5" /><circle cx="5" cy="19" r="2" /><circle cx="19" cy="19" r="2" />
                <path d="M6.5 6.5 10 10M17.5 6.5 14 10M6.5 17.5 10 14M17.5 17.5 14 14" />
              </svg>
              <svg v-else-if="c.icon === 'brain'" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6">
                <path d="M12 3v18M8 6a3 3 0 0 0-3 3 3 3 0 0 0-1 5 3 3 0 0 0 4 4M16 6a3 3 0 0 1 3 3 3 3 0 0 1 1 5 3 3 0 0 1-4 4" />
                <path d="M8 6a3 3 0 0 1 4-3M16 6a3 3 0 0 0-4-3M9 12h-2M17 12h-2" />
              </svg>
              <svg v-else viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6">
                <path d="m12 3 9 5-9 5-9-5 9-5Z" /><path d="m3 13 9 5 9-5" /><path d="m3 17.5 9 4.5 9-4.5" />
              </svg>
            </div>
            <span class="code">{{ c.code }}</span>
          </div>
          <h3>{{ c.title }}</h3>
          <p class="desc">{{ c.desc }}</p>
          <ul>
            <li v-for="p in c.points" :key="p">{{ p }}</li>
          </ul>
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

.cap {
  padding: 32px 28px;
  position: relative;
  overflow: hidden;
  transition: border-color 0.3s, transform 0.3s;
}

.cap::after {
  content: '';
  position: absolute;
  left: 0;
  right: 0;
  top: 0;
  height: 1px;
  background: linear-gradient(90deg, transparent, var(--volt), transparent);
  opacity: 0;
  transition: opacity 0.3s;
}

.cap:hover {
  border-color: var(--border-strong);
  transform: translateY(-4px);
}

.cap:hover::after {
  opacity: 1;
}

.cap-top {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 24px;
}

.icon {
  width: 52px;
  height: 52px;
  display: grid;
  place-items: center;
  border-radius: 12px;
  color: var(--volt);
  background: rgba(92, 200, 255, 0.08);
  border: 1px solid rgba(92, 200, 255, 0.2);
  box-shadow: inset 0 0 18px rgba(92, 200, 255, 0.12);
}

.icon svg {
  width: 26px;
  height: 26px;
}

.code {
  font-family: var(--mono);
  font-size: 11px;
  color: var(--text-3);
  letter-spacing: 0.12em;
}

h3 {
  font-size: 22px;
  font-weight: 700;
}

.desc {
  margin-top: 10px;
  color: var(--text-2);
  font-size: 15px;
}

ul {
  margin-top: 22px;
  padding-top: 18px;
  border-top: 1px dashed var(--border);
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 10px 12px;
}

li {
  font-size: 14px;
  color: var(--text);
  display: flex;
  align-items: center;
  gap: 8px;
}

li::before {
  content: '';
  width: 5px;
  height: 5px;
  background: var(--coin);
  box-shadow: 0 0 6px var(--coin);
  transform: rotate(45deg);
  flex-shrink: 0;
}

@media (max-width: 960px) {
  .grid {
    grid-template-columns: 1fr;
  }
}
</style>
