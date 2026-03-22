import {
  forumHomeMock,
  forumProfileMock,
  messagesMock,
  notificationsMock,
  searchMock,
  threadDetailMock,
} from "./mock-data";
import type {
  CreateCommentPayload,
  CreateCommentResponse,
  CreateThreadPayload,
  CreateThreadResponse,
  ForumHomePayload,
  ForumProfilePayload,
  MessagesPayload,
  NotificationActionPayload,
  NotificationActionResponse,
  NotificationsPayload,
  SearchPayload,
  SendMessagePayload,
  SendMessageResponse,
  ThreadDetailPayload,
} from "./types";

export async function getForumHome(): Promise<ForumHomePayload> {
  return forumHomeMock;
}

export async function getForumProfile(): Promise<ForumProfilePayload> {
  return forumProfileMock;
}

export async function getThreadDetail(): Promise<ThreadDetailPayload> {
  return threadDetailMock;
}

export async function getNotifications(): Promise<NotificationsPayload> {
  return notificationsMock;
}

export async function getMessages(): Promise<MessagesPayload> {
  return messagesMock;
}

export async function getSearchResults(): Promise<SearchPayload> {
  return searchMock;
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
