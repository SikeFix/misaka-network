// 站点内容集中在这里，改文案/联系方式只需要改这个文件

export const brand = {
  name: '御坂网络',
  en: 'MISAKA NETWORK',
  slogan: '分布式计算 · AI 赋能',
  domain: 'misaka-network.top',
}

// TODO: 替换为真实联系方式
export const contact = {
  email: 'contact@misaka-network.top',
  wechat: 'misaka-network',
}

export const navLinks = [
  { id: 'capabilities', label: '核心能力' },
  { id: 'architecture', label: '网络架构' },
  { id: 'cases', label: '技术案例' },
  { id: 'solutions', label: '行业方案' },
  { id: 'monitor', label: '节点监控' },
]

export interface Stat {
  value: number
  suffix: string
  label: string
}

export const stats: Stat[] = [
  { value: 50, suffix: '+', label: '交付项目' },
  { value: 30, suffix: '+', label: '合作客户' },
  { value: 10, suffix: '万+', label: '峰值并发用户' },
  { value: 99, suffix: '%', label: '客户满意度' },
]

export interface Capability {
  code: string
  icon: 'grid' | 'brain' | 'stack'
  title: string
  desc: string
  points: string[]
}

export const capabilities: Capability[] = [
  {
    code: 'NODE-01',
    icon: 'grid',
    title: '分布式计算',
    desc: '把一台机器做不完的事，拆给一张网。任务分片、弹性调度、故障自愈，让算力像电流一样按需流动。',
    points: ['任务分片与调度', '水平弹性扩展', '消息队列削峰', '多活容灾'],
  },
  {
    code: 'NODE-02',
    icon: 'brain',
    title: 'AI 赋能',
    desc: '将大模型接入真实业务：知识库问答、智能批改、数据洞察与业务智能体，落地可度量的效率提升。',
    points: ['大模型私有化接入', 'RAG 知识库', 'AI Agent 工作流', '智能数据分析'],
  },
  {
    code: 'NODE-03',
    icon: 'stack',
    title: '全栈交付',
    desc: '从小程序、Web 应用到管理系统，一支团队覆盖产品、前后端与运维，需求到上线全链路负责。',
    points: ['微信 / 支付宝小程序', '响应式 Web 应用', '管理系统定制', '数据可视化大屏'],
  },
]

export interface Layer {
  tag: string
  title: string
  items: string[]
}

export const layers: Layer[] = [
  { tag: 'L1', title: '接入层', items: ['小程序', 'Web / H5', '开放 API'] },
  { tag: 'L2', title: '调度中枢', items: ['负载均衡', '任务编排', '消息队列'] },
  { tag: 'L3', title: '计算节点网络', items: ['容器集群', 'Redis 缓存', '读写分离'] },
  { tag: 'L4', title: 'AI 推理层', items: ['大模型网关', '向量检索', '智能体'] },
]

export interface CaseMetric {
  value: string
  label: string
  note: string
}

export interface CaseStudy {
  id: string
  title: string
  subtitle: string
  metrics: CaseMetric[]
  highlights: { title: string; desc: string; tags: string[] }[]
}

export const cases: CaseStudy[] = [
  {
    id: 'exam',
    title: '在线考试系统',
    subtitle: '支撑 10 万+ 学生同时在线的高并发考试平台',
    metrics: [
      { value: '10万+', label: '同时在线用户', note: '考试高峰 QPS 5000+' },
      { value: '500万+', label: '考试记录处理', note: '实时统计分析 < 3 秒' },
      { value: '300ms', label: '平均响应时间', note: '首屏加载优化 60%' },
    ],
    highlights: [
      {
        title: '高并发处理架构',
        desc: 'Redis 缓存热点数据、消息队列削峰填谷、数据库读写分离，考试高峰期平稳运行。',
        tags: ['Redis', '负载均衡', '消息队列', '连接池'],
      },
      {
        title: '数据可视化大屏',
        desc: '实时统计参与率、正确率分布与成绩趋势，管理员可实时监控考试进度。',
        tags: ['ECharts', 'WebSocket', '实时推送', '数据聚合'],
      },
      {
        title: '前端性能优化',
        desc: '组件懒加载、路由预加载、资源压缩与 CDN 分发，首屏加载时间优化 60%。',
        tags: ['Vue 3', 'Vite', '懒加载', 'CDN', 'SSR'],
      },
    ],
  },
  {
    id: 'ai-grading',
    title: 'AI 智能批改与题库',
    subtitle: '大模型 + 知识库驱动的作业批改与个性化练习',
    metrics: [
      { value: '秒级', label: '主观题批改反馈', note: '批量任务分布式并行' },
      { value: 'RAG', label: '学科知识库', note: '答案有据可查' },
      { value: '千人千面', label: '个性化推题', note: '基于错题画像' },
    ],
    highlights: [
      {
        title: '批改任务分布式并行',
        desc: '批改请求按班级与题型分片投递至推理节点，失败自动重试，教师端实时回传进度。',
        tags: ['任务队列', '并发控制', '重试机制'],
      },
      {
        title: '知识库增强问答',
        desc: '教材、讲义与题解向量化入库，模型回答附带出处，降低幻觉风险。',
        tags: ['向量检索', 'Embedding', 'RAG'],
      },
      {
        title: '学情画像',
        desc: '错题聚类分析薄弱知识点，自动生成巩固练习与学习路径建议。',
        tags: ['数据分析', 'AI Agent', '可视化'],
      },
    ],
  },
]

export interface Solution {
  no: string
  title: string
  desc: string
  items: string[]
  ai: string
}

export const solutions: Solution[] = [
  {
    no: '01',
    title: '高校管理',
    desc: '为高等院校提供一站式信息化管理解决方案',
    items: ['教务管理系统', '学生信息管理', '宿舍管理系统', '课程排课系统'],
    ai: '智能排课求解 · 校务问答助手',
  },
  {
    no: '02',
    title: '企业管理',
    desc: '助力企业实现数字化管理转型升级',
    items: ['人力资源管理', '项目管理系统', '客户关系管理', '数据统计分析'],
    ai: '经营数据洞察 · 流程智能体',
  },
  {
    no: '03',
    title: '教育行业',
    desc: '专为教育机构打造的数字化教学平台',
    items: ['在线学习平台', '题库考试系统', '作业批改系统', '学习进度跟踪'],
    ai: 'AI 批改 · 个性化学习路径',
  },
]
