<script setup lang="ts">
import { stats } from '@/data/site'
import StatItem from './StatItem.vue'
</script>

<template>
  <section class="stats">
    <div class="container grid">
      <StatItem v-for="(s, i) in stats" :key="s.label" v-reveal="i * 80" :stat="s" />
    </div>
  </section>
</template>

<style scoped>
.stats {
  border-top: 1px solid var(--border);
  border-bottom: 1px solid var(--border);
  background: linear-gradient(90deg, rgba(47, 123, 255, 0.05), rgba(92, 200, 255, 0.02), rgba(47, 123, 255, 0.05));
}

.grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
}

@media (max-width: 768px) {
  .grid {
    grid-template-columns: repeat(2, 1fr);
  }
}
</style>
