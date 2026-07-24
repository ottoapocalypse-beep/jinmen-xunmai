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
  {    id: 'act-11',
    title: '津门寻脉｜天大与北科大的"钢铁奇缘"',
    date: '2026-07-20',
    summary: '公众号第二篇推送发布！讲述1952年院系调整中天津大学矿冶系北上组建北京钢铁工业学院的"硬核"历史。文案：李雨桐，审核：孙凯迪。',
    link: 'https://mp.weixin.qq.com/s/L9I_IYDDdpl-J74BCRmu1w',
    tags: ['推送', '校史'],
    active: true,
  },
  {    id: 'act-12',
    title: '津门寻脉 | 一份校史时间轴，看北科大的"天津基因"',
    date: '2026-07-21',
    summary: '第三篇推送发布！用时间轴讲清北科大的"天津基因"：1895→1952→1960→1988。文案/排版：王子衡，审核：孙凯迪。',
    link: 'https://mp.weixin.qq.com/s/-zyyrm_WiNHi3UmyLIWKog',
    tags: ['推送', '校史', '时间轴'],
    active: true,
  },
  {
    id: 'act-13',
    title: '津门寻脉 | 去天津，找我们大学的前半生',
    date: '2026-07-22',
    summary: '第四篇推送发布！走进天津大学校园，探访校史馆，溯源1952年院系调整中天大矿冶学科并入北京钢铁工业学院的那段历史。',
    link: 'https://mp.weixin.qq.com/s/CIIwTbYOwptqT7619uIDNA',
    tags: ['推送', '校史', '溯源'],
    active: true,
  },
  {
    id: 'act-14',
    title: '实地采访：王克智教授',
    date: '2026-07-23',
    summary: '小队到家中采访原北京科技大学材料学科博士生导师王克智教授。王教授曾任铸造教研室主任，深耕金属凝固与材料表面工程方向，为口述史采集提供了宝贵的学科建设史料。',
    tags: ['采访', '口述史'],
    active: true,
  },
  {
    id: 'act-15',
    title: '数字档案馆改版上线',
    date: '2026-07-24',
    summary: '档案馆完成全面升级：23篇校史全文入库，新增3D知识图谱模式（Three.js三维球面布局，46节点45边），支持列表/图谱双模式切换。每篇档案均可点击阅读全文，条目之间通过[[关联条目]]相互跳转。',
    tags: ['开发', '档案馆', '3D'],
    active: true,
  },
  {
    id: 'act-16',
    title: '管理面板升级 & 采访进度看板上线',
    date: '2026-07-24',
    summary: '管理面板新增GitHub Actions部署状态、内容完整性检查、路由一览、内容概览、站点地图等功能。同时上线采访进度看板（/progress），15位教授采访进展一目了然。',
    tags: ['开发', '管理'],
  },
  {
    id: 'act-17',
    title: '网站特效 & 3D知识图谱上线',
    date: '2026-07-24',
    summary: '全站新增鼠标光晕跟随与卡片3D倾斜效果，提升浏览质感。同时基于Three.js构建的3D知识图谱正式上线，46个节点在三维空间均匀分布，支持拖拽旋转与节点详情查看。',
    tags: ['开发', '特效', '3D'],
    active: true,
  },
]
