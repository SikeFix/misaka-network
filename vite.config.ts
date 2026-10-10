import { fileURLToPath, URL } from 'node:url'
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

export default defineConfig({
  // 部署在子路径（如 GitHub Pages 的 /misaka-network/）时通过 BASE_PATH 指定
  base: process.env.BASE_PATH || '/',
  plugins: [vue()],
  resolve: {
    alias: { '@': fileURLToPath(new URL('./src', import.meta.url)) },
  },
})
