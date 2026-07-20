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
  },
  {
    id: 'act-3',
    title: '津门寻脉 | 团队集结：别让历史消失在风中',
    date: '2026-07-13',
    summary: '首发推送！津门寻脉小队正式亮相。我们是北京科技大学满井溯源实践团津门寻脉小队，奔赴天津大学溯源校史根脉。从满井出发，把根脉传下去。',
    link: 'https://mp.weixin.qq.com/s/HzjxSXjgTGitKw4I5pmZrA',
    tags: ['推送', '集结'],
    active: true,
  },
  {
    id: 'act-4',
    title: '队徽与吉祥物设计完成',
    date: '2026-07-11',
    summary: '津门寻脉小队队徽（蓝金配色，书本+水波纹+银杏叶元素）设计定稿，同时吉祥物、文创等视觉方案同步启动。',
    tags: ['设计', '视觉'],
  },
  {
    id: 'act-5',
    title: '视频介绍上线 | B站首发',
    date: '2026-07-13',
    summary: '津门寻脉小队首个介绍视频在B站发布，团队正式亮相社交媒体平台。',
    link: 'https://www.bilibili.com/video/av116928974690924/',
    tags: ['视频', 'B站'],
  },
  {
    id: 'act-6',
    title: '首次实地采访：常香荣老师',
    date: '2026-07-19',
    summary: '小队成员在校史馆采访原北京钢铁学院教师常香荣老师，聆听她讲述1952年院系调整的亲历往事。采访视频正在剪辑中。',
    tags: ['采访', '校史馆'],
    active: true,
  },
  {
    id: 'act-7',
    title: '微电影剧本完成，进入审核',
    date: '2026-07-16',
    summary: '以校史溯源为主题的微电影脚本撰写完成，现已进入审核阶段，预计暑期完成拍摄。',
    tags: ['创作', '微电影'],
  },
  {
    id: 'act-8',
    title: '微信公众号预热推送启动',
    date: '2026-07-17',
    summary: '系列预热推送第一期发布，后续每日更新，持续讲述实践背后的故事与校史脉络。',
    tags: ['推送', '宣传'],
  },
  {
    id: 'act-9',
    title: '网站搭建进行中',
    date: '2026-07-11',
    summary: '津门寻脉·数字档案馆网站启动开发，基于Vue 3 + TypeScript构建，设计为沉浸式校史展览体验。上线倒计时中。',
    tags: ['开发', '网站'],
    active: true,
  },
  {
    id: 'act-10',
    title: '采访预约推进：多位老教授确认受访',
    date: '2026-07-20',
    summary: '谢锡善老师（7.24）、王克智老师（7.23）、李福燊老师（7.25）等多位原北京钢铁学院老教授已确认受访时间，口述史采集工作全面展开。',
    tags: ['采访', '预约'],
    active: true,
  },
]
