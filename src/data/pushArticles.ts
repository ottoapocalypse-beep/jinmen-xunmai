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
  /** 分块图片数量 */
  chunks: number
  tags: string[]
}

export const pushArticles: PushArticle[] = [
  {
    id: 'push-1',
    title: '津门寻脉 | 团队集结：别让历史消失在风中',
    date: '2026-07-13',
    summary: '首发推送！津门寻脉小队正式亮相。我们是北京科技大学满井溯源实践团津门寻脉小队，奔赴天津大学溯源校史根脉。从满井出发，把根脉传下去。',
    link: 'https://mp.weixin.qq.com/s/HzjxSXjgTGitKw4I5pmZrA',
    chunks: 30,
    tags: ['集结', '首发'],
  },
  {
    id: 'push-2',
    title: '津门寻脉｜天大与北科大的"钢铁奇缘"',
    date: '2026-07-20',
    summary: '1952年院系调整中，天津大学（原北洋大学）冶金、采矿等学科整建制调入北京钢铁工业学院。这段"钢铁奇缘"背后，藏着两所名校共同为国家工业建设"淬火成钢"的浪漫交接。',
    link: 'https://mp.weixin.qq.com/s/L9I_IYDDdpl-J74BCRmu1w',
    chunks: 14,
    tags: ['推送', '校史'],
  },
  {
    id: 'push-3',
    title: '津门寻脉 | 一份校史时间轴，看北科大的"天津基因"',
    date: '2026-07-21',
    summary: '用一条时间轴讲清北科大与生俱来的"天津基因"：1895年北洋西学学堂创办矿冶学科 → 1952年天大矿冶系牵头六校合并建校 → 1960年更名北京钢铁学院 → 1988年定名北京科技大学。',
    link: 'https://mp.weixin.qq.com/s/-zyyrm_WiNHi3UmyLIWKog',
    chunks: 11,
    tags: ['推送', '校史', '时间轴'],
  },
  {
    id: 'push-4',
    title: '津门寻脉 | 去天津，找我们大学的前半生',
    date: '2026-07-22',
    summary: '去天津，找我们大学的前半生——走进天津大学（北洋大学）校园，探访校史馆，溯源1952年院系调整中天大矿冶学科并入北京钢铁工业学院的那段历史。',
    link: 'https://mp.weixin.qq.com/s/CIIwTbYOwptqT7619uIDNA',
    chunks: 10,
    tags: ['推送', '校史', '天津大学', '溯源'],
  },
]
