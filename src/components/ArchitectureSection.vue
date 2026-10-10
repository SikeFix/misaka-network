<script setup lang="ts">
import { layers } from '@/data/site'
</script>

<template>
  <section id="architecture" class="section arch">
    <div class="container">
      <div v-reveal class="section-head">
        <div class="eyebrow">Network Architecture</div>
        <h2 class="section-title">从请求到推理，<span class="text-volt">四层</span>贯通</h2>
        <p class="section-desc">
          每一次用户操作都会穿过接入、调度、计算与 AI 推理四层网络。层与层之间解耦，任何一层都可以独立扩容。
        </p>
      </div>

      <div class="flow">
        <template v-for="(l, i) in layers" :key="l.tag">
          <div v-reveal="i * 120" class="layer card">
            <div class="layer-tag">{{ l.tag }}</div>
            <h3>{{ l.title }}</h3>
            <ul>
              <li v-for="it in l.items" :key="it">{{ it }}</li>
            </ul>
          </div>
          <div v-if="i < layers.length - 1" class="wire" aria-hidden="true">
            <span class="spark" :style="{ animationDelay: `${i * 0.5}s` }" />
          </div>
        </template>
      </div>

      <div v-reveal class="note card">
        <span class="tag">设计原则</span>
        <p>无状态服务 + 有状态存储分离 · 热点数据前置缓存 · 异步化削峰 · 全链路可观测</p>
      </div>
    </div>
  </section>
</template>

<style scoped>
.arch {
  background: linear-gradient(180deg, transparent, rgba(47, 123, 255, 0.04) 50%, transparent);
}

.flow {
  display: flex;
  align-items: stretch;
}

.layer {
  flex: 1;
  padding: 26px 22px;
  min-width: 0;
}

.layer-tag {
  display: inline-block;
  font-family: var(--mono);
  font-size: 12px;
  font-weight: 700;
  color: #04101d;
  background: var(--volt);
  padding: 2px 8px;
  border-radius: 5px;
  margin-bottom: 14px;
}

.layer:last-child .layer-tag {
  background: var(--coin);
}

h3 {
  font-size: 18px;
  margin-bottom: 14px;
}

li {
  font-size: 14px;
  color: var(--text-2);
  padding: 7px 0;
  border-top: 1px solid var(--border);
  font-family: var(--mono);
}

.wire {
  width: 44px;
  flex-shrink: 0;
  align-self: center;
  height: 2px;
  position: relative;
  background: linear-gradient(90deg, rgba(92, 200, 255, 0.2), rgba(92, 200, 255, 0.6), rgba(92, 200, 255, 0.2));
}

.spark {
  position: absolute;
  top: -3px;
  left: 0;
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background: #e8f8ff;
  box-shadow: 0 0 10px var(--volt), 0 0 20px var(--volt);
  animation: travel 2s linear infinite;
}

@keyframes travel {
  from {
    left: -4px;
    opacity: 0;
  }
  15% {
    opacity: 1;
  }
  85% {
    opacity: 1;
  }
  to {
    left: calc(100% - 4px);
    opacity: 0;
  }
}

.note {
  margin-top: 28px;
  padding: 18px 22px;
  display: flex;
  align-items: center;
  gap: 16px;
  flex-wrap: wrap;
}

.note p {
  color: var(--text-2);
  font-size: 14px;
}

@media (max-width: 960px) {
  .flow {
    flex-direction: column;
  }
  .wire {
    width: 2px;
    height: 32px;
    background: linear-gradient(180deg, rgba(92, 200, 255, 0.2), rgba(92, 200, 255, 0.6), rgba(92, 200, 255, 0.2));
  }
  .spark {
    left: -3px;
    animation-name: travel-y;
  }
  @keyframes travel-y {
    from {
      top: -4px;
      opacity: 0;
    }
    15%,
    85% {
      opacity: 1;
    }
    to {
      top: calc(100% - 4px);
      opacity: 0;
    }
  }
}
</style>
