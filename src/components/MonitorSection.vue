<script setup lang="ts">
import { computed, onBeforeUnmount, onMounted, ref } from 'vue'

// 节点监控演示面板（模拟数据，用于展示可观测能力）
const COLS = 40
const ROWS = 8
type Cell = 0 | 1 | 2 // 0 空闲 1 计算中 2 AI 推理

const cells = ref<Cell[]>(Array.from({ length: COLS * ROWS }, () => pick()))
const qps = ref<number[]>(Array.from({ length: 48 }, (_, i) => 2600 + Math.sin(i / 4) * 600 + Math.random() * 300))
const latency = ref(286)
let timer = 0

function pick(): Cell {
  const r = Math.random()
  return r < 0.55 ? 1 : r < 0.75 ? 2 : 0
}

const online = computed(() => cells.value.length)
const busy = computed(() => cells.value.filter((c) => c !== 0).length)
const aiCount = computed(() => cells.value.filter((c) => c === 2).length)
const currentQps = computed(() => Math.round(qps.value[qps.value.length - 1] ?? 0))

const linePath = computed(() => {
  const max = 5200
  const pts = qps.value.map((v, i) => `${(i / (qps.value.length - 1)) * 100},${40 - (v / max) * 40}`)
  return `M${pts.join(' L')}`
})

const areaPath = computed(() => `${linePath.value} L100,40 L0,40 Z`)

function tick() {
  const next = [...cells.value]
  for (let k = 0; k < 18; k++) {
    next[Math.floor(Math.random() * next.length)] = pick()
  }
  cells.value = next
  const last = qps.value[qps.value.length - 1] ?? 3000
  const v = Math.min(5000, Math.max(1500, last + (Math.random() - 0.48) * 520))
  qps.value = [...qps.value.slice(1), v]
  latency.value = Math.round(240 + Math.random() * 90)
}

onMounted(() => {
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
  timer = window.setInterval(tick, 1200)
})
onBeforeUnmount(() => clearInterval(timer))
</script>

<template>
  <section id="monitor" class="section">
    <div class="container">
      <div v-reveal class="section-head">
        <div class="eyebrow">Node Monitor</div>
        <h2 class="section-title">每一个节点，<span class="text-volt">尽在掌握</span></h2>
        <p class="section-desc">全链路可观测是分布式系统的生命线。下面是我们为客户交付的监控大屏的简化演示。</p>
      </div>

      <div v-reveal class="board card">
        <div class="board-head">
          <span class="live"><i />LIVE</span>
          <span class="demo">演示数据</span>
        </div>

        <div class="kpis">
          <div class="kpi">
            <span>在线节点</span><strong>{{ online }}</strong>
          </div>
          <div class="kpi">
            <span>负载节点</span><strong>{{ busy }}</strong>
          </div>
          <div class="kpi">
            <span>AI 推理中</span><strong class="coin">{{ aiCount }}</strong>
          </div>
          <div class="kpi">
            <span>平均响应</span><strong>{{ latency }}<small>ms</small></strong>
          </div>
        </div>

        <div class="body">
          <div class="matrix-wrap">
            <div class="label">节点矩阵 · {{ COLS }}×{{ ROWS }}</div>
            <div class="matrix" :style="{ gridTemplateColumns: `repeat(${COLS}, 1fr)` }">
              <span v-for="(c, i) in cells" :key="i" :class="['cell', `s${c}`]" />
            </div>
            <div class="legend">
              <span><i class="s0" />空闲</span>
              <span><i class="s1" />计算中</span>
              <span><i class="s2" />AI 推理</span>
            </div>
          </div>

          <div class="chart-wrap">
            <div class="label">
              实时 QPS <strong>{{ currentQps.toLocaleString() }}</strong>
            </div>
            <svg viewBox="0 0 100 40" preserveAspectRatio="none" class="chart" aria-label="QPS 折线图">
              <defs>
                <linearGradient id="qps-fill" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0" stop-color="#5cc8ff" stop-opacity="0.35" />
                  <stop offset="1" stop-color="#5cc8ff" stop-opacity="0" />
                </linearGradient>
              </defs>
              <path :d="areaPath" fill="url(#qps-fill)" />
              <path :d="linePath" fill="none" stroke="#5cc8ff" stroke-width="0.6" vector-effect="non-scaling-stroke" />
            </svg>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
.board {
  padding: 24px;
  background: rgba(8, 12, 22, 0.7);
}

.board-head {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 18px;
  font-family: var(--mono);
  font-size: 12px;
}

.live {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  color: var(--ok);
  letter-spacing: 0.15em;
}

.live i {
  width: 7px;
  height: 7px;
  border-radius: 50%;
  background: var(--ok);
  box-shadow: 0 0 8px var(--ok);
  animation: blink 1.4s infinite;
}

.demo {
  color: var(--text-3);
}

.kpis {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 12px;
}

.kpi {
  padding: 14px 16px;
  border-radius: 10px;
  background: rgba(255, 255, 255, 0.02);
  border: 1px solid var(--border);
  display: flex;
  flex-direction: column;
}

.kpi span {
  font-size: 12px;
  color: var(--text-3);
}

.kpi strong {
  font-family: var(--mono);
  font-size: 26px;
  font-variant-numeric: tabular-nums;
}

.kpi small {
  font-size: 13px;
  color: var(--text-3);
  margin-left: 2px;
}

.coin {
  color: var(--coin);
}

.body {
  margin-top: 16px;
  display: grid;
  grid-template-columns: 1.4fr 1fr;
  gap: 16px;
}

.matrix-wrap,
.chart-wrap {
  padding: 16px;
  border-radius: 10px;
  border: 1px solid var(--border);
  background: rgba(255, 255, 255, 0.015);
  min-width: 0;
}

.label {
  font-family: var(--mono);
  font-size: 12px;
  color: var(--text-3);
  margin-bottom: 12px;
}

.label strong {
  color: var(--volt);
  margin-left: 6px;
  font-size: 14px;
}

.matrix {
  display: grid;
  gap: 3px;
}

.cell {
  aspect-ratio: 1;
  border-radius: 1.5px;
  transition: background 0.6s, box-shadow 0.6s;
}

.s0 {
  background: #1a2235;
}

.s1 {
  background: rgba(92, 200, 255, 0.75);
  box-shadow: 0 0 4px rgba(92, 200, 255, 0.5);
}

.s2 {
  background: var(--coin);
  box-shadow: 0 0 4px rgba(255, 181, 71, 0.6);
}

.legend {
  margin-top: 12px;
  display: flex;
  gap: 16px;
  font-size: 12px;
  color: var(--text-2);
}

.legend span {
  display: inline-flex;
  align-items: center;
  gap: 6px;
}

.legend i {
  width: 9px;
  height: 9px;
  border-radius: 2px;
}

.chart {
  width: 100%;
  height: 170px;
  display: block;
}

@keyframes blink {
  50% {
    opacity: 0.3;
  }
}

@media (max-width: 960px) {
  .body {
    grid-template-columns: 1fr;
  }
  .kpis {
    grid-template-columns: repeat(2, 1fr);
  }
  .board {
    padding: 16px;
  }
  .matrix {
    gap: 2px;
  }
}
</style>
