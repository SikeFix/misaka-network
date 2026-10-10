import { onBeforeUnmount, onMounted, ref, type Ref } from 'vue'

// 元素进入视口后数字从 0 滚动到目标值
export function useCountUp(target: number, el: Ref<HTMLElement | null>, duration = 1600) {
  const current = ref(0)
  let raf = 0
  let io: IntersectionObserver | null = null

  const run = () => {
    const start = performance.now()
    const tick = (now: number) => {
      const p = Math.min((now - start) / duration, 1)
      current.value = Math.round(target * (1 - Math.pow(1 - p, 3)))
      if (p < 1) raf = requestAnimationFrame(tick)
    }
    raf = requestAnimationFrame(tick)
  }

  onMounted(() => {
    if (!el.value) return
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      current.value = target
      return
    }
    io = new IntersectionObserver(([entry]) => {
      if (entry?.isIntersecting) {
        run()
        io?.disconnect()
      }
    })
    io.observe(el.value)
  })

  onBeforeUnmount(() => {
    cancelAnimationFrame(raf)
    io?.disconnect()
  })

  return current
}
