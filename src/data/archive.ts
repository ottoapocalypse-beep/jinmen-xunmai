export interface ArchiveItem {
  id: string
  title: string
  category: 'photo' | 'manuscript' | 'document' | 'other' | 'person' | 'event' | 'institution' | 'concept'
  date?: string
  description: string
  imageUrl?: string
  source?: string
}

/** 数字档案库数据 */
export const archiveItems: ArchiveItem[] = [
  // ══════════════════════════
  // 机构
  // ══════════════════════════
  {
    id: 'arch-institution-1',
    title: '北洋西学学堂',
    category: 'institution',
    date: '1895',
    description: '1895年由盛宣怀创办于天津，是中国近代第一所官办西学学堂。设立的矿冶学科是中国近代高等矿冶教育的开端，也是北科大与天津大学共同的学科根脉。',
    source: '百度百科',
  },
  {
    id: 'arch-institution-2',
    title: '天津大学（北洋大学）',
    category: 'institution',
    date: '1895',
    description: '前身为北洋大学。1952年院系调整中，天津大学将其矿冶系（冶金系、采矿系金属矿组等）骨干师生整体抽调北上，参与组建北京钢铁工业学院。',
    source: '百度百科',
  },
  {
    id: 'arch-institution-3',
    title: '北京钢铁工业学院',
    category: 'institution',
    date: '1952',
    description: '1952年由天津大学（原北洋大学）、清华大学等六所国内著名大学的矿冶系科组建而成。校址初设于清华大学生物学馆四楼，1953年迁至海淀满井村。',
    source: '百度百科',
  },
  {
    id: 'arch-institution-4',
    title: '北京钢铁学院',
    category: 'institution',
    date: '1960',
    description: '1960年2月由北京钢铁工业学院更名，同年10月被批准为全国重点高等学校。1988年更名为北京科技大学。',
    source: '百度百科',
  },
  {
    id: 'arch-institution-5',
    title: '北京科技大学',
    category: 'institution',
    date: '1988',
    description: '1988年4月由北京钢铁学院更名。教育部直属多科性研究型大学，国家"211工程"和"985工程优势学科创新平台"重点建设高校。校训：求实鼎新。',
    source: '百度百科',
  },
  {
    id: 'arch-institution-6',
    title: '北京科技大学材料学科',
    category: 'institution',
    description: '国家级重点学科。涵盖金属凝固、材料表面工程、复合管材制备等方向。王克智教授是该学科早期核心带头人。在教育部学科评估中位列全国前3%。',
    source: '百度百科',
  },
  {
    id: 'arch-institution-7',
    title: '北京科技大学校史馆',
    category: 'institution',
    description: '津门寻脉实践团官方指导单位。负责校史研究、展览策划与口述史采集。雄安新校区校史馆正在建设中。',
    source: '津门寻脉实践团',
  },

  // ══════════════════════════
  // 事件
  // ══════════════════════════
  {
    id: 'arch-event-1',
    title: '1952年全国院系调整',
    category: 'event',
    date: '1952',
    description: '1952年，为响应新中国"工业强国"号召，全国高校进行大规模院系调整。天津大学（原北洋大学）冶金系、采矿系金属矿组等整建制调入北京钢铁工业学院。清华大学采矿系采金属组也同时调入。',
    source: '百度百科',
  },
  {
    id: 'arch-event-2',
    title: '北京钢铁工业学院建校',
    category: 'event',
    date: '1952',
    description: '1952年8月，教育部发文指示，以天津大学、清华大学等六校矿冶系科为基础组建北京钢铁工业学院。1953年5月在新址满井村破土动工。',
    source: '百度百科',
  },
  {
    id: 'arch-event-3',
    title: '津门寻脉社会实践',
    category: 'event',
    date: '2026-07',
    description: '北京科技大学满井溯源实践团津门寻脉小队于2026年7月成立，奔赴天津大学溯源校史根脉，计划采访15位退休教授，采集口述史，为雄安新校区校史馆建设提供素材。',
    source: '津门寻脉实践团',
  },

  // ══════════════════════════
  // 人物
  // ══════════════════════════
  {
    id: 'arch-person-16',
    title: '肖纪美 院士',
    category: 'person',
    description: '北京科技大学金属物理方向知名学者，中国科学院院士。曾任中国腐蚀与防护学会理事长。与王克智教授的材料成型工艺方向形成学科互补，共同构成北科大材料学科的完整版图。',
    source: '百度百科',
  },
  {
    id: 'arch-person-17',
    title: '津门寻脉 · 口述史采集项目',
    category: 'person',
    date: '2026-07',
    description: '北京科技大学满井溯源实践团津门寻脉小队于2026年7月开展口述史采集工作。计划采访15位北科大退休教授及校史亲历者，以口述实录形式抢救留存建校以来学科发展记忆。采访内容将统一归档至校史数字资源库，用于雄安新校区校史馆展陈及师生校史育人教学素材。已先后完成常香荣教授采访（7.19）、王克智教授采访（7.23），后续采访持续进行中。',
    source: '津门寻脉实践团',
  },

  // ══════════════════════════
  // 概念
  // ══════════════════════════
  {
    id: 'arch-concept-1',
    title: '院系调整（概念）',
    category: 'concept',
    date: '1952',
    description: '1952年全国高校院系调整是新中国为建立社会主义高等教育体系而进行的一次大规模院校重组。涉及钢铁、地质、矿业、航空等多个领域。天津大学矿冶系整建制调入北京钢铁工业学院。',
    source: '百度百科',
  },
  {
    id: 'arch-concept-2',
    title: '冶金工程',
    category: 'concept',
    description: '北京科技大学核心优势学科。国家一级重点学科，"双一流"建设学科。在教育部学科评估中位列全国第1。涵盖钢铁冶金、有色冶金、冶金物理化学等方向。',
    source: '百度百科',
  },
  {
    id: 'arch-concept-3',
    title: '采矿工程',
    category: 'concept',
    description: '北京科技大学传统优势学科。国家一级重点学科。涵盖采矿工艺、矿山安全、矿物加工等方向。',
    source: '百度百科',
  },
  {
    id: 'arch-concept-4',
    title: '铸造 / 材料成型',
    category: 'concept',
    description: '北京科技大学材料成型及控制工程学科方向。王克智教授曾任铸造教研室主任，深耕金属凝固与铸造工程领域。',
    source: '津门寻脉实践团',
  },
  {
    id: 'arch-concept-5',
    title: '满井村',
    category: 'concept',
    description: '北京科技大学旧址地标。1953年北京钢铁工业学院在此破土动工。"满井溯源"实践团的名字即源于此。',
    source: '百度百科',
  },
  {
    id: 'arch-concept-6',
    title: '求实鼎新（校训）',
    category: 'concept',
    description: '北京科技大学校训。"求实"意为从实际出发、探求真理；"鼎新"语出《周易·杂卦》"鼎，取新也"，意为开拓创新。',
    source: '百度百科',
  },
  {
    id: 'arch-concept-7',
    title: '钢铁强国',
    category: 'concept',
    description: '北京科技大学的精神内核。"举矿冶之星火，抚百年之国殇"，为国家工业建设"淬火成钢"。',
    source: '百度百科',
  },
  {
    id: 'arch-concept-8',
    title: '口述史',
    category: 'concept',
    description: '津门寻脉实践团核心工作方法。通过采访15位退休教授，以口述实录形式抢救留存北科大建校以来的学科发展记忆。采访内容将统一归档至校史数字资源库，用于雄安新校区校史馆展陈。',
    source: '津门寻脉实践团',
  },

  // ══════════════════════════
  // 推送文集
  // ══════════════════════════
  {
    id: 'arch-push-1',
    title: '推送文章：团队集结',
    category: 'document',
    date: '2026-07-13',
    description: '首发推送！津门寻脉小队正式亮相。北京科技大学满井溯源实践团津门寻脉小队奔赴天津大学溯源校史根脉。',
    source: '公众号：北科大校史馆',
  },
  {
    id: 'arch-push-2',
    title: '推送文章：天大与北科大的钢铁奇缘',
    category: 'document',
    date: '2026-07-20',
    description: '讲述1952年院系调整中天津大学矿冶系骨干师生整体北上，参与组建北京钢铁工业学院的历史。',
    source: '公众号：北科大校史馆',
  },
  {
    id: 'arch-push-3',
    title: '推送文章：校史时间轴',
    category: 'document',
    date: '2026-07-21',
    description: '用一条时间轴讲清北科大与生俱来的"天津基因"：1895年北洋西学学堂创办矿冶学科→1952年建校→1960年更名钢院→1988年定名北科大。',
    source: '公众号：北科大校史馆',
  },
  {
    id: 'arch-push-4',
    title: '推送文章：去天津找我们大学的前半生',
    category: 'document',
    date: '2026-07-22',
    description: '走进天津大学（北洋大学）校园，探访校史馆，溯源1952年院系调整中天大矿冶学科并入北京钢铁工业学院的那段历史。',
    source: '公众号：北科大校史馆',
  },

  // ══════════════════════════
  // 知识图谱（JSON 形式）
  // ══════════════════════════
  {
    id: 'arch-kg-1',
    title: '知识图谱：机构网络',
    category: 'other',
    description: '校史机构传承链：北洋西学学堂(1895)→天津大学→参与1952年院系调整→北京钢铁工业学院(1952)→北京钢铁学院(1960)→北京科技大学(1988)。共涉及6个机构节点。',
    source: '津门寻脉知识库',
  },
  {
    id: 'arch-kg-2',
    title: '知识图谱：人物网络',
    category: 'other',
    description: '包括15位退休教授、1位院士（肖纪美）、4位实践团成员（孙凯迪、施建锐、宋品莹、李雨桐），共计20个人物节点。人物关系涵盖任教、受访、采访等。',
    source: '津门寻脉知识库',
  },
  {
    id: 'arch-kg-3',
    title: '知识图谱：事件与概念',
    category: 'other',
    description: '涵盖1952年院系调整、建校、更名、社会实践等5个事件节点，以及冶金、采矿、铸造、口述史、求实鼎新等7个概念节点。',
    source: '津门寻脉知识库',
  },
]
