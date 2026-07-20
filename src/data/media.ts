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
  {
    id: 'media-1',
    title: '北京科技大学津门寻脉小队 前来报到啦！',
    type: 'short-video',
    bilibiliId: 'BV1zKKG6EECy',
    duration: '00:25',
    date: '2026-07-16',
    description: '津门寻脉小队集结完毕！我们是北京科技大学满井溯源实践团津门寻脉小队，2026年暑期奔赴天津大学，溯源1952年院系调整的历史脉络。别让历史消失在风中！',
  },
]
