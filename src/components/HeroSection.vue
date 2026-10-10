<script setup lang="ts">
import { onBeforeUnmount, onMounted, ref } from 'vue'
import NetworkCanvas from './NetworkCanvas.vue'

const lines = [
  '> 正在接入御坂网络 ...',
  '> 节点握手完成，算力池已就绪',
  '> AI 推理网关：ONLINE',
  '> 等待您的任务指令_',
]
const shown = ref<string[]>([])
let timer = 0

onMounted(() => {
  let i = 0
  const next = () => {
    const line = lines[i]
    if (line === undefined) return
    shown.value.push(line)
    i++
    timer = window.setTimeout(next, 650)
  }
  timer = window.setTimeout(next, 500)
})
onBeforeUnmount(() => clearTimeout(timer))
</script>

<template>
  <section class="hero">
    <NetworkCanvas />
    <div class="glow" aria-hidden="true" />

    <div class="container content">
      <div class="badge">
        <span class="dot" />
        <span class="badge-en">MISAKA NETWORK ·</span> 分布式算力与 AI 工程团队
      </div>

      <h1 class="title">
        让每一个节点<br />
        都成为<span class="text-volt">算力</span>
      </h1>

      <p class="lead">
        分布式计算 · AI 赋能。我们把高并发架构、大模型能力与全栈交付编织成一张网，
        为高校、企业与教育行业提供稳定、可扩展、会思考的数字化系统。
      </p>

      <div class="actions">
        <RouterLink :to="{ path: '/', hash: '#contact' }" class="btn btn-primary">
          启动合作
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4" aria-hidden="true"><path d="M5 12h14M13 6l6 6-6 6" /></svg>
        </RouterLink>
        <RouterLink :to="{ path: '/', hash: '#architecture' }" class="btn btn-ghost">查看网络架构</RouterLink>
      </div>

      <div class="terminal card" aria-live="polite">
        <div class="term-bar">
          <i /><i /><i />
          <span>misaka@network:~</span>
        </div>
        <div class="term-body">
          <p v-for="(l, i) in shown" :key="i" :class="{ ok: i === 2 }">{{ l }}</p>
        </div>
      </div>
    </div>

    <a href="#capabilities" class="scroll-hint" aria-label="向下滚动">
      <span />
    </a>
  </section>
</template>

<style scoped>
.hero {
  position: relative;
  min-height: 100vh;
  min-height: 100svh;
  display: flex;
  align-items: center;
  overflow: hidden;
  padding: 120px 0 96px;
}

.glow {
  position: absolute;
  inset: 0;
  pointer-events: none;
  background:
    radial-gradient(600px 380px at 18% 30%, rgba(47, 123, 255, 0.22), transparent 70%),
    radial-gradient(500px 300px at 85% 75%, rgba(255, 181, 71, 0.08), transparent 70%),
    linear-gradient(to bottom, transparent 70%, var(--bg));
}

.content {
  position: relative;
  z-index: 1;
  pointer-events: none;
}

.content > * {
  pointer-events: auto;
}

.badge {
  display: inline-flex;
  align-items: center;
  gap: 10px;
  padding: 6px 14px;
  font-family: var(--mono);
  font-size: 12px;
  letter-spacing: 0.08em;
  color: var(--text-2);
  border: 1px solid var(--border);
  border-radius: 999px;
  background: rgba(10, 14, 24, 0.6);
}

.dot {
  width: 7px;
  height: 7px;
  border-radius: 50%;
  background: var(--ok);
  box-shadow: 0 0 10px var(--ok);
  animation: blink 2s infinite;
}

.title {
  margin-top: 28px;
  font-size: clamp(40px, 7.4vw, 84px);
  line-height: 1.08;
  font-weight: 800;
  letter-spacing: -0.02em;
}

.lead {
  margin-top: 24px;
  max-width: 600px;
  color: var(--text-2);
  font-size: clamp(16px, 1.6vw, 18px);
}

.actions {
  margin-top: 36px;
  display: flex;
  flex-wrap: wrap;
  gap: 12px;
}

.terminal {
  margin-top: 48px;
  max-width: 440px;
  overflow: hidden;
  background: rgba(8, 12, 22, 0.75);
}

.term-bar {
  display: flex;
  align-items: center;
  gap: 6px;
  padding: 10px 14px;
  border-bottom: 1px solid var(--border);
  font-family: var(--mono);
  font-size: 11px;
  color: var(--text-3);
}

.term-bar i {
  width: 9px;
  height: 9px;
  border-radius: 50%;
  background: #2a3346;
}

.term-bar span {
  margin-left: 8px;
}

.term-body {
  padding: 14px 16px;
  min-height: 118px;
  font-family: var(--mono);
  font-size: 13px;
  color: var(--text-2);
  line-height: 1.8;
}

.term-body p {
  animation: type-in 0.35s ease both;
}

.term-body .ok {
  color: var(--ok);
}

.scroll-hint {
  position: absolute;
  left: 50%;
  bottom: 28px;
  width: 22px;
  height: 36px;
  margin-left: -11px;
  border: 1.5px solid var(--border-strong);
  border-radius: 12px;
  z-index: 1;
}

.scroll-hint span {
  position: absolute;
  left: 50%;
  top: 7px;
  width: 3px;
  height: 7px;
  margin-left: -1.5px;
  border-radius: 2px;
  background: var(--volt);
  animation: scroll 1.8s infinite;
}

@keyframes blink {
  50% {
    opacity: 0.35;
  }
}

@keyframes type-in {
  from {
    opacity: 0;
    transform: translateX(-6px);
  }
}

@keyframes scroll {
  0% {
    transform: translateY(0);
    opacity: 1;
  }
  100% {
    transform: translateY(12px);
    opacity: 0;
  }
}

@media (max-width: 768px) {
  .hero {
    padding: 104px 0 88px;
  }
  .terminal {
    max-width: none;
  }
  .badge-en {
    display: none;
  }
}
</style>
