export interface CulturalProduct {
  id: string
  name: string
  category: 'badge' | 'mascot' | 'emoji' | 'product'
  description: string
  images: string[]
}

export const culturalProducts: CulturalProduct[] = [
  {
    id: 'cp-badge',
    name: '津门寻脉 · 队徽',
    category: 'badge',
    description: '津门寻脉小队官方队徽，融合北科大校徽、天津地域元素与"寻脉"主题视觉符号。',
    images: ['/jinmen-xunmai/assets/cultural/badge/队徽设计.jpeg'],
  },
  {
    id: 'cp-mascot',
    name: '津门寻脉 · 吉祥物',
    category: 'mascot',
    description: '以钢铁小匠为原型的吉祥物设计，共8款不同造型，展现北科大人的精神风貌。',
    images: [
      '/jinmen-xunmai/assets/cultural/mascot/吉祥物_1.jpeg',
      '/jinmen-xunmai/assets/cultural/mascot/吉祥物_2.jpeg',
      '/jinmen-xunmai/assets/cultural/mascot/吉祥物_3.jpeg',
      '/jinmen-xunmai/assets/cultural/mascot/吉祥物_4.jpeg',
      '/jinmen-xunmai/assets/cultural/mascot/吉祥物_5.jpeg',
      '/jinmen-xunmai/assets/cultural/mascot/吉祥物_6.jpeg',
      '/jinmen-xunmai/assets/cultural/mascot/吉祥物_7.jpeg',
      '/jinmen-xunmai/assets/cultural/mascot/吉祥物_8.jpeg',
    ],
  },
  {
    id: 'cp-emoji',
    name: '津门寻脉 · 表情包',
    category: 'emoji',
    description: '基于吉祥物形象设计的微信表情包，共7款日常用语表情，可在线分享使用。',
    images: [
      '/jinmen-xunmai/assets/cultural/emoji/表情_1.jpeg',
      '/jinmen-xunmai/assets/cultural/emoji/表情_2.jpeg',
      '/jinmen-xunmai/assets/cultural/emoji/表情_3.jpeg',
      '/jinmen-xunmai/assets/cultural/emoji/表情_4.jpeg',
      '/jinmen-xunmai/assets/cultural/emoji/表情_5.jpeg',
      '/jinmen-xunmai/assets/cultural/emoji/表情_6.jpeg',
      '/jinmen-xunmai/assets/cultural/emoji/表情_7.jpeg',
    ],
  },
  {
    id: 'cp-products',
    name: '津门寻脉 · 文创产品',
    category: 'product',
    description: '系列文创产品设计，含明信片、书签、纪念卡等，融合校史元素与天津地域文化。',
    images: [
      '/jinmen-xunmai/assets/cultural/product/文创_1.jpeg',
      '/jinmen-xunmai/assets/cultural/product/文创_2.jpeg',
      '/jinmen-xunmai/assets/cultural/product/文创_3.jpeg',
      '/jinmen-xunmai/assets/cultural/product/文创_4.jpeg',
      '/jinmen-xunmai/assets/cultural/product/文创_5.jpeg',
      '/jinmen-xunmai/assets/cultural/product/文创_6.jpeg',
      '/jinmen-xunmai/assets/cultural/product/文创_7.jpeg',
      '/jinmen-xunmai/assets/cultural/product/文创_8.jpeg',
      '/jinmen-xunmai/assets/cultural/product/文创_9.jpeg',
      '/jinmen-xunmai/assets/cultural/product/文创_10.jpeg',
      '/jinmen-xunmai/assets/cultural/product/文创_11.jpeg',
      '/jinmen-xunmai/assets/cultural/product/文创_12.jpeg',
      '/jinmen-xunmai/assets/cultural/product/文创_13.jpeg',
    ],
  },
]
