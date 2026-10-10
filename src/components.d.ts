import type { vReveal } from './composables/useReveal'

declare module 'vue' {
  interface GlobalDirectives {
    vReveal: typeof vReveal
  }
}

export {}
