<script setup lang="ts">
withDefaults(defineProps<{ size?: number }>(), { size: 32 })
</script>

<template>
  <svg :width="size" :height="size" viewBox="0 0 64 64" aria-hidden="true">
    <defs>
      <linearGradient id="lm-g" x1="0" y1="0" x2="1" y2="1">
        <stop offset="0" stop-color="#9be3ff" />
        <stop offset="1" stop-color="#2f7bff" />
      </linearGradient>
    </defs>
    <rect x="1" y="1" width="62" height="62" rx="15" fill="#0b1220" stroke="rgba(92,200,255,.35)" />
    <path d="M36 8 15 36h13l-4 20 25-31H36l3-17z" fill="url(#lm-g)" />
    <path d="M36 8 15 36h13l-4 20" fill="none" stroke="#ffb547" stroke-width="2.2" stroke-linejoin="round" />
  </svg>
</template>
