<script setup lang="ts">
import { ref } from 'vue'
import { contact } from '@/data/site'

const copied = ref('')

async function copy(text: string, key: string) {
  try {
    await navigator.clipboard.writeText(text)
    copied.value = key
    setTimeout(() => (copied.value = ''), 1800)
  } catch {
    copied.value = ''
  }
}
</script>

<template>
  <section id="contact" class="section">
    <div class="container">
      <div v-reveal class="cta card">
        <div class="bolt" aria-hidden="true" />
        <div class="eyebrow">Connect to Network</div>
        <h2 class="section-title">准备好接入<span class="text-volt">御坂网络</span>了吗？</h2>
        <p class="section-desc">告诉我们您的业务场景与规模，我们提供免费的技术咨询与架构方案设计。</p>

        <div class="channels">
          <a :href="`mailto:${contact.email}`" class="btn btn-primary">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><rect x="3" y="5" width="18" height="14" rx="2" /><path d="m3 7 9 6 9-6" /></svg>
            {{ contact.email }}
          </a>
          <button class="btn btn-ghost" @click="copy(contact.wechat, 'wx')">
            {{ copied === 'wx' ? '已复制微信号 ✓' : `微信：${contact.wechat}` }}
          </button>
        </div>

        <ol class="steps">
          <li><span>01</span>需求沟通</li>
          <li><span>02</span>架构方案</li>
          <li><span>03</span>迭代开发</li>
          <li><span>04</span>上线运维</li>
        </ol>
      </div>
    </div>
  </section>
</template>

<style scoped>
.cta {
  position: relative;
  overflow: hidden;
  padding: 72px 48px;
  text-align: center;
  background:
    radial-gradient(600px 260px at 50% 0%, rgba(47, 123, 255, 0.22), transparent 70%),
    var(--surface);
  border-color: var(--border-strong);
}

.bolt {
  position: absolute;
  top: 0;
  left: 50%;
  width: 260px;
  height: 1px;
  margin-left: -130px;
  background: linear-gradient(90deg, transparent, var(--volt), transparent);
  box-shadow: 0 0 18px var(--volt);
}

.cta .eyebrow {
  justify-content: center;
}

.cta .section-desc {
  max-width: 520px;
  margin-left: auto;
  margin-right: auto;
}

.channels {
  margin-top: 36px;
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
  gap: 12px;
}

.steps {
  margin: 48px auto 0;
  padding: 0;
  list-style: none;
  max-width: 640px;
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  counter-reset: none;
}

.steps li {
  position: relative;
  font-size: 14px;
  color: var(--text-2);
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 8px;
}

.steps span {
  width: 36px;
  height: 36px;
  border-radius: 50%;
  display: grid;
  place-items: center;
  font-family: var(--mono);
  font-size: 12px;
  color: var(--volt);
  border: 1px solid var(--border-strong);
  background: var(--bg-2);
  position: relative;
  z-index: 1;
}

.steps li + li::before {
  content: '';
  position: absolute;
  top: 18px;
  right: 50%;
  width: 100%;
  height: 1px;
  background: var(--border-strong);
}

@media (max-width: 768px) {
  .cta {
    padding: 56px 20px;
  }
  .channels .btn {
    width: 100%;
  }
}
</style>
