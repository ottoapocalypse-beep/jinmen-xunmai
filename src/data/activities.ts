export interface Activity {
  id: string
  title: string
  date: string
  summary: string
  cover?: string
  link?: string
  tags: string[]
  active?: boolean
}

/** 实践动态数据（严格按任务进度总览文件，序1开始） */
export const activities: Activity[] = [
  // ═══════════════════════════════════
  // 一、团队公共任务（序1～14）
  // ═══════════════════════════════════
  {
    id: 'act-0',
    title: '社会实践开始',
    date: '2026-07-04',
    summary: '津门寻脉小队正式投入社会实践工作，各项任务陆续启动。',
    tags: ['动态', '启程'],
  },
  {
    id: 'act-1',
    title: '介绍推送完成',
    date: '2026-07-04',
    summary: '团队介绍推送发布。负责人：宋品莹，审核：孙凯迪。',
    link: 'https://mp.weixin.qq.com/s/HzjxSXjgTGitKw4I5pmZrA',
    tags: ['推送', '宣传'],
  },
  {
    id: 'act-2',
    title: '队徽设计完成',
    date: '2026-07-05',
    summary: '津门寻脉小队队徽设计定稿。负责人：张雨萌，审核：孙凯迪。',
    tags: ['设计', '视觉'],
  },
  {
    id: 'act-3',
    title: '视频介绍上线',
    date: '2026-07-13',
    summary: '津门寻脉小队首个介绍视频在B站发布。负责人：张雅童，审核：孙凯迪。',
    link: 'https://www.bilibili.com/video/av116928974690924/',
    tags: ['视频', 'B站'],
  },
  {
    id: 'act-4',
    title: '预热推送一完成',
    date: '2026-07-17',
    summary: '系列预热推送第一期发布。负责人：李雨桐，审核：张雅童、宋品莹、孙凯迪。',
    tags: ['推送', '预热'],
  },
  {
    id: 'act-5',
    title: '预热推送二完成',
    date: '2026-07-20',
    summary: '系列预热推送第二期发布。负责人：王子衡，审核：孙凯迪。',
    tags: ['推送', '预热'],
  },
  {
    id: 'act-6',
    title: '预热推送三完成',
    date: '2026-07-21',
    summary: '系列预热推送第三期发布。负责人：宋品莹，审核：孙凯迪。',
    tags: ['推送', '预热'],
  },
  {
    id: 'act-7',
    title: '预热推送四完成',
    date: '2026-07-23',
    summary: '系列预热推送第四期发布。负责人：李雨桐，审核：孙凯迪。',
    tags: ['推送', '预热'],
  },
  {
    id: 'act-8',
    title: '预热推送五完成',
    date: '2026-07-24',
    summary: '系列预热推送第五期发布。负责人：王子衡，审核：孙凯迪。',
    tags: ['推送', '预热'],
  },
  {
    id: 'act-9',
    title: '预热推送六制作中',
    date: '2026-07-25',
    summary: '系列预热推送第六期制作中，预计7.25晚21:30前发布。负责人：宋品莹，审核：孙凯迪。',
    tags: ['推送', '预热'],
    active: true,
  },
  {
    id: 'act-10',
    title: '队伍介绍完成',
    date: '2026-07-16',
    summary: '团队队伍介绍编写完成。负责人：宋品莹，审核：孙凯迪。',
    tags: ['动态', '团队'],
  },
  {
    id: 'act-11',
    title: '网站搭建进行中',
    date: '2026-07-11',
    summary: '津门寻脉·数字档案馆网站启动开发。负责人：施建锐，审核：孙凯迪。',
    tags: ['开发', '网站'],
    active: true,
  },
  {
    id: 'act-12',
    title: '常香荣+王克智精品推送制作中',
    date: '2026-07-23',
    summary: '基于两位教授采访素材的精品推送文章制作中，预计7.29前完成。负责人：宋品莹，审核：孙凯迪。',
    tags: ['推送', '采访'],
    active: true,
  },
  {
    id: 'act-13',
    title: '去天大材料准备进行中',
    date: '2026-07-21',
    summary: '赴天津大学实地调研准备工作中。负责人：赵望成，审核：孙凯迪。',
    tags: ['动态', '调研'],
    active: true,
  },
  {
    id: 'act-14',
    title: '绘画大赛参与进行中',
    date: '2026-07-16',
    summary: '围绕校史主题的绘画大赛创作进行中。负责人：张雨萌，审核：孙凯迪。',
    tags: ['创作', '设计'],
    active: true,
  },

  // ═══════════════════════════════════
  // 二、教授采访任务（仅已联系好）
  // ═══════════════════════════════════
  {
    id: 'act-15',
    title: '采访：常香荣老师',
    date: '2026-07-19',
    summary: '校史馆采访常香荣老师。子任务：背景调查✅、采访稿撰写✅、联系✅、采访✅ → 录制视频🔄(→7.25)、采访纪实稿🔄(→7.24)、推送制作🔄(→7.26)。',
    tags: ['采访', '校史馆'],
    active: true,
  },
  {
    id: 'act-16',
    title: '采访：王克智教授',
    date: '2026-07-23',
    summary: '到家中采访原北科大材料学科博导王克智教授。子任务：背景调查🔄(→7.21)、采访稿撰写🔄(→7.21)、联系✅、采访✅ → 录制视频🔄(→7.27)、采访纪实🔄(→7.25)、推送制作🔄(→7.27)。',
    tags: ['采访', '口述史'],
    active: true,
  },
  {
    id: 'act-17',
    title: '采访排期：谢锡善老师',
    date: '2026-07-24',
    summary: '谢锡善老师采访已排期，地点：51栋213号。子任务：背景调查✅、采访稿撰写✅、联系✅ → 采访📅(7.24)。',
    tags: ['采访', '预约'],
  },

  // ═══════════════════════════════════
  // 三、推送发布记录（以实际发布日为准）
  // ═══════════════════════════════════
  {
    id: 'act-18',
    title: '队徽、吉祥物、表情包推送完成',
    date: '2026-07-28',
    summary: '推送《我们的队徽、吉祥物和表情包正式上线啦！》发布，队徽、吉祥物与专属表情包同步亮相。',
    link: 'https://mp.weixin.qq.com/s/93nNN4-58IHHAppfgOeCKQ',
    tags: ['推送', '文创'],
  },
  {
    id: 'act-19',
    title: '常香荣教授金物故事推送完成',
    date: '2026-07-29',
    summary: '推送《跨越七十载光阴，聆听北科大常香荣教授的金物故事》发布。',
    link: 'https://mp.weixin.qq.com/s/F9NeVr1PWNtiyCAq2bfODw',
    tags: ['推送', '采访'],
  },
  {
    id: 'act-20',
    title: '寻脉天大推送完成',
    date: '2026-07-30',
    summary: '推送《寻脉天大——溯源北科，藏在北洋校史中的钢铁前传》发布，赴天津大学溯源校史。',
    link: 'https://mp.weixin.qq.com/s/kgPXJN9MC7fjqxDFxFAOlg',
    tags: ['推送', '校史'],
  },
  {
    id: 'act-21',
    title: '对话王克智教授推送完成',
    date: '2026-07-31',
    summary: '推送《对话王克智教授：一代材料人的精神坐标》发布。',
    link: 'https://mp.weixin.qq.com/s/b3wIfZ0HAFpJHN14NX2OlA',
    tags: ['推送', '采访'],
  },
  {
    id: 'act-22',
    title: '走近谢锡善教授推送完成',
    date: '2026-08-01',
    summary: '推送《钢骨藏志，材料筑疆——走近谢锡善教授的冶金人生路》发布。',
    link: 'https://mp.weixin.qq.com/s/-R32UJXjfhf5CoBGXftp7A',
    tags: ['推送', '采访'],
  },
  {
    id: 'act-23',
    title: '对话褚武杨教授推送完成',
    date: '2026-08-02',
    summary: '推送《钢铁脊骨：与褚武杨教授的对话》发布。',
    link: 'https://mp.weixin.qq.com/s/hUiDXNZegPHNreE8hCUm3g',
    tags: ['推送', '采访'],
  },
  {
    id: 'act-24',
    title: '复盘采访推送完成',
    date: '2026-08-03',
    summary: '推送《复盘采访，续写未完成的故事》发布，组内复盘采访经验。',
    link: 'https://mp.weixin.qq.com/s/kaImR9j4lkMK4oLgwCmJlQ',
    tags: ['推送', '复盘'],
  },
  {
    id: 'act-25',
    title: '贾成厂教授专访（上篇）推送完成',
    date: '2026-08-04',
    summary: '推送《一个“老兵”的四十八年——贾成厂教授专访纪实·上篇》发布。',
    link: 'https://mp.weixin.qq.com/s/foXj-MZcfzNOXxuAsssv-Q',
    tags: ['推送', '采访'],
  },
  {
    id: 'act-26',
    title: '贾成厂教授专访（下篇）推送完成',
    date: '2026-08-05',
    summary: '推送《“老兵”留下了什么——贾成厂教授专访纪实·下篇》发布。',
    link: 'https://mp.weixin.qq.com/s/J-BaChAilGLZmd6NINZiZQ',
    tags: ['推送', '采访'],
  },
]
