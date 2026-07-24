/**
 * 社会实践任务分工数据（来自分配表）
 */
export interface TaskItem {
  name: string
  status: string
  assignee: string
}

export interface ProfessorEntry {
  id: number
  name: string
  contactStatus: string
  note: string
  interviewTime: string
  interviewPlace: string
  tasks: TaskItem[]
}

/** 整体团队任务（不归属某位教授） */
export const teamTasks: TaskItem[] = [
  { name: '介绍推送', status: '已完成', assignee: '宋品莹' },
  { name: '队徽设计', status: '已完成', assignee: '张雨萌' },
  { name: '吉祥物设计', status: '未完成', assignee: '张雨萌' },
  { name: '表情包设计', status: '未完成', assignee: '张雨萌' },
  { name: '文创设计', status: '未完成', assignee: '张雨萌' },
  { name: '绘画大赛参与', status: '进行中', assignee: '张雨萌' },
  { name: '视频介绍', status: '已完成', assignee: '张雅童' },
  { name: '微电影脚本', status: '审核中', assignee: '张寒婷' },
  { name: '预热推送一', status: '已完成', assignee: '李雨桐' },
  { name: '预热推送二', status: '进行中', assignee: '王子衡' },
  { name: '预热推送三', status: '未完成', assignee: '宋品莹' },
  { name: '预热推送四', status: '未完成', assignee: '李雨桐' },
  { name: '预热推送五', status: '未完成', assignee: '王子衡' },
  { name: '预热推送六', status: '未完成', assignee: '宋品莹' },
  { name: '队伍介绍', status: '已完成', assignee: '宋品莹' },
  { name: '网站搭建', status: '进行中', assignee: '施建锐' },
  { name: '常香荣+王克智精品推送', status: '未开始', assignee: '宋品莹' },
  { name: '2位教授精品推送', status: '未开始', assignee: '王子衡' },
  { name: '2位教授精品推送', status: '未开始', assignee: '李雨桐' },
  { name: '2位教授精品推送', status: '未开始', assignee: '宋品莹' },
  { name: '2位教授精品推送', status: '未开始', assignee: '王子衡' },
  { name: '2位教授精品推送', status: '未开始', assignee: '李雨桐' },
  { name: '2位教授精品推送', status: '未开始', assignee: '王子衡' },
  { name: '去天大校史馆', status: '未开始', assignee: '孙凯迪' },
  { name: '实践中期精品推送', status: '未开始', assignee: '宋品莹' },
  { name: '实践总结推送', status: '未开始', assignee: '宋品莹' },
]

/** 教授采访进度数据 */
export const professorEntries: ProfessorEntry[] = [
  {
    id: 1,
    name: '常香荣',
    contactStatus: '已联系好',
    note: '老师记性不大好，只约好时间，地点定校史馆',
    interviewTime: '7.19下午2:00-3:30',
    interviewPlace: '校史馆',
    tasks: [
      { name: '背景调查', status: '已完成', assignee: '马立菲,张寒婷' },
      { name: '采访稿撰写', status: '已完成', assignee: '马立菲,张寒婷' },
      { name: '联系', status: '已完成', assignee: '孙凯迪' },
      { name: '采访', status: '已完成', assignee: '孙凯迪' },
      { name: '录制视频并剪辑宣发', status: '进行中', assignee: '张雅童' },
      { name: '采访纪实稿', status: '进行中', assignee: '马立菲' },
      { name: '推送制作', status: '未完成', assignee: '王子衡' },
    ],
  },
  {
    id: 2,
    name: '曹国辉',
    contactStatus: '不同意',
    note: '爱人和自己都身体不好，已明确拒绝',
    interviewTime: '',
    interviewPlace: '',
    tasks: [
      { name: '背景调查', status: '', assignee: '' },
      { name: '采访稿撰写', status: '', assignee: '' },
      { name: '联系', status: '', assignee: '' },
      { name: '采访', status: '', assignee: '' },
      { name: '录制视频并剪辑宣发', status: '', assignee: '' },
      { name: '采访纪实', status: '', assignee: '' },
      { name: '推送制作', status: '', assignee: '' },
    ],
  },
  {
    id: 3,
    name: '余永宁',
    contactStatus: '未联系上',
    note: '座机已留言，手机关机',
    interviewTime: '',
    interviewPlace: '',
    tasks: [
      { name: '背景调查', status: '进行中', assignee: '马立菲' },
      { name: '采访稿撰写', status: '进行中', assignee: '马立菲' },
      { name: '联系', status: '进行中', assignee: '孙凯迪' },
      { name: '采访', status: '未开始', assignee: '孙凯迪,张雅童' },
      { name: '录制视频并剪辑宣发', status: '未开始', assignee: '' },
      { name: '采访纪实', status: '未开始', assignee: '' },
      { name: '推送制作', status: '未开始', assignee: '李雨桐' },
    ],
  },
  {
    id: 4,
    name: '周寿增',
    contactStatus: '未联系上',
    note: '座机没交费，手机关机',
    interviewTime: '',
    interviewPlace: '',
    tasks: [
      { name: '背景调查', status: '进行中', assignee: '马立菲' },
      { name: '采访稿撰写', status: '进行中', assignee: '马立菲' },
      { name: '联系', status: '进行中', assignee: '孙凯迪' },
      { name: '采访', status: '未开始', assignee: '孙凯迪,赵望成' },
      { name: '录制视频并剪辑宣发', status: '未开始', assignee: '' },
      { name: '采访纪实', status: '未开始', assignee: '' },
      { name: '推送制作', status: '未开始', assignee: '王子衡' },
    ],
  },
  {
    id: 5,
    name: '谢锡善',
    contactStatus: '已联系好',
    note: '到老师家去',
    interviewTime: '7.24下午3:30',
    interviewPlace: '51栋213号',
    tasks: [
      { name: '背景调查', status: '进行中', assignee: '马立菲' },
      { name: '采访稿撰写', status: '进行中', assignee: '马立菲' },
      { name: '联系', status: '已完成', assignee: '孙凯迪' },
      { name: '采访', status: '未开始', assignee: '孙凯迪' },
      { name: '录制视频并剪辑宣发', status: '未开始', assignee: '赵望成,张雅童' },
      { name: '采访纪实', status: '未开始', assignee: '张雨萌' },
      { name: '推送制作', status: '未开始', assignee: '李雨桐' },
    ],
  },
  {
    id: 6,
    name: '李福燊',
    contactStatus: '',
    note: '住在燕园，郑老师联系过了（询问郑老师）',
    interviewTime: '7.25下午3:00-5:00',
    interviewPlace: '',
    tasks: [
      { name: '背景调查', status: '进行中', assignee: '马立菲' },
      { name: '采访稿撰写', status: '进行中', assignee: '马立菲' },
      { name: '联系', status: '进行中', assignee: '孙凯迪' },
      { name: '采访', status: '未开始', assignee: '孙凯迪,张雅童' },
      { name: '录制视频并剪辑宣发', status: '未开始', assignee: '' },
      { name: '采访纪实', status: '未开始', assignee: '' },
      { name: '推送制作', status: '未开始', assignee: '王子衡' },
    ],
  },
  {
    id: 7,
    name: '刘庆国',
    contactStatus: '未联系上',
    note: '手机没人听，无座机',
    interviewTime: '',
    interviewPlace: '',
    tasks: [
      { name: '背景调查', status: '进行中', assignee: '马立菲' },
      { name: '采访稿撰写', status: '进行中', assignee: '马立菲' },
      { name: '联系', status: '进行中', assignee: '孙凯迪' },
      { name: '采访', status: '未开始', assignee: '孙凯迪,赵望成' },
      { name: '录制视频并剪辑宣发', status: '未开始', assignee: '' },
      { name: '采访纪实', status: '未开始', assignee: '' },
      { name: '推送制作', status: '未开始', assignee: '李雨桐' },
    ],
  },
  {
    id: 8,
    name: '褚武扬',
    contactStatus: '未联系上',
    note: '座机已留言，电话没人接',
    interviewTime: '',
    interviewPlace: '',
    tasks: [
      { name: '背景调查', status: '进行中', assignee: '马立菲' },
      { name: '采访稿撰写', status: '进行中', assignee: '马立菲' },
      { name: '联系', status: '进行中', assignee: '孙凯迪' },
      { name: '采访', status: '未开始', assignee: '孙凯迪,张雅童' },
      { name: '录制视频并剪辑宣发', status: '未开始', assignee: '' },
      { name: '采访纪实', status: '未开始', assignee: '' },
      { name: '推送制作', status: '未开始', assignee: '王子衡' },
    ],
  },
  {
    id: 9,
    name: '王绪',
    contactStatus: '未联系上',
    note: '座机、手机都是空号',
    interviewTime: '',
    interviewPlace: '',
    tasks: [
      { name: '背景调查', status: '进行中', assignee: '张寒婷' },
      { name: '采访稿撰写', status: '进行中', assignee: '张寒婷' },
      { name: '联系', status: '进行中', assignee: '孙凯迪' },
      { name: '采访', status: '未开始', assignee: '孙凯迪,赵望成' },
      { name: '录制视频并剪辑宣发', status: '未开始', assignee: '' },
      { name: '采访纪实', status: '未开始', assignee: '' },
      { name: '推送制作', status: '未开始', assignee: '李雨桐' },
    ],
  },
  {
    id: 10,
    name: '贾成厂',
    contactStatus: '',
    note: '张美娜老师推荐，关工委那边也要采访，可以合作，关工委7.31采访（询问郑老师）',
    interviewTime: '',
    interviewPlace: '',
    tasks: [
      { name: '背景调查', status: '进行中', assignee: '张寒婷' },
      { name: '采访稿撰写', status: '进行中', assignee: '张寒婷' },
      { name: '联系', status: '进行中', assignee: '孙凯迪' },
      { name: '采访', status: '未开始', assignee: '孙凯迪,张雅童' },
      { name: '录制视频并剪辑宣发', status: '未开始', assignee: '' },
      { name: '采访纪实', status: '未开始', assignee: '' },
      { name: '推送制作', status: '未开始', assignee: '王子衡' },
    ],
  },
  {
    id: 11,
    name: '王克智',
    contactStatus: '已联系好',
    note: '到老师家去',
    interviewTime: '7.23下午3:30',
    interviewPlace: '51栋609号',
    tasks: [
      { name: '背景调查', status: '进行中', assignee: '张寒婷' },
      { name: '采访稿撰写', status: '进行中', assignee: '张寒婷' },
      { name: '联系', status: '已完成', assignee: '孙凯迪' },
      { name: '采访', status: '未开始', assignee: '孙凯迪' },
      { name: '录制视频并剪辑宣发', status: '未开始', assignee: '赵望成,张雅童' },
      { name: '采访纪实', status: '未开始', assignee: '张寒婷' },
      { name: '推送制作', status: '未开始', assignee: '李雨桐' },
    ],
  },
  {
    id: 12,
    name: '刘国权',
    contactStatus: '',
    note: '老师推荐几本书，读过了再去找他',
    interviewTime: '',
    interviewPlace: '',
    tasks: [
      { name: '背景调查', status: '进行中', assignee: '张寒婷' },
      { name: '采访稿撰写', status: '进行中', assignee: '张寒婷' },
      { name: '联系', status: '进行中', assignee: '孙凯迪,赵望成' },
      { name: '采访', status: '未开始', assignee: '' },
      { name: '录制视频并剪辑宣发', status: '未开始', assignee: '' },
      { name: '采访纪实', status: '未开始', assignee: '' },
      { name: '推送制作', status: '未开始', assignee: '王子衡' },
    ],
  },
  {
    id: 13,
    name: '柳得橹',
    contactStatus: '',
    note: '等材料学院那边联系',
    interviewTime: '',
    interviewPlace: '',
    tasks: [
      { name: '背景调查', status: '已完成', assignee: '马立菲' },
      { name: '采访稿撰写', status: '进行中', assignee: '张寒婷' },
      { name: '联系', status: '进行中', assignee: '孙凯迪' },
      { name: '采访', status: '未开始', assignee: '孙凯迪,张雅童' },
      { name: '录制视频并剪辑宣发', status: '未开始', assignee: '' },
      { name: '采访纪实', status: '未开始', assignee: '' },
      { name: '推送制作', status: '未开始', assignee: '李雨桐' },
    ],
  },
  {
    id: 14,
    name: '韩汝玢',
    contactStatus: '',
    note: '等材料学院那边联系',
    interviewTime: '',
    interviewPlace: '',
    tasks: [
      { name: '背景调查', status: '已完成', assignee: '马立菲' },
      { name: '采访稿撰写', status: '进行中', assignee: '张寒婷' },
      { name: '联系', status: '进行中', assignee: '孙凯迪' },
      { name: '采访', status: '未开始', assignee: '孙凯迪,赵望成' },
      { name: '录制视频并剪辑宣发', status: '未开始', assignee: '' },
      { name: '采访纪实', status: '未开始', assignee: '' },
      { name: '推送制作', status: '未开始', assignee: '王子衡' },
    ],
  },
  {
    id: 15,
    name: '褚幼义',
    contactStatus: '',
    note: '等材料学院那边联系',
    interviewTime: '',
    interviewPlace: '',
    tasks: [
      { name: '背景调查', status: '已完成', assignee: '马立菲' },
      { name: '采访稿撰写', status: '进行中', assignee: '张寒婷' },
      { name: '联系', status: '进行中', assignee: '孙凯迪' },
      { name: '采访', status: '未开始', assignee: '孙凯迪,张雅童' },
      { name: '录制视频并剪辑宣发', status: '未开始', assignee: '' },
      { name: '采访纪实', status: '未开始', assignee: '' },
      { name: '推送制作', status: '未开始', assignee: '李雨桐' },
    ],
  },
]

/** 团队成员名单 */
export const teamMembers = [
  '孙凯迪', '施建锐', '宋品莹', '李雨桐', '王子衡',
  '张雨萌', '张雅童', '张寒婷', '马立菲', '赵望成',
]

/** 联系状态颜色映射 */
export const contactStatusColors: Record<string, string> = {
  '已联系好': '#10B981',
  '未联系上': '#F59E0B',
  '不同意': '#EF4444',
}

/** 任务完成状态颜色映射 */
export const taskStatusColors: Record<string, string> = {
  '已完成': '#10B981',
  '审核中': '#3B82F6',
  '进行中': '#F59E0B',
  '未完成': '#EF4444',
  '未开始': '#9CA3AF',
}
