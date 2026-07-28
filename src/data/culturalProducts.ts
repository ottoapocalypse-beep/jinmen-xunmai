export interface CulturalProduct {
  id: string
  name: string
  category: 'badge' | 'emoji'
  description: string
  images: string[]
}

export const culturalProducts: CulturalProduct[] = [
  {
    id: 'cp-badge',
    name: '津门寻脉 · 队徽',
    category: 'badge',
    description: '津门寻脉小队官方队徽，融合北科大校徽、天津地域元素与"寻脉"主题视觉符号。',
    images: ['/jinmen-xunmai/assets/cultural/badge/队徽.jpg'],
  },
  {
    id: 'cp-emoji',
    name: '津门寻脉 · 表情包',
    category: 'emoji',
    description: '基于吉祥物形象设计的微信表情包，共29款日常用语表情，可下载分享使用。',
    images: [
      '/jinmen-xunmai/assets/cultural/emoji/表情_1.jpeg',
      '/jinmen-xunmai/assets/cultural/emoji/表情_2.jpeg',
      '/jinmen-xunmai/assets/cultural/emoji/表情_3.jpeg',
      '/jinmen-xunmai/assets/cultural/emoji/表情_4.jpeg',
      '/jinmen-xunmai/assets/cultural/emoji/表情_5.jpeg',
      '/jinmen-xunmai/assets/cultural/emoji/表情_6.jpeg',
      '/jinmen-xunmai/assets/cultural/emoji/表情_7.jpeg',
      '/jinmen-xunmai/assets/cultural/emoji/表情_8.jpeg',
      '/jinmen-xunmai/assets/cultural/emoji/表情_9.jpeg',
      '/jinmen-xunmai/assets/cultural/emoji/表情_10.jpeg',
      '/jinmen-xunmai/assets/cultural/emoji/表情_11.jpeg',
      '/jinmen-xunmai/assets/cultural/emoji/表情_12.jpeg',
      '/jinmen-xunmai/assets/cultural/emoji/表情_13.jpeg',
      '/jinmen-xunmai/assets/cultural/emoji/表情_14.jpeg',
      '/jinmen-xunmai/assets/cultural/emoji/表情_15.jpeg',
      '/jinmen-xunmai/assets/cultural/emoji/表情_16.jpeg',
      '/jinmen-xunmai/assets/cultural/emoji/表情_17.jpeg',
      '/jinmen-xunmai/assets/cultural/emoji/表情_18.jpeg',
      '/jinmen-xunmai/assets/cultural/emoji/表情_19.jpeg',
      '/jinmen-xunmai/assets/cultural/emoji/表情_20.jpeg',
      '/jinmen-xunmai/assets/cultural/emoji/表情_21.jpeg',
      '/jinmen-xunmai/assets/cultural/emoji/表情_22.jpeg',
      '/jinmen-xunmai/assets/cultural/emoji/表情_23.jpeg',
      '/jinmen-xunmai/assets/cultural/emoji/表情_24.jpeg',
      '/jinmen-xunmai/assets/cultural/emoji/表情_25.jpeg',
      '/jinmen-xunmai/assets/cultural/emoji/表情_26.jpeg',
      '/jinmen-xunmai/assets/cultural/emoji/表情_27.jpeg',
      '/jinmen-xunmai/assets/cultural/emoji/表情_28.jpeg',
      '/jinmen-xunmai/assets/cultural/emoji/表情_29.jpeg',
    ],
  },
]
