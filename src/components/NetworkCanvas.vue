<script setup lang="ts">
import { onBeforeUnmount, onMounted, ref } from 'vue'

// 御坂网络：漂移的计算节点 + 节点间随机放电 + 沿连线传输的数据包

interface Node {
  x: number
  y: number
  vx: number
  vy: number
  r: number
  hub: boolean
}

interface Arc {
  a: number
  b: number
  life: number
  max: number
  seed: number
}

interface Packet {
  a: number
  b: number
  t: number
  speed: number
}

const canvas = ref<HTMLCanvasElement | null>(null)

let ctx: CanvasRenderingContext2D | null = null
let nodes: Node[] = []
let arcs: Arc[] = []
let packets: Packet[] = []
let w = 0
let h = 0
let raf = 0
let running = false
let inView = false
let ro: ResizeObserver | null = null
let io: IntersectionObserver | null = null
const mouse = { x: -9999, y: -9999 }
const reduced = typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches

const LINK = 150

function rand(min: number, max: number) {
  return min + Math.random() * (max - min)
}

function seed() {
  const count = Math.round(Math.min(110, Math.max(36, (w * h) / 11000)))
  nodes = Array.from({ length: count }, () => {
    const hub = Math.random() < 0.12
    return {
      x: rand(0, w),
      y: rand(0, h),
      vx: rand(-0.18, 0.18),
      vy: rand(-0.18, 0.18),
      r: hub ? rand(2.4, 3.4) : rand(1, 1.8),
      hub,
    }
  })
  arcs = []
  packets = []
}

function resize() {
  const el = canvas.value
  if (!el) return
  const dpr = Math.min(window.devicePixelRatio || 1, 2)
  const rect = el.getBoundingClientRect()
  w = rect.width
  h = rect.height
  el.width = Math.round(w * dpr)
  el.height = Math.round(h * dpr)
  ctx = el.getContext('2d')
  ctx?.setTransform(dpr, 0, 0, dpr, 0, 0)
  seed()
  draw()
}

function dist(a: Node, b: Node) {
  return Math.hypot(a.x - b.x, a.y - b.y)
}

function nearPair(): [number, number] | null {
  for (let tries = 0; tries < 12; tries++) {
    const a = Math.floor(Math.random() * nodes.length)
    const b = Math.floor(Math.random() * nodes.length)
    const na = nodes[a]
    const nb = nodes[b]
    if (a !== b && na && nb && dist(na, nb) < LINK * 1.1) return [a, b]
  }
  return null
}

// 生成一条锯齿状闪电路径
function lightning(x1: number, y1: number, x2: number, y2: number, seedVal: number) {
  const pts: [number, number][] = [[x1, y1]]
  const segs = 7
  const dx = x2 - x1
  const dy = y2 - y1
  const len = Math.hypot(dx, dy) || 1
  const nx = -dy / len
  const ny = dx / len
  let s = seedVal
  for (let i = 1; i < segs; i++) {
    s = (s * 9301 + 49297) % 233280
    const off = (s / 233280 - 0.5) * len * 0.28
    const t = i / segs
    pts.push([x1 + dx * t + nx * off, y1 + dy * t + ny * off])
  }
  pts.push([x2, y2])
  return pts
}

function strokePath(c: CanvasRenderingContext2D, pts: [number, number][]) {
  c.beginPath()
  pts.forEach(([x, y], i) => (i ? c.lineTo(x, y) : c.moveTo(x, y)))
  c.stroke()
}

function step() {
  for (const n of nodes) {
    n.x += n.vx
    n.y += n.vy
    if (n.x < -20) n.x = w + 20
    if (n.x > w + 20) n.x = -20
    if (n.y < -20) n.y = h + 20
    if (n.y > h + 20) n.y = -20
  }

  if (Math.random() < 0.06 && arcs.length < 6) {
    const p = nearPair()
    if (p) arcs.push({ a: p[0], b: p[1], life: 0, max: rand(10, 22), seed: Math.random() * 233280 })
  }
  arcs = arcs.filter((a) => ++a.life < a.max)

  if (Math.random() < 0.12 && packets.length < 24) {
    const p = nearPair()
    if (p) packets.push({ a: p[0], b: p[1], t: 0, speed: rand(0.008, 0.02) })
  }
  packets = packets.filter((p) => (p.t += p.speed) < 1)
}

function draw() {
  const c = ctx
  if (!c) return
  c.clearRect(0, 0, w, h)

  // 节点连线
  c.lineWidth = 1
  for (let i = 0; i < nodes.length; i++) {
    const a = nodes[i]!
    for (let j = i + 1; j < nodes.length; j++) {
      const b = nodes[j]!
      const d = dist(a, b)
      if (d < LINK) {
        c.strokeStyle = `rgba(92, 200, 255, ${(1 - d / LINK) * 0.16})`
        c.beginPath()
        c.moveTo(a.x, a.y)
        c.lineTo(b.x, b.y)
        c.stroke()
      }
    }
  }

  // 数据包
  for (const p of packets) {
    const a = nodes[p.a]
    const b = nodes[p.b]
    if (!a || !b) continue
    const x = a.x + (b.x - a.x) * p.t
    const y = a.y + (b.y - a.y) * p.t
    c.fillStyle = 'rgba(255, 181, 71, 0.9)'
    c.shadowColor = '#ffb547'
    c.shadowBlur = 8
    c.beginPath()
    c.arc(x, y, 1.6, 0, Math.PI * 2)
    c.fill()
  }
  c.shadowBlur = 0

  // 放电
  c.lineCap = 'round'
  c.lineJoin = 'round'
  for (const arc of arcs) {
    const a = nodes[arc.a]
    const b = nodes[arc.b]
    if (!a || !b) continue
    const alpha = 1 - arc.life / arc.max
    const pts = lightning(a.x, a.y, b.x, b.y, arc.seed + Math.floor(arc.life / 3) * 977)
    c.shadowColor = '#5cc8ff'
    c.shadowBlur = 14
    c.strokeStyle = `rgba(92, 200, 255, ${alpha * 0.55})`
    c.lineWidth = 3
    strokePath(c, pts)
    c.shadowBlur = 0
    c.strokeStyle = `rgba(235, 248, 255, ${alpha})`
    c.lineWidth = 1
    strokePath(c, pts)
  }

  // 鼠标附近的节点被“吸引放电”
  if (mouse.x > -999) {
    let k = 0
    for (const n of nodes) {
      const d = Math.hypot(n.x - mouse.x, n.y - mouse.y)
      if (d < 130 && k < 3) {
        k++
        const pts = lightning(n.x, n.y, mouse.x, mouse.y, Math.random() * 233280)
        c.strokeStyle = `rgba(160, 225, 255, ${(1 - d / 130) * 0.7})`
        c.lineWidth = 1
        strokePath(c, pts)
      }
    }
  }

  // 节点
  for (const n of nodes) {
    if (n.hub) {
      c.fillStyle = 'rgba(92, 200, 255, 0.12)'
      c.beginPath()
      c.arc(n.x, n.y, n.r * 4, 0, Math.PI * 2)
      c.fill()
    }
    c.fillStyle = n.hub ? '#bfeaff' : 'rgba(150, 200, 255, 0.7)'
    c.beginPath()
    c.arc(n.x, n.y, n.r, 0, Math.PI * 2)
    c.fill()
  }
}

function loop() {
  if (!running) return
  step()
  draw()
  raf = requestAnimationFrame(loop)
}

// 仅在可见且处于视口内时运行动画
function sync() {
  const should = inView && !document.hidden && !reduced
  if (should && !running) {
    running = true
    raf = requestAnimationFrame(loop)
  } else if (!should && running) {
    running = false
    cancelAnimationFrame(raf)
  }
}

function onMove(e: PointerEvent) {
  const rect = canvas.value?.getBoundingClientRect()
  if (!rect) return
  mouse.x = e.clientX - rect.left
  mouse.y = e.clientY - rect.top
}

function onLeave() {
  mouse.x = mouse.y = -9999
}


onMounted(() => {
  const el = canvas.value
  if (!el) return
  resize()
  ro = new ResizeObserver(resize)
  ro.observe(el)
  io = new IntersectionObserver(([entry]) => {
    inView = !!entry?.isIntersecting
    sync()
  })
  io.observe(el)
  window.addEventListener('pointermove', onMove, { passive: true })
  document.addEventListener('pointerleave', onLeave)
  document.addEventListener('visibilitychange', sync)
})

onBeforeUnmount(() => {
  inView = false
  sync()
  ro?.disconnect()
  io?.disconnect()
  window.removeEventListener('pointermove', onMove)
  document.removeEventListener('pointerleave', onLeave)
  document.removeEventListener('visibilitychange', sync)
})
</script>

<template>
  <canvas ref="canvas" class="network-canvas" aria-hidden="true" />
</template>

<style scoped>
.network-canvas {
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  display: block;
}
</style>
