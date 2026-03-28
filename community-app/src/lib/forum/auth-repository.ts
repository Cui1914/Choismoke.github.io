import { randomUUID } from "node:crypto";
import { readJsonFile, writeJsonFile } from "./storage";
import { hashPassword, verifyPassword } from "./password";
import type {
  AuthDatabase,
  AuthSession,
  AuthUser,
  RegisterPayload,
  UpdateSettingsPayload,
} from "./types";

type AuthSessionRecord = {
  token: string;
  userId: string;
  createdAt: string;
  expiresAt: string;
  lastSeenAt: string;
};

const authDbFallback: AuthDatabase = {
  users: [
    {
      id: "user-choismoke",
      username: "Choismoke",
      email: "cui11914@gmail.com",
      bio: "记录项目、生活、游戏和思考。",
      usernameChangesUsed: 3,
      usernameChangesLimit: 10,
      followingVisibility: "公开",
      followersVisibility: "公开",
      dmPolicy: "互关前允许 1 条",
      blockedUsers: [],
      githubUrl: "https://github.com/Cui1914",
      bilibiliUrl: "https://space.bilibili.com/353704869",
      publicEmail: "cui11914@gmail.com",
      status: "active",
      reportCount: 0,
      mutedUntil: null,
      bannedUntil: null,
      passwordHash: "",
      passwordSalt: "",
    },
  ],
  sessions: [],
};

function sanitizeUser(user: AuthUser | null): AuthUser | null {
  if (!user) {
    return null;
  }

  const safeUser = { ...user };
  delete safeUser.passwordHash;
  delete safeUser.passwordSalt;
  return safeUser;
}

async function readAuthDb() {
  const db = await readJsonFile<AuthDatabase>("auth-db.json", authDbFallback);
  if (!db.sessions) {
    db.sessions = [];
  }
  return db;
}

function resolveRestriction(user: AuthUser | null): string | null {
  if (!user) {
    return null;
  }

  if (user.status === "banned") {
    return "账号已被永久封禁，当前不能发帖、评论或私信。";
  }

  if (user.status === "muted") {
    return user.mutedUntil
      ? `账号已被禁言，限制持续到 ${new Date(user.mutedUntil).toLocaleString("zh-CN")}`
      : "账号当前处于禁言状态。";
  }

  return null;
}

function buildSession(user: AuthUser | null): AuthSession {
  const safeUser = sanitizeUser(user);
  const restrictionReason = resolveRestriction(safeUser);
  const isAvailable = Boolean(safeUser) && !restrictionReason;

  return {
    isAuthenticated: Boolean(safeUser),
    user: safeUser,
    canPost: isAvailable,
    canMessage: isAvailable,
    restrictionReason,
  };
}

async function ensurePasswordMaterial(db: AuthDatabase) {
  const user = db.users[0];
  if (!user || (user.passwordHash && user.passwordSalt)) {
    return;
  }

  const initial = await hashPassword("123456");
  user.passwordHash = initial.hash;
  user.passwordSalt = initial.salt;
  await writeJsonFile("auth-db.json", db);
}

function isSessionExpired(session: AuthSessionRecord) {
  return new Date(session.expiresAt).getTime() <= Date.now();
}

export const authRepository = {
  async getSession(): Promise<AuthSession> {
    const db = await readAuthDb();
    await ensurePasswordMaterial(db);
    const user = db.users[0] ?? null;
    return buildSession(user);
  },

  async getSessionByToken(token: string): Promise<AuthSession> {
    const db = await readAuthDb();
    await ensurePasswordMaterial(db);

    const session = db.sessions.find((item) => item.token === token);
    if (!session) {
      return buildSession(null);
    }

    if (isSessionExpired(session)) {
      db.sessions = db.sessions.filter((item) => item.token !== token);
      await writeJsonFile("auth-db.json", db);
      return buildSession(null);
    }

    const user = db.users.find((item) => item.id === session.userId) ?? null;
    session.lastSeenAt = new Date().toISOString();
    await writeJsonFile("auth-db.json", db);
    return buildSession(user);
  },

  async loginByEmail(params: { email: string; password: string }) {
    const db = await readAuthDb();
    await ensurePasswordMaterial(db);

    const user = db.users.find(
      (item) => item.email.toLowerCase() === params.email.toLowerCase().trim(),
    );

    if (!user || !user.passwordHash || !user.passwordSalt) {
      return null;
    }

    const valid = await verifyPassword(params.password, user.passwordSalt, user.passwordHash);
    if (!valid) {
      return null;
    }

    const token = randomUUID();
    const now = new Date();
    const expiresAt = new Date(now.getTime() + 7 * 24 * 60 * 60 * 1000);
    db.sessions.push({
      token,
      userId: user.id,
      createdAt: now.toISOString(),
      lastSeenAt: now.toISOString(),
      expiresAt: expiresAt.toISOString(),
    });
    await writeJsonFile("auth-db.json", db);

    return {
      token,
      session: buildSession(user),
    };
  },

  async registerUser(payload: RegisterPayload): Promise<{ user: AuthUser; token: string }> {
    const db = await readAuthDb();

    const exists = db.users.some(
      (item) => item.email.toLowerCase() === payload.email.toLowerCase().trim(),
    );

    if (exists) {
      throw new Error("该邮箱已注册，请直接登录。");
    }

    const password = await hashPassword(payload.password.trim());

    const createdUser: AuthUser = {
      id: `user-${Date.now()}`,
      username: payload.username,
      email: payload.email.trim(),
      bio: payload.bio,
      usernameChangesUsed: 0,
      usernameChangesLimit: 10,
      followingVisibility: "公开",
      followersVisibility: "公开",
      dmPolicy: "互关前允许 1 条",
      blockedUsers: [],
      githubUrl: "",
      bilibiliUrl: "",
      publicEmail: payload.email.trim(),
      status: "active",
      reportCount: 0,
      mutedUntil: null,
      bannedUntil: null,
      passwordHash: password.hash,
      passwordSalt: password.salt,
    };

    db.users.push(createdUser);

    const token = randomUUID();
    const now = new Date();
    db.sessions.push({
      token,
      userId: createdUser.id,
      createdAt: now.toISOString(),
      lastSeenAt: now.toISOString(),
      expiresAt: new Date(now.getTime() + 7 * 24 * 60 * 60 * 1000).toISOString(),
    });

    await writeJsonFile("auth-db.json", db);

    return {
      user: sanitizeUser(createdUser) as AuthUser,
      token,
    };
  },

  async clearSessionByToken(token: string): Promise<void> {
    const db = await readAuthDb();
    db.sessions = db.sessions.filter((item) => item.token !== token);
    await writeJsonFile("auth-db.json", db);
  },

  async updateSettings(userId: string, payload: UpdateSettingsPayload): Promise<AuthUser> {
    const db = await readAuthDb();
    const index = db.users.findIndex((item) => item.id === userId);
    if (index === -1) {
      throw new Error("未找到目标用户。");
    }

    const currentUser = db.users[index];
    const usernameChanged = currentUser.username !== payload.username;

    const updatedUser: AuthUser = {
      ...currentUser,
      username: payload.username,
      bio: payload.bio,
      followingVisibility: payload.followingVisibility,
      followersVisibility: payload.followersVisibility,
      dmPolicy: payload.dmPolicy,
      githubUrl: payload.githubUrl,
      bilibiliUrl: payload.bilibiliUrl,
      publicEmail: payload.publicEmail,
      usernameChangesUsed: usernameChanged
        ? Math.min(currentUser.usernameChangesUsed + 1, currentUser.usernameChangesLimit)
        : currentUser.usernameChangesUsed,
    };

    db.users[index] = updatedUser;
    await writeJsonFile("auth-db.json", db);
    return sanitizeUser(updatedUser) as AuthUser;
  },

  async getMockUser(): Promise<AuthUser> {
    const db = await readAuthDb();
    await ensurePasswordMaterial(db);
    return sanitizeUser(db.users[0]) as AuthUser;
  },

  async getUsers(): Promise<AuthUser[]> {
    const db = await readAuthDb();
    await ensurePasswordMaterial(db);
    return db.users.map((item) => sanitizeUser(item) as AuthUser);
  },

  async applyUserModeration(params: {
    userId: string;
    action: "mute7d" | "banPermanent" | "restore";
  }): Promise<AuthUser | null> {
    const db = await readAuthDb();
    const index = db.users.findIndex((user) => user.id === params.userId);
    if (index === -1) {
      return null;
    }

    const currentUser = db.users[index];
    const reportCount = (currentUser.reportCount ?? 0) + 1;
    const updatedUser: AuthUser = { ...currentUser, reportCount };

    if (params.action === "mute7d") {
      updatedUser.status = "muted";
      updatedUser.mutedUntil = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString();
      updatedUser.bannedUntil = null;
    }

    if (params.action === "banPermanent") {
      updatedUser.status = "banned";
      updatedUser.bannedUntil = "permanent";
      updatedUser.mutedUntil = null;
    }

    if (params.action === "restore") {
      updatedUser.status = "active";
      updatedUser.mutedUntil = null;
      updatedUser.bannedUntil = null;
    }

    db.users[index] = updatedUser;
    await writeJsonFile("auth-db.json", db);
    return sanitizeUser(updatedUser) as AuthUser;
  },
};
