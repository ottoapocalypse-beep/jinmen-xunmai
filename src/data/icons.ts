/**
 * 自定义 SVG 图标集
 * 风格：线性轮廓，24×24 viewBox，stroke-width=1.5，round 端点
 * 颜色通过 currentColor 继承
 */

export interface IconDefinition {
  viewBox: string
  paths: string[]
}

export const icons: Record<string, IconDefinition> = {
  /** 首页 — 房屋 */
  home: {
    viewBox: '0 0 24 24',
    paths: [
      'M3 12l9-9 9 9',
      'M5 10v9a1 1 0 001 1h3v-5h6v5h3a1 1 0 001-1v-9',
    ],
  },
  /** 关于实践 — 信息书卷 */
  about: {
    viewBox: '0 0 24 24',
    paths: [
      'M4 4h16a1 1 0 011 1v14a1 1 0 01-1 1H4a1 1 0 01-1-1V5a1 1 0 011-1z',
      'M9 8h6',
      'M9 12h6',
      'M9 16h4',
    ],
  },
  /** 实践动态 — 公告/新闻 */
  activity: {
    viewBox: '0 0 24 24',
    paths: [
      'M6 5h12a1 1 0 011 1v12a1 1 0 01-1 1H6a1 1 0 01-1-1V6a1 1 0 011-1z',
      'M8 3v3',
      'M16 3v3',
      'M8 10h8',
      'M8 14h6',
      'M8 18h4',
    ],
  },
  /** 影像志 — 播放/视频 */
  media: {
    viewBox: '0 0 24 24',
    paths: [
      'M4 6a2 2 0 012-2h12a2 2 0 012 2v12a2 2 0 01-2 2H6a2 2 0 01-2-2V6z',
      'M10 9l6 3-6 3V9z',
    ],
  },
  /** 数字档案库 — 档案箱 */
  archive: {
    viewBox: '0 0 24 24',
    paths: [
      'M4 4h16v3H4z',
      'M5 7v12a1 1 0 001 1h12a1 1 0 001-1V7',
      'M10 11h4',
    ],
  },
  /** 口述史 — 麦克风 */
  oralHistory: {
    viewBox: '0 0 24 24',
    paths: [
      'M12 2a3 3 0 00-3 3v6a3 3 0 006 0V5a3 3 0 00-3-3z',
      'M7 11a5 5 0 0010 0',
      'M12 17v4',
      'M8 21h8',
    ],
  },
  /** 生活地图 — 地图标记 */
  map: {
    viewBox: '0 0 24 24',
    paths: [
      'M12 2a7 7 0 00-7 7c0 5.25 7 13 7 13s7-7.75 7-13a7 7 0 00-7-7z',
      'M12 9a2 2 0 100-4 2 2 0 000 4z',
    ],
  },
  /** 文创展示 — 礼物 */
  cultural: {
    viewBox: '0 0 24 24',
    paths: [
      'M20 12v8a1 1 0 01-1 1H5a1 1 0 01-1-1v-8',
      'M3 8h18v4H3z',
      'M12 8v13',
      'M12 8H7.5a2.5 2.5 0 010-5C10 3 12 5.5 12 8z',
      'M12 8h4.5a2.5 2.5 0 000-5C14 3 12 5.5 12 8z',
    ],
  },
  /** 联系我们 — 邮件 */
  contact: {
    viewBox: '0 0 24 24',
    paths: [
      'M4 5h16a1 1 0 011 1v12a1 1 0 01-1 1H4a1 1 0 01-1-1V6a1 1 0 011-1z',
      'M5 6l7 6 7-6',
    ],
  },
}
