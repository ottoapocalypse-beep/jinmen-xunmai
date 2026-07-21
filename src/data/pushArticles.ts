/**
 * 微信公众号推送文章数据
 */
export interface PushArticle {
  id: string
  title: string
  date: string
  summary: string
  /** 公众号文章链接 */
  link: string
  /** 封面图（可从文章页面提取） */
  coverUrl?: string
  tags: string[]
}

export const pushArticles: PushArticle[] = [
  {
    id: 'push-1',
    title: '津门寻脉 | 团队集结：别让历史消失在风中',
    date: '2026-07-13',
    summary: '首发推送！津门寻脉小队正式亮相。我们是北京科技大学满井溯源实践团津门寻脉小队，奔赴天津大学溯源校史根脉。从满井出发，把根脉传下去。',
    link: 'https://mp.weixin.qq.com/s/HzjxSXjgTGitKw4I5pmZrA',
    tags: ['集结', '首发'],
  },
  {
    id: 'push-2',
    title: '津门寻脉 | 实践进行时',
    date: '2026-07-20',
    summary: '实践动态持续更新中，敬请期待后续推送。',
    link: '#',
    tags: ['动态'],
  },
]
