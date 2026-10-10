<script setup lang="ts">
import { computed, ref } from 'vue'
import { cases } from '@/data/site'

const activeId = ref(cases[0]?.id ?? '')
const active = computed(() => cases.find((c) => c.id === activeId.value) ?? cases[0])
</script>

<template>
  <section id="cases" class="section">
    <div class="container">
      <div v-reveal class="section-head">
        <div class="eyebrow">Case Studies</div>
        <h2 class="section-title">技术案例解析</h2>
        <p class="section-desc">不讲概念，只看指标——这些系统正在真实场景中承载流量。</p>
      </div>

      <div v-reveal class="tabs" role="tablist">
        <button
          v-for="c in cases"
          :key="c.id"
          role="tab"
          :aria-selected="c.id === activeId"
          :class="{ active: c.id === activeId }"
          @click="activeId = c.id"
        >
          {{ c.title }}
        </button>
      </div>

      <Transition name="fade" mode="out-in">
        <div v-if="active" :key="active.id" class="panel">
          <p class="subtitle">{{ active.subtitle }}</p>

          <div class="metrics">
            <div v-for="m in active.metrics" :key="m.label" class="metric card">
              <div class="m-value">{{ m.value }}</div>
              <div class="m-label">{{ m.label }}</div>
              <div class="m-note">{{ m.note }}</div>
            </div>
          </div>

          <div class="highlights">
            <div v-for="(h, i) in active.highlights" :key="h.title" class="hl card">
              <span class="hl-no">0{{ i + 1 }}</span>
              <h3>{{ h.title }}</h3>
              <p>{{ h.desc }}</p>
              <div class="tags">
                <span v-for="t in h.tags" :key="t" class="tag">{{ t }}</span>
              </div>
            </div>
          </div>
        </div>
      </Transition>
    </div>
  </section>
</template>

<style scoped>
.tabs {
  display: inline-flex;
  gap: 4px;
  padding: 4px;
  border-radius: 12px;
  background: var(--surface);
  border: 1px solid var(--border);
  margin-bottom: 28px;
  max-width: 100%;
  overflow-x: auto;
}

.tabs button {
  border: 0;
  background: none;
  color: var(--text-2);
  font: inherit;
  font-size: 14px;
  padding: 8px 18px;
  border-radius: 9px;
  cursor: pointer;
  white-space: nowrap;
  transition: background 0.2s, color 0.2s;
}

.tabs button.active {
  background: rgba(92, 200, 255, 0.12);
  color: var(--volt);
  box-shadow: inset 0 0 0 1px rgba(92, 200, 255, 0.3);
}

.subtitle {
  color: var(--text-2);
  margin-bottom: 20px;
}

.metrics {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 16px;
}

.metric {
  padding: 26px 24px;
  background: linear-gradient(160deg, rgba(47, 123, 255, 0.12), rgba(18, 26, 42, 0.6) 60%);
}

.m-value {
  font-family: var(--mono);
  font-size: clamp(28px, 3.4vw, 38px);
  font-weight: 700;
  color: var(--volt);
  text-shadow: 0 0 20px rgba(92, 200, 255, 0.4);
}

.m-label {
  margin-top: 6px;
  font-weight: 600;
}

.m-note {
  margin-top: 4px;
  font-size: 13px;
  color: var(--text-3);
  font-family: var(--mono);
}

.highlights {
  margin-top: 16px;
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 16px;
}

.hl {
  padding: 26px 24px;
  position: relative;
}

.hl-no {
  position: absolute;
  top: 18px;
  right: 20px;
  font-family: var(--mono);
  font-size: 12px;
  color: var(--coin);
}

.hl h3 {
  font-size: 17px;
  margin-bottom: 10px;
}

.hl p {
  color: var(--text-2);
  font-size: 14px;
}

.tags {
  margin-top: 16px;
  display: flex;
  flex-wrap: wrap;
  gap: 6px;
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.25s, transform 0.25s;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
  transform: translateY(8px);
}

@media (max-width: 960px) {
  .metrics,
  .highlights {
    grid-template-columns: 1fr;
  }
}
</style>
