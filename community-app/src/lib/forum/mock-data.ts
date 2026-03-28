import type {
  ApiMeta,
  ForumHomePayload,
  ForumProfilePayload,
  MessagesPayload,
  NotificationsPayload,
  SearchPayload,
  ThreadDetailPayload,
} from "./types";

const baseMeta: ApiMeta = {
  requestId: "mock-forum-v3",
  generatedAt: "2026-03-23T12:00:00+08:00",
};

export const forumHomeMock: ForumHomePayload = {
  meta: baseMeta,
  intro: {
    eyebrow: "置顶说明",
    title: "烟灰缸",
    description:
      "这是挂在 Choismoke 个人站里的独立社区空间。访客可以公开浏览，注册登录后再参与发帖、回复、收藏、关注和私信。",
    metaItems: ["公开浏览", "邮箱注册登录", "统一账号体系"],
  },
  announcement: {
    title: "社区当前状态",
    body:
      "这一版已经覆盖论坛首页、帖子详情、发帖、通知、私信、设置、后台和举报预览，并开始接入本地真实保存。",
    tone: "important",
  },
  stats: [
    { value: "4", label: "主分类" },
    { value: "3", label: "默认排序方式" },
    { value: "10", label: "单帖最多图片" },
    { value: "7", label: "投票选项上限" },
  ],
  categories: [
    { id: "tech", name: "技术", slug: "tech", threadCount: 124 },
    { id: "life", name: "生活", slug: "life", threadCount: 88 },
    { id: "games", name: "游戏", slug: "games", threadCount: 63 },
    { id: "free-chat", name: "随便聊", slug: "free-chat", threadCount: 51 },
  ],
  quickLinks: [
    { href: "/forum/compose", label: "发布帖子" },
    { href: "/forum/notifications", label: "通知中心" },
    { href: "/forum/messages", label: "私信" },
    { href: "/forum/admin", label: "后台预览" },
  ],
  threads: {
    meta: baseMeta,
    items: [
      {
        id: "thread-product-vs-polish",
        title: "做个人项目时，你会先保证功能闭环还是先打磨质感？",
        excerpt:
          "这是一个关于开发优先级的开放讨论。重点不在于唯一答案，而在于你如何判断产品闭环、界面完成度和推进节奏之间的先后关系。",
        author: "AshDrop",
        views: 238,
        likes: 41,
        comments: 18,
        favorites: 12,
        tags: ["技术", "讨论"],
        publishedAtLabel: "3 小时前",
        visibility: "公开",
      },
      {
        id: "thread-indie-game-replay",
        title: "有没有哪款独立游戏，会让你愿意反复回去重玩？",
        excerpt:
          "不只是聊它好不好玩，也想聊它为什么会留下印象。可以从玩法、音乐、美术、叙事或者节奏切入。",
        author: "QuietLoop",
        views: 186,
        likes: 29,
        comments: 9,
        favorites: 7,
        tags: ["游戏", "推荐"],
        publishedAtLabel: "今天",
        visibility: "公开",
      },
      {
        id: "thread-daily-rhythm",
        title: "什么样的日常节奏，最适合长期坚持？",
        excerpt:
          "学习、运动、娱乐和休息会不断拉扯时间。欢迎分享那些你真正能长期维持的小习惯，而不是短期冲刺方案。",
        author: "NorthWindow",
        views: 145,
        likes: 24,
        comments: 15,
        favorites: 10,
        tags: ["生活", "随便聊"],
        publishedAtLabel: "昨天",
        visibility: "公开",
      },
    ],
  },
  hotTopics: {
    meta: baseMeta,
    items: [
      { id: "hot-showcase", title: "个人项目怎样展示，才更适合长期保留和持续更新？" },
      { id: "hot-replay", title: "如果现在要你立刻重玩一款单机游戏，你会选哪一款？" },
      { id: "hot-film", title: "最近有没有哪个电影镜头，过了很久还留在你脑子里？" },
    ],
  },
  activeUsers: {
    meta: baseMeta,
    items: [
      { id: "smoke-signal", name: "SmokeSignal", posts: 42 },
      { id: "archive-field", name: "ArchiveField", posts: 31 },
      { id: "mono-night", name: "MonoNight", posts: 24 },
    ],
  },
  hotTags: ["前端", "设计", "效率", "游戏体验", "日常节奏"],
};

export const forumProfileMock: ForumProfilePayload = {
  meta: baseMeta,
  summary: {
    name: "SmokeSignal",
    description:
      "主要记录个人项目、游戏体验和日常节奏。最近在整理个人项目的展示结构，也在持续参与社区讨论。",
    metaItems: ["注册于 2025-11-08", "关注列表公开", "互关前允许 1 条私信"],
    tags: ["GitHub", "Bilibili", "邮箱"],
  },
  stats: [
    { value: "42", label: "发帖" },
    { value: "108", label: "回复" },
    { value: "260", label: "获赞" },
    { value: "87", label: "粉丝" },
  ],
  recentThreads: {
    meta: baseMeta,
    items: [
      { label: "做个人项目时，你会先保证功能闭环还是先打磨质感？", href: "/forum/thread" },
      { label: "个人项目里，有没有必要保留完整的复盘记录？", href: "/forum/thread" },
      { label: "哪些界面细节最能提升作品的完成度感受？", href: "/forum/thread" },
    ],
  },
  recentActivity: {
    meta: baseMeta,
    items: [
      { time: "今天", text: "发布了 1 篇新帖子，并参与了 3 条讨论回复。" },
      { time: "昨天", text: "更新了个人简介和公开社交链接。" },
    ],
  },
  highlights: {
    meta: baseMeta,
    items: [
      { label: "正在整理个人项目展示结构" },
      { label: "偏好游戏体验与界面完成度相关讨论" },
      { label: "更喜欢稳定持续的社区互动节奏" },
    ],
  },
  relationStats: [
    { value: "56", label: "关注" },
    { value: "87", label: "粉丝" },
    { value: "21", label: "好友" },
  ],
};

export const threadDetailMock: ThreadDetailPayload = {
  id: "thread-product-vs-polish",
  meta: baseMeta,
  title: "做个人项目时，你会先保证功能闭环还是先打磨质感？",
  author: "AshDrop",
  publishedAt: "今天 10:24",
  editedAt: "今天 11:02",
  tags: ["前端", "产品思考", "开发流程"],
  body: [
    "个人项目经常会同时面对两个方向的拉扯：一边是尽快把核心路径做通，另一边是希望页面和整体气质尽早达到可以展示的状态。",
    "我现在更倾向于先把最小可用闭环完成，再去补动效、排版、细节和整体完成度。但如果这个项目本身就是作品型项目，过于粗糙的呈现也可能直接削弱继续做下去的动力。",
    "想听听大家在不同项目场景里的判断标准，尤其是做作品站、个人工具或展示型页面时，你会怎么平衡这两件事。",
  ],
  stats: [
    { value: "238", label: "浏览" },
    { value: "41", label: "点赞" },
    { value: "18", label: "回复" },
    { value: "12", label: "收藏" },
  ],
  actions: [
    { value: "41", label: "点赞" },
    { value: "12", label: "收藏" },
    { value: "6", label: "分享" },
  ],
  poll: {
    question: "如果只能先做一步，你会优先选择哪一个？",
    totalVotes: 124,
    options: [
      { id: "core-loop", label: "先把核心功能闭环做通", percent: 58, votes: 72 },
      { id: "polish-first", label: "先把页面质感立住", percent: 24, votes: 30 },
      { id: "depends", label: "看项目目标再决定", percent: 18, votes: 22 },
    ],
  },
  comments: {
    meta: baseMeta,
    items: [
      {
        id: "c1",
        author: "MonoNight",
        time: "今天 11:18",
        edited: true,
        body:
          "我一般会先让一条核心路径可用。早期界面只要信息层级清楚、阅读不吃力就够了，不然很容易在细节里把进度耗掉。",
        likes: 8,
      },
      {
        id: "c2",
        author: "QuietLoop",
        time: "今天 11:41",
        body:
          "如果是作品型项目，我会先做一个有气质的首屏，再去补功能。因为这类项目本质上就是先卖第一印象。",
        likes: 5,
      },
      {
        id: "c3",
        author: "NorthWindow",
        time: "今天 12:03",
        body:
          "关键还是看项目是给谁用。内部工具先闭环，公开展示的作品先立风格。最难的是两种目标混在一起的时候。",
        likes: 4,
      },
    ],
  },
  authorSummary: {
    name: "AshDrop",
    joinedLabel: "注册 142 天",
    stats: ["发帖 32", "回复 108", "获赞 260"],
  },
};

export const notificationsMock: NotificationsPayload = {
  meta: baseMeta,
  stats: [
    { value: "12", label: "未读" },
    { value: "4", label: "回复" },
    { value: "3", label: "点赞" },
    { value: "2", label: "系统" },
  ],
  filters: ["全部", "回复", "点赞", "关注", "举报", "系统"],
  items: {
    meta: baseMeta,
    items: [
      {
        id: "n1",
        kind: "reply",
        title: "MonoNight 回复了你的帖子",
        detail: "我一般会先让一条核心路径可用，界面早期先保证可读性。",
        time: "10 分钟前",
        unread: true,
      },
      {
        id: "n2",
        kind: "like",
        title: "QuietLoop 点赞了你的帖子",
        detail: "做个人项目时，你会先保证功能闭环还是先打磨质感？",
        time: "35 分钟前",
        unread: true,
      },
      {
        id: "n3",
        kind: "follow",
        title: "ArchiveField 回关了你",
        detail: "现在你们之间的私信不再受首条消息限制。",
        time: "今天",
      },
      {
        id: "n4",
        kind: "report",
        title: "举报处理状态更新",
        detail: "你最近提交的举报已受理，相关内容目前处于临时隐藏状态。",
        time: "今天",
      },
      {
        id: "n5",
        kind: "system",
        title: "系统公告",
        detail: "新人报道区和公开标签广场将在下一轮内容更新中补上。",
        time: "今天",
      },
    ],
  },
};

export const messagesMock: MessagesPayload = {
  meta: baseMeta,
  currentThread: {
    id: "m1",
    name: "QuietLoop",
    status: "已互关，可正常发送图片和连续私信",
    intro: "你们已经互相关注，因此当前会话不受陌生人仅可先发 1 条消息的限制。",
  },
  threads: {
    meta: baseMeta,
    items: [
      {
        id: "m1",
        name: "QuietLoop",
        preview: "想和你聊聊个人项目展示页应该怎么做得更清楚。",
        time: "今天",
        unreadCount: 1,
        mutualFollow: true,
      },
      {
        id: "m2",
        name: "MonoNight",
        preview: "你那条关于项目节奏的帖子挺有意思。",
        time: "昨天",
        unreadCount: 0,
        mutualFollow: false,
      },
      {
        id: "m3",
        name: "ArchiveField",
        preview: "你的周记内容会单独归档，还是一直放在同一条流里？",
        time: "2 天前",
        unreadCount: 0,
        mutualFollow: true,
      },
    ],
  },
  messages: {
    meta: baseMeta,
    items: [
      {
        id: "mb1",
        sender: "other",
        author: "QuietLoop",
        time: "今天 14:03",
        body: "看到你在论坛里的帖子，想问问你是怎么处理‘项目还在更新中，但又想展示出去’这件事的。",
      },
      {
        id: "mb2",
        sender: "me",
        author: "我",
        time: "今天 14:10",
        body: "我一般会留一个稳定的公开概述页，把实验性的过程和临时思路放进周记里，这样项目页本身会更清楚。",
      },
      {
        id: "mb3",
        sender: "other",
        author: "QuietLoop",
        time: "今天 14:17",
        body: "这样分开确实更干净，既能保留过程，又不会让项目主页越来越臃肿。",
      },
    ],
  },
};

export const searchMock: SearchPayload = {
  meta: baseMeta,
  query: "项目质感",
  tabs: [
    { value: "18", label: "全部结果" },
    { value: "9", label: "帖子" },
    { value: "6", label: "标签" },
    { value: "3", label: "用户" },
  ],
  featuredUsers: [
    { label: "AshDrop · 关注产品节奏与展示结构", href: "/forum/profile" },
    { label: "ArchiveField · 偏好项目归档与复盘内容", href: "/forum/profile" },
    { label: "MonoNight · 关注界面清晰度与交付节奏", href: "/forum/profile" },
  ],
  results: {
    meta: baseMeta,
    items: [
      {
        id: "s1",
        title: "个人项目在发布前，应该打磨到什么程度？",
        excerpt: "一条长期讨论串，核心是‘质感’从什么时候开始真正帮助项目，而不是拖慢它。",
        meta: ["作者：ArchiveField", "浏览 128", "点赞 19"],
        tags: ["设计", "作品集"],
      },
      {
        id: "s2",
        title: "做个人项目时，你会先保证功能闭环还是先打磨质感？",
        excerpt: "讨论围绕产品闭环、可见完成度，以及第一印象在个人作品中的实际作用展开。",
        meta: ["作者：AshDrop", "浏览 238", "点赞 41"],
        tags: ["流程", "前端"],
      },
      {
        id: "s3",
        title: "如何长期保留项目复盘，又不让展示页变乱？",
        excerpt: "重点在于如何把稳定的对外展示和不断更新的过程记录分开，让内容更耐看。",
        meta: ["作者：SmokeSignal", "浏览 96", "点赞 14"],
        tags: ["写作", "展示"],
      },
    ],
  },
};
