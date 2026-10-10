<script setup lang="ts">
import { onBeforeUnmount, onMounted, ref } from 'vue'
import { brand, navLinks } from '@/data/site'
import LogoMark from './LogoMark.vue'

const scrolled = ref(false)
const menuOpen = ref(false)

const onScroll = () => {
  scrolled.value = window.scrollY > 24
}

onMounted(() => {
  onScroll()
  window.addEventListener('scroll', onScroll, { passive: true })
})
onBeforeUnmount(() => window.removeEventListener('scroll', onScroll))
</script>

<template>
  <header class="header" :class="{ scrolled, open: menuOpen }">
    <div class="container inner">
      <RouterLink to="/" class="logo" @click="menuOpen = false">
        <LogoMark :size="30" />
        <span class="logo-text">
          <strong>{{ brand.name }}</strong>
          <small>{{ brand.en }}</small>
        </span>
      </RouterLink>

      <nav class="nav" aria-label="主导航">
        <RouterLink
          v-for="link in navLinks"
          :key="link.id"
          :to="{ path: '/', hash: `#${link.id}` }"
          @click="menuOpen = false"
        >
          {{ link.label }}
        </RouterLink>
      </nav>

      <RouterLink :to="{ path: '/', hash: '#contact' }" class="btn btn-primary cta" @click="menuOpen = false">
        开始合作
      </RouterLink>

      <button
        class="burger"
        :aria-expanded="menuOpen"
        aria-label="打开菜单"
        @click="menuOpen = !menuOpen"
      >
        <span /><span />
      </button>
    </div>
  </header>
</template>

<style scoped>
.header {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 50;
  transition: background 0.3s, border-color 0.3s;
  border-bottom: 1px solid transparent;
}

.header.scrolled,
.header.open {
  background: rgba(6, 8, 14, 0.78);
  backdrop-filter: blur(14px);
  -webkit-backdrop-filter: blur(14px);
  border-bottom-color: var(--border);
}

.inner {
  height: 68px;
  display: flex;
  align-items: center;
  gap: 32px;
}

.logo {
  display: flex;
  align-items: center;
  gap: 10px;
}

.logo-text {
  display: flex;
  flex-direction: column;
  line-height: 1.1;
}

.logo-text strong {
  font-size: 16px;
  letter-spacing: 0.04em;
}

.logo-text small {
  font-family: var(--mono);
  font-size: 9.5px;
  letter-spacing: 0.22em;
  color: var(--text-3);
}

.nav {
  display: flex;
  gap: 4px;
  margin-left: auto;
}

.nav a {
  padding: 8px 14px;
  font-size: 14px;
  color: var(--text-2);
  border-radius: 8px;
  transition: color 0.2s, background 0.2s;
}

.nav a:hover {
  color: var(--text);
  background: rgba(255, 255, 255, 0.04);
}

.cta {
  height: 38px;
  padding: 0 18px;
  font-size: 14px;
}

.burger {
  display: none;
  width: 40px;
  height: 40px;
  margin-left: auto;
  background: none;
  border: 1px solid var(--border);
  border-radius: 10px;
  cursor: pointer;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 6px;
}

.burger span {
  display: block;
  width: 16px;
  height: 1.5px;
  background: var(--text);
  transition: transform 0.25s;
}

.open .burger span:first-child {
  transform: translateY(3.75px) rotate(45deg);
}

.open .burger span:last-child {
  transform: translateY(-3.75px) rotate(-45deg);
}

@media (max-width: 900px) {
  .burger {
    display: flex;
  }

  .cta {
    display: none;
  }

  .nav {
    position: absolute;
    top: 68px;
    left: 0;
    right: 0;
    flex-direction: column;
    padding: 8px 16px 20px;
    background: rgba(6, 8, 14, 0.96);
    border-bottom: 1px solid var(--border);
    display: none;
  }

  .open .nav {
    display: flex;
  }

  .nav a {
    padding: 14px 8px;
    font-size: 16px;
    border-bottom: 1px solid var(--border);
    border-radius: 0;
  }
}
</style>
