# 御坂网络 MISAKA NETWORK

> 分布式计算 · AI 赋能

[misaka-network.top](https://misaka-network.top/) 官网源码。基于 **Vue 3 + TypeScript + Vite** 构建，主题取自「御坂网络」：每个节点都是算力，节点之间以电流相连。

## 特性

- 首页 Canvas 动态节点网络：节点漂移、随机放电、数据包沿连线传输，鼠标靠近会触发电弧
- 四层网络架构图、技术案例切换、行业方案、实时节点监控演示面板
- 滚动入场动画、数字滚动统计，支持 `prefers-reduced-motion`
- 响应式布局，适配手机 / 平板 / 桌面
- 零 UI 依赖，仅 `vue` + `vue-router`

## 开发

```bash
npm install
npm run dev        # 本地开发
npm run build      # 类型检查 + 生产构建，产物在 dist/
npm run preview    # 预览构建产物
```

## 目录结构

```
src/
├── assets/main.css        # 全局样式与设计变量（颜色、字体、间距）
├── components/            # 页面各区块组件
│   ├── NetworkCanvas.vue  # 首屏动态节点网络
│   ├── HeroSection.vue
│   ├── CapabilitiesSection.vue
│   ├── ArchitectureSection.vue
│   ├── CasesSection.vue
│   ├── SolutionsSection.vue
│   ├── MonitorSection.vue
│   └── ContactSection.vue
├── composables/           # v-reveal 入场动画、数字滚动
├── data/site.ts           # 全站文案与联系方式（改内容只需改这里）
├── router/
└── views/
```

## 修改内容

所有文案、统计数字、案例、联系方式都集中在 [`src/data/site.ts`](src/data/site.ts)。

## 部署

`npm run build` 后将 `dist/` 上传到任意静态托管（Nginx / Vercel / Netlify / Cloudflare Pages）。使用 History 路由，Nginx 需要配置回退：

```nginx
location / {
  try_files $uri $uri/ /index.html;
}
```
