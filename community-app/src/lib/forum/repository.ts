import {
  forumHomeMock,
  forumProfileMock,
  messagesMock,
  notificationsMock,
  searchMock,
  threadDetailMock,
} from "./mock-data";
import type {
  ForumHomePayload,
  ForumProfilePayload,
  MessagesPayload,
  NotificationsPayload,
  SearchPayload,
  ThreadDetailPayload,
} from "./types";

export const forumRepository = {
  async getHome(): Promise<ForumHomePayload> {
    return forumHomeMock;
  },

  async getProfile(): Promise<ForumProfilePayload> {
    return forumProfileMock;
  },

  async getThreadDetail(): Promise<ThreadDetailPayload> {
    return threadDetailMock;
  },

  async getNotifications(): Promise<NotificationsPayload> {
    return notificationsMock;
  },

  async getMessages(): Promise<MessagesPayload> {
    return messagesMock;
  },

  async getSearchResults(): Promise<SearchPayload> {
    return searchMock;
  },
};
