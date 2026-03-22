import { authRepository } from "./auth-repository";
import type {
  AuthResponse,
  LoginPayload,
  RegisterPayload,
} from "./types";

export async function getAuthSession() {
  return authRepository.getSession();
}

export async function loginWithEmail(payload: LoginPayload): Promise<AuthResponse> {
  const hasEmail = payload.email.includes("@");
  const hasPassword = payload.password.trim().length >= 6;

  if (!hasEmail || !hasPassword) {
    return {
      ok: false,
      message: "请输入正确的邮箱格式，并填写至少 6 位密码。",
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
    message: "登录接口占位已准备好，后续只需要接入真实账号系统。",
    session: await authRepository.getSession(),
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
      message: "注册信息不符合当前规则，请检查用户名、邮箱、密码和简介长度。",
      session: {
        isAuthenticated: false,
        user: null,
        canPost: false,
        canMessage: false,
      },
    };
  }

  const baseUser = await authRepository.getMockUser();

  return {
    ok: true,
    message: "注册接口占位已准备好，后续只需要接入真实存储和账号系统。",
    session: {
      isAuthenticated: true,
      user: {
        ...baseUser,
        username: payload.username,
        email: payload.email,
        bio: payload.bio,
      },
      canPost: true,
      canMessage: true,
    },
  };
}

export async function logoutCurrentSession(): Promise<AuthResponse> {
  return {
    ok: true,
    message: "退出接口占位已准备好。",
    session: {
      isAuthenticated: false,
      user: null,
      canPost: false,
      canMessage: false,
    },
  };
}
