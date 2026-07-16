export interface Member {
  id: string
  name: string
  role: string
  avatar?: string
  description?: string
}

/** 团队成员数据 */
export const teamMembers: Member[] = [
  {
    id: 'member-1',
    name: '队员姓名',
    role: '队长',
    description: '负责统筹协调与对外联络',
  },
  {
    id: 'member-2',
    name: '队员姓名',
    role: '副队长',
    description: '协助队长管理团队事务',
  },
  {
    id: 'member-3',
    name: '队员姓名',
    role: '文案组',
    description: '负责推送撰写与调研报告',
  },
  {
    id: 'member-4',
    name: '队员姓名',
    role: '摄影组',
    description: '负责拍摄与视频剪辑',
  },
  {
    id: 'member-5',
    name: '队员姓名',
    role: '设计组',
    description: '负责文创设计与视觉',
  },
  {
    id: 'member-6',
    name: '队员姓名',
    role: '程序组',
    description: '负责网站开发与维护',
  },
  {
    id: 'member-7',
    name: '队员姓名',
    role: '采访组',
    description: '负责校友访谈与口述记录',
  },
  {
    id: 'member-8',
    name: '队员姓名',
    role: '档案组',
    description: '负责资料整理与数字化',
  },
  {
    id: 'member-9',
    name: '队员姓名',
    role: '宣传组',
    description: '负责新媒体运营与推广',
  },
  {
    id: 'member-10',
    name: '队员姓名',
    role: '后勤组',
    description: '负责物资保障与财务',
  },
]
