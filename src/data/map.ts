export interface MapPoint {
  id: string
  name: string
  description: string
  imageOld?: string
  imageNew?: string
  location?: string
}

/** 校园生活地图 - 今昔对比 */
export const mapPoints: MapPoint[] = [
  // {
  //   id: 'map-1',
  //   name: '天津大学校史馆',
  //   description: '小队查阅档案的主要地点',
  //   location: '天津大学卫津路校区',
  // },
]
