export interface OralHistoryItem {
  id: string
  title: string
  interviewee: string
  date: string
  summary: string
  /** 采访音频/视频链接 */
  audioUrl?: string
  videoUrl?: string
  /** 文字实录 */
  transcript?: string
  tags: string[]
}

/** 口述史数据 */
export const oralHistoryItems: OralHistoryItem[] = [
  // {
  //   id: 'oral-1',
  //   title: '回忆建校初期',
  //   interviewee: 'XXX 教授',
  //   date: '2026-07-18',
  //   summary: 'XXX教授回忆1952年从天津大学调入北京钢铁工业学院的经历',
  //   tags: ['校友访谈'],
  // },
]
