/**
 * 校史知识图谱数据
 * 定义节点（实体）和边（关系），用于可视化关系网络
 */
export interface GraphNode {
  id: string
  label: string
  /** 节点类型：决定颜色 */
  type: 'team' | 'institution' | 'event' | 'person' | 'location' | 'concept'
  /** 在 SVG 画布中的百分比坐标 (0-100) */
  x: number
  y: number
  /** 点击跳转路径 */
  link?: string
  /** 搜索关键词（跳转到档案库） */
  search?: string
}

export interface GraphEdge {
  source: string
  target: string
  /** 关系描述 */
  label?: string
}

/** 节点类型颜色映射 */
export const nodeColors: Record<string, string> = {
  team: '#EC4899',       // 粉色 - 团队
  institution: '#3B82F6', // 蓝色 - 机构
  event: '#F59E0B',      // 橙色 - 事件
  person: '#10B981',     // 绿色 - 人物
  location: '#8B5CF6',   // 紫色 - 地点
  concept: '#6B7280',    // 灰色 - 概念
}

export const nodes: GraphNode[] = [
  // ── 团队 ──
  { id: 'jinmen',      label: '津门寻脉',         type: 'team',        x: 50, y: 10, link: '/about' },
  { id: 'manjing',     label: '满井溯源',         type: 'team',        x: 42, y: 18, link: '/about' },

  // ── 机构 ──
  { id: 'byang',       label: '北洋西学\n学堂',   type: 'institution', x: 15, y: 22 },
  { id: 'tju',         label: '天津大学',         type: 'institution', x: 22, y: 32 },
  { id: 'tsinghua',    label: '清华大学',         type: 'institution', x: 78, y: 25 },
  { id: 'bis',         label: '北京钢铁\n工业学院', type: 'institution', x: 62, y: 42 },
  { id: 'bis2',        label: '北京钢铁\n学院',    type: 'institution', x: 68, y: 52 },
  { id: 'ustb',        label: '北京科技\n大学',    type: 'institution', x: 75, y: 62 },
  { id: 'museum',      label: '校史馆',           type: 'location',    x: 85, y: 70 },
  { id: 'materials',   label: '材料学科',         type: 'institution', x: 60, y: 72 },

  // ── 地点 ──
  { id: 'manjing_loc', label: '满井村',           type: 'location',    x: 55, y: 50 },
  { id: 'tianjin',     label: '天津',             type: 'location',    x: 20, y: 40 },

  // ── 事件 ──
  { id: 'adjustment',  label: '1952年\n院系调整',  type: 'event',      x: 42, y: 38 },
  { id: 'founded',     label: '1952年\n建校',      type: 'event',      x: 55, y: 38 },
  { id: 'renamed60',   label: '1960年\n更名钢院',  type: 'event',      x: 65, y: 48 },
  { id: 'renamed88',   label: '1988年\n更名北科大',type: 'event',      x: 72, y: 58 },
  { id: 'practice',    label: '2026年\n社会实践',  type: 'event',      x: 48, y: 15 },

  // ── 人物（15位教授 + 肖纪美）──
  { id: 'prof_chang',  label: '常香荣',           type: 'person',      x:  8, y: 78 },
  { id: 'prof_cao',    label: '曹国辉',           type: 'person',      x: 18, y: 82 },
  { id: 'prof_yu',     label: '余永宁',           type: 'person',      x: 28, y: 78 },
  { id: 'prof_zhou',   label: '周寿增',           type: 'person',      x: 38, y: 82 },
  { id: 'prof_xie',    label: '谢锡善',           type: 'person',      x: 48, y: 78 },
  { id: 'prof_li1',    label: '李福燊',           type: 'person',      x: 58, y: 82 },
  { id: 'prof_liu1',   label: '刘庆国',           type: 'person',      x: 68, y: 78 },
  { id: 'prof_chu',    label: '褚武扬',           type: 'person',      x: 78, y: 82 },
  { id: 'prof_wangx',  label: '王绪',             type: 'person',      x: 88, y: 78 },
  { id: 'prof_jia',    label: '贾成厂',           type: 'person',      x: 92, y: 85 },
  { id: 'prof_wangk',  label: '王克智',           type: 'person',      x: 50, y: 86 },
  { id: 'prof_liug',   label: '刘国权',           type: 'person',      x: 40, y: 90 },
  { id: 'prof_liu2',   label: '柳得橹',           type: 'person',      x: 60, y: 90 },
  { id: 'prof_han',    label: '韩汝玢',           type: 'person',      x: 72, y: 90 },
  { id: 'prof_chuy',   label: '褚幼义',           type: 'person',      x: 82, y: 88 },
  { id: 'prof_xiao',   label: '肖纪美',           type: 'person',      x: 68, y: 68 },

  // ── 团队成员 ──
  { id: 'sun',         label: '孙凯迪',           type: 'person',      x: 35, y:  5 },
  { id: 'shi',         label: '施建锐',           type: 'person',      x: 45, y:  5 },
  { id: 'song',        label: '宋品莹',           type: 'person',      x: 55, y:  5 },
  { id: 'liyt',        label: '李雨桐',           type: 'person',      x: 65, y:  5 },

  // ── 概念 ──
  { id: 'metallurgy',  label: '冶金',             type: 'concept',     x: 30, y: 48 },
  { id: 'mining',      label: '采矿',             type: 'concept',     x: 38, y: 52 },
  { id: 'casting',     label: '铸造',             type: 'concept',     x: 52, y: 60 },
  { id: 'oral',        label: '口述史',           type: 'concept',     x: 12, y: 72 },
  { id: 'archive',     label: '数字档案库',       type: 'concept',     x: 88, y: 75, link: '/archive' },
  { id: 'push',        label: '推送文集',         type: 'concept',     x: 50, y: 30, link: '/push-articles' },
  { id: 'qiushi',      label: '求实鼎新',         type: 'concept',     x: 80, y: 64 },
  { id: 'steel',       label: '钢铁强国',         type: 'concept',     x: 45, y: 45 },
]

export const edges: GraphEdge[] = [
  // ── 团队关系 ──
  { source: 'jinmen', target: 'manjing',    label: '所属' },
  { source: 'jinmen', target: 'practice',   label: '开展' },
  { source: 'jinmen', target: 'tju',        label: '奔赴' },
  { source: 'jinmen', target: 'ustb',       label: '所属' },
  { source: 'jinmen', target: 'museum',     label: '指导' },

  // ── 机构传承 ──
  { source: 'byang',     target: 'tju',     label: '发展为' },
  { source: 'tju',       target: 'adjustment', label: '经历' },
  { source: 'tsinghua',  target: 'adjustment', label: '参与' },
  { source: 'adjustment', target: 'founded', label: '促成' },
  { source: 'founded',    target: 'bis',    label: '诞生' },
  { source: 'bis',        target: 'bis2',   label: '更名' },
  { source: 'bis2',       target: 'ustb',   label: '更名' },

  // ── 事件关系 ──
  { source: 'adjustment', target: 'metallurgy', label: '涉及' },
  { source: 'adjustment', target: 'mining',     label: '涉及' },
  { source: 'founded',    target: 'manjing_loc', label: '选址' },
  { source: 'tju',        target: 'tianjin',     label: '坐落' },

  // ── 学科关系 ──
  { source: 'bis',   target: 'casting',   label: '设立' },
  { source: 'ustb',  target: 'materials', label: '下设' },
  { source: 'casting', target: 'materials', label: '归属' },
  { source: 'ustb',  target: 'qiushi',    label: '校训' },
  { source: 'ustb',  target: 'steel',     label: '精神' },

  // ── 人物关系（与学科/机构） ──
  { source: 'prof_wangk', target: 'materials', label: '任教' },
  { source: 'prof_xiao',  target: 'materials', label: '任教' },
  { source: 'prof_wangk', target: 'casting',   label: '主任' },
  { source: 'prof_chang',  target: 'museum',   label: '采访' },
  { source: 'prof_xie',    target: 'practice', label: '受访' },
  { source: 'prof_wangk',  target: 'practice', label: '受访' },

  // ── 人物关系（教授与口述史） ──
  { source: 'prof_chang', target: 'oral',    label: '受访' },
  { source: 'prof_xie',   target: 'oral',    label: '受访' },
  { source: 'prof_wangk', target: 'oral',    label: '受访' },
  { source: 'oral',       target: 'archive', label: '收录于' },

  // ── 其他教授（默认全部关联到实践） ──
  { source: 'prof_cao',   target: 'practice', label: '受访' },
  { source: 'prof_yu',    target: 'practice', label: '受访' },
  { source: 'prof_zhou',  target: 'practice', label: '受访' },
  { source: 'prof_liu1',  target: 'practice', label: '受访' },
  { source: 'prof_chu',   target: 'practice', label: '受访' },
  { source: 'prof_wangx', target: 'practice', label: '受访' },
  { source: 'prof_jia',   target: 'practice', label: '受访' },
  { source: 'prof_liug',  target: 'practice', label: '受访' },
  { source: 'prof_li1',   target: 'practice', label: '受访' },
  { source: 'prof_liu2',  target: 'practice', label: '受访' },
  { source: 'prof_han',   target: 'practice', label: '受访' },
  { source: 'prof_chuy',  target: 'practice', label: '受访' },

  // ── 团队成员 ──
  { source: 'sun',   target: 'jinmen', label: '队长' },
  { source: 'shi',   target: 'jinmen', label: '成员' },
  { source: 'song',  target: 'jinmen', label: '成员' },
  { source: 'liyt',  target: 'jinmen', label: '成员' },

  // ── 推送 ──
  { source: 'push', target: 'practice', label: '记录' },
  { source: 'push', target: 'adjustment', label: '讲述' },
]
