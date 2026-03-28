import { forumRepository } from "./repository";
import type {
  AdminUserStatusPayload,
  AdminUserStatusResponse,
  AuthUser,
  CreateCommentPayload,
  CreateCommentResponse,
  CreateThreadPayload,
  CreateThreadResponse,
  ModerationActionPayload,
  ModerationActionResponse,
  NotificationActionPayload,
  NotificationActionResponse,
  SendMessagePayload,
  SendMessageResponse,
  SubmitReportPayload,
  SubmitReportResponse,
} from "./types";
import { authRepository } from "./auth-repository";

type ActorContext = {
  actorName: string;
};

type AuditContext = {
  operatorId?: string;
  sourceIp?: string;
  userAgent?: string;
};

export async function getForumHome() {
  return forumRepository.getHome();
}

export async function getForumProfile() {
  return forumRepository.getProfile();
}

export async function getThreadDetail() {
  return forumRepository.getThreadDetail();
}

export async function getNotifications() {
  return forumRepository.getNotifications();
}

export async function getMessages() {
  return forumRepository.getMessages();
}

export async function getSearchResults() {
  return forumRepository.getSearchResults();
}

export async function getAdminDashboard() {
  return forumRepository.getAdminDashboard();
}

export async function getAdminUsers(): Promise<AuthUser[]> {
  return authRepository.getUsers();
}

export async function markNotificationRead(
  payload: NotificationActionPayload,
): Promise<NotificationActionResponse> {
  const unreadCount = await forumRepository.markNotificationRead(payload.notificationId);
  return {
    ok: true,
    message: `通知 ${payload.notificationId} 已写入本地已读记录。`,
    unreadCount,
  };
}

export async function sendForumMessage(
  payload: SendMessagePayload,
  context?: ActorContext,
): Promise<SendMessageResponse> {
  const created = await forumRepository.createMessage(payload, context?.actorName);
  return {
    ok: true,
    message: `会话 ${payload.threadId} 的消息已写入本地数据文件。`,
    threadId: created.threadId,
  };
}

export async function createThread(
  payload: CreateThreadPayload,
  context?: ActorContext,
): Promise<CreateThreadResponse> {
  const created = await forumRepository.createThread(payload, context?.actorName);

  return {
    ok: true,
    message: `帖子“${payload.title}”已写入本地数据文件。`,
    threadId: created.id,
  };
}

export async function createComment(
  payload: CreateCommentPayload,
  context?: ActorContext,
): Promise<CreateCommentResponse> {
  const created = await forumRepository.createComment(payload, context?.actorName);

  return {
    ok: true,
    message: `帖子 ${payload.threadId} 的评论已写入本地数据文件。`,
    commentId: created.id,
  };
}

export async function submitForumReport(
  payload: SubmitReportPayload,
  context?: { reporter: string },
): Promise<SubmitReportResponse> {
  const report = await forumRepository.submitReport(payload, context?.reporter);

  return {
    ok: true,
    message: `举报 ${report.id} 已写入本地数据，并已先隐藏目标内容。`,
    reportId: report.id,
  };
}

export async function applyModerationAction(
  payload: ModerationActionPayload,
  audit?: AuditContext,
): Promise<ModerationActionResponse> {
  const action = await forumRepository.applyModerationAction(payload, audit);

  return {
    ok: true,
    message: `管理动作 ${action.action} 已写入本地数据。`,
    reportId: action.reportId,
  };
}

export async function updateUserStatus(
  payload: AdminUserStatusPayload,
  audit?: AuditContext,
): Promise<AdminUserStatusResponse> {
  const user = await authRepository.applyUserModeration({
    userId: payload.userId,
    action: payload.action,
  });

  if (!user) {
    return {
      ok: false,
      message: "未找到目标用户。",
      userId: payload.userId,
      status: "active",
    };
  }

  await forumRepository.recordUserStatusAction(payload, audit);

  return {
    ok: true,
    message: `用户 ${user.username} 状态已更新为 ${user.status ?? "active"}。`,
    userId: user.id,
    status: user.status ?? "active",
  };
}
