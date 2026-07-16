export interface MediaItem {
  id: string
  title: string
  type: 'documentary' | 'short-video' | 'vlog' | 'interview'
  cover?: string
  /** B站视频 BV 号或完整嵌入 URL */
  bilibiliId?: string
  /** 其他视频床链接 */
  externalLink?: string
  duration?: string
  date: string
  description: string
}

export const mediaItems: MediaItem[] = [
  // {
  //   id: 'media-1',
  //   title: '津门寻脉 · 纪录片',
  //   type: 'documentary',
  //   bilibiliId: 'BVxxxxxxxxxx',
  //   duration: '08:30',
  //   date: '2026-07-30',
  //   description: '完整记录本次社会实践全过程',
  // },
]
