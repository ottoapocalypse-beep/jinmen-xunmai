export interface CulturalProduct {
  id: string
  name: string
  category: 'badge' | 'postcard' | 'bookmark' | 'other'
  description: string
  imageUrl?: string
}

export const culturalProducts: CulturalProduct[] = [
  // {
  //   id: 'prod-1',
  //   name: '津门寻脉 · 纪念勋章',
  //   category: 'badge',
  //   description: '以校徽与天津大学元素融合设计的珐琅勋章',
  // },
]
