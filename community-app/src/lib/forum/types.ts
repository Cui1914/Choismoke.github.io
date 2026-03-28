export type ApiMeta = {
  requestId: string;
  generatedAt: string;
};

export type ApiListResponse<T> = {
  meta: ApiMeta;
  items: T[];
};

export type LinkItem = {
  href: string;
  label: string;
};

export type StatItem = {
  value: string;
  label: string;
};

export type SidebarItem = {
  label: string;
  href?: string;
};

export type ActivityItem = {
  time: string;
  text: string;
};

export type ForumCategory = {
  id: string;
  name: string;
  slug: string;
  threadCount: number;
};

export type ForumThreadSummary = {
  id: string;
  title: string;
  excerpt: string;
  author: string;
  views: number;
  likes: number;
  comments: number;
  favorites: number;
  tags: string[];
  publishedAtLabel: string;
  visibility?: string;
};

export type ForumAnnouncement = {
  title: string;
  body: string;
  tone: "neutral" | "important";
};

export type ForumHotTopic = {
  id: string;
  title: string;
};

export type ActiveUser = {
  id: string;
  name: string;
  posts: number;
};

export type ForumComment = {
  id: string;
  author: string;
  time: string;
  edited?: boolean;
  body: string;
  likes: number;
};

export type PollOption = {
  id: string;
  label: string;
  percent: number;
  votes: number;
};

export type ThreadAvailability = {
  status: "visible" | "hidden" | "deleted";
  message?: string;
};

export type ThreadDetailPayload = {
  id: string;
  meta: ApiMeta;
  title: string;
  author: string;
  publishedAt: string;
  editedAt: string;
  tags: string[];
  body: string[];
  stats: StatItem[];
  actions: StatItem[];
  availability?: ThreadAvailability;
  poll: {
    question: string;
    totalVotes: number;
    options: PollOption[];
  };
  comments: ApiListResponse<ForumComment>;
  authorSummary: {
    name: string;
    joinedLabel: string;
    stats: string[];
  };
};

export type NotificationItem = {
  id: string;
  kind: "reply" | "like" | "follow" | "report" | "system";
  title: string;
  detail: string;
  time: string;
  unread?: boolean;
};

export type NotificationsPayload = {
  meta: ApiMeta;
  stats: StatItem[];
  filters: string[];
  items: ApiListResponse<NotificationItem>;
};

export type MessageBubble = {
  id: string;
  sender: "me" | "other";
  author: string;
  time: string;
  body: string;
};

export type MessageThread = {
  id: string;
  name: string;
  preview: string;
  time: string;
  unreadCount: number;
  mutualFollow: boolean;
};

export type MessagesPayload = {
  meta: ApiMeta;
  currentThread: {
    id: string;
    name: string;
    status: string;
    intro: string;
  };
  threads: ApiListResponse<MessageThread>;
  messages: ApiListResponse<MessageBubble>;
};

export type SearchResultItem = {
  id: string;
  title: string;
  excerpt: string;
  meta: string[];
  tags: string[];
};

export type SearchPayload = {
  meta: ApiMeta;
  query: string;
  tabs: StatItem[];
  featuredUsers: SidebarItem[];
  results: ApiListResponse<SearchResultItem>;
};

export type ForumHomePayload = {
  meta: ApiMeta;
  intro: {
    eyebrow: string;
    title: string;
    description: string;
    metaItems: string[];
  };
  announcement: ForumAnnouncement;
  stats: StatItem[];
  categories: ForumCategory[];
  quickLinks: LinkItem[];
  threads: ApiListResponse<ForumThreadSummary>;
  hotTopics: ApiListResponse<ForumHotTopic>;
  activeUsers: ApiListResponse<ActiveUser>;
  hotTags: string[];
};

export type ForumProfileSummary = {
  name: string;
  description: string;
  metaItems: string[];
  tags: string[];
};

export type ForumProfilePayload = {
  meta: ApiMeta;
  summary: ForumProfileSummary;
  stats: StatItem[];
  recentThreads: ApiListResponse<SidebarItem>;
  recentActivity: ApiListResponse<ActivityItem>;
  highlights: ApiListResponse<SidebarItem>;
  relationStats: StatItem[];
};

export type AuthUser = {
  id: string;
  username: string;
  email: string;
  bio: string;
  avatarUrl?: string;
  usernameChangesUsed: number;
  usernameChangesLimit: number;
  followingVisibility?: "公开" | "隐藏";
  followersVisibility?: "公开" | "隐藏";
  dmPolicy?: "互关前允许 1 条" | "仅好友可私信";
  blockedUsers?: string[];
  githubUrl?: string;
  bilibiliUrl?: string;
  publicEmail?: string;
  status?: "active" | "muted" | "banned";
  reportCount?: number;
  mutedUntil?: string | null;
  bannedUntil?: string | null;
  passwordHash?: string;
  passwordSalt?: string;
};

export type AuthSession = {
  isAuthenticated: boolean;
  user: AuthUser | null;
  canPost: boolean;
  canMessage: boolean;
  restrictionReason?: string | null;
};

export type LoginPayload = {
  email: string;
  password: string;
};

export type RegisterPayload = {
  username: string;
  email: string;
  password: string;
  bio: string;
};

export type AuthResponse = {
  ok: boolean;
  message: string;
  session: AuthSession;
  sessionToken?: string;
};

export type NotificationActionPayload = {
  notificationId: string;
};

export type NotificationActionResponse = {
  ok: boolean;
  message: string;
  unreadCount: number;
};

export type SendMessagePayload = {
  threadId: string;
  body: string;
};

export type SendMessageResponse = {
  ok: boolean;
  message: string;
  threadId: string;
};

export type CreateThreadPayload = {
  title: string;
  category: string;
  body: string;
  tags: string[];
};

export type CreateThreadResponse = {
  ok: boolean;
  message: string;
  threadId: string;
};

export type CreateCommentPayload = {
  threadId: string;
  body: string;
};

export type CreateCommentResponse = {
  ok: boolean;
  message: string;
  commentId: string;
};

export type ThreadRecord = {
  id: string;
  title: string;
  category: string;
  body: string;
  tags: string[];
  author: string;
  createdAt: string;
  hidden?: boolean;
  deleted?: boolean;
};

export type CommentRecord = {
  id: string;
  threadId: string;
  author: string;
  body: string;
  createdAt: string;
  hidden?: boolean;
  deleted?: boolean;
};

export type MessageRecord = {
  id: string;
  threadId: string;
  author: string;
  body: string;
  createdAt: string;
};

export type ReportReason = "感到不适" | "内容不实";

export type ReportRecord = {
  id: string;
  targetType: "thread" | "comment" | "user";
  targetId: string;
  targetLabel: string;
  reason: ReportReason;
  note: string;
  reporter: string;
  status: "pending" | "hidden" | "resolved" | "rejected";
  createdAt: string;
};

export type ModerationActionRecord = {
  id: string;
  reportId: string;
  action: "hide" | "restore" | "delete" | "mute7d" | "banPermanent";
  targetType: "thread" | "comment" | "user";
  targetId: string;
  createdAt: string;
  operator: string;
  operatorId?: string;
  sourceIp?: string;
  userAgent?: string;
};

export type ForumDatabase = {
  threads: ThreadRecord[];
  comments: CommentRecord[];
  messages: MessageRecord[];
  notificationReads: string[];
  reports: ReportRecord[];
  moderationActions: ModerationActionRecord[];
};

export type AuthDatabase = {
  users: AuthUser[];
  sessions: {
    token: string;
    userId: string;
    createdAt: string;
    expiresAt: string;
    lastSeenAt: string;
  }[];
};

export type UpdateSettingsPayload = {
  username: string;
  bio: string;
  followingVisibility: "公开" | "隐藏";
  followersVisibility: "公开" | "隐藏";
  dmPolicy: "互关前允许 1 条" | "仅好友可私信";
  githubUrl: string;
  bilibiliUrl: string;
  publicEmail: string;
};

export type UpdateSettingsResponse = {
  ok: boolean;
  message: string;
  user: AuthUser;
};

export type ModerationQueueItem = {
  id: string;
  targetLabel: string;
  targetType: "thread" | "comment" | "user";
  reason: ReportReason;
  reporter: string;
  status: "pending" | "hidden" | "resolved" | "rejected";
  createdAtLabel: string;
};

export type AdminDashboardPayload = {
  meta: ApiMeta;
  stats: StatItem[];
  reports: ApiListResponse<ModerationQueueItem>;
  recentActions: ApiListResponse<SidebarItem>;
};

export type SubmitReportPayload = {
  targetType: "thread" | "comment" | "user";
  targetId: string;
  targetLabel: string;
  reason: ReportReason;
  note: string;
};

export type SubmitReportResponse = {
  ok: boolean;
  message: string;
  reportId: string;
};

export type ModerationActionPayload = {
  reportId: string;
  action: "hide" | "restore" | "delete" | "mute7d" | "banPermanent";
};

export type ModerationActionResponse = {
  ok: boolean;
  message: string;
  reportId: string;
};

export type UserStatusAction = "mute7d" | "banPermanent" | "restore";

export type AdminUserStatusPayload = {
  userId: string;
  action: UserStatusAction;
};

export type AdminUserStatusResponse = {
  ok: boolean;
  message: string;
  userId: string;
  status: "active" | "muted" | "banned";
};
