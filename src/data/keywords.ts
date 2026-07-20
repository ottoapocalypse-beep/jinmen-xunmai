/**
 * 关键词定义
 * 页面中出现这些词时会自动标蓝并链接到档案库搜索
 */
export interface KeywordEntry {
  /** 要匹配的关键词（支持多个同义词） */
  terms: string[]
  /** 跳转至档案库时的搜索词 */
  search: string
  /** 可选：指定档案分类过滤 */
  category?: string
}

export const keywords: KeywordEntry[] = [
  {
    terms: ['天津大学', '天大'],
    search: '天津大学',
  },
  {
    terms: ['北洋大学'],
    search: '北洋大学',
  },
  {
    terms: ['北京科技大学', '北科大'],
    search: '北京科技大学',
  },
  {
    terms: ['北京钢铁学院', '北京钢铁工业学院'],
    search: '北京钢铁学院',
  },
  {
    terms: ['1952年院系调整', '院系调整'],
    search: '院系调整',
  },
  {
    terms: ['冶金'],
    search: '冶金',
  },
  {
    terms: ['采矿'],
    search: '采矿',
  },
  {
    terms: ['满井溯源'],
    search: '满井溯源',
  },
  {
    terms: ['校史馆'],
    search: '校史馆',
    category: 'photo',
  },
  {
    terms: ['口述史', '口述'],
    search: '口述史',
  },
  {
    terms: ['校史'],
    search: '校史',
  },
  {
    terms: ['数字档案', '档案库', '档案馆'],
    search: '档案',
  },
  {
    terms: ['队徽', '吉祥物', '文创'],
    search: '文创',
    category: 'photo',
  },
  {
    terms: ['纪录片'],
    search: '纪录片',
  },
  {
    terms: ['老照片', '老照片'],
    search: '老照片',
    category: 'photo',
  },
  {
    terms: ['手稿'],
    search: '手稿',
    category: 'manuscript',
  },
]
