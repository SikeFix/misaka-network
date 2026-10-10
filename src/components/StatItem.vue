<script setup lang="ts">
import { ref } from 'vue'
import type { Stat } from '@/data/site'
import { useCountUp } from '@/composables/useCountUp'

const props = defineProps<{ stat: Stat }>()
const el = ref<HTMLElement | null>(null)
const n = useCountUp(props.stat.value, el)
</script>

<template>
  <div ref="el" class="stat">
    <div class="value">
      {{ n }}<span>{{ stat.suffix }}</span>
    </div>
    <div class="label">{{ stat.label }}</div>
  </div>
</template>

<style scoped>
.stat {
  padding: 36px 16px;
  text-align: center;
  position: relative;
}

.stat + .stat::before {
  content: '';
  position: absolute;
  left: 0;
  top: 30%;
  bottom: 30%;
  width: 1px;
  background: var(--border);
}

.value {
  font-family: var(--mono);
  font-size: clamp(30px, 4vw, 44px);
  font-weight: 700;
  color: var(--text);
  font-variant-numeric: tabular-nums;
}

.value span {
  color: var(--volt);
  font-size: 0.6em;
  margin-left: 2px;
}

.label {
  margin-top: 4px;
  font-size: 14px;
  color: var(--text-2);
}

@media (max-width: 768px) {
  .stat:nth-child(3)::before {
    display: none;
  }
  .stat:nth-child(n + 3) {
    border-top: 1px solid var(--border);
  }
}
</style>
