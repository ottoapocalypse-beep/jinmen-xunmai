export interface Member {
  id: string
  name: string
  role: string
  avatar?: string
  description?: string
}

/** 团队成员数据（根据任务分配表整理） */
export const teamMembers: Member[] = [
  {
    id: 'member-1',
    name: '孙凯迪',
    role: '队长',
    description: '统筹全局，审核各项产出，协调采访安排',
  },
  {
    id: 'member-2',
    name: '施建锐',
    role: '程序组',
    description: '网站搭建与维护',
  },
  {
    id: 'member-3',
    name: '宋品莹',
    role: '宣传组',
    description: '推送撰写、预热系列与精品内容制作',
  },
  {
    id: 'member-4',
    name: '李雨桐',
    role: '文案组',
    description: '预热推送撰稿与内容创作',
  },
  {
    id: 'member-5',
    name: '王子衡',
    role: '宣传组',
    description: '推送制作与新媒体运营',
  },
  {
    id: 'member-6',
    name: '张雨萌',
    role: '设计组',
    description: '队徽、吉祥物、文创及视觉设计',
  },
  {
    id: 'member-7',
    name: '张雅童',
    role: '摄影组',
    description: '视频拍摄、剪辑与微电影创作',
  },
  {
    id: 'member-8',
    name: '张寒婷',
    role: '文案组',
    description: '微电影脚本撰写与文字创作',
  },
  {
    id: 'member-9',
    name: '马立菲',
    role: '采访组',
    description: '采访背景调查、采访稿撰写与纪实整理',
  },
  {
    id: 'member-10',
    name: '赵望成',
    role: '采访组',
    description: '校友联络与实地采访执行',
  },
]
