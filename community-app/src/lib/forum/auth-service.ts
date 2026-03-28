import { authRepository } from "./auth-repository";
import type {
  AuthResponse,
  LoginPayload,
  RegisterPayload,
  UpdateSettingsPayload,
  UpdateSettingsResponse,
} from "./types";

export async function getAuthSession() {
  return authRepository.getSession();
}

export async function getAuthSessionByToken(token: string) {
  return authRepository.getSessionByToken(token);
}

export async function loginWithEmail(payload: LoginPayload): Promise<AuthResponse> {
  const hasEmail = payload.email.includes("@");
  const hasPassword = payload.password.trim().length >= 6;

  if (!hasEmail || !hasPassword) {
    return {
      ok: false,
      message: "请输入正确的邮箱和至少 6 位密码。",
      session: {
        isAuthenticated: false,
        user: null,
        canPost: false,
        canMessage: false,
      },
    };
  }

  const result = await authRepository.loginByEmail({
    email: payload.email,
    password: payload.password,
  });

  if (!result) {
    return {
      ok: false,
      message: "邮箱或密码错误。",
      session: {
        isAuthenticated: false,
        user: null,
        canPost: false,
        canMessage: false,
      },
    };
  }

  return {
    ok: true,
    message: "登录成功。",
    session: result.session,
    sessionToken: result.token,
  };
}

export async function registerWithEmail(payload: RegisterPayload): Promise<AuthResponse> {
  const validUsername = payload.username.trim().length >= 2 && payload.username.trim().length <= 10;
  const validEmail = payload.email.includes("@");
  const validPassword = payload.password.trim().length >= 6;
  const validBio = payload.bio.length <= 50;

  if (!validUsername || !validEmail || !validPassword || !validBio) {
    return {
      ok: false,
      message: "注册信息不符合规则，请检查用户名、邮箱、密码和简介长度。",
      session: {
        isAuthenticated: false,
        user: null,
        canPost: false,
        canMessage: false,
      },
    };
  }

  try {
    const result = await authRepository.registerUser(payload);

    return {
      ok: true,
      message: "注册成功，已自动登录。",
      session: {
        isAuthenticated: true,
        user: result.user,
        canPost: true,
        canMessage: true,
      },
      sessionToken: result.token,
    };
  } catch (error) {
    return {
      ok: false,
      message: error instanceof Error ? error.message : "注册失败，请稍后重试。",
      session: {
        isAuthenticated: false,
        user: null,
        canPost: false,
        canMessage: false,
      },
    };
  }
}

export async function updateUserSettings(
  userId: string,
  payload: UpdateSettingsPayload,
): Promise<UpdateSettingsResponse> {
  const validUsername = payload.username.trim().length >= 2 && payload.username.trim().length <= 10;
  const validBio = payload.bio.length <= 50;
  const validEmail = payload.publicEmail.includes("@");

  if (!validUsername || !validBio || !validEmail) {
    throw new Error("设置内容不符合当前规则，请检查用户名、简介和公开邮箱。");
  }

  const user = await authRepository.updateSettings(userId, payload);

  return {
    ok: true,
    message: "账号设置已保存。",
    user,
  };
}

export async function logoutCurrentSession(token: string | null): Promise<AuthResponse> {
  if (token) {
    await authRepository.clearSessionByToken(token);
  }

  return {
    ok: true,
    message: "已退出登录。",
    session: {
      isAuthenticated: false,
      user: null,
      canPost: false,
      canMessage: false,
    },
  };
}
