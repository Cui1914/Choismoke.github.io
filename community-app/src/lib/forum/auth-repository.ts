import type { AuthSession, AuthUser } from "./types";

const mockUser: AuthUser = {
  id: "user-choismoke",
  username: "Choismoke",
  email: "cui11914@gmail.com",
  bio: "记录项目、生活、游戏和思考。",
  usernameChangesUsed: 3,
  usernameChangesLimit: 10,
};

const mockSession: AuthSession = {
  isAuthenticated: true,
  user: mockUser,
  canPost: true,
  canMessage: true,
};

export const authRepository = {
  async getSession(): Promise<AuthSession> {
    return mockSession;
  },

  async getMockUser(): Promise<AuthUser> {
    return mockUser;
  },
};
