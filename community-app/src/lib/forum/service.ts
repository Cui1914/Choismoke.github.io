import { forumRepository } from "./repository";
import type {
  CreateCommentPayload,
  CreateCommentResponse,
  CreateThreadPayload,
  CreateThreadResponse,
  NotificationActionPayload,
  NotificationActionResponse,
  SendMessagePayload,
  SendMessageResponse,
} from "./types";

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

export async function markNotificationRead(
  payload: NotificationActionPayload,
): Promise<NotificationActionResponse> {
  return {
    ok: true,
    message: `通知 ${payload.notificationId} 的已读接口占位已准备好。`,
    unreadCount: 11,
  };
}

export async function sendForumMessage(
  payload: SendMessagePayload,
): Promise<SendMessageResponse> {
  return {
    ok: true,
    message: `会话 ${payload.threadId} 的发送消息接口占位已准备好。`,
    threadId: payload.threadId,
  };
}

export async function createThread(
  payload: CreateThreadPayload,
): Promise<CreateThreadResponse> {
  return {
    ok: true,
    message: `帖子“${payload.title}”的发布接口占位已准备好。`,
    threadId: "thread-preview-created",
  };
}

export async function createComment(
  payload: CreateCommentPayload,
): Promise<CreateCommentResponse> {
  return {
    ok: true,
    message: `帖子 ${payload.threadId} 的评论发布接口占位已准备好。`,
    commentId: "comment-preview-created",
  };
}
