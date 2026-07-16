export interface Activity {
  id: string
  title: string
  date: string
  summary: string
  cover?: string
  link?: string
  tags: string[]
  /** 标记为「进行中」，在时间轴上标红强调 */
  active?: boolean
}

/** 实践动态数据（推送、vlog 等） */
export const activities: Activity[] = [
  {
    id: 'act-1',
    title: '津门寻脉 · 实践启程',
    date: '2026-07-15',
    summary: '北京科技大学满井溯源实践团津门寻脉小队正式启程，奔赴天津大学开展校史溯源活动。',
    tags: ['动态', '启程'],
  },
  {
    id: 'act-2',
    title: '初访天津大学校史馆',
    date: '2026-07-16',
    summary: '小队成员走进天津大学校史馆，查阅1952年院系调整相关档案资料。',
    tags: ['动态', '调研'],
    active: true,
  },
]
