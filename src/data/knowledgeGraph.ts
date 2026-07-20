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
  { id: 'jinmen',      label: '津门寻脉',      type: 'team',        x: 50, y: 28, link: '/about' },
  { id: 'tju',         label: '天津大学',       type: 'institution', x: 25, y: 15, search: '天津大学' },
  { id: 'ustb',        label: '北京科技大学',    type: 'institution', x: 75, y: 15, search: '北京科技大学' },
  { id: 'bis',         label: '北京钢铁\n工业学院', type: 'institution', x: 75, y: 42, search: '北京钢铁学院' },
  { id: 'adjustment',  label: '1952年\n院系调整', type: 'event',      x: 50, y: 50, search: '院系调整' },
  { id: 'metallurgy',  label: '冶金',           type: 'concept',     x: 35, y: 65, search: '冶金' },
  { id: 'mining',      label: '采矿',           type: 'concept',     x: 65, y: 65, search: '采矿' },
  { id: 'oral',        label: '口述史',          type: 'concept',     x: 20, y: 80, search: '口述史' },
  { id: 'archive',     label: '数字档案库',       type: 'concept',     x: 80, y: 80, link: '/archive' },
  { id: 'chang',       label: '常香荣老师',      type: 'person',      x: 10, y: 92, search: '常香荣' },
  { id: 'xie',         label: '谢锡善老师',      type: 'person',      x: 30, y: 92, search: '谢锡善' },
  { id: 'wang',        label: '王克智老师',      type: 'person',      x: 50, y: 92, search: '王克智' },
  { id: 'museum',      label: '校史馆',          type: 'location',    x: 88, y: 52, search: '校史馆' },
]

export const edges: GraphEdge[] = [
  { source: 'jinmen', target: 'tju', label: '奔赴' },
  { source: 'jinmen', target: 'ustb', label: '所属' },
  { source: 'bis', target: 'ustb' },
  { source: 'bis', target: 'adjustment', label: '诞生于' },
  { source: 'tju', target: 'adjustment', label: '经历' },
  { source: 'adjustment', target: 'metallurgy', label: '涉及学科' },
  { source: 'adjustment', target: 'mining', label: '涉及学科' },
  { source: 'chang', target: 'oral', label: '受访' },
  { source: 'xie', target: 'oral', label: '受访' },
  { source: 'wang', target: 'oral', label: '受访' },
  { source: 'museum', target: 'tju', label: '所属' },
  { source: 'museum', target: 'archive', label: '收录' },
  { source: 'oral', target: 'archive', label: '收录于' },
]
