import {
  forumHomeMock,
  forumProfileMock,
  messagesMock,
  notificationsMock,
  searchMock,
  threadDetailMock,
} from "./mock-data";
import { authRepository } from "./auth-repository";
import { readJsonFile, writeJsonFile } from "./storage";
import type {
  AdminUserStatusPayload,
  AdminDashboardPayload,
  CommentRecord,
  CreateCommentPayload,
  CreateThreadPayload,
  ForumDatabase,
  ForumHomePayload,
  ForumProfilePayload,
  ForumThreadSummary,
  MessageRecord,
  MessagesPayload,
  ModerationActionPayload,
  ModerationActionRecord,
  ModerationQueueItem,
  NotificationsPayload,
  ReportRecord,
  SearchPayload,
  SendMessagePayload,
  SidebarItem,
  SubmitReportPayload,
  ThreadAvailability,
  ThreadDetailPayload,
  ThreadRecord,
} from "./types";

const forumDbFallback: ForumDatabase = {
  threads: [],
  comments: [],
  messages: [],
  notificationReads: [],
  reports: [],
  moderationActions: [],
};

function formatRelativeDate(dateIso: string): string {
  const created = new Date(dateIso).getTime();
  const now = Date.now();
  const diffHours = Math.max(1, Math.floor((now - created) / (1000 * 60 * 60)));

  if (diffHours < 24) {
    return `${diffHours} 小时前`;
  }

  const diffDays = Math.floor(diffHours / 24);
  return `${diffDays} 天前`;
}

function toThreadSummary(record: ThreadRecord): ForumThreadSummary {
  return {
    id: record.id,
    title: record.title,
    excerpt: record.body.slice(0, 90),
    author: record.author,
    views: 0,
    likes: 0,
    comments: 0,
    favorites: 0,
    tags: record.tags,
    publishedAtLabel: formatRelativeDate(record.createdAt),
    visibility: "公开",
  };
}

function toThreadComment(record: CommentRecord) {
  return {
    id: record.id,
    author: record.author,
    time: formatRelativeDate(record.createdAt),
    body: record.body,
    likes: 0,
  };
}

function toMessageBubble(record: MessageRecord) {
  return {
    id: record.id,
    sender: record.author === "Choismoke" ? ("me" as const) : ("other" as const),
    author: record.author === "Choismoke" ? "我" : record.author,
    time: formatRelativeDate(record.createdAt),
    body: record.body,
  };
}

function toQueueItem(report: ReportRecord): ModerationQueueItem {
  return {
    id: report.id,
    targetLabel: report.targetLabel,
    targetType: report.targetType,
    reason: report.reason,
    reporter: report.reporter,
    status: report.status,
    createdAtLabel: formatRelativeDate(report.createdAt),
  };
}

async function readForumDb() {
  return readJsonFile<ForumDatabase>("forum-db.json", forumDbFallback);
}

async function writeForumDb(db: ForumDatabase) {
  await writeJsonFile("forum-db.json", db);
}

function getTargetAvailability(db: ForumDatabase, targetType: "thread" | "comment", targetId: string): ThreadAvailability {
  const relatedActions = db.moderationActions
    .filter((action) => action.targetType === targetType && action.targetId === targetId)
    .sort((a, b) => new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime());

  const lastAction = relatedActions[relatedActions.length - 1];

  if (lastAction?.action === "delete") {
    return {
      status: "deleted",
      message: "该内容已被管理员删除。",
    };
  }

  if (lastAction?.action === "hide") {
    return {
      status: "hidden",
      message: "该内容因举报处理中，当前已暂时隐藏。",
    };
  }

  if (lastAction?.action === "restore") {
    return {
      status: "visible",
    };
  }

  const latestReport = [...db.reports]
    .filter((report) => report.targetType === targetType && report.targetId === targetId)
    .sort((a, b) => new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime())
    .pop();

  if (latestReport?.status === "hidden") {
    return {
      status: "hidden",
      message: "该内容因举报处理中，当前已暂时隐藏。",
    };
  }

  return {
    status: "visible",
  };
}

function updateRecordVisibility(db: ForumDatabase, payload: ModerationActionPayload) {
  const report = db.reports.find((item) => item.id === payload.reportId);
  if (!report) {
    return null;
  }

  if (report.targetType === "thread") {
    const thread = db.threads.find((item) => item.id === report.targetId);
    if (thread) {
      if (payload.action === "hide") {
        thread.hidden = true;
      }
      if (payload.action === "restore") {
        thread.hidden = false;
      }
      if (payload.action === "delete") {
        thread.deleted = true;
      }
    }
  }

  if (report.targetType === "comment") {
    const comment = db.comments.find((item) => item.id === report.targetId);
    if (comment) {
      if (payload.action === "hide") {
        comment.hidden = true;
      }
      if (payload.action === "restore") {
        comment.hidden = false;
      }
      if (payload.action === "delete") {
        comment.deleted = true;
      }
    }
  }

  if (payload.action === "hide") {
    report.status = "hidden";
  }
  if (payload.action === "restore") {
    report.status = "resolved";
  }
  if (payload.action === "delete") {
    report.status = "resolved";
  }
  if (payload.action === "mute7d" || payload.action === "banPermanent") {
    report.status = "resolved";
  }

  return report;
}

export const forumRepository = {
  async getHome(): Promise<ForumHomePayload> {
    const db = await readForumDb();
    const createdThreads = [...db.threads]
      .filter((thread) => !thread.deleted && !thread.hidden)
      .reverse()
      .map(toThreadSummary);

    const visibleMockThreads = forumHomeMock.threads.items.filter((thread) => {
      const availability = getTargetAvailability(db, "thread", thread.id);
      return availability.status === "visible";
    });

    return {
      ...forumHomeMock,
      threads: {
        ...forumHomeMock.threads,
        items: [...createdThreads, ...visibleMockThreads],
      },
    };
  },

  async getProfile(): Promise<ForumProfilePayload> {
    const db = await readForumDb();
    const createdThreads = [...db.threads]
      .filter((thread) => !thread.deleted)
      .reverse()
      .slice(0, 3)
      .map((thread) => ({ label: thread.title, href: "/forum/thread" }));

    const visibleMockThreads = forumProfileMock.recentThreads.items.filter((thread) => {
      if (thread.label.includes("做个人项目时")) {
        return getTargetAvailability(db, "thread", threadDetailMock.id).status === "visible";
      }
      return true;
    });

    return {
      ...forumProfileMock,
      recentThreads: {
        ...forumProfileMock.recentThreads,
        items:
          createdThreads.length > 0
            ? [...createdThreads, ...visibleMockThreads].slice(0, 3)
            : visibleMockThreads,
      },
    };
  },

  async getThreadDetail(): Promise<ThreadDetailPayload> {
    const db = await readForumDb();
    const availability = getTargetAvailability(db, "thread", threadDetailMock.id);

    if (availability.status !== "visible") {
      return {
        ...threadDetailMock,
        body: [availability.message ?? "该内容当前不可见。"],
        comments: {
          ...threadDetailMock.comments,
          items: [],
        },
        availability,
      };
    }

    const createdComments = db.comments
      .filter(
        (comment) =>
          comment.threadId === threadDetailMock.id && !comment.deleted && !comment.hidden,
      )
      .map(toThreadComment);

    const visibleMockComments = threadDetailMock.comments.items.filter((comment) => {
      const commentAvailability = getTargetAvailability(db, "comment", comment.id);
      return commentAvailability.status === "visible";
    });

    return {
      ...threadDetailMock,
      comments: {
        ...threadDetailMock.comments,
        items: [...createdComments, ...visibleMockComments],
      },
      stats: threadDetailMock.stats.map((item) =>
        item.label === "回复"
          ? {
              ...item,
              value: String(visibleMockComments.length + createdComments.length),
            }
          : item,
      ),
      availability,
    };
  },

  async getNotifications(): Promise<NotificationsPayload> {
    const db = await readForumDb();
    const items = notificationsMock.items.items.map((item) => ({
      ...item,
      unread: item.unread ? !db.notificationReads.includes(item.id) : false,
    }));
    const unreadCount = items.filter((item) => item.unread).length;

    return {
      ...notificationsMock,
      stats: notificationsMock.stats.map((item) =>
        item.label === "未读" ? { ...item, value: String(unreadCount) } : item,
      ),
      items: {
        ...notificationsMock.items,
        items,
      },
    };
  },

  async getMessages(): Promise<MessagesPayload> {
    const db = await readForumDb();
    const currentThreadId = messagesMock.currentThread.id;
    const createdMessages = db.messages
      .filter((message) => message.threadId === currentThreadId)
      .map(toMessageBubble);

    const updatedThreads = messagesMock.threads.items.map((thread) => {
      const threadMessages = db.messages.filter((message) => message.threadId === thread.id);
      if (threadMessages.length === 0) {
        return thread;
      }

      const last = threadMessages[threadMessages.length - 1];
      return {
        ...thread,
        preview: last.body,
        time: formatRelativeDate(last.createdAt),
      };
    });

    return {
      ...messagesMock,
      threads: {
        ...messagesMock.threads,
        items: updatedThreads,
      },
      messages: {
        ...messagesMock.messages,
        items: [...messagesMock.messages.items, ...createdMessages],
      },
    };
  },

  async getSearchResults(): Promise<SearchPayload> {
    const db = await readForumDb();
    const createdResults = [...db.threads]
      .filter((thread) => !thread.deleted && !thread.hidden)
      .reverse()
      .slice(0, 3)
      .map((thread) => ({
        id: thread.id,
        title: thread.title,
        excerpt: thread.body.slice(0, 80),
        meta: [`作者：${thread.author}`, "浏览 0", "点赞 0"],
        tags: thread.tags,
      }));

    const visibleMockResults = searchMock.results.items.filter((item) => {
      if (item.id === "s2") {
        return getTargetAvailability(db, "thread", threadDetailMock.id).status === "visible";
      }
      return true;
    });

    return {
      ...searchMock,
      results: {
        ...searchMock.results,
        items: [...createdResults, ...visibleMockResults],
      },
    };
  },

  async getAdminDashboard(): Promise<AdminDashboardPayload> {
    const db = await readForumDb();
    const users = await authRepository.getUsers();
    const reports = [...db.reports].reverse().map(toQueueItem);
    const pendingCount = db.reports.filter((report) => report.status === "pending").length;
    const hiddenCount = db.reports.filter((report) => report.status === "hidden").length;
    const bannedCount = users.filter((user) => user.status === "banned").length;
    const recentActions: SidebarItem[] = [...db.moderationActions]
      .reverse()
      .slice(0, 4)
      .map((action) => ({
        label: `${action.action} -> ${action.targetType}:${action.targetId}`,
      }));

    return {
      meta: {
        requestId: `admin-${Date.now()}`,
        generatedAt: new Date().toISOString(),
      },
      stats: [
        { value: String(users.length), label: "当前用户" },
        { value: String(db.threads.filter((item) => !item.deleted).length), label: "本地帖子" },
        { value: String(pendingCount), label: "待处理举报" },
        { value: String(hiddenCount + bannedCount), label: "已限制内容/账号" },
      ],
      reports: {
        meta: {
          requestId: `reports-${Date.now()}`,
          generatedAt: new Date().toISOString(),
        },
        items: reports,
      },
      recentActions: {
        meta: {
          requestId: `actions-${Date.now()}`,
          generatedAt: new Date().toISOString(),
        },
        items:
          recentActions.length > 0
            ? recentActions
            : [{ label: "还没有管理动作写入本地数据。" }],
      },
    };
  },

  async createThread(payload: CreateThreadPayload, actorName?: string): Promise<ThreadRecord> {
    const db = await readForumDb();
    const record: ThreadRecord = {
      id: `thread-${Date.now()}`,
      title: payload.title,
      category: payload.category,
      body: payload.body,
      tags: payload.tags,
      author: actorName || "Choismoke",
      createdAt: new Date().toISOString(),
      hidden: false,
      deleted: false,
    };

    db.threads.push(record);
    await writeForumDb(db);
    return record;
  },

  async createComment(payload: CreateCommentPayload, actorName?: string): Promise<CommentRecord> {
    const db = await readForumDb();
    const record: CommentRecord = {
      id: `comment-${Date.now()}`,
      threadId: payload.threadId,
      author: actorName || "Choismoke",
      body: payload.body,
      createdAt: new Date().toISOString(),
      hidden: false,
      deleted: false,
    };

    db.comments.push(record);
    await writeForumDb(db);
    return record;
  },

  async createMessage(payload: SendMessagePayload, actorName?: string): Promise<MessageRecord> {
    const db = await readForumDb();
    const record: MessageRecord = {
      id: `message-${Date.now()}`,
      threadId: payload.threadId,
      author: actorName || "Choismoke",
      body: payload.body,
      createdAt: new Date().toISOString(),
    };

    db.messages.push(record);
    await writeForumDb(db);
    return record;
  },

  async markNotificationRead(notificationId: string): Promise<number> {
    const db = await readForumDb();
    if (!db.notificationReads.includes(notificationId)) {
      db.notificationReads.push(notificationId);
      await writeForumDb(db);
    }

    const unreadIds = notificationsMock.items.items
      .filter((item) => item.unread)
      .map((item) => item.id)
      .filter((id) => !db.notificationReads.includes(id));

    return unreadIds.length;
  },

  async submitReport(payload: SubmitReportPayload, reporter?: string): Promise<ReportRecord> {
    const db = await readForumDb();
    const report: ReportRecord = {
      id: `report-${Date.now()}`,
      targetType: payload.targetType,
      targetId: payload.targetId,
      targetLabel: payload.targetLabel,
      reason: payload.reason,
      note: payload.note,
      reporter: reporter || "Choismoke",
      status: "hidden",
      createdAt: new Date().toISOString(),
    };

    db.reports.push(report);

    if (payload.targetType === "thread") {
      const thread = db.threads.find((item) => item.id === payload.targetId);
      if (thread) {
        thread.hidden = true;
      }
    }

    if (payload.targetType === "comment") {
      const comment = db.comments.find((item) => item.id === payload.targetId);
      if (comment) {
        comment.hidden = true;
      }
    }

    await writeForumDb(db);
    return report;
  },

  async applyModerationAction(
    payload: ModerationActionPayload,
    audit?: {
      operatorId?: string;
      sourceIp?: string;
      userAgent?: string;
    },
  ): Promise<ModerationActionRecord> {
    const db = await readForumDb();
    const report = updateRecordVisibility(db, payload);
    if (!report) {
      throw new Error("Report not found");
    }

    if (report.targetType === "user") {
      await authRepository.applyUserModeration({
        userId: report.targetId,
        action:
          payload.action === "mute7d" || payload.action === "banPermanent"
            ? payload.action
            : "restore",
      });
    }

    const action: ModerationActionRecord = {
      id: `moderation-${Date.now()}`,
      reportId: payload.reportId,
      action: payload.action,
      targetType: report.targetType,
      targetId: report.targetId,
      createdAt: new Date().toISOString(),
      operator: "Choismoke",
      operatorId: audit?.operatorId,
      sourceIp: audit?.sourceIp,
      userAgent: audit?.userAgent,
    };

    db.moderationActions.push(action);
    await writeForumDb(db);
    return action;
  },

  async recordUserStatusAction(
    payload: AdminUserStatusPayload,
    audit?: {
      operatorId?: string;
      sourceIp?: string;
      userAgent?: string;
    },
  ): Promise<ModerationActionRecord> {
    const db = await readForumDb();

    const action: ModerationActionRecord = {
      id: `moderation-${Date.now()}`,
      reportId: `manual-user-status-${Date.now()}`,
      action: payload.action,
      targetType: "user",
      targetId: payload.userId,
      createdAt: new Date().toISOString(),
      operator: "Choismoke",
      operatorId: audit?.operatorId,
      sourceIp: audit?.sourceIp,
      userAgent: audit?.userAgent,
    };

    db.moderationActions.push(action);
    await writeForumDb(db);
    return action;
  },
};
