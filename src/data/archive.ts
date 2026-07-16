export interface ArchiveItem {
  id: string
  title: string
  category: 'photo' | 'manuscript' | 'document' | 'other'
  date?: string
  description: string
  imageUrl?: string
  source?: string
}

/** 数字档案库数据 */
export const archiveItems: ArchiveItem[] = [
  // {
  //   id: 'arch-1',
  //   title: '1952年院系调整批文',
  //   category: 'document',
  //   date: '1952',
  //   description: '天津大学冶金系调入北京钢铁工业学院的原始批文扫描件',
  //   source: '天津大学档案馆',
  // },
]
