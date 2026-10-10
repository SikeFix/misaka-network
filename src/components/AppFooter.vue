<script setup lang="ts">
import { brand, navLinks } from '@/data/site'
import LogoMark from './LogoMark.vue'

const year = new Date().getFullYear()
</script>

<template>
  <footer class="footer">
    <div class="container inner">
      <div class="brand">
        <LogoMark :size="28" />
        <div>
          <strong>{{ brand.name }} · {{ brand.en }}</strong>
          <p>{{ brand.slogan }}</p>
        </div>
      </div>
      <nav aria-label="页脚导航">
        <RouterLink v-for="l in navLinks" :key="l.id" :to="{ path: '/', hash: `#${l.id}` }">{{ l.label }}</RouterLink>
      </nav>
    </div>
    <div class="container bottom">
      <span>© {{ year }} {{ brand.name }}工作室 · {{ brand.domain }}</span>
      <span class="mono">ALL NODES OPERATIONAL</span>
    </div>
  </footer>
</template>

<style scoped>
.footer {
  border-top: 1px solid var(--border);
  padding: 48px 0 28px;
  background: var(--bg-2);
}

.inner {
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 24px;
  flex-wrap: wrap;
}

.brand {
  display: flex;
  align-items: center;
  gap: 12px;
}

.brand strong {
  font-size: 15px;
}

.brand p {
  font-size: 13px;
  color: var(--text-3);
}

nav {
  display: flex;
  flex-wrap: wrap;
  gap: 4px 20px;
}

nav a {
  font-size: 14px;
  color: var(--text-2);
}

nav a:hover {
  color: var(--volt);
}

.bottom {
  margin-top: 32px;
  padding-top: 20px;
  border-top: 1px solid var(--border);
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
  gap: 8px;
  font-size: 13px;
  color: var(--text-3);
}

.mono {
  font-family: var(--mono);
  letter-spacing: 0.12em;
  color: var(--ok);
  opacity: 0.7;
}
</style>
