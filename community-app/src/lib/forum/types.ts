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

export type ThreadDetailPayload = {
  meta: ApiMeta;
  title: string;
  author: string;
  publishedAt: string;
  editedAt: string;
  tags: string[];
  body: string[];
  stats: StatItem[];
  actions: StatItem[];
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
};

export type AuthSession = {
  isAuthenticated: boolean;
  user: AuthUser | null;
  canPost: boolean;
  canMessage: boolean;
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
