/** 站点全局配置 */
export const siteConfig = {
  title: '满井溯源 · 津门寻脉',
  titleShort: '津门寻脉',
  titleEn: 'Jinmen Xunmai',
  subtitle: '北京科技大学满井溯源实践团津门寻脉小队',
  description:
    '追溯1952年院系调整中天津大学（原北洋大学）冶金、采矿等学科调入北京钢铁工业学院（现北京科技大学）的历史脉络，抢救性挖掘口述史料与实物档案。',
  teamFull: '北京科技大学满井溯源实践团津门寻脉小队',
  teamShort: '津门寻脉小队',
  university: '北京科技大学',
  year: 2026,
  social: {
    wechat: '津门寻脉实践团',
    bilibili: '津门寻脉',
    douyin: '津门寻脉',
    kuaishou: '津门寻脉',
    xiaohongshu: '津门寻脉',
  },
  // 社交媒体链接
  socialLinks: {
    wechat: 'https://mp.weixin.qq.com/s/HzjxSXjgTGitKw4I5pmZrA',
    bilibili: 'https://space.bilibili.com/3707025980656060',
    douyin: 'https://v.douyin.com/6Dr7zTRTxSs/',
    kuaishou: 'https://live.kuaishou.com/profile/3x38a9t8uq6vmsm',
    xiaohongshu: 'https://www.xiaohongshu.com/user/profile/6853d308000000001b021119',
  },
}

/** 导航菜单 */
export interface NavItem {
  path: string
  label: string
  labelEn: string
  icon: string
}

export const navItems: NavItem[] = [
  { path: '/', label: '首页', labelEn: 'Home', icon: 'home' },
  { path: '/about', label: '关于实践', labelEn: 'About', icon: 'about' },
  { path: '/activity', label: '实践动态', labelEn: 'Updates', icon: 'activity' },
  { path: '/media', label: '影像志', labelEn: 'Media', icon: 'media' },
  { path: '/archive', label: '数字档案库', labelEn: 'Archive', icon: 'archive' },
  { path: '/oral-history', label: '口述史', labelEn: 'Oral History', icon: 'oralHistory' },
  { path: '/map', label: '生活地图', labelEn: 'Map', icon: 'map' },
  { path: '/cultural-products', label: '文创展示', labelEn: 'Cultural', icon: 'cultural' },
  { path: '/panorama', label: '720°全景', labelEn: 'Panorama', icon: 'panorama' },
  { path: '/push-articles', label: '推送文集', labelEn: 'Articles', icon: 'promotion' },
  { path: '/graph', label: '3D知识图谱', labelEn: '3D Graph', icon: 'home' },
  { path: '/contact', label: '联系我们', labelEn: 'Contact', icon: 'contact' },
]
